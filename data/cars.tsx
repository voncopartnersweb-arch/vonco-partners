// data/cars.tsx

export type FuelType =
  | 'Petrol'
  | 'Diesel'
  | 'Hybrid'
  | 'Electric'
  | 'Petrol + LPG'
  | 'Hybrid + LPG';

export type BodyType = 'Hatchback' | 'Sedan' | 'SUV' | 'Kombi' | 'Wagon';

export type DriveType = 'FWD' | 'AWD' | 'RWD';
export type GearboxType = 'Automatic' | 'Manual';

export type Car = {
  id: number;
  slug: string;
  name: string;
  year: string;
  image: string;
  galleryImages?: readonly string[];

  fuel: FuelType;
  gearbox: GearboxType;
  engine: string;

  body: BodyType;
  mileage: string;
  drive: DriveType;

  fuelConsumption: string;
  range: string;
  trunkVolume: string;

  rideCategories: readonly string[];
  weeklyRent: {
    krakowRegion: number;
    katowiceRegion: number;
  };
  buyoutPriceFrom: number;
};

export const PLATFORM_CATEGORY_VERIFIED_ON = '2026-07-30';

export const PLATFORM_CATEGORY_SOURCES = {
  uberRequirements:
    'https://www.uber.com/pl/en/drive/requirements/vehicle-requirements/',
  uberEligibleVehicles: 'https://www.uber.com/pl/en/eligible-vehicles/',
  boltRequirements:
    'https://bolt.eu/pl-pl/support/articles/360010743320/',
  boltCategories: 'https://bolt.eu/pl-pl/driver/guide/categories/',
} as const;

export function formatCarWeeklyRent(car: Car, locale: string) {
  const format = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 0,
  });

  return `Kraków / Oświęcim / Zakopane / Zator: ${format.format(car.weeklyRent.krakowRegion)}; Katowice / Gdańsk / Gdynia / Sopot / Bielsko-Biała: ${format.format(car.weeklyRent.katowiceRegion)}`;
}

export function formatCarBuyoutPrice(car: Car, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 0,
  }).format(car.buyoutPriceFrom);
}

