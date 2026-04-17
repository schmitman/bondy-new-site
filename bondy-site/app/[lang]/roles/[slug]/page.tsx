import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Lang } from '@/lib/i18n/translations'
import { t } from '@/lib/i18n/translations'
import {
  getRoleBySlug,
  listPublishedSlugs,
  publicClientLabel,
  formatSalary,
  type Role,
} from '@/lib/roles'
import ApplyForm from './ApplyForm'

export const revalidate = 60
export const dynamicParams = true

const tw = {
  bg: '#FEFCF9',
  ink: '#1A1A1A',
  inkMid: '#3A3530',
  inkSub: '#5A5550',
  inkFaint: '#7A7874',
  rule: '#E8E4DE',
  white: '#FFFFFF',
  green: '#4A8C40',
}
const serif = "'Special Elite', Georgia, serif"
const mono = "'Plus Jakarta Sans', system-ui, sans-serif"
const notebookBg = [
  'linear-gradient(90deg, transparent 68px, rgba(210,100,80,0.10) 68px, rgba(210,100,80,0.10) 69.5px, transparent 69.5px)',
  'repeating-linear-gradient(180deg, transparent 0px, transparent 31px, rgba(100,140,200,0.09) 31px, rgba(100,140,200,0.09) 32px)',
].join(',')

export async function generateStaticParams() {
  const slugs = await listPublishedSlugs()
  const out: { lang: Lang; slug: string }[] = []
  for (const slug of slugs) {
    out.push({ lang: 'en', slug })
    out.push({ lang: 'es', slug })
  }
  return out
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Lang; slug: string }
}): Promise<Metadata> {
  const role = await getRoleBySlug(params.slug)
  const tr = t(params.lang)
  const baseUrl = 'https://wearebondy.com'

  if (!role) {
    return {
      title: `${tr.roles.detail.notFound.title} — Bondy`,
      robots: { index: false },
    }
  }

  const clientLabel = publicClientLabel(role, params.lang)
  const title = `${role.title} — ${clientLabel} · Bondy`
  const desc =
    role.description_role?.slice(0, 180) ||
    `${role.seniority || ''} ${role.title} at ${clientLabel}. Apply through Bondy.`

  return {
    title,
    description: desc,
    alternates: {
      canonical: `${baseUrl}/${params.lang}/roles/${role.slug}`,
      languages: {
        en: `${baseUrl}/en/roles/${role.slug}`,
        es: `${baseUrl}/es/roles/${role.slug}`,
      },
    },
    openGraph: {
      title,
      description: desc,
      url: `${baseUrl}/${params.lang}/roles/${role.slug}`,
      type: 'article',
    },
  }
}

