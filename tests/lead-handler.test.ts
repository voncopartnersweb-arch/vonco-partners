import assert from 'node:assert/strict';
import test from 'node:test';

import {
  createLeadPostHandler,
  type LeadEmailMessage,
} from '../lib/lead-handler';

const validPayload = {
  name: 'Jan Kowalski',
  phoneNumber: '+48 500 600 700',
  email: 'jan@example.com',
  city: 'krakow',
  consent: true,
  locale: 'pl',
  pagePath: '/pl/contacts?utm_source=google',
  company: '',
};

function leadRequest(payload: unknown, origin = 'https://www.vonco.partners') {
  return new Request('https://www.vonco.partners/api/leads', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      host: 'www.vonco.partners',
      origin,
    },
    body: JSON.stringify(payload),
  });
}

test('sends a valid application to the Vonco inbox', async () => {
  const sent: LeadEmailMessage[] = [];
  const handler = createLeadPostHandler({
    from: 'Vonco Partners <forms@vonco.partners>',
    sendEmail: async (message) => {
      sent.push(message);
      return { id: 'email_123' };
    },
  });

  const response = await handler(leadRequest(validPayload));

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(sent.length, 1);
  assert.equal(sent[0].to, 'vonco.partners@gmail.com');
  assert.equal(sent[0].replyTo, 'jan@example.com');
  assert.equal(sent[0].from, 'Vonco Partners <forms@vonco.partners>');
  assert.match(sent[0].subject, /Krakow/);
});

test('sends a phone-only application without an empty reply-to header', async () => {
  const sent: LeadEmailMessage[] = [];
  const handler = createLeadPostHandler({
    from: 'Vonco Partners <forms@vonco.partners>',
    sendEmail: async (message) => {
      sent.push(message);
      return { id: 'email_phone_only' };
    },
  });

  const response = await handler(
    leadRequest({
      ...validPayload,
      name: '',
      email: '',
      city: '',
      consent: false,
      preferredContactMethods: ['viber', 'call'],
    }),
  );

  assert.equal(response.status, 200);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].replyTo, undefined);
  assert.match(sent[0].text, /Preferred contact: Viber, Phone call/);
});

test('does not send an invalid application', async () => {
  let sendCount = 0;
  const handler = createLeadPostHandler({
    from: 'Vonco Partners <forms@vonco.partners>',
    sendEmail: async () => {
      sendCount += 1;
      return { id: 'email_123' };
    },
  });

  const response = await handler(
    leadRequest({ ...validPayload, email: 'invalid' }),
  );

  assert.equal(response.status, 400);
  assert.equal(sendCount, 0);
});

test('quietly accepts honeypot spam without sending email', async () => {
  let sendCount = 0;
  const handler = createLeadPostHandler({
    from: 'Vonco Partners <forms@vonco.partners>',
    sendEmail: async () => {
      sendCount += 1;
      return { id: 'email_123' };
    },
  });

  const response = await handler(
    leadRequest({ ...validPayload, company: 'Spam Ltd' }),
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(sendCount, 0);
});

test('rejects a cross-origin application before sending', async () => {
  let sendCount = 0;
  const handler = createLeadPostHandler({
    from: 'Vonco Partners <forms@vonco.partners>',
    sendEmail: async () => {
      sendCount += 1;
      return { id: 'email_123' };
    },
  });

  const response = await handler(
    leadRequest(validPayload, 'https://example.com'),
  );

  assert.equal(response.status, 403);
  assert.equal(sendCount, 0);
});

test('rejects non-JSON submissions', async () => {
  const handler = createLeadPostHandler({
    from: 'Vonco Partners <forms@vonco.partners>',
    sendEmail: async () => ({ id: 'email_123' }),
  });
  const request = new Request('https://www.vonco.partners/api/leads', {
    method: 'POST',
    headers: {
      'content-type': 'text/plain',
      host: 'www.vonco.partners',
      origin: 'https://www.vonco.partners',
    },
    body: JSON.stringify(validPayload),
  });

  const response = await handler(request);

  assert.equal(response.status, 415);
});

test('rejects malformed JSON-like content types', async () => {
  const handler = createLeadPostHandler({
    from: 'Vonco Partners <forms@vonco.partners>',
    sendEmail: async () => ({ id: 'email_123' }),
  });
  const request = new Request('https://www.vonco.partners/api/leads', {
    method: 'POST',
    headers: {
      'content-type': 'text/application/jsonfoo',
      host: 'www.vonco.partners',
      origin: 'https://www.vonco.partners',
    },
    body: JSON.stringify(validPayload),
  });

  const response = await handler(request);

  assert.equal(response.status, 415);
});

test('rejects an oversized body even without a content-length header', async () => {
  const handler = createLeadPostHandler({
    from: 'Vonco Partners <forms@vonco.partners>',
    sendEmail: async () => ({ id: 'email_123' }),
  });
  const request = leadRequest({
    ...validPayload,
    name: 'A'.repeat(11_000),
  });

  const response = await handler(request);

  assert.equal(response.status, 413);
});

test('reports missing email configuration without sending', async () => {
  let sendCount = 0;
  const handler = createLeadPostHandler({
    from: '',
    sendEmail: async () => {
      sendCount += 1;
      return { id: 'email_123' };
    },
  });

  const response = await handler(leadRequest(validPayload));

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    ok: false,
    error: 'configuration_missing',
  });
  assert.equal(sendCount, 0);
});

test('throttles repeated applications from the same IP', async () => {
  let sendCount = 0;
  const handler = createLeadPostHandler({
    from: 'Vonco Partners <forms@vonco.partners>',
    sendEmail: async () => {
      sendCount += 1;
      return { id: `email_${sendCount}` };
    },
  });

  const responses = [];
  for (let attempt = 0; attempt < 6; attempt += 1) {
    responses.push(await handler(leadRequest(validPayload)));
  }

  assert.deepEqual(
    responses.map((response) => response.status),
    [200, 200, 200, 200, 200, 429],
  );
  assert.equal(sendCount, 5);
});

test('returns a retryable error when Resend fails', async () => {
  const handler = createLeadPostHandler({
    from: 'Vonco Partners <forms@vonco.partners>',
    sendEmail: async () => {
      throw new Error('Resend unavailable');
    },
    onError: () => {},
  });

  const response = await handler(leadRequest(validPayload));

  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { ok: false, error: 'send_failed' });
});
