export const COMPANY = {
  name: 'Vonco Partners',
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
  },
  social: {
    instagram: 'https://www.instagram.com/vonco.partners',
    instagramHandle: '@vonco.partners',
    facebook: 'https://www.facebook.com/p/Voncopartners-100089457913783/',
    tiktok: 'https://www.tiktok.com/@vonco.partners',
    tiktokHandle: '@vonco.partners',
    telegramUsername: 'vonco_partners',
  },
  links: {
    cars: '/cars',
    contacts: '/contacts',
    work: '/work',
    privacyPolicy: '/privacy-policy',
  },
} as const;

export const COMPANY_EMAIL_HREF = `mailto:${COMPANY.email}`;
