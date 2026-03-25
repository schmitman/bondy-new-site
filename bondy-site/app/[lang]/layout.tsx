import type { Metadata } from 'next'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'
import { Special_Elite, Courier_Prime } from 'next/font/google'
import '../globals.css'

// ⚠️  FUENTES — next/font self-hostea automáticamente en /_next/static/media/
// NO agregar <link href="fonts.googleapis.com"> en ningún lado. Ya ocurrió 3 veces.
// Estas dos líneas son la ÚNICA fuente de verdad para Special Elite y Courier Prime.
const specialElite = Special_Elite({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-special-elite',
})

const courierPrime = Courier_Prime({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-courier',
})

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }]
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Lang }
}): Promise<Metadata> {
  const tr = t(params.lang)
  const baseUrl = 'https://wearebondy.com'
  const canonical = params.lang === 'en' ? `${baseUrl}/en` : `${baseUrl}/es`

  return {
    metadataBase: new URL(baseUrl),
    title: 'Bondy — The standard for technical hiring',
    description: tr.home.meta.description,
    alternates: {
      canonical,
      languages: {
        'en': `${baseUrl}/en`,
        'es': `${baseUrl}/es`,
      },
    },
    openGraph: {
      title: 'Bondy',
      description: tr.home.meta.description,
      url: canonical,
      siteName: 'Bondy',
      locale: params.lang === 'es' ? 'es_AR' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Bondy — Technical Recruiting for Engineering Teams in LATAM',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Bondy — The standard for technical hiring',
      description: tr.home.meta.description,
      images: ['/og-image.png'],
    },
    robots: { index: true, follow: true },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
    },
  }
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://wearebondy.com/#organization',
      name: 'Bondy Group',
      url: 'https://wearebondy.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://wearebondy.com/icon.svg',
      },
      foundingDate: '2008',
      founder: {
        '@type': 'Person',
        name: 'Mara Schmitman',
        jobTitle: 'Founder & Managing Director',
        sameAs: 'https://www.linkedin.com/in/mara-schmitman2/',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Buenos Aires',
        addressCountry: 'AR',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'hello@wearebondy.com',
        contactType: 'customer service',
      },
      sameAs: [
        'https://www.linkedin.com/company/bondygroup',
      ],
      description:
        'Bondy is a technical recruiting firm based in Buenos Aires, specializing in finding and placing software engineers, backend developers, and tech talent across Argentina and LATAM.',
      knowsAbout: [
        'Technical Recruiting',
        'Software Engineer Hiring',
        'IT Staffing',
        'Executive Search',
        'RPO',
        'LATAM Tech Talent',
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://wearebondy.com/#service',
      name: 'Bondy — Technical Recruiting',
      url: 'https://wearebondy.com',
      image: 'https://wearebondy.com/icon.svg',
      priceRange: '$$',
      areaServed: [
        { '@type': 'Country', name: 'Argentina' },
        { '@type': 'Place', name: 'Latin America' },
      ],
      serviceType: [
        'Technical Recruiting',
        'IT Headhunting',
        'RPO',
        'Tech Staffing',
      ],
    },
  ],
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Lang }
}) {
  return (
    <html lang={params.lang} className={`${specialElite.variable} ${courierPrime.variable}`}>
      <head>
        {/* GA4 — Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4J2J3Q2WGE" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4J2J3Q2WGE');
            `,
          }}
        />
        {/*
          ⚠️  FUENTES — LEER ANTES DE TOCAR ESTE ARCHIVO
          Special Elite + Courier Prime se cargan via next/font/google (arriba, líneas ~7-21).
          next/font las self-hostea en /_next/static/media/ — SIN depender de Google CDN.
          NO agregar links a fonts.googleapis.com acá. Ya ocurrió 3 veces — commits 462ea18, fix 25/03.
          Si ves preconnect o stylesheet de Google Fonts = regresión, revertir de inmediato.
          Las variables CSS --font-special-elite y --font-courier se inyectan via className en <html>.

          ⚠️  DISEÑO — REGLA ABSOLUTA
          NO modificar tipografía, colores, layout ni elementos visuales de este sitio.
          Cambios permitidos: copy, meta tags, configuración técnica, JSON-LD únicamente.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
