import { MetadataRoute } from 'next'
import { articles } from '@/lib/thinking/articles'

const baseUrl = 'https://wearebondy.com'

// Páginas core, ambos idiomas, con su contraparte como hreflang alternate.
const pages = ['', '/services', '/contact', '/method', '/work', '/about', '/thinking']
const langs = ['en', 'es'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // ── Core pages (incluye /thinking index) ──────────────────────
  for (const lang of langs) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : page === '/thinking' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : page === '/thinking' ? 0.9 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${page}`,
            es: `${baseUrl}/es${page}`,
          },
        },
      })
    }
  }

  // ── /thinking articles (generados desde articles.ts) ──────────
  // Cada artículo se incluye con su lastModified = date del artículo.
  // No agregamos hreflang alternates porque los slugs EN/ES son distintos
  // y no hay mapping 1:1 garantizado entre versiones.
  for (const article of articles) {
    entries.push({
      url: `${baseUrl}/${article.lang}/thinking/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  return entries
}
