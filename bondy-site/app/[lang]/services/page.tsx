import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'
import type { Metadata } from 'next'

const pageMeta = {
  en: {
    title: 'Technical Recruiting Services in Argentina & LATAM — Bondy',
    description: "Technical recruiting services in Argentina and LATAM: executive search, staffing, and RPO for engineering teams. We place engineers others can't find.",
  },
  es: {
    title: 'Servicios de Recruiting Técnico — Bondy',
    description: 'Bondy ofrece servicios especializados de recruiting técnico en Argentina y LATAM: búsqueda ejecutiva, staffing y RPO para equipos de ingeniería.',
  },
}

export async function generateMetadata({ params }: { params: { lang: 'en' | 'es' } }): Promise<Metadata> {
  const baseUrl = 'https://wearebondy.com'
  const meta = pageMeta[params.lang] ?? pageMeta.en
  const canonical = `${baseUrl}/${params.lang}/services`
  return {
    title: meta.title, description: meta.description,
    alternates: { canonical, languages: { en: `${baseUrl}/en/services`, es: `${baseUrl}/es/services` } },
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

export default function ServicesPage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  const tr = t(lang)
  const s = tr.services
  const lk = (href: string) => `/${lang}${href}`

  const sectionBgs  = [tw.white, tw.bg, tw.white]
  const detailBgs   = [tw.bg,    tw.white, tw.bg]

  return (
    <main style={{ backgroundColor: tw.bg, backgroundImage: notebookBg, minHeight: '100vh' }}>
      <Nav lang={lang} tr={tr.nav} />

      {/* Header */}
      <header style={{ paddingTop: '0', background: tw.white, borderBottom: `1px solid ${tw.rule}` }}>
        <div style={{ padding: '4.5rem clamp(1.25rem,5vw,4rem) 4rem', maxWidth: '860px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
            <div style={{ width: '22px', height: '1px', background: tw.green }} />
            <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: tw.green }}>
              {s.label}
            </span>
          </div>
          <h1 style={{ fontFamily: serif, fontSize: 'clamp(2.5rem,6vw,5rem)', lineHeight: 1.05, color: tw.inkMid, marginBottom: '0.5rem' }} className="tw-ink-heavy">
            {s.h1_1}<br />{s.h1_2} {s.h1_em}
          </h1>
          <svg width="280" height="8" viewBox="0 0 280 8" fill="none" style={{ display: 'block', marginBottom: '2rem' }}>
            <path d="M0 4 Q70 1 140 4 Q210 7 280 4" stroke="#4A8C40" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
          <p style={{ fontFamily: mono, fontSize: '15px', lineHeight: 1.78, maxWidth: '580px', color: tw.inkSub }}>
            {s.intro}
          </p>
        </div>
      </header>

      {/* Services */}
      {s.items.map((item, idx) => (
        <section key={item.id} id={item.id} style={{ borderBottom: `1px solid ${tw.rule}` }}>
          <div className="services-split-grid">
            {/* Left */}
            <div style={{ background: sectionBgs[idx], borderRight: `1px solid ${tw.rule}`, padding: '4rem clamp(1.25rem,4vw,3.5rem)' }}>
              <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: tw.inkFaint, marginBottom: '2.5rem' }}>
                {item.n}
              </div>
              <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem,4vw,3rem)', lineHeight: 1.1, color: tw.inkMid, marginBottom: '1.75rem' }} className="tw-ink">
                {item.title.split('\n').map((line, i) => <span key={i}>{line}{i < item.title.split('\n').length - 1 && <br />}</span>)}
              </h2>
              <p style={{ fontFamily: mono, fontSize: '15px', lineHeight: 1.8, color: tw.inkSub, marginBottom: '1.25rem' }}>{item.lead}</p>
              <p style={{ fontFamily: mono, fontSize: '14px', lineHeight: 1.8, color: tw.inkFaint }}>{item.body}</p>
            </div>
            {/* Right */}
            <div style={{ background: detailBgs[idx], padding: '4rem clamp(1.25rem,4vw,3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {item.details.map((d) => (
                  <div key={d.label} style={{ borderLeft: `2px solid rgba(74,140,64,0.35)`, paddingLeft: '20px' }}>
                    <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: tw.green, marginBottom: '8px' }}>
                      {d.label}
                    </div>
                    <p style={{ fontFamily: mono, fontSize: '14px', lineHeight: 1.75, color: tw.inkSub }}>{d.text}</p>
                  </div>
                ))}
              </div>
              <Link
                href={lk('/contact')}
                style={{
                  marginTop: '3rem', display: 'inline-flex', alignItems: 'center', gap: '10px',
                  fontFamily: mono, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase',
                  padding: '13px 26px', textDecoration: 'none', alignSelf: 'flex-start',
                  ...(item.ctaStyle === 'primary'
                    ? { background: tw.green, color: '#fff' }
                    : { border: `1px solid ${tw.rule}`, color: tw.inkSub }),
                }}
              >
                {item.cta} →
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* CTA final */}
      <section style={{ background: tw.white, padding: '5rem clamp(1.25rem,5vw,4rem)', textAlign: 'center', borderTop: `1px solid ${tw.rule}` }}>
        <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem,5vw,4rem)', lineHeight: 1.1, color: tw.inkMid, marginBottom: '0.5rem' }} className="tw-ink">
          {s.bottomCta.h2.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)} {s.bottomCta.h2_em}
        </h2>
        <svg width="200" height="8" viewBox="0 0 200 8" fill="none" style={{ display: 'block', margin: '0 auto 2rem' }}>
          <path d="M0 4 Q50 1 100 4 Q150 7 200 4" stroke="#4A8C40" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </svg>
        <p style={{ fontFamily: mono, fontSize: '15px', lineHeight: 1.75, maxWidth: '420px', margin: '0 auto 2.5rem', color: tw.inkSub }}>
          {s.bottomCta.body}
        </p>
        <Link href={lk('/contact')} style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          background: tw.green, color: '#fff',
          fontFamily: mono, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase',
          padding: '15px 40px', textDecoration: 'none',
        }}>
          {s.bottomCta.cta} →
        </Link>
      </section>

      <Footer lang={lang} tr={tr.footer} />

      <style>{`
        .services-split-grid { display: grid; grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) {
          .services-split-grid { grid-template-columns: 1fr !important; }
          .services-split-grid > div:first-child { border-right: none !important; border-bottom: 1px solid #E8E4DE; }
        }
      `}</style>
    </main>
  )
}
