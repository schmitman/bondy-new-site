'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { useState } from 'react'
import type { Lang } from '@/lib/i18n/translations'

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
    errorMsg: 'Something went wrong. Try emailing us at hola@wearebondy.com',
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
    errorMsg: 'Algo salió mal. Escribinos a hola@wearebondy.com',
    finePrint: 'El bono se paga una vez que el candidato referido completa 3 meses en el rol. Solo un bono por referido único. Los empleados de Bondy no son elegibles.',
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

  const inputClass = "w-full bg-transparent border-b py-4 text-b-off text-[15px] font-light placeholder-b-mid/40 focus:outline-none transition-colors"
  const inputStyle = { borderColor: 'rgba(255,255,255,0.15)' }
  const inputFocusStyle = { borderColor: '#E05C00' }
  const labelClass = "font-mono-bondy text-[10px] tracking-widest uppercase block mb-3"

  return (
    <main className="bg-b-black min-h-screen">
      <Nav />

      {/* ── HERO ── */}
      <section className="pt-[73px] border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[50vh]">

          {/* Left — headline */}
          <div className="px-8 md:px-16 py-20 md:py-28 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between">
            <div>
              <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange mb-8">
                {c.label}
              </div>
              <h1 className="font-display text-[clamp(48px,6vw,80px)] font-black leading-tight tracking-tight text-b-off mb-6">
                {c.h1a}<br />
                <em className="text-b-orange italic">{c.h1b}</em>
              </h1>
              <p className="text-b-mid text-[16px] leading-relaxed font-light max-w-md">
                {c.intro}
              </p>
            </div>
          </div>

          {/* Right — bonus callout */}
          <div className="px-8 md:px-16 py-20 md:py-28 flex flex-col justify-center" style={{ background: '#141414' }}>
            <div className="font-mono-bondy text-[10px] tracking-widest uppercase mb-6" style={{ color: 'rgba(255,255,255,0.25)' }}>
              {c.bonusLabel}
            </div>
            <div className="font-display text-[clamp(64px,10vw,120px)] font-black leading-none tracking-tight text-b-orange mb-4">
              {c.bonusAmount}
            </div>
            <p className="font-mono-bondy text-[11px] tracking-widest text-b-mid leading-relaxed max-w-xs">
              {c.bonusSub}
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="border-b border-white/10">
        <div className="px-8 md:px-16 py-8 border-b border-white/10">
          <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange">
            {c.howLabel}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {c.steps.map((step) => (
            <div key={step.n} className="px-8 md:px-10 py-12 flex flex-col justify-between group hover:bg-white/[0.02] transition-colors">
              <div>
                <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange mb-8">
                  {step.n}
                </div>
                <h3 className="font-display text-xl font-bold text-b-off mb-4 tracking-tight leading-tight">
                  {step.title}
                </h3>
                <p className="text-b-mid text-sm font-light leading-relaxed">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FORM ── */}
      <section className="border-b border-white/10">
        <div className="px-8 md:px-16 py-8 border-b border-white/10">
          <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange">
            {c.formLabel}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left — fine print and context */}
          <div className="border-b md:border-b-0 md:border-r border-white/10 px-8 md:px-16 py-16 flex flex-col justify-between">
            <div>
              <p className="text-b-mid text-[15px] leading-relaxed font-light mb-8 max-w-sm">
                {lang === 'en'
                  ? "You don't need to ask the person's permission first — we'll reach out respectfully and mention your name. If they're not interested, that's fine too."
                  : "No es necesario que le pidas permiso primero — los contactamos con respeto y mencionamos tu nombre. Si no están interesados, no hay problema."}
              </p>
              <p className="text-b-mid text-[15px] leading-relaxed font-light max-w-sm">
                {lang === 'en'
                  ? "We only pursue referrals that are a genuine fit for our active searches. We won't chase someone who doesn't make sense."
                  : "Solo avanzamos con referidos que son un fit real para nuestras búsquedas activas. No vamos a perseguir a alguien que no tiene sentido."}
              </p>
            </div>

            <div className="mt-16 border-t border-white/10 pt-8">
              <p className="font-mono-bondy text-[9px] tracking-widest leading-relaxed" style={{ color: 'rgba(255,255,255,0.2)' }}>
                {c.finePrint}
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="px-8 md:px-16 py-16">
            {status === 'success' ? (
              <div className="h-full flex flex-col justify-center py-10">
                <div className="font-display text-4xl font-black text-b-off mb-4">{c.successTitle}</div>
                <p className="text-b-mid text-[15px] font-light leading-relaxed max-w-sm">
                  {c.successBody}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">

                {/* Referrer info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <label className={labelClass} style={{ color: '#E05C00' }}>{c.yourName}</label>
                    <input
                      name="referrerName"
                      value={form.referrerName}
                      onChange={handleChange}
                      required
                      placeholder={lang === 'en' ? 'Your name' : 'Tu nombre'}
                      className={inputClass}
                      style={inputStyle}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={e => Object.assign(e.target.style, inputStyle)}
                    />
                  </div>
                  <div>
                    <label className={labelClass} style={{ color: '#E05C00' }}>{c.yourEmail}</label>
                    <input
                      type="email"
                      name="referrerEmail"
                      value={form.referrerEmail}
                      onChange={handleChange}
                      required
                      placeholder="you@email.com"
                      className={inputClass}
                      style={inputStyle}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={e => Object.assign(e.target.style, inputStyle)}
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 pt-2">
                  <div className="font-mono-bondy text-[9px] tracking-widest uppercase mb-6" style={{ color: 'rgba(255,255,255,0.2)' }}>
                    {lang === 'en' ? 'About the person you\'re referring' : 'Sobre el referido'}
                  </div>

                  <div className="flex flex-col gap-10">
                    <div>
                      <label className={labelClass} style={{ color: '#E05C00' }}>{c.refName}</label>
                      <input
                        name="refereeName"
                        value={form.refereeName}
                        onChange={handleChange}
                        required
                        placeholder={lang === 'en' ? 'Their full name' : 'Nombre completo'}
                        className={inputClass}
                        style={inputStyle}
                        onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={e => Object.assign(e.target.style, inputStyle)}
                      />
                    </div>

                    <div>
                      <label className={labelClass} style={{ color: '#E05C00' }}>{c.refLinkedIn}</label>
                      <input
                        name="refereeLinkedIn"
                        value={form.refereeLinkedIn}
                        onChange={handleChange}
                        placeholder={c.refLinkedInPlaceholder}
                        className={inputClass}
                        style={inputStyle}
                        onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={e => Object.assign(e.target.style, inputStyle)}
                      />
                    </div>

                    <div>
                      <label className={labelClass} style={{ color: '#E05C00' }}>{c.message}</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder={c.messagePlaceholder}
                        className={`${inputClass} resize-none`}
                        style={inputStyle}
                        onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={e => Object.assign(e.target.style, inputStyle)}
                      />
                    </div>
                  </div>
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
