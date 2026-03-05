import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'

const team = [
  {
    name: 'Mara Schmitman',
    role: { en: 'Founder & Managing Director', es: 'Fundadora & Directora' },
    photo: '/team/mara.jpg',
    bio: {
      en: 'Mara founded Bondy in Buenos Aires in 2008 after a clear observation: technical recruiting was being done by people who didn\'t understand engineers. A licensed psychologist with a specialization in strategic HR management and a Master\'s in Technology Management, she brought a different approach — apply organizational psychology rigor to the search process. Define fit before looking for it. Interview deeply. Send fewer candidates, and better ones. After 16 years, that\'s still exactly what she does. She leads every strategic client relationship personally.',
      es: 'Mara fundó Bondy en Buenos Aires en 2008 a partir de una observación concreta: el reclutamiento técnico lo hacían personas que no entendían a los ingenieros. Psicóloga matriculada con especialización en gestión estratégica de RRHH y un Máster en Gestión Tecnológica, trajo un enfoque diferente: aplicar el rigor de la psicología organizacional al proceso de búsqueda. Definir el fit antes de ir a buscarlo. Entrevistar en profundidad. Mandar menos candidatos, y mejores. Dieciséis años después, sigue siendo exactamente eso lo que hace. Lidera personalmente cada relación estratégica con clientes.',
    },
    credentials: [
      'Lic. en Psicología, Universidad de la Cuenca del Plata',
      'Especialista en Gestión Estratégica de RRHH, UdeSA',
      'Máster en Gestión Tecnológica, ITBA–EOI',
      'Diploma en Cultural Awareness, MIT',
      'Top 95 HR Influencers en Latinoamérica · Go Integro (3 años consecutivos)',
    ],
    location: 'Buenos Aires, AR',
    since: '2008',
  },
  {
    name: 'Lucía Palomeque',
    role: { en: 'Head of Delivery', es: 'Head of Delivery' },
    photo: '/team/lucia.jpg',
    bio: {
      en: 'Lucía joined Bondy as a technical recruiter and became the operational core of the team. A psychologist by training with a specialization in IT selection, she brings a rare combination: deep understanding of candidate motivation and the process discipline to run parallel searches at scale without losing quality. She owns delivery — which at Bondy means owning the standard. If a shortlist leaves the building, Lucía has reviewed it.',
      es: 'Lucía se unió a Bondy como recruitera técnica y se convirtió en el núcleo operativo del equipo. Psicóloga de formación con especialización en selección IT, aporta una combinación poco frecuente: comprensión profunda de la motivación de los candidatos y la disciplina de proceso para manejar búsquedas paralelas a escala sin perder calidad. Es dueña del delivery — que en Bondy significa ser dueña del estándar. Si una terna sale del equipo, Lucía la revisó.',
    },
    credentials: [
      'Lic. en Psicología, Universidad de Buenos Aires (UBA)',
      'Especialista en Selección de Talento IT',
    ],
    location: 'Buenos Aires, AR',
    since: '2019',
  },
]

