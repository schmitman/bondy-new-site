'use client'

import { useEffect, useRef, useState } from 'react'

/* Cloudflare Turnstile — captcha invisible/managed.
   Renderiza solo si NEXT_PUBLIC_TURNSTILE_SITE_KEY existe; si no, fail-open. */

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: TurnstileOpts) => string
      reset: (id?: string) => void
      remove: (id?: string) => void
    }
  }
}

type TurnstileOpts = {
  sitekey: string
  callback: (token: string) => void
  'error-callback'?: () => void
  'expired-callback'?: () => void
  theme?: 'light' | 'dark' | 'auto'
  size?: 'normal' | 'flexible' | 'compact' | 'invisible'
  appearance?: 'always' | 'execute' | 'interaction-only'
}

type Props = {
  onVerify: (token: string) => void
  onExpire?: () => void
  className?: string
}

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

let scriptLoading: Promise<void> | null = null

function loadTurnstile(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.turnstile) return Promise.resolve()
  if (scriptLoading) return scriptLoading
  scriptLoading = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve())
      return
    }
    const s = document.createElement('script')
    s.src = SCRIPT_SRC
    s.async = true
    s.defer = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('Failed to load Turnstile'))
    document.head.appendChild(s)
  })
  return scriptLoading
}

export default function Turnstile({ onVerify, onExpire, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const [ready, setReady] = useState(false)
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  useEffect(() => {
    if (!siteKey) return
    let mounted = true
    loadTurnstile()
      .then(() => {
        if (!mounted || !ref.current || !window.turnstile) return
        widgetIdRef.current = window.turnstile.render(ref.current, {
          sitekey: siteKey,
          callback: (token: string) => onVerify(token),
          'expired-callback': () => onExpire?.(),
          'error-callback': () => onExpire?.(),
          theme: 'light',
          appearance: 'interaction-only',
        })
        setReady(true)
      })
      .catch((err) => {
        console.error('[turnstile] load failed', err)
      })

    return () => {
      mounted = false
      if (window.turnstile && widgetIdRef.current) {
        try { window.turnstile.remove(widgetIdRef.current) } catch {}
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey])

  // Si no hay site key configurada → fail-open: no renderiza nada y "verifica" automáticamente.
  useEffect(() => {
    if (!siteKey) {
      onVerify('no-captcha-configured')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey])

  if (!siteKey) return null

  return (
    <div className={className} style={{ minHeight: ready ? 'auto' : '0px' }}>
      <div ref={ref} />
    </div>
  )
}
