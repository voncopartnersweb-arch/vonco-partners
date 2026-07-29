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
      display: '+48 572 867 193',
      tel: '+48572867193',
    },
  },
  offices: [
    {
      id: 'krakow',
      label: 'Kraków / Szczyglice',
      addressLine1: 'Długa 1',
      postalCode: '32-083',
      locality: 'Szczyglice',
      cityPostal: '32-083 Szczyglice',
      mapQuery: 'Długa 1, 32-083 Szczyglice',
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=D%C5%82uga%201%2C%2032-083%20Szczyglice',
    },
    {
      id: 'myslowice',
      label: 'Mysłowice',
      addressLine1: 'Obrzeżna Północna 13',
      postalCode: '41-400',
      locality: 'Mysłowice',
      cityPostal: '41-400 Mysłowice',
      mapQuery: 'Obrzeżna Północna 13, 41-400 Mysłowice',
      mapUrl: 'https://maps.app.goo.gl/DGnSyXf8WbjepcBJ7',
    },
  ],
  legal: {
    addressLine1: 'ul. Mikołaja Kopernika 8/6',
    cityPostal: '40-064 Katowice',
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
    buyout: '/vykup-avto',
    programs: '/programs',
    documents: '/documents-for-taxi-work',
    privacyPolicy: '/privacy-policy',
  },
} as const;

export const COMPANY_EMAIL_HREF = `mailto:${COMPANY.email}`;
