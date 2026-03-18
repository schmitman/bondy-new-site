import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'
import type { Metadata } from 'next'

const pageMeta = {
  en: {
    title: 'About Bondy — Technical Recruiting Firm, Buenos Aires',
    description: 'Founded in Buenos Aires in 2008, Bondy is a technical recruiting firm led by organizational psychologists. We define fit before we search for it.',
  },
  es: {
    title: 'Sobre Bondy — Firma de Recruiting Técnico, Buenos Aires',
    description: 'Fundada en Buenos Aires en 2008, Bondy es una firma de recruiting técnico liderada por psicólogos organizacionales. Definimos el fit antes de ir a buscarlo.',
  },
}

export async function generateMetadata({ params }: { params: { lang: 'en' | 'es' } }): Promise<Metadata> {
  const baseUrl = 'https://wearebondy.com'
  const meta = pageMeta[params.lang] ?? pageMeta.en
  const canonical = `${baseUrl}/${params.lang}/about`
  return {
    title: meta.title, description: meta.description,
    alternates: { canonical, languages: { en: `${baseUrl}/en/about`, es: `${baseUrl}/es/about` } },
    openGraph: { title: meta.title, description: meta.description, url: canonical, siteName: 'Bondy', locale: params.lang === 'es' ? 'es_AR' : 'en_US', type: 'website' },
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
const mono  = "'Courier Prime', Courier, monospace"

const team = [
  {
    name: 'Mara Schmitman',
    role: { en: 'Founder & Managing Director', es: 'Fundadora & Directora' },
    linkedin: 'https://www.linkedin.com/in/mara-schmitman2/',
    bio: {
      en: "Mara founded Bondy in Buenos Aires in 2008 after a clear observation: technical recruiting was being done by people who didn't understand engineers. A licensed psychologist with a specialization in strategic HR management and a Master's in Technology Management, she brought a different approach — apply organizational psychology rigor to the search process. Define fit before looking for it. Interview deeply. Send fewer candidates, and better ones. After 16 years, that's still exactly what she does. She leads every strategic client relationship personally.",
      es: 'Mara fundó Bondy en Buenos Aires en 2008 a partir de una observación concreta: el reclutamiento técnico lo hacían personas que no entendían a los ingenieros. Psicóloga matriculada con especialización en gestión estratégica de RRHH y un Máster en Gestión Tecnológica, trajo un enfoque diferente: aplicar el rigor de la psicología organizacional al proceso de búsqueda. Definir el fit antes de ir a buscarlo. Entrevistar en profundidad. Mandar menos candidatos, y mejores. Dieciséis años después, sigue siendo exactamente eso lo que hace. Lidera personalmente cada relación estratégica con clientes.',
    },
    credentials: [
      'Lic. en Psicología, Universidad de la Cuenca del Plata',
      'Especialista en Gestión Estratégica de RRHH, UdeSA',
      'Máster en Gestión Tecnológica, ITBA–EOI',
      'Diploma en Cultural Awareness, MIT',
      'Top 95 HR Influencers en Latinoamérica · Go Integro (3 años consecutivos)',
    ],
    since: '2008',
  },
  {
    name: 'Lucía Palomeque',
    role: { en: 'Head of Delivery', es: 'Head of Delivery' },
    linkedin: 'https://www.linkedin.com/in/luciapalomeque/',
    bio: {
      en: "Lucía joined Bondy as a technical recruiter and became the operational core of the team. A psychologist by training with a specialization in IT selection, she brings a rare combination: deep understanding of candidate motivation and the process discipline to run parallel searches at scale without losing quality. She owns delivery — which at Bondy means owning the standard. If a shortlist leaves the building, Lucía has reviewed it.",
      es: 'Lucía se unió a Bondy como recruitera técnica y se convirtió en el núcleo operativo del equipo. Psicóloga de formación con especialización en selección IT, aporta una combinación poco frecuente: comprensión profunda de la motivación de los candidatos y la disciplina de proceso para manejar búsquedas paralelas a escala sin perder calidad. Es dueña del delivery — que en Bondy significa ser dueña del estándar. Si una terna sale del equipo, Lucía la revisó.',
    },
    credentials: [
      'Lic. en Psicología, Universidad de Buenos Aires (UBA)',
      'Especialista en Selección de Talento IT',
    ],
    since: '2019',
  },
]

export default function AboutPage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  const tr = t(lang)
  const a = tr.about
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
              {a.label}
            </span>
          </div>
          <h1 style={{ fontFamily: serif, fontSize: 'clamp(2.5rem,6vw,5rem)', lineHeight: 1.05, color: tw.inkMid, marginBottom: '0.5rem' }} className="tw-ink-heavy">
            {a.h1_1}<br />{a.h1_2} {a.h1_em}
          </h1>
          <svg width="280" height="8" viewBox="0 0 280 8" fill="none" style={{ display: 'block', marginBottom: '2rem' }}>
            <path d="M0 4 Q70 1 140 4 Q210 7 280 4" stroke="#4A8C40" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
          <p style={{ fontFamily: mono, fontSize: '15px', lineHeight: 1.78, maxWidth: '600px', color: tw.inkSub }}>
            {a.intro}
          </p>
        </div>
      </header>

      {/* Origin */}
      <section style={{ borderBottom: `1px solid ${tw.rule}` }}>
        <div className="split-grid">
          <div style={{ padding: '4rem clamp(1.25rem,5vw,4rem)', borderRight: `1px solid ${tw.rule}`, background: tw.white }}>
            <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: tw.green, marginBottom: '1.5rem' }}>
              {a.origin.label}
            </div>
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.6rem,3vw,2.5rem)', lineHeight: 1.2, color: tw.inkMid }} className="tw-ink">
              {a.origin.h2.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
            </h2>
          </div>
          <div style={{ padding: '4rem clamp(1.25rem,5vw,4rem)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[a.origin.p1, a.origin.p2, a.origin.p3, a.origin.p4].map((p, i) => (
              <p key={i} style={{ fontFamily: mono, fontSize: '15px', lineHeight: 1.8, color: tw.inkSub }}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: tw.white, borderBottom: `1px solid ${tw.rule}` }}>
        <div style={{ padding: '4rem clamp(1.25rem,5vw,4rem) 1.5rem' }}>
          <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: tw.green, marginBottom: '1rem' }}>
            {a.values.label}
          </div>
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.6rem,3vw,2.5rem)', lineHeight: 1.2, color: tw.inkMid, marginBottom: '3rem' }} className="tw-ink">
            {a.values.h2}
          </h2>
        </div>
        <div style={{ borderTop: `1px solid ${tw.rule}` }}>
          {a.values.items.map((v) => (
            <div key={v.n} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '2rem', padding: '2rem clamp(1.25rem,5vw,4rem)', borderBottom: `1px solid ${tw.rule}` }}>
              <span style={{ fontFamily: mono, fontSize: '11px', color: tw.green, letterSpacing: '0.1em', paddingTop: '3px' }}>{v.n}</span>
              <div>
                <div style={{ fontFamily: serif, fontSize: '1rem', color: tw.inkMid, marginBottom: '0.6rem' }}>{v.title}</div>
                <p style={{ fontFamily: mono, fontSize: '14px', lineHeight: 1.78, color: tw.inkSub, maxWidth: '600px' }}>{v.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ borderBottom: `1px solid ${tw.rule}` }}>
        <div style={{ padding: '4rem clamp(1.25rem,5vw,4rem) 2rem' }}>
          <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: tw.green, marginBottom: '1.5rem' }}>
            {a.team.label}
          </div>
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.6rem,3vw,2.5rem)', lineHeight: 1.15, color: tw.inkMid }} className="tw-ink">
            {a.team.h2_1}<br />{a.team.h2_2} {a.team.h2_em}
          </h2>
        </div>

        <div style={{ borderTop: `1px solid ${tw.rule}` }} className="team-cards-grid">
          {team.map((person) => (
            <div key={person.name} style={{ background: tw.white, borderRight: `1px solid ${tw.rule}`, padding: '3rem clamp(1.25rem,4vw,3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '2.5rem' }}>
              <div>
                <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: tw.green, marginBottom: '0.75rem' }}>
                  {lang === 'es' ? 'Desde ' : 'Since '}{person.since}
                </div>
                <h3 style={{ fontFamily: serif, fontSize: 'clamp(1.4rem,2.5vw,2rem)', lineHeight: 1.1, color: tw.inkMid, marginBottom: '0.5rem' }} className="tw-ink">
                  {person.name}
                </h3>
                <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: tw.inkFaint, marginBottom: '2rem' }}>
                  {person.role[lang]}
                </div>
                <p style={{ fontFamily: mono, fontSize: '14px', lineHeight: 1.85, color: tw.inkSub, marginBottom: '2rem' }}>
                  {person.bio[lang]}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {person.credentials.map((cred, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ color: tw.green, fontSize: '12px', marginTop: '3px', flexShrink: 0 }}>—</span>
                      <span style={{ fontFamily: mono, fontSize: '12px', color: tw.inkFaint, lineHeight: 1.5 }}>{cred}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ paddingTop: '1.5rem', borderTop: `1px solid ${tw.rule}` }}>
                <a href={person.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: tw.green, textDecoration: 'none' }}>
                  LinkedIn ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Join strip */}
        <div style={{ borderTop: `1px solid ${tw.rule}`, backgroundColor: tw.bg, backgroundImage: notebookBg, padding: '3rem clamp(1.25rem,5vw,4rem)' }}>
          <div style={{ display: 'grid', gap: '2rem', maxWidth: '700px' }} className="join-grid">
            <div>
              <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: tw.green, marginBottom: '0.75rem' }}>
                {a.team.joinLabel}
              </div>
              <p style={{ fontFamily: mono, fontSize: '14px', lineHeight: 1.78, color: tw.inkSub }}>{a.team.joinBody}</p>
            </div>
            <div>
              <a href="mailto:hola@wearebondy.com?subject=sumarse" style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: tw.green, textDecoration: 'none' }}>
                {a.team.joinCta} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: tw.white, padding: '5rem clamp(1.25rem,5vw,4rem)' }}>
        <div style={{ display: 'grid', gap: '3rem', alignItems: 'center', maxWidth: '900px' }} className="cta-grid">
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(2rem,4vw,3.5rem)', lineHeight: 1.1, color: tw.inkMid }} className="tw-ink">
            {a.cta.h2_1}<br />{a.cta.h2_2} {a.cta.h2_em}
          </h2>
          <div>
            <p style={{ fontFamily: mono, fontSize: '15px', lineHeight: 1.78, color: tw.inkSub, marginBottom: '2rem' }}>{a.cta.body}</p>
            <Link href={lk('/contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: tw.green, color: '#fff', fontFamily: mono, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '13px 32px', textDecoration: 'none' }}>
              {a.cta.cta} →
            </Link>
          </div>
        </div>
      </section>

      <Footer lang={lang} tr={tr.footer} />

      <style>{`
        .split-grid { display: grid; grid-template-columns: 1fr 1fr; }
        .team-cards-grid { display: grid; grid-template-columns: 1fr 1fr; }
        .cta-grid { grid-template-columns: 1fr 1fr; }
        .join-grid { grid-template-columns: 1fr auto; align-items: center; }
        @media (max-width: 768px) {
          .split-grid, .team-cards-grid, .cta-grid { grid-template-columns: 1fr !important; }
          .join-grid { grid-template-columns: 1fr !important; }
          .team-cards-grid > div { border-right: none !important; border-bottom: 1px solid #E8E4DE; }
        }
      `}</style>
    </main>
  )
}
