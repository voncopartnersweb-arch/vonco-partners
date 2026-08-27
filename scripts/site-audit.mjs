import fs from 'node:fs';
import path from 'node:path';

const productionOrigin = 'https://www.vonco.partners';
const origin = (process.argv[2] || productionOrigin).replace(/\/$/, '');
const sitemapUrl = `${origin}/sitemap.xml`;
const concurrency = 8;
const outputDir = path.join(process.cwd(), 'output', 'audit');
const outputPath = path.join(
  outputDir,
  origin === productionOrigin
    ? 'production-site-audit.json'
    : 'local-site-audit.json',
);
const errors = [];
const warnings = [];
const pages = [];
const pageHreflangLinks = new Map();
const sitemapHreflangCountByPath = new Map();

function decodeHtml(value = '') {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function firstMatch(html, pattern) {
  const match = html.match(pattern);
  return match ? decodeHtml(match[1].trim()) : '';
}

function allMatches(html, pattern) {
  return [...html.matchAll(pattern)].map((match) => decodeHtml(match[1]));
}

function attributeValue(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'));
  return match ? decodeHtml(match[1]) : '';
}

function extractAlternateLinks(html) {
  return [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((match) => match[0])
    .filter((tag) => attributeValue(tag, 'rel').toLowerCase() === 'alternate')
    .map((tag) => ({
      lang: attributeValue(tag, 'hrefLang'),
      href: attributeValue(tag, 'href'),
    }))
    .filter((alternate) => alternate.lang && alternate.href);
}

function extractHeaderAlternateLinks(header = '') {
  return [...header.matchAll(/<([^>]+)>\s*;\s*([^,]+)/g)]
    .map((match) => ({
      href: decodeHtml(match[1]),
      attributes: match[2],
    }))
    .filter(({ attributes }) => /\brel="?alternate"?/i.test(attributes))
    .map(({ href, attributes }) => ({
      lang:
        attributes.match(/\bhreflang="?([^";,\s]+)"?/i)?.[1] || '',
      href,
    }))
    .filter((alternate) => alternate.lang && alternate.href);
}

function normalizeHreflangLanguage(value) {
  const normalized = value.toLowerCase();
  return normalized === 'x-default' ? normalized : normalized.split('-')[0];
}

function normalizeUrl(value) {
  const url = new URL(value, origin);
  url.hash = '';
  url.search = '';
  if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/$/, '');
  return url.toString();
}

function toAuditOrigin(value) {
  const url = new URL(value, origin);
  return normalizeUrl(`${origin}${url.pathname}${url.search}`);
}

function contentPath(value) {
  const pathname = new URL(value, origin).pathname;
  return pathname.replace(/^\/(uk|en|ru|es|hy|be|ro|ka|uz|kk|az|tg)(?=\/|$)/, '') || '/';
}

