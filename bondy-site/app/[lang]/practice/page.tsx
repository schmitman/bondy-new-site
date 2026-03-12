import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'

export default function PracticePage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  const tr = t(lang)
  const lk = (href: string) => `/${lang}${href}`

  return (
    <main style={{ background: '#F0EBE3', minHeight: '100vh' }}>
      <Nav lang={lang} tr={tr.nav} />

      {/* ── HERO ── */}
      <header style={{ paddingTop: '60px', background: '#0E0E0E', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden' }}>

        {/* grid texture */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(192,106,45,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(192,106,45,.035) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

        {/* watermark */}
        <div className="mob-hide" style={{ position: 'absolute', fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 900, fontSize: 'clamp(8rem,20vw,18rem)', letterSpacing: '-.04em', lineHeight: '.85', color: 'rgba(244,242,238,.03)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none' }}>
          The Practice
        </div>

        {/* product nav pills */}
        <div className="hero-pills" style={{ position: 'absolute', top: 'calc(60px + 3rem)', left: 'clamp(1.5rem,5vw,3rem)', display: 'flex', gap: '2px', zIndex: 1 }}>
          {['Talent OS', 'Workshops', 'Market Intel', 'Tablero'].map((label, i) => {
            const anchors = ['talent-os', 'workshops', 'market-intelligence', 'tablero']
            return (
              <a key={label} href={`#${anchors[i]}`} style={{ fontFamily: 'DM Mono, monospace', fontSize: '8.5px', letterSpacing: '.14em', textTransform: 'uppercase', padding: '6px 14px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', color: 'rgba(244,242,238,.35)', textDecoration: 'none' }}>
                {label}
              </a>
            )
          })}
        </div>

        <div className="hero-content-grid" style={{ position: 'relative', zIndex: 1, padding: '0 clamp(1.5rem,5vw,3rem) 5rem', display: 'grid', gridTemplateColumns: '1fr clamp(280px,35vw,420px)', gap: '5rem', alignItems: 'end', borderTop: '1px solid rgba(255,255,255,.07)' }}>
          <div>
            {/* badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(192,106,45,.3)', padding: '6px 14px', marginBottom: '2.5rem' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#C06A2D' }} />
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#C06A2D' }}>By Bondy</span>
            </div>
            <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 900, fontSize: 'clamp(3.5rem,7vw,6.5rem)', lineHeight: '.9', letterSpacing: '-.03em', color: '#F4F2EE', marginBottom: '1rem' }}>
              The<br /><em style={{ color: '#C06A2D', fontStyle: 'italic' }}>Practice.</em>
            </h1>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(244,242,238,.25)' }}>
              Strategic people consulting — since 2008
            </div>
          </div>
          <div>
            <p style={{ fontSize: '15px', lineHeight: 1.75, fontWeight: 300, color: 'rgba(244,242,238,.5)', marginBottom: '1.25rem' }}>
              Recruiting fills roles. The Practice builds the systems, capabilities, and intelligence that make great hiring possible — whether we&apos;re executing the search or not.
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.75, fontWeight: 300, color: 'rgba(244,242,238,.5)', marginBottom: '2rem' }}>
              Four products. One belief: technical hiring is a discipline, not a transaction.
            </p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="#talent-os" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '.13em', textTransform: 'uppercase', background: '#C06A2D', color: '#fff', padding: '13px 26px', textDecoration: 'none' }}>
                See our work →
              </a>
              <Link href={lk('/contact')} style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '.13em', textTransform: 'uppercase', color: 'rgba(244,242,238,.4)', textDecoration: 'none' }}>
                Talk to us ↗
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── PRODUCT INDEX ── */}
      <section style={{ background: '#F0EBE3', padding: '0', borderBottom: '1px solid #E8E4DE' }}>
        <div className="practice-index" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', background: '#E8E4DE', gap: '1px', border: '1px solid #E8E4DE' }}>
          {[
            { n: '01 —', name: 'Talent', em: 'OS', anchor: 'talent-os', status: '● Available', statusColor: 'rgba(80,160,100,.7)' },
            { n: '02 —', name: 'Work', em: 'shops', anchor: 'workshops', status: '● Available', statusColor: 'rgba(80,160,100,.7)' },
            { n: '03 —', name: 'Market', em: 'Intel', anchor: 'market-intelligence', status: '● Available', statusColor: 'rgba(80,160,100,.7)' },
            { n: '04 —', name: 'Tablero de', em: 'Comando', anchor: 'tablero', status: '○ By request', statusColor: '#C8C5C0' },
          ].map((p) => (
            <a key={p.anchor} href={`#${p.anchor}`} style={{ background: '#F0EBE3', padding: '2rem 1.75rem', textDecoration: 'none', display: 'block' }}>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8C5C0', display: 'block', marginBottom: '.75rem' }}>{p.n}</span>
              <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 900, fontSize: '1.2rem', lineHeight: '.96', letterSpacing: '-.02em', color: '#1A1A1A', marginBottom: '.5rem' }}>
                {p.name} <em style={{ color: '#C06A2D', fontStyle: 'italic' }}>{p.em}</em>
              </div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '8px', letterSpacing: '.12em', textTransform: 'uppercase', color: p.statusColor }}>{p.status}</div>
            </a>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* PRODUCT 1: TALENT OS */}
      {/* ══════════════════════════════════════════════ */}
      <section id="talent-os" className="practice-section" style={{ background: '#0E0E0E', padding: '8rem clamp(1.5rem,5vw,3rem)', position: 'relative', overflow: 'hidden', scrollMarginTop: '60px' }}>
        <div className="mob-hide" style={{ position: 'absolute', right: 'clamp(1.5rem,5vw,3rem)', top: '5rem', fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 900, fontSize: 'clamp(8rem,16vw,14rem)', color: 'rgba(244,242,238,.03)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>01</div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* header */}
          <div className="mob-col" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '5rem', alignItems: 'start', marginBottom: '5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <div style={{ width: '22px', height: '1px', background: '#C06A2D' }} />
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#C06A2D' }}>01 — Talent OS</span>
              </div>
              <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 900, fontSize: 'clamp(2.5rem,4.5vw,4rem)', lineHeight: '.92', letterSpacing: '-.03em', color: '#F4F2EE', marginBottom: '1.5rem' }}>
                The 100-day<br />people <em style={{ color: '#C06A2D', fontStyle: 'italic' }}>sprint.</em>
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.75, fontWeight: 300, color: 'rgba(244,242,238,.45)' }}>
                You just closed your Seed or Series A. Investor pressure to hire is immediate. But no one has built the system to hire well. We install your entire Talent OS in 100 days — so you can scale from 15 to 150 without breaking.
              </p>
            </div>
            <div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(244,242,238,.25)', marginBottom: '1rem' }}>Sprint specs</div>
              {[
                { k: 'Duration', v: '100 days' },
                { k: 'Format', v: 'Co-pilot / embedded' },
                { k: 'Target', v: 'Seed → Series A' },
                { k: 'Deliverable', v: 'Live Notion OS' },
                { k: 'Scale', v: '15 → 150 people' },
              ].map((row) => (
                <div key={row.k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '.85rem 0', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(244,242,238,.25)' }}>{row.k}</span>
                  <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 700, fontSize: '1rem', color: '#F4F2EE' }}>{row.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* phases */}
          <div className="mob-col-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.06)', marginBottom: '4rem' }}>
            {[
              { n: '01 —', days: 'Days 1–30', title: 'Foundation', items: ['Current-state audit', 'Culture DNA: values → behaviors', 'Legal compliance baseline'] },
              { n: '02 —', days: 'Days 31–70', title: 'Build', items: ['Hiring engine + scorecards', '30-day onboarding playbook', 'Compensation philosophy + bands'] },
              { n: '03 —', days: 'Days 71–100', title: 'Handoff', items: ['Full Talent OS in Notion', 'Performance rhythm installed', 'First HR hire profile + process'] },
            ].map((phase) => (
              <div key={phase.title} style={{ padding: '2rem 1.75rem', background: 'rgba(255,255,255,.02)' }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '.18em', color: '#C06A2D', display: 'block', marginBottom: '.75rem' }}>{phase.n}</span>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '8px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(244,242,238,.2)', display: 'block', marginBottom: '.6rem' }}>{phase.days}</span>
                <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 900, fontSize: '1.3rem', lineHeight: '.96', letterSpacing: '-.02em', color: '#F4F2EE', marginBottom: '.75rem' }}>{phase.title}</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
                  {phase.items.map((item) => (
                    <li key={item} style={{ fontSize: '12.5px', fontWeight: 300, color: 'rgba(244,242,238,.35)', lineHeight: 1.5, paddingLeft: '1rem', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, top: '.6em', display: 'block', width: '5px', height: '1px', background: 'rgba(192,106,45,.4)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mob-stack" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
            <p style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 700, fontStyle: 'italic', fontSize: '1.2rem', color: 'rgba(244,242,238,.5)', maxWidth: '480px', lineHeight: 1.4 }}>
              Not a PDF. A <strong style={{ color: '#C06A2D', fontWeight: 900 }}>living system</strong> your team uses on day 101 — without us.
            </p>
            <Link href="https://calendar.app.google/gthsXL3grcJiTxda6" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '.13em', textTransform: 'uppercase', background: '#C06A2D', color: '#fff', padding: '13px 26px', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
              Book a free diagnostic →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* PRODUCT 2: WORKSHOPS */}
      {/* ══════════════════════════════════════════════ */}
      <section id="workshops" className="practice-section" style={{ background: '#FFFFFF', padding: '8rem clamp(1.5rem,5vw,3rem)', position: 'relative', overflow: 'hidden', scrollMarginTop: '60px' }}>
        <div className="mob-hide" style={{ position: 'absolute', right: 'clamp(1.5rem,5vw,3rem)', top: '5rem', fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 900, fontSize: 'clamp(8rem,16vw,14rem)', color: 'rgba(14,14,14,.04)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>02</div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="mob-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', marginBottom: '4rem', alignItems: 'end' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <div style={{ width: '22px', height: '1px', background: '#C06A2D' }} />
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#C06A2D' }}>02 — Workshops</span>
              </div>
              <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 900, fontSize: 'clamp(2.5rem,4.5vw,4rem)', lineHeight: '.92', letterSpacing: '-.03em', color: '#1A1A1A' }}>
                Train the people<br />who <em style={{ color: '#C06A2D', fontStyle: 'italic' }}>hire</em> people.
              </h2>
            </div>
            <p style={{ fontSize: '15px', lineHeight: 1.75, fontWeight: 300, color: '#7A7874', alignSelf: 'end' }}>
              Most hiring mistakes aren&apos;t sourcing problems — they&apos;re interviewing problems. We run focused workshops that turn founders, hiring managers, and internal recruiters into disciplined evaluators.
            </p>
          </div>

          {/* workshop cards */}
          <div className="mob-col-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: '#E8E4DE', border: '1px solid #E8E4DE', marginBottom: '3rem' }}>
            {[
              {
                tag: 'For hiring managers',
                title: 'Hire Like an Expert',
                desc: 'Structured interviewing, behavioral techniques, scorecard-based evaluation. For technical leaders who interview constantly but were never taught how.',
                meta: [['Format', 'Half-day workshop'], ['Group', 'Up to 15 participants'], ['Delivery', 'In-person or remote']],
              },
              {
                tag: 'For founders + HR',
                title: 'Culture-Based Hiring',
                desc: 'Translate your values into observable, measurable behaviors. Build a hiring process that selects for fit — not just skill — before the first offer is made.',
                meta: [['Format', 'Full-day workshop'], ['Group', 'Leadership team'], ['Delivery', 'In-person preferred']],
              },
              {
                tag: 'For internal teams',
                title: 'Recruiter Bootcamp',
                desc: 'A multi-session program for internal recruiters and TA teams. Covers sourcing strategy, role definition, process design, and candidate experience — end to end.',
                meta: [['Format', 'Multiple sessions'], ['Group', 'TA / HR teams'], ['Delivery', 'Custom program']],
              },
            ].map((card) => (
              <div key={card.title} style={{ background: '#FFFFFF', padding: '2rem' }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '8px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#C06A2D', marginBottom: '1rem', display: 'block' }}>{card.tag}</span>
                <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 900, fontSize: '1.25rem', lineHeight: '.96', letterSpacing: '-.02em', color: '#1A1A1A', marginBottom: '.75rem' }}>{card.title}</div>
                <p style={{ fontSize: '13px', lineHeight: 1.65, fontWeight: 300, color: '#7A7874', marginBottom: '1.25rem' }}>{card.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
                  {card.meta.map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '8px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#C8C5C0', flexShrink: 0, width: '50px' }}>{k}</span>
                      <span style={{ fontSize: '12px', fontWeight: 300, color: '#7A7874' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* audience pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#C8C5C0', marginRight: '4px' }}>Who attends</span>
            {['Founders / C-level', 'Hiring managers', 'Tech leads / EMs', 'Internal recruiters', 'HR / People teams'].map((p) => (
              <span key={p} style={{ fontFamily: 'DM Mono, monospace', fontSize: '8.5px', letterSpacing: '.11em', textTransform: 'uppercase', padding: '5px 12px', border: '1px solid #E8E4DE', color: '#7A7874' }}>{p}</span>
            ))}
          </div>

          {/* Disbyte case */}
          <div className="mob-col-auto" style={{ background: '#F0EBE3', borderLeft: '2px solid rgba(192,106,45,.3)', padding: '1.5rem 2rem', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '2rem', alignItems: 'center' }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '8.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#C06A2D', whiteSpace: 'nowrap' }}>Case — Disbyte</div>
            <div style={{ fontSize: '13.5px', lineHeight: 1.6, fontWeight: 300, color: '#7A7874' }}>
              We ran a <strong style={{ color: '#1A1A1A', fontWeight: 400 }}>multi-session program</strong> for the entire Disbyte organization — from founders to recruiters — covering role definition, structured interviewing, culture-based evaluation, scorecards, and onboarding design. Every level of the company left with a shared language for hiring.
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* PRODUCT 3: MARKET INTELLIGENCE */}
      {/* ══════════════════════════════════════════════ */}
      <section id="market-intelligence" className="practice-section" style={{ background: '#F0EBE3', padding: '8rem clamp(1.5rem,5vw,3rem)', position: 'relative', overflow: 'hidden', scrollMarginTop: '60px' }}>
        <div className="mob-hide" style={{ position: 'absolute', right: 'clamp(1.5rem,5vw,3rem)', top: '5rem', fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 900, fontSize: 'clamp(8rem,16vw,14rem)', color: 'rgba(14,14,14,.04)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>03</div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="mob-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', marginBottom: '4rem', alignItems: 'end' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <div style={{ width: '22px', height: '1px', background: '#C06A2D' }} />
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#C06A2D' }}>03 — Market Intelligence</span>
              </div>
              <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 900, fontSize: 'clamp(2.5rem,4.5vw,4rem)', lineHeight: '.92', letterSpacing: '-.03em', color: '#1A1A1A' }}>
                Hire with<br /><em style={{ color: '#C06A2D', fontStyle: 'italic' }}>data.</em>
              </h2>
            </div>
            <p style={{ fontSize: '15px', lineHeight: 1.75, fontWeight: 300, color: '#7A7874', alignSelf: 'end' }}>
              17 years of placements across LATAM and global tech companies. Real compensation data, talent availability maps, and benchmarks that no survey can replicate — because ours come from actual offers, actual declines, and actual hires.
            </p>
          </div>

          <div className="mob-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1px', background: '#E8E4DE', border: '1px solid #E8E4DE', marginBottom: '3rem' }}>
            {[
              { cat: 'Compensation Reports', title: 'Salary Benchmarks by Role + Stack', desc: 'Compensation ranges by seniority, technology, and geography. Updated with real market data — not self-reported surveys.', items: ['Engineering roles (FE, BE, Fullstack, Data, DevOps)', 'Seniority: Jr / Mid / Sr / Staff / Principal', 'LATAM + Global remote benchmarks', 'Equity ranges for VC-backed companies'] },
              { cat: 'Talent Availability', title: 'Profile Scarcity + Time-to-Hire Maps', desc: 'How hard is it to find a senior Rust engineer in Argentina? How long does it realistically take? We have the data.', items: ['Availability by stack and country', 'Realistic time-to-hire estimates', 'Candidate drop-off by process stage', 'Competing offers landscape'] },
              { cat: 'Hiring Process Audit', title: 'Why You\'re Losing Candidates', desc: 'We analyze your current hiring funnel and identify exactly where — and why — candidates are dropping out before offer.', items: ['Funnel conversion rates vs. market benchmarks', 'Process length vs. candidate expectations', 'Offer acceptance rate analysis', 'Actionable recommendations report'] },
              { cat: 'Headcount Planning', title: 'Build Your Hiring Roadmap', desc: 'We translate your business plan into a realistic, sequenced hiring roadmap — with costs, timelines, and risk flags built in.', items: ['Role prioritization by business impact', 'Realistic timeline per role', 'Budget modeling (comp + recruiting costs)', 'Risk scenarios and contingencies'] },
            ].map((card) => (
              <div key={card.title} style={{ background: '#FFFFFF', padding: '2rem 1.75rem' }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '8.5px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#C06A2D', marginBottom: '1rem', display: 'block' }}>{card.cat}</span>
                <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 900, fontSize: '1.15rem', lineHeight: '.96', letterSpacing: '-.02em', color: '#1A1A1A', marginBottom: '.75rem' }}>{card.title}</div>
                <p style={{ fontSize: '13px', lineHeight: 1.6, fontWeight: 300, color: '#7A7874', marginBottom: '1.25rem' }}>{card.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.35rem' }}>
                  {card.items.map((item) => (
                    <span key={item} style={{ fontSize: '12px', fontWeight: 300, color: '#C8C5C0', paddingLeft: '1rem', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, top: '.55em', display: 'block', width: '5px', height: '1px', background: 'rgba(192,106,45,.4)' }} />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* credibility bar */}
          <div className="mob-col-cred" style={{ background: '#1A1A1A', padding: '2.5rem 3rem', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
            {[
              { num: '17', sup: '+', label: 'Years of real placement data' },
              { num: '1', sup: ' in 4', label: 'Our benchmark for search quality' },
              { num: 'A→', sup: 'IPO', label: 'Companies we have data across' },
            ].map((stat, i) => (
              <div key={stat.label} style={{ padding: '0 2rem', borderRight: i < 2 ? '1px solid rgba(255,255,255,.08)' : 'none', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 900, fontSize: '2.4rem', letterSpacing: '-.03em', color: '#F4F2EE', lineHeight: 1, marginBottom: '.25rem' }}>
                  {stat.num}<span style={{ color: '#C06A2D' }}>{stat.sup}</span>
                </div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '8.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(244,242,238,.3)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* PRODUCT 4: TABLERO DE COMANDO */}
      {/* ══════════════════════════════════════════════ */}
      <section id="tablero" className="practice-section" style={{ background: '#1A1A1A', padding: '8rem clamp(1.5rem,5vw,3rem)', position: 'relative', overflow: 'hidden', scrollMarginTop: '60px' }}>
        <div className="mob-hide" style={{ position: 'absolute', right: 'clamp(1.5rem,5vw,3rem)', top: '5rem', fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 900, fontSize: 'clamp(8rem,16vw,14rem)', color: 'rgba(244,242,238,.025)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>04</div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="mob-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', marginBottom: '4rem', alignItems: 'start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <div style={{ width: '22px', height: '1px', background: '#C06A2D' }} />
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#C06A2D' }}>04 — Tablero de Comando</span>
              </div>
              <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 900, fontSize: 'clamp(2.5rem,4.5vw,4rem)', lineHeight: '.92', letterSpacing: '-.03em', color: '#F4F2EE', marginBottom: '1.5rem' }}>
                See your talent<br />clearly — <em style={{ color: '#C06A2D', fontStyle: 'italic' }}>all of it.</em>
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.75, fontWeight: 300, color: 'rgba(244,242,238,.45)', marginBottom: '2rem' }}>
                A bespoke diagnostic of the talent state of your organization. Where are your risks? Who are your key people? What does your bench look like? Built once, used continuously.
              </p>
              <Link href="https://calendar.app.google/gthsXL3grcJiTxda6" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '.13em', textTransform: 'uppercase', background: '#C06A2D', color: '#fff', padding: '13px 26px', textDecoration: 'none' }}>
                Request a Tablero →
              </Link>
            </div>

            {/* Dashboard mockup */}
            <div style={{ background: '#111', border: '1px solid rgba(255,255,255,.08)', overflow: 'hidden' }}>
              <div style={{ height: '36px', background: '#0A0A0A', borderBottom: '1px solid rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', padding: '0 1rem', gap: '.5rem' }}>
                {['#FF5F57','#FFBD2E','#28CA41'].map((c) => <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />)}
                <div style={{ flex: 1, textAlign: 'center', fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '.1em', color: 'rgba(255,255,255,.2)' }}>Tablero de Comando</div>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <div className="mob-col-kpi" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(255,255,255,.05)', marginBottom: '1rem' }}>
                  {[
                    { label: 'Open roles', val: '8', color: '#C06A2D', delta: '+3 vs last qtr' },
                    { label: 'Avg time-to-hire', val: '47d', color: '#C06A2D', delta: '+12d vs benchmark' },
                    { label: 'Offer acceptance', val: '78%', color: 'rgba(80,180,100,.8)', delta: 'Market avg: 72%' },
                    { label: 'Retention 12m', val: '91%', color: 'rgba(80,180,100,.8)', delta: 'Above benchmark' },
                  ].map((kpi) => (
                    <div key={kpi.label} style={{ background: '#191919', padding: '1rem' }}>
                      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '7.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.2)', marginBottom: '.4rem' }}>{kpi.label}</div>
                      <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 900, fontSize: '1.5rem', color: kpi.color, lineHeight: 1 }}>{kpi.val}</div>
                      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '7px', letterSpacing: '.1em', color: 'rgba(255,255,255,.2)', marginTop: '.2rem' }}>{kpi.delta}</div>
                    </div>
                  ))}
                </div>
                <div className="mob-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,.05)' }}>
                  <div style={{ background: '#191919', padding: '1rem' }}>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '7.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(192,106,45,.6)', marginBottom: '.75rem' }}>Funnel by stage</div>
                    {[['Sourced','100%','240'],['Screened','54%','130'],['Technical','25%','60'],['Offer','10%','24']].map(([label,w,v]) => (
                      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '.4rem' }}>
                        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,.3)', width: '60px', flexShrink: 0 }}>{label}</span>
                        <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,.06)', borderRadius: '2px' }}>
                          <div style={{ height: '100%', width: w, borderRadius: '2px', background: '#C06A2D' }} />
                        </div>
                        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '8px', color: 'rgba(255,255,255,.25)' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: '#191919', padding: '1rem' }}>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '7.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(192,106,45,.6)', marginBottom: '.75rem' }}>Risk by dept</div>
                    {[['Engineering','75%','#E05555','High'],['Product','40%','#C06A2D','Med'],['Design','20%','#50B464','Low'],['Operations','15%','#50B464','Low']].map(([label,w,c,risk]) => (
                      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '.4rem' }}>
                        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,.3)', width: '60px', flexShrink: 0 }}>{label}</span>
                        <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,.06)', borderRadius: '2px' }}>
                          <div style={{ height: '100%', width: w, borderRadius: '2px', background: c }} />
                        </div>
                        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '8px', color: c }}>{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mob-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1px', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.06)' }}>
            {[
              { label: 'Current state', text: 'Full audit of your team structure, seniority distribution, and flight risk. Who are your key people, and what would it cost to lose them?' },
              { label: 'Hiring funnel analysis', text: "Where are you losing candidates? We map your pipeline against market benchmarks and identify the exact friction points." },
              { label: 'Market positioning', text: "How does your employer brand, compensation, and process compare to what candidates are choosing instead of you?" },
              { label: '90-day action plan', text: "Not a slide deck of findings. A prioritized, actionable plan — what to fix first, and who owns it." },
            ].map((item) => (
              <div key={item.label} style={{ padding: '1.5rem 2rem', background: 'rgba(255,255,255,.02)' }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '.15em', textTransform: 'uppercase', color: '#C06A2D', marginBottom: '.5rem', display: 'block' }}>{item.label}</span>
                <div style={{ fontSize: '13.5px', lineHeight: 1.6, fontWeight: 300, color: 'rgba(244,242,238,.4)' }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOBAL CTA ── */}
      <section className="global-cta" style={{ background: '#0E0E0E', padding: '7rem clamp(1.5rem,5vw,3rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(192,106,45,.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '2rem' }}>
            <div style={{ width: '22px', height: '1px', background: '#C06A2D' }} />
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#C06A2D' }}>Work with The Practice</span>
            <div style={{ width: '22px', height: '1px', background: '#C06A2D' }} />
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 900, fontSize: 'clamp(2.2rem,4vw,3.5rem)', lineHeight: '.92', letterSpacing: '-.03em', color: '#F4F2EE', marginBottom: '1.5rem' }}>
            Not sure which<br />product is <em style={{ color: '#C06A2D', fontStyle: 'italic' }}>right?</em>
          </h2>
          <p style={{ fontSize: '15px', lineHeight: 1.75, fontWeight: 300, color: 'rgba(244,242,238,.45)', marginBottom: '3rem' }}>
            We&apos;ll tell you. Book a 30-minute call with no agenda other than understanding your situation — and we&apos;ll point you to what actually makes sense.
          </p>

          <div className="mob-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.07)', marginBottom: '2.5rem' }}>
            {[
              { tag: 'For startups post-ronda', title: 'Need to build hiring infrastructure from scratch', desc: '→ Talent OS is probably your product.' },
              { tag: 'For scale-ups with teams', title: 'Need to upskill your people or get market clarity', desc: '→ Workshops or Market Intelligence.' },
              { tag: 'For CHROs + People leaders', title: 'Need a full picture of your talent state', desc: '→ Tablero de Comando.' },
              { tag: 'Not sure yet', title: 'Just know something isn\'t working', desc: '→ Talk to us. We\'ll figure it out together.' },
            ].map((opt) => (
              <div key={opt.tag} style={{ background: 'rgba(255,255,255,.02)', padding: '1.75rem', textAlign: 'left' }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '8.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#C06A2D', marginBottom: '.5rem', display: 'block' }}>{opt.tag}</span>
                <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 700, fontSize: '1rem', color: '#F4F2EE', lineHeight: 1.2, marginBottom: '.4rem' }}>{opt.title}</div>
                <div style={{ fontSize: '12.5px', fontWeight: 300, color: 'rgba(244,242,238,.35)', lineHeight: 1.5 }}>{opt.desc}</div>
              </div>
            ))}
          </div>

          <a href="https://calendar.app.google/gthsXL3grcJiTxda6" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '.13em', textTransform: 'uppercase', background: '#C06A2D', color: '#fff', padding: '13px 26px', textDecoration: 'none' }}>
            Book a free 30-min call →
          </a>
        </div>
      </section>

      <Footer lang={lang} tr={tr.footer} />

      <style>{`
        /* ── MOBILE RESPONSIVE ── */
        @media (max-width: 768px) {

          /* Hide decorative watermarks */
          .mob-hide { display: none !important; }

          /* Hero */
          .hero-content-grid {
            grid-template-columns: 1fr !important;
            padding: 0 1.5rem 3rem !important;
            gap: 2rem !important;
          }
          .hero-pills { display: none !important; }

          /* Product index: 2 cols */
          .practice-index {
            grid-template-columns: 1fr 1fr !important;
          }

          /* All section grids: 1 col */
          .mob-col {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }

          /* 3-col grids */
          .mob-col-3 {
            grid-template-columns: 1fr !important;
            gap: 1px !important;
          }

          /* KPI grid: keep 2 cols */
          .mob-col-kpi {
            grid-template-columns: 1fr 1fr !important;
          }

          /* Credibility stats */
          .mob-col-cred {
            grid-template-columns: 1fr !important;
            padding: 1.5rem !important;
          }
          .mob-col-cred > div {
            padding: 0.75rem 0 !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,.08) !important;
            text-align: left !important;
          }
          .mob-col-cred > div:last-child {
            border-bottom: none !important;
          }

          /* Disbyte callout */
          .mob-col-auto {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }

          /* Talent OS footer CTA row */
          .mob-stack {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
          }

          /* Section padding */
          .practice-section {
            padding: 4rem 1.5rem !important;
          }

          /* Headings */
          .practice-section h2 {
            font-size: clamp(1.9rem, 8vw, 2.8rem) !important;
          }
        }

        @media (max-width: 480px) {
          .practice-index {
            grid-template-columns: 1fr !important;
          }
          .mob-col-kpi {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}