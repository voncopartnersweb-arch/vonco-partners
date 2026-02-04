import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const BASE_URL = 'https://vonco.partners';
  return [
    { url: BASE_URL, lastModified, priority: 1.0 },
    { url: `${BASE_URL}/pl`, lastModified, priority: 0.8 },
    { url: `${BASE_URL}/en`, lastModified, priority: 0.8 },
    { url: `${BASE_URL}/uk`, lastModified, priority: 0.8 },
  ];
}
