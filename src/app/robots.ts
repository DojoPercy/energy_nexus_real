import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/_next/',
        '/my-account/',
        '/private/',
      ],
    },
    sitemap: 'https://energynexusmag.com/sitemap.xml',
  }
}
