import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vonco Partners',
    short_name: 'Vonco',
    description:
      'Auto rental for taxi drivers in Poland: daily rent and buyout plans.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#070707',
    theme_color: '#b00000',
    lang: 'en',
    icons: [
      {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
