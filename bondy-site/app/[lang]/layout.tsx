import type { Metadata } from 'next'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'
import '../globals.css'

/*
  ⚠️  FUENTES — Special Elite + Courier Prime están self-hosted via @font-face en globals.css.
  Los archivos están en /public/fonts/. NO usar next/font/google para estas fuentes —
  causaría que los @font-face queden bajo nombres hasheados (__Special_Elite_xxx)
  y todos los inline styles que usan el nombre real fallarían.
  NO agregar <link href="fonts.googleapis.com"> acá. Ya ocurrió 3 veces.
*/

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
    <html lang={params.lang}>
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
          Special Elite + Courier Prime están self-hosted via @font-face en globals.css.
          Archivos woff2 en /public/fonts/ con nombres ESTABLES.
          NO agregar links a fonts.googleapis.com acá. Ya ocurrió 3 veces — commits 462ea18, 8c982f7.
          NO usar next/font/google para estas fuentes: genera nombres hasheados que rompen inline styles.

          ⚠️  DISEÑO — REGLA ABSOLUTA
          NO modificar tipografía, colores, layout ni elementos visuales de este sitio.
          Cambios permitidos: copy, meta tags, configuración técnica, JSON-LD únicamente.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        {/* Apollo.io — Website Visitor Tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
              o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
              o.onload=function(){window.trackingFunctions.onLoad({appId:"663bad8e6f75730300a3e69c"})},
              document.head.appendChild(o)}initApollo();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
