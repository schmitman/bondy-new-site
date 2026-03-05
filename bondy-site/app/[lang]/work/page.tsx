'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState } from 'react'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'

// ── COPY ─────────────────────────────────────────────────────────────
const copy = {
  en: {
    label: 'Work',
    h1a: "What we've",
    h1b: 'actually built.',
    intro: "Not case studies written for marketing. Real engagements — what the challenge was, what we did, and what happened.",
    mapLabel: 'Geographic reach',
    mapSub: 'projects mapped',
    casesLabel: 'Selected engagements',
    industriesLabel: 'Industries we\'ve hired for',
    ctaLabel: 'Ready to be next?',
    ctaH2a: 'Tell us what you',
    ctaH2b: 'need to build.',
    ctaBtn: 'Start a search ↗',
    readMore: 'Read →',
    close: 'Close ↑',
    challenge: 'The challenge',
    approach: 'Our approach',
    result: 'The result',
  },
  es: {
    label: 'Trabajo',
    h1a: 'Lo que',
    h1b: 'realmente construimos.',
    intro: 'No son casos de éxito escritos para marketing. Son proyectos reales — cuál fue el desafío, qué hicimos y qué pasó.',
    mapLabel: 'Alcance geográfico',
    mapSub: 'proyectos mapeados',
    casesLabel: 'Proyectos seleccionados',
    industriesLabel: 'Industrias en las que contratamos',
    ctaLabel: '¿Listo para ser el siguiente?',
    ctaH2a: 'Contanos qué',
    ctaH2b: 'necesitás construir.',
    ctaBtn: 'Iniciar una búsqueda ↗',
    readMore: 'Leer →',
    close: 'Cerrar ↑',
    challenge: 'El desafío',
    approach: 'Nuestro enfoque',
    result: 'El resultado',
  },
}

// ── STATS ─────────────────────────────────────────────────────────────
const stats = {
  en: [
    { value: '450+', label: 'Hirings completed',      sub: 'since 2008' },
    { value: '70+',  label: 'Client companies',       sub: 'across 3 continents' },
    { value: '94%',  label: 'Retention at 6 months',  sub: 'industry avg: ~60%' },
    { value: '16',   label: 'Years in market',         sub: 'founded Buenos Aires, 2008' },
  ],
  es: [
    { value: '450+', label: 'Contrataciones realizadas', sub: 'desde 2008' },
    { value: '70+',  label: 'Empresas clientes',         sub: 'en 3 continentes' },
    { value: '94%',  label: 'Retención a 6 meses',       sub: 'promedio industria: ~60%' },
    { value: '16',   label: 'Años en el mercado',         sub: 'fundada Buenos Aires, 2008' },
  ],
}

// ── REGIONS ───────────────────────────────────────────────────────────
const regions = [
  { label: 'United States', projects: 44, x: 19, y: 38 },
  { label: 'Argentina',     projects: 34, x: 29, y: 76 },
  { label: 'México',        projects: 6,  x: 17, y: 50 },
  { label: 'España',        projects: 2,  x: 47, y: 31 },
  { label: 'Germany',       projects: 1,  x: 51, y: 27 },
  { label: 'Global/Remote', projects: 60, x: 73, y: 44 },
]

