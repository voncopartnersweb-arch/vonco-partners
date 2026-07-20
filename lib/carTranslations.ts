import type {
  BodyType,
  DriveType,
  FuelType,
  GearboxType,
} from '@/data/cars';
import type { SupportedLocale } from '@/lib/seo';

type CarValueTranslations = {
  fuel: Record<FuelType, string>;
  gearbox: Record<GearboxType, string>;
  body: Record<BodyType, string>;
  drive: Record<DriveType, string>;
};

const fuelTranslations: Record<SupportedLocale, Record<FuelType, string>> = {
  uk: { Petrol: 'Бензин', Diesel: 'Дизель', Hybrid: 'Гібрид', Electric: 'Електро', 'Petrol + LPG': 'Бензин + LPG', 'Hybrid + LPG': 'Гібрид + LPG' },
  pl: { Petrol: 'Benzyna', Diesel: 'Diesel', Hybrid: 'Hybryda', Electric: 'Elektryczny', 'Petrol + LPG': 'Benzyna + LPG', 'Hybrid + LPG': 'Hybryda + LPG' },
  en: { Petrol: 'Petrol', Diesel: 'Diesel', Hybrid: 'Hybrid', Electric: 'Electric', 'Petrol + LPG': 'Petrol + LPG', 'Hybrid + LPG': 'Hybrid + LPG' },
  ru: { Petrol: 'Бензин', Diesel: 'Дизель', Hybrid: 'Гибрид', Electric: 'Электро', 'Petrol + LPG': 'Бензин + LPG', 'Hybrid + LPG': 'Гибрид + LPG' },
  es: { Petrol: 'Gasolina', Diesel: 'Diésel', Hybrid: 'Híbrido', Electric: 'Eléctrico', 'Petrol + LPG': 'Gasolina + GLP', 'Hybrid + LPG': 'Híbrido + GLP' },
  hy: { Petrol: 'Բենզին', Diesel: 'Դիզել', Hybrid: 'Հիբրիդ', Electric: 'Էլեկտրական', 'Petrol + LPG': 'Բենզին + LPG', 'Hybrid + LPG': 'Հիբրիդ + LPG' },
  be: { Petrol: 'Бензін', Diesel: 'Дызель', Hybrid: 'Гібрыд', Electric: 'Электрычны', 'Petrol + LPG': 'Бензін + LPG', 'Hybrid + LPG': 'Гібрыд + LPG' },
  ro: { Petrol: 'Benzină', Diesel: 'Diesel', Hybrid: 'Hibrid', Electric: 'Electric', 'Petrol + LPG': 'Benzină + GPL', 'Hybrid + LPG': 'Hibrid + GPL' },
  ka: { Petrol: 'ბენზინი', Diesel: 'დიზელი', Hybrid: 'ჰიბრიდი', Electric: 'ელექტრო', 'Petrol + LPG': 'ბენზინი + LPG', 'Hybrid + LPG': 'ჰიბრიდი + LPG' },
  uz: { Petrol: 'Benzin', Diesel: 'Dizel', Hybrid: 'Gibrid', Electric: 'Elektr', 'Petrol + LPG': 'Benzin + LPG', 'Hybrid + LPG': 'Gibrid + LPG' },
  kk: { Petrol: 'Бензин', Diesel: 'Дизель', Hybrid: 'Гибрид', Electric: 'Электрлі', 'Petrol + LPG': 'Бензин + LPG', 'Hybrid + LPG': 'Гибрид + LPG' },
  az: { Petrol: 'Benzin', Diesel: 'Dizel', Hybrid: 'Hibrid', Electric: 'Elektrik', 'Petrol + LPG': 'Benzin + LPG', 'Hybrid + LPG': 'Hibrid + LPG' },
  tg: { Petrol: 'Бензин', Diesel: 'Дизел', Hybrid: 'Гибрид', Electric: 'Барқӣ', 'Petrol + LPG': 'Бензин + LPG', 'Hybrid + LPG': 'Гибрид + LPG' },
};

const gearboxTranslations: Record<SupportedLocale, CarValueTranslations['gearbox']> = {
  uk: { Automatic: 'Автоматична', Manual: 'Механічна' },
  pl: { Automatic: 'Automatyczna', Manual: 'Manualna' },
  en: { Automatic: 'Automatic', Manual: 'Manual' },
  ru: { Automatic: 'Автоматическая', Manual: 'Механическая' },
  es: { Automatic: 'Automática', Manual: 'Manual' },
  hy: { Automatic: 'Ավտոմատ', Manual: 'Մեխանիկական' },
  be: { Automatic: 'Аўтаматычная', Manual: 'Механічная' },
  ro: { Automatic: 'Automată', Manual: 'Manuală' },
  ka: { Automatic: 'ავტომატური', Manual: 'მექანიკური' },
  uz: { Automatic: 'Avtomatik', Manual: 'Mexanik' },
  kk: { Automatic: 'Автоматты', Manual: 'Механикалық' },
  az: { Automatic: 'Avtomatik', Manual: 'Mexaniki' },
  tg: { Automatic: 'Автоматӣ', Manual: 'Механикӣ' },
};

