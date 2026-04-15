import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'
import type { Metadata } from 'next'

const pageMeta = {
  en: {
    title: 'Bondy — Technical Recruiting Firm in Buenos Aires & LATAM',
    description: 'Technical recruiting firm in Buenos Aires. We help CTOs and engineering leaders hire backend, frontend, and data engineers across Argentina and LATAM.',
  },
  es: {
    title: 'Bondy — Recruiting Técnico para Equipos de Ingeniería en LATAM',
    description: 'Firma de recruiting técnico en Buenos Aires. Ayudamos a CTOs y líderes de ingeniería a contratar engineers backend, frontend y datos en LATAM.',
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

/* ── Design tokens ── */
const tw = {
  bg:       '#FEFCF9',
  ink:      '#1A1A1A',
  inkMid:   '#3A3530',
  inkSub:   '#5A5550',
  inkFaint: '#7A7874',
  rule:     '#E8E4DE',
  white:    '#FFFFFF',
  green:    '#4A8C40',
}

const notebookBg = [
  'linear-gradient(90deg, transparent 68px, rgba(210,100,80,0.10) 68px, rgba(210,100,80,0.10) 69.5px, transparent 69.5px)',
  'repeating-linear-gradient(180deg, transparent 0px, transparent 31px, rgba(100,140,200,0.09) 31px, rgba(100,140,200,0.09) 32px)',
].join(',')

const serif = "'Special Elite', Georgia, serif"
const mono  = "'Courier Prime', Courier, monospace"

/* ── SVG underline ── */
function TwUnderline({ width = 200 }: { width?: number }) {
  const h = 8
  const mid = width / 2
  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} fill="none" style={{ display: 'block', marginTop: '-2px' }}>
      <path
        d={`M0 4 Q${mid * 0.5} 1 ${mid} 4 Q${mid * 1.5} 7 ${width} 4`}
        stroke="#4A8C40" strokeWidth="2" fill="none" strokeLinecap="round"
      />
    </svg>
  )
}

