import { NextRequest, NextResponse } from 'next/server'
import { verifyTurnstileToken } from '@/lib/turnstile'

/**
 * POST /api/referrals
 *
 * Captura un referral: alguien refiere a un candidato. Bonus USD 1000 si Bondy lo coloca.
 *
 * Cambios:
 *   - Honeypot field `website`
 *   - Después del insert dispara /api/notify-referral en tools para email + Slack
 *
 * Body: { referrerName, referrerEmail, refereeName, refereeLinkedIn, message?, turnstileToken, website? }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      referrerName, referrerEmail, refereeName, refereeLinkedIn, message,
      turnstileToken, website,
    } = body || {}

    // Honeypot
    if (website && String(website).trim() !== '') {
      console.warn('[referrals] honeypot triggered, dropping silently')
      return NextResponse.json({ ok: true })
    }

    if (!referrerName || !referrerEmail || !refereeName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(referrerEmail)) {
      return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
    }

    const remoteIp = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null
    const ts = await verifyTurnstileToken(turnstileToken, remoteIp)
    if (!ts.ok) {
      return NextResponse.json({ error: 'Captcha verification failed', reason: ts.reason }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
    if (!supabaseUrl || !supabaseKey) {
      console.error('[referrals] supabase env missing')
      return NextResponse.json({ error: 'server_misconfigured' }, { status: 500 })
    }

    const insertRes = await fetch(`${supabaseUrl}/rest/v1/referrals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        referrer_name: referrerName,
        referrer_email: referrerEmail,
        referee_name: refereeName,
        referee_linkedin: refereeLinkedIn || null,
        message: message || null,
        bonus_amount: 1000,
        bonus_currency: 'USD',
        status: 'pending',
        source: 'new-website',
        created_at: new Date().toISOString(),
      }),
    })

    if (!insertRes.ok) {
      const errText = await insertRes.text()
      console.error('[referrals] supabase insert error:', errText)
      return NextResponse.json({ error: 'insert_failed' }, { status: 500 })
    }
    const inserted = (await insertRes.json())[0]

    // Disparar notify (async, no bloquea)
    const toolsBase = process.env.TOOLS_BASE_URL || 'https://tools.wearebondy.com'
    const notifySecret = process.env.NOTIFY_LEAD_SECRET || ''
    fetch(`${toolsBase}/api/notify-referral`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-notify-secret': notifySecret,
      },
      body: JSON.stringify({
        referral_id: inserted?.id,
        referrer_name: referrerName,
        referrer_email: referrerEmail,
        referee_name: refereeName,
        referee_linkedin: refereeLinkedIn || null,
        message: message || null,
      }),
    }).catch((e) => console.error('[referrals] notify-referral dispatch failed', e))

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[referrals] error', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
