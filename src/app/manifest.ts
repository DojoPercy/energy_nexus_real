import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The BoardRoom Magazine',
    short_name: 'boardroommagazine',
    description: 'Latest Energy News, Articles & Insights from the Middle East and Africa',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e40af',
    icons: [
      {
        src: '/logo_final.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo_final.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['news', 'business', 'finance'],
    lang: 'en',
    dir: 'ltr',
    orientation: 'portrait',
    scope: '/',
    prefer_related_applications: false,
  }
}
