import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    host: 'https://vonco.partners',
    sitemap: 'https://vonco.partners/sitemap.xml',
  };
}
