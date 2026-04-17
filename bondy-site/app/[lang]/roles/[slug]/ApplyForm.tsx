'use client'

import { useState, useRef } from 'react'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'

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

type Props = {
  roleId: string
  roleSlug: string
  lang: Lang
}

export default function ApplyForm({ roleId, roleSlug, lang }: Props) {
  const tr = t(lang)
  const ap = tr.roles.apply
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [notes, setNotes] = useState('')
  const [cv, setCv] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const MAX_CV_BYTES = 5 * 1024 * 1024

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null
    if (!f) {
      setCv(null)
      return
    }
    if (f.type !== 'application/pdf') {
      setError(ap.errors.cvType)
      setCv(null)
      return
    }
    if (f.size > MAX_CV_BYTES) {
      setError(ap.errors.cvSize)
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
      setError(ap.errors.required)
      return
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!emailOk) {
      setError(ap.errors.email)
      return
    }

    setStatus('sending')
    try {
      const fd = new FormData()
      fd.append('role_id', roleId)
      fd.append('role_slug', roleSlug)
      fd.append('full_name', fullName.trim())
      fd.append('email', email.trim())
      if (linkedin.trim()) fd.append('linkedin_url', linkedin.trim())
      if (notes.trim()) fd.append('notes', notes.trim())
      if (cv) fd.append('cv', cv)

      const res = await fetch('/api/roles/apply', {
        method: 'POST',
        body: fd,
      })

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}))
        setError(errJson.error || ap.errors.generic)
        setStatus('error')
        return
      }

      setStatus('success')
    } catch (err) {
      console.error('[apply] submit error', err)
      setError(ap.errors.generic)
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
          ● {ap.title}
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
          {ap.success.title}
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
          {ap.success.body}
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
          {ap.success.again}
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
        ○ {ap.title}
      </div>
      <h3
        style={{
          fontFamily: serif,
          fontSize: 'clamp(1.5rem,2.6vw,1.9rem)',
          color: tw.ink,
          margin: 0,
          lineHeight: 1.2,
          opacity: 0.95,
        }}
      >
        {ap.title}
      </h3>
      <p
        style={{
          fontFamily: mono,
          fontSize: '13px',
          color: tw.inkFaint,
          lineHeight: 1.65,
          marginTop: '0.5rem',
        }}
      >
        {ap.subtitle}
      </p>

      <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
        <Field label={ap.fields.fullName} required>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={sending}
            style={inputStyle}
          />
        </Field>

        <Field label={ap.fields.email} required>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={sending}
            style={inputStyle}
          />
        </Field>

        <Field label={ap.fields.linkedin}>
          <input
            type="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            disabled={sending}
            placeholder={ap.fields.linkedinPlaceholder}
            style={inputStyle}
          />
        </Field>

        {/* File upload */}
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
            {ap.fields.cv}
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
              {cv ? ap.fields.cvChange : ap.fields.cvChoose}
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

        <Field label={ap.fields.notes}>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={sending}
            placeholder={ap.fields.notesPlaceholder}
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
          {sending ? ap.sending : ap.submit}
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
