import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'
import { listPublishedRoles, publicClientLabel, formatSalary, type Role } from '@/lib/roles'

export const revalidate = 60

/* ── Typewriter tokens ── */
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

export async function generateMetadata({ params }: { params: { lang: Lang } }): Promise<Metadata> {
  const tr = t(params.lang)
  const baseUrl = 'https://wearebondy.com'
  return {
    title: tr.roles.meta.title,
    description: tr.roles.meta.description,
    alternates: {
      canonical: `${baseUrl}/${params.lang}/roles`,
      languages: {
        en: `${baseUrl}/en/roles`,
        es: `${baseUrl}/es/roles`,
      },
    },
    openGraph: {
      title: tr.roles.meta.title,
      description: tr.roles.meta.description,
      url: `${baseUrl}/${params.lang}/roles`,
      type: 'website',
    },
  }
}

export default async function RolesListPage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  const tr = t(lang)
  const roles = await listPublishedRoles()
  const count = roles.length

  return (
    <main style={{ background: tw.bg, minHeight: '100vh', backgroundImage: notebookBg }}>
      <Nav lang={lang} tr={tr.nav} />

      {/* ── HERO ── */}
      <section
        style={{
          padding: 'clamp(3.5rem,9vw,6rem) clamp(1.25rem,5vw,4rem) clamp(2rem,5vw,3.5rem)',
          maxWidth: '1200px',
          margin: '0 auto',
          borderBottom: `1px solid ${tw.rule}`,
        }}
      >
        <div
          style={{
            fontFamily: mono,
            fontSize: '11px',
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            color: tw.green,
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ width: '22px', height: '1px', background: tw.green }} />
          {tr.roles.list.kicker}
        </div>
        <h1
          style={{
            fontFamily: serif,
            fontSize: 'clamp(2.8rem,7vw,5rem)',
            lineHeight: '1',
            color: tw.inkMid,
            margin: 0,
            opacity: 0.92,
            textShadow: '.5px .5px 0 rgba(0,0,0,.12)',
          }}
        >
          {tr.roles.list.h1a}
          <br />
          {tr.roles.list.h1b}
        </h1>
        <p
          style={{
            fontFamily: mono,
            fontSize: '15px',
            lineHeight: '1.7',
            color: tw.inkFaint,
            maxWidth: '560px',
            marginTop: '1.6rem',
          }}
        >
          {tr.roles.list.intro}
        </p>
        {count > 0 && (
          <p
            style={{
              fontFamily: mono,
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: tw.inkFaint,
              marginTop: '2rem',
            }}
          >
            {count} {count === 1 ? tr.roles.list.countOne : tr.roles.list.countMany}
          </p>
        )}
      </section>

      {/* ── LISTA ── */}
      <section
        style={{
          padding: 'clamp(2rem,5vw,3.5rem) clamp(1.25rem,5vw,4rem) clamp(4rem,8vw,6rem)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {count === 0 ? (
          <div
            style={{
              background: tw.white,
              border: `1px solid ${tw.rule}`,
              padding: '3rem 2rem',
              textAlign: 'center',
              fontFamily: mono,
              fontSize: '14px',
              color: tw.inkSub,
              lineHeight: 1.7,
            }}
          >
            {tr.roles.list.empty}
          </div>
        ) : (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '0' }}>
            {roles.map((role, idx) => (
              <RoleRow key={role.id} role={role} lang={lang} tr={tr} isFirst={idx === 0} />
            ))}
          </ul>
        )}
      </section>

      <Footer lang={lang} tr={tr.footer} />
    </main>
  )
}

/* ── Fila de rol (server) ── */
function RoleRow({
  role,
  lang,
  tr,
  isFirst,
}: {
  role: Role
  lang: Lang
  tr: ReturnType<typeof t>
  isFirst: boolean
}) {
  const clientLabel = publicClientLabel(role, lang)
  const salary = formatSalary(role, lang)

  const metaItems: string[] = []
  if (role.seniority) metaItems.push(role.seniority)
  if (role.role_category) metaItems.push(role.role_category)
  if (role.modality) metaItems.push(role.modality)
  if (role.location) metaItems.push(role.location)

  return (
    <li
      style={{
        borderTop: isFirst ? `1px solid ${tw.rule}` : 'none',
        borderBottom: `1px solid ${tw.rule}`,
        background: role.is_featured ? 'rgba(74,140,64,0.04)' : 'transparent',
      }}
    >
      <Link
        href={`/${lang}/roles/${role.slug}`}
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) auto',
          gap: '1.5rem',
          padding: 'clamp(1.25rem,3vw,2rem) clamp(0.5rem,2vw,1.5rem)',
          textDecoration: 'none',
          color: 'inherit',
          alignItems: 'center',
        }}
      >
        <div style={{ minWidth: 0 }}>
          {/* Top line: client + featured */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '0.5rem',
            }}
          >
            <span
              style={{
                fontFamily: mono,
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: tw.green,
              }}
            >
              {clientLabel}
            </span>
            {role.is_featured && (
              <span
                style={{
                  fontFamily: mono,
                  fontSize: '9px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: tw.green,
                  border: `1px solid ${tw.green}`,
                  padding: '2px 8px',
                }}
              >
                {tr.roles.list.featured}
              </span>
            )}
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: serif,
              fontSize: 'clamp(1.35rem,2.6vw,1.75rem)',
              lineHeight: 1.15,
              color: tw.inkMid,
              margin: 0,
              opacity: 0.95,
            }}
          >
            {role.title}
          </h2>

          {/* Meta row */}
          {metaItems.length > 0 && (
            <div
              style={{
                fontFamily: mono,
                fontSize: '12px',
                color: tw.inkFaint,
                marginTop: '0.6rem',
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap',
              }}
            >
              {metaItems.map((m, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
                  {m}
                  {i < metaItems.length - 1 && <span style={{ color: tw.rule }}>·</span>}
                </span>
              ))}
            </div>
          )}

          {/* Stack chips */}
          {role.tech_stack && role.tech_stack.length > 0 && (
            <div
              style={{
                display: 'flex',
                gap: '0.4rem',
                flexWrap: 'wrap',
                marginTop: '0.8rem',
              }}
            >
              {role.tech_stack.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: mono,
                    fontSize: '10px',
                    letterSpacing: '0.04em',
                    color: tw.inkSub,
                    border: `1px solid ${tw.rule}`,
                    background: tw.white,
                    padding: '3px 8px',
                  }}
                >
                  {tech}
                </span>
              ))}
              {role.tech_stack.length > 6 && (
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: '10px',
                    color: tw.inkFaint,
                    padding: '3px 8px',
                  }}
                >
                  +{role.tech_stack.length - 6}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right column: salary + CTA */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '0.5rem',
            flexShrink: 0,
            textAlign: 'right',
          }}
        >
          {salary && (
            <span
              style={{
                fontFamily: mono,
                fontSize: '12px',
                color: tw.inkSub,
                fontWeight: 500,
              }}
            >
              {salary}
            </span>
          )}
          <span
            style={{
              fontFamily: mono,
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: tw.green,
            }}
          >
            {tr.roles.list.apply}
          </span>
        </div>
      </Link>
    </li>
  )
}