// ── CASE STUDIES ──────────────────────────────────────────────────────
const cases = [
  {
    slug: 'redhat',
    client: 'Red Hat',
    type: { en: 'Market Study + Consulting', es: 'Estudio de Mercado + Consultoría' },
    region: 'LATAM — Argentina, Perú, Chile, Brasil',
    year: '2023–2024',
    headline: {
      en: 'Mapping senior tech talent across Latin America for a global enterprise',
      es: 'Mapeo de talento técnico senior en toda América Latina para una empresa global',
    },
    challenge: {
      en: "Red Hat needed to understand the availability and compensation landscape for senior technical profiles — Java Engineers, Software Architects, Cloud Infrastructure specialists — across four countries simultaneously. A traditional search alone wouldn't answer the question: they needed market intelligence, not just a shortlist.",
      es: 'Red Hat necesitaba entender la disponibilidad y el contexto salarial de perfiles técnicos senior — Programadores Java, Arquitectos de Software, especialistas en Cloud — en cuatro países simultáneamente. Una búsqueda tradicional sola no respondía la pregunta: necesitaban inteligencia de mercado, no sólo un shortlist.',
    },
    approach: {
      en: "Bondy ran a regional talent mapping exercise across Argentina, Perú, Chile and Brazil. We analyzed 156 profiles in total — conducting structured evaluations on technical depth, compensation expectations, and market availability. The engagement combined direct sourcing with strategic consulting to deliver a complete picture of the market, not just candidates.",
      es: 'Bondy realizó un mapeo regional de talento en Argentina, Perú, Chile y Brasil. Analizamos 156 perfiles en total, realizando evaluaciones estructuradas sobre profundidad técnica, expectativas salariales y disponibilidad de mercado. El proyecto combinó sourcing directo con consultoría estratégica para entregar una visión completa del mercado, no sólo candidatos.',
    },
    result: {
      en: "One hire placed (Programador Java, Perú). More importantly: Red Hat received a comprehensive market map covering 4 countries and 156 profiles, with clarity on realistic compensation ranges, candidate availability by country, and architectural talent density in the region — intelligence that informed their hiring strategy well beyond the immediate openings.",
      es: 'Una contratación realizada (Programador Java, Perú). Más importante: Red Hat recibió un mapa de mercado completo que cubre 4 países y 156 perfiles, con claridad sobre rangos salariales realistas, disponibilidad de candidatos por país y densidad de talento arquitectónico en la región — inteligencia que informó su estrategia de contratación mucho más allá de las posiciones abiertas inmediatas.',
    },
    metrics: [
      { n: '156', label: { en: 'profiles analyzed',  es: 'perfiles analizados' } },
      { n: '4',   label: { en: 'countries covered',  es: 'países cubiertos' } },
      { n: '11',  label: { en: 'roles mapped',        es: 'roles mapeados' } },
    ],
    tags: ['Market Intelligence', 'Senior Technical', 'LATAM', 'Java / AWS / Cloud'],
  },
  {
    slug: 'arcor',
    client: 'Arcor',
    type: { en: 'Embedded Recruiter / RPO', es: 'Recruiter Embebido / RPO' },
    region: 'Argentina + Bolivia',
    year: '2022–2023',
    headline: {
      en: 'Building technical teams from scratch in markets with no existing playbook',
      es: 'Construir equipos técnicos desde cero en mercados sin playbook previo',
    },
    challenge: {
      en: "Arcor needed to hire technical profiles in two markets with very different constraints — Argentina and Bolivia. In Bolivia especially, there were no established salary benchmarks for tech roles, few active candidates in the relevant profiles, and no recruiter with reliable expertise in the local market.",
      es: 'Arcor necesitaba contratar perfiles técnicos en dos mercados con restricciones muy distintas — Argentina y Bolivia. En Bolivia especialmente, no había benchmarks salariales establecidos para roles tech, pocos candidatos activos en los perfiles relevantes, y ningún recruiter con expertise confiable en el mercado local.',
    },
    approach: {
      en: "Bondy deployed an embedded recruiting model in both markets: we operated as an extension of their HR team, running end-to-end sourcing and selection. In Bolivia, this meant building sourcing channels from scratch, establishing compensation references for a market with no precedent, and adapting screening criteria to local availability. In Argentina, we activated our existing network with the specific constraints of a large enterprise client.",
      es: 'Bondy desplegó un modelo de recruiting embebido en ambos mercados: operamos como extensión de su equipo de RRHH, gestionando el sourcing y la selección de punta a punta. En Bolivia, esto implicó construir canales de sourcing desde cero, establecer referencias salariales para un mercado sin precedentes, y adaptar los criterios de screening a la disponibilidad real. En Argentina, activamos nuestra red existente con las restricciones específicas de un cliente corporativo grande.',
    },
    result: {
      en: "Technical hires completed in both countries. Arcor gained not just candidates, but a repeatable process and market intelligence — particularly for Bolivia — that they could continue to leverage internally.",
      es: 'Contrataciones técnicas completadas en ambos países. Arcor obtuvo no sólo candidatos, sino un proceso replicable e inteligencia de mercado — especialmente para Bolivia — que pudieron seguir aprovechando internamente.',
    },
    metrics: [
      { n: 'RPO',  label: { en: 'engagement model',        es: 'modelo de trabajo' } },
      { n: '2',    label: { en: 'markets operated in',     es: 'mercados abordados' } },
      { n: '0→✓', label: { en: 'Bolivia benchmarks built', es: 'benchmarks Bolivia construidos' } },
    ],
    tags: ['RPO', 'Embedded', 'Argentina', 'Bolivia', 'Market Entry'],
  },
  {
    slug: 'disbyte',
    client: 'Disbyte',
    type: { en: 'TA Consulting + Capability Building', es: 'Consultoría TA + Capacitación' },
    region: 'Argentina',
    year: '2024',
    headline: {
      en: 'Training a team to hire well — not just filling their open roles',
      es: 'Capacitar a un equipo para contratar bien — no sólo cubrir sus posiciones abiertas',
    },
    challenge: {
      en: "Disbyte had hiring managers involved in selection who weren't equipped to run structured interviews. The process was inconsistent: subjective feedback, no shared evaluation criteria, and decisions based on gut feel rather than observable evidence. The ask wasn't just 'help us hire' — it was 'help us build a hiring capability we can run ourselves.'",
      es: 'Disbyte tenía hiring managers involucrados en la selección que no estaban equipados para conducir entrevistas estructuradas. El proceso era inconsistente: feedback subjetivo, sin criterios de evaluación compartidos, y decisiones basadas en intuición en lugar de evidencia observable. El pedido no era sólo "ayúdanos a contratar" — era "ayúdanos a construir una capacidad de contratación que podamos operar solos."',
    },
    approach: {
      en: "Bondy designed and delivered a full interview training workshop for Disbyte's leaders — covering structured interviewing techniques, STAR methodology, scorecard design, and cognitive bias recognition. Alongside the training, we built a candidate database architecture for their ongoing searches and designed a complete hiring blueprint: from kick-off template to feedback protocol. All materials were delivered as a shared Notion workspace the team could keep using independently.",
      es: 'Bondy diseñó y ejecutó un taller completo de capacitación en entrevistas para los líderes de Disbyte — cubriendo técnicas de entrevista estructurada, metodología STAR, diseño de scorecards y reconocimiento de sesgos cognitivos. Junto al taller, armamos la arquitectura de una base de datos de candidatos para sus búsquedas continuas y diseñamos un blueprint completo de contratación: desde el template de kickoff hasta el protocolo de feedback. Todos los materiales fueron entregados como un workspace de Notion compartido que el equipo puede seguir usando de forma independiente.',
    },
    result: {
      en: "Disbyte's hiring managers now run structured interviews with shared scorecards and a common feedback language. They have a candidate database, a repeatable hiring process, and a resource library they own. The engagement ended with the team being more self-sufficient — which was the whole point.",
      es: 'Los hiring managers de Disbyte ahora conducen entrevistas estructuradas con scorecards compartidos y un lenguaje de feedback común. Tienen una base de datos de candidatos, un proceso de contratación replicable y una biblioteca de recursos propia. El proyecto terminó con el equipo siendo más autosuficiente — que era exactamente el objetivo.',
    },
    metrics: [
      { n: '1',     label: { en: 'full training workshop delivered', es: 'taller de capacitación completo' } },
      { n: 'DB',    label: { en: 'candidate database architected',   es: 'base de candidatos diseñada' } },
      { n: 'Notion',label: { en: 'resource library, owned by client', es: 'biblioteca de recursos, del cliente' } },
    ],
    tags: ['TA Consulting', 'Hiring Capability', 'Scorecards', 'Interview Training', 'Argentina'],
  },
]

