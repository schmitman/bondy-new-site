'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { useState } from 'react'
import type { Lang } from '@/lib/i18n/translations'

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
    errorMsg: 'Something went wrong. Email us at hola@wearebondy.com',
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
        body: 'Leés sobre las empresas con las que trabajás. Te importa qué construyen, no solo qué necesitan contratar.',
      },
      {
        title: 'Pensamiento diagnóstico',
        body: 'Preguntás por qué antes de preguntar cómo. Cuando una búsqueda no funciona, buscás la causa raíz — no solo el funnel de sourcing.',
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
    errorMsg: 'Algo salió mal. Escribinos a hola@wearebondy.com',
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

  return (
    <main className="bg-b-black min-h-screen">
      <Nav />

      {/* ── HERO ── */}
      <section className="pt-[73px] border-b border-white/10">
        <div className="px-8 md:px-16 py-20 md:py-28 max-w-4xl">
          <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange mb-8">
            {c.label}
          </div>
          <h1 className="font-display text-[clamp(48px,6vw,80px)] font-black leading-tight tracking-tight text-b-off mb-6">
            {c.h1a}<br />
            <em className="text-b-orange italic">{c.h1b}</em>
          </h1>
          <p className="text-b-mid text-[16px] leading-relaxed font-light max-w-xl">
            {c.intro}
          </p>
        </div>
      </section>

      {/* ── WHAT WE LOOK FOR ── */}
      <section className="border-b border-white/10">
        <div className="px-8 md:px-16 py-8 border-b border-white/10">
          <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange">
            {c.whatLabel}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {c.what.map((item, i) => (
            <div key={i} className={`px-8 md:px-16 py-12 ${i >= 2 ? 'border-t border-white/10' : ''}`}>
              <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-white/20 mb-5">
                0{i + 1}
              </div>
              <h3 className="font-display text-xl font-bold text-b-off mb-4 tracking-tight">
                {item.title}
              </h3>
              <p className="text-b-mid text-sm font-light leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── NOT A FIT ── */}
      <section className="border-b border-white/10 px-8 md:px-16 py-14">
        <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-white/30 mb-8">
          {c.notLabel}
        </div>
        <ul className="flex flex-col gap-4 max-w-2xl">
          {c.not.map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="text-b-orange mt-1 text-sm flex-shrink-0">—</span>
              <span className="text-b-mid text-[15px] font-light leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── FORM ── */}
      <section>
        <div className="px-8 md:px-16 py-8 border-b border-white/10">
          <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange">
            {c.formLabel}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left — context */}
          <div className="border-b md:border-b-0 md:border-r border-white/10 px-8 md:px-16 py-16 flex flex-col justify-between">
            <div>
              <p className="text-b-mid text-[15px] leading-relaxed font-light mb-8 max-w-sm">
                {lang === 'en'
                  ? "We don't always have open positions. But we always read applications from people who are serious about their craft."
                  : "No siempre tenemos posiciones abiertas. Pero siempre leemos las aplicaciones de personas que se toman en serio su oficio."}
              </p>
              <p className="text-b-mid text-[15px] leading-relaxed font-light max-w-sm">
                {lang === 'en'
                  ? "If the timing isn't right now, we'll keep your application on file. Good people are hard to find — we know that better than anyone."
                  : "Si el timing no es el correcto ahora, guardamos tu aplicación. Las buenas personas son difíciles de encontrar — eso lo sabemos mejor que nadie."}
              </p>
            </div>

            <div className="mt-16 border-t border-white/10 pt-8">
              <div className="font-mono-bondy text-[9px] tracking-widest text-white/20">
                hola@wearebondy.com
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="px-8 md:px-16 py-16">
            {status === 'success' ? (
              <div className="flex flex-col justify-center py-10">
                <div className="font-display text-4xl font-black text-b-off mb-4">{c.successTitle}</div>
                <p className="text-b-mid text-[15px] font-light leading-relaxed max-w-sm">
                  {c.successBody}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <label className={labelClass}>{c.name}</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#E05C00')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{c.email}</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@email.com"
                      className={inputClass}
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#E05C00')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>{c.linkedin}</label>
                  <input
                    name="linkedin"
                    value={form.linkedin}
                    onChange={handleChange}
                    placeholder={c.linkedinPlaceholder}
                    className={inputClass}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#E05C00')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <label className={labelClass}>{c.roleInterest}</label>
                    <select
                      name="roleInterest"
                      value={form.roleInterest}
                      onChange={handleChange}
                      className={inputClass}
                      style={{ ...inputStyle, appearance: 'none' as const }}
                      onFocus={e => (e.target.style.borderColor = '#E05C00')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                    >
                      {c.roleOptions.map(o => (
                        <option key={o.value} value={o.value} style={{ background: '#111111' }}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>{c.yearsExp}</label>
                    <select
                      name="yearsExperience"
                      value={form.yearsExperience}
                      onChange={handleChange}
                      className={inputClass}
                      style={{ ...inputStyle, appearance: 'none' as const }}
                      onFocus={e => (e.target.style.borderColor = '#E05C00')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                    >
                      {c.expOptions.map(o => (
                        <option key={o.value} value={o.value} style={{ background: '#111111' }}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>{c.message}</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder={c.messagePlaceholder}
                    className={`${inputClass} resize-none`}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#E05C00')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex items-center gap-3 font-mono-bondy text-[11px] tracking-widest uppercase px-8 py-4 hover:opacity-90 transition-opacity disabled:opacity-40"
                    style={{ background: '#E05C00', color: '#111111' }}
                  >
                    {status === 'loading' ? c.sending : c.submit}
                  </button>
                  {status === 'error' && (
                    <span className="font-mono-bondy text-[10px] text-red-400 tracking-wide">
                      {c.errorMsg}
                    </span>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
