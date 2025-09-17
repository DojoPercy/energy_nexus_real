import {sanityFetch} from '@/sanity/lib/live'
import {getSpecialReportBySlug} from '@/sanity/lib/queries'
import {PortableTextComponent} from '@/sanity/lib/portableText'
import {urlFor} from '@/sanity/lib/image'
import Image from 'next/image'
import SaveButton from '@/components/SaveButton'
import { auth0 } from '@/lib/auth0'
import { client as sanityClient } from '@/sanity/lib/client'

type SpecialReport = {
  _id: string
  title: string
  slug: { current: string }
  dek?: string
  hero?: { image?: any, caption?: string, credit?: string }
  summary?: any
  pdf?: { asset?: { _ref: string } }
}

export default async function SpecialReportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { data } = await sanityFetch({
    query: getSpecialReportBySlug,
    params,
  })
  const report = data
  if (!report) return <div className="max-w-5xl mx-auto p-6">Not found</div>

  const session = await auth0.getSession()
  const email = session?.user?.email as string | undefined
  let initialSaved = false
  if (email) {
    const existingSavedId = await sanityClient.fetch<string | null>(
      `*[_type == "savedItem" && user->email == $email && content._ref == $contentId][0]._id`,
      { email, contentId: report._id }
    )
    initialSaved = Boolean(existingSavedId)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">{report.title}</h1>
          <SaveButton contentId={report._id} initialSaved={initialSaved} />
        </div>
        {report.dek && <p className="text-lg text-gray-600 mb-6">{report.dek}</p>}
        {report.hero?.image && (
          <div className="relative aspect-[16/9] mb-8 w-full overflow-hidden rounded-lg">
            <Image src={urlFor(report.hero.image).url()} alt={report.title} fill className="object-cover" />
          </div>
        )}
        {report.summary && (
          <article className="prose max-w-none">
            <PortableTextComponent value={report.summary} />
          </article>
        )}
      </div>
    </div>
  )
}


