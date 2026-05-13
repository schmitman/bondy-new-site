/**
 * HeroV2 — editorial hero with metadata aside.
 * Replaces the giant ~92vh hero across wearebondy.com pages.
 *
 * Layout:
 *   - 2-col grid `minmax(0,1fr) 240px`, gap 80px
 *   - On mobile (< 720px), collapses to a single column and
 *     puts the aside metadata BELOW the title block.
 *
 * Usage:
 *   <HeroV2
 *     kicker="Wearebondy.com · Est. 2008"
 *     title={<>Technical <em>recruiting,</em><br/>built right.</>}
 *     underlineWidth={320}
 *     body="..."
 *     primaryCta={{ label: 'Talk to us', href: '/contact' }}
 *     secondaryCta={{ label: 'Our method', href: '/method' }}
 *     meta={[
 *       { n: '18', label: 'Years' },
 *       { n: '92%', label: 'Retention' },
 *       { n: '5–7d', label: 'Shortlist' },
 *       { label: 'Buenos Aires', separatorBefore: true },
 *       { label: 'Remote · LATAM' },
 *     ]}
 *   />
 */
import React from 'react'
import Link from 'next/link'
import { tw, fonts, BondyUnderline, Kicker, MetaRow, CTA } from './atoms'

export type HeroMetaItem = {
  n?: string
  label: string
  separatorBefore?: boolean
}

export type HeroCta = {
  label: string
  href: string
}

export type HeroV2Props = {
  kicker?: string
  title: React.ReactNode
  /** Width of the wavy underline in px. Default 320 for home, 260 for inner pages. */
  underlineWidth?: number
  body?: React.ReactNode
  primaryCta?: HeroCta
  secondaryCta?: HeroCta
  meta?: HeroMetaItem[]
  /** Override outer padding (defaults to '64px clamp(1.5rem, 5vw, 56px) 48px') */
  padding?: string
  /** Optional title size override. Defaults to clamp(2.75rem, 6.8vw, 5.25rem) (44–84px) */
  titleSize?: string
  /** Optional background — if provided, applied to the hero wrapper. */
  background?: string
}

export default function HeroV2({
  kicker,
  title,
  underlineWidth = 320,
  body,
  primaryCta,
  secondaryCta,
  meta,
  padding,
  titleSize,
  background,
}: HeroV2Props) {
  const wrapperStyle: React.CSSProperties = {
    padding: padding ?? '64px clamp(1.5rem, 5vw, 56px) 48px',
    ...(background ? { background } : {}),
  }
  return (
    <section className="bondy-hero-v2" style={wrapperStyle}>
      <div className="bondy-hero-v2__grid">
        <div className="bondy-hero-v2__main">
          {kicker && <Kicker>— {kicker}</Kicker>}

          <h1
            className="tw-ink-heavy bondy-hero-v2__title"
            style={{
              fontFamily: fonts.display,
              fontSize: titleSize ?? 'clamp(2.75rem, 6.8vw, 5.25rem)',
              lineHeight: 0.98,
              color: tw.inkMid,
              margin: '32px 0 14px',
              fontWeight: 400,
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </h1>

          <BondyUnderline width={underlineWidth} strokeWidth={2.2} />

          {body && (
            <p
              style={{
                fontFamily: fonts.body,
                fontSize: 16,
                lineHeight: 1.78,
                color: tw.inkSub,
                maxWidth: 540,
                marginTop: 34,
              }}
            >
              {body}
            </p>
          )}

          {(primaryCta || secondaryCta) && (
            <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
              {primaryCta && (
                <Link href={primaryCta.href} style={ctaStyle('primary')}>
                  {primaryCta.label} →
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.href} style={ctaStyle('ghost')}>
                  {secondaryCta.label} →
                </Link>
              )}
            </div>
          )}
        </div>

        {meta && meta.length > 0 && (
          <aside className="bondy-hero-v2__aside">
            {meta.map((m, i) => (
              <React.Fragment key={i}>
                {m.separatorBefore && (
                  <div style={{ borderTop: `1px solid ${tw.rule}`, margin: '12px 0' }} />
                )}
                <MetaRow n={m.n} label={m.label} />
              </React.Fragment>
            ))}
          </aside>
        )}
      </div>

    </section>
  )
}

function ctaStyle(variant: 'primary' | 'ghost'): React.CSSProperties {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: fonts.body,
    fontSize: 11,
    letterSpacing: '0.10em',
    textTransform: 'uppercase',
    fontWeight: 500,
    padding: '13px 26px',
    textDecoration: 'none',
    transition: 'background 0.18s ease-out, color 0.18s ease-out',
  }
  if (variant === 'primary') {
    return { ...base, background: tw.green, color: tw.white }
  }
  return { ...base, background: 'transparent', color: tw.inkSub, border: `1px solid ${tw.rule}` }
}
