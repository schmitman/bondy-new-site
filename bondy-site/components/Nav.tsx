'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { Lang, Translations } from '@/lib/i18n/translations'

type NavProps = {
  lang: Lang
  tr: Translations['nav']
}

/* ── Logo SVG — 4 asientos (Brand v4) ── */
function BondyLogo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="4"  y="5"  width="14" height="12" rx="2.5" fill="#1A1A1A" />
      <rect x="22" y="5"  width="14" height="12" rx="2.5" fill="#1A1A1A" opacity=".18" />
      <rect x="4"  y="22" width="14" height="12" rx="2.5" fill="#1A1A1A" opacity=".42" />
      <rect x="22" y="22" width="14" height="12" rx="2.5" fill="#4A8C40" />
    </svg>
  )
}

/* ── Notebook background CSS ── */
const notebookBg = [
  'linear-gradient(90deg, transparent 68px, rgba(210,100,80,0.10) 68px, rgba(210,100,80,0.10) 69.5px, transparent 69.5px)',
  'repeating-linear-gradient(180deg, transparent 0px, transparent 31px, rgba(100,140,200,0.09) 31px, rgba(100,140,200,0.09) 32px)',
].join(',')

const mono = "'Plus Jakarta Sans', system-ui, sans-serif"
const serif = "'Special Elite', Georgia, serif"

