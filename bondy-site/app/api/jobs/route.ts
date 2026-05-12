import { NextRequest, NextResponse } from 'next/server'
import { verifyTurnstileToken } from '@/lib/turnstile'

/**
 * POST /api/jobs — entry point del talent pool desde /jobs.
 *
 * Cambios vs versión anterior:
 *   1. Persiste en `talent_pool` (no más `job_applications`)
 *   2. Upsert por email (case-insensitive) — si ya existe, refresh edit_token y datos
 *   3. Honeypot field `website` — bots la llenan, humanos no la ven
 *   4. Turnstile verification
 *   5. Dispara autoresponder con edit link via /api/notify-lead (talent_pool flow)
 *
 * Body: { name, email, linkedin?, currentPosition?, currentCompany?, yearsExperience?,
 *         primaryArea?, locationCity?, locationCountry?, pitch?, turnstileToken?, website? }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name,
      email,
      linkedin,
      currentPosition,
      currentCompany,
      yearsExperience,
      primaryArea,
      locationCity,
      locationCountry,
      pitch,
      turnstileToken,
      website, // honeypot
      // optional UTMs
      utm_source,
      utm_medium,
      utm_campaign,
    } = body || {}

    // ─── Honeypot ─────────────────────────────────────────────
    if (website && String(website).trim() !== '') {
      // Bot. Devolvemos 200 silencioso para que no sospeche.
      console.warn('[jobs] honeypot triggered, dropping silently:', { email })
      return NextResponse.json({ ok: true })
    }

    // ─── Basic validation ─────────────────────────────────────
    if (!name || !email) {
      return NextResponse.json({ error: 'name and email required' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email))) {
      return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
    }

    // ─── Turnstile (fail-open hasta que esté la key) ──────────
    const remoteIp = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || null
    const turnstile = await verifyTurnstileToken(turnstileToken, remoteIp)
    if (!turnstile.ok) {
      return NextResponse.json({ error: 'captcha_failed', reason: turnstile.reason }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
    if (!supabaseUrl || !supabaseKey) {
      console.error('[jobs] supabase env vars missing')
      return NextResponse.json({ error: 'server_misconfigured' }, { status: 500 })
    }

    // ─── Upsert: si email ya existe, actualizamos en vez de duplicar ──
    const cleanEmail = String(email).trim().toLowerCase()
    const existingRes = await fetch(
      `${supabaseUrl}/rest/v1/talent_pool?email=eq.${encodeURIComponent(cleanEmail)}&select=id,edit_token,name&limit=1`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    )
    const existing = existingRes.ok ? (await existingRes.json())[0] : null

    let talentId: string
    let editToken: string

    const payload: Record<string, unknown> = {
      email: cleanEmail,
      name: String(name).trim(),
      linkedin_url: linkedin || null,
      current_position: currentPosition || null,
      current_company: currentCompany || null,
      years_experience: yearsExperience ? Number(yearsExperience) : null,
      primary_area: primaryArea || null,
      location_city: locationCity || null,
      location_country: locationCountry || null,
      pitch: pitch || null,
      source: 'jobs_page',
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
    }

    if (existing) {
      // Update only provided fields (don't clobber filled values with nulls)
      const patch: Record<string, unknown> = {}
      for (const [k, v] of Object.entries(payload)) {
        if (v !== null && v !== undefined && v !== '') patch[k] = v
      }
      const upd = await fetch(
        `${supabaseUrl}/rest/v1/talent_pool?id=eq.${existing.id}`,
        {
          method: 'PATCH',
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            Prefer: 'return=representation',
          },
          body: JSON.stringify(patch),
        }
      )
      if (!upd.ok) {
        console.error('[jobs] update failed', await upd.text())
        return NextResponse.json({ error: 'update_failed' }, { status: 500 })
      }
      talentId = existing.id
      editToken = existing.edit_token
    } else {
      const ins = await fetch(`${supabaseUrl}/rest/v1/talent_pool`, {
        method: 'POST',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify(payload),
      })
      if (!ins.ok) {
        const err = await ins.text()
        console.error('[jobs] insert failed', err)
        return NextResponse.json({ error: 'insert_failed' }, { status: 500 })
      }
      const inserted = (await ins.json())[0]
      talentId = inserted.id
      editToken = inserted.edit_token
    }

    // ─── Disparar autoresponder + notificación interna (async, no bloquea) ──
    const toolsBase = process.env.TOOLS_BASE_URL || 'https://tools.wearebondy.com'
    const notifySecret = process.env.NOTIFY_LEAD_SECRET || ''
    const editUrl = `https://wearebondy.com/es/jobs/edit?token=${encodeURIComponent(editToken)}`

    fetch(`${toolsBase}/api/notify-talent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-notify-secret': notifySecret,
      },
      body: JSON.stringify({
        talent_id: talentId,
        email: cleanEmail,
        name,
        edit_url: editUrl,
        is_new: !existing,
        snapshot: payload,
      }),
    }).catch((e) => console.error('[jobs] notify-talent dispatch failed', e))

    return NextResponse.json({ ok: true, is_new: !existing })
  } catch (err) {
    console.error('[jobs] error', err)
    return NextResponse.json({ error: 'internal_server_error' }, { status: 500 })
  }
}
