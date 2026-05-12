import { NextRequest, NextResponse } from 'next/server'
import { verifyTurnstileToken } from '@/lib/turnstile'

const NOTIFY_LEAD_URL = 'https://tools.wearebondy.com/api/notify-lead'
const NOTIFY_LEAD_SECRET = process.env.NOTIFY_LEAD_SECRET || 'bondy-notify-lead-internal'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company, role, service, message, turnstileToken } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Turnstile verification (fail-open si TURNSTILE_SECRET_KEY no está seteado)
    const remoteIp = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null
    const ts = await verifyTurnstileToken(turnstileToken, remoteIp)
    if (!ts.ok) {
      return NextResponse.json({ error: 'Captcha verification failed', reason: ts.reason }, { status: 400 })
    }

    const leadData = {
      name,
      email,
      company,
      role,
      service,
      message,
      source: 'new-website',
      created_at: new Date().toISOString(),
    }

    // Supabase insert
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (supabaseUrl && supabaseKey) {
      const response = await fetch(`${supabaseUrl}/rest/v1/contact_leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(leadData),
      })

      if (!response.ok) {
        const errText = await response.text()
        console.error('Supabase error:', errText)
      }
    } else {
      console.log('Contact form submission (Supabase not configured):', leadData)
    }

    // Notificación por email via bondy-tools
    // No bloqueamos el response al usuario si falla el email
    try {
      const notifyRes = await fetch(NOTIFY_LEAD_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-notify-secret': NOTIFY_LEAD_SECRET,
        },
        body: JSON.stringify(leadData),
      })
      if (!notifyRes.ok) {
        const errText = await notifyRes.text()
        console.error('[contact] notify-lead error:', notifyRes.status, errText)
      } else {
        console.log('[contact] notify-lead ok')
      }
    } catch (notifyErr) {
      console.error('[contact] notify-lead fetch failed:', notifyErr)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
