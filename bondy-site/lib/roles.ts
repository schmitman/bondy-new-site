// /lib/roles.ts
// Server-side helpers for the public job board (/roles + /roles/[slug]).
// Uses the Supabase REST API directly — no JS SDK to keep bundle light.
// All queries respect RLS: anon can only SELECT where status='published'.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tchppyxhapxtjemxrbqm.supabase.co'
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export type Role = {
  id: string
  position_number: number
  slug: string
  title: string
  status: 'draft' | 'published' | 'closed'
  seniority: string | null
  role_category: string | null
  client_name: string | null
  client_blurb: string | null
  client_visible: boolean
  about_client: string | null
  tech_stack: string[]
  modality: string | null
  location: string | null
  countries: string[]
  english_level: string | null
  description_role: string | null
  description_requirements: string | null
  description_process: string | null
  benefits: string[]
  min_salary_usd: number | null
  max_salary_usd: number | null
  salary_currency: string
  salary_visible: boolean
  salary_note: string | null
  is_featured: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

function headers() {
  return {
    apikey: SUPABASE_ANON,
    Authorization: `Bearer ${SUPABASE_ANON}`,
    'Content-Type': 'application/json',
  }
}

export async function listPublishedRoles(): Promise<Role[]> {
  if (!SUPABASE_ANON) {
    console.warn('[roles] NEXT_PUBLIC_SUPABASE_ANON_KEY not set — returning empty list')
    return []
  }
  const url = `${SUPABASE_URL}/rest/v1/bondy_roles?status=eq.published&order=is_featured.desc,published_at.desc.nullslast,position_number.desc&select=*`
  const res = await fetch(url, {
    headers: headers(),
    next: { revalidate: 60 },
  })
  if (!res.ok) {
    console.error('[roles] listPublishedRoles failed', res.status, await res.text())
    return []
  }
  return res.json()
}

export async function getRoleBySlug(slug: string): Promise<Role | null> {
  if (!SUPABASE_ANON) return null
  const url = `${SUPABASE_URL}/rest/v1/bondy_roles?slug=eq.${encodeURIComponent(slug)}&status=eq.published&select=*&limit=1`
  const res = await fetch(url, {
    headers: headers(),
    next: { revalidate: 60 },
  })
  if (!res.ok) {
    console.error('[roles] getRoleBySlug failed', slug, res.status)
    return null
  }
  const rows = (await res.json()) as Role[]
  return rows[0] || null
}

export async function listPublishedSlugs(): Promise<string[]> {
  if (!SUPABASE_ANON) return []
  const url = `${SUPABASE_URL}/rest/v1/bondy_roles?status=eq.published&select=slug`
  const res = await fetch(url, { headers: headers() })
  if (!res.ok) return []
  const rows = (await res.json()) as { slug: string }[]
  return rows.map((r) => r.slug)
}

/* ── Salary formatting ── */
export function formatSalary(role: Role, lang: 'en' | 'es'): string | null {
  if (!role.salary_visible) return role.salary_note || null
  const min = role.min_salary_usd
  const max = role.max_salary_usd
  if (!min && !max) return role.salary_note || null
  const cur = role.salary_currency || 'USD'
  const fmt = (n: number) => new Intl.NumberFormat(lang === 'es' ? 'es-AR' : 'en-US').format(n)
  if (min && max) return `${cur} ${fmt(min)}–${fmt(max)}`
  if (min) return `${cur} ${fmt(min)}+`
  return `${cur} up to ${fmt(max!)}`
}

/* ── Public client name (respects client_visible toggle) ── */
export function publicClientLabel(role: Role, lang: 'en' | 'es'): string {
  if (role.client_visible && role.client_name) return role.client_name
  if (role.client_blurb) return role.client_blurb
  return lang === 'es' ? 'Cliente confidencial' : 'Confidential client'
}
