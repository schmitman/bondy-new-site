import { NextRequest, NextResponse } from 'next/server'
import { verifyTurnstileToken } from '@/lib/turnstile'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { referrerName, referrerEmail, refereeName, refereeLinkedIn, message, turnstileToken } = body

    if (!referrerName || !referrerEmail || !refereeName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const remoteIp = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null
    const ts = await verifyTurnstileToken(turnstileToken, remoteIp)
    if (!ts.ok) {
      return NextResponse.json({ error: 'Captcha verification failed', reason: ts.reason }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (supabaseUrl && supabaseKey) {
      const response = await fetch(`${supabaseUrl}/rest/v1/referrals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=minimal',
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

      if (!response.ok) {
        const errText = await response.text()
        console.error('Supabase referrals error:', errText)
      }
    } else {
      console.log('Referral submission (Supabase not configured):', {
        referrerName, referrerEmail, refereeName, refereeLinkedIn, message
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Referrals API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
