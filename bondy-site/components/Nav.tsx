'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { Lang, Translations } from '@/lib/i18n/translations'

type NavProps = {
  lang: Lang
  tr: Translations['nav']
}

export default function Nav({ lang, tr }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const otherLang: Lang = lang === 'en' ? 'es' : 'en'

  // Switch language: replace /en/ with /es/ or vice versa
  const switchLang = () => {
    // Set cookie so middleware remembers preference
    document.cookie = `lang=${otherLang};path=/;max-age=31536000`
    const newPath = pathname.replace(`/${lang}`, `/${otherLang}`)
    router.push(newPath)
  }

  // Path helper — strips lang prefix for comparison
  const isActive = (href: string) => {
    const cleanPath = pathname.replace(`/${lang}`, '') || '/'
    return cleanPath === href || cleanPath.startsWith(href + '/')
  }

  // Link helper — adds lang prefix
  const lk = (href: string) => `/${lang}${href}`

  const navLinks = [
    { href: '/method',    label: tr.method },
    { href: '/services',  label: tr.services },
    { href: '/work',      label: tr.work },
    { href: '/about',     label: tr.about },
    { href: '/thinking',  label: tr.thinking },
    { href: '/jobs',      label: tr.jobs },
    { href: '/practice',  label: tr.practice },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(14,14,14,0.97)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ padding: '0 clamp(1.25rem,5vw,4rem)', height: '60px' }}
      >
        {/* Logo */}
        <Link href={lk('/')} className="flex items-center shrink-0" style={{ textDecoration: 'none' }}>
          <span style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: '20px',
            fontWeight: 900,
            color: '#F4F2EE',
            letterSpacing: '-0.02em',
          }}>
            Bond<em style={{ fontStyle: 'italic', color: '#C06A2D' }}>y</em><span style={{ color: '#C06A2D' }}>.</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center" style={{ gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={lk(href)}
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '10px',
                  letterSpacing: '0.13em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: isActive(href) ? '#F4F2EE' : 'rgba(255,255,255,0.4)',
                  transition: 'color 0.18s',
                }}
              >
                {label}
              </Link>
            </li>
          ))}

          {/* Lang toggle */}
          <li style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.13em', textTransform: 'uppercase', color: '#F4F2EE' }}>
              {lang.toUpperCase()}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: '9px', margin: '0 2px' }}>/</span>
            <button
              onClick={switchLang}
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '10px',
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.35)',
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
                fontFamily: 'DM Mono, monospace',
                fontSize: '10px',
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: '#C06A2D',
                borderBottom: '1px solid rgba(192,106,45,0.35)',
                paddingBottom: '2px',
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
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', padding: 0 }}
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
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: '#0E0E0E' }}
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={lk(href)}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '11px',
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: isActive(href) ? '#F4F2EE' : 'rgba(255,255,255,0.45)',
                padding: '1rem clamp(1.25rem,5vw,4rem)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {label}
            </Link>
          ))}
          {/* Mobile lang switch */}
          <button
            onClick={() => { switchLang(); setMenuOpen(false) }}
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '11px',
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.35)',
              padding: '1rem clamp(1.25rem,5vw,4rem)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              textAlign: 'left',
            }}
          >
            → {otherLang.toUpperCase()}
          </button>
          <Link
            href={lk('/contact')}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '11px',
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: '#C06A2D',
              padding: '1rem clamp(1.25rem,5vw,4rem)',
            }}
          >
            {tr.cta}
          </Link>
        </div>
      )}
    </nav>
  )
}
