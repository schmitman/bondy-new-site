'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { useState } from 'react'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'

// ── COPY ─────────────────────────────────────────────────────────────
const copy = {
  en: {
    label: 'Referrals',
    h1a: 'Know someone',
    h1b: 'great?',
    intro: "If you know a senior tech professional who's open to new opportunities — and they end up getting placed through Bondy — we'll pay you USD 1,000. No strings attached.",
    howLabel: 'How it works',
    steps: [
      { n: '01', title: 'You refer someone', body: 'Fill out the form below with basic info about the person you want to refer. A LinkedIn profile is enough.' },
      { n: '02', title: 'We reach out', body: 'We contact the candidate, evaluate whether there\'s a fit with our current searches, and move forward if there is.' },
      { n: '03', title: 'They get placed', body: 'If your referral is placed through Bondy and completes their first 3 months in the role, you get paid.' },
      { n: '04', title: 'You get paid', body: 'USD 1,000 — transferred directly to you. We\'ll reach out to confirm the details once the placement is confirmed.' },
    ],
    bonusLabel: 'Referral bonus',
    bonusAmount: 'USD 1,000',
    bonusSub: 'paid when your referral completes 3 months in the role',
    formLabel: 'Refer someone',
    yourName: 'Your name',
    yourEmail: 'Your email',
    refName: "Referred person's name",
    refLinkedIn: "Their LinkedIn profile",
    refLinkedInPlaceholder: 'linkedin.com/in/...',
    message: 'Anything relevant about them',
    messagePlaceholder: 'What they do, what they might be looking for, why you think they\'d be a good fit...',
    submit: 'Send referral ↗',
    sending: 'Sending...',
    successTitle: 'Got it.',
    successBody: "We'll reach out to your referral shortly. If it leads to a placement, we'll be in touch with you too.",
    errorMsg: 'Something went wrong. Try emailing us at hello@wearebondy.com',
    finePrint: 'The bonus is paid after the referred candidate completes 3 months in the role. Only one bonus per unique referral. Bondy employees are not eligible.',
  },
  es: {
    label: 'Referidos',
    h1a: '¿Conocés a',
    h1b: 'alguien muy bueno?',
    intro: 'Si referís a un profesional tech senior que esté abierto a nuevas oportunidades — y termina siendo colocado a través de Bondy — te pagamos USD 1.000. Sin letra chica.',
    howLabel: 'Cómo funciona',
    steps: [
      { n: '01', title: 'Referís a alguien', body: 'Completá el formulario con información básica sobre la persona que querés referir. Con el LinkedIn alcanza.' },
      { n: '02', title: 'Nosotros lo contactamos', body: 'Contactamos al candidato, evaluamos si hay fit con nuestras búsquedas activas, y avanzamos si corresponde.' },
      { n: '03', title: 'Lo colocamos', body: 'Si tu referido es colocado a través de Bondy y completa sus primeros 3 meses en el rol, te pagamos.' },
      { n: '04', title: 'Cobras', body: 'USD 1.000 — transferidos directamente a vos. Te contactamos para confirmar los datos una vez confirmada la colocación.' },
    ],
    bonusLabel: 'Bono por referido',
    bonusAmount: 'USD 1.000',
    bonusSub: 'pagado cuando tu referido completa 3 meses en el rol',
    formLabel: 'Referir a alguien',
    yourName: 'Tu nombre',
    yourEmail: 'Tu email',
    refName: 'Nombre del referido',
    refLinkedIn: 'LinkedIn del referido',
    refLinkedInPlaceholder: 'linkedin.com/in/...',
    message: 'Algo relevante sobre la persona',
    messagePlaceholder: 'Qué hace, qué podría estar buscando, por qué creés que encajaría...',
    submit: 'Enviar referido ↗',
    sending: 'Enviando...',
    successTitle: 'Listo.',
    successBody: 'Vamos a contactar a tu referido pronto. Si resulta en una colocación, te avisamos a vos también.',
    errorMsg: 'Algo salió mal. Escribinos a hello@wearebondy.com',
    finePrint: 'El bono se paga una vez que el candidato referido completa 3 meses en el rol. Sólo un bono por referido único. Los empleados de Bondy no son elegibles.',
  },
}

type FormState = {
  referrerName: string
  referrerEmail: string
  refereeName: string
  refereeLinkedIn: string
  message: string
}

