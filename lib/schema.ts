import { COMPANY } from '@/data/company';
import { getLocalizedUrl, SITE_URL } from '@/lib/seo';

export const LOCAL_BUSINESS_ID = `${SITE_URL}/#localbusiness`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const SERVICE_CITIES = [
  'Katowice',
  'Kraków',
  'Gdańsk',
  'Gdynia',
  'Bielsko-Biała',
  'Oświęcim',
  'Zakopane',
  'Zator',
] as const;

export function buildLocalBusinessSchema() {
  return {
    '@type': ['LocalBusiness', 'Organization'],
    '@id': LOCAL_BUSINESS_ID,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    image: `${SITE_URL}/og-image.jpg`,
    logo: `${SITE_URL}/pwa-512x512.png`,
    telephone: COMPANY.phones.office.tel,
    email: COMPANY.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.legal.addressLine1,
      postalCode: '40-064',
      addressLocality: 'Katowice',
      addressCountry: 'PL',
    },
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'NIP', value: COMPANY.legal.nip },
      { '@type': 'PropertyValue', propertyID: 'REGON', value: COMPANY.legal.regon },
      { '@type': 'PropertyValue', propertyID: 'KRS', value: COMPANY.legal.krs },
    ],
    areaServed: SERVICE_CITIES.map((name) => ({ '@type': 'City', name })),
    sameAs: [
      COMPANY.social.facebook,
      COMPANY.social.instagram,
      COMPANY.social.tiktok,
      `https://t.me/${COMPANY.social.telegramUsername}`,
    ],
  };
}

export function buildSiteSchema(lang: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: COMPANY.name,
        url: SITE_URL,
        inLanguage: lang,
        publisher: { '@id': LOCAL_BUSINESS_ID },
      },
      buildLocalBusinessSchema(),
      {
        '@type': 'TaxiService',
        '@id': `${SITE_URL}/#taxi-service`,
        name: COMPANY.name,
        url: getLocalizedUrl(lang),
        description,
        provider: { '@id': LOCAL_BUSINESS_ID },
        areaServed: SERVICE_CITIES.map((name) => ({ '@type': 'City', name })),
      },
    ],
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
