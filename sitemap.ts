import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SERVICE_DOMAIN!;
  return [
    { url: `${base}/`, lastModified: new Date(), priority: 1 },
    { url: `${base}/service`, lastModified: new Date(), priority: 0.5 },
    { url: `${base}/privacy`, lastModified: new Date(), priority: 0.3 },
  ];
}
