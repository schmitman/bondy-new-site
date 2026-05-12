'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Turnstile from '@/components/Turnstile'
import { useState } from 'react'
import Link from 'next/link'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'

type FormData = {
  name: string; email: string; company: string; role: string; message: string; service: string
}

const tw = {
  bg: '#FEFCF9', ink: '#1A1A1A', inkMid: '#3A3530', inkSub: '#5A5550',
  inkFaint: '#7A7874', rule: '#E8E4DE', white: '#FFFFFF', green: '#4A8C40',
}
const notebookBg = [
  'linear-gradient(90deg, transparent 68px, rgba(210,100,80,0.10) 68px, rgba(210,100,80,0.10) 69.5px, transparent 69.5px)',
  'repeating-linear-gradient(180deg, transparent 0px, transparent 31px, rgba(100,140,200,0.09) 31px, rgba(100,140,200,0.09) 32px)',
].join(',')
const serif = "'Special Elite', Georgia, serif"
const mono  = "'Plus Jakarta Sans', system-ui, sans-serif"

export default function ContactClient({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  const tr = t(lang)
  const c = tr.contact

  const [form, setForm] = useState<FormData>({ name: '', email: '', company: '', role: '', message: '', service: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!turnstileToken) {
      setStatus('error')
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang, turnstileToken }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    borderBottom: `1px solid ${tw.rule}`,
    padding: '14px 0',
    color: tw.ink,
    fontFamily: mono,
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: mono,
    fontSize: '10px',
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: tw.green,
    display: 'block',
    marginBottom: '10px',
  }

  return (
    <main style={{ backgroundColor: tw.bg, backgroundImage: notebookBg, minHeight: '100vh' }}>
      <Nav lang={lang} tr={tr.nav} />

      {/* Header */}
      <header style={{ background: tw.white, borderBottom: `1px solid ${tw.rule}` }}>
        <div style={{ padding: '4.5rem clamp(1.25rem,5vw,4rem) 4rem', maxWidth: '760px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
            <div style={{ width: '22px', height: '1px', background: tw.green }} />
            <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: tw.green }}>
              {c.label}
            </span>
          </div>
          <h1 style={{ fontFamily: serif, fontSize: 'clamp(2.5rem,5vw,4.5rem)', lineHeight: 1.05, color: tw.inkMid, marginBottom: '0.5rem' }} className="tw-ink-heavy">
            {c.h1_1}<br />{c.h1_2} {c.h1_em}
          </h1>
          <svg width="240" height="8" viewBox="0 0 240 8" fill="none" style={{ display: 'block', marginBottom: '2rem' }}>
            <path d="M0 4 Q60 1 120 4 Q180 7 240 4" stroke="#4A8C40" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
          <p style={{ fontFamily: mono, fontSize: '15px', lineHeight: 1.78, maxWidth: '520px', color: tw.inkSub }}>
            {c.intro}
          </p>
        </div>
      </header>

      {/* Split */}
      <section>
        <div className="contact-split-grid" style={{ borderBottom: `1px solid ${tw.rule}` }}>

          {/* Left — info */}
          <div style={{ background: tw.bg, borderRight: `1px solid ${tw.rule}`, padding: '4rem clamp(1.25rem,4vw,3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div>
                <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: tw.inkFaint, marginBottom: '8px' }}>
                  {c.emailLabel}
                </div>
                <a href="mailto:hello@wearebondy.com" style={{ fontFamily: mono, fontSize: '15px', color: tw.green, textDecoration: 'none' }}>
                  hello@wearebondy.com
                </a>
              </div>
              <div>
                <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: tw.inkFaint, marginBottom: '8px' }}>
                  {c.linkedinLabel}
                </div>
                <a href="https://linkedin.com/company/bondygroup" target="_blank" rel="noopener noreferrer" style={{ fontFamily: mono, fontSize: '14px', color: tw.inkSub, textDecoration: 'none' }}>
                  /company/bondygroup ↗
                </a>
              </div>
            </div>
            <div style={{ marginTop: '4rem', borderTop: `1px solid ${tw.rule}`, paddingTop: '2.5rem' }}>
              <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: tw.green, marginBottom: '0.75rem' }}>
                {c.joiningLabel}
              </div>
              <p style={{ fontFamily: mono, fontSize: '14px', lineHeight: 1.75, color: tw.inkSub }}>
                {c.joiningBody}
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div style={{ background: tw.white, padding: '4rem clamp(1.25rem,4vw,3.5rem)' }}>
            {status === 'success' ? (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem' }}>
                <div>
                  <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: tw.green, marginBottom: '0.75rem' }}>
                    ● {lang === 'en' ? 'Message received' : 'Mensaje recibido'}
                  </div>
                  <div style={{ fontFamily: serif, fontSize: 'clamp(2rem,3.5vw,2.75rem)', color: tw.inkMid, marginBottom: '1rem', lineHeight: 1.1 }} className="tw-ink">
                    {c.success.title}
                  </div>
                  <p style={{ fontFamily: mono, fontSize: '15px', lineHeight: 1.75, maxWidth: '420px', color: tw.inkSub }}>
                    {c.success.body}
                  </p>
                </div>
                <div style={{ borderTop: `1px solid ${tw.rule}`, paddingTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: tw.inkFaint, marginBottom: '0.25rem' }}>
                    {lang === 'en' ? 'While you wait' : 'Mientras tanto'}
                  </div>
                  <Link href={`/${lang}/thinking`} style={{ fontFamily: mono, fontSize: '14px', color: tw.green, textDecoration: 'none' }}>
                    → {lang === 'en' ? 'Read our latest thinking' : 'Leé nuestras ideas más recientes'}
                  </Link>
                  <a href="https://tools.wearebondy.com/busco-trabajo" target="_blank" rel="noopener noreferrer" style={{ fontFamily: mono, fontSize: '14px', color: tw.green, textDecoration: 'none' }}>
                    → {lang === 'en' ? 'Browse open roles in LATAM ↗' : 'Explorá búsquedas abiertas en LATAM ↗'}
                  </a>
                  <a href="https://linkedin.com/company/bondygroup" target="_blank" rel="noopener noreferrer" style={{ fontFamily: mono, fontSize: '14px', color: tw.green, textDecoration: 'none' }}>
                    → {lang === 'en' ? 'Follow Bondy on LinkedIn ↗' : 'Seguinos en LinkedIn ↗'}
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div>
                  <label style={labelStyle}>{c.form.serviceLabel}</label>
                  <select name="service" value={form.service} onChange={handleChange} required style={{ ...inputStyle, appearance: 'none' as const }}>
                    <option value="" disabled>{c.form.servicePlaceholder}</option>
                    {c.form.serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-two-col">
                  <div>
                    <label style={labelStyle}>{c.form.nameLabel}</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder={c.form.namePlaceholder} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>{c.form.emailLabel}</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder={c.form.emailPlaceholder} style={inputStyle} />
                  </div>
                </div>

                <div className="form-two-col">
                  <div>
                    <label style={labelStyle}>{c.form.companyLabel}</label>
                    <input name="company" value={form.company} onChange={handleChange} required placeholder={c.form.companyPlaceholder} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>{c.form.roleLabel}</label>
                    <input name="role" value={form.role} onChange={handleChange} placeholder={c.form.rolePlaceholder} style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>{c.form.messageLabel}</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder={c.form.messagePlaceholder} style={{ ...inputStyle, resize: 'none' }} />
                </div>

                <Turnstile onVerify={(token) => setTurnstileToken(token)} onExpire={() => setTurnstileToken(null)} />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <button
                    type="submit"
                    disabled={status === 'loading' || !turnstileToken}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '10px',
                      background: tw.green, color: '#fff',
                      fontFamily: mono, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase',
                      padding: '13px 28px', border: 'none',
                      cursor: (status === 'loading' || !turnstileToken) ? 'not-allowed' : 'pointer',
                      opacity: (status === 'loading' || !turnstileToken) ? 0.5 : 1,
                    }}
                  >
                    {status === 'loading' ? c.form.sending : c.form.submit}
                  </button>
                  {status === 'error' && (
                    <span style={{ fontFamily: mono, fontSize: '10px', color: '#C0392B', letterSpacing: '0.1em' }}>
                      {c.form.errorMsg}
                    </span>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer lang={lang} tr={tr.footer} />

      <style>{`
        .contact-split-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          min-height: calc(100vh - 200px);
        }
        .form-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
        }
        @media (max-width: 768px) {
          .contact-split-grid { grid-template-columns: 1fr !important; }
          .contact-split-grid > div:first-child { border-right: none !important; border-bottom: 1px solid #E8E4DE; }
          .form-two-col { grid-template-columns: 1fr !important; gap: 2rem; }
        }
      `}</style>
    </main>
  )
}
