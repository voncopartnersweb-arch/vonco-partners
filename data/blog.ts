import type { SupportedLocale } from '@/lib/seo';

export const BLOG_LOCALES = ['pl', 'en', 'uk', 'ru'] as const satisfies readonly SupportedLocale[];

export type BlogLocale = (typeof BLOG_LOCALES)[number];

type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogArticle = {
  slug: string;
  locale: BlogLocale;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  sections: ArticleSection[];
};

const LABELS: Record<BlogLocale, { blog: string; read: string; back: string }> = {
  pl: { blog: 'Poradnik kierowcy', read: 'Czytaj artykuł', back: 'Wszystkie artykuły' },
  en: { blog: 'Driver guide', read: 'Read article', back: 'All articles' },
  uk: { blog: 'Порадник водія', read: 'Читати статтю', back: 'Усі статті' },
  ru: { blog: 'Гид водителя', read: 'Читать статью', back: 'Все статьи' },
};

const articles: BlogArticle[] = [
  {
    slug: 'uber-bolt-partner-poland',
    locale: 'pl',
    title: 'Kim jest partner Uber i Bolt w Polsce i po co jest potrzebny kierowcy?',
    description: 'Wyjaśniamy, czym zajmuje się partner flotowy Uber, Bolt i Free Now, jakie wsparcie może zapewnić kierowcy oraz co sprawdzić przed podpisaniem umowy.',
    publishedAt: '2026-07-15',
    updatedAt: '2026-07-15',
    readTime: '7 min',
    sections: [
      {
        heading: 'Partner flotowy w praktyce',
        paragraphs: [
          'Partner flotowy pomaga kierowcy rozpocząć i organizować pracę z aplikacjami przewozowymi. Zakres współpracy może obejmować udostępnienie samochodu, przygotowanie dokumentów, podpięcie do platform, rozliczenia oraz bieżące wsparcie. Nie oznacza to jednak, że każda firma oferuje identyczne warunki. Przed rozpoczęciem pracy należy sprawdzić umowę, opłaty, zasady korzystania z auta i odpowiedzialność za serwis.',
          'Vonco Partners współpracuje z kierowcami w Polsce i pomaga w pracy z Uber, Bolt oraz Free Now. Kierowca może pytać o dostępne auta, format najmu, dokumenty i aktualną dostępność w wybranym mieście. Szczegóły zawsze powinny być potwierdzone z managerem, ponieważ flota i warunki mogą się zmieniać.',
        ],
      },
      {
        heading: 'Dlaczego kierowca korzysta z partnera',
        paragraphs: [
          'Dla osoby, która dopiero zaczyna, najtrudniejsze są zwykle formalności, wybór auta i zrozumienie zasad aplikacji. Partner porządkuje te etapy i wskazuje, jakie dokumenty są potrzebne. Jeżeli kierowca nie ma własnego samochodu, może sprawdzić dostępność auta przygotowanego do pracy. Ważne jest, aby nie opierać decyzji wyłącznie na reklamowanej kwocie zarobku, ale policzyć prowizje, najem, paliwo, podatki i czas pracy.',
          'Doświadczony kierowca może korzystać z partnera ze względu na serwis, auto zastępcze, rozliczenia lub możliwość zmiany modelu współpracy. Warto zapytać, jak szybko firma reaguje na awarię, kto ponosi koszt szkody i jakie są zasady zakończenia umowy.',
        ],
      },
      {
        heading: 'Co sprawdzić przed podpisaniem umowy',
        paragraphs: [
          'Poproś o pełny cennik i wzór umowy. Sprawdź kaucję, częstotliwość płatności, limit kilometrów, zakres ubezpieczenia, udział własny, zasady użytkowania prywatnego oraz procedurę zwrotu auta. Jeżeli interesuje Cię wykup, poproś o harmonogram, całkowity koszt, warunki przeniesienia własności i informację, co dzieje się po wcześniejszym zakończeniu współpracy.',
          'Ustal również, które platformy są dostępne w mieście, czy konto będzie przypisane prawidłowo i jak wyglądają rozliczenia. Dobra firma odpowiada konkretnie, nie ukrywa opłat i nie naciska na podpisanie dokumentów bez czasu na przeczytanie.',
        ],
      },
      {
        heading: 'Jak zacząć z Vonco Partners',
        paragraphs: [
          'Wybierz miasto i zostaw zgłoszenie. Manager potwierdzi dostępność, omówi dokumenty oraz możliwe auta. Po zaakceptowaniu warunków następuje przygotowanie umowy i podpięcie do wybranych platform. Dopiero po weryfikacji wszystkich kosztów i obowiązków należy zdecydować, czy dany model jest odpowiedni.',
        ],
      },
    ],
  },
  {
    slug: 'uber-bolt-partner-poland',
    locale: 'en',
    title: 'What is an Uber or Bolt fleet partner in Poland?',
    description: 'A practical guide to fleet partners for Uber, Bolt, and Free Now: services, documents, car rental, costs, and questions to ask before signing an agreement.',
    publishedAt: '2026-07-15',
    updatedAt: '2026-07-15',
    readTime: '7 min',
    sections: [
      { heading: 'What a fleet partner does', paragraphs: ['A fleet partner helps a driver organize work with ride-hailing platforms. Depending on the agreement, the service may include a prepared vehicle, document support, platform onboarding, settlements, maintenance, and day-to-day assistance. Companies do not all offer the same package, so the agreement and complete price list matter more than a short advertising promise.', 'Vonco Partners supports drivers working with Uber, Bolt, and Free Now in Poland. A driver can ask about available cars, rental formats, required documents, and current availability in a selected city. Availability and terms should always be confirmed with a manager before the driver makes a commitment.'] },
      { heading: 'Why drivers use a partner', paragraphs: ['A new driver may need help understanding documents, choosing a suitable car, and completing platform onboarding. A partner can coordinate those steps. Drivers without their own vehicle can ask for a taxi-ready rental car. The realistic calculation must include platform fees, rent, fuel or charging, taxes, and the number of productive hours.', 'Experienced drivers may value maintenance, replacement vehicles, settlements, or the option to change the cooperation model. They should ask how breakdowns are handled, who pays for damage, and how the agreement can be ended.'] },
      { heading: 'Questions to ask before signing', paragraphs: ['Request the complete price list and agreement. Check the deposit, payment schedule, mileage limits, insurance, excess, private-use rules, vehicle return process, and additional charges. For rent-to-own, request the payment schedule, total cost, ownership-transfer conditions, and early-termination rules.', 'Confirm which platforms operate in the city and how settlements are documented. A reliable partner explains costs clearly and gives the driver time to read the agreement.'] },
      { heading: 'Starting with Vonco Partners', paragraphs: ['Choose a city and submit an application. A manager confirms availability, explains the required documents, and presents available vehicles. The driver should proceed only after understanding the total costs, responsibilities, and actual cooperation terms.'] },
    ],
  },
  {
    slug: 'uber-bolt-partner-poland',
    locale: 'uk',
    title: 'Хто такий партнер Uber і Bolt у Польщі та навіщо він водієві?',
    description: 'Пояснюємо роль партнера Uber, Bolt і Free Now: автомобілі, документи, підключення, витрати та питання, які потрібно поставити до підписання договору.',
    publishedAt: '2026-07-15',
    updatedAt: '2026-07-15',
    readTime: '7 хв',
    sections: [
      { heading: 'Що робить партнер автопарку', paragraphs: ['Партнер автопарку допомагає водієві організувати роботу з платформами перевезень. Залежно від договору це може включати підготовлений автомобіль, підтримку з документами, підключення до застосунків, розрахунки, сервіс і щоденну допомогу. Умови різних компаній відрізняються, тому повний договір і перелік платежів важливіші за коротку рекламну обіцянку.', 'Vonco Partners допомагає водіям у Польщі працювати з Uber, Bolt і Free Now. Можна уточнити доступні авто, формат оренди, документи й наявність машин у вибраному місті. Усі умови потрібно підтвердити з менеджером перед підписанням договору.'] },
      { heading: 'Навіщо водієві партнер', paragraphs: ['Новому водієві часто складно самостійно розібратися з документами, вимогами до авто й підключенням до платформ. Партнер координує ці етапи. Якщо власного автомобіля немає, можна перевірити наявність підготовленої машини. Реальний розрахунок доходу має враховувати комісії, оренду, пальне або заряджання, податки та кількість продуктивних годин.', 'Досвідченому водієві можуть бути корисні сервіс, підмінне авто, розрахунки або можливість змінити модель співпраці. Варто заздалегідь запитати про аварії, пошкодження, ремонт і припинення договору.'] },
      { heading: 'Що перевірити до підписання', paragraphs: ['Попросіть повний прайс і зразок договору. Перевірте депозит, графік платежів, обмеження пробігу, страхування, власну відповідальність, приватне користування, повернення авто й додаткові платежі. Для викупу потрібні графік, повна вартість, умови переходу права власності та правила дострокового завершення.', 'Також уточніть доступні платформи й порядок розрахунків. Надійний партнер пояснює витрати конкретно та дає час прочитати документи.'] },
      { heading: 'Як почати з Vonco Partners', paragraphs: ['Оберіть місто й залиште заявку. Менеджер перевірить доступність, пояснить документи та запропонує актуальні автомобілі. Продовжувати варто лише після того, як зрозумілі всі витрати, обов’язки й умови співпраці.'] },
    ],
  },
  {
    slug: 'uber-bolt-partner-poland',
    locale: 'ru',
    title: 'Кто такой партнер Uber и Bolt в Польше и зачем он водителю?',
    description: 'Объясняем роль партнера Uber, Bolt и Free Now: автомобили, документы, подключение, расходы и вопросы перед подписанием договора.',
    publishedAt: '2026-07-15',
    updatedAt: '2026-07-15',
    readTime: '7 мин',
    sections: [
      { heading: 'Что делает партнер автопарка', paragraphs: ['Партнер автопарка помогает водителю организовать работу с платформами перевозок. В зависимости от договора это может включать подготовленный автомобиль, поддержку с документами, подключение к приложениям, расчеты, сервис и ежедневную помощь. Условия компаний отличаются, поэтому полный договор и список платежей важнее короткого рекламного обещания.', 'Vonco Partners помогает водителям в Польше работать с Uber, Bolt и Free Now. Можно уточнить доступные автомобили, формат аренды, документы и наличие машин в выбранном городе. Все условия нужно подтвердить с менеджером до подписания договора.'] },
      { heading: 'Зачем водителю партнер', paragraphs: ['Новому водителю бывает сложно самостоятельно разобраться с документами, требованиями к автомобилю и подключением к платформам. Партнер координирует эти этапы. Если собственной машины нет, можно проверить наличие подготовленного авто. Реальный расчет дохода должен учитывать комиссии, аренду, топливо или зарядку, налоги и количество продуктивных часов.', 'Опытному водителю могут быть полезны сервис, подменный автомобиль, расчеты или возможность изменить модель сотрудничества. Стоит заранее спросить об авариях, повреждениях, ремонте и прекращении договора.'] },
      { heading: 'Что проверить до подписания', paragraphs: ['Попросите полный прайс и образец договора. Проверьте депозит, график платежей, ограничения пробега, страховку, собственную ответственность, личное использование, возврат машины и дополнительные платежи. Для выкупа нужны график, полная стоимость, условия перехода права собственности и правила досрочного завершения.', 'Также уточните доступные платформы и порядок расчетов. Надежный партнер объясняет расходы конкретно и дает время прочитать документы.'] },
      { heading: 'Как начать с Vonco Partners', paragraphs: ['Выберите город и оставьте заявку. Менеджер проверит доступность, объяснит документы и предложит актуальные автомобили. Продолжать стоит только после того, как понятны все расходы, обязанности и условия сотрудничества.'] },
    ],
  },
];

export function isBlogLocale(locale: string): locale is BlogLocale {
  return BLOG_LOCALES.some((item) => item === locale);
}

export function getBlogLabels(locale: BlogLocale) {
  return LABELS[locale];
}

export function getArticles(locale: BlogLocale) {
  return articles.filter((article) => article.locale === locale);
}

export function getArticle(locale: BlogLocale, slug: string) {
  return articles.find((article) => article.locale === locale && article.slug === slug);
}

export function getArticleSlugs() {
  return [...new Set(articles.map((article) => article.slug))];
}
