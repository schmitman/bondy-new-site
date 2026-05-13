/**
 * Bondy refresh — shared atoms
 * Brand v4 — Sistema Typewriter
 *
 * Tokens reflect /app/globals.css CSS variables:
 *   --tw-bg, --tw-ink, --tw-ink-mid, --tw-ink-sub, --tw-ink-faint,
 *   --tw-rule, --tw-white, --tw-green
 *
 * We expose them as hex constants so inline styles in .tsx stay simple
 * and don't break Vercel's static rendering (which has issues with
 * var() inside some CSS-in-JS / inline style contexts).
 */
import React from 'react'

export const tw = {
  bg:       '#FEFCF9',
  ink:      '#1A1A1A',
  inkMid:   '#3A3530',
  inkSub:   '#5A5550',
  inkFaint: '#7A7874',
  rule:     '#E8E4DE',
  white:    '#FFFFFF',
  green:    '#4A8C40',
  greenHover: '#3a7030',
  greenTint:  'rgba(74,140,64,0.08)',
  greenEdge:  'rgba(74,140,64,0.35)',
} as const

export const fonts = {
  display: "'Special Elite', Georgia, serif",
  body:    "'Plus Jakarta Sans', system-ui, sans-serif",
} as const

export const notebookBg = [
  'linear-gradient(90deg, transparent 68px, rgba(210,100,80,0.10) 68px, rgba(210,100,80,0.10) 69.5px, transparent 69.5px)',
  'repeating-linear-gradient(180deg, transparent 0px, transparent 31px, rgba(100,140,200,0.09) 31px, rgba(100,140,200,0.09) 32px)',
].join(',')

/* ─────────────────────────────────────────────────────────────
 * BondyUnderline — hand-drawn wavy underline (SVG inline)
 * Used after every h1/h2/h3 display title.
 * ─────────────────────────────────────────────────────────────*/
