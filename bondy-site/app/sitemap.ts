import { MetadataRoute } from 'next'

const baseUrl = 'https://wearebondy.com'

const pages = ['', '/services', '/contact', '/method', '/work', '/about']
const langs = ['en', 'es']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const lang of langs) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${page}`,
            es: `${baseUrl}/es${page}`,
          },
        },
      })
    }
  }

  return entries
}
