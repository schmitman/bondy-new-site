import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company, role, service, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
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
        body: JSON.stringify({
          name,
          email,
          company,
          role,
          service,
          message,
          source: 'new-website',
          created_at: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        const errText = await response.text()
        console.error('Supabase error:', errText)
        // Don't fail silently — still return success to user but log the issue
      }
    } else {
      // Supabase not configured — log to console in dev
      console.log('Contact form submission (Supabase not configured):', {
        name, email, company, role, service, message
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
