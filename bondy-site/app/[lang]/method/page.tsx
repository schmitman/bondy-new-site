import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import HeroV2 from '@/components/bondy/HeroV2'
import { Tag, BondyUnderline, SectionBar } from '@/components/bondy/atoms'
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

      {/* Header — Hero V2 (editorial + metadata aside) */}
      <header style={{ background: tw.white, borderBottom: `1px solid ${tw.rule}` }}>
        <HeroV2
          kicker={m.label}
          title={
            <>
              {m.h1_1}<br />{m.h1_2} <em style={{ fontStyle: 'normal', color: tw.green }}>{m.h1_em}</em>
            </>
          }
          underlineWidth={260}
          body={m.intro}
          meta={[
            { n: '05', label: lang === 'es' ? 'Pasos' : 'Steps' },
            { n: '18', label: lang === 'es' ? 'Años' : 'Years' },
            { n: '1', label: lang === 'es' ? 'Método' : 'Method', separatorBefore: true },
          ]}
        />
      </header>

      {/* Steps — grid de cards (refresh) */}
      <div style={{ padding: '0 clamp(1.25rem,5vw,4rem)' }}>
        <SectionBar
          label={lang === 'es' ? '— Los cinco pasos' : '— The five steps'}
          right={m.steps.length.toString().padStart(2, '0') + (lang === 'es' ? ' EN TOTAL' : ' STEPS')}
        />
      </div>
      <section style={{ padding: '32px clamp(1.25rem,5vw,4rem) 56px' }}>
        <div className="method-cards-grid">
          {m.steps.map((step, i) => {
            const phaseLabels = lang === 'es'
              ? ['DIAGNÓSTICO', 'ESTRATEGIA', 'BÚSQUEDA', 'SHORTLIST', 'CIERRE']
              : ['DIAGNOSE', 'STRATEGY', 'SEARCH', 'SHORTLIST', 'CLOSE']
            const phaseTag = phaseLabels[i] || `STEP ${step.n}`
            return (
              <div
                key={step.n}
                style={{
                  position: 'relative',
                  background: tw.white,
                  border: `1px solid ${tw.rule}`,
                  padding: '36px 36px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                {/* corner accent */}
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  style={{ position: 'absolute', top: 0, right: 0 }}
                  aria-hidden="true"
                >
                  <path d="M 14 0 L 40 0 L 40 26 Z" fill={tw.green} opacity="0.85" />
                </svg>
                {/* Top row: number + phase tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
                  <span style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.18em', color: tw.inkFaint, fontWeight: 500 }}>
                    {step.n}
                  </span>
                  <Tag tone="green">{phaseTag}</Tag>
                </div>
                {/* Title */}
                <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.6rem,2.6vw,2.2rem)', lineHeight: 1.05, color: tw.inkMid, marginBottom: '8px', opacity: 0.92, fontWeight: 400, letterSpacing: '-0.005em' }} className="tw-ink">
                  {step.title}
                </h2>
                <BondyUnderline width={88} strokeWidth={2} style={{ marginBottom: '16px' }} />
                {/* Sub bold */}
                <div style={{ fontFamily: mono, fontSize: '14px', fontWeight: 700, color: tw.inkSub, marginBottom: '14px' }}>
                  {step.subtitle}
                </div>
                {/* Body */}
                <p style={{ fontFamily: mono, fontSize: '14.5px', lineHeight: 1.78, color: tw.inkSub, flexGrow: 1, marginBottom: '24px' }}>
                  {step.body}
                </p>
                {/* Footer: timeline */}
                <div style={{
                  borderTop: `1px solid ${tw.rule}`,
                  paddingTop: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{ fontFamily: mono, fontSize: '9.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: tw.inkFaint, fontWeight: 500 }}>
                    {m.timelineLabel}
                  </span>
                  <span style={{ fontFamily: mono, fontSize: '11px', color: tw.inkSub, letterSpacing: '0.04em' }}>
                    {step.time}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
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
        .method-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }
        .cta-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) {
          .method-cards-grid { grid-template-columns: 1fr; }
          .cta-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
