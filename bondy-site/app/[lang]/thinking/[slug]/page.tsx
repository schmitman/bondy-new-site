import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'
import type { Metadata } from 'next'
import {
  getArticleBySlug,
  getAllSlugs,
  getRelatedArticles,
  formatArticleDate,
} from '@/lib/thinking/articles'
import { notFound } from 'next/navigation'
import QuoteImage from '@/components/thinking/QuoteImage'
import NewsletterInline from '@/components/thinking/NewsletterInline'

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const enSlugs = getAllSlugs('en').map(slug => ({ lang: 'en', slug }))
  const esSlugs = getAllSlugs('es').map(slug => ({ lang: 'es', slug }))
  return [...enSlugs, ...esSlugs]
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { lang: 'en' | 'es'; slug: string }
}): Promise<Metadata> {
  const article = getArticleBySlug(params.slug, params.lang)
  if (!article) return {}
  const baseUrl = 'https://wearebondy.com'
  const canonical = `${baseUrl}/${params.lang}/thinking/${article.slug}`
  return {
    title: article.meta.title,
    description: article.meta.description,
    alternates: { canonical },
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      url: canonical,
      siteName: 'Bondy',
      locale: params.lang === 'es' ? 'es_AR' : 'en_US',
      type: 'article',
      publishedTime: article.date,
    },
  }
}

// ── Design tokens ─────────────────────────────────────────────────────────────

const tw = {
  bg: '#FEFCF9', white: '#FFFFFF',
  ink: '#1A1A1A', mid: '#3A3530', sub: '#5A5550', faint: '#7A7874',
  rule: '#E8E4DE', green: '#4A8C40',
}

const notebookBg = [
  'linear-gradient(rgba(210,100,80,0.08) 1px, transparent 1px)',
  'linear-gradient(rgba(100,140,200,0.07) 1px, transparent 1px)',
].join(',')

const serif = "'Special Elite', Georgia, serif"
const body  = "'Plus Jakarta Sans', system-ui, sans-serif"

// ── Component ─────────────────────────────────────────────────────────────────

