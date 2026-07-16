import { spawn } from 'node:child_process';

const port = 3101;
const origin = `http://127.0.0.1:${port}`;
const routes = [
  '/',
  '/ru',
  '/ru/about',
  '/ru/contacts',
  '/ru/cars',
  '/ru/cars/tesla-model-3',
  '/ru/cities',
  '/ru/cities/katowice',
  '/ru/cities/katowice/uber',
  '/ru/cities/bielsko-biala',
  '/ru/cities/gdynia',
  '/ru/vykup-avto',
  '/ru/blog',
  '/ru/blog/uber-bolt-partner-poland',
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
  if (alternates.length < 5) failures.push(`${route}: missing language alternates`);
  if (headings.length !== 1) failures.push(`${route}: expected one H1, found ${headings.length}`);
  if (keywordTags.length) failures.push(`${route}: obsolete meta keywords are present`);
  if (route.startsWith('/ru') && /тиждень|робота в таксі|оренда авто/.test(html)) {
    failures.push(`${route}: Ukrainian text leaked into Russian HTML`);
  }

  for (const script of matches(html, /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) {
    try {
      JSON.parse(decode(script[1]));
    } catch (error) {
      failures.push(`${route}: invalid JSON-LD (${error.message})`);
    }
  }
}

try {
  await waitForServer();
  for (const route of routes) await auditRoute(route);

  const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
  const locations = matches(sitemap, /<loc>(.*?)<\/loc>/g).map((match) => match[1]);
  const required = [
    'https://vonco.partners/ru/vykup-avto',
    'https://vonco.partners/ru/cities/bielsko-biala',
    'https://vonco.partners/ru/cities/gdynia',
    'https://vonco.partners/ru/blog/uber-bolt-partner-poland',
  ];
  for (const url of required) {
    if (!locations.includes(url)) failures.push(`sitemap: missing ${url}`);
  }
  if (locations.some((url) => url.includes('/es/cities/bielsko-biala'))) {
    failures.push('sitemap: unpublished Bielsko-Biała translation is indexable');
  }
  if (locations.some((url) => /cities\/(bielsko-biala|gdynia)\/(uber|bolt|freenow)/.test(url))) {
    failures.push('sitemap: thin platform page for a new city is indexable');
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
