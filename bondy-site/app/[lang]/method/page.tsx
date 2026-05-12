import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'
import type { Metadata } from 'next'

const pageMeta = {
  en: {
    title: 'The Bondy Method — How We Hire Engineers Right',
    description: "We don't move fast. We move right. Learn the process Bondy uses to find, evaluate, and place technical talent in engineering teams across LATAM.",
  },
  es: {
    title: 'El Método Bondy — Cómo Contratamos Ingenieros Bien',
    description: 'No nos movemos rápido. Nos movemos bien. Conocé el proceso que usa Bondy para encontrar, evaluar y colocar talento técnico en equipos de ingeniería en LATAM.',
  },
}

export async function generateMetadata({ params }: { params: { lang: 'en' | 'es' } }): Promise<Metadata> {
  const baseUrl = 'https://wearebondy.com'
  const meta = pageMeta[params.lang] ?? pageMeta.en
  const canonical = `${baseUrl}/${params.lang}/method`
  return {
    title: meta.title, description: meta.description,
    alternates: { canonical, languages: { en: `${baseUrl}/en/method`, es: `${baseUrl}/es/method` } },
    openGraph: { title: meta.title, description: meta.description, url: canonical, siteName: 'Bondy', locale: params.lang === 'es' ? 'es_AR' : 'en_US', type: 'website', images: [{ url: '/og-image-v2.png', width: 1200, height: 630, alt: 'Bondy' }] },
  }
}

const tw = {
  bg: '#FEFCF9', ink: '#1A1A1A', inkMid: '#3A3530', inkSub: '#5A5550',
  inkFaint: '#7A7874', rule: '#E8E4DE', white: '#FFFFFF', green: '#4A8C40',
}
const notebookBg = [
  'linear-gradient(90deg, transparent 68px, rgba(210,100,80,0.10) 68px, rgba(210,100,80,0.10) 69.5px, transparent 69.5px)',
  'repeating-linear-gradient(180deg, transparent 0px, transparent 31px, rgba(100,140,200,0.09) 31px, rgba(100,140,200,0.09) 32px)',
].join(',')
const serif = "'Special Elite', Georgia, serif"
const mono  = "'Plus Jakarta Sans', system-ui, sans-serif"

