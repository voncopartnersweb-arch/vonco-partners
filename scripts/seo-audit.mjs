import { spawn } from 'node:child_process';

const port = 3101;
const origin = `http://127.0.0.1:${port}`;
const routes = [
  '/',
  '/ru',
  '/ru/about',
  '/ru/programs',
  '/ru/contacts',
  '/ru/cars',
  '/ru/cars/tesla-model-3',
  '/ru/cities',
  '/ru/cities/katowice',
  '/ru/cities/katowice/uber',
  '/ru/cities/bielsko-biala',
  '/ru/cities/gdynia',
  '/es/cities/bielsko-biala/uber',
  '/ka/cities/gdynia/freenow',
  '/uk/cities/oswiecim/bolt',
  '/pl/cities/zator/freenow',
  '/ru/vykup-avto',
  '/ru/documents-for-taxi-work',
  '/ru/blog',
  '/ru/blog/uber-bolt-partner-poland',
  '/ru/blog/rabota-v-taksi-v-polshe',
  '/ru/blog/arenda-avto-dlya-taksi-v-polshe',
  '/ru/blog/avto-pod-vykup-dlya-taksi-v-polshe',
  '/ru/blog/rabota-uber-bolt-katowice',
];
const aiCrawlerUserAgents = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'PerplexityBot',
  'ClaudeBot',
  'Google-Extended',
  'Applebot',
  'bingbot',
];

const failures = [];
const server = spawn(
  process.execPath,
  ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port)],
  { cwd: process.cwd(), stdio: ['ignore', 'ignore', 'pipe'] },
);

