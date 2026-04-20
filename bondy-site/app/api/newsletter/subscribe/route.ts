import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const SEND_CONFIRMATION_URL = 'https://tools.wearebondy.com/api/newsletter/send-confirmation'
const NOTIFY_LEAD_SECRET = process.env.NOTIFY_LEAD_SECRET || 'bondy-notify-lead-internal'

/** Base URL del sitio para construir el link de confirmación. */
function siteOrigin(req: NextRequest): string {
  // En producción siempre wearebondy.com, pero usamos el host del request como
  // fallback para dev/preview deployments.
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  const host = req.headers.get('host') || 'wearebondy.com'
  const proto = host.startsWith('localhost') ? 'http' : 'https'
  return `${proto}://${host}`
}

function isValidEmail(email: string): boolean {
  // Validación básica: presencia de @, TLD de al menos 2 caracteres, sin espacios.
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const rawEmail = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
    const lang: 'en' | 'es' = body?.lang === 'es' ? 'es' : 'en'
    const source = typeof body?.source === 'string' ? body.source.slice(0, 64) : 'thinking_page'

    if (!rawEmail || !isValidEmail(rawEmail)) {
      return NextResponse.json(
        { error: lang === 'es' ? 'Email inválido.' : 'Invalid email.' },
        { status: 400 }
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabaseUrl || !supabaseKey) {
      console.error('[newsletter/subscribe] Supabase env vars missing')
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
    }

    // Buscamos primero si ya existe (activa o no).
    const existingRes = await fetch(
      `${supabaseUrl}/rest/v1/newsletter_subscribers?email=eq.${encodeURIComponent(
        rawEmail
      )}&lang=eq.${lang}&unsubscribed_at=is.null&select=id,confirmed_at`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    )
    const existing = existingRes.ok ? await existingRes.json() : []

    // Si ya está confirmada, devolvemos ok silenciosamente (no revelamos estado).
    if (Array.isArray(existing) && existing[0]?.confirmed_at) {
      return NextResponse.json({ ok: true, already_confirmed: true })
    }

    // Generamos un token de confirmación nuevo (256 bits url-safe).
    const token = crypto.randomBytes(32).toString('base64url')

    if (Array.isArray(existing) && existing[0]?.id) {
      // Ya se había suscripto pero no confirmó — refrescamos el token.
      const upRes = await fetch(
        `${supabaseUrl}/rest/v1/newsletter_subscribers?id=eq.${existing[0].id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: 'return=minimal',
          },
          body: JSON.stringify({ confirmation_token: token }),
        }
      )
      if (!upRes.ok) {
        console.error('[newsletter/subscribe] Supabase update error:', await upRes.text())
        return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
      }
    } else {
      // Insert nuevo.
      const insRes = await fetch(`${supabaseUrl}/rest/v1/newsletter_subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          email: rawEmail,
          lang,
          source,
          confirmation_token: token,
        }),
      })
      if (!insRes.ok) {
        const errText = await insRes.text()
        console.error('[newsletter/subscribe] Supabase insert error:', errText)
        return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
      }
    }

    // Construimos el link de confirmación y disparamos el email.
    const confirmUrl = `${siteOrigin(req)}/${lang}/newsletter/confirm?token=${encodeURIComponent(
      token
    )}`

    try {
      const sendRes = await fetch(SEND_CONFIRMATION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-notify-secret': NOTIFY_LEAD_SECRET,
        },
        body: JSON.stringify({ email: rawEmail, lang, confirm_url: confirmUrl }),
      })
      if (!sendRes.ok) {
        const errText = await sendRes.text()
        console.error('[newsletter/subscribe] send-confirmation error:', sendRes.status, errText)
        // No rompemos el flujo: el usuario ve success, nosotros vemos el error en logs.
      } else {
        console.log('[newsletter/subscribe] confirmation sent to', rawEmail)
      }
    } catch (sendErr) {
      console.error('[newsletter/subscribe] send-confirmation fetch failed:', sendErr)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[newsletter/subscribe] Internal error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
