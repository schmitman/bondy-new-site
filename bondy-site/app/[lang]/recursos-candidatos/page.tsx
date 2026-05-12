import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'

const tw = {
  bg: '#FEFCF9',
  ink: '#1A1A1A',
  inkMid: '#3A3530',
  inkSub: '#5A5550',
  inkFaint: '#7A7874',
  rule: '#E8E4DE',
  white: '#FFFFFF',
  green: '#4A8C40',
}
const serif = "'Special Elite', Georgia, serif"
const mono = "'Plus Jakarta Sans', system-ui, sans-serif"
const notebookBg = [
  'linear-gradient(90deg, transparent 68px, rgba(210,100,80,0.10) 68px, rgba(210,100,80,0.10) 69.5px, transparent 69.5px)',
  'repeating-linear-gradient(180deg, transparent 0px, transparent 31px, rgba(100,140,200,0.09) 31px, rgba(100,140,200,0.09) 32px)',
].join(',')

const copy = {
  en: {
    kicker: 'For candidates',
    h1a: 'Tools for senior',
    h1b: 'engineers in LATAM.',
    intro: 'A small set of resources built for the people we want to talk to. Use them, share them, ignore them — your call.',
    toolsLabel: 'Available now',
    tools: [
      {
        title: 'Open roles in LATAM',
        desc: 'A daily-updated job board with tech roles across LATAM, sourced from 7 ATSes and curated by us. No login, no spam.',
        href: 'https://tools.wearebondy.com/busco-trabajo',
        external: true,
        cta: 'Open the board ↗',
        status: 'LIVE',
      },
      {
        title: 'Join our talent pool',
        desc: 'If you are open to opportunities but no role here fits today, leave us your profile. We reach out when something matches.',
        href: '/en/sumar-perfil',
        external: false,
        cta: 'Submit profile →',
        status: 'LIVE',
      },
      {
        title: 'Salary insights',
        desc: 'Anonymized salary data from 200+ recent placements across Argentina, Brazil, Mexico and Colombia. Filter by stack and seniority.',
        href: '#',
        external: false,
        cta: 'Coming soon',
        status: 'SOON',
      },
      {
        title: 'Interview prep notes',
        desc: 'Honest notes on what our hiring partners actually ask in technical interviews. Stack-specific, no generic advice.',
        href: '#',
        external: false,
        cta: 'Coming soon',
        status: 'SOON',
      },
      {
        title: 'Compensation calculator',
        desc: 'A quick estimator for what your seniority and stack should be earning right now in LATAM, by market and currency.',
        href: '#',
        external: false,
        cta: 'Coming soon',
        status: 'SOON',
      },
      {
        title: 'Bondy Thinking',
        desc: 'Notes on technical hiring, retention and the LATAM market — useful whether you are hiring or being hired.',
        href: '/en/thinking',
        external: false,
        cta: 'Read articles →',
        status: 'LIVE',
      },
    ],
    asideTitle: 'Looking for a role?',
    asideBody: 'Our job board updates every weekday from 7 sources across LATAM. The most direct path is to open it now.',
    asideCta: 'Open the job board ↗',
    asideCtaHref: 'https://tools.wearebondy.com/busco-trabajo',
  },
  es: {
    kicker: 'Para candidatos',
    h1a: 'Herramientas para',
    h1b: 'ingenieros senior en LATAM.',
    intro: 'Un set chico de recursos hechos para la gente con la que queremos hablar. Usalas, compartilas, ignoralas — vos decidís.',
    toolsLabel: 'Disponibles hoy',
    tools: [
      {
        title: 'Búsquedas abiertas en LATAM',
        desc: 'Un job board actualizado a diario con roles tech en LATAM, sourceado de 7 ATSes y curado por nosotros. Sin login, sin spam.',
        href: 'https://tools.wearebondy.com/busco-trabajo',
        external: true,
        cta: 'Abrir el tablero ↗',
        status: 'LIVE',
      },
      {
        title: 'Sumate al pool de talento',
        desc: 'Si estás abierto a oportunidades pero no hay rol hoy que te cierre, dejanos tu perfil. Te contactamos cuando algo matchea.',
        href: '/es/sumar-perfil',
        external: false,
        cta: 'Sumar perfil →',
        status: 'LIVE',
      },
      {
        title: 'Insights de salarios',
        desc: 'Data anónima de salarios de 200+ placements recientes en Argentina, Brasil, México y Colombia. Filtrá por stack y seniority.',
        href: '#',
        external: false,
        cta: 'Próximamente',
        status: 'SOON',
      },
      {
        title: 'Notas para entrevistas',
        desc: 'Notas honestas de lo que nuestros clientes preguntan de verdad en entrevistas técnicas. Específicas por stack, sin advice genérico.',
        href: '#',
        external: false,
        cta: 'Próximamente',
        status: 'SOON',
      },
      {
        title: 'Calculadora de compensación',
        desc: 'Estimador rápido de cuánto debería estar ganando tu seniority y stack hoy en LATAM, por mercado y moneda.',
        href: '#',
        external: false,
        cta: 'Próximamente',
        status: 'SOON',
      },
      {
        title: 'Bondy Thinking',
        desc: 'Notas sobre hiring técnico, retención y el mercado LATAM — útiles si contratás o si estás siendo contratado.',
        href: '/es/thinking',
        external: false,
        cta: 'Leer artículos →',
        status: 'LIVE',
      },
    ],
    asideTitle: '¿Buscás un rol?',
    asideBody: 'Nuestro job board se actualiza todos los días hábiles desde 7 fuentes en LATAM. El camino más directo es abrirlo ahora.',
    asideCta: 'Abrir el job board ↗',
    asideCtaHref: 'https://tools.wearebondy.com/busco-trabajo',
  },
}

