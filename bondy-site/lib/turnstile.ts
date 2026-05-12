/**
 * Cloudflare Turnstile — server-side token verification.
 * Fail-open: si TURNSTILE_SECRET_KEY no está seteado, accepts all (durante setup).
 * Una vez que la key está en Vercel, todo request sin token válido se rechaza.
 */

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export type TurnstileResult =
  | { ok: true; reason?: undefined }
  | { ok: false; reason: 'no-token' | 'invalid' | 'network' }

export async function verifyTurnstileToken(
  token: string | undefined | null,
  remoteIp?: string | null
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY

  // Fail-open antes de que Mara configure las keys.
  if (!secret) {
    console.warn('[turnstile] TURNSTILE_SECRET_KEY not set — accepting without verification')
    return { ok: true }
  }

  if (!token || token === 'no-captcha-configured') {
    return { ok: false, reason: 'no-token' }
  }

  try {
    const body = new URLSearchParams()
    body.append('secret', secret)
    body.append('response', token)
    if (remoteIp) body.append('remoteip', remoteIp)

    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })

    if (!res.ok) {
      console.error('[turnstile] verify HTTP error', res.status)
      return { ok: false, reason: 'network' }
    }

    const data = (await res.json()) as { success: boolean; 'error-codes'?: string[] }
    if (!data.success) {
      console.warn('[turnstile] token rejected', data['error-codes'])
      return { ok: false, reason: 'invalid' }
    }
    return { ok: true }
  } catch (err) {
    console.error('[turnstile] verify exception', err)
    return { ok: false, reason: 'network' }
  }
}
