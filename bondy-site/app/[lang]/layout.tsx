import type { Metadata } from 'next'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'
import '../globals.css'

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
    },
    robots: { index: true, follow: true },
  }
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
      <body>{children}</body>
    </html>
  )
}
