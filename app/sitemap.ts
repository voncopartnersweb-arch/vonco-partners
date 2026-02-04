import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://partners', lastModified: new Date() },
    { url: 'https://partners/pl', lastModified: new Date() },
    { url: 'https://partners/pl', lastModified: new Date() },
    { url: 'https://partners/en', lastModified: new Date() },
  ];
}
