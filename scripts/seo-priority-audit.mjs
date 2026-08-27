const productionOrigin = 'https://www.vonco.partners';
const origin = (process.argv[2] || productionOrigin).replace(/\/$/, '');
const priorityPaths = [
  '/ru',
  '/ru/work',
  '/ru/cars',
  '/ru/services',
  '/ru/cities',
  '/ru/vykup-avto',
  '/ru/documents-for-taxi-work',
  '/ru/cities/katowice',
  '/ru/cities/katowice/uber',
  '/ru/cities/katowice/bolt',
  '/ru/cities/krakow',
  '/ru/cities/gdansk',
  '/ru/blog',
  '/ru/blog/rabota-v-taksi-v-polshe',
  '/ru/blog/arenda-avto-dlya-taksi-v-polshe',
  '/ru/blog/avto-pod-vykup-dlya-taksi-v-polshe',
  '/ru/blog/rabota-uber-bolt-katowice',
];

const errors = [];
const warnings = [];

function decode(value = '') {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function match(html, pattern) {
  return decode(html.match(pattern)?.[1]?.trim() || '');
}

function wordCount(html) {
  const text = decode(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  ).replace(/\s+/g, ' ');
  return [...new Intl.Segmenter('ru', { granularity: 'word' }).segment(text)]
    .filter((part) => part.isWordLike).length;
}

async function fetchPage(path) {
  const response = await fetch(`${origin}${path}`, {
    redirect: 'follow',
    headers: { 'user-agent': 'VoncoRussianSeoAudit/1.0' },
  });
  if (response.status !== 200) {
    errors.push(`${path}: HTTP ${response.status}`);
    return;
  }

  const html = await response.text();
  const title = match(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = match(
    html,
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i,
  );
  const canonical = match(
    html,
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
  );
  const h1Count = (html.match(/<h1(?:\s[^>]*)?>/gi) || []).length;
  const internalLinkCount = new Set(
    [...html.matchAll(/<a\b[^>]+href=["']([^"']+)["']/gi)]
      .map((item) => decode(item[1]))
      .filter((href) => href.startsWith('/')),
  ).size;
  const words = wordCount(html);

  if (!title) errors.push(`${path}: missing title`);
  if (!description) errors.push(`${path}: missing description`);
  if (canonical !== `${productionOrigin}${path}`) {
    errors.push(`${path}: canonical is ${canonical || 'missing'}`);
  }
  if (h1Count !== 1) errors.push(`${path}: expected one H1, found ${h1Count}`);
  if (/noindex/i.test(html)) errors.push(`${path}: contains noindex`);
  if (words < 180) warnings.push(`${path}: only ${words} visible words`);
  if (internalLinkCount < 8) {
    warnings.push(`${path}: only ${internalLinkCount} unique internal links`);
  }

  for (const block of html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      JSON.parse(decode(block[1]));
    } catch (error) {
      errors.push(`${path}: invalid JSON-LD (${error.message})`);
    }
  }

  if (
    path === '/ru/documents-for-taxi-work' &&
    (!html.includes('uber.com/pl/pl/drive/requirements') ||
      !html.includes('bolt.eu/pl-pl/driver/guide/documents'))
  ) {
    errors.push(`${path}: official Uber or Bolt source is missing`);
  }
}

const sitemapResponse = await fetch(`${origin}/sitemap.xml`);
if (!sitemapResponse.ok) {
  throw new Error(`Cannot load sitemap: HTTP ${sitemapResponse.status}`);
}
const sitemap = await sitemapResponse.text();
const sitemapBlocks = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)]
  .map((item) => item[1]);
const sitemapLocations = new Set(
  sitemapBlocks.map((block) => decode(block.match(/<loc>(.*?)<\/loc>/)?.[1] || '')),
);

for (const path of priorityPaths) {
  if (!sitemapLocations.has(`${productionOrigin}${path}`)) {
    errors.push(`sitemap: missing ${productionOrigin}${path}`);
  }
}

const russianBlocks = sitemapBlocks.filter((block) =>
  /<loc>https:\/\/www\.vonco\.partners\/ru(?:\/|<)/.test(block),
);
for (const block of russianBlocks) {
  const loc = decode(block.match(/<loc>(.*?)<\/loc>/)?.[1] || '');
  const xDefault = decode(
    block.match(
      /<xhtml:link[^>]+hreflang=["']x-default["'][^>]+href=["']([^"']+)["']/i,
    )?.[1] || '',
  );
  if (!xDefault.startsWith(`${productionOrigin}/ru`)) {
    errors.push(`${loc}: x-default does not point to Russian content`);
  }
}

for (let index = 0; index < priorityPaths.length; index += 4) {
  await Promise.all(priorityPaths.slice(index, index + 4).map(fetchPage));
}

console.log(
  JSON.stringify(
    {
      origin,
      priorityPages: priorityPaths.length,
      russianSitemapPages: russianBlocks.length,
      errors: errors.length,
      warnings: warnings.length,
    },
    null,
    2,
  ),
);
for (const warning of warnings) console.warn(`Warning: ${warning}`);
for (const error of errors) console.error(`Error: ${error}`);

if (errors.length) process.exitCode = 1;
