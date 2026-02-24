'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-sm bg-b-black/90">
      <div className="flex items-center justify-between px-8 md:px-16 py-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="7" height="26" rx="1" fill="#F9F8F6"/>
            <rect x="7" y="1" width="16" height="11" rx="5.5" fill="#F9F8F6"/>
            <rect x="7" y="14" width="17" height="11" rx="5.5" fill="#F9F8F6"/>
            <circle cx="27" cy="29" r="3" fill="#E05C00"/>
          </svg>
          <span
            className="text-b-off font-display text-xl font-bold tracking-tight"
          >
            Bondy<span className="text-b-orange">.</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          <li>
            <Link
              href="/method"
              className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-mid hover:text-b-off transition-colors"
            >
              Method
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-mid hover:text-b-off transition-colors"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/thinking"
              className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-mid hover:text-b-off transition-colors"
            >
              Thinking
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange border-b border-b-orange/40 hover:border-b-orange pb-0.5 transition-colors"
            >
              Work with us →
            </Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-b-mid"
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
        <div className="md:hidden border-t border-white/10 bg-b-black px-8 py-6 flex flex-col gap-6">
          <Link href="/method" className="font-mono-bondy text-[11px] tracking-widest uppercase text-b-mid" onClick={() => setMenuOpen(false)}>Method</Link>
          <Link href="/services" className="font-mono-bondy text-[11px] tracking-widest uppercase text-b-mid" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link href="/thinking" className="font-mono-bondy text-[11px] tracking-widest uppercase text-b-mid" onClick={() => setMenuOpen(false)}>Thinking</Link>
          <Link href="/contact" className="font-mono-bondy text-[11px] tracking-widest uppercase text-b-orange" onClick={() => setMenuOpen(false)}>Work with us →</Link>
        </div>
      )}
    </nav>
  )
}
