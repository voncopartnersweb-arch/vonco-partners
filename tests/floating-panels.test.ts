import assert from 'node:assert/strict';
import test from 'node:test';

test('keeps floating controls above a visible cookie banner', async () => {
  const floatingPanels = await import('../lib/floating-panels').catch(
    () => null,
  );

  assert.ok(floatingPanels, 'floating panel positioning helper should exist');
  assert.equal(floatingPanels.getCookieConsentOffset(240.2), 251);
});

test('uses no extra floating offset when the cookie banner is hidden', async () => {
  const floatingPanels = await import('../lib/floating-panels').catch(
    () => null,
  );

  assert.ok(floatingPanels, 'floating panel positioning helper should exist');
  assert.equal(floatingPanels.getCookieConsentOffset(0), 0);
});

test('lets an inline CTA request the global driver form', async () => {
  const floatingPanels = await import('../lib/floating-panels').catch(
    () => null,
  );

  assert.ok(floatingPanels, 'floating panel helper should exist');
  const openDriverForm = (
    floatingPanels as {
      openDriverForm?: (target: EventTarget) => void;
    }
  ).openDriverForm;
  assert.equal(
    typeof openDriverForm,
    'function',
    'inline CTA helper should dispatch the driver-form request',
  );
  if (!openDriverForm) return;

  const target = new EventTarget();
  let requests = 0;
  target.addEventListener('vonco:driver-form-open', () => {
    requests += 1;
  });

  openDriverForm(target);

  assert.equal(requests, 1);
});