export default function AboutPage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  const tr = t(lang)
  const a = tr.about
  const lk = (href: string) => `/${lang}${href}`

  return (
    <main style={{ background: '#F0EBE3', minHeight: '100vh' }}>
      <Nav lang={lang} tr={tr.nav} />

      {/* Header */}
      <header style={{ paddingTop: '60px', background: '#FFFFFF', borderBottom: '1px solid #E8E4DE' }}>
        <div style={{ padding: '4.5rem clamp(1.25rem,5vw,4rem) 4rem', maxWidth: '860px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
            <div style={{ width: '22px', height: '1px', background: '#C06A2D', flexShrink: 0 }} />
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C06A2D' }}>
              {a.label}
            </span>
            <div style={{ width: '22px', height: '1px', background: 'rgba(192,106,45,0.4)', flexShrink: 0 }} />
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(44px,6vw,76px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#1A1A1A', marginBottom: '2rem' }}>
            {a.h1_1}<br />{a.h1_2} <em style={{ color: '#C06A2D', fontStyle: 'italic' }}>{a.h1_em}</em>
          </h1>
          <p style={{ fontSize: '17px', lineHeight: 1.78, fontWeight: 300, maxWidth: '600px', color: '#6B6966' }}>
            {a.intro}
          </p>
        </div>
      </header>

      {/* Origin */}
      <section style={{ borderBottom: '1px solid #E0DBD3' }}>
        <div style={{ display: 'grid', padding: '0' }} className="split-grid">
          <div style={{ padding: '4rem clamp(1.25rem,5vw,4rem)', borderRight: '1px solid #E0DBD3' }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C06A2D', marginBottom: '1.5rem' }}>
              {a.origin.label}
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(28px,3vw,42px)', fontWeight: 900, lineHeight: 1.2, letterSpacing: '-0.01em', color: '#1A1A1A' }}>
              {a.origin.h2.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
            </h2>
          </div>
          <div style={{ padding: '4rem clamp(1.25rem,5vw,4rem)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[a.origin.p1, a.origin.p2, a.origin.p3, a.origin.p4].map((p, i) => (
              <p key={i} style={{ fontSize: '15px', lineHeight: 1.8, fontWeight: 300, color: '#6B6966' }}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: '#FFFFFF', borderBottom: '1px solid #E0DBD3' }}>
        <div style={{ padding: '4rem clamp(1.25rem,5vw,4rem) 1.5rem' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C06A2D', marginBottom: '1rem' }}>
            {a.values.label}
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(26px,3vw,40px)', fontWeight: 900, lineHeight: 1.2, letterSpacing: '-0.01em', color: '#1A1A1A', marginBottom: '3rem' }}>
            {a.values.h2}
          </h2>
        </div>
        <div style={{ borderTop: '1px solid #E8E4DE' }}>
          {a.values.items.map((v) => (
            <div key={v.n} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '2rem', padding: '2rem clamp(1.25rem,5vw,4rem)', borderBottom: '1px solid #F0EBE3' }}>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#C06A2D', letterSpacing: '0.1em', paddingTop: '3px' }}>{v.n}</span>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#1A1A1A', marginBottom: '0.6rem' }}>{v.title}</div>
                <p style={{ fontSize: '14px', lineHeight: 1.78, fontWeight: 300, color: '#6B6966', maxWidth: '600px' }}>{v.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ borderBottom: '1px solid #E0DBD3' }}>
        <div style={{ padding: '4rem clamp(1.25rem,5vw,4rem) 2rem' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C06A2D', marginBottom: '1.5rem' }}>
            {a.team.label}
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.01em', color: '#1A1A1A' }}>
            {a.team.h2_1}<br />{a.team.h2_2} <em style={{ color: '#C06A2D', fontStyle: 'italic' }}>{a.team.h2_em}</em>
          </h2>
        </div>

        {team.map((person, idx) => (
          <div key={person.name} style={{ borderTop: '1px solid #E0DBD3' }}>
            <div style={{ display: 'grid' }} className="team-grid">
              {/* Photo — alternates side on desktop */}
              <div style={{ position: 'relative', minHeight: '520px', background: '#E8E2DA', overflow: 'hidden' }} className={idx % 2 !== 0 ? 'team-photo-right' : ''}>
                <Image src={person.photo} alt={person.name} fill style={{ objectFit: 'cover', objectPosition: 'top center' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,12,10,0.55) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem' }}>
                  <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '22px', fontWeight: 700, color: '#F4F2EE', lineHeight: 1.2 }}>{person.name}</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(244,242,238,0.6)', marginTop: '6px' }}>
                    {person.role[lang]}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div style={{ padding: '3rem clamp(1.25rem,4vw,3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#FFFFFF' }}>
                <div>
                  <p style={{ fontSize: '15px', lineHeight: 1.85, fontWeight: 300, color: '#5A5754', marginBottom: '2.5rem' }}>
                    {person.bio[lang]}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                    {person.credentials.map((cred, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{ color: '#C06A2D', fontSize: '12px', marginTop: '3px', flexShrink: 0 }}>—</span>
                        <span style={{ fontSize: '13px', fontWeight: 300, color: '#7A7775', lineHeight: 1.5 }}>{cred}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #EBE7E1' }}>
                  <div>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8C4BE', marginBottom: '4px' }}>{a.team.since}</div>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '13px', color: '#8A8785' }}>{person.since}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8C4BE', marginBottom: '4px' }}>Location</div>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '13px', color: '#8A8785' }}>{person.location}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Join the team */}
        <div style={{ borderTop: '1px solid #E0DBD3', background: '#F8F4EF', padding: '3rem clamp(1.25rem,5vw,4rem)' }}>
          <div style={{ display: 'grid', gap: '2rem', maxWidth: '700px' }} className="join-grid">
            <div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C06A2D', marginBottom: '0.75rem' }}>
                {a.team.joinLabel}
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.78, fontWeight: 300, color: '#6B6966' }}>{a.team.joinBody}</p>
            </div>
            <div>
              <a href="mailto:hola@wearebondy.com?subject=sumarse" style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C06A2D', textDecoration: 'none', borderBottom: '1px solid rgba(192,106,45,0.35)', paddingBottom: '2px' }}>
                {a.team.joinCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#1A1A1A', padding: '5rem clamp(1.25rem,5vw,4rem)' }}>
        <div style={{ display: 'grid', gap: '3rem', alignItems: 'center', maxWidth: '900px' }} className="cta-grid">
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(32px,4vw,54px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.01em', color: '#F4F2EE' }}>
            {a.cta.h2_1}<br />{a.cta.h2_2} <em style={{ color: '#C06A2D', fontStyle: 'italic' }}>{a.cta.h2_em}</em>
          </h2>
          <div>
            <p style={{ fontSize: '15px', lineHeight: 1.78, fontWeight: 300, color: 'rgba(255,255,255,0.5)', marginBottom: '2rem' }}>{a.cta.body}</p>
            <Link href={lk('/contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#C06A2D', color: '#0E0E0E', fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '14px 32px', textDecoration: 'none', fontWeight: 500 }}>
              {a.cta.cta}
            </Link>
          </div>
        </div>
      </section>

      <Footer lang={lang} tr={tr.footer} />

      <style>{`
        .split-grid { grid-template-columns: 1fr 1fr; }
        .team-grid { grid-template-columns: 1fr 1fr; }
        .cta-grid { grid-template-columns: 1fr 1fr; }
        .join-grid { grid-template-columns: 1fr auto; align-items: center; }
        .team-photo-right { order: 2; }
        @media (max-width: 768px) {
          .split-grid, .team-grid, .cta-grid { grid-template-columns: 1fr !important; }
          .join-grid { grid-template-columns: 1fr !important; }
          .team-photo-right { order: 0 !important; }
        }
      `}</style>
    </main>
  )
}
