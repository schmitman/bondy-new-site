import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Services — Bondy',
  description: 'Three ways to work with Bondy: Hunting, Talent Pipeline, and Embedded Recruiter.',
}

const details: Record<string, [string, string][]> = {
  hunting: [
    ['What\'s included', 'Full brief, sourcing strategy, direct search, candidate interviews, detailed reports, offer support.'],
    ['Timeline', '5–7 business days to first qualified shortlist. Offer close typically within 3–5 weeks.'],
    ['Guarantee', '3-month placement warranty. We search again at no cost if the hire doesn\'t work out.'],
    ['Best for', 'Specific roles that need to be filled urgently. Senior or hard-to-find profiles.'],
  ],
  pipeline: [
    ['What\'s included', 'Candidate sourcing, profile qualification, lightweight reports, and a curated delivery.'],
    ['Timeline', 'Typically 3–5 days to first pipeline delivery.'],
    ['Best for', 'Companies with strong internal interview processes that need better top-of-funnel quality.'],
    ['vs Hunting', 'We handle sourcing and qualification. You handle interviews and close.'],
  ],
  rpo: [
    ['What\'s included', 'Full-time or part-time embedded recruiter, market salary reports, hiring strategy advisory.'],
    ['Engagement', 'Minimum 3 months. Month-to-month renewable.'],
    ['Best for', 'Series A+ companies scaling from 10 to 50+ engineers. High-velocity hiring plans.'],
    ['Advantage', 'Agency-quality sourcing with in-house commitment and real-time market data.'],
  ],
}

const compRows = [
  ['Who runs the search',    'Bondy end-to-end',      'Bondy sources, you close', 'Bondy inside your team'],
  ['Time to first candidates','5–7 business days',    '3–5 business days',        'Ongoing'],
  ['Placement guarantee',    '✓ 3 months',            '—',                        '—'],
  ['Interview reports',      '✓ Full reports',        '✓ Lightweight',            '✓ Full reports'],
  ['Market intelligence',    'At brief stage',        'At brief stage',           '✓ Continuous'],
  ['Minimum commitment',     'Per search',            'Per pipeline',             '3 months'],
  ['Best for',               '1–3 urgent roles',      'Recurring sourcing need',  '10+ hires per year'],
]

