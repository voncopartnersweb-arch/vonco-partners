export const PREFERRED_CONTACT_METHODS = [
  'telegram',
  'viber',
  'whatsapp',
  'call',
  'sms',
] as const;

export type PreferredContactMethod =
  (typeof PREFERRED_CONTACT_METHODS)[number];