export default function ReferralsPage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  const tr = t(lang)
  const lk = (href: string) => `/${lang}${href}`
  const c = copy[lang]

  const [form, setForm] = useState<FormState>({
    referrerName: '',
    referrerEmail: '',
    refereeName: '',
    refereeLinkedIn: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/referrals', {
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
    borderBottom: '1px solid #DDD8D0',
    padding: '14px 0',
    color: '#1A1A1A',
    fontSize: '16px',
    fontWeight: 300,
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const lbl: React.CSSProperties = {
    fontFamily: 'DM Mono, monospace',
    fontSize: '10px',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#C06A2D',
    display: 'block',
    marginBottom: '10px',
  }

  return (
    <main style={{ background: '#F0EBE3', minHeight: '100vh' }}>
      <Nav lang={lang} tr={tr.nav} />

      {/* ── HERO — split blanco / sienna */}
      <header style={{ paddingTop: '60px', borderBottom: '1px solid #E0DBD3' }}>
        <div className="ref-hero-grid">
          {/* Left — headline (blanco) */}
          <div style={{ background: '#FFFFFF', borderRight: '1px solid #E0DBD3', padding: '4rem clamp(1.25rem,4vw,3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
                <div style={{ width: '22px', height: '1px', background: '#C06A2D' }} />
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C06A2D' }}>
                  {c.label}
                </span>
                <div style={{ width: '22px', height: '1px', background: 'rgba(192,106,45,0.4)' }} />
              </div>
              <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(44px,5.5vw,76px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#1A1A1A', marginBottom: '1.75rem' }}>
                {c.h1a}<br />
                <em style={{ color: '#C06A2D', fontStyle: 'italic' }}>{c.h1b}</em>
              </h1>
              <p style={{ fontSize: '16px', lineHeight: 1.78, fontWeight: 300, maxWidth: '400px', color: '#6B6966' }}>
                {c.intro}
              </p>
            </div>
          </div>

          {/* Right — bonus callout (sienna) */}
          <div style={{ background: '#C06A2D', padding: '4rem clamp(1.25rem,4vw,3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem' }}>
              {c.bonusLabel}
            </div>
            <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(64px,10vw,120px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em', color: '#FFFFFF', marginBottom: '1rem' }}>
              {c.bonusAmount}
            </div>
            <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.12em', lineHeight: 1.75, color: 'rgba(255,255,255,0.75)', maxWidth: '280px' }}>
              {c.bonusSub}
            </p>
          </div>
        </div>
      </header>

      {/* ── HOW IT WORKS — stone */}
      <section style={{ background: '#F0EBE3', borderBottom: '1px solid #E0DBD3' }}>
        <div style={{ padding: '1.5rem clamp(1.25rem,5vw,4rem)', borderBottom: '1px solid #E0DBD3' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C06A2D' }}>
            {c.howLabel}
          </div>
        </div>
        <div className="ref-steps-grid">
          {c.steps.map((step, i) => (
            <div key={step.n} style={{ padding: '3rem clamp(1rem,3vw,2.5rem)', borderRight: i < c.steps.length - 1 ? '1px solid #E0DBD3' : 'none' }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C06A2D', marginBottom: '1.75rem' }}>
                {step.n}
              </div>
              <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '20px', fontWeight: 900, color: '#1A1A1A', marginBottom: '1rem', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '14px', lineHeight: 1.82, fontWeight: 300, color: '#6B6966' }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FORM — stone / blanco */}
      <section style={{ borderBottom: '1px solid #E0DBD3' }}>
        <div style={{ padding: '1.5rem clamp(1.25rem,5vw,4rem)', borderBottom: '1px solid #E0DBD3', background: '#FFFFFF' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C06A2D' }}>
            {c.formLabel}
          </div>
        </div>

        <div className="ref-form-grid">
          {/* Left — stone */}
          <div style={{ background: '#F0EBE3', borderRight: '1px solid #E0DBD3', padding: '4rem clamp(1.25rem,4vw,3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p style={{ fontSize: '16px', lineHeight: 1.8, fontWeight: 300, color: '#5A5754' }}>
                {lang === 'en'
                  ? "You don't need to ask the person's permission first — we'll reach out respectfully and mention your name. If they're not interested, that's fine too."
                  : "No es necesario que le pidas permiso primero — los contactamos con respeto y mencionamos tu nombre. Si no están interesados, no hay problema."}
              </p>
              <p style={{ fontSize: '16px', lineHeight: 1.8, fontWeight: 300, color: '#6B6966' }}>
                {lang === 'en'
                  ? "We only pursue referrals that are a genuine fit for our active searches. We won't chase someone who doesn't make sense."
                  : "Sólo avanzamos con referidos que son un fit real para nuestras búsquedas activas. No vamos a perseguir a alguien que no tiene sentido."}
              </p>
            </div>
            <div style={{ marginTop: '3rem', borderTop: '1px solid #DDD8D0', paddingTop: '1.5rem' }}>
              <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.12em', lineHeight: 1.75, color: '#A09D99' }}>
                {c.finePrint}
              </p>
            </div>
          </div>

          {/* Right — form (blanco) */}
          <div style={{ background: '#FFFFFF', padding: '4rem clamp(1.25rem,4vw,3.5rem)' }}>
            {status === 'success' ? (
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem 0' }}>
                <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '42px', fontWeight: 900, color: '#1A1A1A', marginBottom: '1rem' }}>{c.successTitle}</div>
                <p style={{ fontSize: '16px', fontWeight: 300, lineHeight: 1.75, maxWidth: '360px', color: '#6B6966' }}>{c.successBody}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div className="form-two-col">
                  <div>
                    <label style={lbl}>{c.yourName}</label>
                    <input name="referrerName" value={form.referrerName} onChange={handleChange} required
                      placeholder={lang === 'en' ? 'Your name' : 'Tu nombre'} style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#C06A2D')}
                      onBlur={e => (e.target.style.borderColor = '#DDD8D0')} />
                  </div>
                  <div>
                    <label style={lbl}>{c.yourEmail}</label>
                    <input type="email" name="referrerEmail" value={form.referrerEmail} onChange={handleChange} required
                      placeholder="you@email.com" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#C06A2D')}
                      onBlur={e => (e.target.style.borderColor = '#DDD8D0')} />
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #E8E4DE', paddingTop: '2rem' }}>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A09D99', marginBottom: '2rem' }}>
                    {lang === 'en' ? 'About the person you\'re referring' : 'Sobre el referido'}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <div>
                      <label style={lbl}>{c.refName}</label>
                      <input name="refereeName" value={form.refereeName} onChange={handleChange} required
                        placeholder={lang === 'en' ? 'Their full name' : 'Nombre completo'} style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = '#C06A2D')}
                        onBlur={e => (e.target.style.borderColor = '#DDD8D0')} />
                    </div>
                    <div>
                      <label style={lbl}>{c.refLinkedIn}</label>
                      <input name="refereeLinkedIn" value={form.refereeLinkedIn} onChange={handleChange}
                        placeholder={c.refLinkedInPlaceholder} style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = '#C06A2D')}
                        onBlur={e => (e.target.style.borderColor = '#DDD8D0')} />
                    </div>
                    <div>
                      <label style={lbl}>{c.message}</label>
                      <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                        placeholder={c.messagePlaceholder} style={{ ...inputStyle, resize: 'none' }}
                        onFocus={e => (e.target.style.borderColor = '#C06A2D')}
                        onBlur={e => (e.target.style.borderColor = '#DDD8D0')} />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <button type="submit" disabled={status === 'loading'}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#C06A2D', color: '#0E0E0E', fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '14px 32px', border: 'none', cursor: 'pointer', fontWeight: 500, opacity: status === 'loading' ? 0.5 : 1 }}>
                    {status === 'loading' ? c.sending : c.submit}
                  </button>
                  {status === 'error' && (
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#C0392B', letterSpacing: '0.1em' }}>{c.errorMsg}</span>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer lang={lang} tr={tr.footer} />

      <style>{`
        .ref-hero-grid, .ref-form-grid { display: grid; grid-template-columns: 1fr 1fr; }
        .ref-steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
        .form-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; }
        @media (max-width: 768px) {
          .ref-hero-grid, .ref-form-grid { grid-template-columns: 1fr !important; }
          .ref-hero-grid > div:first-child, .ref-form-grid > div:first-child { border-right: none !important; border-bottom: 1px solid #E0DBD3; }
          .ref-steps-grid { grid-template-columns: 1fr 1fr !important; }
          .ref-steps-grid > div { border-right: none !important; border-bottom: 1px solid #E0DBD3; }
          .form-two-col { grid-template-columns: 1fr !important; gap: 2rem; }
        }
      `}</style>
    </main>
  )
}
