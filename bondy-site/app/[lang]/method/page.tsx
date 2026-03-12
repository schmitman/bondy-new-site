import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'

import type { Metadata } from 'next'

const pageMeta = {
  en: {
    title: 'The Bondy Method — How We Hire Engineers Right',
    description: 'We don't move fast. We move right. Learn the process Bondy uses to find, evaluate, and place technical talent in engineering teams across LATAM.',
  },
  es: {
    title: 'El Método Bondy — Cómo Contratamos Ingenieros Bien',
    description: 'No nos movemos rápido. Nos movemos bien. Conocé el proceso que usa Bondy para encontrar, evaluar y colocar talento técnico en equipos de ingeniería en LATAM.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: { lang: 'en' | 'es' }
}): Promise<Metadata> {
  const baseUrl = 'https://wearebondy.com'
  const meta = pageMeta[params.lang] ?? pageMeta.en
  const canonical = `${baseUrl}/${params.lang}/method`
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/en/method`,
        es: `${baseUrl}/es/method`,
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


export default function MethodPage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  const tr = t(lang)
  const m = tr.method
  const lk = (href: string) => `/${lang}${href}`

  return (
    <main style={{ background: '#F0EBE3', minHeight: '100vh' }}>
      <Nav lang={lang} tr={tr.nav} />

      {/* Header — blanco puro */}
      <header style={{ paddingTop: '60px', background: '#FFFFFF', borderBottom: '1px solid #E8E4DE' }}>
        <div style={{ padding: '4.5rem clamp(1.25rem,5vw,4rem) 4rem', maxWidth: '860px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
            <div style={{ width: '22px', height: '1px', background: '#C06A2D', flexShrink: 0 }} />
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C06A2D' }}>
              {m.label}
            </span>
            <div style={{ width: '22px', height: '1px', background: 'rgba(192,106,45,0.4)', flexShrink: 0 }} />
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(48px,6vw,80px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#1A1A1A', marginBottom: '2rem' }}>
            {m.h1_1}<br />{m.h1_2} <em style={{ color: '#C06A2D', fontStyle: 'italic' }}>{m.h1_em}</em>
          </h1>
          <p style={{ fontSize: '17px', lineHeight: 1.78, fontWeight: 300, maxWidth: '580px', color: '#6B6966' }}>
            {m.intro}
          </p>
        </div>
      </header>

      {/* Steps — alternando stone / blanco */}
      <section>
        {m.steps.map((step, i) => (
          <div
            key={step.n}
            style={{
              background: i % 2 === 0 ? '#F0EBE3' : '#FFFFFF',
              borderBottom: '1px solid #E0DBD3',
              padding: '3.5rem clamp(1.25rem,5vw,4rem)',
            }}
          >
            <div className="method-step-grid">
              {/* Número */}
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', color: '#C06A2D', paddingTop: '4px' }}>
                {step.n}
              </div>

              {/* Contenido */}
              <div>
                <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(28px,3vw,42px)', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.01em', color: '#1A1A1A', marginBottom: '0.6rem' }}>
                  {step.title}
                </h2>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#3A3836', marginBottom: '1.25rem' }}>
                  {step.subtitle}
                </div>
                <p style={{ fontSize: '16px', lineHeight: 1.82, fontWeight: 300, maxWidth: '580px', color: '#6B6966' }}>
                  {step.body}
                </p>
              </div>

              {/* Timeline badge */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                <div style={{ border: '1px solid #DDD8D0', padding: '10px 18px', background: i % 2 === 0 ? '#FFFFFF' : '#F8F4EF' }}>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C4BFB8', marginBottom: '5px' }}>
                    {m.timelineLabel}
                  </div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#6B6966' }}>
                    {step.time}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Franja sienna — el "1 in 4 rule" o principio clave */}
      <section style={{ background: '#C06A2D', padding: '3.5rem clamp(1.25rem,5vw,4rem)', borderBottom: '1px solid #A85820' }}>
        <div style={{ maxWidth: '760px', display: 'flex', gap: '2.5rem', alignItems: 'flex-start' }} className="principle-grid">
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', flexShrink: 0, paddingTop: '4px' }}>
            {lang === 'es' ? 'Principio' : 'Principle'}
          </div>
          <div>
            <p style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 700, lineHeight: 1.4, color: '#FFFFFF', marginBottom: '1rem' }}>
              {lang === 'es'
                ? 'Si menos de 1 de cada 4 candidatos avanza, pausamos la búsqueda.'
                : 'If fewer than 1 in 4 candidates advance, we stop the search.'}
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.75, fontWeight: 300, color: 'rgba(255,255,255,0.75)' }}>
              {lang === 'es'
                ? 'No mandamos más volumen. Nos sentamos con el cliente a realinear el brief. Es la única forma de proteger la calidad del proceso.'
                : 'We don\'t send more volume. We sit with the client to realign the brief. It\'s the only way to protect the quality of the process.'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA final — negro */}
      <section style={{ background: '#1A1A1A', padding: '5rem clamp(1.25rem,5vw,4rem)' }}>
        <div style={{ display: 'grid', gap: '3rem', alignItems: 'center', maxWidth: '900px' }} className="cta-grid">
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(32px,4vw,54px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.01em', color: '#F4F2EE' }}>
            {m.cta.h2_1}<br />{m.cta.h2_2} <em style={{ color: '#C06A2D', fontStyle: 'italic' }}>{m.cta.h2_em}</em>
          </h2>
          <div>
            <p style={{ fontSize: '16px', lineHeight: 1.78, fontWeight: 300, color: 'rgba(255,255,255,0.5)', marginBottom: '2rem' }}>
              {m.cta.body}
            </p>
            <Link href={lk('/contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#C06A2D', color: '#0E0E0E', fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '14px 32px', textDecoration: 'none', fontWeight: 500 }}>
              {m.cta.cta}
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
        .principle-grid { flex-direction: row; }
        @media (max-width: 768px) {
          .method-step-grid { grid-template-columns: 40px 1fr; }
          .method-step-grid > div:last-child { grid-column: 2; }
          .cta-grid { grid-template-columns: 1fr !important; }
          .principle-grid { flex-direction: column !important; gap: 1rem !important; }
        }
      `}</style>
    </main>
  )
}