function countWords(html) {
  const visibleText = decodeHtml(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  ).replace(/\s+/g, ' ');
  const segmenter = new Intl.Segmenter(undefined, { granularity: 'word' });
  return [...segmenter.segment(visibleText)].filter((part) => part.isWordLike).length;
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);
  try {
    return await fetch(url, {
      redirect: 'follow',
      ...options,
      headers: {
        'user-agent': 'VoncoTechnicalAudit/1.0',
        ...(options.headers || {}),
      },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function auditPage(url) {
  try {
    const startedAt = performance.now();
    const response = await fetchWithTimeout(url);
    const durationMs = Math.round(performance.now() - startedAt);
    const contentType = response.headers.get('content-type') || '';
    const finalUrl = normalizeUrl(response.url);
    const requestedUrl = normalizeUrl(url);

    if (response.status !== 200) {
      errors.push(`${url}: HTTP ${response.status}`);
      return;
    }
    if (!contentType.includes('text/html')) {
      errors.push(`${url}: expected HTML, received ${contentType || 'unknown'}`);
      return;
    }
    if (requestedUrl !== finalUrl) {
      warnings.push(`${url}: sitemap URL redirects to ${response.url}`);
    }

    const html = await response.text();
    const title = firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
    const description = firstMatch(
      html,
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i,
    );
    const canonical = firstMatch(
      html,
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
    );
    const h1Count = (html.match(/<h1(?:\s[^>]*)?>/gi) || []).length;
    const alternateLinks = [
      ...extractAlternateLinks(html),
      ...extractHeaderAlternateLinks(response.headers.get('link') || ''),
    ].map((alternate) => ({
      lang: alternate.lang,
      href: toAuditOrigin(alternate.href),
    }));
    pageHreflangLinks.set(requestedUrl, alternateLinks);
    const hreflangLanguageCounts = alternateLinks.reduce((counts, alternate) => {
      const language = normalizeHreflangLanguage(alternate.lang);
      counts.set(language, (counts.get(language) || 0) + 1);
      return counts;
    }, new Map());
    const duplicateHreflangLanguages = [...hreflangLanguageCounts]
      .filter(([, count]) => count > 1)
      .map(([language]) => language);
    const robots = firstMatch(
      html,
      /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i,
    );
    const jsonLdBlocks = allMatches(
      html,
      /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    );
    const wordCount = countWords(html);

    if (!title) errors.push(`${url}: missing title`);
    if (title && [...title].length > 65) warnings.push(`${url}: title has ${[...title].length} characters`);
    if (!description) errors.push(`${url}: missing meta description`);
    if (description && [...description].length > 165) {
      warnings.push(`${url}: description has ${[...description].length} characters`);
    }
    if (!canonical) errors.push(`${url}: missing canonical`);
    else {
      const expectedCanonical = origin === productionOrigin
        ? finalUrl
        : normalizeUrl(`${productionOrigin}${new URL(response.url).pathname}`);
      if (normalizeUrl(canonical) !== expectedCanonical) {
        errors.push(`${url}: canonical ${canonical} does not match ${expectedCanonical}`);
      }
    }
    if (h1Count !== 1) errors.push(`${url}: expected one H1, found ${h1Count}`);
    const expectedHreflangCount =
      sitemapHreflangCountByPath.get(new URL(url).pathname) ?? 5;
    if (alternateLinks.length < expectedHreflangCount) {
      errors.push(
        `${url}: only ${alternateLinks.length} hreflang values, expected ${expectedHreflangCount}`,
      );
    }
    if (duplicateHreflangLanguages.length) {
      errors.push(
        `${url}: duplicate hreflang languages (${duplicateHreflangLanguages.join(', ')})`,
      );
    }
    if (/noindex/i.test(robots)) errors.push(`${url}: sitemap page is marked noindex`);
    if (!jsonLdBlocks.length) {
      errors.push(`${url}: missing server-rendered JSON-LD`);
    }
    if (wordCount < 120) warnings.push(`${url}: thin visible content (${wordCount} words)`);
    if (durationMs > 2500) warnings.push(`${url}: slow HTML response (${durationMs} ms)`);

    for (const block of jsonLdBlocks) {
      try {
        JSON.parse(block);
      } catch (error) {
        errors.push(`${url}: invalid JSON-LD (${error.message})`);
      }
    }

    const internalLinks = allMatches(html, /<a\b[^>]+href=["']([^"']+)["']/gi)
      .filter((href) => href.startsWith('/') || href.startsWith(origin))
      .map((href) => normalizeUrl(href));

    pages.push({
      url,
      finalUrl: response.url,
      status: response.status,
      durationMs,
      title,
      description,
      canonical,
      h1Count,
      hreflangCount: alternateLinks.length,
      jsonLdCount: jsonLdBlocks.length,
      wordCount,
      internalLinks: [...new Set(internalLinks)],
    });
  } catch (error) {
    errors.push(`${url}: ${error.name === 'AbortError' ? 'request timed out' : error.message}`);
  }
}

async function runPool(items, worker) {
  let cursor = 0;
  async function next() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, next));
}

const sitemapResponse = await fetchWithTimeout(sitemapUrl);
if (!sitemapResponse.ok) {
  throw new Error(`Cannot load sitemap: HTTP ${sitemapResponse.status}`);
}
const sitemap = await sitemapResponse.text();
const sitemapEntries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)]
  .map((match) => match[1])
  .map((block) => ({
    url: decodeHtml(block.match(/<loc>(.*?)<\/loc>/)?.[1] || ''),
    hreflangCount: (block.match(/<xhtml:link\b[^>]+hreflang=/gi) || []).length,
  }))
  .filter((entry) => entry.url);

for (const entry of sitemapEntries) {
  sitemapHreflangCountByPath.set(
    new URL(entry.url).pathname,
    entry.hreflangCount,
  );
}

const sitemapUrls = sitemapEntries
  .map((entry) => entry.url)
  .map((url) => {
    const parsed = new URL(url);
    return origin === productionOrigin
      ? parsed.toString()
      : `${origin}${parsed.pathname}${parsed.search}`;
  })
  .filter((url, index, values) => values.indexOf(url) === index);

