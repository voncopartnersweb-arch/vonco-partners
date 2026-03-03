import fs from 'node:fs';

const [beforePath, afterPath] = process.argv.slice(2);

if (!beforePath || !afterPath) {
  console.error(
    'Usage: node scripts/lighthouse-compare.mjs <before.report.json> <after.report.json>',
  );
  process.exit(1);
}

function readReport(path) {
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

function snapshot(report) {
  const audits = report.audits;
  return {
    performance: Math.round((report.categories.performance.score || 0) * 100),
    seo: Math.round((report.categories.seo.score || 0) * 100),
    fcp: audits['first-contentful-paint']?.displayValue || '-',
    lcp: audits['largest-contentful-paint']?.displayValue || '-',
    speedIndex: audits['speed-index']?.displayValue || '-',
    tbt: audits['total-blocking-time']?.displayValue || '-',
    cls: audits['cumulative-layout-shift']?.displayValue || '-',
  };
}

const before = snapshot(readReport(beforePath));
const after = snapshot(readReport(afterPath));

console.log('Before:', beforePath);
console.table(before);
console.log('After:', afterPath);
console.table(after);
