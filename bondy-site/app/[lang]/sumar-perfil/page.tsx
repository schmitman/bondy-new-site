import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'
import GeneralApplyForm from './GeneralApplyForm'

export const dynamic = 'force-dynamic'

const tw = {
  bg: '#FEFCF9',
  ink: '#1A1A1A',
  inkMid: '#3A3530',
  inkSub: '#5A5550',
  inkFaint: '#7A7874',
  rule: '#E8E4DE',
  white: '#FFFFFF',
  green: '#4A8C40',
}
const serif = "'Special Elite', Georgia, serif"
const mono = "'Plus Jakarta Sans', system-ui, sans-serif"

const COPY = {
  en: {
    kicker: '— Talent Pool',
    h1a: 'Join the',
    h1b: 'Bondy pool.',
    intro:
      'Bondy works with engineering teams across LATAM. If you do not see a role that fits today, drop your profile — when a fit comes up, a recruiter on the Bondy team will reach out personally.',
    rolesLink: 'See current open roles →',
  },
  es: {
    kicker: '— Pool de Talento',
    h1a: 'Sumate al pool',
    h1b: 'de Bondy.',
    intro:
      'Bondy trabaja con equipos de ingeniería en toda LATAM. Si no encontrás un rol que encaje hoy, dejanos tu perfil — cuando aparezca un fit, alguien del equipo Bondy te escribe personalmente.',
    rolesLink: 'Ver búsquedas abiertas →',
  },
} as const

const pageMeta = {
  en: {
    title: 'Join the Bondy Talent Pool — Technical Roles Across LATAM',
    description:
      "Don't see a fit today? Add your profile to the Bondy talent pool. We work with engineering teams across LATAM and reach out personally when a role matches.",
  },
  es: {
    title: 'Sumate al Pool de Talento — Bondy',
    description:
      'No encontrás un rol que encaje hoy? Sumate al pool de talento de Bondy. Trabajamos con equipos de ingeniería en LATAM y escribimos personalmente cuando hay un fit.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Lang }
}): Promise<Metadata> {
  const baseUrl = 'https://wearebondy.com'
  const meta = pageMeta[params.lang] ?? pageMeta.en
  const canonical = `${baseUrl}/${params.lang}/sumar-perfil`
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/en/sumar-perfil`,
        es: `${baseUrl}/es/sumar-perfil`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      siteName: 'Bondy',
      locale: params.lang === 'es' ? 'es_AR' : 'en_US',
      type: 'website',
      images: [{ url: '/og-image-v2.png', width: 1200, height: 630, alt: 'Bondy — Talent Pool' }],
    },
  }
}

export default function SumarPerfilPage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  const c = COPY[lang] ?? COPY.en
  const tr = t(lang)

  return (
    <main style={{ background: tw.bg, minHeight: '100vh', color: tw.ink }}>
      <Nav lang={lang} tr={tr.nav} />

      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(3rem,7vw,5.5rem) clamp(1.25rem,4vw,2.5rem) clamp(2rem,5vw,3.5rem)',
        }}
      >
        <div
          style={{
            fontFamily: mono,
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: tw.inkFaint,
            marginBottom: '1.25rem',
          }}
        >
          {c.kicker}
        </div>
        <h1
          style={{
            fontFamily: serif,
            fontSize: 'clamp(2.4rem,5.5vw,4.2rem)',
            lineHeight: 1.05,
            color: tw.ink,
            margin: 0,
            fontWeight: 400,
          }}
        >
          {c.h1a}
          <br />
          <span style={{ opacity: 0.65 }}>{c.h1b}</span>
        </h1>
        <p
          style={{
            fontFamily: mono,
            fontSize: 'clamp(15px,1.4vw,17px)',
            lineHeight: 1.7,
            color: tw.inkSub,
            marginTop: '1.5rem',
            maxWidth: '640px',
          }}
        >
          {c.intro}
        </p>
        <a
          href={`/${lang}/roles`}
          style={{
            fontFamily: mono,
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: tw.green,
            textDecoration: 'none',
            display: 'inline-block',
            marginTop: '1.25rem',
          }}
        >
          {c.rolesLink}
        </a>
      </section>

      <section
        style={{
          maxWidth: '780px',
          margin: '0 auto',
          padding: '0 clamp(1.25rem,4vw,2.5rem) clamp(4rem,8vw,6rem)',
        }}
      >
        <GeneralApplyForm lang={lang} />
      </section>

      <Footer lang={lang} tr={tr.footer} />
    </main>
  )
}
