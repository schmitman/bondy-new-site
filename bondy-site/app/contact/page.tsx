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

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    message: '',
    service: '',
  })
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
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const inputClass = "w-full bg-transparent border-b border-white/20 py-4 text-b-off text-[15px] font-light placeholder-b-mid/50 focus:outline-none focus:border-b-orange transition-colors"
  const labelClass = "font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange block mb-3"

  return (
    <main className="bg-b-black min-h-screen">
      <Nav />

      <section className="pt-[73px]">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-73px)]">

          {/* Left   -   context */}
          <div className="border-b md:border-b-0 md:border-r border-white/10 px-8 md:px-16 py-20 md:py-28 flex flex-col justify-between">
            <div>
              <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange mb-10">
                Get in touch
              </div>
              <h1 className="font-display text-[clamp(40px,5vw,68px)] font-black leading-tight tracking-tight text-b-off mb-8">
                Tell us what<br />
                you're <em className="text-b-orange italic">building.</em>
              </h1>
              <p className="text-b-mid text-[15px] leading-relaxed font-light max-w-sm mb-12">
                No forms that go nowhere. No automated responses. Someone from the Bondy team
                will read this and reply within one business day.
              </p>

              <div className="space-y-6">
                <div>
                  <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-white/30 mb-2">Email</div>
                  <a href="mailto:hola@wearebondy.com" className="text-b-off text-[15px] font-light hover:text-b-orange transition-colors">
                    hola@wearebondy.com
                  </a>
                </div>
                <div>
                  <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-white/30 mb-2">LinkedIn</div>
                  <a
                    href="https://www.linkedin.com/company/bondygroup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-b-mid text-[15px] font-light hover:text-b-off transition-colors"
                  >
                    /company/bondygroup
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-white/10 pt-10">
              <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-white/20 mb-6">
                Also hiring?
              </div>
              <p className="text-b-mid text-sm font-light leading-relaxed">
                If you're a recruiter interested in joining the Bondy team,
                drop us a note at the same address with "join" in the subject.
              </p>
            </div>
          </div>

          {/* Right   -   form */}
          <div className="px-8 md:px-16 py-20 md:py-28">
            {status === 'success' ? (
              <div className="h-full flex flex-col justify-center">
                <div className="font-display text-4xl font-black text-b-off mb-4">Got it.</div>
                <p className="text-b-mid text-[15px] font-light leading-relaxed max-w-sm">
                  We'll get back to you within one business day.
                  In the meantime, feel free to read about our method or browse our thinking.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <div>
                  <label className={labelClass}>Service</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className={`${inputClass} bg-transparent`}
                    style={{appearance: 'none'}}
                  >
                    <option value="" disabled>What are you looking for?</option>
                    <option value="hunting">Hunting   -   Fill a specific role</option>
                    <option value="pipeline">Talent Pipeline   -   Improve top of funnel</option>
                    <option value="rpo">Embedded Recruiter   -   Scale hiring</option>
                    <option value="vc">VC / Portfolio partnership</option>
                    <option value="other">Not sure yet</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <label className={labelClass}>Your name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Work email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@company.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <label className={labelClass}>Company</label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      required
                      placeholder="Company name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Your role</label>
                    <input
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      placeholder="VP of Eng, CTO..."
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Tell us about the hire</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="What role? What's the context? What have you tried?"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex items-center gap-3 bg-b-orange text-b-black font-mono-bondy text-[11px] tracking-widest uppercase px-8 py-4 hover:bg-b-orange/90 transition-colors disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Sending...' : 'Send'}
                  </button>
                  {status === 'error' && (
                    <span className="font-mono-bondy text-[10px] text-red-400 tracking-wide">
                      Something went wrong. Try emailing us directly.
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

