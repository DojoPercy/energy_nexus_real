import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { getAllArticles, getAllInterviews, getAllEvents, getAllPublications, getAllVideos } from '@/sanity/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://financefocusmea.com'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/interviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/publications`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/advertise`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/contract-publishing`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
  ]

  // Fetch dynamic content
  const [articles, interviews, events, publications, videos] = await Promise.all([
    client.fetch(getAllArticles),
    client.fetch(getAllInterviews),
    client.fetch(getAllEvents),
    client.fetch(getAllPublications),
    client.fetch(getAllVideos),
  ])

  // Articles
  const articlePages = articles
    .filter((article: any) => article.slug?.current)
    .map((article: any) => ({
      url: `${baseUrl}/articles/${article.slug.current}`,
      lastModified: article.updatedAt ? new Date(article.updatedAt) : new Date(article.publishedAt || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  // Interviews
  const interviewPages = interviews
    .filter((interview: any) => interview.slug?.current)
    .map((interview: any) => ({
      url: `${baseUrl}/interviews/${interview.slug.current}`,
      lastModified: interview.updatedAt ? new Date(interview.updatedAt) : new Date(interview.publishedAt || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  // Events
  const eventPages = events
    .filter((event: any) => event.slug?.current)
    .map((event: any) => ({
      url: `${baseUrl}/events/${event.slug.current}`,
      lastModified: event.updatedAt ? new Date(event.updatedAt) : new Date(event.start || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  // Publications
  const publicationPages = publications
    .filter((publication: any) => publication.slug?.current)
    .map((publication: any) => ({
      url: `${baseUrl}/publications/${publication.slug.current}`,
      lastModified: new Date(publication.year || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  // Videos
  const videoPages = videos
    .filter((video: any) => video.slug?.current)
    .map((video: any) => ({
      url: `${baseUrl}/videos/${video.slug.current}`,
      lastModified: video.updatedAt ? new Date(video.updatedAt) : new Date(video.publishedAt || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  return [
    ...staticPages,
    ...articlePages,
    ...interviewPages,
    ...eventPages,
    ...publicationPages,
    ...videoPages,
  ]
}
