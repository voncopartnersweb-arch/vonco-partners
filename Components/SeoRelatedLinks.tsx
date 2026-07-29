import { Link } from '@/i18n/navigation';
import { COMPANY } from '@/data/company';
import { isDocumentGuideLocale } from '@/data/documentsContent';
import { pageStyles as styles } from '@/lib/uiStyles';

type RelatedPage =
  | 'work'
  | 'cars'
  | 'services'
  | 'cities'
  | 'buyout'
  | 'documents';

type Copy = {
  eyebrow: string;
  title: string;
  text: string;
  links: Record<RelatedPage, string>;
};

const COPY: Record<'ru' | 'uk' | 'pl' | 'en', Copy> = {
  ru: {
    eyebrow: 'Полезно перед началом работы',
    title: 'Проверьте условия, автомобиль и документы',
    text:
      'Соберите информацию по шагам: выберите город и формат автомобиля, проверьте документы, а затем отправьте заявку менеджеру.',
    links: {
      work: 'Как начать работу водителем',
      cars: 'Автомобили для Uber, Bolt и Free Now',
      services: 'Услуги партнера такси',
      cities: 'Города и доступные платформы',
      buyout: 'Автомобиль под выкуп',
      documents: 'Документы для работы в такси',
    },
  },
  uk: {
    eyebrow: 'Корисно перед початком роботи',
    title: 'Перевірте умови, автомобіль і документи',
    text:
      'Зберіть інформацію послідовно: оберіть місто та формат автомобіля, перевірте документи, а потім надішліть заявку менеджеру.',
    links: {
      work: 'Як почати роботу водієм',
      cars: 'Автомобілі для Uber, Bolt і Free Now',
      services: 'Послуги партнера таксі',
      cities: 'Міста та доступні платформи',
      buyout: 'Автомобіль під виплату',
      documents: 'Документи для роботи в таксі',
    },
  },
  pl: {
    eyebrow: 'Przydatne przed rozpoczęciem pracy',
    title: 'Sprawdź warunki, samochód i dokumenty',
    text:
      'Zbierz informacje krok po kroku: wybierz miasto i formę korzystania z auta, sprawdź dokumenty, a następnie wyślij zgłoszenie do managera.',
    links: {
      work: 'Jak rozpocząć pracę jako kierowca',
      cars: 'Samochody do Uber, Bolt i Free Now',
      services: 'Usługi partnera taxi',
      cities: 'Miasta i dostępne platformy',
      buyout: 'Samochód z opcją wykupu',
      documents: 'Dokumenty do pracy w taxi',
    },
  },
  en: {
    eyebrow: 'Useful before you start',
    title: 'Check the terms, vehicle and documents',
    text:
      'Follow the process in order: choose a city and vehicle option, verify the required documents, then send your application to a manager.',
    links: {
      work: 'How to start driving',
      cars: 'Cars for Uber, Bolt and Free Now',
      services: 'Taxi partner services',
      cities: 'Cities and available platforms',
      buyout: 'Rent-to-own cars',
      documents: 'Documents required for taxi work',
    },
  },
};

const PATHS: Record<RelatedPage, string> = {
  work: COMPANY.links.work,
  cars: COMPANY.links.cars,
  services: COMPANY.links.services,
  cities: '/cities',
  buyout: COMPANY.links.buyout,
  documents: COMPANY.links.documents,
};

export default function SeoRelatedLinks({
  lang,
  current,
}: {
  lang: string;
  current: RelatedPage;
}) {
  if (!isDocumentGuideLocale(lang)) return null;

  const copy = COPY[lang];
  const links = (Object.keys(PATHS) as RelatedPage[]).filter(
    (key) => key !== current,
  );

  return (
    <section className={styles.section} aria-labelledby={`related-${current}`}>
      <p className={styles.eyebrow}>{copy.eyebrow}</p>
      <h2 id={`related-${current}`} className={styles.sectionTitle}>
        {copy.title}
      </h2>
      <p className={`${styles.sectionText} max-w-4xl`}>{copy.text}</p>
      <nav className={styles.relatedLinks} aria-label={copy.title}>
        {links.map((key) => (
          <Link href={PATHS[key]} className={styles.relatedLink} key={key}>
            {copy.links[key]}
            <span aria-hidden='true'>→</span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
