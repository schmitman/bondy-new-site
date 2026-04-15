import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'

export default function PracticePage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  const tr = t(lang)
  const lk = (href: string) => `/${lang}${href}`
  const es = lang === 'es'

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
    { n: '02', name: es ? 'Talleres' : 'Workshops', anchor: 'workshops', avail: true },
    { n: '03', name: es ? 'Inteligencia de Mercado' : 'Market Intel', anchor: 'market-intelligence', avail: true },
    { n: '04', name: es ? 'Tablero' : 'Talent Dashboard', anchor: 'tablero', avail: false },
  ]

  return (
    <main style={{ background: tw.bg, minHeight: '100vh', backgroundImage: notebookBg }}>

      <style>{`
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
          <a href={lk('/method')} className="tw-nav-link">{es ? 'Método' : 'Method'}</a>
          <a href={lk('/services')} className="tw-nav-link">{es ? 'Servicios' : 'Services'}</a>
          <a href={lk('/work')} className="tw-nav-link">{es ? 'Casos' : 'Cases'}</a>
          <span className="tw-nav-link" style={{ color: tw.ink, fontWeight: 700, cursor: 'default' }}>The Practice</span>
          <a href={lk('/contact')} className="tw-nav-cta">{es ? 'Trabajá con nosotros' : 'Work with us'} &#x2197;</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header style={{ padding: '80px 52px', borderBottom: '1.5px solid rgba(26,26,26,0.12)', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: tw.green }} />
          <span style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: tw.inkMid }}>
            {es ? 'Por Bondy — Consultoría estratégica de personas' : 'By Bondy — Strategic people consulting'}
          </span>
        </div>

        <h1 className="tw-ink-heavy" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: 'clamp(3rem,7vw,64px)', lineHeight: 1.0, letterSpacing: '0.02em', color: tw.ink, marginBottom: '0.75rem' }}>
          The <span className="tw-ul-lg" style={{ display: 'inline' }}>Practice.</span>
        </h1>

        <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: tw.inkFaint, marginBottom: '3rem' }}>
          {es ? 'Desde 2008' : 'Since 2008'}
        </div>

        <div className="tw-hero-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'end' }}>
          <p style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '15px', lineHeight: 1.8, color: tw.inkSub, margin: 0 }}>
            {es
              ? 'El recruiting llena posiciones. The Practice construye los sistemas, capacidades e inteligencia que hacen posible un gran hiring — tanto si nosotros ejecutamos la búsqueda como si no.'
              : "Recruiting fills roles. The Practice builds the systems, capabilities, and intelligence that make great hiring possible — whether we're executing the search or not."}
          </p>
          <div>
            <p style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '14px', lineHeight: 1.75, fontStyle: 'italic', color: tw.inkMid, marginBottom: '2rem' }}>
              {es
                ? 'Cuatro productos. Una convicción: el hiring técnico es una disciplina, no una transacción.'
                : 'Four products. One belief: technical hiring is a discipline, not a transaction.'}
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="#talent-os" className="tw-btn-primary">{es ? 'Ver nuestro trabajo' : 'See our work'} &#x2192;</a>
              <a href={lk('/contact')} className="tw-btn-ghost">{es ? 'Hablemos' : 'Talk to us'} &#x2197;</a>
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
              {p.avail
                ? (es ? '● Disponible' : '● Available')
                : (es ? '○ A pedido' : '○ By request')}
            </span>
          </a>
        ))}
      </div>

      {/* ══ 01 — TALENT OS ══ */}
      <section id="talent-os" className="tw-section" style={{ scrollMarginTop: '60px' }}>
        <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: tw.green, marginBottom: '1.25rem' }}>
          01 — Talent OS
        </div>
        <h2 className="tw-ink-heavy" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: 'clamp(2rem,4.5vw,48px)', lineHeight: 1.05, letterSpacing: '0.01em', color: tw.ink, marginBottom: '1.5rem' }}>
          {es ? 'El sprint de personas de ' : 'The 100-day people '}
          <span className="tw-ul-lg" style={{ display: 'inline' }}>{es ? '100 días.' : 'sprint.'}</span>
        </h2>

        <div className="tw-section-grid">
          <div>
            <p style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '14px', lineHeight: 1.8, color: tw.inkSub, marginBottom: '2.5rem' }}>
              {es
                ? 'Acabás de cerrar tu Seed o Serie A. La presión inversora para contratar es inmediata. Pero nadie construyó el sistema para hacerlo bien. Instalamos tu Talent OS completo en 100 días — para que puedas escalar de 15 a 150 personas sin romperte.'
                : 'You just closed your Seed or Series A. Investor pressure to hire is immediate. But no one has built the system to hire well. We install your entire Talent OS in 100 days — so you can scale from 15 to 150 without breaking.'}
            </p>

            <div className="tw-phases">
              {[
                {
                  n: '01',
                  days: es ? 'Días 1–30' : 'Days 1–30',
                  title: es ? 'Diagnóstico' : 'Foundation',
                  items: es
                    ? ['Auditoría del estado actual', 'ADN cultural: valores → comportamientos', 'Baseline de compliance legal']
                    : ['Current-state audit', 'Culture DNA: values → behaviors', 'Legal compliance baseline'],
                },
                {
                  n: '02',
                  days: es ? 'Días 31–70' : 'Days 31–70',
                  title: es ? 'Construcción' : 'Build',
                  items: es
                    ? ['Motor de hiring + scorecards', 'Playbook de onboarding 30 días', 'Filosofía de compensación + bandas']
                    : ['Hiring engine + scorecards', '30-day onboarding playbook', 'Compensation philosophy + bands'],
                },
                {
                  n: '03',
                  days: es ? 'Días 71–100' : 'Days 71–100',
                  title: es ? 'Entrega' : 'Handoff',
                  items: es
                    ? ['Talent OS completo en Notion', 'Ritmo de performance instalado', 'Perfil + proceso para primera contratación de RRHH']
                    : ['Full Talent OS in Notion', 'Performance rhythm installed', 'First HR hire profile + process'],
                },
              ].map((phase) => (
                <div key={phase.title} className="tw-phase">
                  <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: tw.green, marginBottom: '6px' }}>{phase.n}</div>
                  <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', color: tw.inkFaint, marginBottom: '8px' }}>{phase.days}</div>
                  <div className="tw-ink" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: '18px', color: tw.ink, marginBottom: '10px' }}>{phase.title}</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {phase.items.map((item) => (
                      <li key={item} style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '12px', lineHeight: 1.5, color: tw.inkMid, paddingLeft: '14px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, top: '0.6em', width: '6px', height: '1px', background: tw.green, display: 'block' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '14px', fontStyle: 'italic', lineHeight: 1.7, color: tw.inkMid }}>
              {es
                ? 'No es un PDF. Es un sistema vivo que tu equipo usa el día 101 — sin nosotros.'
                : 'Not a PDF. A living system your team uses on day 101 — without us.'}
            </p>
          </div>

          <div>
            <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: tw.inkFaint, marginBottom: '12px' }}>
              {es ? 'Especificaciones del sprint' : 'Sprint specs'}
            </div>
            {[
              { k: es ? 'Duración' : 'Duration', v: '100 días' },
              { k: 'Format', v: 'Co-pilot' },
              { k: es ? 'Perfil' : 'Target', v: 'Seed → Series A' },
              { k: es ? 'Entregable' : 'Deliverable', v: 'Notion OS' },
              { k: es ? 'Escala' : 'Scale', v: '15 → 150' },
            ].map((row) => (
              <div key={row.k} className="tw-spec-row">
                <span style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '10px', letterSpacing: '0.10em', textTransform: 'uppercase', color: tw.inkFaint }}>{row.k}</span>
                <span className="tw-ink" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: '15px', color: tw.ink }}>{row.v}</span>
              </div>
            ))}
            <div style={{ marginTop: '2.5rem' }}>
              <a href="https://calendar.app.google/gthsXL3grcJiTxda6" target="_blank" rel="noopener noreferrer" className="tw-btn-primary">
                {es ? 'Agendá un diagnóstico gratis' : 'Book a free diagnostic'} &#x2192;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 02 — WORKSHOPS ══ */}
      <section id="workshops" className="tw-section" style={{ scrollMarginTop: '60px' }}>
        <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: tw.green, marginBottom: '1.25rem' }}>
          02 — {es ? 'Talleres' : 'Workshops'}
        </div>
        <h2 className="tw-ink-heavy" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: 'clamp(2rem,4.5vw,48px)', lineHeight: 1.05, letterSpacing: '0.01em', color: tw.ink, marginBottom: '1.5rem' }}>
          {es ? 'Formá a quienes ' : 'Train the people who '}
          <span className="tw-ul" style={{ display: 'inline' }}>{es ? 'contratan' : 'hire'}</span>
          {es ? ' personas.' : ' people.'}
        </h2>
        <p style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '14px', lineHeight: 1.8, color: tw.inkSub, maxWidth: '640px', marginBottom: '0' }}>
          {es
            ? 'La mayoría de los errores de hiring no son problemas de sourcing — son problemas de entrevistas. Damos talleres focalizados que convierten a founders, hiring managers y recruiters internos en evaluadores disciplinados.'
            : "Most hiring mistakes aren't sourcing problems — they're interviewing problems. We run focused workshops that turn founders, hiring managers, and internal recruiters into disciplined evaluators."}
        </p>

        <div className="tw-workshops">
          {[
            {
              tag: es ? 'Para hiring managers' : 'For hiring managers',
              title: es ? 'Contratá como un experto' : 'Hire Like an Expert',
              desc: es
                ? 'Entrevistas estructuradas, técnicas de comportamiento, evaluación por scorecard. Para líderes técnicos que entrevistan constantemente pero nunca les enseñaron cómo.'
                : 'Structured interviewing, behavioral techniques, scorecard-based evaluation. For technical leaders who interview constantly but were never taught how.',
              meta: [[es ? 'Formato' : 'Format', es ? 'Medio día' : 'Half-day'], [es ? 'Grupo' : 'Group', '15 pax'], [es ? 'Modalidad' : 'Delivery', es ? 'Presencial o remoto' : 'In-person or remote']],
            },
            {
              tag: es ? 'Para founders + RRHH' : 'For founders + HR',
              title: es ? 'Hiring Basado en Cultura' : 'Culture-Based Hiring',
              desc: es
                ? 'Traducí tus valores en comportamientos observables y medibles. Construí un proceso de hiring que seleccione por fit — no solo por habilidad — antes de hacer la primera oferta.'
                : 'Translate your values into observable, measurable behaviors. Build a hiring process that selects for fit — not just skill — before the first offer is made.',
              meta: [[es ? 'Formato' : 'Format', es ? 'Día completo' : 'Full-day'], [es ? 'Grupo' : 'Group', es ? 'Equipo de liderazgo' : 'Leadership team'], [es ? 'Modalidad' : 'Delivery', es ? 'Presencial preferido' : 'In-person preferred']],
            },
            {
              tag: es ? 'Para equipos internos' : 'For internal teams',
              title: es ? 'Bootcamp de Recruiters' : 'Recruiter Bootcamp',
              desc: es
                ? 'Un programa de múltiples sesiones para recruiters internos y equipos de TA. Cubre estrategia de sourcing, definición de rol, diseño de proceso y experiencia del candidato.'
                : 'A multi-session program for internal recruiters and TA teams. Covers sourcing strategy, role definition, process design, and candidate experience.',
              meta: [[es ? 'Formato' : 'Format', es ? 'Múltiples sesiones' : 'Multiple sessions'], [es ? 'Grupo' : 'Group', es ? 'Equipos TA/RRHH' : 'TA/HR teams'], [es ? 'Modalidad' : 'Delivery', es ? 'A medida' : 'Custom']],
            },
          ].map((card) => (
            <div key={card.title} className="tw-workshop-card">
              <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: tw.green, marginBottom: '12px' }}>{card.tag}</div>
              <div className="tw-ink" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: '20px', color: tw.ink, marginBottom: '10px', lineHeight: 1.1 }}>{card.title}</div>
              <p style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '12.5px', lineHeight: 1.7, color: tw.inkMid, marginBottom: '16px' }}>{card.desc}</p>
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
            {es ? 'Caso — Disbyte' : 'Case — Disbyte'}
          </div>
          <p style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '13.5px', lineHeight: 1.75, color: tw.inkMid, margin: 0 }}>
            {es ? (
              <>
                Disbyte nos convocó cuando se dio cuenta de que sus engineering managers tomaban decisiones de hiring basadas en intuición. Después de un día completo del taller de Hiring Basado en Cultura, unificaron sus criterios de evaluación en tres oficinas.{' '}
                <em className="tw-ul" style={{ display: 'inline' }}>Todos los niveles salieron con un lenguaje común para contratar</em>
                {' '}— y un scorecard que usan hasta hoy.
              </>
            ) : (
              <>
                Disbyte brought us in after realizing their engineering managers were making hiring decisions based on gut feel. After one full-day Culture-Based Hiring workshop, they unified their evaluation criteria across three offices.{' '}
                <em className="tw-ul" style={{ display: 'inline' }}>Every level left with a shared language for hiring</em>
                {' '}— and a scorecard they still use today.
              </>
            )}
          </p>
        </div>
      </section>

      {/* ══ 03 — MARKET INTELLIGENCE ══ */}
      <section id="market-intelligence" className="tw-section" style={{ scrollMarginTop: '60px' }}>
        <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: tw.green, marginBottom: '1.25rem' }}>
          03 — {es ? 'Inteligencia de Mercado' : 'Market Intelligence'}
        </div>
        <h2 className="tw-ink-heavy" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: 'clamp(2rem,4.5vw,48px)', lineHeight: 1.05, letterSpacing: '0.01em', color: tw.ink, marginBottom: '1.5rem' }}>
          {es ? 'Contratá con ' : 'Hire with '}
          <span className="tw-ul-lg" style={{ display: 'inline' }}>{es ? 'datos.' : 'data.'}</span>
        </h2>
        <p style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '14px', lineHeight: 1.8, color: tw.inkSub, maxWidth: '640px', marginBottom: '0' }}>
          {es
            ? 'La mayoría de las empresas toman decisiones de hiring sin ningún dato de mercado. Te damos la inteligencia para contratar mejor — basada en 17 años de sourcing activo en el ecosistema tech de LATAM.'
            : "Most companies make hiring decisions with no market data at all. We give you the intelligence to hire smarter — based on 17 years of active sourcing across LATAM's tech ecosystem."}
        </p>

        <div className="tw-stats">
          {[
            { n: '17+', label: es ? 'Años de datos de mercado activos en tech LATAM' : 'Years of active market data across LATAM tech' },
            { n: '1 de cada 4', label: es ? 'Nuestro benchmark: si menos de 1 de cada 4 avanza, paramos y realineamos' : 'Our benchmark: if less than 1 in 4 advance, we stop and realign' },
            { n: 'A → IPO', label: es ? 'Clientes en todas las etapas de crecimiento' : 'Clients across every growth stage' },
          ].map((stat) => (
            <div key={stat.n} className="tw-stat">
              <div className="tw-ink-heavy" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: 'clamp(2rem,4vw,48px)', color: tw.ink, lineHeight: 1, marginBottom: '8px' }}>{stat.n}</div>
              <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '11px', lineHeight: 1.6, color: tw.inkSub }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="tw-intel">
          {[
            {
              title: es ? 'Benchmarks salariales por rol + stack' : 'Salary Benchmarks by Role + Stack',
              desc: es
                ? '¿Cuánto ganan realmente los ingenieros en tu mercado? Segmentamos por seniority, stack y sector — no solo por promedios de país.'
                : 'What are engineers actually earning in your market? We cut by seniority, stack, and sector — not just country averages.',
            },
            {
              title: es ? 'Escasez de perfiles + mapas de time-to-hire' : 'Profile Scarcity + Time-to-Hire Maps',
              desc: es
                ? '¿Cuánto tiempo debería llevar realisticamente cubrir este rol? ¿Qué perfiles escasean? Planificá tu runway de hiring antes de necesitarlo.'
                : 'How long should it realistically take to fill this role? Which profiles are scarce? Plan your hiring runway before you need it.',
            },
            {
              title: es ? 'Por qué perdés candidatos' : "Why You're Losing Candidates",
              desc: es
                ? 'Hiciste una oferta. La rechazaron. Diagnosticamos los puntos exactos de fricción — compensación, proceso, employer brand — y los corregimos.'
                : 'You offered. They declined. We diagnose the exact friction points — compensation, process, employer brand — and fix them.',
            },
            {
              title: es ? 'Armá tu roadmap de hiring' : 'Build Your Hiring Roadmap',
              desc: es
                ? 'Un plan de hiring a 90 días calibrado según tu crecimiento, el mercado y la capacidad real de tu equipo para evaluar bien.'
                : "A 90-day hiring plan calibrated to your growth, the market, and your team's actual capacity to evaluate well.",
            },
          ].map((item) => (
            <div key={item.title} className="tw-intel-item">
              <div className="tw-ink" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: '16px', color: tw.ink, marginBottom: '8px', lineHeight: 1.2 }}>{item.title}</div>
              <p style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '12.5px', lineHeight: 1.7, color: tw.inkMid, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 04 — TABLERO ══ */}
      <section id="tablero" className="tw-section" style={{ scrollMarginTop: '60px' }}>
        <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: tw.green, marginBottom: '1.25rem' }}>
          04 — {es ? 'Tablero de Comando' : 'Talent Dashboard'}
        </div>
        <h2 className="tw-ink-heavy" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: 'clamp(2rem,4.5vw,48px)', lineHeight: 1.05, letterSpacing: '0.01em', color: tw.ink, marginBottom: '1.5rem' }}>
          {es ? 'Mirá tu talento con claridad — ' : 'See your talent clearly — '}
          <span className="tw-ul-lg" style={{ display: 'inline' }}>{es ? 'todo.' : 'all of it.'}</span>
        </h2>

        <div className="tw-tablero-grid">
          <div>
            <p style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '14px', lineHeight: 1.8, color: tw.inkSub, marginBottom: '2rem' }}>
              {es
                ? 'Un diagnóstico a medida del estado de talento de tu organización. ¿Dónde están tus riesgos? ¿Quiénes son tus personas clave? ¿Cómo está tu bench? Construido una vez, usado continuamente.'
                : 'A bespoke diagnostic of the talent state of your organization. Where are your risks? Who are your key people? What does your bench look like? Built once, used continuously.'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(26,26,26,0.08)', border: '1px solid rgba(26,26,26,0.08)', marginBottom: '2rem' }}>
              {[
                { n: es ? 'Estado actual' : 'Current state', item: es ? 'Auditoría del equipo' : 'Team audit' },
                { n: es ? 'Funnel de hiring' : 'Hiring funnel', item: es ? 'Análisis de pipeline' : 'Pipeline analysis' },
                { n: es ? 'Entregable' : 'Output', item: es ? 'Plan de acción 90 días' : '90-day action plan' },
              ].map((phase) => (
                <div key={phase.n} style={{ background: tw.bg, padding: '20px 18px' }}>
                  <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: tw.green, marginBottom: '6px' }}>{phase.n}</div>
                  <div className="tw-ink" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: '14px', color: tw.ink }}>{phase.item}</div>
                </div>
              ))}
            </div>

            <a href="https://calendar.app.google/gthsXL3grcJiTxda6" target="_blank" rel="noopener noreferrer" className="tw-btn-primary">
              {es ? 'Pedí un diagnóstico' : 'Request a diagnostic'} &#x2192;
            </a>
          </div>

          <div className="tw-dashboard">
            <div className="tw-dash-header">
              {['#FF5F57', '#FFBD2E', '#28CA41'].map((c) => (
                <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />
              ))}
              <div style={{ flex: 1, textAlign: 'center', fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '9px', letterSpacing: '0.10em', color: tw.inkFaint }}>
                {es ? 'Tablero de Comando' : 'Talent Dashboard'}
              </div>
            </div>
            <div className="tw-kpi-grid">
              {[
                { label: es ? 'Roles abiertos' : 'Open roles', val: '8', delta: es ? '+3 vs trim. anterior' : '+3 vs last qtr', pos: true },
                { label: es ? 'Time-to-hire prom.' : 'Avg time-to-hire', val: '47d', delta: es ? '+12d vs benchmark' : '+12d vs benchmark', pos: false },
                { label: es ? 'Aceptación de oferta' : 'Offer acceptance', val: '78%', delta: es ? 'Prom. mercado 72%' : 'Market avg 72%', pos: true },
                { label: es ? 'Retención 12m' : 'Retention 12m', val: '91%', delta: es ? 'Por encima del benchmark' : 'Above benchmark', pos: true },
              ].map((kpi) => (
                <div key={kpi.label} className="tw-kpi">
                  <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '7.5px', letterSpacing: '0.10em', textTransform: 'uppercase', color: tw.inkFaint, marginBottom: '4px' }}>{kpi.label}</div>
                  <div className="tw-ink" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: '22px', color: kpi.pos ? tw.green : tw.ink, lineHeight: 1 }}>{kpi.val}</div>
                  <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '7px', letterSpacing: '0.08em', color: tw.inkFaint, marginTop: '2px' }}>{kpi.delta}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '8px 16px 16px', fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '10px', color: tw.inkFaint, textAlign: 'center', fontStyle: 'italic' }}>
              {es ? 'Vista en vivo del estado de talento de tu organización' : "Live view of your organization's talent state"}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <div className="tw-cta-final">
        <div className="tw-cta-left">
          <h2 className="tw-ink-heavy" style={{ fontFamily: "'Special Elite','Courier New',monospace", fontSize: 'clamp(1.8rem,3.5vw,38px)', lineHeight: 1.1, color: tw.ink, marginBottom: '1.25rem' }}>
            {es ? '¿No sabés cuál producto es el ' : 'Not sure which product is the '}
            <span className="tw-ul" style={{ display: 'inline' }}>{es ? 'correcto?' : 'right one?'}</span>
          </h2>
          <p style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '14px', lineHeight: 1.8, color: tw.inkSub, marginBottom: '2rem' }}>
            {es
              ? 'Te lo decimos nosotros. Agendá una llamada de 30 minutos sin otra agenda que entender tu situación.'
              : "We'll tell you. Book a 30-minute call with no agenda other than understanding your situation."}
          </p>
          <a href="https://calendar.app.google/gthsXL3grcJiTxda6" target="_blank" rel="noopener noreferrer" className="tw-btn-primary">
            {es ? 'Agendá una llamada gratis de 30 min' : 'Book a free 30-min call'} &#x2192;
          </a>
        </div>

        <div className="tw-cta-right">
          <div style={{ fontFamily: "'Courier Prime','Courier New',monospace", fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: tw.inkFaint, marginBottom: '20px' }}>
            {es ? 'Encontrá tu camino' : 'Find your path'}
          </div>
          {[
            { label: es ? 'Para startups' : 'For startups', dest: 'Talent OS' },
            { label: es ? 'Para scale-ups' : 'For scale-ups', dest: es ? 'Talleres o Inteligencia de Mercado' : 'Workshops or Market Intelligence' },
            { label: es ? 'Para CHROs' : 'For CHROs', dest: es ? 'Tablero de Comando' : 'Talent Dashboard' },
            { label: es ? 'No estoy seguro/a' : 'Not sure', dest: es ? 'Hablemos' : 'Talk to us' },
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
            { label: es ? 'Método' : 'Method', href: lk('/method') },
            { label: es ? 'Servicios' : 'Services', href: lk('/services') },
            { label: 'The Practice', href: '#' },
            { label: es ? 'Casos' : 'Cases', href: lk('/work') },
            { label: es ? 'Contacto' : 'Contact', href: lk('/contact') },
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
