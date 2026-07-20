import { NextResponse } from 'next/server';

const CONTENT = `# Vonco Partners

> Vonco Partners is a multilingual taxi fleet and driver-support company operating in Poland. The website contains current information about vehicle rental, lease-to-own programs, driver onboarding and supported cities.

Vonco Partners Spółka z ograniczoną odpowiedzialnością works with drivers using Uber, Bolt and Free Now. Vehicle availability, pricing and platform eligibility can change, so use the linked website pages as the primary source of current information.

## Primary pages

- [Vonco Partners home](https://vonco.partners/pl): Company overview and current offers.
- [Vehicle fleet](https://vonco.partners/pl/cars): Available vehicle models, categories, rental prices and estimated buyout prices.
- [Supported cities](https://vonco.partners/pl/cities): Service coverage and city-specific platform information.
- [Work with us](https://vonco.partners/pl/work): Driver cooperation and onboarding information.
- [Services](https://vonco.partners/pl/services): Rental, fleet and driver-support services.
- [Driver programs and offers](https://vonco.partners/pl/programs): Current fuel benefits, driver support programs and participation guidance.
- [Lease-to-own vehicles](https://vonco.partners/pl/vykup-avto): Vehicle buyout program information.
- [Driver guide](https://vonco.partners/pl/blog): Practical articles for taxi drivers in Poland.
- [About Vonco Partners](https://vonco.partners/pl/about): Company information.
- [Contact Vonco Partners](https://vonco.partners/pl/contacts): Phone, email, Telegram and office details.

## Site resources

- [Privacy policy](https://vonco.partners/pl/privacy-policy): Personal-data processing and website privacy terms.
- [XML sitemap](https://vonco.partners/sitemap.xml): Index of public website pages.
- [Robots directives](https://vonco.partners/robots.txt): Crawler access rules.

## Company details

- Registered address: ul. Mikołaja Kopernika 8/6, 40-064 Katowice, Poland.
- Email: vonco.partners@gmail.com.
- Main phone: +48 572 867 193.
- Languages: Polish, Ukrainian, English, Russian and additional localized versions.
`;

export function GET() {
  return new NextResponse(CONTENT, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