export async function generateMetadata({ params }: { params: { lang: Lang } }): Promise<Metadata> {
  const c = copy[params.lang]
  const baseUrl = 'https://wearebondy.com'
  const title = params.lang === 'en'
    ? 'For candidates — Bondy resources'
    : 'Para candidatos — Recursos Bondy'
  const description = c.intro
  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${params.lang}/recursos-candidatos`,
      languages: {
        en: `${baseUrl}/en/recursos-candidatos`,
        es: `${baseUrl}/es/recursos-candidatos`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${params.lang}/recursos-candidatos`,
      siteName: 'Bondy',
      type: 'website',
      images: [{ url: `${baseUrl}/og-image-v2.png`, width: 1200, height: 630, alt: 'Bondy — For candidates' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/og-image-v2.png`],
    },
  }
}

export default function RecursosCandidatosPage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  const tr = t(lang)
  const c = copy[lang]

  return (
    <main style={{ background: tw.bg, minHeight: '100vh', backgroundImage: notebookBg }}>
      <Nav lang={lang} tr={tr.nav} />

      {/* Hero */}
      <section style={{ padding: 'clamp(3.5rem,9vw,6rem) clamp(1.25rem,5vw,4rem) clamp(2rem,5vw,3.5rem)', maxWidth: '1200px', margin: '0 auto', borderBottom: `1px solid ${tw.rule}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
          <span style={{ width: '22px', height: '1px', background: tw.green }} />
          <span style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.20em', textTransform: 'uppercase', color: tw.green }}>
            {c.kicker}
          </span>
        </div>
        <h1 style={{ fontFamily: serif, fontSize: 'clamp(2.8rem,7vw,5rem)', lineHeight: 1, color: tw.inkMid, margin: 0, opacity: 0.92, textShadow: '.5px .5px 0 rgba(0,0,0,.12)' }}>
          {c.h1a}<br />{c.h1b}
        </h1>
        <p style={{ fontFamily: mono, fontSize: '15px', lineHeight: 1.7, color: tw.inkFaint, maxWidth: '620px', marginTop: '1.6rem' }}>
          {c.intro}
        </p>
      </section>

      {/* Tools grid */}
      <section style={{ padding: 'clamp(2.5rem,5vw,3.5rem) clamp(1.25rem,5vw,4rem) clamp(4rem,8vw,6rem)', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.20em', textTransform: 'uppercase', color: tw.inkFaint, marginBottom: '1.5rem' }}>
          {c.toolsLabel}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', background: tw.rule, border: `1px solid ${tw.rule}` }}>
          {c.tools.map((tool) => {
            const inner = (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem', padding: 'clamp(1.5rem,3vw,2rem)', background: tw.white, transition: 'background 0.15s' }} className="tool-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontFamily: mono,
                    fontSize: '9px',
                    letterSpacing: '0.18em',
                    color: tool.status === 'LIVE' ? tw.green : tw.inkFaint,
                    border: `1px solid ${tool.status === 'LIVE' ? tw.green : tw.rule}`,
                    padding: '2px 8px',
                  }}>
                    {tool.status}
                  </span>
                  {tool.external && tool.status === 'LIVE' && (
                    <span style={{ fontSize: '12px', color: tw.inkFaint }}>↗</span>
                  )}
                </div>
                <h3 style={{ fontFamily: serif, fontSize: '1.3rem', color: tw.inkMid, margin: 0, lineHeight: 1.2 }}>
                  {tool.title}
                </h3>
                <p style={{ fontFamily: mono, fontSize: '13px', lineHeight: 1.7, color: tw.inkSub, flex: 1, margin: 0 }}>
                  {tool.desc}
                </p>
                <div style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: tool.status === 'LIVE' ? tw.green : tw.inkFaint, marginTop: '0.5rem' }}>
                  {tool.cta}
                </div>
              </div>
            )
            if (tool.status === 'SOON') {
              return <div key={tool.title} style={{ cursor: 'not-allowed', opacity: 0.65 }}>{inner}</div>
            }
            return tool.external ? (
              <a key={tool.title} href={tool.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>{inner}</a>
            ) : (
              <Link key={tool.title} href={tool.href} style={{ textDecoration: 'none', color: 'inherit' }}>{inner}</Link>
            )
          })}
        </div>

        {/* Aside CTA */}
        <div style={{ marginTop: 'clamp(3rem,6vw,4.5rem)', padding: 'clamp(2rem,4vw,3rem)', background: tw.white, border: `1px solid ${tw.rule}`, display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
          <h3 style={{ fontFamily: serif, fontSize: 'clamp(1.5rem,3vw,2rem)', color: tw.inkMid, margin: 0, lineHeight: 1.2 }}>{c.asideTitle}</h3>
          <p style={{ fontFamily: mono, fontSize: '14px', lineHeight: 1.7, color: tw.inkSub, margin: 0, maxWidth: '560px' }}>{c.asideBody}</p>
          <a href={c.asideCtaHref} target="_blank" rel="noopener noreferrer" style={{ fontFamily: mono, fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: tw.white, background: tw.green, padding: '13px 24px', textDecoration: 'none', marginTop: '0.5rem' }}>
            {c.asideCta}
          </a>
        </div>
      </section>

      <Footer lang={lang} tr={tr.footer} />

      <style>{`
        .tool-card:hover { background: rgba(74,140,64,0.04) !important; }
      `}</style>
    </main>
  )
}
