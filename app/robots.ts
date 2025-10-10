import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
      {
        userAgent: ['Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot'],
        allow: '/',
      },
      {
        userAgent: ['AhrefsBot', 'SemrushBot', 'DotBot', 'MJ12bot'],
        disallow: '/',
      },
    ],
    sitemap: 'https://monkey-mauve-alpha.vercel.app/sitemap.xml',
  }
}