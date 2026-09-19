import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { createElement, type ComponentType, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { NextIntlClientProvider } from 'next-intl';
import { PathnameContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';

import DriverForm from '../Components/driverForm';

const messages = JSON.parse(
  readFileSync(new URL('../messages/uk.json', import.meta.url), 'utf8'),
);

const IntlTestProvider = NextIntlClientProvider as ComponentType<{
  locale: string;
  messages: typeof messages;
  timeZone: string;
  now: Date;
  children?: ReactNode;
}>;

test('renders quick contact actions at the bottom of the modal form', () => {
  const markup = renderToStaticMarkup(
    createElement(
      PathnameContext.Provider,
      { value: '/uk' },
      createElement(
        IntlTestProvider,
        {
          locale: 'uk',
          messages,
          timeZone: 'Europe/Warsaw',
          now: new Date('2026-09-20T00:00:00Z'),
        },
        createElement(DriverForm, {
          variant: 'modal',
          showIntro: false,
          labelledBy: 'modal-title',
        }),
      ),
    ),
  );

  assert.match(markup, /Зв’язатися просто зараз:/);
  assert.match(markup, /href="tel:/);
  assert.match(markup, /href="https:\/\/t\.me\//);
  assert.match(markup, /href="https:\/\/wa\.me\//);
  assert.match(markup, /href="sms:/);
});
