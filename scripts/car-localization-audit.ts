import assert from 'node:assert/strict';
import {
  cars,
  PLATFORM_CATEGORY_SOURCES,
  PLATFORM_CATEGORY_VERIFIED_ON,
} from '../data/cars';
import {
  localizeCarBody,
  localizeCarDrive,
  localizeCarFuel,
  localizeCarGearbox,
} from '../lib/carTranslations';
import { SUPPORTED_LOCALES } from '../lib/seo';

for (const locale of SUPPORTED_LOCALES) {
  for (const car of cars) {
    assert.ok(localizeCarFuel(car.fuel, locale), `${locale}: missing fuel for ${car.slug}`);
    assert.ok(
      localizeCarGearbox(car.gearbox, locale),
      `${locale}: missing gearbox for ${car.slug}`,
    );
    assert.ok(localizeCarBody(car.body, locale), `${locale}: missing body for ${car.slug}`);
    assert.ok(localizeCarDrive(car.drive, locale), `${locale}: missing drive for ${car.slug}`);
  }
}

assert.equal(localizeCarGearbox('Automatic', 'uk'), 'Автоматична');
assert.equal(localizeCarFuel('Hybrid + LPG', 'uk'), 'Гібрид + LPG');
assert.equal(localizeCarBody('Wagon', 'uk'), 'Універсал');
assert.equal(localizeCarDrive('FWD', 'uk'), 'Передній (FWD)');

assert.equal(localizeCarGearbox('Automatic', 'pl'), 'Automatyczna');
assert.equal(localizeCarFuel('Hybrid + LPG', 'pl'), 'Hybryda + LPG');
assert.equal(localizeCarBody('Wagon', 'pl'), 'Kombi');
assert.equal(localizeCarDrive('FWD', 'pl'), 'Przedni (FWD)');

assert.equal(localizeCarGearbox('Automatic', 'es'), 'Automática');
assert.equal(localizeCarFuel('Hybrid + LPG', 'es'), 'Híbrido + GLP');
assert.equal(localizeCarBody('Sedan', 'es'), 'Berlina');
assert.equal(localizeCarDrive('FWD', 'es'), 'Delantera (FWD)');

const deprecatedCategoryNames = ['Uber Green', 'Uber XL', 'Uber Premium'];
for (const car of cars) {
  for (const category of deprecatedCategoryNames) {
    assert.ok(
      !car.rideCategories.includes(category),
      `${car.slug}: deprecated category name ${category}`,
    );
  }
}

assert.equal(PLATFORM_CATEGORY_VERIFIED_ON, '2026-07-30');
assert.match(PLATFORM_CATEGORY_SOURCES.uberEligibleVehicles, /^https:\/\/www\.uber\.com\//);
assert.match(PLATFORM_CATEGORY_SOURCES.boltCategories, /^https:\/\/bolt\.eu\//);

const carBySlug = new Map(cars.map((car) => [car.slug, car]));
assert.deepEqual(
  carBySlug.get('toyota-prius-plus-standart')?.rideCategories,
  [
    'UberX',
    'Uber Hybrid',
    'Uber Priority',
    'UberXL',
    'Bolt Green',
    'Bolt XL',
  ],
);
assert.ok(
  !carBySlug.get('lexus-is-300h')?.rideCategories.includes('Uber Comfort'),
  'Lexus IS300H 2016 must not claim Uber Comfort',
);
assert.ok(
  carBySlug.get('tesla-model-3')?.rideCategories.includes(
    'Bolt Comfort Electric',
  ),
  'Tesla Model 3 must include Bolt Comfort Electric',
);

console.log(
  `Car localization audit passed: ${cars.length} cars across ${SUPPORTED_LOCALES.length} locales.`,
);
