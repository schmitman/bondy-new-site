import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'
import type { Metadata } from 'next'
import {
  getArticlesByLang,
  getFeaturedArticle,
  formatArticleDate,
  type Article,
} from '@/lib/thinking/articles'
import QuoteImage from '@/components/thinking/QuoteImage'
import NewsletterInline from '@/components/thinking/NewsletterInline'

// ── Metadata ──────────────────────────────────────────────────────────────────

const pageMeta = {
  en: {
    title: 'Thinking — Bondy',
    description: 'Bondy\'s editorial. What we think about technical hiring, the LATAM engineering market, and how we work. Written from 18+ years of placing engineers in Argentina and across Latin America.',
  },
  es: {
    title: 'Ideas — Bondy',
    description: 'El espacio editorial de Bondy. Lo que pensamos sobre recruiting técnico, el mercado de ingeniería en LATAM y cómo trabajamos. Escrito desde 18+ años colocando engineers en Argentina y América Latina.',
  },
}

export async function generateMetadata({ params }: { params: { lang: 'en' | 'es' } }): Promise<Metadata> {
  const baseUrl = 'https://wearebondy.com'
  const meta = pageMeta[params.lang] ?? pageMeta.en
  const canonical = `${baseUrl}/${params.lang}/thinking`
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: { en: `${baseUrl}/en/thinking`, es: `${baseUrl}/es/thinking` },
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

// ── Design tokens (Typewriter v4) ─────────────────────────────────────────────

const tw = {
  bg: '#FEFCF9',
  white: '#FFFFFF',
  ink: '#1A1A1A',
  mid: '#3A3530',
  sub: '#5A5550',
  faint: '#7A7874',
  rule: '#E8E4DE',
  green: '#4A8C40',
}

// Notebook grid background — exact match with Alex's template (.nb class)
const notebookBg = [
  'linear-gradient(rgba(210,100,80,0.08) 1px, transparent 1px)',
  'linear-gradient(rgba(100,140,200,0.07) 1px, transparent 1px)',
].join(',')

const serif = "'Special Elite', Georgia, serif"
const body  = "'Plus Jakarta Sans', system-ui, sans-serif"

// ── Component ─────────────────────────────────────────────────────────────────

export default function ThinkingPage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang
  const tr = t(lang)
  const lk = (href: string) => `/${lang}${href}`
  const isEN = lang === 'en'

  const articles = getArticlesByLang(lang)
  const featured = getFeaturedArticle(lang)
  const rest = articles.filter(a => a.slug !== featured?.slug)

  const L = {
    kicker: isEN ? '— Thinking' : '— Ideas',
    title: isEN ? 'Thinking' : 'Ideas',
    subtitle: isEN
      ? 'What we think about technical hiring, the LATAM engineering market, and how we work.'
      : 'Lo que pensamos sobre recruiting técnico, el mercado de ingeniería en LATAM y cómo trabajamos.',
    readFull: isEN ? 'Read the article →' : 'Leer el artículo →',
    read: isEN ? 'Read →' : 'Leer →',
    featuredLabel: isEN ? 'Featured' : 'Destacado',
    allArticles: isEN ? 'All articles' : 'Todos los artículos',
    newsletterLabel: isEN ? 'Newsletter' : 'Newsletter',
    newsletterTitle: isEN ? 'A perspective every other week.' : 'Una perspectiva cada dos semanas.',
    newsletterPlaceholder: isEN ? 'your@email.com' : 'tu@email.com',
    subscribe: isEN ? 'Subscribe →' : 'Suscribirse →',
    articleCount: (n: number) => isEN
      ? `${n} ${n === 1 ? 'article' : 'articles'}`
      : `${n} ${n === 1 ? 'artículo' : 'artículos'}`,
  }

  return (
    <main
      style={{
        backgroundColor: tw.bg,
        backgroundImage: notebookBg,
        backgroundSize: '100% 32px',
        minHeight: '100vh',
      }}
    >
      <Nav lang={lang} tr={tr.nav} />

      {/* ── Page header ───────────────────────────────────────── */}
      <header style={{ borderBottom: `1px solid ${tw.rule}`, background: 'rgba(254,252,249,0.6)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px clamp(20px, 5vw, 48px) 48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{ width: 18, height: 1, background: tw.green, display: 'inline-block' }} />
            <span style={{
              fontFamily: body, fontSize: 10, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: tw.green, fontWeight: 500,
            }}>
              {L.kicker}
            </span>
          </div>
          <h1 style={{
            fontFamily: serif, fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
            lineHeight: 1.02, color: tw.mid, marginBottom: 20, opacity: 0.92,
          }}>
            {L.title}
          </h1>
          <p style={{
            fontFamily: body, fontSize: 16, lineHeight: 1.75,
            maxWidth: 560, color: tw.sub, fontWeight: 400,
          }}>
            {L.subtitle}
          </p>
          <div style={{
            fontFamily: body, fontSize: 10, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: tw.faint, marginTop: 28, fontWeight: 500,
          }}>
            {L.articleCount(articles.length)}
          </div>
        </div>
      </header>

      {/* ── Featured post ─────────────────────────────────────── */}
      {featured && (
        <section style={{ padding: '48px clamp(20px, 5vw, 48px) 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: body, fontSize: 9, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: tw.green, padding: '4px 10px',
                border: `1px solid rgba(74,140,64,0.3)`, fontWeight: 500,
              }}>
                {L.featuredLabel}
              </span>
              <span style={{
                fontFamily: body, fontSize: 10, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: tw.faint, fontWeight: 500,
              }}>
                {featured.category} · {formatArticleDate(featured.date, lang)}
              </span>
            </div>
            <FeaturedCard article={featured} lk={lk} readLabel={L.readFull} />
          </div>
        </section>
      )}

      {/* ── Grid of remaining articles ────────────────────────── */}
      {rest.length > 0 && (
        <section style={{ padding: '40px clamp(20px, 5vw, 48px) 80px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              marginBottom: 32, paddingBottom: 16, borderBottom: `1px solid ${tw.rule}`,
            }}>
              <span style={{
                fontFamily: body, fontSize: 10, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: tw.faint, fontWeight: 500,
              }}>
                {L.allArticles}
              </span>
            </div>
            <div className="thinking-grid">
              {rest.map(article => (
                <PostCard key={article.slug} article={article} lk={lk} readLabel={L.read} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Newsletter strip ─────────────────────────────────── */}
      <section style={{
        background: tw.white, borderTop: `1px solid ${tw.rule}`,
        borderBottom: `1px solid ${tw.rule}`, padding: '56px clamp(20px, 5vw, 48px)',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 32,
          alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between',
        }}>
          <div style={{ flex: '1 1 320px', minWidth: 280 }}>
            <span style={{
              fontFamily: body, fontSize: 10, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: tw.green, display: 'block',
              marginBottom: 10, fontWeight: 500,
            }}>
              {L.newsletterLabel}
            </span>
            <p style={{
              fontFamily: serif, fontSize: 'clamp(1.3rem, 2.4vw, 1.75rem)',
              color: tw.mid, lineHeight: 1.2, opacity: 0.92, margin: 0,
            }}>
              {L.newsletterTitle}
            </p>
          </div>
          <div style={{ flex: '1 1 320px', minWidth: 280 }}>
            <NewsletterInline
              lang={lang as 'en' | 'es'}
              placeholder={L.newsletterPlaceholder}
              cta={isEN ? 'Subscribe' : 'Suscribirse'}
              successTitle={isEN ? 'Check your inbox.' : 'Revisá tu casilla.'}
              successBody={
                isEN
                  ? "We just sent you a confirmation email. Click the link inside and you're in."
                  : 'Te acabamos de mandar un mail de confirmación. Hacé click en el link y listo.'
              }
              errorGeneric={
                isEN
                  ? 'Something went wrong. Try again in a moment.'
                  : 'Algo salió mal. Probá de nuevo en un momento.'
              }
              errorInvalid={isEN ? 'Please enter a valid email.' : 'Ingresá un email válido.'}
            />
          </div>
        </div>
      </section>

      <Footer lang={lang} tr={tr.footer} />

      <style>{`
        .thinking-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        .thinking-featured {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 900px) {
          .thinking-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
          .thinking-featured { grid-template-columns: 1fr !important; }
          .thinking-featured > div:first-child { border-right: none !important; border-bottom: 1px solid ${tw.rule} !important; }
        }
        @media (max-width: 600px) {
          .thinking-grid { grid-template-columns: 1fr; gap: 24px; }
        }
      `}</style>
    </main>
  )
}

// ── Featured card (big split layout) ─────────────────────────────────────────

function FeaturedCard({
  article, lk, readLabel,
}: {
  article: Article
  lk: (href: string) => string
  readLabel: string
}) {
  return (
    <Link
      href={lk(`/thinking/${article.slug}`)}
      className="thinking-featured"
      style={{
        display: 'grid',
        border: `1px solid ${tw.rule}`,
        background: tw.white,
        textDecoration: 'none',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          background: tw.bg,
          backgroundImage: notebookBg,
          backgroundSize: '100% 32px',
          borderRight: `1px solid ${tw.rule}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 32px',
          minHeight: 320,
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 24,
      }}>
        <div>
          <h2 style={{
            fontFamily: serif, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            lineHeight: 1.08, color: tw.mid, marginBottom: 18, opacity: 0.92,
          }}>
            {article.title}
          </h2>
          <p style={{
            fontFamily: body, fontSize: 15, lineHeight: 1.72,
            color: tw.sub, maxWidth: '44ch', fontWeight: 400, margin: 0,
          }}>
            {article.excerpt}
          </p>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          paddingTop: 20, borderTop: `1px solid ${tw.rule}`,
        }}>
          {article.authorInitials && (
            <span style={{
              width: 36, height: 36, borderRadius: '50%',
              background: tw.green, color: '#fff',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: body, fontSize: 11, fontWeight: 500, flexShrink: 0,
            }}>
              {article.authorInitials}
            </span>
          )}
          <div style={{ flex: 1 }}>
            <span style={{
              fontFamily: serif, fontSize: 13, color: tw.mid,
              display: 'block', letterSpacing: '0.02em',
            }}>
              {article.author ?? 'Bondy Team'}
            </span>
            <span style={{
              fontFamily: body, fontSize: 11, color: tw.faint,
              fontWeight: 400, display: 'block', marginTop: 2,
            }}>
              {article.readingTime}
            </span>
          </div>
          <span style={{
            fontFamily: body, fontSize: 10, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: tw.green, fontWeight: 500,
          }}>
            {readLabel}
          </span>
        </div>
      </div>
    </Link>
  )
}

// ── Post card (grid items) ───────────────────────────────────────────────────

function PostCard({
  article, lk, readLabel,
}: {
  article: Article
  lk: (href: string) => string
  readLabel: string
}) {
  return (
    <Link
      href={lk(`/thinking/${article.slug}`)}
      style={{
        display: 'block',
        border: `1px solid ${tw.rule}`,
        background: tw.white,
        textDecoration: 'none',
      }}
    >
      <div
        style={{
          background: tw.bg,
          backgroundImage: notebookBg,
          backgroundSize: '100% 32px',
          borderBottom: `1px solid ${tw.rule}`,
          padding: '28px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 200,
        }}
      >
        <QuoteImage
          quote={article.quoteImage}
          author={article.author}
          authorInitials={article.authorInitials}
          compact
        />
      </div>
      <div style={{ padding: '20px 22px 22px' }}>
        <div style={{
          fontFamily: body, fontSize: 9, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: tw.green, marginBottom: 10, fontWeight: 500,
        }}>
          {article.category}
        </div>
        <h3 style={{
          fontFamily: serif, fontSize: '1.15rem', lineHeight: 1.2,
          color: tw.mid, marginBottom: 12, opacity: 0.9,
        }}>
          {article.title}
        </h3>
        <p style={{
          fontFamily: body, fontSize: 13, lineHeight: 1.7,
          color: tw.sub, marginBottom: 16, fontWeight: 400,
        }}>
          {article.excerpt.length > 140 ? article.excerpt.slice(0, 140) + '…' : article.excerpt}
        </p>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: 14, borderTop: `1px solid ${tw.rule}`,
        }}>
          <span style={{
            fontFamily: body, fontSize: 10, color: tw.faint, fontWeight: 400,
          }}>
            {article.readingTime}
          </span>
          <span style={{
            fontFamily: body, fontSize: 10, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: tw.green, fontWeight: 500,
          }}>
            {readLabel}
          </span>
        </div>
      </div>
    </Link>
  )
}
