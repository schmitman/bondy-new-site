import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'

import type { Metadata } from 'next'

const pageMeta = {
  en: {
    title: 'Bondy — Technical Recruiting for Engineering Teams in LATAM',
    description: 'Bondy is a technical recruiting firm based in Buenos Aires. We help CTOs and VPs of Engineering hire backend, frontend, and data engineers in Argentina and across Latin America.',
  },
  es: {
    title: 'Bondy — Recruiting Técnico para Equipos de Ingeniería en LATAM',
    description: 'Bondy es una firma de recruiting técnico con base en Buenos Aires. Ayudamos a CTOs y VPs de Engineering a contratar ingenieros backend, frontend y datos en Argentina y LATAM.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: { lang: 'en' | 'es' }
}): Promise<Metadata> {
  const baseUrl = 'https://wearebondy.com'
  const meta = pageMeta[params.lang] ?? pageMeta.en
  const canonical = `${baseUrl}/${params.lang}`
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
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


export default function Home({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  const tr = t(lang)
  const h = tr.home
  const lk = (href: string) => `/${lang}${href}`

  return (
    <main className="bg-b-black min-h-screen">
      <Nav lang={lang} tr={tr.nav} />

      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col pt-[60px]">
        {/* Top bar */}
        <div className="border-b border-white/10 px-8 md:px-16 py-3 flex justify-between items-center">
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
            {h.topbar.left}
          </span>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }} className="hidden md:block">
            {h.topbar.right}
          </span>
        </div>

        {/* Hero grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 border-b border-white/10">
          {/* Left */}
          <div className="px-8 md:px-16 py-20 md:py-28 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div style={{ width: '32px', height: '1px', background: '#C06A2D', flexShrink: 0 }} />
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C06A2D', fontWeight: 500 }}>
                  {h.hero.label}
                </span>
                <div style={{ width: '32px', height: '1px', background: 'rgba(192,106,45,0.4)', flexShrink: 0 }} />
              </div>

              <h1 className="font-display font-black leading-[0.95] tracking-tight text-b-off mb-10" style={{ fontSize: 'clamp(52px,7vw,88px)' }}>
                {h.hero.h1_1}<br />
                {h.hero.h1_2}<br />
                {h.hero.h1_3} <em style={{ color: '#C06A2D', fontStyle: 'italic' }}>{h.hero.h1_em1}</em><br />
                <em style={{ color: '#C06A2D', fontStyle: 'italic' }}>{h.hero.h1_em2}</em>
              </h1>

              <p style={{ color: '#AEADA9', fontSize: '16px', lineHeight: 1.72, fontWeight: 300, maxWidth: '360px' }}>
                {h.hero.body}
              </p>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row gap-4">
              <Link href={lk('/contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#C06A2D', color: '#0E0E0E', fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '14px 28px', textDecoration: 'none', fontWeight: 500 }}>
                {h.hero.cta_primary}
              </Link>
              <Link href={lk('/method')} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.55)', fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '14px 28px', textDecoration: 'none' }}>
                {h.hero.cta_secondary}
              </Link>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2">
            {[
              { s: h.stats.experience, border: 'border-b border-r' },
              { s: h.stats.speed,      border: 'border-b' },
              { s: h.stats.retention,  border: 'border-b border-r' },
            ].map(({ s, border }, i) => (
              <div key={i} className={`${border} border-white/10 px-8 py-10 md:px-10 md:py-14 flex flex-col justify-between`}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>{s.label}</span>
                <div>
                  <div className="font-display font-black leading-none text-b-off tracking-tight" style={{ fontSize: 'clamp(56px,7vw,80px)' }}>
                    {s.value}<span style={{ color: '#C06A2D', fontSize: '0.45em' }}>{s.sup}</span>
                  </div>
                  <div style={{ color: '#AEADA9', fontSize: '16px', fontWeight: 300, marginTop: '8px', lineHeight: 1.55 }}>{s.desc}</div>
                </div>
              </div>
            ))}
            <div className="border-b border-white/10 px-8 py-10 md:px-10 md:py-14 flex flex-col justify-between" style={{ background: '#161616' }}>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>{h.stats.method.label}</span>
              <div>
                <div className="font-display font-black leading-none tracking-tight" style={{ fontSize: 'clamp(38px,4vw,52px)', color: '#C06A2D' }}>
                  {h.stats.method.title.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
                </div>
                <div style={{ color: '#AEADA9', fontSize: '16px', fontWeight: 300, marginTop: '8px', lineHeight: 1.55 }}>{h.stats.method.desc}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATEMENT ── */}
      <section className="px-8 md:px-16 py-24 md:py-36 border-b border-white/10">
        <div style={{ maxWidth: '860px' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C06A2D', marginBottom: '2.5rem' }}>
            {h.statement.label}
          </div>
          <h2 className="font-display font-black leading-tight tracking-tight text-b-off" style={{ fontSize: 'clamp(32px,4vw,56px)', marginBottom: '2rem' }}>
            {h.statement.h2_1}<br />
            {h.statement.h2_2} <em style={{ color: '#C06A2D', fontStyle: 'italic' }}>{h.statement.h2_em}</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <p style={{ color: '#AEADA9', fontSize: '16px', lineHeight: 1.75, fontWeight: 300 }}>{h.statement.p1}</p>
            <p style={{ color: '#AEADA9', fontSize: '16px', lineHeight: 1.75, fontWeight: 300 }}>{h.statement.p2}</p>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="border-b border-white/10">
        <div className="px-8 md:px-16 py-12 border-b border-white/10">
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C06A2D' }}>
            {h.services.label}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {h.services.items.map((svc, i) => (
            <div key={i} className={`${i < 2 ? 'border-b md:border-b-0 md:border-r' : ''} border-white/10 px-10 py-14 flex flex-col justify-between group hover:bg-white/[0.02] transition-colors`}>
              <div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '2.5rem' }}>{svc.n}</div>
                <h3 className="font-display font-bold text-b-off mb-5 leading-tight tracking-tight" style={{ fontSize: '28px' }}>
                  {svc.title.split('\n').map((line, j) => <span key={j}>{line}{j < svc.title.split('\n').length - 1 && <br />}</span>)}
                </h3>
                <p style={{ color: '#AEADA9', fontSize: '16px', lineHeight: 1.75, fontWeight: 300 }}>{svc.body}</p>
              </div>
              <Link href={lk(`/services#${['hunting', 'pipeline', 'rpo'][i]}`)} style={{ marginTop: '2.5rem', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                {svc.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── METHOD TEASER ── */}
      <section className="border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="px-8 md:px-16 py-20 md:py-28 border-b md:border-b-0 md:border-r border-white/10">
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C06A2D', marginBottom: '2.5rem' }}>
              {h.method.label}
            </div>
            <h2 className="font-display font-black leading-tight tracking-tight text-b-off mb-8" style={{ fontSize: 'clamp(36px,4vw,56px)' }}>
              {h.method.h2_1}<br />{h.method.h2_2} <em style={{ color: '#C06A2D', fontStyle: 'italic' }}>{h.method.h2_em}</em>
            </h2>
            <p style={{ color: '#AEADA9', fontSize: '16px', lineHeight: 1.75, fontWeight: 300, marginBottom: '1.5rem', maxWidth: '360px' }}>{h.method.p1}</p>
            <p style={{ color: '#AEADA9', fontSize: '16px', lineHeight: 1.75, fontWeight: 300, marginBottom: '3rem', maxWidth: '360px' }}>{h.method.p2}</p>
            <Link href={lk('/method')} style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C06A2D', textDecoration: 'none', borderBottom: '1px solid rgba(192,106,45,0.4)', paddingBottom: '2px' }}>
              {h.method.cta}
            </Link>
          </div>
          <div className="flex flex-col divide-y divide-white/10">
            {h.method.steps.map((step) => (
              <div key={step.n} className="px-10 py-8 flex gap-8 items-start hover:bg-white/[0.02] transition-colors">
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#C06A2D', letterSpacing: '0.15em', marginTop: '2px', flexShrink: 0 }}>{step.n}</span>
                <div>
                  <div className="font-display font-bold text-b-off mb-2 tracking-tight" style={{ fontSize: '18px' }}>{step.title}</div>
                  <div style={{ color: '#B8B6B2', fontSize: '16px', fontWeight: 300, lineHeight: 1.72 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR VCS ── */}
      <section className="px-8 md:px-16 py-20 md:py-28 border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C06A2D', marginBottom: '2rem' }}>
              {h.vc.label}
            </div>
            <h2 className="font-display font-black leading-tight tracking-tight text-b-off" style={{ fontSize: 'clamp(30px,3.5vw,48px)' }}>
              {h.vc.h2_1}<br /><em style={{ color: '#C06A2D', fontStyle: 'italic' }}>{h.vc.h2_em}</em>{h.vc.h2_2.split('\n').map((line, i) => <span key={i}>{line}{i < h.vc.h2_2.split('\n').length - 1 && <br />}</span>)}
            </h2>
          </div>
          <div>
            <p style={{ color: '#AEADA9', fontSize: '16px', lineHeight: 1.75, fontWeight: 300, marginBottom: '1.5rem' }}>{h.vc.p1}</p>
            <p style={{ color: '#AEADA9', fontSize: '16px', lineHeight: 1.75, fontWeight: 300, marginBottom: '2.5rem' }}>{h.vc.p2}</p>
            <Link href={lk('/contact')} style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C06A2D', textDecoration: 'none', borderBottom: '1px solid rgba(192,106,45,0.4)', paddingBottom: '2px' }}>
              {h.vc.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-8 md:px-16 py-24 md:py-36 text-center">
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C06A2D', marginBottom: '2rem' }}>
          {h.finalCta.label}
        </div>
        <h2 className="font-display font-black leading-tight tracking-tight text-b-off mb-6" style={{ fontSize: 'clamp(40px,6vw,80px)' }}>
          {h.finalCta.h2_1}<br />{h.finalCta.h2_2} <em style={{ color: '#C06A2D', fontStyle: 'italic' }}>{h.finalCta.h2_em}</em>
        </h2>
        <p style={{ color: '#AEADA9', fontSize: '16px', fontWeight: 300, marginBottom: '3rem', maxWidth: '420px', margin: '0 auto 3rem', lineHeight: 1.75 }}>
          {h.finalCta.body}
        </p>
        <Link href={lk('/contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#C06A2D', color: '#0E0E0E', fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '16px 40px', textDecoration: 'none', fontWeight: 500 }}>
          {h.finalCta.cta}
        </Link>
      </section>

      <Footer lang={lang} tr={tr.footer} />
    </main>
  )
}