const industries = [
  'B2B SaaS', 'Fintech', 'Gaming', 'E-commerce', 'Data & Analytics',
  'Blockchain / Web3', 'Healthcare Tech', 'Logistics Tech', 'Telecom',
  'Enterprise Software', 'Marketplace', 'EdTech',
]

// ── MAP ───────────────────────────────────────────────────────────────
function WorldMap({ lang }: { lang: Lang }) {
  const [hovered, setHovered] = useState<string | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  // viewBox 0 0 1000 500 — equirectangular projection
  // Dots positioned in % of viewBox (x/10, y/5)
  const regionDots = [
    { label: 'United States', projects: 44, cx: 175, cy: 180, },
    { label: 'Argentina',     projects: 34, cx: 270, cy: 370, },
    { label: 'Mexico',        projects: 6,  cx: 185, cy: 230, },
    { label: 'Spain',         projects: 2,  cx: 455, cy: 125, },
    { label: 'Germany',       projects: 1,  cx: 495, cy: 100, },
    { label: 'Global/Remote', projects: 60, cx: 500, cy: 60,  },
  ]

  return (
    <div>
      <div className="relative w-full" style={{ paddingBottom: '50%', background: '#0D0D0D', borderRadius: 2 }}>
        <svg
          viewBox="0 0 1000 500"
          className="absolute inset-0 w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* North America */}
          <path
            d="M 80,60 L 100,50 L 130,48 L 155,52 L 175,60 L 195,72 L 210,88 L 218,105 L 215,122 L 205,138 L 190,150 L 175,158 L 158,162 L 140,158 L 122,148 L 108,132 L 98,115 L 90,98 L 82,80 Z M 130,165 L 150,162 L 168,168 L 182,178 L 192,192 L 195,210 L 190,228 L 175,238 L 158,240 L 140,232 L 128,218 L 120,202 L 118,186 Z"
            fill="#F9F8F6" opacity="0.07" stroke="#F9F8F6" strokeWidth="0.8"
          />
          {/* Greenland */}
          <path
            d="M 195,22 L 215,18 L 232,22 L 240,34 L 238,48 L 225,56 L 208,52 L 198,40 Z"
            fill="#F9F8F6" opacity="0.05" stroke="#F9F8F6" strokeWidth="0.6"
          />
          {/* South America */}
          <path
            d="M 220,248 L 240,240 L 260,242 L 278,250 L 290,265 L 296,285 L 298,308 L 293,332 L 282,355 L 268,374 L 250,388 L 232,392 L 216,384 L 204,368 L 198,348 L 196,326 L 200,305 L 208,285 L 212,265 Z"
            fill="#F9F8F6" opacity="0.07" stroke="#F9F8F6" strokeWidth="0.8"
          />
          {/* Europe */}
          <path
            d="M 440,58 L 460,52 L 480,55 L 498,65 L 510,80 L 508,96 L 495,108 L 475,114 L 455,110 L 440,98 L 432,84 L 434,70 Z M 445,118 L 462,114 L 478,118 L 490,128 L 492,142 L 480,152 L 462,155 L 446,148 L 438,136 L 436,124 Z"
            fill="#F9F8F6" opacity="0.07" stroke="#F9F8F6" strokeWidth="0.8"
          />
          {/* Africa */}
          <path
            d="M 448,145 L 470,138 L 495,140 L 518,150 L 535,168 L 542,190 L 545,215 L 540,242 L 530,268 L 515,292 L 495,310 L 472,320 L 450,316 L 430,302 L 416,280 L 408,255 L 406,228 L 410,202 L 418,178 L 428,160 Z"
            fill="#F9F8F6" opacity="0.07" stroke="#F9F8F6" strokeWidth="0.8"
          />
          {/* Asia (main) */}
          <path
            d="M 505,48 L 565,38 L 635,35 L 710,38 L 778,45 L 830,55 L 862,70 L 872,88 L 860,108 L 835,122 L 800,132 L 758,140 L 712,148 L 665,152 L 620,150 L 578,142 L 540,130 L 515,115 L 502,98 L 498,78 L 498,62 Z"
            fill="#F9F8F6" opacity="0.07" stroke="#F9F8F6" strokeWidth="0.8"
          />
          {/* Southeast Asia + India */}
          <path
            d="M 618,158 L 648,155 L 675,162 L 692,178 L 695,198 L 682,215 L 660,220 L 638,214 L 622,198 L 616,178 Z M 555,140 L 572,150 L 580,168 L 575,188 L 560,198 L 542,195 L 530,180 L 530,162 L 540,150 Z"
            fill="#F9F8F6" opacity="0.06" stroke="#F9F8F6" strokeWidth="0.7"
          />
          {/* Australia */}
          <path
            d="M 728,292 L 768,280 L 808,282 L 840,295 L 858,315 L 858,340 L 842,360 L 815,372 L 782,372 L 750,358 L 728,336 L 718,312 L 718,298 Z"
            fill="#F9F8F6" opacity="0.07" stroke="#F9F8F6" strokeWidth="0.8"
          />
          {/* New Zealand */}
          <path
            d="M 880,342 L 892,335 L 902,342 L 905,355 L 898,365 L 886,362 L 878,352 Z"
            fill="#F9F8F6" opacity="0.05" stroke="#F9F8F6" strokeWidth="0.6"
          />
          {/* Japan */}
          <path
            d="M 828,95 L 840,88 L 850,92 L 852,104 L 844,112 L 832,108 Z"
            fill="#F9F8F6" opacity="0.05" stroke="#F9F8F6" strokeWidth="0.6"
          />

          {/* Grid lines - very subtle */}
          <line x1="0" y1="250" x2="1000" y2="250" stroke="#F9F8F6" strokeWidth="0.3" opacity="0.05"/>
          <line x1="500" y1="0" x2="500" y2="500" stroke="#F9F8F6" strokeWidth="0.3" opacity="0.05"/>

          {/* Dots */}
          {regionDots.map((r) => {
            const isHovered = hovered === r.label
            const baseR = Math.max(8, Math.min(20, r.projects / 2.5))
            return (
              <g
                key={r.label}
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => {
                  setHovered(r.label)
                  const svg = (e.currentTarget as SVGGElement).ownerSVGElement!
                  const rect = svg.getBoundingClientRect()
                  setTooltipPos({
                    x: (r.cx / 1000) * 100,
                    y: (r.cy / 500) * 100,
                  })
                }}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Pulse ring */}
                <circle
                  cx={r.cx} cy={r.cy}
                  r={baseR * 2}
                  fill="#C06A2D"
                  opacity={isHovered ? 0.15 : 0.05}
                />
                {/* Main dot */}
                <circle
                  cx={r.cx} cy={r.cy}
                  r={baseR}
                  fill={isHovered ? '#C06A2D' : '#E05C00'}
                  opacity={0.9}
                  style={{ filter: isHovered ? 'drop-shadow(0 0 8px #C06A2D80)' : 'none' }}
                />
                {/* Inner highlight */}
                <circle
                  cx={r.cx - baseR * 0.25} cy={r.cy - baseR * 0.25}
                  r={baseR * 0.35}
                  fill="white"
                  opacity={0.25}
                />
              </g>
            )
          })}
        </svg>

        {/* Tooltip — positioned absolute over the map */}
        {hovered && (() => {
          const r = regionDots.find(d => d.label === hovered)!
          return (
            <div
              className="absolute z-20 pointer-events-none"
              style={{
                left: `${(r.cx / 1000) * 100}%`,
                top: `${(r.cy / 500) * 100}%`,
                transform: 'translate(-50%, -130%)',
              }}
            >
              <div style={{
                background: '#1A1A1A',
                border: '1px solid rgba(255,255,255,0.12)',
                padding: '8px 14px',
                whiteSpace: 'nowrap',
              }}>
                <div className="font-mono-bondy text-[9px] tracking-widest uppercase text-b-orange mb-1">
                  {r.label}
                </div>
                <div className="font-display text-sm font-bold text-b-off">
                  {r.projects} {lang === 'es' ? 'proyectos' : 'projects'}
                </div>
              </div>
              {/* Arrow */}
              <div style={{
                width: 0, height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid rgba(255,255,255,0.12)',
                margin: '0 auto',
              }}/>
            </div>
          )
        })()}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-5">
        {regionDots.map((r) => (
          <div
            key={r.label}
            className="flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setHovered(r.label)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className="rounded-full flex-shrink-0 transition-all duration-150"
              style={{
                width: Math.max(5, Math.min(11, r.projects / 5)),
                height: Math.max(5, Math.min(11, r.projects / 5)),
                background: hovered === r.label ? '#C06A2D' : '#E05C00',
              }}
            />
            <span className="font-mono-bondy text-[10px] tracking-widest text-b-mid">
              {r.label} <span className="text-white/25">({r.projects})</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── PAGE ──────────────────────────────────────────────────────────────
export default function WorkPage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  const tr = t(lang)
  const lk = (href: string) => `/${lang}${href}`
  const c = copy[lang]
  const [openCase, setOpenCase] = useState<string | null>(null)

  return (
    <main className="bg-b-black min-h-screen">
      <Nav lang={lang} tr={tr.nav} />

      {/* ── HEADER + STATS ── */}
      <section className="pt-[73px] border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="px-8 md:px-16 py-20 md:py-28 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between">
            <div>
              <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange mb-8">
                {c.label}
              </div>
              <h1 className="font-display text-[clamp(48px,6vw,80px)] font-black leading-tight tracking-tight text-b-off mb-6">
                {c.h1a}<br />
                <em className="text-b-orange italic">{c.h1b}</em>
              </h1>
              <p className="text-b-mid text-[16px] leading-relaxed font-light max-w-md">
                {c.intro}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2">
            {stats[lang].map((s, i) => (
              <div
                key={s.label}
                className={`px-8 py-10 md:px-10 md:py-12 flex flex-col justify-between
                  ${i % 2 === 0 ? 'border-r border-white/10' : ''}
                  ${i < 2 ? 'border-b border-white/10' : ''}
                `}
              >
                <span className="font-mono-bondy text-[9px] tracking-widest uppercase text-white/25 leading-relaxed">
                  {s.sub}
                </span>
                <div>
                  <div className="font-display text-[52px] md:text-[60px] font-black leading-none text-b-off tracking-tight">
                    {s.value.endsWith('+')
                      ? <>{s.value.slice(0, -1)}<span className="text-b-orange text-[28px]">+</span></>
                      : s.value
                    }
                  </div>
                  <div className="text-b-mid text-xs font-light mt-2 leading-relaxed">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="border-b border-white/10">
        <div className="px-8 md:px-16 py-8 border-b border-white/10">
          <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange">
            {c.mapLabel}
          </div>
        </div>
        <div className="px-8 md:px-16 py-12">
          <WorldMap lang={lang} />
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section className="border-b border-white/10">
        <div className="px-8 md:px-16 py-8 border-b border-white/10">
          <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange">
            {c.casesLabel}
          </div>
        </div>

        <div className="divide-y divide-white/10">
          {cases.map((cs, idx) => (
            <div key={cs.slug}>
              <div
                className="px-8 md:px-16 py-10 md:py-12 grid grid-cols-1 md:grid-cols-[56px_1fr_auto] gap-6 md:gap-10 items-start cursor-pointer group hover:bg-white/[0.02] transition-colors"
                onClick={() => setOpenCase(openCase === cs.slug ? null : cs.slug)}
              >
                <span className="font-mono-bondy text-[10px] text-b-orange tracking-widest pt-1">
                  0{idx + 1}
                </span>

                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-b-off tracking-tight">
                      {cs.client}
                    </h2>
                    <span className="font-mono-bondy text-[9px] tracking-widest uppercase text-b-orange border border-b-orange/25 px-2 py-1">
                      {cs.type[lang]}
                    </span>
                  </div>
                  <p className="text-b-mid text-[15px] font-light leading-relaxed max-w-2xl mb-4">
                    {cs.headline[lang]}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono-bondy text-[9px] tracking-widest text-white/30">{cs.region}</span>
                    <span className="text-white/15">·</span>
                    <span className="font-mono-bondy text-[9px] tracking-widest text-white/25">{cs.year}</span>
                  </div>
                </div>

                <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-mid group-hover:text-b-orange transition-colors pt-1 shrink-0">
                  {openCase === cs.slug ? c.close : c.readMore}
                </div>
              </div>

              {openCase === cs.slug && (
                <div className="border-t border-white/10 bg-white/[0.015] px-8 md:px-16 py-12 md:py-16">
                  <div className="grid grid-cols-3 gap-8 mb-14 pb-14 border-b border-white/10">
                    {cs.metrics.map((m) => (
                      <div key={m.label[lang]} className="border-l-2 border-b-orange/20 pl-6">
                        <div className="font-display text-[40px] font-black text-b-off leading-none mb-2">
                          {m.n}
                        </div>
                        <div className="font-mono-bondy text-[9px] tracking-widest uppercase text-b-mid">
                          {m.label[lang]}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div>
                      <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange mb-5">
                        {c.challenge}
                      </div>
                      <p className="text-b-mid text-[14px] leading-relaxed font-light">{cs.challenge[lang]}</p>
                    </div>
                    <div>
                      <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange mb-5">
                        {c.approach}
                      </div>
                      <p className="text-b-mid text-[14px] leading-relaxed font-light">{cs.approach[lang]}</p>
                    </div>
                    <div>
                      <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange mb-5">
                        {c.result}
                      </div>
                      <p className="text-b-mid text-[14px] leading-relaxed font-light">{cs.result[lang]}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-10">
                    {cs.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono-bondy text-[9px] tracking-widest uppercase text-white/50 border border-white/20 px-3 py-1.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="border-b border-white/10 px-8 md:px-16 py-14">
        <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange mb-8">
          {c.industriesLabel}
        </div>
        <div className="flex flex-wrap gap-3">
          {industries.map((ind) => (
            <span
              key={ind}
              className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-mid border border-white/10 px-4 py-2 hover:border-white/25 hover:text-b-off transition-colors"
            >
              {ind}
            </span>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-8 md:px-16 py-24 md:py-36 text-center">
        <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange mb-8">
          {c.ctaLabel}
        </div>
        <h2 className="font-display text-[clamp(36px,5vw,64px)] font-black leading-tight tracking-tight text-b-off mb-10">
          {c.ctaH2a}<br />
          <em className="text-b-orange italic">{c.ctaH2b}</em>
        </h2>
        <Link
          href={`/${lang}/contact`}
          className="inline-flex items-center gap-3 bg-b-orange text-b-black font-mono-bondy text-[11px] tracking-widest uppercase px-10 py-5 hover:bg-b-orange/90 transition-colors"
        >
          {c.ctaBtn}
        </Link>
      </section>

      <Footer lang={lang} tr={tr.footer} />
    </main>
  )
}
