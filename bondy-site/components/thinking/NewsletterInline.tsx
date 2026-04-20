'use client'

// components/thinking/NewsletterInline.tsx
// Mini form inline para suscribirse al newsletter desde /thinking.
// - Un solo input de email, sin campos extra.
// - Double opt-in: al enviar recibe un mail de confirmación.
// - Estados: idle → loading → success | error.

import { useState } from 'react'

export interface NewsletterInlineProps {
  lang: 'en' | 'es'
  placeholder: string
  cta: string
  successTitle: string
  successBody: string
  errorGeneric: string
  errorInvalid: string
}

const body = "'Plus Jakarta Sans', system-ui, sans-serif"
const serif = "'Special Elite', Georgia, serif"

const tw = {
  green: '#4A8C40',
  rule: '#E8E4DE',
  ink: '#3A3530',
  sub: '#5A5550',
  faint: '#7A7874',
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
}

export default function NewsletterInline({
  lang,
  placeholder,
  cta,
  successTitle,
  successBody,
  errorGeneric,
  errorInvalid,
}: NewsletterInlineProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit() {
    const trimmed = email.trim().toLowerCase()
    if (!trimmed || !isValidEmail(trimmed)) {
      setErrorMsg(errorInvalid)
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, lang, source: 'thinking_page' }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setErrorMsg(data?.error || errorGeneric)
        setStatus('error')
        return
      }
      setStatus('success')
      setEmail('')
    } catch {
      setErrorMsg(errorGeneric)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        style={{
          maxWidth: 440,
          padding: '18px 22px',
          border: `1px solid ${tw.green}`,
          background: 'rgba(74,140,64,0.06)',
        }}
      >
        <div
          style={{
            fontFamily: body,
            fontSize: 10,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: tw.green,
            fontWeight: 500,
            marginBottom: 8,
          }}
        >
          ✓ {lang === 'es' ? 'Casi listo' : 'Almost there'}
        </div>
        <div
          style={{
            fontFamily: serif,
            fontSize: 17,
            color: tw.ink,
            lineHeight: 1.3,
            marginBottom: 6,
          }}
        >
          {successTitle}
        </div>
        <p
          style={{
            fontFamily: body,
            fontSize: 13,
            color: tw.sub,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {successBody}
        </p>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: 440 }}>
      <div
        style={{
          display: 'flex',
          border: `1px solid ${status === 'error' ? '#C06A2D' : tw.rule}`,
          background: '#fff',
        }}
      >
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') setStatus('idle')
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && status !== 'loading') {
              e.preventDefault()
              handleSubmit()
            }
          }}
          placeholder={placeholder}
          disabled={status === 'loading'}
          style={{
            flex: 1,
            padding: '14px 16px',
            fontFamily: body,
            fontSize: 14,
            color: tw.ink,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            minWidth: 0,
          }}
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={status === 'loading'}
          style={{
            fontFamily: body,
            fontSize: 10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '0 22px',
            background: tw.green,
            color: '#fff',
            border: 'none',
            cursor: status === 'loading' ? 'wait' : 'pointer',
            whiteSpace: 'nowrap',
            fontWeight: 500,
            opacity: status === 'loading' ? 0.7 : 1,
          }}
        >
          {status === 'loading'
            ? lang === 'es'
              ? 'Enviando…'
              : 'Sending…'
            : `${cta} →`}
        </button>
      </div>
      {status === 'error' && (
        <p
          role="alert"
          style={{
            fontFamily: body,
            fontSize: 12,
            color: '#C06A2D',
            margin: '10px 0 0 0',
          }}
        >
          {errorMsg}
        </p>
      )}
      <p
        style={{
          fontFamily: body,
          fontSize: 11,
          color: tw.faint,
          margin: '10px 0 0 0',
          lineHeight: 1.5,
        }}
      >
        {lang === 'es'
          ? 'Te vamos a mandar un mail para confirmar. Sin spam, sin venta.'
          : "We'll send you an email to confirm. No spam, no sales pitch."}
      </p>
    </div>
  )
}
