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
    kicker: 'For recruiters',
    h1a: 'Tools for recruiters',
    h1b: 'and talent ops in LATAM.',
    intro: 'A small set of resources for the people on the other side of the table. Use them, share them, send us what you want us to add next.',
    toolsLabel: 'Available now',
    tools: [
      {
        title: 'Open HR & recruiting roles',
        desc: 'Curated recruiting, sourcing, TA and people ops roles across LATAM. Same filter we apply to embedded searches — nothing junk.',
        href: 'https://tools.wearebondy.com/recursos-recruiters/busco-trabajo',
        external: true,
        cta: 'Open the board ↗',
        status: 'LIVE',
      },
      {
        title: 'Bondy Thinking',
        desc: 'Notes on hiring, retention and the LATAM market. Mostly written for hiring managers, but useful if you run searches.',
        href: '/en/thinking',
        external: false,
        cta: 'Read articles →',
        status: 'LIVE',
      },
      {
        title: 'Sourcing playbook · LATAM',
        desc: 'How we run a senior tech search end-to-end in LATAM: where we look, how we screen, what we never ask. With templates.',
        href: '#',
        external: false,
        cta: 'Coming soon',
        status: 'SOON',
      },
      {
        title: 'Boolean library',
        desc: 'Tested boolean strings for the stacks we hunt every week — backend, data, ML, devops, security. Updated quarterly.',
        href: '#',
        external: false,
        cta: 'Coming soon',
        status: 'SOON',
      },
      {
        title: 'Salary benchmarks',
        desc: 'Comp ranges by seniority, stack and country, built from 200+ recent placements. For internal calibration, not bragging.',
        href: '#',
        external: false,
        cta: 'Coming soon',
        status: 'SOON',
      },
      {
        title: 'Vendor swap network',
        desc: 'A small private group of LATAM recruiting leads we trade leads and candidates with. Invitation only.',
        href: '#',
        external: false,
        cta: 'Coming soon',
        status: 'SOON',
      },
    ],
    asideTitle: 'Want a partner on a hard search?',
    asideBody: 'We work as an embedded recruiter for engineering teams. If a search is stalled or out of your stack, we can step in.',
    asideCta: 'Talk to us →',
    asideCtaHref: '/en/contact',
  },
  es: {
    kicker: 'Para recruiters',
    h1a: 'Herramientas para recruiters',
    h1b: 'y talent ops en LATAM.',
    intro: 'Un set chico de recursos para la gente del otro lado de la mesa. Usalas, compartilas, contanos qué querés que agreguemos.',
    toolsLabel: 'Disponibles hoy',
    tools: [
      {
        title: 'Roles de HR y recruiting',
        desc: 'Búsquedas curadas de recruiting, sourcing, TA y people ops en LATAM. Mismo filtro que aplicamos a nuestras embedded — nada basura.',
        href: 'https://tools.wearebondy.com/recursos-recruiters/busco-trabajo',
        external: true,
        cta: 'Abrir el tablero ↗',
        status: 'LIVE',
      },
      {
        title: 'Bondy Thinking',
        desc: 'Notas sobre hiring, retención y el mercado LATAM. Mayormente para hiring managers, pero útil si corrés búsquedas.',
        href: '/es/thinking',
        external: false,
        cta: 'Leer artículos →',
        status: 'LIVE',
      },
      {
        title: 'Playbook de sourcing · LATAM',
        desc: 'Cómo corremos una búsqueda senior tech de punta a punta en LATAM: dónde miramos, cómo screeneamos, qué nunca preguntamos. Con templates.',
        href: '#',
        external: false,
        cta: 'Próximamente',
        status: 'SOON',
      },
      {
        title: 'Librería de booleans',
        desc: 'Strings boolean testeados para los stacks que cazamos cada semana — backend, data, ML, devops, security. Updates cada trimestre.',
        href: '#',
        external: false,
        cta: 'Próximamente',
        status: 'SOON',
      },
      {
        title: 'Benchmarks de salarios',
        desc: 'Rangos de comp por seniority, stack y país, construidos con 200+ placements recientes. Para calibrar interno, no para fanfarrear.',
        href: '#',
        external: false,
        cta: 'Próximamente',
        status: 'SOON',
      },
      {
        title: 'Network de canje',
        desc: 'Grupo chico privado de leads de recruiting LATAM con quienes intercambiamos leads y candidatos. Solo por invitación.',
        href: '#',
        external: false,
        cta: 'Próximamente',
        status: 'SOON',
      },
    ],
    asideTitle: '¿Necesitás partner en una búsqueda difícil?',
    asideBody: 'Trabajamos como embedded recruiter para equipos de ingeniería. Si una búsqueda está trabada o fuera de tu stack, entramos.',
    asideCta: 'Hablemos →',
    asideCtaHref: '/es/contact',
  },
}