function DetailCard({ label, value, light }: { label: string; value: string; light?: boolean }) {
  return (
    <div style={{
      padding: '1.25rem 1.5rem',
      background: light ? '#F4F2EE' : '#FFFFFF',
      borderLeft: '2px solid rgba(192,106,45,0.2)',
    }}>
      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#C06A2D', display: 'block', marginBottom: '.4rem' }}>
        {label}
      </span>
      <div style={{ fontSize: '13.5px', color: '#7A7874', fontWeight: 300, lineHeight: 1.6 }}>
        {value}
      </div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <main style={{ background: '#F0EBE3', minHeight: '100vh' }}>
      <Nav />

      {/* Page header */}
      <header style={{ paddingTop: '60px', background: '#FFFFFF', borderBottom: '1px solid #E8E4DE' }}>
        <div style={{ padding: '4.5rem clamp(1.25rem,5vw,4rem) 4rem', maxWidth: '860px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
            <div style={{ width: '22px', height: '1px', background: '#C06A2D', flexShrink: 0 }} />
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C06A2D' }}>
              Services
            </span>
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(38px,5vw,68px)', fontWeight: 900, lineHeight: .96, letterSpacing: '-.02em', color: '#1A1A1A', marginBottom: '1.75rem' }}>
            Three ways<br />we can <em style={{ color: '#C06A2D', fontStyle: 'italic' }}>work together.</em>
          </h1>
          <p style={{ fontSize: '16px', lineHeight: 1.72, fontWeight: 300, color: '#7A7874', maxWidth: '520px' }}>
            Different hiring challenges require different approaches. We've designed each service around a specific type of need — not around what's easiest to sell.
          </p>
        </div>
      </header>

      {/* Service 01 — Hunting */}
      <section id="hunting" style={{ background: '#FFFFFF', borderBottom: '1px solid #E8E4DE' }}>
        <div className="svc-grid">
          <div className="svc-left">
            <span className="svc-n">01</span>
            <h2 className="svc-h2">Hunting</h2>
            <p className="svc-hook">You need someone hired. Not eventually — this quarter.</p>
            <p className="svc-body">We take full ownership of the search, from brief to signed offer. You get a curated shortlist of pre-interviewed candidates within 5 to 7 business days, each with a detailed report that covers what the CV never shows — technical depth, communication style, motivations, and why we believe they're the right fit.</p>
            <p className="svc-body" style={{ marginTop: '1rem' }}>We stay through the close. Every placement comes with a 3-month guarantee — if it doesn't work out, we search again at no extra cost.</p>
          </div>
          <div className="svc-right">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginBottom: '2.5rem' }}>
              {details.hunting.map(([label, value]) => <DetailCard key={label} label={label} value={value} />)}
            </div>
            <Link href="/contact" className="cta-primary">Start a search ↗</Link>
          </div>
        </div>
      </section>

      {/* Service 02 — Pipeline */}
      <section id="pipeline" style={{ background: '#F0EBE3', borderBottom: '1px solid #E8E4DE' }}>
        <div className="svc-grid">
          <div className="svc-left">
            <span className="svc-n">02</span>
            <h2 className="svc-h2">Talent<br /><em style={{ color: '#C06A2D', fontStyle: 'italic' }}>Pipeline</em></h2>
            <p className="svc-hook">You have the process. You have the interviewers. What you need is a shortlist that doesn't waste everyone's time.</p>
            <p className="svc-body">We build you a curated list of pre-vetted, ready-to-contact candidates — selected to spec, not to volume. You run the interviews. We make sure the people in the room are worth interviewing.</p>
            <p className="svc-body" style={{ marginTop: '1rem' }}>The difference from Hunting: we handle sourcing and qualification. You handle interviews and close. Same quality inputs, different ownership model.</p>
          </div>
          <div className="svc-right">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginBottom: '2.5rem' }}>
              {details.pipeline.map(([label, value]) => <DetailCard key={label} label={label} value={value} light />)}
            </div>
            <Link href="/contact" className="cta-ghost">Get in touch →</Link>
          </div>
        </div>
      </section>

      {/* Service 03 — Embedded */}
      <section id="rpo" style={{ background: '#FFFFFF', borderBottom: '1px solid #E8E4DE' }}>
        <div className="svc-grid">
          <div className="svc-left">
            <span className="svc-n">03</span>
            <h2 className="svc-h2">Embedded<br /><em style={{ color: '#C06A2D', fontStyle: 'italic' }}>Recruiter</em></h2>
            <p className="svc-hook">A Bondy recruiter, inside your team, for as long as you need.</p>
            <p className="svc-body">Market insights in real time, full transparency, no agency markup. The recruiter works as part of your team, understands your culture deeply, and brings the full weight of the Bondy network and methodology.</p>
            <p className="svc-body" style={{ marginTop: '1rem' }}>For companies with aggressive hiring plans that need both quality and market intelligence — not just more CVs.</p>
          </div>
          <div className="svc-right">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginBottom: '2.5rem' }}>
              {details.rpo.map(([label, value]) => <DetailCard key={label} label={label} value={value} />)}
            </div>
            <Link href="/contact" className="cta-ghost">Get in touch →</Link>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section style={{ background: '#FFFFFF', borderBottom: '1px solid #E8E4DE', padding: '5rem clamp(1.25rem,5vw,4rem)' }}>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#C06A2D', display: 'block', marginBottom: '1rem' }}>
          How to choose
        </span>
        <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(26px,3vw,40px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-.02em', color: '#1A1A1A', marginBottom: '2.5rem' }}>
          Not sure which<br />service <em style={{ color: '#C06A2D', fontStyle: 'italic' }}>fits?</em>
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '560px' }}>
            <thead>
              <tr>
                {['', 'Hunting', 'Talent Pipeline', 'Embedded Recruiter'].map((h) => (
                  <th key={h} style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '.16em', textTransform: 'uppercase', color: h ? '#C06A2D' : '#C8C5C0', background: '#F0EBE3', padding: '1.1rem 1.5rem', textAlign: 'left', borderBottom: '1px solid #E8E4DE', fontWeight: 400 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compRows.map(([label, ...cells]) => (
                <tr key={label}>
                  <td style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#1A1A1A', fontWeight: 400, padding: '1rem 1.5rem', borderBottom: '1px solid #E8E4DE', whiteSpace: 'nowrap' }}>{label}</td>
                  {cells.map((cell, i) => (
                    <td key={i} style={{ fontSize: '13.5px', fontWeight: 300, color: cell.startsWith('✓') ? '#C06A2D' : cell === '—' ? '#C8C5C0' : '#7A7874', padding: '1rem 1.5rem', borderBottom: '1px solid #E8E4DE' }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 1 in 4 rule */}
      <section style={{ background: '#1A1A1A', padding: '5rem clamp(1.25rem,5vw,4rem)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="rule-grid">
          <div>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#C06A2D', display: 'block', marginBottom: '1.75rem' }}>
              The diagnostic principle
            </span>
            <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(64px,9vw,120px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-.03em', color: '#F4F2EE' }}>
              1<em style={{ color: '#C06A2D', fontStyle: 'italic' }}> in </em>4
            </div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: '1rem' }}>
              The threshold that changes everything
            </div>
          </div>
          <div>
            <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(22px,2.5vw,32px)', fontWeight: 700, color: '#F4F2EE', lineHeight: 1.2, marginBottom: '1.25rem', letterSpacing: '-.01em' }}>
              If fewer than 1 in 4 candidates advance, we stop.
            </h3>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', fontWeight: 300, lineHeight: 1.72 }}>
              Most recruiters keep sending CVs when a search isn't working. We don't. If fewer than 1 in 4 candidates are advancing in your process, that's a signal — and we stop to diagnose it before moving forward.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', fontWeight: 300, lineHeight: 1.72, marginTop: '1rem' }}>
              It usually means the brief needs revision, the offer isn't competitive, or the internal process has a friction point. We'd rather fix the problem than paper over it with more volume.
            </p>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section style={{ background: '#F0EBE3', padding: '6rem clamp(1.25rem,5vw,4rem)', borderTop: '1px solid #E8E4DE' }}>
        <div className="cta-grid">
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(30px,4vw,52px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-.02em', color: '#1A1A1A' }}>
            Not sure which<br />service fits?<br /><em style={{ color: '#C06A2D', fontStyle: 'italic' }}>Ask us.</em>
          </h2>
          <div>
            <p style={{ fontSize: '15px', color: '#7A7874', fontWeight: 300, lineHeight: 1.72, marginBottom: '2rem' }}>
              We'll tell you honestly. Sometimes the answer is none of them — and we'd rather tell you now than waste your time and ours.
            </p>
            <Link href="/contact" className="cta-primary">Start the conversation ↗</Link>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .svc-grid { display: grid; grid-template-columns: 1fr 1fr; }
        .svc-left { padding: 4.5rem clamp(1.25rem,5vw,4rem); border-right: 1px solid #E8E4DE; }
        .svc-right { padding: 4.5rem clamp(1.25rem,5vw,4rem); display: flex; flex-direction: column; justify-content: space-between; }
        .svc-n { font-family: DM Mono, monospace; font-size: 9px; letter-spacing: .18em; text-transform: uppercase; color: #C8C5C0; display: block; margin-bottom: 2rem; }
        .svc-h2 { font-family: Playfair Display, Georgia, serif; font-size: clamp(32px,3.5vw,52px); font-weight: 900; line-height: 1; letter-spacing: -.02em; color: #1A1A1A; margin-bottom: 1.5rem; }
        .svc-hook { font-size: 16px; font-weight: 400; color: #1A1A1A; line-height: 1.6; margin-bottom: 1.25rem; max-width: 420px; }
        .svc-body { font-size: 14.5px; line-height: 1.75; color: #7A7874; font-weight: 300; max-width: 420px; }
        .cta-primary { display: inline-flex; align-items: center; gap: 8px; font-family: DM Mono, monospace; font-size: 10px; letter-spacing: .13em; text-transform: uppercase; background: #C06A2D; color: #fff; padding: 13px 26px; text-decoration: none; }
        .cta-ghost { display: inline-flex; align-items: center; gap: 8px; font-family: DM Mono, monospace; font-size: 10px; letter-spacing: .13em; text-transform: uppercase; border: 1px solid #E8E4DE; color: #7A7874; padding: 13px 26px; text-decoration: none; }
        .rule-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        .cta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        @media (max-width: 860px) {
          .svc-grid { grid-template-columns: 1fr; }
          .svc-left { border-right: none; border-bottom: 1px solid #E8E4DE; padding-bottom: 2.5rem; }
          .svc-right { padding-top: 2.5rem; }
          .rule-grid, .cta-grid { grid-template-columns: 1fr; gap: 2.5rem; }
        }
      `}</style>
    </main>
  )
}