export default function MethodPage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  const tr = t(lang)
  const m = tr.method
  const lk = (href: string) => `/${lang}${href}`

  return (
    <main style={{ backgroundColor: tw.bg, backgroundImage: notebookBg, minHeight: '100vh' }}>
      <Nav lang={lang} tr={tr.nav} />

      {/* Header */}
      <header style={{ background: tw.white, borderBottom: `1px solid ${tw.rule}` }}>
        <div style={{ padding: '4.5rem clamp(1.25rem,5vw,4rem) 4rem', maxWidth: '860px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
            <div style={{ width: '22px', height: '1px', background: tw.green }} />
            <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: tw.green }}>
              {m.label}
            </span>
          </div>
          <h1 style={{ fontFamily: serif, fontSize: 'clamp(2.5rem,6vw,5rem)', lineHeight: 1.05, color: tw.inkMid, marginBottom: '0.5rem' }} className="tw-ink-heavy">
            {m.h1_1}<br />{m.h1_2} {m.h1_em}
          </h1>
          <svg width="280" height="8" viewBox="0 0 280 8" fill="none" style={{ display: 'block', marginBottom: '2rem' }}>
            <path d="M0 4 Q70 1 140 4 Q210 7 280 4" stroke="#4A8C40" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
          <p style={{ fontFamily: mono, fontSize: '15px', lineHeight: 1.78, maxWidth: '580px', color: tw.inkSub }}>
            {m.intro}
          </p>
        </div>
      </header>

      {/* Steps */}
      <section>
        {m.steps.map((step, i) => (
          <div
            key={step.n}
            style={{
              background: i % 2 === 0 ? tw.bg : tw.white,
              borderBottom: `1px solid ${tw.rule}`,
              padding: '3.5rem clamp(1.25rem,5vw,4rem)',
            }}
          >
            <div className="method-step-grid">
              <div style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.15em', color: tw.green, paddingTop: '4px' }}>
                {step.n}
              </div>
              <div>
                <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.5rem,3vw,2.4rem)', lineHeight: 1.15, color: tw.inkMid, marginBottom: '0.6rem' }} className="tw-ink">
                  {step.title}
                </h2>
                <div style={{ fontFamily: mono, fontSize: '14px', fontWeight: 700, color: tw.inkSub, marginBottom: '1.25rem' }}>
                  {step.subtitle}
                </div>
                <p style={{ fontFamily: mono, fontSize: '15px', lineHeight: 1.82, maxWidth: '580px', color: tw.inkSub }}>
                  {step.body}
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                <div style={{ border: `1px solid ${tw.rule}`, padding: '10px 18px', background: i % 2 === 0 ? tw.white : tw.bg }}>
                  <div style={{ fontFamily: mono, fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: tw.inkFaint, marginBottom: '5px' }}>
                    {m.timelineLabel}
                  </div>
                  <div style={{ fontFamily: mono, fontSize: '11px', color: tw.inkSub }}>
                    {step.time}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 1 in 4 Principle */}
      <section style={{ background: tw.white, padding: '3.5rem clamp(1.25rem,5vw,4rem)', borderBottom: `1px solid ${tw.rule}`, borderTop: `1px solid ${tw.rule}` }}>
        <div style={{ maxWidth: '760px', display: 'flex', gap: '2.5rem', alignItems: 'flex-start' }}>
          <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: tw.green, flexShrink: 0, paddingTop: '4px' }}>
            {lang === 'es' ? 'Principio' : 'Principle'}
          </div>
          <div style={{ borderLeft: `2px solid rgba(74,140,64,0.35)`, paddingLeft: '1.5rem' }}>
            <p style={{ fontFamily: serif, fontSize: 'clamp(1.1rem,2vw,1.5rem)', lineHeight: 1.4, color: tw.inkMid, marginBottom: '0.75rem' }} className="tw-ink">
              {lang === 'es'
                ? 'Si menos de 1 de cada 4 candidatos avanza, pausamos la búsqueda.'
                : 'If fewer than 1 in 4 candidates advance, we stop the search.'}
            </p>
            <p style={{ fontFamily: mono, fontSize: '14px', lineHeight: 1.75, color: tw.inkSub }}>
              {lang === 'es'
                ? 'No mandamos más volumen. Nos sentamos con el cliente a realinear el brief. Es la única forma de proteger la calidad del proceso.'
                : "We don't send more volume. We sit with the client to realign the brief. It's the only way to protect the quality of the process."}
            </p>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section style={{ background: tw.bg, padding: '5rem clamp(1.25rem,5vw,4rem)' }}>
        <div style={{ display: 'grid', gap: '3rem', alignItems: 'center', maxWidth: '900px' }} className="cta-grid">
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem,4vw,3.5rem)', lineHeight: 1.1, color: tw.inkMid }} className="tw-ink">
            {m.cta.h2_1}<br />{m.cta.h2_2} {m.cta.h2_em}
          </h2>
          <div>
            <p style={{ fontFamily: mono, fontSize: '15px', lineHeight: 1.78, color: tw.inkSub, marginBottom: '2rem' }}>
              {m.cta.body}
            </p>
            <Link href={lk('/contact')} style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: tw.green, color: '#fff',
              fontFamily: mono, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '13px 32px', textDecoration: 'none',
            }}>
              {m.cta.cta} →
            </Link>
          </div>
        </div>
      </section>

      <Footer lang={lang} tr={tr.footer} />

      <style>{`
        .method-step-grid {
          display: grid;
          grid-template-columns: 80px 1fr 220px;
          gap: 2rem 3rem;
          align-items: start;
        }
        .cta-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) {
          .method-step-grid { grid-template-columns: 40px 1fr; }
          .method-step-grid > div:last-child { grid-column: 2; }
          .cta-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
