import { NextRequest, NextResponse } from 'next/server'

/**
 * GET  /api/jobs/edit?token=...  — devuelve el perfil para hidratar el form
 * PATCH /api/jobs/edit?token=... — actualiza el perfil (campos editables)
 *
 * Token único, válido por 90 días desde creación / último renew.
 * No requiere login. Sin RLS porque usamos service role pero filtramos por token.
 */

const EDITABLE_FIELDS = [
  'name', 'linkedin_url',
  'current_position', 'current_company', 'years_experience',
  'location_city', 'location_country',
  'primary_area', 'seniority', 'skills',
  'modality_preference', 'english_level', 'spanish_level',
  'open_to_relocate', 'willing_to_travel',
  'desired_salary_amount', 'desired_salary_currency', 'desired_salary_period', 'desired_salary_notes',
  'available_from', 'notice_period', 'contract_preference',
  'pitch',
]

function supabaseEnv() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL?.trim(),
    key: process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(),
  }
}

async function lookupByToken(token: string) {
  const { url, key } = supabaseEnv()
  if (!url || !key) return null
  const res = await fetch(
    `${url}/rest/v1/talent_pool?edit_token=eq.${encodeURIComponent(token)}&select=*&limit=1`,
    { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: 'no-store' }
  )
  if (!res.ok) return null
  const rows = await res.json()
  return rows?.[0] || null
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')?.trim() || ''
  if (!token) return NextResponse.json({ ok: false, reason: 'missing_token' }, { status: 400 })

  const row = await lookupByToken(token)
  if (!row) return NextResponse.json({ ok: false, reason: 'invalid_token' }, { status: 404 })

  const expiresAt = row.edit_token_expires_at ? new Date(row.edit_token_expires_at) : null
  if (expiresAt && expiresAt < new Date()) {
    return NextResponse.json({ ok: false, reason: 'expired' }, { status: 410 })
  }

  // No exponemos el token en la respuesta. Mandamos solo lo que el form necesita.
  const safe: Record<string, unknown> = {}
  for (const k of [...EDITABLE_FIELDS, 'email', 'edit_token_expires_at']) {
    safe[k] = row[k]
  }
  return NextResponse.json({ ok: true, profile: safe })
}

export async function PATCH(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')?.trim() || ''
  if (!token) return NextResponse.json({ ok: false, reason: 'missing_token' }, { status: 400 })

  const row = await lookupByToken(token)
  if (!row) return NextResponse.json({ ok: false, reason: 'invalid_token' }, { status: 404 })

  const expiresAt = row.edit_token_expires_at ? new Date(row.edit_token_expires_at) : null
  if (expiresAt && expiresAt < new Date()) {
    return NextResponse.json({ ok: false, reason: 'expired' }, { status: 410 })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, reason: 'invalid_json' }, { status: 400 })
  }

  const patch: Record<string, unknown> = {}
  const changed: string[] = []
  for (const k of EDITABLE_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(body, k)) {
      patch[k] = body[k]
      changed.push(k)
    }
  }
  if (!changed.length) {
    return NextResponse.json({ ok: false, reason: 'no_changes' }, { status: 400 })
  }
  patch.last_edited_by_candidate_at = new Date().toISOString()
  patch.edit_count = (row.edit_count || 0) + 1
  patch.status = row.status === 'new' ? 'active' : row.status  // 'new' → 'active' al primer edit

  const { url, key } = supabaseEnv()
  if (!url || !key) return NextResponse.json({ ok: false }, { status: 500 })

  const upd = await fetch(`${url}/rest/v1/talent_pool?id=eq.${row.id}`, {
    method: 'PATCH',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(patch),
  })
  if (!upd.ok) {
    console.error('[jobs/edit] update failed', await upd.text())
    return NextResponse.json({ ok: false, reason: 'update_failed' }, { status: 500 })
  }

  // Log
  await fetch(`${url}/rest/v1/talent_pool_edits`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      talent_id: row.id,
      source: 'candidate_self_edit',
      fields_changed: changed,
      ip_address: req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || null,
      user_agent: req.headers.get('user-agent') || null,
    }),
  })

  return NextResponse.json({ ok: true, fields_changed: changed })
}
