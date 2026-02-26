import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-b-black border-t border-white/10">
      <div className="px-8 md:px-16 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-6">
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <rect width="7" height="26" rx="1" fill="#F9F8F6"/>
              <rect x="7" y="1" width="16" height="11" rx="5.5" fill="#F9F8F6"/>
              <rect x="7" y="14" width="17" height="11" rx="5.5" fill="#F9F8F6"/>
              <circle cx="27" cy="29" r="3" fill="#E05C00"/>
            </svg>
            <span className="text-b-off font-display text-lg font-bold tracking-tight">
              Bond<em>y</em><span className="text-b-orange">.</span>
            </span>
          </div>
          <p className="text-b-mid text-[14px] leading-relaxed font-light max-w-xs">
            The standard for technical hiring. Since 2008.
          </p>
        </div>

        {/* Links */}
        <div>
          <div className="font-mono-bondy text-[11px] tracking-wider uppercase text-b-mid mb-6">Navigation</div>
          <ul className="flex flex-col gap-3">
            {['Method', 'Services', 'Thinking', 'Contact'].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="text-[14px] text-b-mid hover:text-b-off transition-colors font-light"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="font-mono-bondy text-[11px] tracking-wider uppercase text-b-mid mb-6">Get in touch</div>
          <a
            href="mailto:hola@wearebondy.com"
            className="text-[14px] text-b-off hover:text-b-orange transition-colors font-light block mb-3"
          >
            hola@wearebondy.com
          </a>
          <a
            href="https://www.linkedin.com/company/bondygroup"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-bondy text-[11px] tracking-wider uppercase text-b-mid hover:text-b-orange transition-colors"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-8 md:px-16 py-5 flex justify-between items-center">
        <span className="font-mono-bondy text-[11px] tracking-wider text-white/30">
          © {new Date().getFullYear()} Bondy Group. All rights reserved.
        </span>
        <span className="font-mono-bondy text-[11px] tracking-wider text-white/30">
          newbondy.wearebondy.com
        </span>
      </div>
    </footer>
  )
}
