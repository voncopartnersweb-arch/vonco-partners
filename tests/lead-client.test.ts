import assert from 'node:assert/strict';
import test from 'node:test';

import { submitDriverApplication } from '../lib/lead-client';

const payload = {
  name: 'Jan Kowalski',
  phoneNumber: '+48 500 600 700',
  email: 'jan@example.com',
  city: 'krakow',
  consent: true,
  locale: 'pl',
  pagePath: '/pl/contacts',
  company: '',
};

test('posts a driver application as JSON', async () => {
  let requestUrl = '';
  let requestInit: RequestInit | undefined;
  const result = await submitDriverApplication(payload, async (url, init) => {
    requestUrl = String(url);
    requestInit = init;
    return Response.json({ ok: true });
  });

  assert.equal(result, true);
  assert.equal(requestUrl, '/api/leads');
  assert.equal(requestInit?.method, 'POST');
  assert.deepEqual(requestInit?.headers, { 'Content-Type': 'application/json' });
  assert.equal(requestInit?.body, JSON.stringify(payload));
});

test('reports an unsuccessful API response', async () => {
  const result = await submitDriverApplication(
    payload,
    async () => Response.json({ ok: false }, { status: 502 }),
  );

  assert.equal(result, false);
});
