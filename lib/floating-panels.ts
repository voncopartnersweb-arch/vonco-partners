export const FLOATING_PANEL_OPEN_EVENT = 'vonco:floating-panel-open';
export const DRIVER_FORM_OPEN_EVENT = 'vonco:driver-form-open';
export const COOKIE_CONSENT_OFFSET_PROPERTY = '--cookie-consent-offset';

const COOKIE_BANNER_GAP = 10;

export function getCookieConsentOffset(height: number) {
  if (!Number.isFinite(height) || height <= 0) return 0;
  return Math.ceil(height) + COOKIE_BANNER_GAP;
}

export function openDriverForm(target: EventTarget = window) {
  target.dispatchEvent(new Event(DRIVER_FORM_OPEN_EVENT));
}
