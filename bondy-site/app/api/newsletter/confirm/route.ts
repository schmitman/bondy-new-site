import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/newsletter/confirm?token=<token>&lang=<en|es>
 *
 * Endpoint interno usado por la página /[lang]/newsletter/confirm para validar
 * el token del email y marcar la suscripción como confirmada.
 *
 * Devuelve { ok: true, email, lang } en éxito, o { ok: false, reason } con
 * una de: invalid_token | already_confirmed | expired | server_error.
 */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')?.trim() || ''
  if (!token || token.length < 20) {
    return NextResponse.json({ ok: false, reason: 'invalid_token' }, { status: 400 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 500 })
  }

  try {
    // Buscamos el row por token.
    const lookupRes = await fetch(
      `${supabaseUrl}/rest/v1/newsletter_subscribers?confirmation_token=eq.${encodeURIComponent(
        token
      )}&select=id,email,lang,confirmed_at,unsubscribed_at`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    )
    if (!lookupRes.ok) {
      console.error('[newsletter/confirm] Lookup failed:', await lookupRes.text())
      return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 500 })
    }
    const rows = await lookupRes.json()
    const row = Array.isArray(rows) ? rows[0] : null

    if (!row) {
      return NextResponse.json({ ok: false, reason: 'invalid_token' }, { status: 404 })
    }
    if (row.unsubscribed_at) {
      return NextResponse.json({ ok: false, reason: 'invalid_token' }, { status: 410 })
    }
    if (row.confirmed_at) {
      return NextResponse.json({
        ok: true,
        email: row.email,
        lang: row.lang,
        already_confirmed: true,
      })
    }

    // Marcamos como confirmado y limpiamos el token (one-time use).
    const upRes = await fetch(
      `${supabaseUrl}/rest/v1/newsletter_subscribers?id=eq.${row.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          confirmed_at: new Date().toISOString(),
          confirmation_token: null,
        }),
      }
    )
    if (!upRes.ok) {
      console.error('[newsletter/confirm] Update failed:', await upRes.text())
      return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, email: row.email, lang: row.lang })
  } catch (err) {
    console.error('[newsletter/confirm] Internal error:', err)
    return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 500 })
  }
}