if (!sitemapUrls.length) throw new Error('Sitemap contains no URL entries');
console.log(`Auditing ${sitemapUrls.length} sitemap URLs at ${origin} ...`);
await runPool(sitemapUrls, auditPage);

const sitemapSet = new Set(sitemapUrls.map(normalizeUrl));
const linkedUrls = new Set(pages.flatMap((page) => page.internalLinks));
const extraInternalUrls = [...linkedUrls].filter(
  (url) => url.startsWith(`${origin}/`) && !sitemapSet.has(url),
);

await runPool(extraInternalUrls, async (url) => {
  try {
    const response = await fetchWithTimeout(url, { method: 'HEAD' });
    if (response.status >= 400) errors.push(`Internal link ${url}: HTTP ${response.status}`);
  } catch (error) {
    errors.push(`Internal link ${url}: ${error.message}`);
  }
});

const pagesByUrl = new Map(
  pages.map((page) => [normalizeUrl(page.url), page]),
);
const incomingInternalLinks = new Map(
  sitemapUrls.map((url) => [normalizeUrl(url), new Set()]),
);

for (const page of pages) {
  const sourceUrl = normalizeUrl(page.url);
  for (const targetUrl of page.internalLinks) {
    const normalizedTarget = normalizeUrl(targetUrl);
    if (normalizedTarget === sourceUrl || !sitemapSet.has(normalizedTarget)) {
      continue;
    }
    incomingInternalLinks.get(normalizedTarget)?.add(sourceUrl);
  }
}

const lowIncomingInternalLinks = pages
  .map((page) => ({
    url: page.url,
    incomingLinks: incomingInternalLinks.get(normalizeUrl(page.url))?.size || 0,
  }))
  .filter((page) => page.incomingLinks <= 1)
  .sort((a, b) => a.incomingLinks - b.incomingLinks || a.url.localeCompare(b.url));

const shortMetaDescriptions = pages
  .map((page) => ({
    url: page.url,
    length: [...page.description].length,
    description: page.description,
  }))
  .filter((page) => page.length > 0 && page.length < 100)
  .sort((a, b) => a.length - b.length || a.url.localeCompare(b.url));

for (const page of pages) {
  const pageUrl = normalizeUrl(page.url);
  const alternateLinks = pageHreflangLinks.get(pageUrl) || [];
  for (const alternate of alternateLinks) {
    if (alternate.lang.toLowerCase() === 'x-default') continue;

    const targetPage = pagesByUrl.get(normalizeUrl(alternate.href));
    if (!targetPage) {
      errors.push(
        `${page.url}: hreflang ${alternate.lang} points outside the valid sitemap (${alternate.href})`,
      );
      continue;
    }

    const targetAlternateLinks =
      pageHreflangLinks.get(normalizeUrl(targetPage.url)) || [];
    const hasReturnTag = targetAlternateLinks.some(
      (candidate) =>
        candidate.lang.toLowerCase() !== 'x-default' &&
        normalizeUrl(candidate.href) === pageUrl,
    );
    if (!hasReturnTag) {
      errors.push(
        `${page.url}: hreflang ${alternate.lang} target has no return tag (${alternate.href})`,
      );
    }
  }
}

for (const field of ['title', 'description']) {
  const groups = new Map();
  for (const page of pages) {
    const value = page[field];
    if (!value) continue;
    const urls = groups.get(value) || [];
    urls.push(page.url);
    groups.set(value, urls);
  }
  for (const [value, urls] of groups) {
    if (urls.length > 1) {
      const paths = new Set(urls.map(contentPath));
      if (field === 'title' && paths.size === 1) continue;
      warnings.push(`Duplicate ${field} on ${urls.length} pages: ${value} :: ${urls.join(', ')}`);
    }
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  origin,
  sitemapUrl,
  summary: {
    sitemapUrls: sitemapUrls.length,
    auditedPages: pages.length,
    extraInternalUrls: extraInternalUrls.length,
    lowIncomingInternalLinks: lowIncomingInternalLinks.length,
    shortMetaDescriptions: shortMetaDescriptions.length,
    errors: errors.length,
    warnings: warnings.length,
  },
  errors,
  warnings,
  diagnostics: {
    lowIncomingInternalLinks,
    shortMetaDescriptions,
  },
  pages,
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);

console.log(JSON.stringify(report.summary, null, 2));
console.log(`Report: ${outputPath}`);
if (errors.length) {
  console.error(`Site audit failed with ${errors.length} errors.`);
  process.exitCode = 1;
} else {
  console.log(`Site audit passed with ${warnings.length} warnings.`);
}
