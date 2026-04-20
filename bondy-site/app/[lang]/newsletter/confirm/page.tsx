import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'

export const dynamic = 'force-dynamic'

const pageMeta = {
  en: {
    title: 'Newsletter confirmation — Bondy',
    description: 'Confirm your subscription to Bondy Thinking.',
  },
  es: {
    title: 'Confirmación del newsletter — Bondy',
    description: 'Confirmá tu suscripción a Bondy Thinking.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: { lang: 'en' | 'es' }
}): Promise<Metadata> {
  const meta = pageMeta[params.lang] ?? pageMeta.en
  return {
    title: meta.title,
    description: meta.description,
    robots: { index: false, follow: false },
  }
}

const tw = {
  bg: '#FEFCF9',
  white: '#FFFFFF',
  ink: '#1A1A1A',
  mid: '#3A3530',
  sub: '#5A5550',
  faint: '#7A7874',
  rule: '#E8E4DE',
  green: '#4A8C40',
  warn: '#C06A2D',
}

const notebookBg = [
  'linear-gradient(rgba(210,100,80,0.08) 1px, transparent 1px)',
  'linear-gradient(rgba(100,140,200,0.07) 1px, transparent 1px)',
].join(',')

const serif = "'Special Elite', Georgia, serif"
const body = "'Plus Jakarta Sans', system-ui, sans-serif"

type ConfirmResult =
  | { ok: true; email: string; already_confirmed?: boolean }
  | { ok: false; reason: 'invalid_token' | 'expired' | 'server_error' | 'missing_token' }

async function confirmToken(token: string | undefined): Promise<ConfirmResult> {
  if (!token) return { ok: false, reason: 'missing_token' }

  // Llamamos al endpoint interno con URL absoluta (server-side fetch).
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wearebondy.com'
  try {
    const res = await fetch(
      `${baseUrl}/api/newsletter/confirm?token=${encodeURIComponent(token)}`,
      { cache: 'no-store' }
    )
    const data = await res.json().catch(() => ({}))
    if (res.ok && data?.ok) {
      return { ok: true, email: data.email, already_confirmed: !!data.already_confirmed }
    }
    const reason = data?.reason
    if (reason === 'invalid_token' || reason === 'expired' || reason === 'server_error') {
      return { ok: false, reason }
    }
    return { ok: false, reason: 'server_error' }
  } catch {
    return { ok: false, reason: 'server_error' }
  }
}

export default async function ConfirmPage({
  params,
  searchParams,
}: {
  params: { lang: Lang }
  searchParams: { token?: string }
}) {
  const lang = params.lang
  const tr = t(lang)
  const isEN = lang === 'en'
  const result = await confirmToken(searchParams.token)

  const L = {
    kicker: isEN ? '— Newsletter' : '— Newsletter',
    backToThinking: isEN ? '← Back to Thinking' : '← Volver a Ideas',
    successTitle: isEN ? "You're in." : 'Listo, estás adentro.',
    successBody: isEN
      ? "We'll send you a perspective every other week. Nothing else."
      : 'Te vamos a mandar una perspectiva cada dos semanas. Nada más.',
    alreadyTitle: isEN ? 'Already confirmed.' : 'Ya estabas confirmado.',
    alreadyBody: isEN
      ? 'Your subscription is already active — no action needed.'
      : 'Tu suscripción ya está activa — no hace falta que hagas nada más.',
    errorInvalidTitle: isEN ? 'This link is no longer valid.' : 'Este link ya no es válido.',
    errorInvalidBody: isEN
      ? 'The confirmation link has expired or was already used. Subscribe again from the Thinking page.'
      : 'El link de confirmación venció o ya fue usado. Podés suscribirte de nuevo desde la página de Ideas.',
    errorServerTitle: isEN ? 'Something went wrong.' : 'Algo salió mal.',
    errorServerBody: isEN
      ? 'Try refreshing this page. If the problem persists, write to hello@wearebondy.com.'
      : 'Probá refrescar esta página. Si el problema sigue, escribinos a hello@wearebondy.com.',
    errorMissingTitle: isEN ? 'Missing confirmation token.' : 'Falta el token de confirmación.',
    errorMissingBody: isEN
      ? 'This page needs a valid link from your confirmation email.'
      : 'Esta página necesita un link válido desde el email de confirmación.',
  }

  let title: string, bodyText: string, state: 'success' | 'error' | 'already'
  if (result.ok) {
    if (result.already_confirmed) {
      title = L.alreadyTitle
      bodyText = L.alreadyBody
      state = 'already'
    } else {
      title = L.successTitle
      bodyText = L.successBody
      state = 'success'
    }
  } else {
    state = 'error'
    switch (result.reason) {
      case 'missing_token':
        title = L.errorMissingTitle
        bodyText = L.errorMissingBody
        break
      case 'invalid_token':
      case 'expired':
        title = L.errorInvalidTitle
        bodyText = L.errorInvalidBody
        break
      case 'server_error':
      default:
        title = L.errorServerTitle
        bodyText = L.errorServerBody
        break
    }
  }

  const accent = state === 'error' ? tw.warn : tw.green

  return (
    <main
      style={{
        backgroundColor: tw.bg,
        backgroundImage: notebookBg,
        backgroundSize: '100% 32px',
        minHeight: '100vh',
      }}
    >
      <Nav lang={lang} tr={tr.nav} />
      <section style={{ padding: '96px clamp(20px, 5vw, 48px) 120px' }}>
        <div
          style={{
            maxWidth: 620,
            margin: '0 auto',
            background: tw.white,
            border: `1px solid ${tw.rule}`,
            padding: 'clamp(32px, 5vw, 56px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span
              style={{
                width: 18,
                height: 1,
                background: accent,
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: body,
                fontSize: 10,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: accent,
                fontWeight: 500,
              }}
            >
              {L.kicker}
            </span>
          </div>
          <h1
            style={{
              fontFamily: serif,
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              lineHeight: 1.06,
              color: tw.mid,
              opacity: 0.92,
              margin: '0 0 20px 0',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontFamily: body,
              fontSize: 16,
              lineHeight: 1.7,
              color: tw.sub,
              margin: '0 0 32px 0',
              maxWidth: 520,
            }}
          >
            {bodyText}
          </p>
          <Link
            href={`/${lang}/thinking`}
            style={{
              fontFamily: body,
              fontSize: 10,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: accent,
              textDecoration: 'none',
              fontWeight: 500,
              borderBottom: `1px solid ${accent}`,
              paddingBottom: 2,
            }}
          >
            {L.backToThinking}
          </Link>
        </div>
      </section>
      <Footer lang={lang} tr={tr.footer} />
    </main>
  )
}
