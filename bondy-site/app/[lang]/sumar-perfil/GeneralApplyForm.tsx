'use client'

import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import type { Lang } from '@/lib/i18n/translations'

const tw = {
  ink: '#1A1A1A',
  inkSub: '#5A5550',
  inkFaint: '#7A7874',
  rule: '#E8E4DE',
  white: '#FFFFFF',
  green: '#4A8C40',
  bg: '#FEFCF9',
}
const serif = "'Special Elite', Georgia, serif"
const mono = "'Plus Jakarta Sans', system-ui, sans-serif"

const COPY = {
  en: {
    kicker: '○ Talent Pool',
    title: 'Join the Bondy talent pool.',
    subtitle:
      "Not seeing the right role today? Drop your details — when a fit comes up, a recruiter on the Bondy team will reach out personally. No newsletter, no spam.",
    fields: {
      fullName: 'Full name',
      email: 'Email',
      linkedin: 'LinkedIn URL',
      linkedinPlaceholder: 'linkedin.com/in/...',
      cv: 'CV (PDF, max 5MB)',
      cvChange: 'Change file',
      cvChoose: 'Choose PDF',
      notes: 'Anything else we should know?',
      notesPlaceholder: 'Areas you focus on, what you are looking for, etc. — optional.',
    },
    submit: 'Add me to the pool →',
    sending: 'Sending...',
    success: {
      title: 'You are in.',
      body: 'When a role matches, a recruiter on the Bondy team will reach out personally.',
      again: 'See current open roles →',
    },
    errors: {
      required: 'Please fill in the required fields.',
      email: 'Please enter a valid email.',
      cvSize: 'CV must be under 5MB.',
      cvType: 'CV must be a PDF.',
      generic: 'Something went wrong. Try again or email hello@wearebondy.com',
    },
  },
  es: {
    kicker: '○ Pool de Talento',
    title: 'Sumate al pool de talento de Bondy.',
    subtitle:
      'No encontrás un rol que encaje hoy? Dejanos tus datos — cuando aparezca un fit, alguien del equipo Bondy te escribe personalmente. Sin newsletters, sin spam.',
    fields: {
      fullName: 'Nombre completo',
      email: 'Email',
      linkedin: 'LinkedIn',
      linkedinPlaceholder: 'linkedin.com/in/...',
      cv: 'CV (PDF, máx 5MB)',
      cvChange: 'Cambiar archivo',
      cvChoose: 'Elegir PDF',
      notes: 'Algo más que quieras contarnos?',
      notesPlaceholder: 'En qué te enfocás, qué tipo de rol buscás, etc. — opcional.',
    },
    submit: 'Sumarme al pool →',
    sending: 'Enviando...',
    success: {
      title: 'Listo, te tenemos.',
      body: 'Cuando aparezca un rol que encaje, alguien del equipo Bondy te escribe personalmente.',
      again: 'Ver búsquedas abiertas →',
    },
    errors: {
      required: 'Completá los campos requeridos.',
      email: 'Ingresá un email válido.',
      cvSize: 'El CV no puede superar 5MB.',
      cvType: 'El CV debe ser un PDF.',
      generic: 'Algo salió mal. Probá de nuevo o escribinos a hello@wearebondy.com',
    },
  },
} as const

const ALLOWED_SOURCES = new Set(['general_pool', 'tools_busco_trabajo', 'website', 'linkedin', 'referral'])

type Props = {
  lang: Lang
}

