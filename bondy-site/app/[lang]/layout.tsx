import type { Metadata } from 'next'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'
import { Playfair_Display, DM_Sans, DM_Mono } from 'next/font/google'
import '../globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
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
    <html lang={params.lang} className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