export default async function RoleDetailPage({
  params,
}: {
  params: { lang: Lang; slug: string }
}) {
  const lang = params.lang
  const tr = t(lang)
  const role = await getRoleBySlug(params.slug)

  if (!role) {
    notFound()
  }

  const clientLabel = publicClientLabel(role, lang)
  const salary = formatSalary(role, lang)
  const s = tr.roles.detail.sections

  return (
    <main style={{ background: tw.bg, minHeight: '100vh', backgroundImage: notebookBg }}>
      <Nav lang={lang} tr={tr.nav} />

      {/* ── Back link ── */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(1.5rem,4vw,2.5rem) clamp(1.25rem,5vw,4rem) 0',
        }}
      >
        <Link
          href={`/${lang}/roles`}
          style={{
            fontFamily: mono,
            fontSize: '11px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: tw.inkFaint,
            textDecoration: 'none',
          }}
        >
          {tr.roles.detail.back}
        </Link>
      </div>

      {/* ── HEADER ── */}
      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(1.5rem,4vw,2.5rem) clamp(1.25rem,5vw,4rem) clamp(2rem,5vw,3rem)',
          borderBottom: `1px solid ${tw.rule}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '1rem',
          }}
        >
          <span
            style={{
              fontFamily: mono,
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: tw.green,
            }}
          >
            {clientLabel}
          </span>
          {role.is_featured && (
            <span
              style={{
                fontFamily: mono,
                fontSize: '9px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: tw.green,
                border: `1px solid ${tw.green}`,
                padding: '2px 8px',
              }}
            >
              {tr.roles.list.featured}
            </span>
          )}
        </div>

        <h1
          style={{
            fontFamily: serif,
            fontSize: 'clamp(2.2rem,5.5vw,3.6rem)',
            lineHeight: 1.05,
            color: tw.inkMid,
            margin: 0,
            opacity: 0.93,
            textShadow: '.5px .5px 0 rgba(0,0,0,.12)',
          }}
        >
          {role.title}
        </h1>

        {/* Quick specs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))',
            gap: '1rem 2rem',
            marginTop: 'clamp(1.5rem,3vw,2rem)',
          }}
        >
          <Spec label={s.seniority} value={role.seniority} />
          <Spec label={s.modality} value={role.modality} />
          <Spec label={s.location} value={role.location} />
          <Spec label={s.english} value={role.english_level} />
          {salary && <Spec label={s.salary} value={salary} />}
        </div>

        <div style={{ marginTop: 'clamp(1.5rem,3vw,2.25rem)' }}>
          <a
            href="#apply"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: mono,
              fontSize: '12px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: tw.green,
              color: '#fff',
              padding: '14px 24px',
              textDecoration: 'none',
            }}
          >
            {tr.roles.detail.apply}
          </a>
        </div>
      </section>

      {/* ── BODY + FORM grid ── */}
      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(2rem,5vw,3rem) clamp(1.25rem,5vw,4rem) clamp(4rem,8vw,6rem)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr)',
          gap: 'clamp(2rem,4vw,3rem)',
        }}
      >
        <article style={{ display: 'grid', gap: 'clamp(1.75rem,3.5vw,2.5rem)' }}>
          {role.about_client && <Block title={s.about} body={role.about_client} />}
          {role.description_role && <Block title={s.role} body={role.description_role} />}
          {role.description_requirements && (
            <Block title={s.requirements} body={role.description_requirements} />
          )}
          {role.tech_stack && role.tech_stack.length > 0 && (
            <ChipBlock title={s.stack} items={role.tech_stack} />
          )}
          {role.description_process && <Block title={s.process} body={role.description_process} />}
          {role.benefits && role.benefits.length > 0 && (
            <ListBlock title={s.benefits} items={role.benefits} />
          )}
        </article>

        {/* Apply form */}
        <div id="apply" style={{ scrollMarginTop: '80px' }}>
          <ApplyForm roleId={role.id} roleSlug={role.slug} lang={lang} />
        </div>
      </section>

      <Footer lang={lang} tr={tr.footer} />
    </main>
  )
}

/* ── sub-components ── */
function Spec({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null
  return (
    <div>
      <div
        style={{
          fontFamily: mono,
          fontSize: '9px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: tw.inkFaint,
          marginBottom: '4px',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: mono,
          fontSize: '14px',
          color: tw.inkSub,
          fontWeight: 500,
        }}
      >
        {value}
      </div>
    </div>
  )
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2
        style={{
          fontFamily: serif,
          fontSize: 'clamp(1.35rem,2.4vw,1.75rem)',
          color: tw.inkMid,
          margin: '0 0 0.9rem',
          opacity: 0.93,
        }}
      >
        {title}
      </h2>
      <div
        style={{
          fontFamily: mono,
          fontSize: '15px',
          lineHeight: 1.75,
          color: tw.inkSub,
          whiteSpace: 'pre-wrap',
        }}
      >
        {body}
      </div>
    </div>
  )
}

function ChipBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2
        style={{
          fontFamily: serif,
          fontSize: 'clamp(1.35rem,2.4vw,1.75rem)',
          color: tw.inkMid,
          margin: '0 0 0.9rem',
          opacity: 0.93,
        }}
      >
        {title}
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {items.map((it) => (
          <span
            key={it}
            style={{
              fontFamily: mono,
              fontSize: '12px',
              color: tw.inkSub,
              border: `1px solid ${tw.rule}`,
              background: tw.white,
              padding: '6px 12px',
            }}
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  )
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2
        style={{
          fontFamily: serif,
          fontSize: 'clamp(1.35rem,2.4vw,1.75rem)',
          color: tw.inkMid,
          margin: '0 0 0.9rem',
          opacity: 0.93,
        }}
      >
        {title}
      </h2>
      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'grid',
          gap: '0.5rem',
          fontFamily: mono,
          fontSize: '15px',
          lineHeight: 1.7,
          color: tw.inkSub,
        }}
      >
        {items.map((it, i) => (
          <li key={i} style={{ paddingLeft: '1.2rem', position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                left: 0,
                color: tw.green,
                fontWeight: 500,
              }}
            >
              ·
            </span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  )
}
