'use client'

import { useEffect, useRef, useState } from 'react'

type Variant = 'compact' | 'full'

type Props = {
  url: string
  title: string
  company?: string
  lang?: 'en' | 'es'
  variant?: Variant
}

const tw = {
  ink: '#1A1A1A',
  inkSub: '#5A5550',
  inkFaint: '#7A7874',
  rule: '#E8E4DE',
  white: '#FFFFFF',
  green: '#4A8C40',
}

const mono = "'Plus Jakarta Sans', system-ui, sans-serif"

/**
 * Share popover with link / WhatsApp / Email / LinkedIn options.
 * Self-contained client component intended for use inside server components.
 */
export default function RoleShareButton({
  url,
  title,
  company,
  lang = 'es',
  variant = 'compact',
}: Props) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const shareUrl = (() => {
    try {
      const u = new URL(url)
      u.searchParams.set('utm_source', 'bondy')
      u.searchParams.set('utm_medium', 'share')
      u.searchParams.set('utm_campaign', 'roles')
      return u.toString()
    } catch {
      return url
    }
  })()

  const viaBondy = lang === 'en' ? 'via Bondy' : 'vía Bondy'
  const text = company ? `${title} — ${company} (${viaBondy})` : `${title} (${viaBondy})`

  const wa = `https://wa.me/?text=${encodeURIComponent(`${text}\n${shareUrl}`)}`
  const mailto = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(`${text}\n\n${shareUrl}`)}`
  const li = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`

  const onCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // silent
    }
  }

  const onToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setOpen((v) => !v)
  }

  const L = lang === 'en'
    ? { share: 'Share', copy: 'Copy link', copied: 'Link copied', email: 'Email', aria: 'Share this role' }
    : { share: 'Compartir', copy: 'Copiar link', copied: 'Link copiado', email: 'Email', aria: 'Compartir esta posición' }

  const triggerStyle: React.CSSProperties = variant === 'compact'
    ? {
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: '34px', height: '34px',
        background: 'transparent', border: `1px solid ${tw.rule}`,
        borderRadius: '2px', cursor: 'pointer', color: tw.inkSub,
        transition: 'border-color 0.15s, color 0.15s',
      }
    : {
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        padding: '10px 16px',
        background: tw.white, border: `1px solid ${tw.rule}`,
        borderRadius: '2px', cursor: 'pointer', color: tw.ink,
        fontFamily: mono, fontSize: '11px', letterSpacing: '0.12em',
        textTransform: 'uppercase',
        transition: 'border-color 0.15s, background 0.15s',
      }

  const itemStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '10px',
    width: '100%', textAlign: 'left',
    padding: '10px 14px',
    background: 'transparent', border: 'none',
    fontFamily: mono, fontSize: '13px', color: tw.ink,
    textDecoration: 'none', cursor: 'pointer',
    transition: 'background 0.12s',
  }

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }} onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={onToggle}
        aria-label={L.aria}
        aria-expanded={open}
        title={L.share}
        style={triggerStyle}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = tw.green }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = tw.rule }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M18 8a3 3 0 1 0-2.83-4H15a3 3 0 0 0 .17 1.97L8.83 9.03A3 3 0 1 0 6 13a3 3 0 0 0 2.83-1.97l6.34 3.06A3 3 0 1 0 18 16a3 3 0 0 0-2.83 1.97L8.83 14.9A3.03 3.03 0 0 0 9 13a3 3 0 0 0-.17-1.97l6.34-3.06A3 3 0 0 0 18 8Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
        {variant === 'full' && <span>{L.share}</span>}
      </button>

      {open && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            minWidth: '180px',
            background: tw.white,
            border: `1px solid ${tw.rule}`,
            boxShadow: '0 8px 24px rgba(26,26,26,0.08)',
            padding: '4px',
            zIndex: 30,
            borderRadius: '2px',
          }}
        >
          <button
            type="button"
            style={itemStyle}
            onClick={onCopy}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(74,140,64,0.06)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            role="menuitem"
          >
            <span aria-hidden="true" style={{ width: 16, color: tw.inkFaint }}>🔗</span>
            <span>{copied ? L.copied : L.copy}</span>
          </button>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            style={itemStyle}
            onClick={() => setOpen(false)}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(74,140,64,0.06)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            role="menuitem"
          >
            <span aria-hidden="true" style={{ width: 16, color: tw.inkFaint }}>💬</span>
            <span>WhatsApp</span>
          </a>
          <a
            href={mailto}
            style={itemStyle}
            onClick={() => setOpen(false)}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(74,140,64,0.06)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            role="menuitem"
          >
            <span aria-hidden="true" style={{ width: 16, color: tw.inkFaint }}>✉</span>
            <span>{L.email}</span>
          </a>
          <a
            href={li}
            target="_blank"
            rel="noopener noreferrer"
            style={itemStyle}
            onClick={() => setOpen(false)}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(74,140,64,0.06)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            role="menuitem"
          >
            <span aria-hidden="true" style={{ width: 16, color: tw.inkFaint }}>in</span>
            <span>LinkedIn</span>
          </a>
        </div>
      )}
    </div>
  )
}
