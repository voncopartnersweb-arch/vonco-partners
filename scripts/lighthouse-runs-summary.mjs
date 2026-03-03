import fs from 'node:fs';
import path from 'node:path';

const runsDir = process.argv[2] || '.lighthouse/runs';

if (!fs.existsSync(runsDir)) {
  console.error(`Directory not found: ${runsDir}`);
  process.exit(1);
}

const files = fs
  .readdirSync(runsDir)
  .filter((file) =>
    /^mobile-\d+(\.report\.json)?$/.test(file) || /^mobile-\d+\.json$/.test(file),
  )
  .sort((a, b) => {
    const aNum = Number((a.match(/\d+/) || ['0'])[0]);
    const bNum = Number((b.match(/\d+/) || ['0'])[0]);
    return aNum - bNum;
  });

if (!files.length) {
  console.error(`No mobile run files found in ${runsDir}`);
  process.exit(1);
}

const rows = files.map((file, index) => {
  const report = JSON.parse(fs.readFileSync(path.join(runsDir, file), 'utf8'));
  const audits = report.audits;

  return {
    file,
    run: index + 1,
    perf: Math.round((report.categories.performance.score || 0) * 100),
    seo: Math.round((report.categories.seo.score || 0) * 100),
    fcpMs: audits['first-contentful-paint']?.numericValue || 0,
    lcpMs: audits['largest-contentful-paint']?.numericValue || 0,
    siMs: audits['speed-index']?.numericValue || 0,
    tbtMs: audits['total-blocking-time']?.numericValue || 0,
    cls: audits['cumulative-layout-shift']?.numericValue || 0,
  };
});

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
};

const toSeconds = (ms) => `${(ms / 1000).toFixed(2)} s`;

console.table(
  rows.map((row) => ({
    file: row.file,
    run: row.run,
    perf: row.perf,
    seo: row.seo,
    fcp: toSeconds(row.fcpMs),
    lcp: toSeconds(row.lcpMs),
    si: toSeconds(row.siMs),
    tbt: `${Math.round(row.tbtMs)} ms`,
    cls: row.cls.toFixed(3),
  })),
);

const summary = {
  runs: rows.length,
  perfMedian: median(rows.map((row) => row.perf)),
  seoMedian: median(rows.map((row) => row.seo)),
  fcpMedian: toSeconds(median(rows.map((row) => row.fcpMs))),
  lcpMedian: toSeconds(median(rows.map((row) => row.lcpMs))),
  siMedian: toSeconds(median(rows.map((row) => row.siMs))),
  tbtMedian: `${Math.round(median(rows.map((row) => row.tbtMs)))} ms`,
  clsMedian: median(rows.map((row) => row.cls)).toFixed(3),
};

console.log('\nMedian summary:');
console.table(summary);