export default function Home({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  const tr = t(lang)
  const h = tr.home
  const lk = (href: string) => `/${lang}${href}`

  return (
    <main style={{ backgroundColor: tw.bg, backgroundImage: notebookBg, minHeight: '100vh' }}>
      <Nav lang={lang} tr={tr.nav} />

      {/* ── HERO ── */}
      <section style={{ minHeight: '92vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '5rem clamp(1.25rem,5vw,4rem) 4rem' }}>
        {/* Kicker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2.5rem' }}>
          <div style={{ width: '22px', height: '1px', background: tw.green }} />
          <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.20em', textTransform: 'uppercase', color: tw.green }}>
            {h.hero.label}
          </span>
        </div>

        {/* H1 */}
        <h1
          className="tw-ink-heavy"
          style={{
            fontFamily: serif,
            fontSize: 'clamp(3.5rem,9vw,7rem)',
            lineHeight: 0.96,
            color: tw.inkMid,
            marginBottom: '0.5rem',
            maxWidth: '900px',
          }}
        >
          {h.hero.h1_1}<br />
          {h.hero.h1_2}<br />
          {h.hero.h1_3} {h.hero.h1_em1}<br />
          {h.hero.h1_em2}
        </h1>
        <TwUnderline width={320} />

        <p style={{ fontFamily: mono, fontSize: '15px', color: tw.inkFaint, lineHeight: 1.8, marginTop: '2rem', marginBottom: '3rem', maxWidth: '440px' }}>
          {h.hero.body}
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href={lk('/contact')} style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: mono, fontSize: '11px', letterSpacing: '0.10em', textTransform: 'uppercase',
            background: tw.green, color: '#fff',
            padding: '13px 26px', textDecoration: 'none',
          }}>
            {h.hero.cta_primary} →
          </Link>
          <Link href={lk('/method')} style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: mono, fontSize: '11px', letterSpacing: '0.10em', textTransform: 'uppercase',
            background: 'transparent', color: tw.inkSub,
            padding: '13px 26px', textDecoration: 'none',
            border: `1px solid ${tw.rule}`,
          }}>
            {h.hero.cta_secondary} →
          </Link>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ borderTop: `1px solid ${tw.rule}`, borderBottom: `1px solid ${tw.rule}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {[
            h.stats.experience,
            h.stats.speed,
            h.stats.retention,
          ].map((s, i) => (
            <div key={i} style={{
              padding: '3rem clamp(1.25rem,3vw,3rem)',
              borderRight: i < 2 ? `1px solid ${tw.rule}` : 'none',
              background: tw.white,
            }}>
              <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: tw.inkFaint, display: 'block', marginBottom: '1.5rem' }}>
                {s.label}
              </span>
              <div style={{ fontFamily: serif, fontSize: 'clamp(3rem,5vw,4.5rem)', lineHeight: 1, color: tw.inkMid }} className="tw-ink">
                {s.value}<span style={{ color: tw.green, fontSize: '0.45em' }}>{s.sup}</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: '14px', color: tw.inkSub, marginTop: '0.75rem', lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
          <div style={{ padding: '3rem clamp(1.25rem,3vw,3rem)', background: tw.bg }}>
            <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: tw.inkFaint, display: 'block', marginBottom: '1.5rem' }}>
              {h.stats.method.label}
            </span>
            <div style={{ fontFamily: serif, fontSize: 'clamp(1.8rem,3vw,2.4rem)', lineHeight: 1.15, color: tw.green }} className="tw-ink">
              {h.stats.method.title.split('\n').map((line: string, i: number) => <span key={i}>{line}{i === 0 && <br />}</span>)}
            </div>
            <div style={{ fontFamily: mono, fontSize: '14px', color: tw.inkSub, marginTop: '0.75rem', lineHeight: 1.6 }}>{h.stats.method.desc}</div>
          </div>
        </div>
      </section>

      {/* ── STATEMENT ── */}
      <section style={{ padding: '5rem clamp(1.25rem,5vw,4rem)', borderBottom: `1px solid ${tw.rule}` }}>
        <div style={{ maxWidth: '860px' }}>
          <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: tw.green, marginBottom: '2.5rem' }}>
            {h.statement.label}
          </div>
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem,4vw,3.5rem)', lineHeight: 1.1, color: tw.inkMid, marginBottom: '0.5rem' }} className="tw-ink">
            {h.statement.h2_1}<br />
            {h.statement.h2_2} {h.statement.h2_em}
          </h2>
          <TwUnderline width={240} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: '2rem', marginTop: '3rem' }}>
            <p style={{ fontFamily: mono, fontSize: '15px', color: tw.inkSub, lineHeight: 1.75 }}>{h.statement.p1}</p>
            <p style={{ fontFamily: mono, fontSize: '15px', color: tw.inkSub, lineHeight: 1.75 }}>{h.statement.p2}</p>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ borderBottom: `1px solid ${tw.rule}` }}>
        <div style={{ padding: '2rem clamp(1.25rem,5vw,4rem)', borderBottom: `1px solid ${tw.rule}` }}>
          <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: tw.green }}>
            {h.services.label}
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))' }}>
          {h.services.items.map((svc, i) => (
            <div key={i} style={{
              padding: '3rem clamp(1.25rem,3vw,3rem)',
              borderRight: i < h.services.items.length - 1 ? `1px solid ${tw.rule}` : 'none',
              background: i % 2 === 0 ? tw.white : tw.bg,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: tw.inkFaint, marginBottom: '2rem' }}>{svc.n}</div>
                <h3 style={{ fontFamily: serif, fontSize: '1.6rem', color: tw.inkMid, lineHeight: 1.2, marginBottom: '1rem' }} className="tw-ink">
                  {svc.title.split('\n').map((line: string, j: number) => <span key={j}>{line}{j < svc.title.split('\n').length - 1 && <br />}</span>)}
                </h3>
                <p style={{ fontFamily: mono, fontSize: '14px', color: tw.inkSub, lineHeight: 1.75 }}>{svc.body}</p>
              </div>
              <Link href={lk(`/services#${['hunting','pipeline','rpo'][i]}`)} style={{
                marginTop: '2rem', fontFamily: mono, fontSize: '10px', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: tw.green, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px',
              }}>
                {svc.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── METHOD TEASER ── */}
      <section style={{ borderBottom: `1px solid ${tw.rule}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px,1fr))' }}>
          <div style={{ padding: '4rem clamp(1.25rem,4vw,3.5rem)', borderRight: `1px solid ${tw.rule}`, background: tw.white }}>
            <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: tw.green, marginBottom: '2.5rem' }}>
              {h.method.label}
            </div>
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem,3.5vw,3rem)', lineHeight: 1.1, color: tw.inkMid, marginBottom: '0.5rem' }} className="tw-ink">
              {h.method.h2_1}<br />{h.method.h2_2} {h.method.h2_em}
            </h2>
            <TwUnderline width={200} />
            <p style={{ fontFamily: mono, fontSize: '14px', color: tw.inkSub, lineHeight: 1.78, marginTop: '2rem', marginBottom: '1.25rem', maxWidth: '380px' }}>{h.method.p1}</p>
            <p style={{ fontFamily: mono, fontSize: '14px', color: tw.inkSub, lineHeight: 1.78, marginBottom: '3rem', maxWidth: '380px' }}>{h.method.p2}</p>
            <Link href={lk('/method')} style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: tw.green, textDecoration: 'none' }}>
              {h.method.cta} →
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {h.method.steps.map((step) => (
              <div key={step.n} style={{ padding: '2rem clamp(1.25rem,3vw,3rem)', borderBottom: `1px solid ${tw.rule}`, display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: mono, fontSize: '10px', color: tw.green, letterSpacing: '0.15em', marginTop: '2px', flexShrink: 0 }}>{step.n}</span>
                <div>
                  <div style={{ fontFamily: serif, fontSize: '1.1rem', color: tw.inkMid, marginBottom: '0.4rem' }}>{step.title}</div>
                  <div style={{ fontFamily: mono, fontSize: '13px', color: tw.inkSub, lineHeight: 1.72 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 1 IN 4 PRINCIPLE ── */}
      <section style={{ background: tw.white, padding: '3.5rem clamp(1.25rem,5vw,4rem)', borderBottom: `1px solid ${tw.rule}` }}>
        <div style={{ maxWidth: '760px', display: 'flex', gap: '2.5rem', alignItems: 'flex-start' }}>
          <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: tw.green, flexShrink: 0, paddingTop: '4px' }}>
            {lang === 'es' ? 'Principio' : 'Principle'}
          </div>
          <div style={{ borderLeft: `2px solid rgba(74,140,64,0.3)`, paddingLeft: '1.5rem' }}>
            <p style={{ fontFamily: serif, fontSize: 'clamp(1.1rem,2vw,1.5rem)', fontWeight: 400, lineHeight: 1.4, color: tw.inkMid, marginBottom: '0.75rem' }} className="tw-ink">
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

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '6rem clamp(1.25rem,5vw,4rem)', textAlign: 'center' }}>
        <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: tw.green, marginBottom: '2rem' }}>
          {h.finalCta.label}
        </div>
        <h2 style={{ fontFamily: serif, fontSize: 'clamp(2.5rem,6vw,5rem)', lineHeight: 1.0, color: tw.inkMid, marginBottom: '0.5rem' }} className="tw-ink-heavy">
          {h.finalCta.h2_1}<br />{h.finalCta.h2_2} {h.finalCta.h2_em}
        </h2>
        <TwUnderline width={280} />
        <p style={{ fontFamily: mono, fontSize: '15px', color: tw.inkSub, lineHeight: 1.75, maxWidth: '420px', margin: '2rem auto 3rem' }}>
          {h.finalCta.body}
        </p>
        <Link href={lk('/contact')} style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          fontFamily: mono, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase',
          background: tw.green, color: '#fff',
          padding: '15px 40px', textDecoration: 'none',
        }}>
          {h.finalCta.cta} →
        </Link>
      </section>

      <Footer lang={lang} tr={tr.footer} />

      {/* FAQ JSON-LD — targets Google People Also Ask — EN only */}
      {lang === 'en' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'How long does it take to hire an engineer in Argentina?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: "Most of our searches reach a qualified shortlist in 5 to 7 business days. From kickoff to accepted offer, expect 3 to 6 weeks — depending on role complexity and how fast your interview process moves. We don't pad timelines. We also don't rush them.",
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What types of technical roles does Bondy recruit for?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'The full stack — backend, frontend, full-stack, data, DevOps, mobile, and increasingly AI/ML and LLM engineering. If evaluating the role requires technical judgment, we can run the search. We recruit for what the market needs now, not just what we have placed before.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Do you work with early-stage startups or only larger companies?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: "Both. Our clients range from Series A startups to public companies. What they have in common is that a wrong hire is genuinely costly — in time, in team dynamics, in momentum. We're the right fit when good enough isn't.",
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What makes Bondy different from other technical recruiting firms in LATAM?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: "Mara Schmitman, our founder, has 18+ years in technical hiring in this market. In that time, Bondy was a pioneer in data protection standards and bias-aware recruitment practices in the region, and has consistently set the benchmark for what professional technical recruiting looks like here. Our 1-in-4 rule — if fewer than 1 in 4 candidates we present advance, we stop and realign — isn't a policy. It's what happens when you spend 18 years studying your own mistakes.",
                  },
                },
                {
                  '@type': 'Question',
                  name: "How does Bondy's pricing work?",
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'It depends on the service. For most searches we ask for a kickoff fee equivalent to 30% of the role\'s monthly salary — a minimal commitment that gets credited against the final fee. Hunting fees start at 14% of the placed engineer\'s annual salary, up to 23% depending on complexity. RPO engagements start at USD 3,500. Advisory work starts at USD 400/hour. Every engagement is scoped individually.',
                  },
                },
              ],
            }),
          }}
        />
      )}
    </main>
  )
}
