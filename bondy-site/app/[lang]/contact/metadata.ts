import type { Metadata } from 'next'

const pageMeta = {
  en: {
    title: 'Contact Bondy — Start a Technical Search in Argentina or LATAM',
    description: 'Ready to hire engineers in Argentina or LATAM? Tell us what you need to build. Bondy responds within 24 hours.',
  },
  es: {
    title: 'Contacto — Iniciá una Búsqueda Técnica en Argentina o LATAM | Bondy',
    description: '¿Necesitás contratar ingenieros en Argentina o LATAM? Contanos qué necesitás construir. Bondy responde en 24 horas.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: { lang: 'en' | 'es' }
}): Promise<Metadata> {
  const baseUrl = 'https://wearebondy.com'
  const meta = pageMeta[params.lang] ?? pageMeta.en
  const canonical = `${baseUrl}/${params.lang}/contact`
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/en/contact`,
        es: `${baseUrl}/es/contact`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      siteName: 'Bondy',
      locale: params.lang === 'es' ? 'es_AR' : 'en_US',
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Bondy — Technical Recruiting for Engineering Teams in LATAM' }],
    },
  }
}
