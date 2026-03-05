import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Resources — Bondy',
  description: 'Tools, frameworks, and resources for technical hiring. Built by the Bondy team.',
}

const tools = [
  {
    name: 'Bondy Tools',
    url: 'https://tools.wearebondy.com',
    label: 'tools.wearebondy.com',
    description: 'Our suite of hiring tools — salary benchmarks, role scorecards, and interview frameworks. Built for engineering leaders who want to hire with structure.',
    tag: 'External tool',
    isExternal: true,
    featured: true,
  },
  {
    name: 'Salary Benchmark — LatAm Tech 2025',
    url: 'https://tools.wearebondy.com/salary',
    label: 'tools.wearebondy.com/salary',
    description: 'Market compensation data for software engineering roles in Argentina, Brazil, Mexico and Colombia. Updated quarterly.',
    tag: 'Benchmark',
    isExternal: true,
    featured: false,
  },
  {
    name: 'Role Scorecard Template',
    url: 'https://tools.wearebondy.com/scorecard',
    label: 'tools.wearebondy.com/scorecard',
    description: 'A structured template for evaluating candidates against a clear set of role requirements — not intuition.',
    tag: 'Template',
    isExternal: true,
    featured: false,
  },
  {
    name: 'The Brief Framework',
    url: '/thinking/why-most-job-briefs-are-wrong',
    label: 'Thinking → Frameworks',
    description: 'How to write a job brief that actually works. The single most important step before opening any search.',
    tag: 'Article',
    isExternal: false,
    featured: false,
  },
]

export default function ResourcesPage() {
  return (
    <main style={{ background: '#F0EBE3', minHeight: '100vh' }}>
      <Nav />

      {/* Header */}
      <header style={{ paddingTop: '60px', background: '#FFFFFF', borderBottom: '1px solid #E8E4DE' }}>
        <div style={{ padding: '4.5rem clamp(1.25rem,5vw,4rem) 4rem', maxWidth: '860px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
            <div style={{ width: '22px', height: '1px', background: '#C06A2D', flexShrink: 0 }} />
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C06A2D' }}>
              Resources & Tools
            </span>
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(38px,5vw,68px)', fontWeight: 900, lineHeight: .96, letterSpacing: '-.02em', color: '#1A1A1A', marginBottom: '1.75rem' }}>
            Hire better.<br /><em style={{ color: '#C06A2D', fontStyle: 'italic' }}>Starting now.</em>
          </h1>
          <p style={{ fontSize: '16px', lineHeight: 1.72, fontWeight: 300, color: '#7A7874', maxWidth: '520px' }}>
            Tools, frameworks and benchmarks from 16 years of technical hiring. Free to use, built for engineering leaders.
          </p>
        </div>
      </header>

      {/* Featured tool — Bondy Tools */}
      <section style={{ borderBottom: '1px solid #E8E4DE' }}>
        <a
          href="https://tools.wearebondy.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', textDecoration: 'none', background: '#1A1A1A', padding: '4rem clamp(1.25rem,5vw,4rem)', transition: 'background 0.2s' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: '2rem' }} className="featured-grid">
            <div>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#C06A2D', display: 'block', marginBottom: '1.25rem' }}>
                Featured · tools.wearebondy.com
              </span>
              <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(24px,3vw,40px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-.02em', color: '#F4F2EE', marginBottom: '1rem' }}>
                Bondy Tools
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', fontWeight: 300, maxWidth: '540px' }}>
                Our full suite of hiring tools — salary benchmarks, role scorecards, and structured interview frameworks. Built for engineering leaders who want to hire with rigor, not gut feel.
              </p>
            </div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '24px', color: '#C06A2D', flexShrink: 0 }}>↗</div>
          </div>
        </a>
      </section>

      {/* Tool list */}
      <section>
        {tools.filter(t => !t.featured).map((tool, idx) => (
          <a
            key={tool.name}
            href={tool.url}
            target={tool.isExternal ? '_blank' : '_self'}
            rel={tool.isExternal ? 'noopener noreferrer' : undefined}
            style={{
              display: 'block',
              textDecoration: 'none',
              borderBottom: '1px solid #E8E4DE',
              background: idx % 2 === 0 ? '#FFFFFF' : '#F0EBE3',
              padding: '3rem clamp(1.25rem,5vw,4rem)',
              transition: 'background 0.15s',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'center' }} className="tool-grid">
              <div>
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.85rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#C06A2D', border: '1px solid rgba(192,106,45,0.3)', padding: '3px 8px' }}>
                    {tool.tag}
                  </span>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '.13em', color: '#C8C5C0' }}>
                    {tool.label}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(18px,2vw,26px)', fontWeight: 900, color: '#1A1A1A', lineHeight: 1.1, letterSpacing: '-.01em', marginBottom: '0.65rem' }}>
                  {tool.name}
                </h3>
                <p style={{ fontSize: '14.5px', lineHeight: 1.72, color: '#7A7874', fontWeight: 300, maxWidth: '560px' }}>
                  {tool.description}
                </p>
              </div>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '16px', color: '#C06A2D', flexShrink: 0 }}>
                {tool.isExternal ? '↗' : '→'}
              </span>
            </div>
          </a>
        ))}
      </section>

      <Footer />

      <style>{`
        .featured-grid { grid-template-columns: 1fr auto; }
        .tool-grid { grid-template-columns: 1fr auto; }
        @media (max-width: 640px) {
          .featured-grid, .tool-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
