export const COMPANY = {
  name: 'Vonco Partners',
  legalName: 'Vonco Partners Spółka z ograniczoną odpowiedzialnością',
  email: 'vonco.partners@gmail.com',
  phones: {
    katowiceRegion: {
      display: '+48 572 867 193',
      tel: '+48572867193',
    },
    krakowRegion: {
      display: '+48 794 110 572',
      tel: '+48794110572',
    },
    office: {
      display: '+48 796 230 011',
      tel: '+48796230011',
    },
  },
  legal: {
    addressLine1: 'ul. Mikołaja Kopernika 8/6',
    cityPostal: '40-064 Katowice',
    officeAddressLine1: 'Obrzeżna Północna 13',
    officeCityPostal: '41-400 Mysłowice',
    regon: '386826086',
    nip: '6443555711',
    krs: '0000856220',
  },
  social: {
    instagram: 'https://www.instagram.com/vonco.partners',
    instagramHandle: '@vonco.partners',
    facebook: 'https://www.facebook.com/p/Voncopartners-100089457913783/',
    tiktok: 'https://www.tiktok.com/@vonco.partners',
    tiktokHandle: '@vonco.partners',
    telegramUsername: 'vonco_partners',
    telegramGroupUsername: 'voncopartnerstelegram',
  },
  links: {
    about: '/about',
    services: '/services',
    cars: '/cars',
    contacts: '/contacts',
    work: '/work',
    privacyPolicy: '/privacy-policy',
  },
} as const;

export const COMPANY_EMAIL_HREF = `mailto:${COMPANY.email}`;
