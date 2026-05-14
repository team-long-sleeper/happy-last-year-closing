import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SERVICE_DOMAIN!;
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/service', '/privacy'],
      disallow: ['/api/', '/account', '/episode', '/login', '/restore', '/deleted'],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
