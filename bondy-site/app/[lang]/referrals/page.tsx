'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { useState } from 'react'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'

const tw = {
  bg: '#FEFCF9', ink: '#1A1A1A', inkMid: '#3A3530', inkSub: '#5A5550',
  inkFaint: '#7A7874', rule: '#E8E4DE', white: '#FFFFFF', green: '#4A8C40',
}
const notebookBg = [
  'linear-gradient(90deg, transparent 68px, rgba(210,100,80,0.10) 68px, rgba(210,100,80,0.10) 69.5px, transparent 69.5px)',
  'repeating-linear-gradient(180deg, transparent 0px, transparent 31px, rgba(100,140,200,0.09) 31px, rgba(100,140,200,0.09) 32px)',
].join(',')
const serif = "'Special Elite', Georgia, serif"
const mono  = "'Courier Prime', Courier, monospace"

const copy = {
  en: {
    label: 'Referrals',
    h1a: 'Know someone',
    h1b: 'great?',
    intro: "If you know a senior tech professional who's open to new opportunities — and they end up getting placed through Bondy — we'll pay you USD 1,000. No strings attached.",
    howLabel: 'How it works',
    steps: [
      { n: '01', title: 'You refer someone', body: 'Fill out the form below with basic info about the person you want to refer. A LinkedIn profile is enough.' },
      { n: '02', title: 'We reach out', body: "We contact the candidate, evaluate whether there's a fit with our current searches, and move forward if there is." },
      { n: '03', title: 'They get placed', body: 'If your referral is placed through Bondy and completes their first 3 months in the role, you get paid.' },
      { n: '04', title: 'You get paid', body: "USD 1,000 — transferred directly to you. We'll reach out to confirm the details once the placement is confirmed." },
    ],
    bonusLabel: 'Referral bonus',
    bonusAmount: 'USD 1,000',
    bonusSub: 'paid when your referral completes 3 months in the role',
    formLabel: 'Refer someone',
    yourName: 'Your name', yourEmail: 'Your email',
    refName: "Referred person's name", refLinkedIn: "Their LinkedIn profile",
    refLinkedInPlaceholder: 'linkedin.com/in/...',
    message: 'Anything relevant about them',
    messagePlaceholder: "What they do, what they might be looking for, why you think they'd be a good fit...",
    submit: 'Send referral →', sending: 'Sending...',
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
      { n: '04', title: 'Cobras', body: "USD 1.000 — transferidos directamente a vos. Te contactamos para confirmar los datos una vez confirmada la colocación." },
    ],
    bonusLabel: 'Bono por referido',
    bonusAmount: 'USD 1.000',
    bonusSub: 'pagado cuando tu referido completa 3 meses en el rol',
    formLabel: 'Referir a alguien',
    yourName: 'Tu nombre', yourEmail: 'Tu email',
    refName: 'Nombre del referido', refLinkedIn: 'LinkedIn del referido',
    refLinkedInPlaceholder: 'linkedin.com/in/...',
    message: 'Algo relevante sobre la persona',
    messagePlaceholder: 'Qué hace, qué podría estar buscando, por qué creés que encajaría...',
    submit: 'Enviar referido →', sending: 'Enviando...',
    successTitle: 'Listo.',
    successBody: 'Vamos a contactar a tu referido pronto. Si resulta en una colocación, te avisamos a vos también.',
    errorMsg: 'Algo salió mal. Escribinos a hello@wearebondy.com',
    finePrint: 'El bono se paga una vez que el candidato referido completa 3 meses en el rol. Sólo un bono por referido único. Los empleados de Bondy no son elegibles.',
  },
}

type FormState = { referrerName: string; referrerEmail: string; refereeName: string; refereeLinkedIn: string; message: string }

