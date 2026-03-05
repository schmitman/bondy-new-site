import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'

export default function ServicesPage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  const tr = t(lang)
  const s = tr.services
  const lk = (href: string) => `/${lang}${href}`

  // Alternating bg per service: stone / white / stone
  const sectionBgs = ['#F0EBE3', '#FFFFFF', '#F0EBE3']
  const detailBgs  = ['#FFFFFF', '#F8F4EF', '#FFFFFF']

  return (
    <main style={{ background: '#F0EBE3', minHeight: '100vh' }}>
      <Nav lang={lang} tr={tr.nav} />

      {/* Header — blanco puro */}
      <header style={{ paddingTop: '60px', background: '#FFFFFF', borderBottom: '1px solid #E8E4DE' }}>
        <div style={{ padding: '4.5rem clamp(1.25rem,5vw,4rem) 4rem', maxWidth: '860px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
            <div style={{ width: '22px', height: '1px', background: '#C06A2D', flexShrink: 0 }} />
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C06A2D' }}>
              {s.label}
            </span>
            <div style={{ width: '22px', height: '1px', background: 'rgba(192,106,45,0.4)', flexShrink: 0 }} />
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(48px,6vw,80px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#1A1A1A', marginBottom: '2rem' }}>
            {s.h1_1}<br />{s.h1_2} <em style={{ color: '#C06A2D', fontStyle: 'italic' }}>{s.h1_em}</em>
          </h1>
          <p style={{ fontSize: '17px', lineHeight: 1.78, fontWeight: 300, maxWidth: '580px', color: '#6B6966' }}>
            {s.intro}
          </p>
        </div>
      </header>

      {/* Services — cada uno alterna fondo */}
      {s.items.map((item, idx) => (
        <section key={item.id} id={item.id} style={{ borderBottom: '1px solid #E0DBD3' }}>
          <div className="services-split-grid">

            {/* Left — descripción */}
            <div style={{ background: sectionBgs[idx], borderRight: '1px solid #E0DBD3', padding: '4rem clamp(1.25rem,4vw,3.5rem)' }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C4BFB8', marginBottom: '2.5rem' }}>
                {item.n}
              </div>
              <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(36px,4vw,56px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.01em', color: '#1A1A1A', marginBottom: '1.75rem' }}>
                {item.title.split('\n').map((line, i) => <span key={i}>{line}{i < item.title.split('\n').length - 1 && <br />}</span>)}
              </h2>
              <p style={{ fontSize: '16px', lineHeight: 1.8, fontWeight: 300, color: '#5A5754', marginBottom: '1.25rem' }}>
                {item.lead}
              </p>
              <p style={{ fontSize: '16px', lineHeight: 1.8, fontWeight: 300, color: '#6B6966' }}>
                {item.body}
              </p>
            </div>

            {/* Right — detalles */}
            <div style={{ background: detailBgs[idx], padding: '4rem clamp(1.25rem,4vw,3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {item.details.map((d) => (
                  <div key={d.label} style={{ borderLeft: '2px solid rgba(192,106,45,0.35)', paddingLeft: '20px' }}>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C06A2D', marginBottom: '8px' }}>
                      {d.label}
                    </div>
                    <p style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.75, color: '#6B6966' }}>
                      {d.text}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href={lk('/contact')}
                style={{
                  marginTop: '3rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  padding: '14px 28px',
                  textDecoration: 'none',
                  alignSelf: 'flex-start',
                  ...(item.ctaStyle === 'primary'
                    ? { background: '#C06A2D', color: '#0E0E0E', fontWeight: 500 }
                    : { border: '1px solid #C4BFB8', color: '#6B6966' }),
                }}
              >
                {item.cta}
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* CTA final — negro */}
      <section style={{ background: '#1A1A1A', padding: '5rem clamp(1.25rem,5vw,4rem)', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.01em', color: '#F4F2EE', marginBottom: '1.5rem' }}>
          {s.bottomCta.h2.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}{' '}
          <em style={{ color: '#C06A2D', fontStyle: 'italic' }}>{s.bottomCta.h2_em}</em>
        </h2>
        <p style={{ fontSize: '16px', fontWeight: 300, marginBottom: '2.5rem', maxWidth: '420px', margin: '0 auto 2.5rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.5)' }}>
          {s.bottomCta.body}
        </p>
        <Link href={lk('/contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#C06A2D', color: '#0E0E0E', fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '16px 40px', textDecoration: 'none', fontWeight: 500 }}>
          {s.bottomCta.cta}
        </Link>
      </section>

      <Footer lang={lang} tr={tr.footer} />

      <style>{`
        .services-split-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 768px) {
          .services-split-grid {
            grid-template-columns: 1fr !important;
          }
          .services-split-grid > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid #E0DBD3;
          }
        }
      `}</style>
    </main>
  )
}
