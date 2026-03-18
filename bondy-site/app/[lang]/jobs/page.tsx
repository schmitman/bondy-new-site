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
    label: 'Join Bondy',
    h1a: 'We hire',
    h1b: 'recruiters differently.',
    intro: "We're a small team that does serious work. If you think recruiting is a craft — not a numbers game — we'd like to hear from you.",
    whatLabel: 'What we look for',
    what: [
      { title: 'Intellectual curiosity', body: 'You read about the companies you work with. You care about what they build, not just what they need to hire.' },
      { title: 'Diagnostic thinking', body: "You ask why before you ask how. When a search isn't working, you look at the root cause — not just the sourcing funnel." },
      { title: 'Honest communication', body: "You tell clients what they need to hear, not what they want to hear. You can say 'this brief is wrong' — and then help fix it." },
      { title: 'Technical literacy', body: "You don't need to code, but you understand why the difference between a Staff Engineer and a Principal matters — and you can explain it to a founder." },
    ],
    notLabel: "We're probably not a fit if",
    not: [
      "You measure success by volume of CVs sent",
      "You think the best recruiters are the fastest ones",
      "You want a commission-first, relationship-second environment",
    ],
    formLabel: 'Tell us about yourself',
    name: 'Your name', email: 'Email', linkedin: 'Your LinkedIn',
    linkedinPlaceholder: 'linkedin.com/in/...',
    roleInterest: 'What type of role interests you',
    yearsExp: 'Years in recruiting',
    message: 'Why Bondy?',
    messagePlaceholder: "What draws you to this kind of work? What's your background? What would you bring?",
    submit: 'Send →', sending: 'Sending...',
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
      { title: 'Curiosidad intelectual', body: 'Leés sobre las empresas con las que trabajás. Te importa qué construyen, no sólo qué necesitan contratar.' },
      { title: 'Pensamiento diagnóstico', body: 'Preguntás por qué antes de preguntar cómo. Cuando una búsqueda no funciona, buscás la causa raíz — no sólo el funnel de sourcing.' },
      { title: 'Comunicación honesta', body: 'Le decís a los clientes lo que necesitan escuchar, no lo que quieren. Podés decir "este brief está mal" — y después ayudar a corregirlo.' },
      { title: 'Alfabetización técnica', body: 'No necesitás programar, pero entendés por qué importa la diferencia entre un Staff Engineer y un Principal — y podés explicárselo a un founder.' },
    ],
    notLabel: 'Probablemente no hay fit si',
    not: [
      'Medís el éxito por volumen de CVs enviados',
      'Creés que el mejor recruiter es el más rápido',
      'Querés un ambiente donde la comisión va antes que la relación',
    ],
    formLabel: 'Contanos sobre vos',
    name: 'Tu nombre', email: 'Email', linkedin: 'Tu LinkedIn',
    linkedinPlaceholder: 'linkedin.com/in/...',
    roleInterest: 'Qué tipo de rol te interesa',
    yearsExp: 'Años en recruiting',
    message: '¿Por qué Bondy?',
    messagePlaceholder: '¿Qué te atrae de este tipo de trabajo? ¿Cuál es tu background? ¿Qué traerías?',
    submit: 'Enviar →', sending: 'Enviando...',
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

type FormState = { name: string; email: string; linkedin: string; roleInterest: string; yearsExperience: string; message: string }

