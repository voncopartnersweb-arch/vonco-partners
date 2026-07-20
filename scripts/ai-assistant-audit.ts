import assert from 'node:assert/strict';

import { AI_KNOWLEDGE_VERSION, buildAiSystemPrompt } from '../data/ai';
import { cars } from '../data/cars';
import { COMPANY } from '../data/company';
import { CITY_PAGES, getAppsForCity } from '../data/landingPages';
import { SUPPORTED_LOCALES } from '../lib/seo';

const prompts = SUPPORTED_LOCALES.map((locale) => ({
  locale,
  prompt: buildAiSystemPrompt(locale, `/${locale}/cars`),
}));
const sourcePrompt = prompts.find(({ locale }) => locale === 'uk')?.prompt || '';

assert.match(AI_KNOWLEDGE_VERSION, /^\d{4}-\d{2}-\d{2}\.\d+$/);
assert.ok(sourcePrompt.length > 8_000, 'Knowledge prompt is unexpectedly short');
assert.ok(sourcePrompt.length < 30_000, 'Knowledge prompt is unexpectedly large');

for (const car of cars) {
  assert.ok(sourcePrompt.includes(car.name), `Missing car: ${car.name}`);
  assert.ok(sourcePrompt.includes(car.year), `Missing year for ${car.name}`);
  assert.ok(
    sourcePrompt.includes(String(car.weeklyRent.krakowRegion)) &&
      sourcePrompt.includes(String(car.weeklyRent.katowiceRegion)),
    `Missing rental prices for ${car.name}`,
  );
  assert.ok(
    car.rideCategories.every((category) => sourcePrompt.includes(category)),
    `Missing category for ${car.name}`,
  );
}

for (const city of CITY_PAGES) {
  assert.ok(sourcePrompt.includes(city.slug), `Missing city: ${city.slug}`);
  for (const app of getAppsForCity(city)) {
    assert.ok(sourcePrompt.includes(app.name), `Missing ${app.name} for ${city.slug}`);
  }
}

for (const value of [
  COMPANY.email,
  COMPANY.phones.katowiceRegion.display,
  COMPANY.phones.krakowRegion.display,
  COMPANY.legal.nip,
  COMPANY.legal.regon,
  COMPANY.legal.krs,
  COMPANY.legal.officeAddressLine1,
  COMPANY.social.telegramUsername,
  'Energylandia',
  '8%',
  'AMIC',
  'Sądowa 9',
]) {
  assert.ok(sourcePrompt.includes(value), `Missing required knowledge: ${value}`);
}

for (const forbidden of [
  'Павло Миколайович',
  'менеджер в катовіце: Імя',
  'Комісія: 50 PLN',
  'Виплати: вівторок–середа',
  'Українські права без обміну',
]) {
  assert.ok(!sourcePrompt.includes(forbidden), `Unverified claim remains: ${forbidden}`);
}

for (const { locale, prompt } of prompts) {
  const expectedCarsPath = locale === 'pl' ? '/cars' : `/${locale}/cars`;
  assert.ok(prompt.includes(expectedCarsPath), `Wrong localized links for ${locale}`);
}

console.log(
  `AI knowledge audit passed: ${cars.length} cars, ${CITY_PAGES.length} cities, ${SUPPORTED_LOCALES.length} locales, version ${AI_KNOWLEDGE_VERSION}.`,
);
