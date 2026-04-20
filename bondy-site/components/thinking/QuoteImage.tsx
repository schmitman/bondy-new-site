// components/thinking/QuoteImage.tsx
// Generates the editorial SVG "cover" for a /thinking article from the
// frontmatter's `quoteImage` field (a multi-line string, max 3 lines).
// The last line gets a green hand-drawn underline. Bondy logo + author name
// are anchored to the bottom-left. This SVG is the primary visual of the
// article both in the /thinking list (card) and in the detail hero.
//
// Design: minimal — only the quote typography + signature block. No watermark
// numbers, no internal notebook grid (the page background already provides it
// at the section level). Rules:
// - Max 6 words per line, max 3 lines (enforced softly — we just render)
// - Last line underlined in green (#4A8C40)
// - Bondy 4-square mark + author NAME + "BONDY · THINKING" in bottom-left
//
// The component is a pure function and can be rendered server-side.

import React from 'react'
import { splitQuoteImage } from '@/lib/thinking/articles'

export interface QuoteImageProps {
  quote: string | undefined
  author?: string
  authorInitials?: string
  /** If true, renders a compact version used inside list cards. */
  compact?: boolean
}

export default function QuoteImage({
  quote,
  author,
  authorInitials,
  compact = false,
}: QuoteImageProps) {
  const lines = splitQuoteImage(quote)
  // If no quoteImage was provided, fall back to a neutral pattern with just
  // the mark + author. This keeps older articles visually consistent.
  const hasLines = lines.length > 0

  // The SVG is authored at 280x260 (matches Alex's template). It scales
  // responsively via width='100%' + preserveAspectRatio.
  const W = 280
  const H = 260

  // Font sizing: 3 lines → 50px, 2 lines → 60px, 1 line → 74px.
  const lineFontSize =
    lines.length <= 1 ? 74 : lines.length === 2 ? 60 : 50
  const lineGap =
    lines.length <= 1 ? 0 : lines.length === 2 ? 68 : 52

  // Vertical centering of the text block within the available space
  // (above the author/logo block which sits at y ≈ 224+).
  const topPadding = 60
  const blockHeight = (lines.length - 1) * lineGap + lineFontSize
  const availableSpace = 224 - topPadding
  const startY = topPadding + (availableSpace - blockHeight) / 2 + lineFontSize * 0.85

  // Position of the underline under the last line.
  const lastLineY = startY + (lines.length - 1) * lineGap
  const underlineY = lastLineY + 8

  const authorUpper = (author ?? 'BONDY TEAM').toUpperCase()

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block', maxWidth: compact ? '100%' : 320 }}
      aria-label={hasLines ? lines.join(' ') : 'Bondy Thinking'}
      role="img"
    >
      {/* The quote lines */}
      {hasLines &&
        lines.map((line, i) => (
          <text
            key={i}
            x="24"
            y={startY + i * lineGap}
            fontFamily="'Special Elite', Georgia, serif"
            fontSize={lineFontSize}
            fill="#3A3530"
            opacity="0.92"
          >
            {line}
          </text>
        ))}

      {/* Green hand-drawn underline on the last line */}
      {hasLines && (
        <path
          d={`M24 ${underlineY} Q88 ${underlineY - 4} 152 ${underlineY} Q216 ${underlineY + 4} 256 ${underlineY}`}
          stroke="#4A8C40"
          strokeWidth="2.5"
          fill="none"
        />
      )}

      {/* Separator above the author block */}
      <line x1="24" y1="224" x2="256" y2="224" stroke="#E8E4DE" strokeWidth="1" />

      {/* Bondy 4-square mark — copied verbatim from Nav.tsx, never reconstructed */}
      <rect x="24" y="236" width="8" height="7" rx="1.5" fill="#1A1A1A" />
      <rect x="35" y="236" width="8" height="7" rx="1.5" fill="#1A1A1A" opacity="0.18" />
      <rect x="24" y="246" width="8" height="7" rx="1.5" fill="#1A1A1A" opacity="0.42" />
      <rect x="35" y="246" width="8" height="7" rx="1.5" fill="#4A8C40" />

      {/* Author + "BONDY · THINKING" label */}
      <text
        x="50"
        y="244"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="7.5"
        fill="#7A7874"
        letterSpacing="1"
      >
        {authorUpper}
      </text>
      <text
        x="50"
        y="254"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="7"
        fill="#4A8C40"
        letterSpacing="1"
      >
        BONDY · THINKING
      </text>

      {/* Fallback initials watermark when no quote is provided (so the card
          doesn't look empty for legacy articles). */}
      {!hasLines && authorInitials && (
        <text
          x={W / 2}
          y={130}
          textAnchor="middle"
          fontFamily="'Special Elite', Georgia, serif"
          fontSize="84"
          fill="#3A3530"
          opacity="0.14"
        >
          {authorInitials}
        </text>
      )}
    </svg>
  )
}
