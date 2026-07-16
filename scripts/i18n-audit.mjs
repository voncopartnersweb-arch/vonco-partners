import fs from 'node:fs';
import path from 'node:path';

const dir = 'messages';
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort();
const baseLocale = 'en';

const flatten = (obj, prefix = '', out = {}) => {
  for (const [key, value] of Object.entries(obj || {})) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flatten(value, fullKey, out);
    } else {
      out[fullKey] = String(value);
    }
  }
  return out;
};

const base = JSON.parse(
  fs.readFileSync(path.join(dir, `${baseLocale}.json`), 'utf8'),
);
const baseFlat = flatten(base);
const flattenedByLocale = new Map([[baseLocale, baseFlat]]);

const skipAsBrandOrGeo = (key) =>
  /^(Socials\.(instagram|facebook|tiktok|telegram)$|DriverForm\.cities\.[^.]+$|Footer\.(katowice|krakow)$|ContactsPage\.(northCitiesLabel|southCitiesLabel)$|QuickContact\.(telegram|whatsapp|sms)$|CitiesPage\.cities\.[^.]+\.(name|districts)$)/.test(
    key,
  );

for (const file of files) {
  const locale = file.replace('.json', '');
  if (locale === baseLocale) continue;

  const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
  const flat = flatten(data);
  flattenedByLocale.set(locale, flat);

  const missing = Object.keys(baseFlat).filter((k) => !(k in flat));
  const sameAsBase = Object.entries(flat)
    .filter(([k, v]) => k in baseFlat && v === baseFlat[k] && !skipAsBrandOrGeo(k))
    .map(([k]) => k);

  console.log(
    `[${locale}] missing=${missing.length} untranslated=${sameAsBase.length}`,
  );
  if (missing.length) {
    console.log(`  missing sample: ${missing.slice(0, 8).join(', ')}`);
  }
  if (sameAsBase.length) {
    console.log(`  untranslated sample: ${sameAsBase.slice(0, 8).join(', ')}`);
  }
}

const localeNames = [...flattenedByLocale.keys()];
for (let leftIndex = 0; leftIndex < localeNames.length; leftIndex += 1) {
  for (let rightIndex = leftIndex + 1; rightIndex < localeNames.length; rightIndex += 1) {
    const leftLocale = localeNames[leftIndex];
    const rightLocale = localeNames[rightIndex];
    const left = flattenedByLocale.get(leftLocale);
    const right = flattenedByLocale.get(rightLocale);
    const comparable = Object.keys(left).filter(
      (key) => key in right && !skipAsBrandOrGeo(key) && left[key].length >= 12,
    );
    const identical = comparable.filter((key) => left[key] === right[key]);
    const ratio = comparable.length ? identical.length / comparable.length : 0;
    if (identical.length >= 25 && ratio >= 0.2) {
      console.warn(
        `[warning] ${leftLocale}/${rightLocale}: ${identical.length}/${comparable.length} ` +
          `non-trivial strings are identical (${Math.round(ratio * 100)}%)`,
      );
    }
  }
}
