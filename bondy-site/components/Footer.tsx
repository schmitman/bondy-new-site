import Link from 'next/link'
import type { Lang, Translations } from '@/lib/i18n/translations'

type FooterProps = {
  lang: Lang
  tr: Translations['footer']
}

/* ── Logo SVG — 4 asientos (Brand v4) ── */
function BondyLogo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="4"  y="5"  width="14" height="12" rx="2.5" fill="#1A1A1A" />
      <rect x="22" y="5"  width="14" height="12" rx="2.5" fill="#1A1A1A" opacity=".18" />
      <rect x="4"  y="22" width="14" height="12" rx="2.5" fill="#1A1A1A" opacity=".42" />
      <rect x="22" y="22" width="14" height="12" rx="2.5" fill="#4A8C40" />
    </svg>
  )
}

const notebookBg = [
  'linear-gradient(90deg, transparent 68px, rgba(210,100,80,0.10) 68px, rgba(210,100,80,0.10) 69.5px, transparent 69.5px)',
  'repeating-linear-gradient(180deg, transparent 0px, transparent 31px, rgba(100,140,200,0.09) 31px, rgba(100,140,200,0.09) 32px)',
].join(',')

export default function Footer({ lang, tr }: FooterProps) {
  const lk = (href: string) => `/${lang}${href}`

  return (
    <footer
      style={{
        backgroundColor: '#FEFCF9',
        backgroundImage: notebookBg,
        borderTop: '1px solid #E8E4DE',
      }}
    >
      <div
        style={{
          padding: '4rem clamp(1.25rem,5vw,4rem) 3rem',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '3rem',
        }}
      >
        {/* Brand */}
        <div style={{ gridColumn: 'span 2' }}>
          <Link href={lk('/')} style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none', marginBottom: '1rem' }}>
            <BondyLogo size={24} />
            <span style={{
              fontFamily: "'Special Elite', Georgia, serif",
              fontSize: '18px',
              color: '#1A1A1A',
              letterSpacing: '0.04em',
            }}>
              BONDY
            </span>
          </Link>
          <p style={{
            fontFamily: "'Courier Prime', Courier, monospace",
            fontSize: '9px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#7A7874',
            marginBottom: '1rem',
          }}>
            The standard for technical hiring since 2008
          </p>
          <p style={{
            fontFamily: "'Courier Prime', Courier, monospace",
            fontSize: '13px',
            color: '#7A7874',
            lineHeight: 1.7,
            maxWidth: '200px',
          }}>
            {tr.tagline}
          </p>
        </div>

        {/* Company */}
        <div>
          <div style={{
            fontFamily: "'Courier Prime', Courier, monospace",
            fontSize: '9px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#4A8C40',
            marginBottom: '1.25rem',
          }}>
            {tr.colCompany}
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { href: '/method',   label: tr.links.method   },
              { href: '/work',     label: tr.links.work     },
              { href: '/about',    label: tr.links.about    },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={lk(href)} style={{
                  fontFamily: "'Courier Prime', Courier, monospace",
                  fontSize: '13px',
                  color: '#5A5550',
                  textDecoration: 'none',
                  transition: 'color 0.18s',
                }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <div style={{
            fontFamily: "'Courier Prime', Courier, monospace",
            fontSize: '9px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#4A8C40',
            marginBottom: '1.25rem',
          }}>
            {tr.colServices}
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { href: '/services#hunting',  label: tr.links.hunting  },
              { href: '/services#pipeline', label: tr.links.pipeline },
              { href: '/services#rpo',      label: tr.links.embedded },
              { href: '/referrals',         label: tr.links.referrals },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={lk(href)} style={{
                  fontFamily: "'Courier Prime', Courier, monospace",
                  fontSize: '13px',
                  color: '#5A5550',
                  textDecoration: 'none',
                  transition: 'color 0.18s',
                }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div style={{
            fontFamily: "'Courier Prime', Courier, monospace",
            fontSize: '9px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#4A8C40',
            marginBottom: '1.25rem',
          }}>
            Get in touch
          </div>
          <a
            href="mailto:hello@wearebondy.com"
            style={{
              fontFamily: "'Courier Prime', Courier, monospace",
              fontSize: '13px',
              color: '#4A8C40',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '0.75rem',
            }}
          >
            hello@wearebondy.com
          </a>
          <a
            href="https://www.linkedin.com/company/bondygroup"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Courier Prime', Courier, monospace",
              fontSize: '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#7A7874',
              textDecoration: 'none',
            }}
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid #E8E4DE',
        padding: '1.25rem clamp(1.25rem,5vw,4rem)',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{
          fontFamily: "'Courier Prime', Courier, monospace",
          fontSize: '12px',
          color: '#7A7874',
        }}>
          © {new Date().getFullYear()} {tr.copyright}
        </span>
        <span style={{
          fontFamily: "'Courier Prime', Courier, monospace",
          fontSize: '12px',
          color: '#7A7874',
        }}>
          Buenos Aires · Global
        </span>
      </div>
    </footer>
  )
}
