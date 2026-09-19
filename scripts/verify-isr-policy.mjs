import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = process.cwd();
const manifest = JSON.parse(
  readFileSync(resolve(projectRoot, '.next/prerender-manifest.json'), 'utf8'),
);
const locales = readdirSync(resolve(projectRoot, 'messages'))
  .filter((fileName) => fileName.endsWith('.json'))
  .map((fileName) => fileName.replace(/\.json$/, ''))
  .sort();

const expectedDailyRoutes = locales.map((locale) => `/${locale}`).sort();
const actualDailyRoutes = Object.entries(manifest.routes)
  .filter(([, route]) => route.initialRevalidateSeconds === 86400)
  .map(([pathname]) => pathname)
  .sort();
const unexpectedTimedRoutes = Object.entries(manifest.routes)
  .filter(
    ([pathname, route]) =>
      route.initialRevalidateSeconds !== false &&
      !expectedDailyRoutes.includes(pathname),
  )
  .map(([pathname, route]) => ({
    pathname,
    revalidate: route.initialRevalidateSeconds,
  }));

assert.deepEqual(
  actualDailyRoutes,
  expectedDailyRoutes,
  'Only localized home pages should revalidate once per day',
);
assert.deepEqual(
  unexpectedTimedRoutes,
  [],
  'All non-home prerendered routes should remain static until the next deployment',
);

console.log(
  `ISR policy verified: ${actualDailyRoutes.length} daily home routes; all other prerendered routes are static.`,
);
