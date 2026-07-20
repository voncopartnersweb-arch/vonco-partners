import assert from 'node:assert/strict';

import { getProgramCampaignsContent } from '../data/programCampaigns';
import { SUPPORTED_LOCALES } from '../lib/seo';

for (const locale of SUPPORTED_LOCALES) {
  const content = getProgramCampaignsContent(locale);

  assert.match(content.currentAmount, /400/, `${locale}: current reward is missing`);
  assert.equal(content.previousPrograms.length, 3, `${locale}: previous programs are incomplete`);
  assert.ok(content.currentLabel, `${locale}: current status label is missing`);
  assert.ok(content.previousLabel, `${locale}: previous status label is missing`);
  assert.ok(content.fuelArchiveLabel, `${locale}: fuel archive label is missing`);
  assert.ok(content.statusText, `${locale}: campaign status explanation is missing`);

  for (const program of content.previousPrograms) {
    assert.ok(program.title && program.text, `${locale}: incomplete previous program`);
  }
}

console.log(`Programs audit passed: current referral and 3 previous campaigns across ${SUPPORTED_LOCALES.length} locales.`);
