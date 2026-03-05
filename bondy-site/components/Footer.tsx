import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-white/10">
      <div className="px-8 md:px-16 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div className="md:col-span-1">
          <div className="mb-5">
            <span className="font-display text-lg font-bold tracking-tight text-[#F9F8F6]">
              Bond<em className="italic text-[#C06A2D]">y</em><span className="text-[#C06A2D]">.</span>
            </span>
          </div>
          <p className="text-[#888885] text-sm leading-relaxed font-light max-w-[180px]">
            The standard for technical hiring.<br />Since 2008.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-[#888885] mb-5">Navigation</div>
          <ul className="flex flex-col gap-3">
            {[
              { href: '/method',    label: 'Method'    },
              { href: '/services',  label: 'Services'  },
              { href: '/work',      label: 'Work'      },
              { href: '/thinking',  label: 'Thinking'  },
              { href: '/about',     label: 'About'     },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-[#888885] hover:text-[#F9F8F6] transition-colors font-light"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-[#888885] mb-5">Services</div>
          <ul className="flex flex-col gap-3">
            {[
              { href: '/services#hunting',  label: 'Hunting'           },
              { href: '/services#pipeline', label: 'Talent Pipeline'   },
              { href: '/services#rpo',      label: 'Embedded Recruiter'},
              { href: '/referrals',         label: 'Referrals'         },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-[#888885] hover:text-[#F9F8F6] transition-colors font-light"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-[#888885] mb-5">Get in touch</div>
          <a
            href="mailto:hola@wearebondy.com"
            className="text-sm text-[#F9F8F6] hover:text-[#C06A2D] transition-colors font-light block mb-3"
          >
            hola@wearebondy.com
          </a>
          <a
            href="https://www.linkedin.com/company/bondygroup"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-bondy text-[10px] tracking-widest uppercase text-[#888885] hover:text-[#C06A2D] transition-colors"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-8 md:px-16 py-5 flex justify-between items-center">
        <span className="font-mono-bondy text-[10px] tracking-wider text-white/20">
          © {new Date().getFullYear()} Bondy Group. All rights reserved.
        </span>
        <span className="font-mono-bondy text-[10px] tracking-wider text-white/20">
          Buenos Aires · Global
        </span>
      </div>
    </footer>
  )
}
