'use client'

import Link from 'next/link'
import { useState } from 'react'
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

export default function Nav({ lang, tr }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

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

  const navLinks = [
    { href: '/method',   label: tr.method   },
    { href: '/services', label: tr.services },
    { href: '/work',     label: tr.work     },
    { href: '/roles',    label: tr.roles    },
    { href: '/thinking', label: tr.thinking },
    { href: '/about',    label: tr.about    },
    { href: '/practice', label: tr.practice },
  ]

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
            fontFamily: "'Special Elite', Georgia, serif",
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
          style={{ alignItems: 'center', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}
        >
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={lk(href)}
                style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
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

          {/* Lang toggle */}
          <li style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
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
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
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
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: '11px',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: '#4A8C40',
              }}
            >
              {tr.cta} →
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
          }}
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={lk(href)}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
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
          <button
            onClick={() => { switchLang(); setMenuOpen(false) }}
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
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
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: '14px',
              letterSpacing: '0.04em',
              textDecoration: 'none',
              color: '#4A8C40',
              padding: '1rem clamp(1.25rem,5vw,4rem)',
              display: 'block',
            }}
          >
            {tr.cta} →
          </Link>
        </div>
      )}
    </nav>
  )
}
