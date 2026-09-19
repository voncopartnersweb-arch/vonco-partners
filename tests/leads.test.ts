import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildLeadEmail,
  isSameOriginRequest,
  parseLeadPayload,
} from '../lib/leads';

const validPayload = {
  name: '  Jan Kowalski  ',
  phoneNumber: ' +48 500 600 700 ',
  email: ' JAN@example.com ',
  city: 'krakow',
  consent: true,
  locale: 'pl',
  pagePath: '/pl/contacts?utm_source=google',
  company: '',
};

test('normalizes a valid driver application', () => {
  const result = parseLeadPayload(validPayload);

  assert.equal(result.status, 'valid');
  if (result.status !== 'valid') return;

  assert.deepEqual(result.lead, {
    name: 'Jan Kowalski',
    phoneNumber: '+48 500 600 700',
    email: 'jan@example.com',
    city: 'krakow',
    preferredContactMethods: [],
    locale: 'pl',
    pagePath: '/pl/contacts?utm_source=google',
  });
});

test('rejects an application with an invalid email', () => {
  const result = parseLeadPayload({ ...validPayload, email: 'not-an-email' });

  assert.equal(result.status, 'invalid');
});

test('accepts a phone-only application with optional profile fields', () => {
  const result = parseLeadPayload({
    ...validPayload,
    name: '',
    email: '',
    city: '',
    consent: false,
    preferredContactMethods: ['telegram', 'call'],
  });

  assert.equal(result.status, 'valid');
  if (result.status !== 'valid') return;

  assert.deepEqual(result.lead, {
    name: '',
    phoneNumber: '+48 500 600 700',
    email: '',
    city: '',
    preferredContactMethods: ['telegram', 'call'],
    locale: 'pl',
    pagePath: '/pl/contacts?utm_source=google',
  });
});

test('accepts an email-only application', () => {
  const result = parseLeadPayload({
    ...validPayload,
    phoneNumber: '',
    preferredContactMethods: ['whatsapp'],
  });

  assert.equal(result.status, 'valid');
});

test('rejects an application without a phone number or email', () => {
  const result = parseLeadPayload({
    ...validPayload,
    phoneNumber: '',
    email: '',
  });

  assert.equal(result.status, 'invalid');
});

test('marks a filled honeypot as spam', () => {
  const result = parseLeadPayload({ ...validPayload, company: 'Spam Ltd' });

  assert.equal(result.status, 'spam');
});

test('escapes submitted values in the HTML email', () => {
  const result = parseLeadPayload({
    ...validPayload,
    name: '<script>alert("x")</script>',
  });
  assert.equal(result.status, 'valid');
  if (result.status !== 'valid') return;

  const email = buildLeadEmail(result.lead);

  assert.match(email.subject, /Krakow/);
  assert.doesNotMatch(email.html, /<script>/);
  assert.match(email.html, /&lt;script&gt;alert\(&quot;x&quot;\)&lt;\/script&gt;/);
  assert.match(email.text, /Source: \/pl\/contacts\?utm_source=google/);
});

test('includes preferred contact methods and optional-value fallbacks in the email', () => {
  const result = parseLeadPayload({
    ...validPayload,
    name: '',
    email: '',
    city: '',
    preferredContactMethods: ['telegram', 'viber', 'sms'],
  });
  assert.equal(result.status, 'valid');
  if (result.status !== 'valid') return;

  const email = buildLeadEmail(result.lead);

  assert.equal(email.subject, 'New driver application');
  assert.match(email.text, /Name: Not provided/);
  assert.match(email.text, /Email: Not provided/);
  assert.match(email.text, /Preferred contact: Telegram, Viber, SMS/);
});

test('accepts requests from the effective host', () => {
  const request = new Request('https://internal.vercel.app/api/leads', {
    headers: {
      host: 'www.vonco.partners',
      origin: 'https://www.vonco.partners',
    },
  });

  assert.equal(isSameOriginRequest(request), true);
});

test('rejects requests from another origin', () => {
  const request = new Request('https://www.vonco.partners/api/leads', {
    headers: {
      host: 'www.vonco.partners',
      origin: 'https://example.com',
    },
  });

  assert.equal(isSameOriginRequest(request), false);
});

test('rejects requests without an origin', () => {
  const request = new Request('https://www.vonco.partners/api/leads', {
    headers: { host: 'www.vonco.partners' },
  });

  assert.equal(isSameOriginRequest(request), false);
});

test('rejects an origin with the wrong protocol', () => {
  const request = new Request('https://www.vonco.partners/api/leads', {
    headers: {
      host: 'www.vonco.partners',
      origin: 'http://www.vonco.partners',
    },
  });

  assert.equal(isSameOriginRequest(request), false);
});
