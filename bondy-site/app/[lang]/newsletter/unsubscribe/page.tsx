import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'
import { t } from '@/lib/i18n/translations'

export const dynamic = 'force-dynamic'

const pageMeta = {
  en: {
    title: 'Unsubscribe — Bondy',
    description: 'Unsubscribe from Bondy Thinking.',
  },
  es: {
    title: 'Cancelar suscripción — Bondy',
    description: 'Cancelar la suscripción a Bondy Thinking.',
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

const serif = "'Special Elite', Georgia, serif"
const body = "'Plus Jakarta Sans', system-ui, sans-serif"

type UnsubResult =
  | { ok: true; email?: string }
  | { ok: false; reason: 'invalid_token' | 'server_error' | 'missing_token' }

async function unsubscribeToken(token: string | undefined): Promise<UnsubResult> {
  if (!token) return { ok: false, reason: 'missing_token' }
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wearebondy.com'
  try {
    const res = await fetch(
      `${baseUrl}/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`,
      { cache: 'no-store' }
    )
    const data = await res.json().catch(() => null)
    if (!res.ok || !data) {
      return { ok: false, reason: data?.reason || 'server_error' }
    }
    return data as UnsubResult
  } catch {
    return { ok: false, reason: 'server_error' }
  }
}

export default async function NewsletterUnsubscribePage({
  params,
  searchParams,
}: {
  params: { lang: 'en' | 'es' }
  searchParams: { token?: string }
}) {
  const lang = params.lang === 'en' ? 'en' : 'es'
  const tr = t(lang)
  const result = await unsubscribeToken(searchParams.token)

  const L = lang === 'es'
    ? {
        successKicker: '✓ Listo',
        successTitle: 'Te dimos de baja',
        successBody: 'No te vamos a mandar más números de Bondy Thinking. Si fue un error, podés volver a suscribirte cuando quieras desde el sitio.',
        errorKicker: '⚠ Hubo un problema',
        errorTitleInvalid: 'Link inválido o vencido',
        errorTitleServer: 'Algo no salió',
        errorBodyInvalid: 'Puede que ya hayas cancelado antes o que el link esté vencido. Si necesitás ayuda, escribinos a hello@wearebondy.com.',
        errorBodyServer: 'No pudimos procesar tu pedido en este momento. Intentá de nuevo en unos minutos o escribinos a hello@wearebondy.com.',
        ctaBack: '← Volver a wearebondy.com',
        ctaThinking: 'Ver Bondy Thinking',
      }
    : {
        successKicker: '✓ Done',
        successTitle: 'You\'re unsubscribed',
        successBody: 'You won\'t receive more issues of Bondy Thinking. If this was a mistake, you can re-subscribe anytime from the site.',
        errorKicker: '⚠ Something went wrong',
        errorTitleInvalid: 'Invalid or expired link',
        errorTitleServer: 'Something didn\'t work',
        errorBodyInvalid: 'You may have already unsubscribed, or the link has expired. If you need help, write us at hello@wearebondy.com.',
        errorBodyServer: 'We couldn\'t process your request right now. Try again in a few minutes or write us at hello@wearebondy.com.',
        ctaBack: '← Back to wearebondy.com',
        ctaThinking: 'Visit Bondy Thinking',
      }

  const isSuccess = result.ok
  const isInvalid = !result.ok && (result.reason === 'invalid_token' || result.reason === 'missing_token')

  return (
    <>
      <Nav lang={lang} tr={tr.nav} />
      <main style={{ background: tw.bg, minHeight: 'calc(100vh - 200px)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', background: tw.white, border: `1px solid ${tw.rule}`, padding: '48px 40px' }}>
          <div style={{
            fontFamily: body, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: isSuccess ? tw.green : tw.warn, fontWeight: 500, marginBottom: 14,
          }}>
            {isSuccess ? L.successKicker : L.errorKicker}
          </div>
          <h1 style={{
            fontFamily: serif, fontSize: 32, lineHeight: 1.2, color: tw.mid,
            margin: '0 0 18px 0', fontWeight: 400,
          }}>
            {isSuccess ? L.successTitle : (isInvalid ? L.errorTitleInvalid : L.errorTitleServer)}
          </h1>
          <p style={{
            fontFamily: body, fontSize: 15, lineHeight: 1.7, color: tw.sub, margin: '0 0 28px 0',
          }}>
            {isSuccess ? L.successBody : (isInvalid ? L.errorBodyInvalid : L.errorBodyServer)}
          </p>
          {isSuccess && result.email && (
            <div style={{
              fontFamily: body, fontSize: 12, color: tw.faint, marginBottom: 28, fontStyle: 'italic',
            }}>
              {lang === 'es' ? 'Email cancelado: ' : 'Email unsubscribed: '}<strong style={{ color: tw.mid, fontStyle: 'normal' }}>{result.email}</strong>
            </div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            <Link href={`/${lang}`} style={{
              fontFamily: body, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: tw.green, textDecoration: 'none', borderBottom: `1px solid ${tw.green}`, paddingBottom: 2,
            }}>
              {L.ctaBack}
            </Link>
            <Link href={`/${lang}/thinking`} style={{
              fontFamily: body, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: tw.faint, textDecoration: 'none', borderBottom: `1px solid ${tw.rule}`, paddingBottom: 2,
            }}>
              {L.ctaThinking}
            </Link>
          </div>
        </div>
      </main>
      <Footer lang={lang} tr={tr.footer} />
    </>
  )
}
