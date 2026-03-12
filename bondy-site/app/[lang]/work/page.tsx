import type { Lang } from '@/lib/i18n/translations'
import WorkClient from './WorkClient'

export { generateMetadata } from './metadata'

export default function WorkPage({ params }: { params: { lang: Lang } }) {
  return <WorkClient params={params} />
}