export async function generateMetadata({ params }: { params: { lang: Lang } }): Promise<Metadata> {
  const c = copy[params.lang]
  const baseUrl = 'https://wearebondy.com'
  const title = params.lang === 'en'
    ? 'For recruiters — Bondy resources'
    : 'Para recruiters — Recursos Bondy'
  const description = c.intro
  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${params.lang}/recursos-recruiters`,
      languages: {
        en: `${baseUrl}/en/recursos-recruiters`,
        es: `${baseUrl}/es/recursos-recruiters`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${params.lang}/recursos-recruiters`,
      siteName: 'Bondy',
      type: 'website',
      images: [{ url: `${baseUrl}/og-image-v2.png`, width: 1200, height: 630, alt: 'Bondy — For recruiters' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/og-image-v2.png`],
    },
  }
}

export default function RecursosRecruitersPage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  const tr = t(lang)
  const c = copy[lang]

  return (
    <main style={{ background: tw.bg, minHeight: '100vh', backgroundImage: notebookBg }}>
      <Nav lang={lang} tr={tr.nav} />

      <section style={{ padding: 'clamp(3.5rem,9vw,6rem) clamp(1.25rem,5vw,4rem) clamp(2rem,5vw,3.5rem)', maxWidth: '1200px', margin: '0 auto', borderBottom: `1px solid ${tw.rule}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
          <span style={{ width: '22px', height: '1px', background: tw.green }} />
          <span style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.20em', textTransform: 'uppercase', color: tw.green }}>{c.kicker}</span>
        </div>
        <h1 style={{ fontFamily: serif, fontSize: 'clamp(2.8rem,7vw,5rem)', lineHeight: 1, color: tw.inkMid, margin: 0, opacity: 0.92, textShadow: '.5px .5px 0 rgba(0,0,0,.12)' }}>
          {c.h1a}<br />{c.h1b}
        </h1>
        <p style={{ fontFamily: mono, fontSize: '15px', lineHeight: 1.7, color: tw.inkFaint, maxWidth: '620px', marginTop: '1.6rem' }}>{c.intro}</p>
      </section>

      <section style={{ padding: 'clamp(2.5rem,5vw,3.5rem) clamp(1.25rem,5vw,4rem) clamp(4rem,8vw,6rem)', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.20em', textTransform: 'uppercase', color: tw.inkFaint, marginBottom: '1.5rem' }}>{c.toolsLabel}</div>
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
                  }}>{tool.status}</span>
                  {tool.external && tool.status === 'LIVE' && (
                    <span style={{ fontSize: '12px', color: tw.inkFaint }}>↗</span>
                  )}
                </div>
                <h3 style={{ fontFamily: serif, fontSize: '1.3rem', color: tw.inkMid, margin: 0, lineHeight: 1.2 }}>{tool.title}</h3>
                <p style={{ fontFamily: mono, fontSize: '13px', lineHeight: 1.7, color: tw.inkSub, flex: 1, margin: 0 }}>{tool.desc}</p>
                <div style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: tool.status === 'LIVE' ? tw.green : tw.inkFaint, marginTop: '0.5rem' }}>{tool.cta}</div>
              </div>
            )
            if (tool.status === 'SOON') return <div key={tool.title} style={{ cursor: 'not-allowed', opacity: 0.65 }}>{inner}</div>
            return tool.external ? (
              <a key={tool.title} href={tool.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>{inner}</a>
            ) : (
              <Link key={tool.title} href={tool.href} style={{ textDecoration: 'none', color: 'inherit' }}>{inner}</Link>
            )
          })}
        </div>

        <div style={{ marginTop: 'clamp(3rem,6vw,4.5rem)', padding: 'clamp(2rem,4vw,3rem)', background: tw.white, border: `1px solid ${tw.rule}`, display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
          <h3 style={{ fontFamily: serif, fontSize: 'clamp(1.5rem,3vw,2rem)', color: tw.inkMid, margin: 0, lineHeight: 1.2 }}>{c.asideTitle}</h3>
          <p style={{ fontFamily: mono, fontSize: '14px', lineHeight: 1.7, color: tw.inkSub, margin: 0, maxWidth: '560px' }}>{c.asideBody}</p>
          <Link href={c.asideCtaHref} style={{ fontFamily: mono, fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: tw.white, background: tw.green, padding: '13px 24px', textDecoration: 'none', marginTop: '0.5rem' }}>
            {c.asideCta}
          </Link>
        </div>
      </section>

      <Footer lang={lang} tr={tr.footer} />

      <style>{`
        .tool-card:hover { background: rgba(74,140,64,0.04) !important; }
      `}</style>
    </main>
  )
}