export default function JobsPage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  const tr = t(lang)
  const c = copy[lang]

  const [form, setForm] = useState<FormState>({ name: '', email: '', linkedin: '', roleInterest: '', yearsExperience: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/jobs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
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

      {/* Header */}
      <header style={{ background: tw.white, borderBottom: `1px solid ${tw.rule}` }}>
        <div style={{ padding: '4.5rem clamp(1.25rem,5vw,4rem) 4rem', maxWidth: '860px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
            <div style={{ width: '22px', height: '1px', background: tw.green }} />
            <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: tw.green }}>{c.label}</span>
          </div>
          <h1 style={{ fontFamily: serif, fontSize: 'clamp(2.5rem,6vw,5rem)', lineHeight: 1.05, color: tw.inkMid, marginBottom: '0.5rem' }} className="tw-ink-heavy">
            {c.h1a}<br />{c.h1b}
          </h1>
          <svg width="280" height="8" viewBox="0 0 280 8" fill="none" style={{ display: 'block', marginBottom: '2rem' }}>
            <path d="M0 4 Q70 1 140 4 Q210 7 280 4" stroke="#4A8C40" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
          <p style={{ fontFamily: mono, fontSize: '15px', lineHeight: 1.78, maxWidth: '560px', color: tw.inkSub }}>{c.intro}</p>
        </div>
      </header>

      {/* What we look for */}
      <section style={{ borderBottom: `1px solid ${tw.rule}` }}>
        <div style={{ padding: '1.5rem clamp(1.25rem,5vw,4rem)', borderBottom: `1px solid ${tw.rule}` }}>
          <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: tw.green }}>{c.whatLabel}</span>
        </div>
        <div className="jobs-what-grid">
          {c.what.map((item, i) => (
            <div key={i} style={{ padding: '3rem clamp(1.25rem,4vw,3rem)', borderRight: i % 2 === 0 ? `1px solid ${tw.rule}` : 'none', borderBottom: i < 2 ? `1px solid ${tw.rule}` : 'none', background: i % 2 === 0 ? tw.white : tw.bg }}>
              <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: tw.inkFaint, marginBottom: '1.25rem' }}>0{i + 1}</div>
              <h3 style={{ fontFamily: serif, fontSize: '1.2rem', color: tw.inkMid, marginBottom: '1rem' }} className="tw-ink">{item.title}</h3>
              <p style={{ fontFamily: mono, fontSize: '14px', lineHeight: 1.8, color: tw.inkSub }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Not a fit */}
      <section style={{ backgroundColor: tw.bg, backgroundImage: notebookBg, borderBottom: `1px solid ${tw.rule}`, padding: '3rem clamp(1.25rem,5vw,4rem)' }}>
        <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: tw.inkFaint, marginBottom: '1.75rem' }}>{c.notLabel}</div>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '640px' }}>
          {c.not.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <span style={{ color: tw.green, marginTop: '2px', flexShrink: 0 }}>—</span>
              <span style={{ fontFamily: mono, fontSize: '14px', lineHeight: 1.78, color: tw.inkSub }}>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Form */}
      <section style={{ borderBottom: `1px solid ${tw.rule}` }}>
        <div style={{ padding: '1.5rem clamp(1.25rem,5vw,4rem)', borderBottom: `1px solid ${tw.rule}`, background: tw.white }}>
          <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: tw.green }}>{c.formLabel}</span>
        </div>
        <div className="jobs-form-grid">
          {/* Left */}
          <div style={{ backgroundColor: tw.bg, backgroundImage: notebookBg, borderRight: `1px solid ${tw.rule}`, padding: '4rem clamp(1.25rem,4vw,3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p style={{ fontFamily: mono, fontSize: '14px', lineHeight: 1.8, color: tw.inkSub }}>
                {lang === 'en' ? "We don't always have open positions. But we always read applications from people who are serious about their craft." : "No siempre tenemos posiciones abiertas. Pero siempre leemos las aplicaciones de personas que se toman en serio su oficio."}
              </p>
              <p style={{ fontFamily: mono, fontSize: '14px', lineHeight: 1.8, color: tw.inkFaint }}>
                {lang === 'en' ? "If the timing isn't right now, we'll keep your application on file. Good people are hard to find — we know that better than anyone." : "Si el timing no es el correcto ahora, guardamos tu aplicación. Las buenas personas son difíciles de encontrar — eso lo sabemos mejor que nadie."}
              </p>
            </div>
            <div style={{ marginTop: '3rem', borderTop: `1px solid ${tw.rule}`, paddingTop: '1.5rem' }}>
              <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.12em', color: tw.green }}>hello@wearebondy.com</span>
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
                  <div><label style={lbl}>{c.name}</label><input name="name" value={form.name} onChange={handleChange} required style={inputStyle} /></div>
                  <div><label style={lbl}>{c.email}</label><input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@email.com" style={inputStyle} /></div>
                </div>
                <div><label style={lbl}>{c.linkedin}</label><input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder={c.linkedinPlaceholder} style={inputStyle} /></div>
                <div className="form-two-col">
                  <div>
                    <label style={lbl}>{c.roleInterest}</label>
                    <select name="roleInterest" value={form.roleInterest} onChange={handleChange} style={{ ...inputStyle, appearance: 'none' as const }}>
                      {c.roleOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={lbl}>{c.yearsExp}</label>
                    <select name="yearsExperience" value={form.yearsExperience} onChange={handleChange} style={{ ...inputStyle, appearance: 'none' as const }}>
                      {c.expOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                </div>
                <div><label style={lbl}>{c.message}</label><textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder={c.messagePlaceholder} style={{ ...inputStyle, resize: 'none' }} /></div>
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
        .jobs-what-grid { display: grid; grid-template-columns: 1fr 1fr; }
        .jobs-form-grid { display: grid; grid-template-columns: 1fr 1.5fr; }
        .form-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; }
        @media (max-width: 768px) {
          .jobs-what-grid, .jobs-form-grid { grid-template-columns: 1fr !important; }
          .jobs-form-grid > div:first-child { border-right: none !important; border-bottom: 1px solid #E8E4DE; }
          .form-two-col { grid-template-columns: 1fr !important; gap: 2rem; }
        }
      `}</style>
    </main>
  )
}
