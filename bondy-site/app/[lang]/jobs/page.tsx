'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { useState } from 'react'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'

const copy = {
  en: {
    label: 'Join Bondy',
    h1a: 'We hire',
    h1b: 'recruiters differently.',
    intro: "We're a small team that does serious work. If you think recruiting is a craft — not a numbers game — we'd like to hear from you.",
    whatLabel: 'What we look for',
    what: [
      {
        title: 'Intellectual curiosity',
        body: 'You read about the companies you work with. You care about what they build, not just what they need to hire.',
      },
      {
        title: 'Diagnostic thinking',
        body: "You ask why before you ask how. When a search isn't working, you look at the root cause — not just the sourcing funnel.",
      },
      {
        title: 'Honest communication',
        body: "You tell clients what they need to hear, not what they want to hear. You can say 'this brief is wrong' — and then help fix it.",
      },
      {
        title: 'Technical literacy',
        body: "You don't need to code, but you understand why the difference between a Staff Engineer and a Principal matters — and you can explain it to a founder.",
      },
    ],
    notLabel: "We're probably not a fit if",
    not: [
      "You measure success by volume of CVs sent",
      "You think the best recruiters are the fastest ones",
      "You want a commission-first, relationship-second environment",
    ],
    formLabel: 'Tell us about yourself',
    name: 'Your name',
    email: 'Email',
    linkedin: 'Your LinkedIn',
    linkedinPlaceholder: 'linkedin.com/in/...',
    roleInterest: 'What type of role interests you',
    yearsExp: 'Years in recruiting',
    message: 'Why Bondy?',
    messagePlaceholder: "What draws you to this kind of work? What's your background? What would you bring?",
    submit: 'Send ↗',
    sending: 'Sending...',
    successTitle: 'Got it.',
    successBody: "We read every application personally. If there's a fit — now or in the future — we'll be in touch.",
    errorMsg: 'Something went wrong. Email us at hello@wearebondy.com',
    roleOptions: [
      { value: '', label: 'Select one...' },
      { value: 'recruiter', label: 'Technical Recruiter' },
      { value: 'senior_recruiter', label: 'Senior Recruiter' },
      { value: 'researcher', label: 'Talent Researcher / Sourcer' },
      { value: 'partner', label: 'Partner / Lead' },
      { value: 'other', label: 'Other' },
    ],
    expOptions: [
      { value: '', label: 'Select one...' },
      { value: '1-2', label: '1–2 years' },
      { value: '3-5', label: '3–5 years' },
      { value: '6-10', label: '6–10 years' },
      { value: '10+', label: '10+ years' },
    ],
  },
  es: {
    label: 'Sumate a Bondy',
    h1a: 'Contratamos',
    h1b: 'recruiters de otra manera.',
    intro: 'Somos un equipo chico que hace trabajo serio. Si creés que el recruiting es un oficio — no un juego de volumen — nos gustaría conocerte.',
    whatLabel: 'Qué buscamos',
    what: [
      {
        title: 'Curiosidad intelectual',
        body: 'Leés sobre las empresas con las que trabajás. Te importa qué construyen, no sólo qué necesitan contratar.',
      },
      {
        title: 'Pensamiento diagnóstico',
        body: 'Preguntás por qué antes de preguntar cómo. Cuando una búsqueda no funciona, buscás la causa raíz — no sólo el funnel de sourcing.',
      },
      {
        title: 'Comunicación honesta',
        body: 'Le decís a los clientes lo que necesitan escuchar, no lo que quieren. Podés decir "este brief está mal" — y después ayudar a corregirlo.',
      },
      {
        title: 'Alfabetización técnica',
        body: 'No necesitás programar, pero entendés por qué importa la diferencia entre un Staff Engineer y un Principal — y podés explicárselo a un founder.',
      },
    ],
    notLabel: 'Probablemente no hay fit si',
    not: [
      'Medís el éxito por volumen de CVs enviados',
      'Creés que el mejor recruiter es el más rápido',
      'Querés un ambiente donde la comisión va antes que la relación',
    ],
    formLabel: 'Contanos sobre vos',
    name: 'Tu nombre',
    email: 'Email',
    linkedin: 'Tu LinkedIn',
    linkedinPlaceholder: 'linkedin.com/in/...',
    roleInterest: 'Qué tipo de rol te interesa',
    yearsExp: 'Años en recruiting',
    message: '¿Por qué Bondy?',
    messagePlaceholder: '¿Qué te atrae de este tipo de trabajo? ¿Cuál es tu background? ¿Qué traerías?',
    submit: 'Enviar ↗',
    sending: 'Enviando...',
    successTitle: 'Listo.',
    successBody: 'Leemos cada aplicación personalmente. Si hay fit — ahora o en el futuro — te contactamos.',
    errorMsg: 'Algo salió mal. Escribinos a hello@wearebondy.com',
    roleOptions: [
      { value: '', label: 'Seleccioná...' },
      { value: 'recruiter', label: 'Recruiter Técnico' },
      { value: 'senior_recruiter', label: 'Recruiter Senior' },
      { value: 'researcher', label: 'Talent Researcher / Sourcer' },
      { value: 'partner', label: 'Partner / Líder' },
      { value: 'other', label: 'Otro' },
    ],
    expOptions: [
      { value: '', label: 'Seleccioná...' },
      { value: '1-2', label: '1–2 años' },
      { value: '3-5', label: '3–5 años' },
      { value: '6-10', label: '6–10 años' },
      { value: '10+', label: '10+ años' },
    ],
  },
}

