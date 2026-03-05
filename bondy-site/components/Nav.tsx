'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/method',   label: 'Method' },
  { href: '/services', label: 'Services' },
  { href: '/work',     label: 'Work' },
  { href: '/about',    label: 'About' },
  { href: '/thinking', label: 'Thinking' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

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
        <Link href="/" className="flex items-center gap-2.5 shrink-0" style={{ textDecoration: 'none' }}>
          <svg width="26" height="26" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M98 108 L265 108 Q366 108 366 209 Q366 310 265 310 L98 310 Z" fill="#FAAF40"/>
            <path d="M175 210 L341 210 Q440 210 440 309 Q440 408 341 408 L241 408 Q175 408 175 342 Z" fill="#FAAF40"/>
            <clipPath id="nav-clip">
              <path d="M98 108 L265 108 Q366 108 366 209 Q366 310 265 310 L98 310 Z"/>
            </clipPath>
            <g clipPath="url(#nav-clip)">
              <path d="M175 210 L341 210 Q440 210 440 309 Q440 408 341 408 L241 408 Q175 408 175 342 Z" fill="#F27122"/>
            </g>
            <circle cx="130" cy="370" r="28" fill="#404041"/>
          </svg>
          <span
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: '17px',
              fontWeight: 900,
              color: '#F4F2EE',
              letterSpacing: '-0.02em',
            }}
          >
            Bond<em style={{ fontStyle: 'italic', color: '#C06A2D' }}>y</em>.
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center" style={{ gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
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
          <li>
            <Link
              href="/contact"
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '10px',
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: '#C06A2D',
                borderBottom: '1px solid rgba(192,106,45,0.35)',
                paddingBottom: '2px',
                transition: 'border-color 0.18s',
              }}
            >
              Work with us →
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
              href={href}
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
          <Link
            href="/contact"
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
            Work with us →
          </Link>
        </div>
      )}
    </nav>
  )
}