let serverError = '';
server.stderr.on('data', (chunk) => {
  serverError += chunk.toString();
});

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(origin, { redirect: 'manual' });
      if (response.status < 500) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Next.js server did not start. ${serverError}`);
}

function matches(html, pattern) {
  return [...html.matchAll(pattern)];
}

function decode(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

async function auditRoute(route) {
  const response = await fetch(`${origin}${route}`);
  if (response.status !== 200) {
    failures.push(`${route}: expected 200, received ${response.status}`);
    return;
  }
  const html = await response.text();
  const titles = matches(html, /<title>(.*?)<\/title>/gs).map((match) => decode(match[1]));
  const descriptions = matches(html, /<meta name="description" content="(.*?)"/gs).map((match) => decode(match[1]));
  const canonicals = matches(html, /<link rel="canonical" href="(.*?)"/g);
  const alternates = matches(html, /<link rel="alternate" hrefLang="(.*?)" href="(.*?)"/g);
  const headings = matches(html, /<h1(?:\s[^>]*)?>(.*?)<\/h1>/gs);
  const keywordTags = matches(html, /<meta name="keywords"/g);
  const jsonLdScripts = matches(
    html,
    /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs,
  );

  if (titles.length !== 1) failures.push(`${route}: expected one title, found ${titles.length}`);
  if (titles[0] && Array.from(titles[0]).length > 60) {
    failures.push(`${route}: title is ${Array.from(titles[0]).length} characters`);
  }
  if (titles[0] && (titles[0].match(/Vonco Partners/gi) || []).length > 1) {
    failures.push(`${route}: duplicated brand in title`);
  }
  if (descriptions.length !== 1) failures.push(`${route}: expected one description`);
  if (descriptions[0] && Array.from(descriptions[0]).length > 160) {
    failures.push(`${route}: description is ${Array.from(descriptions[0]).length} characters`);
  }
  if (canonicals.length !== 1) failures.push(`${route}: expected one canonical`);
  const expectedAlternates =
    route.startsWith('/ru/blog/') &&
    route !== '/ru/blog/uber-bolt-partner-poland'
      ? 2
      : 5;
  if (alternates.length < expectedAlternates) {
    failures.push(
      `${route}: missing language alternates (expected ${expectedAlternates}, found ${alternates.length})`,
    );
  }
  if (headings.length !== 1) failures.push(`${route}: expected one H1, found ${headings.length}`);
  if (keywordTags.length) failures.push(`${route}: obsolete meta keywords are present`);
  if (!jsonLdScripts.length) {
    failures.push(`${route}: missing server-rendered JSON-LD`);
  }
  if (route.startsWith('/ru') && /тиждень|робота в таксі|оренда авто/.test(html)) {
    failures.push(`${route}: Ukrainian text leaked into Russian HTML`);
  }

  for (const script of jsonLdScripts) {
    try {
      JSON.parse(decode(script[1]));
    } catch (error) {
      failures.push(`${route}: invalid JSON-LD (${error.message})`);
    }
  }
}

async function auditAiCrawlerAccess() {
  const robotsResponse = await fetch(`${origin}/robots.txt`);
  const robots = await robotsResponse.text();
  if (robotsResponse.status !== 200) {
    failures.push(`/robots.txt: expected 200, received ${robotsResponse.status}`);
  }
  for (const userAgent of aiCrawlerUserAgents) {
    if (!robots.includes(`User-Agent: ${userAgent}`)) {
      failures.push(`/robots.txt: missing explicit ${userAgent} access`);
    }
  }
  if (!/Allow:\s*\/(?:\s|$)/.test(robots)) {
    failures.push('/robots.txt: root crawling is not allowed');
  }
  if (!robots.includes('Sitemap: https://vonco.partners/sitemap.xml')) {
    failures.push('/robots.txt: canonical sitemap is missing');
  }

  const llmsResponse = await fetch(`${origin}/llms.txt`);
  const llms = await llmsResponse.text();
  if (llmsResponse.status !== 200) {
    failures.push(`/llms.txt: expected 200, received ${llmsResponse.status}`);
  }
  if (!llms.startsWith('# Vonco Partners')) {
    failures.push('/llms.txt: missing H1 heading');
  }
  if (!llms.includes('[Vonco Partners home](https://vonco.partners/ru)')) {
    failures.push('/llms.txt: missing primary Russian canonical link');
  }
  if (!llms.includes('[Contact Vonco Partners](https://vonco.partners/ru/contacts)')) {
    failures.push('/llms.txt: missing manager contact link');
  }
  if (/estimated buyout prices/i.test(llms)) {
    failures.push('/llms.txt: contains stale estimated buyout pricing claim');
  }

  for (const userAgent of aiCrawlerUserAgents) {
    const response = await fetch(`${origin}/ru`, {
      headers: { 'user-agent': userAgent },
    });
    const html = await response.text();
    if (response.status !== 200) {
      failures.push(`${userAgent}: /ru returned ${response.status}`);
      continue;
    }
    if (!/Работа в такси|работа в такси/i.test(html)) {
      failures.push(`${userAgent}: /ru is missing visible Russian content`);
    }
    if (!/type="application\/ld\+json"/.test(html)) {
      failures.push(`${userAgent}: /ru is missing server-rendered JSON-LD`);
    }
  }
}

try {
  await waitForServer();
  for (const route of routes) await auditRoute(route);
  await auditAiCrawlerAccess();

  const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
  const locations = matches(sitemap, /<loc>(.*?)<\/loc>/g).map((match) => match[1]);
  const required = [
    'https://vonco.partners/ru/vykup-avto',
    'https://vonco.partners/ru/programs',
    'https://vonco.partners/ru/cities/bielsko-biala',
    'https://vonco.partners/ru/cities/gdynia',
    'https://vonco.partners/ru/blog/uber-bolt-partner-poland',
    'https://vonco.partners/ru/documents-for-taxi-work',
    'https://vonco.partners/ru/blog/rabota-v-taksi-v-polshe',
    'https://vonco.partners/ru/blog/arenda-avto-dlya-taksi-v-polshe',
    'https://vonco.partners/ru/blog/avto-pod-vykup-dlya-taksi-v-polshe',
    'https://vonco.partners/ru/blog/rabota-uber-bolt-katowice',
  ];
  const locales = ['uk', 'pl', 'en', 'ru', 'es', 'hy', 'be', 'ro', 'uz', 'kk', 'az', 'tg'];
  const cities = ['bielsko-biala', 'gdynia', 'sopot', 'oswiecim', 'zator'];
  const platforms = ['uber', 'bolt', 'freenow'];
  for (const locale of locales) {
    const localePrefix = locale === 'pl' ? '' : `/${locale}`;
    for (const city of cities) {
      required.push(`https://vonco.partners${localePrefix}/cities/${city}`);
      for (const platform of platforms) {
        required.push(
          `https://vonco.partners${localePrefix}/cities/${city}/${platform}`,
        );
      }
    }
  }
  for (const url of required) {
    if (!locations.includes(url)) failures.push(`sitemap: missing ${url}`);
  }
} finally {
  server.kill('SIGTERM');
}

if (failures.length) {
  console.error(`SEO audit failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`SEO audit passed for ${routes.length} routes.`);
}
