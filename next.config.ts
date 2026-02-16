import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Enable bundle analyzer when ANALYZE env var is set
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: true,
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
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

// Compose plugins: first apply next-intl, then bundle analyzer wrapper
export default withBundleAnalyzer(withNextIntl(nextConfig));
