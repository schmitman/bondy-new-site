import Link from 'next/link'

const navLinks = [
  { href: '/method',   label: 'Method' },
  { href: '/services', label: 'Services' },
  { href: '/work',     label: 'Work' },
  { href: '/about',    label: 'About' },
  { href: '/roles',    label: 'Open Roles' },
  { href: '/referrals',label: 'Referrals' },
  { href: '/thinking', label: 'Thinking' },
  { href: '/contact',  label: 'Contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0E0E0E', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '3rem',
          padding: '3.5rem clamp(1.25rem,5vw,4rem) 0',
        }}
        className="footer-grid"
      >
        {/* Brand */}
        <div>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', textDecoration: 'none', marginBottom: '1.1rem' }}>
            <svg width="22" height="22" viewBox="0 0 512 512" fill="none">
              <path d="M98 108 L265 108 Q366 108 366 209 Q366 310 265 310 L98 310 Z" fill="#FAAF40"/>
              <path d="M175 210 L341 210 Q440 210 440 309 Q440 408 341 408 L241 408 Q175 408 175 342 Z" fill="#FAAF40"/>
              <clipPath id="footer-clip">
                <path d="M98 108 L265 108 Q366 108 366 209 Q366 310 265 310 L98 310 Z"/>
              </clipPath>
              <g clipPath="url(#footer-clip)">
                <path d="M175 210 L341 210 Q440 210 440 309 Q440 408 341 408 L241 408 Q175 408 175 342 Z" fill="#F27122"/>
              </g>
              <circle cx="130" cy="370" r="28" fill="#404041"/>
            </svg>
            <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '17px', fontWeight: 900, color: '#F4F2EE', letterSpacing: '-0.02em' }}>
              Bond<em style={{ fontStyle: 'italic', color: '#C06A2D' }}>y</em>.
            </span>
          </Link>
          <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.35)', fontWeight: 300, lineHeight: 1.65, maxWidth: '195px' }}>
            The standard for technical hiring. Since 2008.
          </p>
        </div>

        {/* Nav */}
        <div>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', display: 'block', marginBottom: '1.25rem' }}>
            Navigate
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontWeight: 300 }}>
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', display: 'block', marginBottom: '1.25rem' }}>
            Get in touch
          </span>
          <a href="mailto:hello@wearebondy.com" style={{ display: 'block', fontSize: '13.5px', color: '#F4F2EE', textDecoration: 'none', fontWeight: 300, marginBottom: '0.6rem' }}>
            hello@wearebondy.com
          </a>
          <a
            href="https://linkedin.com/company/bondygroup"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          margin: '3rem 0 0',
          padding: '1.25rem clamp(1.25rem,5vw,4rem)',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.13em', color: 'rgba(255,255,255,0.14)' }}>
          © {new Date().getFullYear()} Bondy Group. All rights reserved.
        </span>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.13em', color: 'rgba(255,255,255,0.14)' }}>
          wearebondy.com
        </span>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 860px) and (min-width: 641px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