const bodyTranslations: Record<SupportedLocale, CarValueTranslations['body']> = {
  uk: { Hatchback: 'Хетчбек', Sedan: 'Седан', SUV: 'Кросовер', Kombi: 'Універсал', Wagon: 'Універсал' },
  pl: { Hatchback: 'Hatchback', Sedan: 'Sedan', SUV: 'SUV', Kombi: 'Kombi', Wagon: 'Kombi' },
  en: { Hatchback: 'Hatchback', Sedan: 'Sedan', SUV: 'SUV', Kombi: 'Estate', Wagon: 'Estate' },
  ru: { Hatchback: 'Хэтчбек', Sedan: 'Седан', SUV: 'Кроссовер', Kombi: 'Универсал', Wagon: 'Универсал' },
  es: { Hatchback: 'Compacto', Sedan: 'Berlina', SUV: 'SUV', Kombi: 'Familiar', Wagon: 'Familiar' },
  hy: { Hatchback: 'Հեչբեք', Sedan: 'Սեդան', SUV: 'Ամենագնաց', Kombi: 'Ունիվերսալ', Wagon: 'Ունիվերսալ' },
  be: { Hatchback: 'Хэтчбэк', Sedan: 'Седан', SUV: 'Красовер', Kombi: 'Універсал', Wagon: 'Універсал' },
  ro: { Hatchback: 'Hatchback', Sedan: 'Sedan', SUV: 'SUV', Kombi: 'Break', Wagon: 'Break' },
  ka: { Hatchback: 'ჰეჩბეკი', Sedan: 'სედანი', SUV: 'კროსოვერი', Kombi: 'უნივერსალი', Wagon: 'უნივერსალი' },
  uz: { Hatchback: 'Xetchbek', Sedan: 'Sedan', SUV: 'Krossover', Kombi: 'Universal', Wagon: 'Universal' },
  kk: { Hatchback: 'Хэтчбек', Sedan: 'Седан', SUV: 'Кроссовер', Kombi: 'Универсал', Wagon: 'Универсал' },
  az: { Hatchback: 'Hetçbek', Sedan: 'Sedan', SUV: 'Krossover', Kombi: 'Universal', Wagon: 'Universal' },
  tg: { Hatchback: 'Хэтчбек', Sedan: 'Седан', SUV: 'Кроссовер', Kombi: 'Универсал', Wagon: 'Универсал' },
};

const driveTranslations: Record<SupportedLocale, CarValueTranslations['drive']> = {
  uk: { FWD: 'Передній (FWD)', AWD: 'Повний (AWD)', RWD: 'Задній (RWD)' },
  pl: { FWD: 'Przedni (FWD)', AWD: 'Na wszystkie koła (AWD)', RWD: 'Tylny (RWD)' },
  en: { FWD: 'Front-wheel drive (FWD)', AWD: 'All-wheel drive (AWD)', RWD: 'Rear-wheel drive (RWD)' },
  ru: { FWD: 'Передний (FWD)', AWD: 'Полный (AWD)', RWD: 'Задний (RWD)' },
  es: { FWD: 'Delantera (FWD)', AWD: 'Integral (AWD)', RWD: 'Trasera (RWD)' },
  hy: { FWD: 'Առջևի (FWD)', AWD: 'Լիաքարշ (AWD)', RWD: 'Հետևի (RWD)' },
  be: { FWD: 'Пярэдні (FWD)', AWD: 'Поўны (AWD)', RWD: 'Задні (RWD)' },
  ro: { FWD: 'Față (FWD)', AWD: 'Integrală (AWD)', RWD: 'Spate (RWD)' },
  ka: { FWD: 'წინა (FWD)', AWD: 'სრული (AWD)', RWD: 'უკანა (RWD)' },
  uz: { FWD: 'Old (FWD)', AWD: 'To‘liq (AWD)', RWD: 'Orqa (RWD)' },
  kk: { FWD: 'Алдыңғы (FWD)', AWD: 'Толық (AWD)', RWD: 'Артқы (RWD)' },
  az: { FWD: 'Ön (FWD)', AWD: 'Tam (AWD)', RWD: 'Arxa (RWD)' },
  tg: { FWD: 'Пеш (FWD)', AWD: 'Пурра (AWD)', RWD: 'Қафо (RWD)' },
};

function getLocale(locale: string): SupportedLocale {
  return locale in fuelTranslations ? (locale as SupportedLocale) : 'en';
}

export function localizeCarFuel(fuel: FuelType, locale: string) {
  return fuelTranslations[getLocale(locale)][fuel];
}

export function localizeCarGearbox(gearbox: GearboxType, locale: string) {
  return gearboxTranslations[getLocale(locale)][gearbox];
}

export function localizeCarBody(body: BodyType, locale: string) {
  return bodyTranslations[getLocale(locale)][body];
}

export function localizeCarDrive(drive: DriveType, locale: string) {
  return driveTranslations[getLocale(locale)][drive];
}
