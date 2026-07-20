import assert from 'node:assert/strict';
import { cars } from '../data/cars';
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

console.log(
  `Car localization audit passed: ${cars.length} cars across ${SUPPORTED_LOCALES.length} locales.`,
);