export default function ReferralsPage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  const tr = t(lang)
  const c = copy[lang]

  const [form, setForm] = useState<FormState>({ referrerName: '', referrerEmail: '', refereeName: '', refereeLinkedIn: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/referrals', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
    } catch { setStatus('error') }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'transparent', borderBottom: `1px solid ${tw.rule}`,
    padding: '14px 0', color: tw.ink, fontFamily: mono, fontSize: '15px', outline: 'none', transition: 'border-color 0.2s',
  }
  const lbl: React.CSSProperties = {
    fontFamily: mono, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
    color: tw.green, display: 'block', marginBottom: '10px',
  }

  return (
    <main style={{ backgroundColor: tw.bg, backgroundImage: notebookBg, minHeight: '100vh' }}>
      <Nav lang={lang} tr={tr.nav} />

      {/* Header — split: headline / bonus callout */}
      <header style={{ borderBottom: `1px solid ${tw.rule}` }}>
        <div className="ref-hero-grid">
          {/* Left */}
          <div style={{ background: tw.white, borderRight: `1px solid ${tw.rule}`, padding: '4rem clamp(1.25rem,4vw,3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
                <div style={{ width: '22px', height: '1px', background: tw.green }} />
                <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: tw.green }}>{c.label}</span>
              </div>
              <h1 style={{ fontFamily: serif, fontSize: 'clamp(2.5rem,5.5vw,5rem)', lineHeight: 1.05, color: tw.inkMid, marginBottom: '0.5rem' }} className="tw-ink-heavy">
                {c.h1a}<br />{c.h1b}
              </h1>
              <svg width="200" height="8" viewBox="0 0 200 8" fill="none" style={{ display: 'block', marginBottom: '2rem' }}>
                <path d="M0 4 Q50 1 100 4 Q150 7 200 4" stroke="#4A8C40" strokeWidth="2" fill="none" strokeLinecap="round"/>
              </svg>
              <p style={{ fontFamily: mono, fontSize: '15px', lineHeight: 1.78, maxWidth: '400px', color: tw.inkSub }}>{c.intro}</p>
            </div>
          </div>
          {/* Right — bonus callout en verde */}
          <div style={{ background: tw.green, padding: '4rem clamp(1.25rem,4vw,3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem' }}>
              {c.bonusLabel}
            </div>
            <div style={{ fontFamily: serif, fontSize: 'clamp(3.5rem,10vw,7rem)', lineHeight: 1, color: '#FFFFFF', marginBottom: '1rem' }} className="tw-ink-heavy">
              {c.bonusAmount}
            </div>
            <p style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.12em', lineHeight: 1.75, color: 'rgba(255,255,255,0.75)', maxWidth: '280px' }}>
              {c.bonusSub}
            </p>
          </div>
        </div>
      </header>

      {/* How it works */}
      <section style={{ borderBottom: `1px solid ${tw.rule}` }}>
        <div style={{ padding: '1.5rem clamp(1.25rem,5vw,4rem)', borderBottom: `1px solid ${tw.rule}` }}>
          <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: tw.green }}>{c.howLabel}</span>
        </div>
        <div className="ref-steps-grid">
          {c.steps.map((step, i) => (
            <div key={step.n} style={{ padding: '3rem clamp(1rem,3vw,2.5rem)', borderRight: i < c.steps.length - 1 ? `1px solid ${tw.rule}` : 'none', background: i % 2 === 0 ? tw.white : tw.bg }}>
              <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: tw.green, marginBottom: '1.75rem' }}>{step.n}</div>
              <h3 style={{ fontFamily: serif, fontSize: '1.1rem', color: tw.inkMid, marginBottom: '1rem', lineHeight: 1.2 }} className="tw-ink">{step.title}</h3>
              <p style={{ fontFamily: mono, fontSize: '13px', lineHeight: 1.82, color: tw.inkSub }}>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section style={{ borderBottom: `1px solid ${tw.rule}` }}>
        <div style={{ padding: '1.5rem clamp(1.25rem,5vw,4rem)', borderBottom: `1px solid ${tw.rule}`, background: tw.white }}>
          <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: tw.green }}>{c.formLabel}</span>
        </div>
        <div className="ref-form-grid">
          {/* Left */}
          <div style={{ backgroundColor: tw.bg, backgroundImage: notebookBg, borderRight: `1px solid ${tw.rule}`, padding: '4rem clamp(1.25rem,4vw,3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p style={{ fontFamily: mono, fontSize: '14px', lineHeight: 1.8, color: tw.inkSub }}>
                {lang === 'en' ? "You don't need to ask the person's permission first — we'll reach out respectfully and mention your name. If they're not interested, that's fine too." : "No es necesario que le pidas permiso primero — los contactamos con respeto y mencionamos tu nombre. Si no están interesados, no hay problema."}
              </p>
              <p style={{ fontFamily: mono, fontSize: '14px', lineHeight: 1.8, color: tw.inkFaint }}>
                {lang === 'en' ? "We only pursue referrals that are a genuine fit for our active searches. We won't chase someone who doesn't make sense." : "Sólo avanzamos con referidos que son un fit real para nuestras búsquedas activas. No vamos a perseguir a alguien que no tiene sentido."}
              </p>
            </div>
            <div style={{ marginTop: '3rem', borderTop: `1px solid ${tw.rule}`, paddingTop: '1.5rem' }}>
              <p style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.12em', lineHeight: 1.75, color: tw.inkFaint }}>{c.finePrint}</p>
            </div>
          </div>
          {/* Right */}
          <div style={{ background: tw.white, padding: '4rem clamp(1.25rem,4vw,3.5rem)' }}>
            {status === 'success' ? (
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem 0' }}>
                <div style={{ fontFamily: serif, fontSize: '2.5rem', color: tw.inkMid, marginBottom: '1rem' }} className="tw-ink">{c.successTitle}</div>
                <p style={{ fontFamily: mono, fontSize: '15px', lineHeight: 1.75, maxWidth: '360px', color: tw.inkSub }}>{c.successBody}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div className="form-two-col">
                  <div><label style={lbl}>{c.yourName}</label><input name="referrerName" value={form.referrerName} onChange={handleChange} required placeholder={lang === 'en' ? 'Your name' : 'Tu nombre'} style={inputStyle} /></div>
                  <div><label style={lbl}>{c.yourEmail}</label><input type="email" name="referrerEmail" value={form.referrerEmail} onChange={handleChange} required placeholder="you@email.com" style={inputStyle} /></div>
                </div>
                <div style={{ borderTop: `1px solid ${tw.rule}`, paddingTop: '2rem' }}>
                  <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: tw.inkFaint, marginBottom: '2rem' }}>
                    {lang === 'en' ? "About the person you're referring" : 'Sobre el referido'}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <div><label style={lbl}>{c.refName}</label><input name="refereeName" value={form.refereeName} onChange={handleChange} required placeholder={lang === 'en' ? 'Their full name' : 'Nombre completo'} style={inputStyle} /></div>
                    <div><label style={lbl}>{c.refLinkedIn}</label><input name="refereeLinkedIn" value={form.refereeLinkedIn} onChange={handleChange} placeholder={c.refLinkedInPlaceholder} style={inputStyle} /></div>
                    <div><label style={lbl}>{c.message}</label><textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder={c.messagePlaceholder} style={{ ...inputStyle, resize: 'none' }} /></div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <button type="submit" disabled={status === 'loading'} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: tw.green, color: '#fff', fontFamily: mono, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '13px 28px', border: 'none', cursor: 'pointer', opacity: status === 'loading' ? 0.5 : 1 }}>
                    {status === 'loading' ? c.sending : c.submit}
                  </button>
                  {status === 'error' && <span style={{ fontFamily: mono, fontSize: '10px', color: '#C0392B', letterSpacing: '0.1em' }}>{c.errorMsg}</span>}
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
          .ref-hero-grid > div:first-child, .ref-form-grid > div:first-child { border-right: none !important; border-bottom: 1px solid #E8E4DE; }
          .ref-steps-grid { grid-template-columns: 1fr 1fr !important; }
          .ref-steps-grid > div { border-right: none !important; border-bottom: 1px solid #E8E4DE; }
          .form-two-col { grid-template-columns: 1fr !important; gap: 2rem; }
        }
      `}</style>
    </main>
  )
}