type FormState = {
  name: string
  email: string
  linkedin: string
  roleInterest: string
  yearsExperience: string
  message: string
}

export default function JobsPage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  const tr = t(lang)
  const lk = (href: string) => `/${lang}${href}`
  const c = copy[lang]

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    linkedin: '',
    roleInterest: '',
    yearsExperience: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/jobs', {
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

  const inputClass = "w-full bg-transparent border-b py-4 text-b-off text-[15px] font-light placeholder-b-mid/40 focus:outline-none transition-colors"
  const inputStyle = { borderColor: 'rgba(255,255,255,0.15)' }
  const labelClass = "font-mono-bondy text-[10px] tracking-widest uppercase block mb-3 text-b-orange"

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

  return (
    <main style={{ background: '#F0EBE3', minHeight: '100vh' }}>
      <Nav lang={lang} tr={tr.nav} />

      {/* ── HEADER — blanco */}
      <header style={{ paddingTop: '60px', background: '#FFFFFF', borderBottom: '1px solid #E8E4DE' }}>
        <div style={{ padding: '4.5rem clamp(1.25rem,5vw,4rem) 4rem', maxWidth: '860px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
            <div style={{ width: '22px', height: '1px', background: '#C06A2D' }} />
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C06A2D' }}>
              {c.label}
            </span>
            <div style={{ width: '22px', height: '1px', background: 'rgba(192,106,45,0.4)' }} />
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(48px,6vw,80px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#1A1A1A', marginBottom: '1.75rem' }}>
            {c.h1a}<br />
            <em style={{ color: '#C06A2D', fontStyle: 'italic' }}>{c.h1b}</em>
          </h1>
          <p style={{ fontSize: '17px', lineHeight: 1.78, fontWeight: 300, maxWidth: '560px', color: '#6B6966' }}>
            {c.intro}
          </p>
        </div>
      </header>

      {/* ── WHAT WE LOOK FOR — stone */}
      <section style={{ background: '#F0EBE3', borderBottom: '1px solid #E0DBD3' }}>
        <div style={{ padding: '1.5rem clamp(1.25rem,5vw,4rem)', borderBottom: '1px solid #E0DBD3' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C06A2D' }}>
            {c.whatLabel}
          </div>
        </div>
        <div className="jobs-what-grid">
          {c.what.map((item, i) => (
            <div key={i} style={{ padding: '3rem clamp(1.25rem,4vw,3rem)', borderRight: i % 2 === 0 ? '1px solid #E0DBD3' : 'none', borderBottom: i < 2 ? '1px solid #E0DBD3' : 'none' }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C4BFB8', marginBottom: '1.25rem' }}>
                0{i + 1}
              </div>
              <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '22px', fontWeight: 900, color: '#1A1A1A', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '15px', lineHeight: 1.8, fontWeight: 300, color: '#6B6966' }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── NOT A FIT — franja casi-stone */}
      <section style={{ background: '#F8F4EF', borderBottom: '1px solid #E0DBD3', padding: '3rem clamp(1.25rem,5vw,4rem)' }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A09D99', marginBottom: '1.75rem' }}>
          {c.notLabel}
        </div>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '640px' }}>
          {c.not.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <span style={{ color: '#C06A2D', marginTop: '2px', fontSize: '14px', flexShrink: 0 }}>—</span>
              <span style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.78, color: '#6B6966' }}>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── FORM — blanco / stone split */}
      <section style={{ borderBottom: '1px solid #E0DBD3' }}>
        <div style={{ padding: '1.5rem clamp(1.25rem,5vw,4rem)', borderBottom: '1px solid #E0DBD3', background: '#FFFFFF' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C06A2D' }}>
            {c.formLabel}
          </div>
        </div>

        <div className="jobs-form-grid">
          {/* Left — stone */}
          <div style={{ background: '#F0EBE3', borderRight: '1px solid #E0DBD3', padding: '4rem clamp(1.25rem,4vw,3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p style={{ fontSize: '16px', lineHeight: 1.8, fontWeight: 300, color: '#5A5754' }}>
                {lang === 'en'
                  ? "We don't always have open positions. But we always read applications from people who are serious about their craft."
                  : "No siempre tenemos posiciones abiertas. Pero siempre leemos las aplicaciones de personas que se toman en serio su oficio."}
              </p>
              <p style={{ fontSize: '16px', lineHeight: 1.8, fontWeight: 300, color: '#6B6966' }}>
                {lang === 'en'
                  ? "If the timing isn't right now, we'll keep your application on file. Good people are hard to find — we know that better than anyone."
                  : "Si el timing no es el correcto ahora, guardamos tu aplicación. Las buenas personas son difíciles de encontrar — eso lo sabemos mejor que nadie."}
              </p>
            </div>
            <div style={{ marginTop: '3rem', borderTop: '1px solid #DDD8D0', paddingTop: '1.5rem' }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: '#A09D99' }}>
                hello@wearebondy.com
              </div>
            </div>
          </div>

          {/* Right — blanco */}
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
                    <label style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C06A2D', display: 'block', marginBottom: '10px' }}>{c.name}</label>
                    <input name="name" value={form.name} onChange={handleChange} required style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#C06A2D')}
                      onBlur={e => (e.target.style.borderColor = '#DDD8D0')} />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C06A2D', display: 'block', marginBottom: '10px' }}>{c.email}</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@email.com" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#C06A2D')}
                      onBlur={e => (e.target.style.borderColor = '#DDD8D0')} />
                  </div>
                </div>

                <div>
                  <label style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C06A2D', display: 'block', marginBottom: '10px' }}>{c.linkedin}</label>
                  <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder={c.linkedinPlaceholder} style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#C06A2D')}
                    onBlur={e => (e.target.style.borderColor = '#DDD8D0')} />
                </div>

                <div className="form-two-col">
                  <div>
                    <label style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C06A2D', display: 'block', marginBottom: '10px' }}>{c.roleInterest}</label>
                    <select name="roleInterest" value={form.roleInterest} onChange={handleChange} style={{ ...inputStyle, appearance: 'none' as const }}>
                      {c.roleOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C06A2D', display: 'block', marginBottom: '10px' }}>{c.yearsExp}</label>
                    <select name="yearsExperience" value={form.yearsExperience} onChange={handleChange} style={{ ...inputStyle, appearance: 'none' as const }}>
                      {c.expOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C06A2D', display: 'block', marginBottom: '10px' }}>{c.message}</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder={c.messagePlaceholder} style={{ ...inputStyle, resize: 'none' }}
                    onFocus={e => (e.target.style.borderColor = '#C06A2D')}
                    onBlur={e => (e.target.style.borderColor = '#DDD8D0')} />
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
        .jobs-what-grid { display: grid; grid-template-columns: 1fr 1fr; }
        .jobs-form-grid { display: grid; grid-template-columns: 1fr 1.5fr; }
        .form-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; }
        @media (max-width: 768px) {
          .jobs-what-grid, .jobs-form-grid { grid-template-columns: 1fr !important; }
          .jobs-form-grid > div:first-child { border-right: none !important; border-bottom: 1px solid #E0DBD3; }
          .form-two-col { grid-template-columns: 1fr !important; gap: 2rem; }
        }
      `}</style>
    </main>
  )
}
