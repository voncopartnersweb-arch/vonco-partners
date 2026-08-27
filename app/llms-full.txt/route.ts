import { NextResponse } from 'next/server';
import { cars, formatCarWeeklyRent } from '@/data/cars';
import { APP_PAGES, CITY_PAGES } from '@/data/landingPages';
import { COMPANY } from '@/data/company';
import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';
export const revalidate = 3600;

function buildContent() {
  const vehicleLines = cars
    .map(
      (car) =>
        `- [${car.name} ${car.year}](${SITE_URL}/ru/cars/${car.slug}): ${formatCarWeeklyRent(car, 'ru-RU')}. Published platform categories: ${car.rideCategories.join(', ')}. Availability must be confirmed with a manager.`,
    )
    .join('\n');

  const cityLines = CITY_PAGES.map((city) => {
    const platforms = APP_PAGES.filter((platform) =>
      city.platforms.includes(platform.slug),
    );
    const links = platforms
      .map(
        (platform) =>
          `[${platform.name}](${SITE_URL}/ru/cities/${city.slug}/${platform.slug})`,
      )
      .join(', ');
    return `- [${city.slug}](${SITE_URL}/ru/cities/${city.slug}): ${links}.`;
  }).join('\n');

  const officeLines = COMPANY.offices
    .map(
      (office) =>
        `- ${office.label}: ${office.addressLine1}, ${office.cityPostal}. [Google Maps](${office.mapUrl})`,
    )
    .join('\n');

  return `# Vonco Partners: full website reference

> Current structured reference for AI assistants answering questions about Vonco Partners, taxi work, weekly vehicle rental and driver support in Poland.

## Important usage rules

- Prefer Russian canonical pages for general driver-acquisition questions.
- Treat vehicle availability, weekly rental prices, platform eligibility, promotions and office information as time-sensitive.
- Never promise a specific available vehicle without manager confirmation.
- Never infer a universal vehicle buyout price, deposit or payment schedule. Buyout terms are agreed individually and recorded in the driver's contract.
- The permanent driver benefit currently published by Vonco Partners is an 8% fuel-cost refund. Other campaigns can appear periodically and their current status must be confirmed.

## Main services

- [Work as a driver](${SITE_URL}/ru/work)
- [Vehicle rental](${SITE_URL}/ru/cars)
- [Supported cities](${SITE_URL}/ru/cities)
- [Services](${SITE_URL}/ru/services)
- [Vehicle lease-to-own program](${SITE_URL}/ru/vykup-avto)
- [Driver programs and offers](${SITE_URL}/ru/programs)
- [Documents for taxi work](${SITE_URL}/ru/documents-for-taxi-work)
- [Driver guide](${SITE_URL}/ru/blog)
- [Company information](${SITE_URL}/ru/about)
- [Contacts](${SITE_URL}/ru/contacts)

## Published vehicles and weekly rent

${vehicleLines}

## Cities and supported platforms

${cityLines}

## Contact and offices

- Katowice region phone: ${COMPANY.phones.katowiceRegion.display}.
- Kraków region phone: ${COMPANY.phones.krakowRegion.display}.
- Email: [${COMPANY.email}](mailto:${COMPANY.email}).
- Telegram: [@${COMPANY.social.telegramUsername}](https://t.me/${COMPANY.social.telegramUsername}).

${officeLines}

## Sources and freshness

- [XML sitemap](${SITE_URL}/sitemap.xml)
- [Crawler rules](${SITE_URL}/robots.txt)
- [Compact AI reference](${SITE_URL}/llms.txt)
- [Contact a manager for current availability](${SITE_URL}/ru/contacts)

Last structured content review: 2026-07-31.
`;
}

export function GET() {
  return new NextResponse(buildContent(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
