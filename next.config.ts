import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Enable bundle analyzer when ANALYZE env var is set
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: false,
  },
  async redirects() {
    return [
      {
        source: '/cars/tesla-model-3-long-range-2021',
        destination: '/cars/tesla-model-3',
        permanent: true,
      },
      {
        source:
          '/:lang(uk|en|ru|es|hy|be|ro|ka|uz|kk|az|tg)/cars/tesla-model-3-long-range-2021',
        destination: '/:lang/cars/tesla-model-3',
        permanent: true,
      },
    ];
  },
  images: {
    // Improve caching for optimized images served via /_next/image
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=300, s-maxage=300, stale-while-revalidate=3600',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
      {
        source: '/manifest.webmanifest',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

// Compose plugins: first apply next-intl, then bundle analyzer wrapper
export default withBundleAnalyzer(withNextIntl(nextConfig));