export function BondyUnderline({
  width = 200,
  strokeWidth = 2,
  color = tw.green,
  style,
}: {
  width?: number
  strokeWidth?: number
  color?: string
  style?: React.CSSProperties
}) {
  const mid = width / 2
  return (
    <svg
      width={width}
      height={8}
      viewBox={`0 0 ${width} 8`}
      fill="none"
      aria-hidden="true"
      style={{ display: 'block', ...style }}
    >
      <path
        d={`M0 4 Q${mid * 0.5} 1 ${mid} 4 Q${mid * 1.5} 7 ${width} 4`}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────
 * Kicker — `— LABEL` with leading dash + uppercase tracking
 * ─────────────────────────────────────────────────────────────*/
export function Kicker({
  children,
  color = tw.green,
  dash = true,
  size = 10,
  style,
}: {
  children: React.ReactNode
  color?: string
  dash?: boolean
  size?: number
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: fonts.body,
        fontSize: size,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color,
        fontWeight: 500,
        ...style,
      }}
    >
      {dash && (
        <span
          style={{
            width: 22,
            height: 1,
            background: color,
            opacity: 0.85,
            flexShrink: 0,
          }}
        />
      )}
      <span>{children}</span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
 * Pill — filter pill with optional count
 * ─────────────────────────────────────────────────────────────*/
export function Pill({
  children,
  count,
  active = false,
  ghost = false,
  onClick,
  as: As = 'span' as any,
  href,
}: {
  children: React.ReactNode
  count?: number | string
  active?: boolean
  ghost?: boolean
  onClick?: () => void
  as?: 'span' | 'button' | 'a'
  href?: string
}) {
  const border = active ? tw.green : (ghost ? tw.rule : tw.greenEdge)
  const color = active ? tw.green : (ghost ? tw.inkSub : tw.green)
  const bg = active ? tw.greenTint : 'transparent'
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: fonts.body,
    fontSize: 11,
    letterSpacing: '0.04em',
    padding: '5px 12px',
    border: `1px solid ${border}`,
    borderRadius: 999,
    color,
    background: bg,
    fontWeight: 500,
    cursor: onClick || href ? 'pointer' : 'default',
    textDecoration: 'none',
  }
  const inner = (
    <>
      <span>{children}</span>
      {count != null && (
        <span style={{ opacity: 0.7, fontWeight: 600 }}>{count}</span>
      )}
    </>
  )
  if (href) return <a href={href} style={baseStyle}>{inner}</a>
  if (onClick) return <button onClick={onClick} style={{ ...baseStyle, border: `1px solid ${border}` }}>{inner}</button>
  return <span style={baseStyle}>{inner}</span>
}

/* ─────────────────────────────────────────────────────────────
 * Tag — status pill (smaller than Pill, uppercase)
 * ─────────────────────────────────────────────────────────────*/
export function Tag({
  children,
  tone = 'green',
}: {
  children: React.ReactNode
  tone?: 'green' | 'faint' | 'neutral'
}) {
  const color = tone === 'green' ? tw.green : (tone === 'faint' ? tw.inkFaint : tw.inkSub)
  const border = tone === 'green' ? tw.greenEdge : tw.rule
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: fonts.body,
        fontSize: 9.5,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        padding: '4px 10px',
        border: `1px solid ${border}`,
        borderRadius: 999,
        color,
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────
 * MetaRow — right-aligned metadata line like `18 · YEARS`
 * ─────────────────────────────────────────────────────────────*/
export function MetaRow({
  n,
  label,
  align = 'right',
}: {
  n?: string
  label: string
  align?: 'left' | 'right'
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
        alignItems: 'baseline',
        gap: 10,
        fontFamily: fonts.body,
        fontSize: 10,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: tw.inkFaint,
        lineHeight: 1.8,
      }}
    >
      {n && <span style={{ color: tw.inkMid, fontWeight: 600 }}>{n}</span>}
      {n && <span style={{ opacity: 0.5 }}>·</span>}
      <span>{label}</span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
 * SectionBar — top/bottom rule with kicker left + label right
 * ─────────────────────────────────────────────────────────────*/
export function SectionBar({
  label,
  right,
  style,
}: {
  label: string
  right?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: `1px solid ${tw.rule}`,
        borderBottom: `1px solid ${tw.rule}`,
        padding: '14px 0',
        ...style,
      }}
    >
      <Kicker>{label}</Kicker>
      {right && (
        <span
          style={{
            fontFamily: fonts.body,
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: tw.inkFaint,
          }}
        >
          {right}
        </span>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
 * CTA — primary (filled green), ghost (border), link (text-only)
 * Renders as <a> when href is provided, otherwise <button>.
 * ─────────────────────────────────────────────────────────────*/
type CTAProps = {
  children: React.ReactNode
  variant?: 'primary' | 'ghost' | 'link'
  size?: 'sm' | 'md'
  href?: string
  onClick?: () => void
  style?: React.CSSProperties
  type?: 'button' | 'submit'
}

export function CTA({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  style,
  type = 'button',
}: CTAProps) {
  const px = size === 'sm' ? '10px 18px' : '13px 26px'
  const fs = size === 'sm' ? 10 : 11
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: fonts.body,
    fontSize: fs,
    letterSpacing: '0.10em',
    textTransform: 'uppercase',
    fontWeight: 500,
    padding: px,
    cursor: 'pointer',
    border: 'none',
    textDecoration: 'none',
    borderRadius: 0,
    transition: 'background 0.18s ease-out, color 0.18s ease-out',
    ...style,
  }
  let v: React.CSSProperties = {}
  if (variant === 'primary') {
    v = { background: tw.green, color: tw.white }
  } else if (variant === 'ghost') {
    v = { background: 'transparent', color: tw.inkSub, border: `1px solid ${tw.rule}` }
  } else {
    v = { background: 'none', color: tw.green, padding: 0 }
  }
  const merged = { ...base, ...v }
  if (href) {
    return (
      <a href={href} style={merged}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} style={merged}>
      {children}
    </button>
  )
}

/* ─────────────────────────────────────────────────────────────
 * FriendlyCard — "amigable" service card (tools DNA)
 * 14px radius, corner-accent triangle, large display title
 * with green accent dot, body + footer rule + CTA + counter.
 * ─────────────────────────────────────────────────────────────*/
export function FriendlyCard({
  n,
  kicker,
  title,
  accent = '.',
  body,
  status,
  statusTone = 'green',
  cta,
  href,
  counter,
}: {
  n?: string
  kicker?: string
  title: string
  accent?: string
  body: string
  status?: string
  statusTone?: 'green' | 'faint' | 'neutral'
  cta?: string
  href?: string
  counter?: string
}) {
  const cardInner = (
    <div
      style={{
        position: 'relative',
        background: tw.white,
        border: `1px solid ${tw.rule}`,
        padding: '40px 44px 32px',
        overflow: 'hidden',
        borderRadius: 14,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        color: tw.inkSub,
      }}
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        style={{ position: 'absolute', top: 0, right: 0 }}
        aria-hidden="true"
      >
        <path d="M 22 0 L 64 0 L 64 42 Z" fill={tw.green} opacity="0.88" />
      </svg>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 22,
          minHeight: 22,
        }}
      >
        {n ? (
          <span
            style={{
              fontFamily: fonts.body,
              fontSize: 11,
              letterSpacing: '0.18em',
              color: tw.inkFaint,
              fontWeight: 500,
            }}
          >
            {n}
          </span>
        ) : (
          <span />
        )}
        {status && <Tag tone={statusTone}>{status}</Tag>}
      </div>

      {kicker && <Kicker>— {kicker}</Kicker>}

      <h3
        style={{
          fontFamily: fonts.display,
          fontSize: 'clamp(2rem, 3.6vw, 2.875rem)',
          lineHeight: 1.02,
          color: tw.inkMid,
          margin: '18px 0 4px',
          opacity: 0.92,
          fontWeight: 400,
          letterSpacing: '-0.005em',
        }}
      >
        {title}
        <em style={{ fontStyle: 'normal', color: tw.green }}>{accent}</em>
      </h3>
      <BondyUnderline width={88} strokeWidth={2} />

      <p
        style={{
          fontFamily: fonts.body,
          fontSize: 15,
          lineHeight: 1.78,
          color: tw.inkSub,
          margin: '22px 0 28px',
          flexGrow: 1,
        }}
      >
        {body}
      </p>

      {(cta || counter) && (
        <div
          style={{
            borderTop: `1px solid ${tw.rule}`,
            paddingTop: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {cta && (
            <span
              style={{
                fontFamily: fonts.body,
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: tw.green,
                fontWeight: 500,
              }}
            >
              {cta} →
            </span>
          )}
          {counter && (
            <span
              style={{
                fontFamily: fonts.body,
                fontSize: 10,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: tw.inkFaint,
              }}
            >
              {counter}
            </span>
          )}
        </div>
      )}
    </div>
  )
  if (href) {
    return (
      <a
        href={href}
        style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
      >
        {cardInner}
      </a>
    )
  }
  return cardInner
}