export default function ArticlePage({
  params,
}: {
  params: { lang: Lang; slug: string }
}) {
  const lang = params.lang
  const tr = t(lang)
  const article = getArticleBySlug(params.slug, lang)
  if (!article) notFound()

  const lk = (href: string) => `/${lang}${href}`
  const isEN = lang === 'en'
  const related = getRelatedArticles(params.slug, lang, 3)

  const L = {
    breadcrumbHome: isEN ? 'Thinking' : 'Ideas',
    kicker: (cat: string, date: string) => `${cat} · ${date}`,
    tocLabel: isEN ? 'In this article' : 'En este artículo',
    keyDataLabel: isEN ? 'Key data' : 'Dato clave',
    alsoInThinking: isEN ? 'Also in Thinking' : 'También en Thinking',
    newsletterLabel: isEN ? 'Newsletter' : 'Newsletter',
    newsletterTitle: isEN ? 'A perspective every other week.' : 'Una perspectiva cada dos semanas.',
    newsletterPlaceholder: isEN ? 'your@email.com' : 'tu@email.com',
    subscribe: isEN ? 'Subscribe →' : 'Suscribirse →',
    ctaLabel: isEN ? 'Ready to start a search?' : '¿Listo para arrancar una búsqueda?',
    ctaTitle: isEN ? 'Diagnostic first.\nMarket after.' : 'Primero el diagnóstico.\nDespués el mercado.',
    ctaButton: isEN ? 'Talk to Bondy →' : 'Hablar con Bondy →',
  }

  // Build a lightweight TOC from the first few <h2> in the content.
  const tocItems = extractH2(article.content).slice(0, 5)

  // JSON-LD
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.meta.description,
    datePublished: article.date,
    author: article.author
      ? { '@type': 'Person', name: article.author }
      : { '@type': 'Organization', name: 'Bondy Group', url: 'https://wearebondy.com' },
    publisher: {
      '@type': 'Organization',
      name: 'Bondy Group',
      url: 'https://wearebondy.com',
      logo: { '@type': 'ImageObject', url: 'https://wearebondy.com/icon.svg' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://wearebondy.com/${lang}/thinking/${article.slug}`,
    },
  }

  return (
    <main style={{ backgroundColor: tw.bg, minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Nav lang={lang} tr={tr.nav} />

      {/* ── Article header (breadcrumb + hero split) ───────────────── */}
      <div
        style={{
          backgroundColor: tw.bg,
          backgroundImage: notebookBg,
          backgroundSize: '100% 32px',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px clamp(20px, 5vw, 48px) 0' }}>
          {/* Breadcrumb */}
          <div style={{
            fontFamily: body, fontSize: 11, color: tw.faint,
            display: 'flex', alignItems: 'center', gap: 8,
            fontWeight: 400, marginBottom: 24,
          }}>
            <Link href={lk('/thinking')} style={{ color: tw.faint, textDecoration: 'none' }}>
              {L.breadcrumbHome}
            </Link>
            <span style={{ color: tw.rule }}>/</span>
            <span>{article.category}</span>
          </div>

          {/* Kicker line */}
          <p style={{
            fontFamily: body, fontSize: 10, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: tw.green,
            display: 'flex', alignItems: 'center', gap: 10,
            marginBottom: 20, fontWeight: 500,
          }}>
            <span style={{ width: 18, height: 1, background: tw.green, display: 'inline-block' }} />
            {L.kicker(article.category, formatArticleDate(article.date, lang))}
          </p>

          {/* Hero split */}
          <div className="article-hero-split" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            border: `1px solid ${tw.rule}`,
            background: tw.white,
          }}>
            <div
              className="article-hero-img"
              style={{
                background: tw.bg,
                backgroundImage: notebookBg,
                backgroundSize: '100% 32px',
                borderRight: `1px solid ${tw.rule}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '48px 40px',
                minHeight: 340,
              }}
            >
              <QuoteImage
                quote={article.quoteImage}
                author={article.author}
                authorInitials={article.authorInitials}
              />
            </div>
            <div style={{
              padding: 'clamp(28px, 4vw, 48px)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div>
                <h1 style={{
                  fontFamily: serif,
                  fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                  color: tw.mid, lineHeight: 1.05, opacity: 0.92,
                  marginBottom: 20,
                }}>
                  {article.title}
                </h1>
                <p style={{
                  fontFamily: body, fontSize: 15, color: tw.sub,
                  lineHeight: 1.75, marginBottom: 28, maxWidth: '42ch', fontWeight: 400,
                }}>
                  {article.excerpt}
                </p>
                {article.tags && article.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
                    {article.tags.map((tag, i) => (
                      <span key={tag} style={{
                        display: 'inline-block',
                        fontFamily: body, fontSize: 9,
                        letterSpacing: '0.10em', textTransform: 'uppercase',
                        padding: '3px 8px',
                        border: i === 0
                          ? `1px solid rgba(74,140,64,0.3)`
                          : `1px solid ${tw.rule}`,
                        color: i === 0 ? tw.green : tw.faint,
                        fontWeight: 500,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{
                display: 'flex', alignItems: 'center', gap: 14,
                paddingTop: 24, borderTop: `1px solid ${tw.rule}`,
                flexWrap: 'wrap',
              }}>
                <span style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: tw.green, color: '#fff',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: body, fontSize: 11, flexShrink: 0, fontWeight: 500,
                }}>
                  {article.authorInitials ?? 'BT'}
                </span>
                <div>
                  <span style={{
                    fontFamily: serif, fontSize: 14, color: tw.mid,
                    display: 'block', letterSpacing: '0.02em',
                  }}>
                    {article.author ?? 'Bondy Team'}
                  </span>
                  <span style={{
                    fontFamily: body, fontSize: 11, color: tw.faint,
                    display: 'block', marginTop: 2, fontWeight: 400,
                  }}>
                    {article.authorRole ?? 'Bondy Group'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
                  <span style={{
                    fontFamily: body, fontSize: 9, letterSpacing: '0.10em',
                    textTransform: 'uppercase', padding: '4px 10px',
                    border: `1px solid ${tw.rule}`, color: tw.faint, fontWeight: 500,
                  }}>
                    {formatArticleDate(article.date, lang)}
                  </span>
                  <span style={{
                    fontFamily: body, fontSize: 9, letterSpacing: '0.10em',
                    textTransform: 'uppercase', padding: '4px 10px',
                    border: `1px solid rgba(74,140,64,0.3)`, color: tw.green, fontWeight: 500,
                  }}>
                    {article.readingTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Content + sidebar wrap ─────────────────────────────── */}
        <div className="article-content-wrap" style={{
          maxWidth: 1100, margin: '0 auto',
          padding: '0 clamp(20px, 5vw, 48px) 96px',
          display: 'grid', gridTemplateColumns: '1fr 300px',
          gap: 48, alignItems: 'start',
        }}>
          <article style={{ paddingTop: 48 }}>
            {/* Article body (rendered HTML) */}
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Pull quote (if set in frontmatter) */}
            {article.pullQuote && (
              <blockquote style={{
                borderLeft: `3px solid ${tw.green}`,
                padding: '20px 24px 20px 28px',
                margin: '32px 0',
                background: 'rgba(74,140,64,0.03)',
              }}>
                <p style={{
                  fontFamily: serif, fontSize: '1.25rem',
                  color: tw.mid, lineHeight: 1.3, opacity: 0.9, margin: 0,
                }}>
                  “{article.pullQuote.text}”
                </p>
                {article.pullQuote.cite && (
                  <cite style={{
                    fontFamily: body, fontSize: 10, letterSpacing: '0.10em',
                    textTransform: 'uppercase', color: tw.faint,
                    display: 'block', marginTop: 10, fontWeight: 400,
                    fontStyle: 'normal',
                  }}>
                    — {article.pullQuote.cite}
                  </cite>
                )}
              </blockquote>
            )}

            {/* Data callout (if set in frontmatter) */}
            {article.dataCallout && (
              <div style={{
                background: tw.white, border: `1px solid ${tw.rule}`,
                padding: '24px 28px', margin: '32px 0',
                display: 'grid', gridTemplateColumns: 'auto 1fr',
                gap: 20, alignItems: 'center',
              }}>
                <div style={{
                  fontFamily: serif, fontSize: '3.5rem', color: tw.green,
                  lineHeight: 1, opacity: 0.85,
                }}>
                  {article.dataCallout.num}
                </div>
                <div>
                  <span style={{
                    fontFamily: body, fontSize: 9, letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: tw.green,
                    display: 'block', marginBottom: 4, fontWeight: 500,
                  }}>
                    {article.dataCallout.label}
                  </span>
                  <p style={{
                    fontFamily: body, fontSize: 13, color: tw.sub,
                    lineHeight: 1.65, fontWeight: 400, margin: 0,
                  }}>
                    {article.dataCallout.desc}
                  </p>
                </div>
              </div>
            )}

            {/* Article CTA */}
            <div style={{
              background: tw.white, border: `1px solid ${tw.rule}`,
              borderLeft: `3px solid ${tw.green}`,
              padding: '28px 32px', marginTop: 48,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 24, flexWrap: 'wrap',
            }}>
              <div>
                <span style={{
                  fontFamily: body, fontSize: 9, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: tw.green,
                  display: 'block', marginBottom: 6, fontWeight: 500,
                }}>
                  {L.ctaLabel}
                </span>
                <p style={{
                  fontFamily: serif, fontSize: '1.15rem',
                  color: tw.mid, opacity: 0.9, whiteSpace: 'pre-line', margin: 0,
                }}>
                  {L.ctaTitle}
                </p>
              </div>
              <Link
                href={lk('/contact')}
                style={{
                  fontFamily: body, fontSize: 10, letterSpacing: '0.10em',
                  textTransform: 'uppercase', padding: '12px 24px',
                  background: tw.green, color: '#fff', textDecoration: 'none',
                  whiteSpace: 'nowrap', fontWeight: 500,
                }}
              >
                {L.ctaButton}
              </Link>
            </div>

            {/* Author bio */}
            {article.author && article.authorBio && (
              <div style={{
                background: tw.bg,
                backgroundImage: notebookBg,
                backgroundSize: '100% 32px',
                border: `1px solid ${tw.rule}`,
                padding: '28px 32px', marginTop: 20,
                display: 'flex', gap: 20, alignItems: 'flex-start',
              }}>
                <span style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: tw.green, color: '#fff',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: body, fontSize: 13, fontWeight: 500, flexShrink: 0,
                }}>
                  {article.authorInitials ?? 'BT'}
                </span>
                <div>
                  <span style={{
                    fontFamily: serif, fontSize: '1rem', color: tw.mid,
                    display: 'block', marginBottom: 2, opacity: 0.9,
                  }}>
                    {article.author}
                  </span>
                  <span style={{
                    fontFamily: body, fontSize: 10, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: tw.green,
                    display: 'block', marginBottom: 10, fontWeight: 500,
                  }}>
                    {article.authorRole ?? 'Bondy Group'}
                  </span>
                  <p style={{
                    fontFamily: body, fontSize: 13, color: tw.sub,
                    lineHeight: 1.75, fontWeight: 400, margin: 0,
                  }}>
                    {article.authorBio}
                  </p>
                </div>
              </div>
            )}
          </article>

          {/* ── Sidebar ────────────────────────────────────────── */}
          <aside className="article-sidebar" style={{ paddingTop: 48 }}>
            {tocItems.length > 0 && (
              <div style={{
                background: tw.white, border: `1px solid ${tw.rule}`,
                padding: '20px 22px', marginBottom: 14,
              }}>
                <span style={{
                  fontFamily: body, fontSize: 9, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: tw.green,
                  display: 'block', marginBottom: 12, fontWeight: 500,
                }}>
                  {L.tocLabel}
                </span>
                {tocItems.map((item, i) => (
                  <div key={item} style={{
                    padding: '9px 0',
                    borderBottom: i === tocItems.length - 1 ? 'none' : `1px solid ${tw.rule}`,
                    fontFamily: body, fontSize: 12, color: tw.sub,
                    lineHeight: 1.4, fontWeight: 400,
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            )}

            {article.dataCallout && (
              <div style={{
                background: tw.white, border: `1px solid ${tw.rule}`,
                borderLeft: `3px solid ${tw.green}`,
                padding: '20px 19px', marginBottom: 14,
              }}>
                <span style={{
                  fontFamily: body, fontSize: 9, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: tw.green,
                  display: 'block', marginBottom: 12, fontWeight: 500,
                }}>
                  {L.keyDataLabel}
                </span>
                <p style={{
                  fontFamily: serif, fontSize: '2.4rem', color: tw.green,
                  opacity: 0.8, lineHeight: 1, marginBottom: 8, margin: 0,
                }}>
                  {article.dataCallout.num}
                </p>
                <p style={{
                  fontFamily: body, fontSize: 12, color: tw.sub,
                  lineHeight: 1.7, fontWeight: 400, marginTop: 8,
                }}>
                  {article.dataCallout.desc}
                </p>
              </div>
            )}

            {related.length > 0 && (
              <div style={{
                background: tw.white, border: `1px solid ${tw.rule}`,
                padding: '20px 22px', marginBottom: 14,
              }}>
                <span style={{
                  fontFamily: body, fontSize: 9, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: tw.green,
                  display: 'block', marginBottom: 12, fontWeight: 500,
                }}>
                  {L.alsoInThinking}
                </span>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {related.map((r, i) => (
                    <li key={r.slug} style={{
                      padding: '12px 0',
                      borderBottom: i === related.length - 1 ? 'none' : `1px solid ${tw.rule}`,
                    }}>
                      <Link
                        href={lk(`/thinking/${r.slug}`)}
                        style={{ textDecoration: 'none', display: 'block' }}
                      >
                        <span style={{
                          fontFamily: body, fontSize: 9, letterSpacing: '0.10em',
                          textTransform: 'uppercase', color: tw.faint,
                          display: 'block', marginBottom: 4, fontWeight: 500,
                        }}>
                          {r.category}
                        </span>
                        <p style={{
                          fontFamily: serif, fontSize: '0.88rem',
                          color: tw.mid, lineHeight: 1.2, opacity: 0.88, margin: 0,
                        }}>
                          {r.title}
                        </p>
                        <div style={{
                          fontFamily: body, fontSize: 10, color: tw.faint,
                          marginTop: 5, display: 'flex', alignItems: 'center', gap: 6, fontWeight: 400,
                        }}>
                          <span style={{
                            width: 18, height: 18, borderRadius: '50%',
                            background: tw.green, color: '#fff',
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 8, fontWeight: 500, flexShrink: 0,
                          }}>
                            {r.authorInitials ?? 'BT'}
                          </span>
                          <span>{r.author ?? 'Bondy'} · {r.readingTime}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{
              background: tw.white, border: `1px solid ${tw.rule}`,
              padding: '20px 22px',
            }}>
              <span style={{
                fontFamily: body, fontSize: 9, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: tw.green,
                display: 'block', marginBottom: 12, fontWeight: 500,
              }}>
                {L.newsletterLabel}
              </span>
              <p style={{
                fontFamily: serif, fontSize: '0.95rem', color: tw.mid,
                opacity: 0.9, margin: '0 0 14px 0',
              }}>
                {L.newsletterTitle}
              </p>
              <NewsletterInline
                lang={lang as 'en' | 'es'}
                placeholder={isEN ? 'your@email.com' : 'tu@email.com'}
                cta={isEN ? 'Subscribe' : 'Suscribirse'}
                successTitle={isEN ? 'Check your inbox.' : 'Revisá tu casilla.'}
                successBody={
                  isEN
                    ? "Click the link in the email we just sent and you're in."
                    : 'Hacé click en el link del mail que acabamos de mandar.'
                }
                errorGeneric={
                  isEN
                    ? 'Something went wrong. Try again.'
                    : 'Algo salió mal. Probá de nuevo.'
                }
                errorInvalid={isEN ? 'Enter a valid email.' : 'Ingresá un email válido.'}
              />
            </div>
          </aside>
        </div>
      </div>

      <Footer lang={lang} tr={tr.footer} />

      {/* ── Article body typography + responsive ─────────────────── */}
      <style>{`
        .article-body {
          font-family: ${body};
          font-size: 15px;
          line-height: 1.75;
          color: ${tw.sub};
          font-weight: 400;
        }
        .article-body p {
          margin-bottom: 20px;
          max-width: 65ch;
        }
        .article-body h2 {
          font-family: ${serif};
          font-size: 1.55rem;
          color: ${tw.mid};
          line-height: 1.1;
          margin: 40px 0 16px;
          opacity: 0.9;
        }
        .article-body h3 {
          font-family: ${serif};
          font-size: 1.15rem;
          color: ${tw.mid};
          line-height: 1.2;
          margin: 28px 0 12px;
          opacity: 0.88;
        }
        .article-body strong {
          color: ${tw.mid};
          font-weight: 600;
        }
        .article-body em {
          font-style: italic;
        }
        .article-body ul,
        .article-body ol {
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
          max-width: 65ch;
        }
        .article-body li {
          margin-bottom: 0.6rem;
        }
        .article-body hr {
          border: none;
          border-top: 1px solid ${tw.rule};
          margin: 36px 0;
        }
        .article-body table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1.5rem;
          font-size: 13px;
          max-width: 65ch;
        }
        .article-body th {
          font-family: ${body};
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${tw.faint};
          text-align: left;
          border-bottom: 2px solid ${tw.rule};
          padding: 0.5rem 0.75rem;
          font-weight: 500;
        }
        .article-body td {
          border-bottom: 1px solid ${tw.rule};
          padding: 0.6rem 0.75rem;
          color: ${tw.sub};
        }
        .article-body .article-sources {
          font-size: 12px;
          color: ${tw.faint};
          line-height: 1.7;
        }

        @media (max-width: 900px) {
          .article-hero-split {
            grid-template-columns: 1fr !important;
          }
          .article-hero-img {
            border-right: none !important;
            border-bottom: 1px solid ${tw.rule} !important;
            min-height: 240px !important;
            padding: 32px 24px !important;
          }
          .article-content-wrap {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .article-sidebar {
            display: none !important;
          }
        }
      `}</style>
    </main>
  )
}

// ── Helper: extract H2 titles from the HTML content for the TOC ──────────────
// The article content is authored HTML; we do a conservative regex pull here
// rather than parsing the DOM. Any text inside the <h2> tag is picked up, with
// any nested HTML stripped.
function extractH2(html: string): string[] {
  const out: string[] = []
  const regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi
  let match: RegExpExecArray | null
  while ((match = regex.exec(html)) !== null) {
    const inner = match[1].replace(/<[^>]+>/g, '').trim()
    // Trim trailing "." for cleaner TOC entries.
    const cleaned = inner.replace(/\.$/, '')
    if (cleaned) out.push(cleaned)
  }
  return out
}
