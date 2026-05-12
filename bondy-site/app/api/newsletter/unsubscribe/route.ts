import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/newsletter/unsubscribe?token=<token>
 *
 * Marca al suscriptor del newsletter como `unsubscribed_at = now()` usando
 * el `unsubscribe_token` que viaja en cada email del newsletter editorial.
 *
 * One-click compatible: también responde 200 a POST (List-Unsubscribe-Post).
 */
async function doUnsubscribe(token: string): Promise<{ ok: true; email?: string } | { ok: false; reason: 'invalid_token' | 'server_error' }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    return { ok: false, reason: 'server_error' }
  }

  // Lookup por token
  const lookup = await fetch(
    `${supabaseUrl}/rest/v1/newsletter_subscribers?unsubscribe_token=eq.${encodeURIComponent(token)}&select=id,email,unsubscribed_at&limit=1`,
    { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` } }
  )
  if (!lookup.ok) return { ok: false, reason: 'server_error' }
  const rows = await lookup.json()
  const row = Array.isArray(rows) ? rows[0] : null
  if (!row) return { ok: false, reason: 'invalid_token' }
  if (row.unsubscribed_at) return { ok: true, email: row.email }

  const update = await fetch(
    `${supabaseUrl}/rest/v1/newsletter_subscribers?id=eq.${row.id}`,
    {
      method: 'PATCH',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ unsubscribed_at: new Date().toISOString() }),
    }
  )
  if (!update.ok) return { ok: false, reason: 'server_error' }
  return { ok: true, email: row.email }
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')?.trim() || ''
  if (!token) return NextResponse.json({ ok: false, reason: 'invalid_token' }, { status: 400 })
  const result = await doUnsubscribe(token)
  if (!result.ok) {
    return NextResponse.json(result, { status: result.reason === 'invalid_token' ? 404 : 500 })
  }
  return NextResponse.json(result)
}

// One-click (List-Unsubscribe-Post = One-Click) — algunos clientes lo necesitan
export async function POST(req: NextRequest) {
  return GET(req)
}
