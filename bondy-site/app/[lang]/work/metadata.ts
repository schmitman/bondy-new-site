import type { Metadata } from 'next'

const pageMeta = {
  en: {
    title: 'Our Work — Real Technical Hires Across LATAM | Bondy',
    description: 'Not marketing case studies. Real technical recruiting engagements — the challenge, what we did, and the result. Engineering teams hired across Argentina and LATAM.',
  },
  es: {
    title: 'Nuestro Trabajo — Contrataciones Técnicas Reales en LATAM | Bondy',
    description: 'No son casos de éxito de marketing. Proyectos reales de recruiting técnico — el desafío, lo que hicimos y el resultado.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: { lang: 'en' | 'es' }
}): Promise<Metadata> {
  const baseUrl = 'https://wearebondy.com'
  const meta = pageMeta[params.lang] ?? pageMeta.en
  const canonical = `${baseUrl}/${params.lang}/work`
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/en/work`,
        es: `${baseUrl}/es/work`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      siteName: 'Bondy',
      locale: params.lang === 'es' ? 'es_AR' : 'en_US',
      type: 'website',
    },
  }
}
