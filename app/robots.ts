import { MetadataRoute } from 'next';

const AI_CRAWLERS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'bingbot',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: AI_CRAWLERS, allow: '/' },
      { userAgent: '*', allow: '/' },
    ],
    host: 'https://vonco.partners',
    sitemap: 'https://vonco.partners/sitemap.xml',
  };
}
