'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

// Pages that use dark background
const DARK_PAGES = ['/', '/services', '/contact', '/jobs', '/referrals']

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const isDark = DARK_PAGES.includes(pathname)

  const navBg    = isDark ? 'bg-[#111111]/90 border-white/10'  : 'bg-[#F0EBE3]/90 border-[#E8E2DA]'
  const textMid  = isDark ? 'text-[#888885]'                   : 'text-[#888885]'
  const textOff  = isDark ? 'text-[#F9F8F6]'                   : 'text-[#1A1A1A]'
  const hoverOff = isDark ? 'hover:text-[#F9F8F6]'             : 'hover:text-[#1A1A1A]'
  const ctaColor = 'text-[#C06A2D] border-[#C06A2D]/40 hover:border-[#C06A2D]'
  const logoFill = isDark ? '#F9F8F6' : '#1A1A1A'
  const mobileBg = isDark ? 'bg-[#111111]' : 'bg-[#F0EBE3]'
  const mobileBorder = isDark ? 'border-white/10' : 'border-[#E8E2DA]'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-sm ${navBg}`}>
      <div className="flex items-center justify-between px-8 md:px-16 py-5">

        {/* Logo — wordmark only, italic Y */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className={`font-display text-xl font-bold tracking-tight ${textOff}`}>
            Bond<em className="italic text-[#C06A2D]">y</em><span className="text-[#C06A2D]">.</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {[
            { href: '/method',    label: 'Method'    },
            { href: '/services',  label: 'Services'  },
            { href: '/work',      label: 'Work'      },
            { href: '/thinking',  label: 'Thinking'  },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`font-mono-bondy text-[10px] tracking-widest uppercase transition-colors ${textMid} ${hoverOff}`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className={`font-mono-bondy text-[10px] tracking-widest uppercase border-b pb-0.5 transition-colors ${ctaColor}`}
            >
              Work with us →
            </Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          className={`md:hidden ${textMid}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {menuOpen ? (
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5"/>
            ) : (
              <>
                <line x1="2" y1="6" x2="18" y2="6" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="2" y1="14" x2="18" y2="14" stroke="currentColor" strokeWidth="1.5"/>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={`md:hidden border-t px-8 py-6 flex flex-col gap-6 ${mobileBg} ${mobileBorder}`}>
          {[
            { href: '/method',   label: 'Method'   },
            { href: '/services', label: 'Services' },
            { href: '/work',     label: 'Work'     },
            { href: '/thinking', label: 'Thinking' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-mono-bondy text-[11px] tracking-widest uppercase ${textMid}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="font-mono-bondy text-[11px] tracking-widest uppercase text-[#C06A2D]"
            onClick={() => setMenuOpen(false)}
          >
            Work with us →
          </Link>
        </div>
      )}
    </nav>
  )
}
