'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { useState } from 'react'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'

import type { Metadata } from 'next'

const pageMeta = {
  en: {
    title: 'Contact Bondy — Start a Technical Search in Argentina or LATAM',
    description: 'Ready to hire engineers in Argentina or LATAM? Tell us what you need to build. Bondy responds within 24 hours.',
  },
  es: {
    title: 'Contacto — Iniciá una Búsqueda Técnica en Argentina o LATAM | Bondy',
    description: '¿Necesitás contratar ingenieros en Argentina o LATAM? Contanos qué necesitás construir. Bondy responde en 24 horas.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: { lang: 'en' | 'es' }
}): Promise<Metadata> {
  const baseUrl = 'https://wearebondy.com'
  const meta = pageMeta[params.lang] ?? pageMeta.en
  const canonical = `${baseUrl}/${params.lang}/contact`
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/en/contact`,
        es: `${baseUrl}/es/contact`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      siteName: 'Bondy',
      locale: params.lang === 'es' ? 'es_AR' : 'en_US',
      type: 'website',
    },
  }
}


type FormData = {
  name: string; email: string; company: string; role: string; message: string; service: string
}

export default function ContactPage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  const tr = t(lang)
  const c = tr.contact
  const lk = (href: string) => `/${lang}${href}`

  const [form, setForm] = useState<FormData>({ name: '', email: '', company: '', role: '', message: '', service: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
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
    borderBottom: '1px solid #DDD8D0',
    padding: '14px 0',
    color: '#1A1A1A',
    fontSize: '16px',
    fontWeight: 300,
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'DM Mono, monospace',
    fontSize: '10px',
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: '#C06A2D',
    display: 'block',
    marginBottom: '10px',
  }

  return (
    <main style={{ background: '#F0EBE3', minHeight: '100vh' }}>
      <Nav lang={lang} tr={tr.nav} />

      {/* Header — blanco puro */}
      <header style={{ paddingTop: '60px', background: '#FFFFFF', borderBottom: '1px solid #E8E4DE' }}>
        <div style={{ padding: '4.5rem clamp(1.25rem,5vw,4rem) 4rem', maxWidth: '760px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
            <div style={{ width: '22px', height: '1px', background: '#C06A2D', flexShrink: 0 }} />
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C06A2D' }}>
              {c.label}
            </span>
            <div style={{ width: '22px', height: '1px', background: 'rgba(192,106,45,0.4)', flexShrink: 0 }} />
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(40px,5vw,68px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#1A1A1A', marginBottom: '1.5rem' }}>
            {c.h1_1}<br />{c.h1_2} <em style={{ color: '#C06A2D', fontStyle: 'italic' }}>{c.h1_em}</em>
          </h1>
          <p style={{ fontSize: '17px', lineHeight: 1.78, fontWeight: 300, maxWidth: '520px', color: '#6B6966' }}>
            {c.intro}
          </p>
        </div>
      </header>

      {/* Main — split: datos de contacto (stone) / form (blanco) */}
      <section>
        <div className="contact-split-grid" style={{ borderBottom: '1px solid #E0DBD3' }}>

          {/* Left — info (stone) */}
          <div style={{ background: '#F0EBE3', borderRight: '1px solid #E0DBD3', padding: '4rem clamp(1.25rem,4vw,3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A09D99', marginBottom: '8px' }}>
                    {c.emailLabel}
                  </div>
                  <a href="mailto:hello@wearebondy.com" style={{ fontSize: '16px', fontWeight: 300, color: '#1A1A1A', textDecoration: 'none' }}>
                    hello@wearebondy.com
                  </a>
                </div>
                <div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A09D99', marginBottom: '8px' }}>
                    {c.linkedinLabel}
                  </div>
                  <a href="https://linkedin.com/company/bondygroup" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', fontWeight: 300, color: '#6B6966', textDecoration: 'none' }}>
                    /company/bondygroup ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Join strip */}
            <div style={{ marginTop: '4rem', borderTop: '1px solid #DDD8D0', paddingTop: '2.5rem' }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C06A2D', marginBottom: '0.75rem' }}>
                {c.joiningLabel}
              </div>
              <p style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.75, color: '#6B6966' }}>
                {c.joiningBody}
              </p>
            </div>
          </div>

          {/* Right — form (blanco) */}
          <div style={{ background: '#FFFFFF', padding: '4rem clamp(1.25rem,4vw,3.5rem)' }}>
            {status === 'success' ? (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '42px', fontWeight: 900, color: '#1A1A1A', marginBottom: '1rem' }}>
                  {c.success.title}
                </div>
                <p style={{ fontSize: '16px', fontWeight: 300, lineHeight: 1.75, maxWidth: '360px', color: '#6B6966' }}>
                  {c.success.body}
                </p>
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

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#C06A2D', color: '#0E0E0E', fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '14px 32px', border: 'none', cursor: 'pointer', fontWeight: 500, opacity: status === 'loading' ? 0.5 : 1 }}
                  >
                    {status === 'loading' ? c.form.sending : c.form.submit}
                  </button>
                  {status === 'error' && (
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#C0392B', letterSpacing: '0.1em' }}>
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
          .contact-split-grid > div:first-child { border-right: none !important; border-bottom: 1px solid #E0DBD3; }
          .form-two-col { grid-template-columns: 1fr !important; gap: 2rem; }
        }
      `}</style>
    </main>
  )
}
