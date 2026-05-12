import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import { t } from '@/lib/i18n/translations'
import EditFormClient from './EditFormClient'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: { lang: 'en' | 'es' }
}): Promise<Metadata> {
  const isES = params.lang === 'es'
  return {
    title: isES ? 'Editá tu perfil — Bondy' : 'Edit your profile — Bondy',
    description: isES
      ? 'Completá o actualizá tu perfil en el talent pool de Bondy.'
      : 'Complete or update your profile in the Bondy talent pool.',
    robots: { index: false, follow: false },
  }
}

const tw = {
  bg: '#FEFCF9',
  ink: '#3A3530',
}

export default function JobsEditPage({
  params,
  searchParams,
}: {
  params: { lang: 'en' | 'es' }
  searchParams: { token?: string }
}) {
  const lang = params.lang === 'en' ? 'en' : 'es'
  const tr = t(lang)
  return (
    <>
      <Nav lang={lang} tr={tr.nav} />
      <main style={{ background: tw.bg, minHeight: 'calc(100vh - 200px)', padding: '60px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <EditFormClient lang={lang} token={searchParams.token || ''} />
        </div>
      </main>
      <Footer lang={lang} tr={tr.footer} />
    </>
  )
}
