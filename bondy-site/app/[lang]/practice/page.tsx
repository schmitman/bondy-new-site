import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'

export default function PracticePage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  const tr = t(lang)
  const lk = (href: string) => `/${lang}${href}`

  /* ── typewriter CSS tokens ── */
  const tw = {
    bg: '#FEFCF9',
    ink: '#1A1A1A',
    inkMid: '#3A3530',
    inkSub: '#5A5550',
    inkFaint: '#7A7874',
    inkRule: '#C0BAB4',
    green: '#4A8C40',
    stone: 'rgba(244,238,229,0.75)',
  }

  /* ── SVG underline helpers (inline data URIs) ── */
  const ulSm = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='6' viewBox='0 0 120 6'%3E%3Cpath d='M0 3.5 C15 2.8,30 4.2,45 3.6 C60 3.0,75 4.0,90 3.4 C105 2.9,114 3.8,120 3.5' stroke='%234A8C40' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") repeat-x 0 100% / 120px 6px`
  const ulLg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='7' viewBox='0 0 160 7'%3E%3Cpath d='M0 4 C20 3.2,40 4.8,60 4.0 C80 3.3,100 4.6,120 3.9 C140 3.2,152 4.4,160 4' stroke='%234A8C40' stroke-width='2.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") repeat-x 0 100% / 160px 7px`

  /* ── notebook background ── */
  const notebookBg = [
    'linear-gradient(90deg, transparent 68px, rgba(210,100,80,0.10) 68px, rgba(210,100,80,0.10) 69.5px, transparent 69.5px)',
    'repeating-linear-gradient(180deg, transparent 0px, transparent 31px, rgba(100,140,200,0.09) 31px, rgba(100,140,200,0.09) 32px)',
  ].join(',')

  const products = [
    { n: '01', name: 'Talent OS', anchor: 'talent-os', avail: true },
    { n: '02', name: 'Workshops', anchor: 'workshops', avail: true },
    { n: '03', name: 'Market Intel', anchor: 'market-intelligence', avail: true },
    { n: '04', name: lang === 'en' ? 'Talent Dashboard' : 'Tablero', anchor: 'tablero', avail: false },
  ]

  return (
    <main style={{ background: tw.bg, minHeight: '100vh', backgroundImage: notebookBg }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap');

        .tw-ink       { filter: contrast(1.15) brightness(0.92); }
        .tw-ink-heavy { filter: contrast(1.25) brightness(0.88) saturate(0.9); -webkit-font-smoothing: none; }

        .tw-ul {
          background: ${ulSm};
          padding-bottom: 5px;
        }
        .tw-ul-lg {
          background: ${ulLg};
          padding-bottom: 7px;
        }

        /* NAV */
        .tw-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          height: 60px;
          background: rgba(254,252,249,0.96);
          border-bottom: 1.5px solid #1A1A1A;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 52px;
          backdrop-filter: blur(8px);
        }
        .tw-nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .tw-nav-link {
          font-family: 'Courier Prime', 'Courier New', monospace;
          font-size: 14px;
          letter-spacing: 0.04em;
          color: #5A5550;
          text-decoration: none;
        }
        .tw-nav-link:hover { color: #1A1A1A; }
        .tw-nav-cta {
          font-family: 'Courier Prime', 'Courier New', monospace;
          font-size: 14px;
          letter-spacing: 0.04em;
          color: #1A1A1A;
          text-decoration: none;
          border-bottom: 1.5px solid #4A8C40;
          padding-bottom: 1px;
        }

        /* PRODUCTS NAV */
        .tw-products-nav {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-bottom: 1.5px solid #1A1A1A;
        }
        .tw-product-pill {
          padding: 14px 20px;
          text-decoration: none;
          border-right: 1px solid rgba(26,26,26,0.15);
          display: flex;
          align-items: center;
          gap: 10px;
          transition: background 0.15s;
        }
        .tw-product-pill:hover { background: rgba(74,140,64,0.06); }
        .tw-product-pill:last-child { border-right: none; }

        /* SECTIONS */
        .tw-section {
          padding: 80px 52px;
          border-bottom: 1.5px solid rgba(26,26,26,0.12);
          position: relative;
        }

        /* SPEC ROW */
        .tw-spec-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 10px 0;
          border-bottom: 1px solid rgba(192,186,180,0.4);
        }

        /* PHASES */
        .tw-phases {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(26,26,26,0.08);
          border: 1px solid rgba(26,26,26,0.08);
          margin: 2.5rem 0;
        }
        .tw-phase {
          background: rgba(244,238,229,0.4);
          padding: 28px 24px;
        }

        /* WORKSHOPS */
        .tw-workshops {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(26,26,26,0.1);
          border: 1px solid rgba(26,26,26,0.1);
          margin: 2.5rem 0;
        }
        .tw-workshop-card {
          background: #FEFCF9;
          padding: 28px 24px;
        }

        /* CASE STRIP */
        .tw-case-strip {
          background: rgba(244,238,229,0.75);
          border: 1px solid rgba(26,26,26,0.10);
          padding: 32px 52px;
          margin: 0 -52px;
        }

        /* STATS */
        .tw-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 1px solid rgba(26,26,26,0.12);
          margin: 2.5rem 0;
        }
        .tw-stat {
          padding: 28px 24px;
          border-right: 1px solid rgba(26,26,26,0.12);
          text-align: center;
        }
        .tw-stat:last-child { border-right: none; }

        /* INTEL GRID */
        .tw-intel {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(26,26,26,0.08);
          border: 1px solid rgba(26,26,26,0.08);
          margin: 2.5rem 0;
        }
        .tw-intel-item {
          background: #FEFCF9;
          padding: 24px 28px;
        }

        /* DASHBOARD */
        .tw-dashboard {
          background: #F5F0E8;
          border: 1px solid rgba(26,26,26,0.15);
          margin: 0;
          overflow: hidden;
        }
        .tw-dash-header {
          height: 32px;
          background: rgba(26,26,26,0.06);
          border-bottom: 1px solid rgba(26,26,26,0.10);
          display: flex;
          align-items: center;
          padding: 0 16px;
          gap: 6px;
        }
        .tw-kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(26,26,26,0.08);
          margin: 16px 16px 8px;
        }
        .tw-kpi {
          background: #FEFCF9;
          padding: 14px 16px;
        }

        /* CTA FINAL */
        .tw-cta-final {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1.5px solid #1A1A1A;
        }
        .tw-cta-left {
          padding: 60px 52px;
          border-right: 1px solid rgba(26,26,26,0.12);
        }
        .tw-cta-right {
          padding: 60px 52px;
        }
        .tw-routing-item {
          display: flex;
          align-items: baseline;
          gap: 12px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(192,186,180,0.4);
          font-family: 'Courier Prime', 'Courier New', monospace;
          font-size: 13px;
          color: #5A5550;
        }
        .tw-routing-item:last-child { border-bottom: none; }
        .tw-routing-arrow { color: #4A8C40; font-weight: 700; }

        /* FOOTER */
        .tw-footer {
          border-top: 1px solid rgba(26,26,26,0.15);
          padding: 28px 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .tw-footer-links {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }
        .tw-footer-link {
          font-family: 'Courier Prime', 'Courier New', monospace;
          font-size: 13px;
          letter-spacing: 0.06em;
          color: #5A5550;
          text-decoration: none;
        }
        .tw-footer-link:hover { color: #1A1A1A; }

        /* BUTTONS */
        .tw-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Courier Prime', 'Courier New', monospace;
          font-size: 11px;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          background: #1A1A1A;
          color: #FEFCF9;
          padding: 12px 24px;
          text-decoration: none;
          border: 1.5px solid #1A1A1A;
          cursor: pointer;
        }
        .tw-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Courier Prime', 'Courier New', monospace;
          font-size: 11px;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          background: transparent;
          color: #7A7874;
          padding: 12px 24px;
          text-decoration: none;
          border: 1.5px solid rgba(26,26,26,0.2);
          cursor: pointer;
        }
        .tw-section-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 5rem;
          align-items: start;
        }
        .tw-tablero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .tw-nav { padding: 0 20px; }
          .tw-nav-links { display: none; }
          .tw-section { padding: 52px 20px; }
          .tw-products-nav { grid-template-columns: repeat(2, 1fr); }
          .tw-phases { grid-template-columns: 1fr !important; }
          .tw-workshops { grid-template-columns: 1fr !important; }
          .tw-kpi-grid { grid-template-columns: 1fr 1fr !important; }
          .tw-stats { grid-template-columns: 1fr !important; }
          .tw-stat { border-right: none !important; border-bottom: 1px solid rgba(26,26,26,0.12); }
          .tw-stat:last-child { border-bottom: none; }
          .tw-intel { grid-template-columns: 1fr !important; }
          .tw-cta-final { grid-template-columns: 1fr !important; }
          .tw-cta-left { border-right: none !important; padding: 40px 20px !important; }
          .tw-cta-right { padding: 20px 20px 40px !important; }
          .tw-case-strip { padding: 28px 20px !important; margin: 0 -20px !important; }
          .tw-footer { flex-direction: column; align-items: flex-start; padding: 28px 20px; }
          .tw-footer-links { gap: 16px; }
          .tw-section-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .tw-tablero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .tw-hero-body { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 480px) {
          .tw-products-nav { grid-template-columns: 1fr !important; }
          .tw-kpi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── TYPEWRITER NAV ── */}
      <nav className="tw-nav">
        <div style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: '18px', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '10px' }} className="tw-ink">
          <svg width="22" height="22" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect x="3" y="4" width="15" height="13" rx="2.5" fill="#1A1A1A" />
            <rect x="22" y="4" width="15" height="13" rx="2.5" fill="#1A1A1A" opacity="0.18" />
            <rect x="3" y="22" width="15" height="13" rx="2.5" fill="#1A1A1A" opacity="0.42" />
            <rect x="22" y="22" width="15" height="13" rx="2.5" fill="#4A8C40" />
          </svg>
          BONDY
        </div>
        <div className="tw-nav-links">
          <a href={lk('/method')} className="tw-nav-link">Method</a>
          <a href={lk('/services')} className="tw-nav-link">Services</a>
          <a href={lk('/work')} className="tw-nav-link">Cases</a>
          <span className="tw-nav-link" style={{ color: tw.ink, fontWeight: 700, cursor: 'default' }}>The Practice</span>
          <a href={lk('/contact')} className="tw-nav-cta">Work with us &#x2197;</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header style={{ padding: '80px 52px', borderBottom: '1.5px solid rgba(26,26,26,0.12)', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: tw.green }} />
          <span style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: tw.inkMid }}>
            By Bondy &#8212; Strategic people consulting
          </span>
        </div>

        <h1 className="tw-ink-heavy" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: 'clamp(3rem,7vw,64px)', lineHeight: 1.0, letterSpacing: '0.02em', color: tw.ink, marginBottom: '0.75rem' }}>
          The <span className="tw-ul-lg" style={{ display: 'inline' }}>Practice.</span>
        </h1>

        <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: tw.inkFaint, marginBottom: '3rem' }}>
          Since 2008
        </div>

        <div className="tw-hero-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'end' }}>
          <p style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '15px', lineHeight: 1.8, color: tw.inkSub, margin: 0 }}>
            Recruiting fills roles. The Practice builds the systems, capabilities, and intelligence that make great hiring possible &#8212; whether we&apos;re executing the search or not.
          </p>
          <div>
            <p style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '14px', lineHeight: 1.75, fontStyle: 'italic', color: tw.inkMid, marginBottom: '2rem' }}>
              Four products. One belief: technical hiring is a discipline, not a transaction.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="#talent-os" className="tw-btn-primary">See our work &#x2192;</a>
              <a href={lk('/contact')} className="tw-btn-ghost">Talk to us &#x2197;</a>
            </div>
          </div>
        </div>
      </header>

      {/* ── PRODUCTS NAV ── */}
      <div className="tw-products-nav">
        {products.map((p) => (
          <a key={p.anchor} href={`#${p.anchor}`} className="tw-product-pill">
            <span style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '9px', letterSpacing: '0.14em', color: tw.inkFaint }}>
              {p.n}
            </span>
            <span className="tw-ink" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: '13px', color: tw.ink }}>
              {p.name}
            </span>
            <span style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '8px', letterSpacing: '0.12em', marginLeft: 'auto', color: p.avail ? tw.green : tw.inkFaint }}>
              {p.avail ? '&#x25CF; Available' : '&#x25CB; By request'}
            </span>
          </a>
        ))}
      </div>

      {/* ══ 01 &#8212; TALENT OS ══ */}
      <section id="talent-os" className="tw-section" style={{ scrollMarginTop: '60px' }}>
        <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: tw.green, marginBottom: '1.25rem' }}>
          01 &#8212; Talent OS
        </div>
        <h2 className="tw-ink-heavy" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: 'clamp(2rem,4.5vw,48px)', lineHeight: 1.05, letterSpacing: '0.01em', color: tw.ink, marginBottom: '1.5rem' }}>
          The 100-day people <span className="tw-ul-lg" style={{ display: 'inline' }}>sprint.</span>
        </h2>

        <div className="tw-section-grid">
          <div>
            <p style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '14px', lineHeight: 1.8, color: tw.inkSub, marginBottom: '2.5rem' }}>
              You just closed your Seed or Series A. Investor pressure to hire is immediate. But no one has built the system to hire well. We install your entire Talent OS in 100 days &#8212; so you can scale from 15 to 150 without breaking.
            </p>

            <div className="tw-phases">
              {[
                { n: '01', days: 'Days 1&#x2013;30', title: 'Foundation', items: ['Current-state audit', 'Culture DNA: values &#x2192; behaviors', 'Legal compliance baseline'] },
                { n: '02', days: 'Days 31&#x2013;70', title: 'Build', items: ['Hiring engine + scorecards', '30-day onboarding playbook', 'Compensation philosophy + bands'] },
                { n: '03', days: 'Days 71&#x2013;100', title: 'Handoff', items: ['Full Talent OS in Notion', 'Performance rhythm installed', 'First HR hire profile + process'] },
              ].map((phase) => (
                <div key={phase.title} className="tw-phase">
                  <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: tw.green, marginBottom: '6px' }}>{phase.n}</div>
                  <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', color: tw.inkFaint, marginBottom: '8px' }} dangerouslySetInnerHTML={{ __html: phase.days }} />
                  <div className="tw-ink" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: '18px', color: tw.ink, marginBottom: '10px' }}>{phase.title}</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {phase.items.map((item) => (
                      <li key={item} style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '12px', lineHeight: 1.5, color: tw.inkMid, paddingLeft: '14px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, top: '0.6em', width: '6px', height: '1px', background: tw.green, display: 'block' }} />
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '14px', fontStyle: 'italic', lineHeight: 1.7, color: tw.inkMid }}>
              Not a PDF. A living system your team uses on day 101 &#8212; without us.
            </p>
          </div>

          <div>
            <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: tw.inkFaint, marginBottom: '12px' }}>
              Sprint specs
            </div>
            {[
              { k: 'Duration', v: '100 days' },
              { k: 'Format', v: 'Co-pilot' },
              { k: 'Target', v: 'Seed &#x2192; Series A' },
              { k: 'Deliverable', v: 'Notion OS' },
              { k: 'Scale', v: '15 &#x2192; 150' },
            ].map((row) => (
              <div key={row.k} className="tw-spec-row">
                <span style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '10px', letterSpacing: '0.10em', textTransform: 'uppercase', color: tw.inkFaint }}>{row.k}</span>
                <span className="tw-ink" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: '15px', color: tw.ink }} dangerouslySetInnerHTML={{ __html: row.v }} />
              </div>
            ))}
            <div style={{ marginTop: '2.5rem' }}>
              <a href="https://calendar.app.google/gthsXL3grcJiTxda6" target="_blank" rel="noopener noreferrer" className="tw-btn-primary">
                Book a free diagnostic &#x2192;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 02 &#8212; WORKSHOPS ══ */}
      <section id="workshops" className="tw-section" style={{ scrollMarginTop: '60px' }}>
        <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: tw.green, marginBottom: '1.25rem' }}>
          02 &#8212; Workshops
        </div>
        <h2 className="tw-ink-heavy" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: 'clamp(2rem,4.5vw,48px)', lineHeight: 1.05, letterSpacing: '0.01em', color: tw.ink, marginBottom: '1.5rem' }}>
          Train the people who <span className="tw-ul" style={{ display: 'inline' }}>hire</span> people.
        </h2>
        <p style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '14px', lineHeight: 1.8, color: tw.inkSub, maxWidth: '640px', marginBottom: '0' }}>
          Most hiring mistakes aren&apos;t sourcing problems &#8212; they&apos;re interviewing problems. We run focused workshops that turn founders, hiring managers, and internal recruiters into disciplined evaluators.
        </p>

        <div className="tw-workshops">
          {[
            {
              tag: 'For hiring managers',
              title: 'Hire Like an Expert',
              desc: 'Structured interviewing, behavioral techniques, scorecard-based evaluation. For technical leaders who interview constantly but were never taught how.',
              meta: [['Format', 'Half-day'], ['Group', '15 pax'], ['Delivery', 'In-person or remote']],
            },
            {
              tag: 'For founders + HR',
              title: 'Culture-Based Hiring',
              desc: 'Translate your values into observable, measurable behaviors. Build a hiring process that selects for fit &#8212; not just skill &#8212; before the first offer is made.',
              meta: [['Format', 'Full-day'], ['Group', 'Leadership team'], ['Delivery', 'In-person preferred']],
            },
            {
              tag: 'For internal teams',
              title: 'Recruiter Bootcamp',
              desc: 'A multi-session program for internal recruiters and TA teams. Covers sourcing strategy, role definition, process design, and candidate experience.',
              meta: [['Format', 'Multiple sessions'], ['Group', 'TA/HR teams'], ['Delivery', 'Custom']],
            },
          ].map((card) => (
            <div key={card.title} className="tw-workshop-card">
              <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: tw.green, marginBottom: '12px' }}>{card.tag}</div>
              <div className="tw-ink" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: '20px', color: tw.ink, marginBottom: '10px', lineHeight: 1.1 }}>{card.title}</div>
              <p style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '12.5px', lineHeight: 1.7, color: tw.inkMid, marginBottom: '16px' }} dangerouslySetInnerHTML={{ __html: card.desc }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {card.meta.map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', gap: '8px', fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '10px' }}>
                    <span style={{ color: tw.inkFaint, letterSpacing: '0.08em' }}>{k}:</span>
                    <span style={{ color: tw.inkMid }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="tw-case-strip">
          <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: tw.green, marginBottom: '12px' }}>
            Case &#8212; Disbyte
          </div>
          <p style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '13.5px', lineHeight: 1.75, color: tw.inkMid, margin: 0 }}>
            Disbyte brought us in after realizing their engineering managers were making hiring decisions based on gut feel. After one full-day Culture-Based Hiring workshop, they unified their evaluation criteria across three offices.{' '}
            <em className="tw-ul" style={{ display: 'inline' }}>Every level left with a shared language for hiring</em>
            {' '}&#8212; and a scorecard they still use today.
          </p>
        </div>
      </section>

      {/* ══ 03 &#8212; MARKET INTELLIGENCE ══ */}
      <section id="market-intelligence" className="tw-section" style={{ scrollMarginTop: '60px' }}>
        <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: tw.green, marginBottom: '1.25rem' }}>
          03 &#8212; Market Intelligence
        </div>
        <h2 className="tw-ink-heavy" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: 'clamp(2rem,4.5vw,48px)', lineHeight: 1.05, letterSpacing: '0.01em', color: tw.ink, marginBottom: '1.5rem' }}>
          Hire with <span className="tw-ul-lg" style={{ display: 'inline' }}>data.</span>
        </h2>
        <p style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '14px', lineHeight: 1.8, color: tw.inkSub, maxWidth: '640px', marginBottom: '0' }}>
          Most companies make hiring decisions with no market data at all. We give you the intelligence to hire smarter &#8212; based on 17 years of active sourcing across LATAM&apos;s tech ecosystem.
        </p>

        <div className="tw-stats">
          {[
            { n: '17+', label: 'Years of active market data across LATAM tech' },
            { n: '1 in 4', label: 'Our benchmark: if less than 1 in 4 advance, we stop and realign' },
            { n: 'A &#x2192; IPO', label: 'Clients across every growth stage' },
          ].map((stat) => (
            <div key={stat.n} className="tw-stat">
              <div className="tw-ink-heavy" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: 'clamp(2rem,4vw,48px)', color: tw.ink, lineHeight: 1, marginBottom: '8px' }} dangerouslySetInnerHTML={{ __html: stat.n }} />
              <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '11px', lineHeight: 1.6, color: tw.inkSub }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="tw-intel">
          {[
            { title: 'Salary Benchmarks by Role + Stack', desc: 'What are engineers actually earning in your market? We cut by seniority, stack, and sector &#8212; not just country averages.' },
            { title: 'Profile Scarcity + Time-to-Hire Maps', desc: 'How long should it realistically take to fill this role? Which profiles are scarce? Plan your hiring runway before you need it.' },
            { title: 'Why You\'re Losing Candidates', desc: 'You offered. They declined. We diagnose the exact friction points &#8212; compensation, process, employer brand &#8212; and fix them.' },
            { title: 'Build Your Hiring Roadmap', desc: 'A 90-day hiring plan calibrated to your growth, the market, and your team\'s actual capacity to evaluate well.' },
          ].map((item) => (
            <div key={item.title} className="tw-intel-item">
              <div className="tw-ink" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: '16px', color: tw.ink, marginBottom: '8px', lineHeight: 1.2 }}>{item.title}</div>
              <p style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '12.5px', lineHeight: 1.7, color: tw.inkMid, margin: 0 }} dangerouslySetInnerHTML={{ __html: item.desc }} />
            </div>
          ))}
        </div>
      </section>

      {/* ══ 04 &#8212; TALENT DASHBOARD ══ */}
      <section id="tablero" className="tw-section" style={{ scrollMarginTop: '60px' }}>
        <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: tw.green, marginBottom: '1.25rem' }}>
          04 &#8212; {lang === 'en' ? 'Talent Dashboard' : 'Tablero de Comando'}
        </div>
        <h2 className="tw-ink-heavy" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: 'clamp(2rem,4.5vw,48px)', lineHeight: 1.05, letterSpacing: '0.01em', color: tw.ink, marginBottom: '1.5rem' }}>
          See your talent clearly &#8212; <span className="tw-ul-lg" style={{ display: 'inline' }}>{lang === 'en' ? 'all of it.' : 'todo.'}</span>
        </h2>

        <div className="tw-tablero-grid">
          <div>
            <p style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '14px', lineHeight: 1.8, color: tw.inkSub, marginBottom: '2rem' }}>
              A bespoke diagnostic of the talent state of your organization. Where are your risks? Who are your key people? What does your bench look like? Built once, used continuously.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(26,26,26,0.08)', border: '1px solid rgba(26,26,26,0.08)', marginBottom: '2rem' }}>
              {[
                { n: 'Current state', item: 'Team audit' },
                { n: 'Hiring funnel', item: 'Pipeline analysis' },
                { n: 'Output', item: '90-day action plan' },
              ].map((phase) => (
                <div key={phase.n} style={{ background: tw.bg, padding: '20px 18px' }}>
                  <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: tw.green, marginBottom: '6px' }}>{phase.n}</div>
                  <div className="tw-ink" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: '14px', color: tw.ink }}>{phase.item}</div>
                </div>
              ))}
            </div>

            <a href="https://calendar.app.google/gthsXL3grcJiTxda6" target="_blank" rel="noopener noreferrer" className="tw-btn-primary">
              Request a diagnostic &#x2192;
            </a>
          </div>

          <div className="tw-dashboard">
            <div className="tw-dash-header">
              {['#FF5F57', '#FFBD2E', '#28CA41'].map((c) => (
                <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />
              ))}
              <div style={{ flex: 1, textAlign: 'center', fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '9px', letterSpacing: '0.10em', color: tw.inkFaint }}>
                {lang === 'en' ? 'Talent Dashboard' : 'Tablero de Comando'}
              </div>
            </div>
            <div className="tw-kpi-grid">
              {[
                { label: 'Open roles', val: '8', delta: '+3 vs last qtr', pos: true },
                { label: 'Avg time-to-hire', val: '47d', delta: '+12d vs benchmark', pos: false },
                { label: 'Offer acceptance', val: '78%', delta: 'Market avg 72%', pos: true },
                { label: 'Retention 12m', val: '91%', delta: 'Above benchmark', pos: true },
              ].map((kpi) => (
                <div key={kpi.label} className="tw-kpi">
                  <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '7.5px', letterSpacing: '0.10em', textTransform: 'uppercase', color: tw.inkFaint, marginBottom: '4px' }}>{kpi.label}</div>
                  <div className="tw-ink" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: '22px', color: kpi.pos ? tw.green : tw.ink, lineHeight: 1 }}>{kpi.val}</div>
                  <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '7px', letterSpacing: '0.08em', color: tw.inkFaint, marginTop: '2px' }}>{kpi.delta}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '8px 16px 16px', fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '10px', color: tw.inkFaint, textAlign: 'center', fontStyle: 'italic' }}>
              Live view of your organization&apos;s talent state
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <div className="tw-cta-final">
        <div className="tw-cta-left">
          <h2 className="tw-ink-heavy" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: 'clamp(1.8rem,3.5vw,38px)', lineHeight: 1.1, color: tw.ink, marginBottom: '1.25rem' }}>
            Not sure which product is <span className="tw-ul" style={{ display: 'inline' }}>right?</span>
          </h2>
          <p style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '14px', lineHeight: 1.8, color: tw.inkSub, marginBottom: '2rem' }}>
            We&apos;ll tell you. Book a 30-minute call with no agenda other than understanding your situation.
          </p>
          <a href="https://calendar.app.google/gthsXL3grcJiTxda6" target="_blank" rel="noopener noreferrer" className="tw-btn-primary">
            Book a free 30-min call &#x2192;
          </a>
        </div>

        <div className="tw-cta-right">
          <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: tw.inkFaint, marginBottom: '20px' }}>
            Find your path
          </div>
          {[
            { label: 'For startups', dest: 'Talent OS' },
            { label: 'For scale-ups', dest: 'Workshops or Market Intelligence' },
            { label: 'For CHROs', dest: lang === 'en' ? 'Talent Dashboard' : 'Tablero de Comando' },
            { label: 'Not sure', dest: 'Talk to us' },
          ].map((item) => (
            <div key={item.label} className="tw-routing-item">
              <span style={{ color: tw.inkSub, minWidth: '120px' }}>{item.label}</span>
              <span className="tw-routing-arrow">&#x2192;</span>
              <span style={{ color: tw.ink, fontWeight: 700 }}>{item.dest}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── TYPEWRITER FOOTER ── */}
      <footer className="tw-footer">
        <div style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: '18px', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '10px' }} className="tw-ink">
          <svg width="22" height="22" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect x="3" y="4" width="15" height="13" rx="2.5" fill="#1A1A1A" />
            <rect x="22" y="4" width="15" height="13" rx="2.5" fill="#1A1A1A" opacity="0.18" />
            <rect x="3" y="22" width="15" height="13" rx="2.5" fill="#1A1A1A" opacity="0.42" />
            <rect x="22" y="22" width="15" height="13" rx="2.5" fill="#4A8C40" />
          </svg>
          BONDY Group
        </div>
        <nav className="tw-footer-links">
          {[
            { label: 'Method', href: lk('/method') },
            { label: 'Services', href: lk('/services') },
            { label: 'The Practice', href: '#' },
            { label: 'Cases', href: lk('/work') },
            { label: 'Contact', href: lk('/contact') },
          ].map((l) => (
            <a key={l.label} href={l.href} className="tw-footer-link">{l.label}</a>
          ))}
        </nav>
        <span style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '12px', color: '#7A7874', whiteSpace: 'nowrap' }}>
          &copy; 2026 &middot; Buenos Aires
        </span>
      </footer>

    </main>
  )
}
