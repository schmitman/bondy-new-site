import type { Lang } from '@/lib/i18n/translations'
import ContactClient from './ContactClient'

export { generateMetadata } from './metadata'

export default function ContactPage({ params }: { params: { lang: Lang } }) {
  return <ContactClient params={params} />
}