export default function Nav({ lang, tr }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const resourcesRef = useRef<HTMLLIElement>(null)

  const otherLang: Lang = lang === 'en' ? 'es' : 'en'

  const switchLang = () => {
    document.cookie = `lang=${otherLang};path=/;max-age=31536000`
    const newPath = pathname.replace(`/${lang}`, `/${otherLang}`)
    router.push(newPath)
  }

  const isActive = (href: string) => {
    const cleanPath = pathname.replace(`/${lang}`, '') || '/'
    return cleanPath === href || cleanPath.startsWith(href + '/')
  }

  const lk = (href: string) => `/${lang}${href}`

  // Cerrar dropdown con click outside o Esc
  useEffect(() => {
    if (!resourcesOpen) return
    const onClick = (e: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false)
      }
    }
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setResourcesOpen(false) }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onEsc)
    }
  }, [resourcesOpen])

  const navLinks = [
    { href: '/method',   label: tr.method   },
    { href: '/services', label: tr.services },
    { href: '/work',     label: tr.work     },
    { href: '/about',    label: tr.about    },
  ]

  const rm = tr.resourcesMenu
  const resourceItems = rm ? [
    { title: rm.candidatesTitle, desc: rm.candidatesDesc, href: rm.candidatesHref, external: false, badge: null },
    { title: rm.recruitersTitle, desc: rm.recruitersDesc, href: rm.recruitersHref, external: false, badge: null },
    { title: rm.hiringTitle,     desc: rm.hiringDesc,     href: rm.hiringHref,     external: false, badge: null },
    { title: rm.teamTitle,       desc: rm.teamDesc,       href: rm.teamHref,       external: false, badge: null },
  ] : []

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: '60px',
        backgroundColor: 'rgba(254,252,249,0.97)',
        backgroundImage: notebookBg,
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #E8E4DE',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          padding: '0 clamp(1.25rem,5vw,4rem)',
        }}
      >
        {/* Wordmark */}
        <Link
          href={lk('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none' }}
        >
          <BondyLogo size={22} />
          <span style={{
            fontFamily: serif,
            fontSize: '17px',
            color: '#1A1A1A',
            letterSpacing: '0.04em',
          }}>
            BONDY
          </span>
        </Link>

        {/* Desktop links */}
        <ul
          className="hidden md:flex"
          style={{ alignItems: 'center', gap: '1.75rem', listStyle: 'none', margin: 0, padding: 0 }}
        >
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={lk(href)}
                style={{
                  fontFamily: mono,
                  fontSize: '14px',
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  color: isActive(href) ? '#1A1A1A' : '#7A7874',
                  transition: 'color 0.18s',
                }}
              >
                {label}
              </Link>
            </li>
          ))}

          {/* We're hiring — top-level con dot pulsante */}
          {tr.weAreHiring && (
            <li>
              <Link
                href={lk('/roles')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: mono,
                  fontSize: '14px',
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  color: isActive('/roles') ? '#1A1A1A' : '#1A1A1A',
                  transition: 'color 0.18s',
                }}
              >
                <span style={{ position: 'relative', display: 'inline-flex', width: '8px', height: '8px' }}>
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      background: '#4A8C40',
                      animation: 'bondyPulseRing 1.8s ease-out infinite',
                      opacity: 0.6,
                    }}
                  />
                  <span
                    style={{
                      position: 'relative',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#4A8C40',
                    }}
                  />
                </span>
                {tr.weAreHiring}
              </Link>
            </li>
          )}

          {/* Resources dropdown */}
          {rm && (
            <li ref={resourcesRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                onMouseEnter={() => setResourcesOpen(true)}
                aria-expanded={resourcesOpen}
                aria-haspopup="true"
                style={{
                  fontFamily: mono,
                  fontSize: '14px',
                  letterSpacing: '0.04em',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: resourcesOpen ? '#1A1A1A' : '#7A7874',
                  padding: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'color 0.18s',
                }}
              >
                {tr.resources}
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: resourcesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.18s' }}>
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {resourcesOpen && (
                <div
                  onMouseLeave={() => setResourcesOpen(false)}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 14px)',
                    right: 0,
                    width: '480px',
                    background: '#FEFCF9',
                    border: '1px solid #E8E4DE',
                    boxShadow: '0 8px 32px rgba(26,26,26,0.08)',
                    padding: '0.5rem',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '2px',
                  }}
                >
                  {resourceItems.map((item) => {
                    const content = (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{
                            fontFamily: serif,
                            fontSize: '13px',
                            color: '#1A1A1A',
                            letterSpacing: '0.02em',
                          }}>
                            {item.title}
                          </span>
                          {item.badge && (
                            <span style={{
                              fontFamily: mono,
                              fontSize: '8px',
                              letterSpacing: '0.18em',
                              color: '#4A8C40',
                              background: 'rgba(74,140,64,0.08)',
                              padding: '2px 6px',
                              borderRadius: '2px',
                            }}>
                              {item.badge}
                            </span>
                          )}
                          {item.external && (
                            <span style={{ fontSize: '10px', color: '#7A7874' }}>↗</span>
                          )}
                        </div>
                        <div style={{
                          fontFamily: mono,
                          fontSize: '11px',
                          lineHeight: 1.5,
                          color: '#7A7874',
                        }}>
                          {item.desc}
                        </div>
                      </>
                    )
                    const cellStyle: React.CSSProperties = {
                      display: 'block',
                      padding: '14px 16px',
                      textDecoration: 'none',
                      borderRadius: '2px',
                      transition: 'background 0.15s',
                    }
                    return item.external ? (
                      <a
                        key={item.title}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={cellStyle}
                        onClick={() => setResourcesOpen(false)}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(74,140,64,0.06)' }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                      >
                        {content}
                      </a>
                    ) : (
                      <Link
                        key={item.title}
                        href={item.href}
                        style={cellStyle}
                        onClick={() => setResourcesOpen(false)}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(74,140,64,0.06)' }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                      >
                        {content}
                      </Link>
                    )
                  })}
                </div>
              )}
            </li>
          )}

          {/* Lang toggle */}
          <li style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{
              fontFamily: mono,
              fontSize: '11px',
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              color: '#1A1A1A',
            }}>
              {lang.toUpperCase()}
            </span>
            <span style={{ color: '#E8E4DE', fontSize: '9px', margin: '0 2px' }}>/</span>
            <button
              onClick={switchLang}
              style={{
                fontFamily: mono,
                fontSize: '11px',
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#7A7874',
                padding: 0,
                transition: 'color 0.18s',
              }}
            >
              {otherLang.toUpperCase()}
            </button>
          </li>

          <li>
            <Link
              href={lk('/contact')}
              style={{
                fontFamily: mono,
                fontSize: '11px',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: '#4A8C40',
              }}
            >
              {tr.cta}
            </Link>
          </li>
        </ul>

        {/* Mobile burger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5A5550', padding: 0 }}
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            {menuOpen ? (
              <path d="M1 1L19 13M19 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            ) : (
              <>
                <rect width="20" height="1.5" rx=".75" fill="currentColor"/>
                <rect y="6.25" width="20" height="1.5" rx=".75" fill="currentColor"/>
                <rect y="12.5" width="20" height="1.5" rx=".75" fill="currentColor"/>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden flex flex-col"
          style={{
            borderTop: '1px solid #E8E4DE',
            backgroundColor: '#FEFCF9',
            backgroundImage: notebookBg,
            maxHeight: 'calc(100vh - 60px)',
            overflowY: 'auto',
          }}
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={lk(href)}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: mono,
                fontSize: '14px',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                color: isActive(href) ? '#1A1A1A' : '#7A7874',
                padding: '1rem clamp(1.25rem,5vw,4rem)',
                borderBottom: '1px solid #E8E4DE',
                display: 'block',
              }}
            >
              {label}
            </Link>
          ))}

          {/* Mobile: We're hiring */}
          {tr.weAreHiring && (
            <Link
              href={lk('/roles')}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: mono,
                fontSize: '14px',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                color: '#1A1A1A',
                padding: '1rem clamp(1.25rem,5vw,4rem)',
                borderBottom: '1px solid #E8E4DE',
              }}
            >
              <span style={{ position: 'relative', display: 'inline-flex', width: '8px', height: '8px' }}>
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: '#4A8C40',
                    animation: 'bondyPulseRing 1.8s ease-out infinite',
                    opacity: 0.6,
                  }}
                />
                <span style={{ position: 'relative', width: '8px', height: '8px', borderRadius: '50%', background: '#4A8C40' }} />
              </span>
              {tr.weAreHiring}
            </Link>
          )}

          {/* Mobile resources section — expanded inline */}
          {rm && (
            <div style={{ borderBottom: '1px solid #E8E4DE' }}>
              <div style={{
                fontFamily: mono,
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#4A8C40',
                padding: '1rem clamp(1.25rem,5vw,4rem) 0.5rem',
              }}>
                {tr.resources}
              </div>
              {resourceItems.map((item) => {
                const cellStyle: React.CSSProperties = {
                  display: 'block',
                  padding: '0.75rem clamp(1.25rem,5vw,4rem) 1rem',
                  textDecoration: 'none',
                }
                const inner = (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span style={{ fontFamily: serif, fontSize: '14px', color: '#1A1A1A', letterSpacing: '0.02em' }}>
                        {item.title}
                      </span>
                      {item.badge && (
                        <span style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.18em', color: '#4A8C40', background: 'rgba(74,140,64,0.08)', padding: '2px 6px', borderRadius: '2px' }}>
                          {item.badge}
                        </span>
                      )}
                      {item.external && <span style={{ fontSize: '10px', color: '#7A7874' }}>↗</span>}
                    </div>
                    <div style={{ fontFamily: mono, fontSize: '12px', lineHeight: 1.5, color: '#7A7874' }}>
                      {item.desc}
                    </div>
                  </>
                )
                return item.external ? (
                  <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" style={cellStyle} onClick={() => setMenuOpen(false)}>{inner}</a>
                ) : (
                  <Link key={item.title} href={item.href} style={cellStyle} onClick={() => setMenuOpen(false)}>{inner}</Link>
                )
              })}
            </div>
          )}

          <button
            onClick={() => { switchLang(); setMenuOpen(false) }}
            style={{
              fontFamily: mono,
              fontSize: '14px',
              letterSpacing: '0.04em',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#7A7874',
              padding: '1rem clamp(1.25rem,5vw,4rem)',
              borderBottom: '1px solid #E8E4DE',
              textAlign: 'left',
            }}
          >
            → {otherLang.toUpperCase()}
          </button>
          <Link
            href={lk('/contact')}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: mono,
              fontSize: '14px',
              letterSpacing: '0.04em',
              textDecoration: 'none',
              color: '#4A8C40',
              padding: '1rem clamp(1.25rem,5vw,4rem)',
              display: 'block',
            }}
          >
            {tr.cta}
          </Link>
        </div>
      )}
    </nav>
  )
}
