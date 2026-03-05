'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { useState } from 'react'

type FormData = {
  name: string
  email: string
  company: string
  role: string
  message: string
  service: string
}

const services = [
  { value: 'hunting',  label: 'Hunting', sub: 'Fill a specific role, end-to-end' },
  { value: 'pipeline', label: 'Talent Pipeline', sub: 'Better top-of-funnel' },
  { value: 'rpo',      label: 'Embedded Recruiter', sub: 'Scale hiring' },
  { value: 'other',    label: 'Not sure yet', sub: 'Let\'s figure it out together' },
]

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: '', email: '', company: '', role: '', message: '', service: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
    border: 'none',
    borderBottom: '1px solid #E8E4DE',
    padding: '12px 0',
    fontSize: '15px',
    fontWeight: 300,
    color: '#1A1A1A',
    outline: 'none',
    fontFamily: 'DM Sans, system-ui, sans-serif',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'DM Mono, monospace',
    fontSize: '9px',
    letterSpacing: '0.16em',
    textTransform: 'uppercase' as const,
    color: '#C06A2D',
    display: 'block',
    marginBottom: '6px',
  }

  return (
    <main style={{ background: '#F0EBE3', minHeight: '100vh' }}>
      <Nav />

      <div style={{ paddingTop: '60px', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 60px)' }} className="contact-grid">

        {/* Left — info */}
        <div style={{ background: '#FFFFFF', borderRight: '1px solid #E8E4DE', padding: '4.5rem clamp(1.25rem,5vw,4rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
              <div style={{ width: '22px', height: '1px', background: '#C06A2D' }} />
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C06A2D' }}>
                Get in touch
              </span>
            </div>

            <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(36px,4.5vw,62px)', fontWeight: 900, lineHeight: .96, letterSpacing: '-.02em', color: '#1A1A1A', marginBottom: '1.75rem' }}>
              Tell us what<br />you&apos;re <em style={{ color: '#C06A2D', fontStyle: 'italic' }}>building.</em>
            </h1>

            <p style={{ fontSize: '15px', lineHeight: 1.72, fontWeight: 300, color: '#7A7874', maxWidth: '340px', marginBottom: '3rem' }}>
              Someone from the Bondy team will read this and reply within one business day. No automated responses.
            </p>

            {/* Promise cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              {[
                ['Reply within 24h', 'A real person reads every submission.'],
                ['Honest assessment', 'We\'ll tell you if we\'re not the right fit.'],
                ['No hard sell', 'One conversation, no follow-up pressure.'],
              ].map(([title, desc]) => (
                <div key={title} style={{ padding: '1.1rem 1.5rem', background: '#F0EBE3', borderLeft: '2px solid rgba(192,106,45,0.2)' }}>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#C06A2D', marginBottom: '.3rem' }}>
                    {title}
                  </div>
                  <div style={{ fontSize: '13px', color: '#7A7874', fontWeight: 300 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #E8E4DE' }}>
            <a href="mailto:hello@wearebondy.com" style={{ display: 'block', fontSize: '15px', color: '#1A1A1A', fontWeight: 300, textDecoration: 'none', marginBottom: '.5rem' }}>
              hello@wearebondy.com
            </a>
            <a href="https://linkedin.com/company/bondygroup" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '.13em', textTransform: 'uppercase', color: '#7A7874', textDecoration: 'none' }}>
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* Right — form */}
        <div style={{ padding: '4.5rem clamp(1.25rem,5vw,4rem)' }}>
          {status === 'success' ? (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
              <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '2.75rem', fontWeight: 900, color: '#1A1A1A', marginBottom: '1rem', letterSpacing: '-.02em' }}>
                Got it.
              </div>
              <p style={{ fontSize: '15px', color: '#7A7874', fontWeight: 300, lineHeight: 1.72, maxWidth: '360px' }}>
                We&apos;ll get back to you within one business day. In the meantime, feel free to read about our method or browse our thinking.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

              {/* Service selector */}
              <div>
                <span style={labelStyle}>What are you looking for?</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
                  {services.map(({ value, label, sub }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setForm({ ...form, service: value })}
                      style={{
                        padding: '1rem',
                        border: `1px solid ${form.service === value ? '#C06A2D' : '#E8E4DE'}`,
                        background: form.service === value ? 'rgba(192,106,45,0.06)' : '#FFFFFF',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all .15s',
                      }}
                    >
                      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '.13em', textTransform: 'uppercase', color: form.service === value ? '#C06A2D' : '#1A1A1A', marginBottom: '.3rem' }}>
                        {label}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#7A7874', fontWeight: 300, lineHeight: 1.4 }}>
                        {sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <label style={labelStyle}>Your name</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Name" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Work email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@company.com" style={inputStyle} />
                </div>
              </div>

              {/* Company + Role */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <label style={labelStyle}>Company</label>
                  <input name="company" value={form.company} onChange={handleChange} required placeholder="Company name" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Your role</label>
                  <input name="role" value={form.role} onChange={handleChange} placeholder="VP Eng, CTO..." style={inputStyle} />
                </div>
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle}>Tell us about the hire</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="What role? What's the context? What have you tried?"
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '.13em', textTransform: 'uppercase', background: '#C06A2D', color: '#fff', padding: '13px 26px', border: 'none', cursor: 'pointer', opacity: status === 'loading' ? .6 : 1 }}
                >
                  {status === 'loading' ? 'Sending...' : 'Send ↗'}
                </button>
                {status === 'error' && (
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#C06A2D', letterSpacing: '.1em' }}>
                    Something went wrong. Email us directly.
                  </span>
                )}
              </div>
            </form>
          )}
        </div>
      </div>

      <Footer />

      <style>{`
        .contact-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
