import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// .trim() defensivo: en Vercel las env vars a veces traen trailing \n
const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tchppyxhapxtjemxrbqm.supabase.co').trim()
const SERVICE_ROLE = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim()

const MAX_CV_BYTES = 5 * 1024 * 1024
const BUCKET = 'applications-cv'

// Sources accepted from the public form. Anything else falls back to general_pool.
const ALLOWED_SOURCES = new Set(['general_pool', 'tools_busco_trabajo', 'website', 'linkedin', 'referral'])

function emailValid(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
}

function slugifyName(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60)
}

export async function POST(req: NextRequest) {
  try {
    if (!SERVICE_ROLE) {
      console.error('[general-application] SUPABASE_SERVICE_ROLE_KEY missing')
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
    }

    const fd = await req.formData()
    const full_name = String(fd.get('full_name') || '').trim()
    const email = String(fd.get('email') || '').trim()
    const linkedin_url = (fd.get('linkedin_url')?.toString() || '').trim() || null
    const notes = (fd.get('notes')?.toString() || '').trim() || null
    const cv = fd.get('cv')

    const rawSource = String(fd.get('source') || 'general_pool').trim()
    const source = ALLOWED_SOURCES.has(rawSource) ? rawSource : 'general_pool'

    if (!full_name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!emailValid(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    /* CV upload (optional) */
    let cv_storage_path: string | null = null
    let cv_filename: string | null = null

    if (cv && typeof cv === 'object' && 'arrayBuffer' in cv) {
      const file = cv as File
      if (file.size > 0) {
        if (file.type !== 'application/pdf') {
          return NextResponse.json({ error: 'CV must be a PDF' }, { status: 400 })
        }
        if (file.size > MAX_CV_BYTES) {
          return NextResponse.json({ error: 'CV exceeds 5MB' }, { status: 400 })
        }

        const namePart = slugifyName(full_name) || 'cv'
        const stamp = Date.now()
        const rand = Math.random().toString(36).slice(2, 8)
        const path = `_general/${namePart}-${stamp}-${rand}.pdf`

        const buf = Buffer.from(await file.arrayBuffer())
        const upRes = await fetch(
          `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${encodeURI(path)}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${SERVICE_ROLE}`,
              'Content-Type': 'application/pdf',
              'x-upsert': 'false',
            },
            body: buf,
          }
        )
        if (!upRes.ok) {
          const errText = await upRes.text()
          const dbg = {
            status: upRes.status,
            statusText: upRes.statusText,
            errText: errText.slice(0, 500),
            uploadUrl: `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${encodeURI(path)}`,
            urlLen: SUPABASE_URL.length,
            keyLen: SERVICE_ROLE.length,
            keyPrefix: SERVICE_ROLE.slice(0, 20),
            keySuffix: SERVICE_ROLE.slice(-10),
            bufferSize: buf.length,
          }
          console.error('[general-application] CV upload failed', dbg)
          // Temporary: surface raw error to client when called with the debug header
          // so we can diagnose env-var drift in prod without spelunking truncated logs.
          if (req.headers.get('x-mateo-debug') === 'cv-upload') {
            return NextResponse.json({ error: 'CV upload failed', debug: dbg }, { status: 500 })
          }
          return NextResponse.json({ error: 'CV upload failed' }, { status: 500 })
        }
        cv_storage_path = path
        cv_filename = file.name
      }
    }

    const user_agent = (req.headers.get('user-agent') || '').slice(0, 512) || null

    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/bondy_applications`, {
      method: 'POST',
      headers: {
        apikey: SERVICE_ROLE,
        Authorization: `Bearer ${SERVICE_ROLE}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        role_id: null,
        full_name,
        email,
        linkedin_url,
        notes,
        cv_storage_path,
        cv_filename,
        status: 'new',
        source,
        ip_hash: null,
        user_agent,
      }),
    })

    if (!insertRes.ok) {
      const errText = await insertRes.text()
      console.error('[general-application] insert failed', insertRes.status, errText)
      return NextResponse.json({ error: 'Could not save application' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[general-application] exception', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