export default function GeneralApplyForm({ lang }: Props) {
  const c = COPY[lang]
  const searchParams = useSearchParams()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [notes, setNotes] = useState('')
  const [cv, setCv] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<string>('general_pool')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Capture source from URL params: ?source=tools_busco_trabajo or ?utm_source=tools
  useEffect(() => {
    const fromSource = searchParams?.get('source')
    const fromUtm = searchParams?.get('utm_source')
    const fromUtmMedium = searchParams?.get('utm_medium')

    let resolved = 'general_pool'
    if (fromSource && ALLOWED_SOURCES.has(fromSource)) {
      resolved = fromSource
    } else if (fromUtm === 'tools' && fromUtmMedium === 'busco_trabajo') {
      resolved = 'tools_busco_trabajo'
    } else if (fromUtm && ALLOWED_SOURCES.has(fromUtm)) {
      resolved = fromUtm
    }
    setSource(resolved)
  }, [searchParams])

  const MAX_CV_BYTES = 5 * 1024 * 1024

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null
    if (!f) {
      setCv(null)
      return
    }
    if (f.type !== 'application/pdf') {
      setError(c.errors.cvType)
      setCv(null)
      return
    }
    if (f.size > MAX_CV_BYTES) {
      setError(c.errors.cvSize)
      setCv(null)
      return
    }
    setError(null)
    setCv(f)
  }

  async function onSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setError(null)

    if (!fullName.trim() || !email.trim()) {
      setError(c.errors.required)
      return
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!emailOk) {
      setError(c.errors.email)
      return
    }

    setStatus('sending')
    try {
      const fd = new FormData()
      fd.append('full_name', fullName.trim())
      fd.append('email', email.trim())
      if (linkedin.trim()) fd.append('linkedin_url', linkedin.trim())
      if (notes.trim()) fd.append('notes', notes.trim())
      if (cv) fd.append('cv', cv)
      fd.append('source', source)

      const res = await fetch('/api/general-application', {
        method: 'POST',
        body: fd,
      })

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}))
        setError(errJson.error || c.errors.generic)
        setStatus('error')
        return
      }

      setStatus('success')
    } catch (err) {
      console.error('[general-application] submit error', err)
      setError(c.errors.generic)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        style={{
          background: tw.white,
          border: `1px solid ${tw.rule}`,
          padding: 'clamp(1.75rem,4vw,2.5rem)',
        }}
      >
        <div
          style={{
            fontFamily: mono,
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: tw.green,
            marginBottom: '0.75rem',
          }}
        >
          ● {c.kicker.replace('○ ', '')}
        </div>
        <h3
          style={{
            fontFamily: serif,
            fontSize: 'clamp(1.6rem,3vw,2.1rem)',
            color: tw.ink,
            margin: 0,
            lineHeight: 1.15,
            opacity: 0.95,
          }}
        >
          {c.success.title}
        </h3>
        <p
          style={{
            fontFamily: mono,
            fontSize: '14px',
            color: tw.inkSub,
            lineHeight: 1.7,
            marginTop: '0.75rem',
          }}
        >
          {c.success.body}
        </p>
        <a
          href={`/${lang}/roles`}
          style={{
            fontFamily: mono,
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: tw.green,
            textDecoration: 'none',
            display: 'inline-block',
            marginTop: '1.25rem',
          }}
        >
          {c.success.again}
        </a>
      </div>
    )
  }

  const sending = status === 'sending'

  return (
    <div
      style={{
        background: tw.white,
        border: `1px solid ${tw.rule}`,
        padding: 'clamp(1.5rem,3.5vw,2.25rem)',
      }}
    >
      <div
        style={{
          fontFamily: mono,
          fontSize: '10px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: tw.green,
          marginBottom: '0.75rem',
        }}
      >
        {c.kicker}
      </div>
      <h3
        style={{
          fontFamily: serif,
          fontSize: 'clamp(1.6rem,3vw,2.1rem)',
          color: tw.ink,
          margin: 0,
          lineHeight: 1.15,
          opacity: 0.95,
        }}
      >
        {c.title}
      </h3>
      <p
        style={{
          fontFamily: mono,
          fontSize: '14px',
          color: tw.inkFaint,
          lineHeight: 1.7,
          marginTop: '0.75rem',
        }}
      >
        {c.subtitle}
      </p>

      <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
        <Field label={c.fields.fullName} required>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={sending}
            style={inputStyle}
          />
        </Field>

        <Field label={c.fields.email} required>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={sending}
            style={inputStyle}
          />
        </Field>

        <Field label={c.fields.linkedin}>
          <input
            type="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            disabled={sending}
            placeholder={c.fields.linkedinPlaceholder}
            style={inputStyle}
          />
        </Field>

        <div>
          <label
            style={{
              fontFamily: mono,
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: tw.inkFaint,
              display: 'block',
              marginBottom: '0.4rem',
            }}
          >
            {c.fields.cv}
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={onFileChange}
            disabled={sending}
            style={{ display: 'none' }}
          />
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={sending}
              style={{
                fontFamily: mono,
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: 'transparent',
                color: tw.inkSub,
                border: `1px solid ${tw.rule}`,
                padding: '10px 18px',
                cursor: sending ? 'not-allowed' : 'pointer',
              }}
            >
              {cv ? c.fields.cvChange : c.fields.cvChoose}
            </button>
            {cv && (
              <span
                style={{
                  fontFamily: mono,
                  fontSize: '12px',
                  color: tw.inkSub,
                  wordBreak: 'break-all',
                }}
              >
                {cv.name}
              </span>
            )}
          </div>
        </div>

        <Field label={c.fields.notes}>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={sending}
            placeholder={c.fields.notesPlaceholder}
            rows={4}
            style={{
              ...inputStyle,
              resize: 'vertical',
              minHeight: '90px',
              fontFamily: mono,
            }}
          />
        </Field>

        {error && (
          <div
            style={{
              fontFamily: mono,
              fontSize: '12px',
              color: '#B84A3A',
              background: 'rgba(184,74,58,0.06)',
              border: '1px solid rgba(184,74,58,0.2)',
              padding: '10px 14px',
            }}
          >
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={onSubmit}
          disabled={sending}
          style={{
            fontFamily: mono,
            fontSize: '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            background: tw.green,
            color: '#fff',
            border: 'none',
            padding: '14px 26px',
            cursor: sending ? 'not-allowed' : 'pointer',
            alignSelf: 'flex-start',
            marginTop: '0.5rem',
            opacity: sending ? 0.6 : 1,
          }}
        >
          {sending ? c.sending : c.submit}
        </button>
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
  fontSize: '14px',
  color: '#1A1A1A',
  background: '#FEFCF9',
  border: '1px solid #E8E4DE',
  padding: '10px 14px',
  outline: 'none',
  transition: 'border-color .15s',
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        style={{
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          fontSize: '10px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#7A7874',
          display: 'block',
          marginBottom: '0.4rem',
        }}
      >
        {label} {required && <span style={{ color: '#4A8C40' }}>*</span>}
      </label>
      {children}
    </div>
  )
}
