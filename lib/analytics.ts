export const CONSENT_STORAGE_KEY = 'cookie-consent';
export const CONSENT_CHANGE_EVENT = 'vonco:consent-change';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function hasAnalyticsConsent() {
  return typeof window !== 'undefined' &&
    window.localStorage.getItem(CONSENT_STORAGE_KEY) === 'all';
}

export function trackEvent(
  event: string,
  parameters: Record<string, string | number | boolean | undefined> = {},
) {
  if (!hasAnalyticsConsent()) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...parameters });
}