export const cars: readonly Car[] = [
  {
    id: 1,
    slug: 'skoda-fabia-2019-2023',
    name: 'Skoda Fabia',
    year: '2019–2023',
    image: '/VoncoCars/Fabia.PNG',
    galleryImages: ['/cars/ResizedImage1039599-nowa-skoda-fabia-2021.jpg'],
    fuel: 'Petrol + LPG',
    gearbox: 'Manual',
    engine: '1.0 TSI, 110 HP',
    body: 'Hatchback',
    mileage: '20 000 – 80 000 km',
    drive: 'FWD',
    fuelConsumption: '5.3 L/100 km',
    range: '700 km',
    trunkVolume: '330 L',
    rideCategories: ['UberX', 'Uber Priority', 'Bolt'],
    weeklyRent: { krakowRegion: 500, katowiceRegion: 550 },
    buyoutPriceFrom: 30000,
  },

  {
    id: 3,
    // Keep the established URL slug so existing indexed links continue to resolve.
    slug: 'toyota-prius-30',
    name: 'Toyota Auris',
    year: '2010–2013',
    image: '/VoncoCars/Auris.PNG',
    fuel: 'Hybrid + LPG',
    gearbox: 'Automatic',
    engine: '1.8 Hybrid',
    body: 'Hatchback',
    mileage: '100 000 – 200 000 km',
    drive: 'FWD',
    fuelConsumption: '4.4 L/100 km',
    range: '850 km',
    trunkVolume: '445 L',
    rideCategories: ['UberX', 'Uber Hybrid', 'Uber Priority', 'Bolt Green'],
    weeklyRent: { krakowRegion: 600, katowiceRegion: 650 },
    buyoutPriceFrom: 35000,
  },
  {
    id: 5,
    slug: 'toyota-auris-comfort',
    name: 'Toyota Auris Comfort',
    year: '2019',
    image: '/VoncoCars/Auris.PNG',
    fuel: 'Hybrid + LPG',
    gearbox: 'Automatic',
    engine: '1.8 Hybrid',
    body: 'Hatchback',
    mileage: '50 000 – 100 000 km',
    drive: 'FWD',
    fuelConsumption: '4.2 L/100 km',
    range: '850 km',
    trunkVolume: '360 L',
    rideCategories: [
      'UberX',
      'Uber Hybrid',
      'Uber Priority',
      'Bolt',
      'Bolt Green',
    ],
    weeklyRent: { krakowRegion: 650, katowiceRegion: 700 },
    buyoutPriceFrom: 55000,
  },
  {
    id: 6,
    slug: 'toyota-prius-plus-standart',
    name: 'Toyota Prius Plus',
    year: '2014–2016',
    image: '/VoncoCars/Toyota_Prius_Plus.PNG',
    fuel: 'Hybrid + LPG',
    gearbox: 'Automatic',
    engine: '1.8 Hybrid',
    body: 'Wagon',
    mileage: '120 000 – 200 000 km',
    drive: 'FWD',
    fuelConsumption: '4.6 L/100 km',
    range: '850 km',
    trunkVolume: '505 L',
    rideCategories: [
      'UberX',
      'Uber Hybrid',
      'Uber Priority',
      'UberXL',
      'Bolt Green',
      'Bolt XL',
    ],
    weeklyRent: { krakowRegion: 750, katowiceRegion: 800 },
    buyoutPriceFrom: 50000,
  },
  {
    id: 7,
    slug: 'toyota-prius-plus-comfort',
    name: 'Toyota Prius Plus (Comfort)',
    year: '2016–2020',
    image: '/VoncoCars/Toyota_Prius_Plus.PNG',
    fuel: 'Hybrid + LPG',
    gearbox: 'Automatic',
    engine: '1.8 Hybrid',
    body: 'Wagon',
    mileage: '50 000 – 120 000 km',
    drive: 'FWD',
    fuelConsumption: '4.5 L/100 km',
    range: '900 km',
    trunkVolume: '505 L',
    rideCategories: [
      'UberX',
      'Uber Hybrid',
      'Uber Priority',
      'Uber Comfort (2018+)',
      'UberXL',
      'Bolt',
      'Bolt Green',
      'Bolt Comfort',
      'Bolt XL',
    ],
    weeklyRent: { krakowRegion: 800, katowiceRegion: 850 },
    buyoutPriceFrom: 65000,
  },
  {
    id: 8,
    slug: 'toyota-corolla-hybrid',
    name: 'Toyota Corolla',
    year: '2019–2022',
    image: '/VoncoCars/Corolla.PNG',
    galleryImages: ['/VoncoCars/Corolla_sedan.PNG', '/cars/image.webp'],
    fuel: 'Hybrid + LPG',
    gearbox: 'Automatic',
    engine: '1.8 Hybrid',
    body: 'Sedan',
    mileage: '30 000 – 80 000 km',
    drive: 'FWD',
    fuelConsumption: '3.9 L/100 km',
    range: '900 km',
    trunkVolume: '470 L',
    rideCategories: [
      'UberX',
      'Uber Hybrid',
      'Uber Priority',
      'Uber Comfort',
      'Bolt',
      'Bolt Green',
      'Bolt Comfort',
    ],
    weeklyRent: { krakowRegion: 800, katowiceRegion: 850 },
    buyoutPriceFrom: 75000,
  },
  {
    id: 9,
    slug: 'suzuki-swace-hybrid',
    name: 'Suzuki Swace HYB',
    year: '2021-2023',
    image: '/VoncoCars/Suzuki.PNG',
    fuel: 'Hybrid + LPG',
    gearbox: 'Automatic',
    engine: '1.8 Hybrid',
    body: 'Wagon',
    mileage: '20 000 – 60 000 km',
    drive: 'FWD',
    fuelConsumption: '3.9 L/100 km',
    range: '900 km',
    trunkVolume: '470 L',
    rideCategories: [
      'UberX',
      'Uber Hybrid',
      'Uber Priority',
      'Uber Comfort',
      'Bolt',
      'Bolt Green',
      'Bolt Comfort',
    ],
    weeklyRent: { krakowRegion: 800, katowiceRegion: 850 },
    buyoutPriceFrom: 70000,
  },
  {
    id: 10,
    slug: 'toyota-camry-hybrid',
    name: 'Toyota Camry',
    year: '2019–2022',
    image: '/VoncoCars/Toyota_Camry.PNG',
    fuel: 'Hybrid + LPG',
    gearbox: 'Automatic',
    engine: '2.5 Hybrid, 218 HP',
    body: 'Sedan',
    mileage: '20 000 – 50 000 km',
    drive: 'FWD',
    fuelConsumption: '4.8 L/100 km',
    range: '1000 km',
    trunkVolume: '524 L',
    rideCategories: [
      'UberX',
      'Uber Hybrid',
      'Uber Priority',
      'Uber Comfort',
      'Bolt',
      'Bolt Green',
      'Bolt Comfort',
    ],
    weeklyRent: { krakowRegion: 1000, katowiceRegion: 900 },
    buyoutPriceFrom: 120000,
  },
  {
    id: 11,
    slug: 'lexus-is-300h',
    name: 'Lexus IS300H',
    year: '2016',
    image: '/VoncoCars/lexus.PNG',
    fuel: 'Hybrid + LPG',
    gearbox: 'Automatic',
    engine: '2.5 Hybrid',
    body: 'Sedan',
    mileage: '5 000 – 20 000 km',
    drive: 'RWD',
    fuelConsumption: '4.6 L/100 km',
    range: '900 km',
    trunkVolume: '450 L',
    rideCategories: [
      'UberX',
      'Uber Hybrid',
      'Uber Priority',
      'Bolt',
      'Bolt Green',
      'Bolt Comfort',
      'Bolt Premium',
    ],
    weeklyRent: { krakowRegion: 900, katowiceRegion: 850 },
    buyoutPriceFrom: 160000,
  },
  {
    id: 12,
    slug: 'tesla-model-3',
    name: 'Tesla Model 3',
    year: '2021-2023',
    image: '/VoncoCars/Tesla_3.PNG',
    galleryImages: ['/cars/3589-tesla-model-3-long-range-rwd-134180.jpg'],
    fuel: 'Electric',
    gearbox: 'Automatic',
    engine: 'Electric, 498 HP',
    body: 'Sedan',
    mileage: '10 000 – 40 000 km',
    drive: 'AWD',
    fuelConsumption: '16 kWh / 100 km',
    range: '550 km',
    trunkVolume: '425 L',
    rideCategories: [
      'UberX',
      'Uber Hybrid',
      'Uber Priority',
      'Uber Comfort',
      'Bolt',
      'Bolt Green',
      'Bolt Comfort',
      'Bolt Comfort Electric',
      'Bolt Premium',
    ],
    weeklyRent: { krakowRegion: 900, katowiceRegion: 1000 },
    buyoutPriceFrom: 140000,
  },
];

// 👇 гарантує що модуль точно має runtime-експорт у TSX
export {};
