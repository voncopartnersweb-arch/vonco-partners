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
  seoTitle?: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  reviewedAt?: string;
  readTime: string;
  sections: ArticleSection[];
  relatedLinks?: { href: string; label: string }[];
};

const LABELS: Record<
  BlogLocale,
  {
    blog: string;
    read: string;
    back: string;
    seoTitle: string;
    description: string;
    reviewedBy: string;
    lastReviewed: string;
    sources: string;
    related: string;
  }
> = {
  pl: {
    blog: 'Poradnik kierowcy',
    read: 'Czytaj artykuł',
    back: 'Wszystkie artykuły',
    seoTitle: 'Poradnik kierowcy Uber, Bolt i Free Now',
    description:
      'Praktyczne informacje o pracy kierowcy, wynajmie auta, dokumentach i współpracy z Uber, Bolt oraz Free Now w Polsce.',
    reviewedBy: 'Zweryfikowane przez zespół Vonco Partners',
    lastReviewed: 'Ostatnia weryfikacja',
    sources: 'Oficjalne źródła',
    related: 'Przydatne strony dla kierowcy',
  },
  en: {
    blog: 'Driver guide',
    read: 'Read article',
    back: 'All articles',
    seoTitle: 'Uber, Bolt and Free Now driver guide in Poland',
    description:
      'Practical guides to taxi work, car rental, documents, and fleet partnerships for Uber, Bolt, and Free Now drivers in Poland.',
    reviewedBy: 'Reviewed by the Vonco Partners team',
    lastReviewed: 'Last reviewed',
    sources: 'Official sources',
    related: 'Useful pages for drivers',
  },
  uk: {
    blog: 'Порадник водія',
    read: 'Читати статтю',
    back: 'Усі статті',
    seoTitle: 'Робота в таксі у Польщі: порадник водія',
    description:
      'Практичні матеріали про роботу в Uber, Bolt і Free Now, оренду авто, документи та співпрацю з партнером автопарку в Польщі.',
    reviewedBy: 'Перевірено командою Vonco Partners',
    lastReviewed: 'Остання перевірка',
    sources: 'Офіційні джерела',
    related: 'Корисні сторінки для водія',
  },
  ru: {
    blog: 'Работа в такси в Польше: гид водителя',
    read: 'Читать статью',
    back: 'Все статьи',
    seoTitle: 'Работа в такси в Польше: Uber, Bolt и аренда авто',
    description:
      'Практические статьи о работе водителем Uber, Bolt и Free Now в Польше: документы, аренда авто для такси, партнер автопарка и выкуп автомобиля.',
    reviewedBy: 'Проверено командой Vonco Partners',
    lastReviewed: 'Последняя проверка',
    sources: 'Официальные источники',
    related: 'Полезные страницы для водителя',
  },
};

const articles: BlogArticle[] = [
  {
    slug: 'uber-bolt-partner-poland',
    locale: 'pl',
    title: 'Kim jest partner Uber i Bolt w Polsce i po co jest potrzebny kierowcy?',
    description: 'Wyjaśniamy, czym zajmuje się partner flotowy Uber, Bolt i Free Now, jakie wsparcie może zapewnić kierowcy oraz co sprawdzić przed podpisaniem umowy.',
    publishedAt: '2026-07-15',
    updatedAt: '2026-07-29',
    reviewedAt: '2026-07-29',
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
    updatedAt: '2026-07-29',
    reviewedAt: '2026-07-29',
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
    updatedAt: '2026-07-29',
    reviewedAt: '2026-07-29',
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
    updatedAt: '2026-07-29',
    reviewedAt: '2026-07-29',
    readTime: '7 мин',
    sections: [
      { heading: 'Что делает партнер автопарка', paragraphs: ['Партнер автопарка помогает водителю организовать работу с платформами перевозок. В зависимости от договора это может включать подготовленный автомобиль, поддержку с документами, подключение к приложениям, расчеты, сервис и ежедневную помощь. Условия компаний отличаются, поэтому полный договор и список платежей важнее короткого рекламного обещания.', 'Vonco Partners помогает водителям в Польше работать с Uber, Bolt и Free Now. Можно уточнить доступные автомобили, формат аренды, документы и наличие машин в выбранном городе. Все условия нужно подтвердить с менеджером до подписания договора.'] },
      { heading: 'Зачем водителю партнер', paragraphs: ['Новому водителю бывает сложно самостоятельно разобраться с документами, требованиями к автомобилю и подключением к платформам. Партнер координирует эти этапы. Если собственной машины нет, можно проверить наличие подготовленного авто. Реальный расчет дохода должен учитывать комиссии, аренду, топливо или зарядку, налоги и количество продуктивных часов.', 'Опытному водителю могут быть полезны сервис, подменный автомобиль, расчеты или возможность изменить модель сотрудничества. Стоит заранее спросить об авариях, повреждениях, ремонте и прекращении договора.'] },
      { heading: 'Что проверить до подписания', paragraphs: ['Попросите полный прайс и образец договора. Проверьте депозит, график платежей, ограничения пробега, страховку, собственную ответственность, личное использование, возврат машины и дополнительные платежи. Для выкупа нужны график, полная стоимость, условия перехода права собственности и правила досрочного завершения.', 'Также уточните доступные платформы и порядок расчетов. Надежный партнер объясняет расходы конкретно и дает время прочитать документы.'] },
      { heading: 'Как начать с Vonco Partners', paragraphs: ['Выберите город и оставьте заявку. Менеджер проверит доступность, объяснит документы и предложит актуальные автомобили. Продолжать стоит только после того, как понятны все расходы, обязанности и условия сотрудничества.'] },
    ],
    relatedLinks: [
      { href: '/work', label: 'Работа водителем такси в Польше' },
      { href: '/cars', label: 'Автомобили для Uber, Bolt и Free Now' },
      { href: '/contacts', label: 'Уточнить условия у менеджера' },
    ],
  },
  {
    slug: 'rabota-v-taksi-v-polshe',
    locale: 'ru',
    title: 'Работа в такси в Польше: как начать с Uber, Bolt и Free Now',
    seoTitle: 'Как начать работу в такси в Польше',
    description:
      'Пошаговый гид для водителя такси в Польше: выбор города и платформы, документы, собственное или арендованное авто, расходы и подключение.',
    publishedAt: '2026-07-29',
    updatedAt: '2026-07-29',
    readTime: '9 мин',
    sections: [
      {
        heading: 'С чего начать работу водителем такси в Польше',
        paragraphs: [
          'Сначала выберите город и проверьте, какие приложения реально принимают водителей в этой рабочей зоне. Uber, Bolt и Free Now отличаются покрытием и настройкой аккаунтов, поэтому условия одного города нельзя автоматически переносить на другой. Vonco Partners помогает уточнить доступные платформы и подобрать формат сотрудничества до регистрации.',
          'Следующий шаг — решить, будете ли вы работать на собственном автомобиле или возьмете подготовленную машину автопарка. От этого зависят документы, расходы, ответственность за обслуживание и срок выхода на линию.',
        ],
      },
      {
        heading: 'Какие документы нужно подготовить',
        paragraphs: [
          'Водителю понадобятся действующее водительское удостоверение, документ, подтверждающий личность, и законное основание для пребывания и работы в Польше. Точный комплект зависит от гражданства, формы сотрудничества, города, платформы и автомобиля. Не отправляйте оригиналы неизвестным посредникам и заранее прочитайте договор.',
          'Для автомобиля проверяются регистрационные и страховые документы, техническое состояние и соответствие требованиям выбранной платформы. Если водитель работает на собственной машине, Vonco Partners помогает организовать необходимые формальности и подготовку автомобиля.',
        ],
      },
      {
        heading: 'Собственное авто или аренда',
        paragraphs: [
          'Собственный автомобиль дает больше контроля над графиком и расходами, но водитель самостоятельно отвечает за техническое состояние, ремонт и простои. Арендованный автомобиль позволяет быстрее начать работу без покупки машины. В обычной аренде предусмотренные договором обслуживание и ремонт организует владелец автомобиля, а ответственность водителя фиксируется в договоре.',
          'Перед началом сравните недельный платеж, залог, расход топлива, страховку, правила повреждений и доступность подменного авто. Доход нельзя оценивать только по выручке в приложении: нужно вычесть комиссии платформ, аренду, топливо или зарядку, налоги и другие индивидуальные расходы.',
        ],
      },
      {
        heading: 'Как проходит подключение к Uber, Bolt и Free Now',
        paragraphs: [
          'После заявки менеджер уточняет город, документы, желаемый график и наличие автомобиля. Затем водитель получает согласованные условия, проходит проверку документов и подключение к доступным приложениям. Ответ на заявку обычно приходит как можно быстрее — в стандартной ситуации в течение нескольких часов.',
          'Перед выходом на линию убедитесь, что аккаунт активирован для нужной зоны, автомобиль указан правильно, а порядок расчетов понятен. Если условия платформы или города меняются, актуальную конфигурацию нужно повторно подтвердить у менеджера.',
        ],
      },
    ],
    relatedLinks: [
      { href: '/work', label: 'Условия работы водителем' },
      { href: '/cities', label: 'Выбрать город и платформу' },
      { href: '/cars', label: 'Посмотреть автомобили для такси' },
      { href: '/contacts#driver-application', label: 'Оставить заявку на работу' },
    ],
  },
  {
    slug: 'arenda-avto-dlya-taksi-v-polshe',
    locale: 'ru',
    title: 'Аренда авто для такси в Польше: что проверить водителю',
    seoTitle: 'Аренда авто для такси в Польше',
    description:
      'Как выбрать автомобиль в аренду для Uber, Bolt и Free Now в Польше: платежи, залог, обслуживание, страховка, категории и вопросы перед договором.',
    publishedAt: '2026-07-29',
    updatedAt: '2026-07-29',
    readTime: '8 мин',
    sections: [
      {
        heading: 'Какая машина подходит для работы в такси',
        paragraphs: [
          'Для городской работы особенно важны расход топлива, надежность, удобная посадка пассажиров и соответствие категориям приложений. Экономичные бензиновые, газовые и гибридные автомобили помогают контролировать ежедневные расходы, а более просторные модели могут подходить для дополнительных категорий.',
          'Категории Uber, Bolt и Free Now зависят от модели, года выпуска, комплектации и локальных правил платформы. Поэтому отметка на странице автомобиля служит ориентиром, а окончательное соответствие конкретной машины менеджер подтверждает перед оформлением.',
        ],
      },
      {
        heading: 'Что входит в стоимость аренды',
        paragraphs: [
          'До подписания договора запросите актуальный недельный платеж, размер залога и полный перечень возможных дополнительных расходов. Уточните, кто оплачивает плановое обслуживание, ремонт, шины, повреждения, страховую франшизу и простой автомобиля.',
          'В Vonco Partners залог для обычной аренды равен стоимости одной недели аренды. Предусмотренные договором плановое обслуживание и ремонт оплачивает владелец авто, а водитель отвечает за правильную эксплуатацию, новые повреждения, повреждение шин и согласованные расходные материалы. Конкретные условия всегда фиксируются в договоре.',
        ],
      },
      {
        heading: 'Как сравнить автомобили',
        paragraphs: [
          'Сравнивайте не только цену аренды. Посчитайте ожидаемый пробег, расход топлива, количество рабочих часов и тип поездок. Для плотного городского графика экономичный гибрид может быть выгоднее более дешевой в аренде машины с высоким расходом.',
          'Осмотрите кузов, салон, шины и оборудование вместе с представителем компании. Зафиксируйте состояние автомобиля в акте или фотографиях, проверьте документы, страховку, срок техосмотра и порядок действий при поломке или ДТП.',
        ],
      },
      {
        heading: 'Как получить доступный автомобиль',
        paragraphs: [
          'Автопарк меняется ежедневно, поэтому сайт показывает модели и ориентировочные цены, а не гарантирует наличие конкретного экземпляра. После заявки менеджер уточняет город, график и платформы, затем предлагает доступные автомобили и подтверждает фактическую комплектацию, пробег и условия.',
        ],
      },
    ],
    relatedLinks: [
      { href: '/cars', label: 'Автопарк и актуальные цены' },
      { href: '/services', label: 'Форматы аренды и сопровождение' },
      { href: '/work', label: 'Как начать работу в такси' },
      { href: '/contacts#driver-application', label: 'Уточнить наличие автомобиля' },
    ],
  },
  {
    slug: 'avto-pod-vykup-dlya-taksi-v-polshe',
    locale: 'ru',
    title: 'Авто под выкуп для такси в Польше: как работает программа',
    seoTitle: 'Авто под выкуп для такси в Польше',
    description:
      'Объясняем программу авто под выкуп для водителя такси: индивидуальные условия, выкупные платежи, обслуживание, договор и переход права собственности.',
    publishedAt: '2026-07-29',
    updatedAt: '2026-07-29',
    readTime: '7 мин',
    sections: [
      {
        heading: 'Чем выкуп отличается от обычной аренды',
        paragraphs: [
          'При обычной аренде водитель платит за использование автомобиля, а предусмотренное договором обслуживание организует компания. В программе выкупа согласованные выкупные платежи полностью засчитываются в стоимость машины. После выплаты суммы, указанной в договоре, автомобиль переходит в собственность водителя.',
          'Это долгосрочное обязательство, поэтому нельзя сравнивать программу только по размеру недельного платежа. Важно понимать общую сумму, срок, техническое состояние машины и все обязанности сторон.',
        ],
      },
      {
        heading: 'Как согласовываются условия',
        paragraphs: [
          'У Vonco Partners нет единого публичного графика для всех автомобилей. Менеджер индивидуально согласовывает модель, возможный первый взнос, размер недельного платежа и сумму выкупа. Для водителей, которые давно и стабильно сотрудничают с компанией, вариант без первого взноса может обсуждаться отдельно.',
          'Все существенные условия должны быть записаны в договоре: какие платежи считаются выкупными, когда переходит право собственности, кто оплачивает страхование, ремонт и обслуживание, а также как решаются изменение автомобиля или досрочное завершение программы.',
        ],
      },
      {
        heading: 'Кто оплачивает обслуживание автомобиля',
        paragraphs: [
          'В программе выкупа расходы, связанные с автомобилем, водитель несет самостоятельно в объеме, указанном в договоре. Это принципиальное отличие от обычной аренды, где предусмотренное договором плановое обслуживание и ремонт выполняет компания.',
          'Перед выбором машины оцените будущие расходы на топливо, сервис, шины, страховку и возможные ремонты. Независимая диагностика и проверка истории автомобиля помогают принять более взвешенное решение.',
        ],
      },
      {
        heading: 'Что спросить у менеджера',
        paragraphs: [
          'Попросите показать доступные автомобили, проект договора и расчет именно для выбранной машины. Уточните первоначальный взнос, недельный платеж, общую сумму выкупа, обязанности по обслуживанию и процедуру перехода собственности. Условия смены машины и досрочного завершения обсуждаются индивидуально и должны быть зафиксированы до начала программы.',
        ],
      },
    ],
    relatedLinks: [
      { href: '/vykup-avto', label: 'Подробные условия авто под выкуп' },
      { href: '/cars', label: 'Автомобили и ориентировочные цены' },
      { href: '/programs', label: 'Программы для водителей' },
      { href: '/contacts#driver-application', label: 'Обсудить индивидуальные условия' },
    ],
  },
  {
    slug: 'rabota-uber-bolt-katowice',
    locale: 'ru',
    title: 'Работа в Uber и Bolt в Катовице: автомобиль и подключение',
    seoTitle: 'Работа в Uber и Bolt в Катовице',
    description:
      'Работа водителем Uber и Bolt в Катовице и Силезской агломерации: зоны спроса, выбор авто, подключение к платформам и старт с Vonco Partners.',
    publishedAt: '2026-07-29',
    updatedAt: '2026-07-29',
    readTime: '7 мин',
    sections: [
      {
        heading: 'Особенности работы в Катовице',
        paragraphs: [
          'Катовице — часть плотной Силезской агломерации, поэтому работа водителя не ограничивается центром одного города. Заказы формируют вокзал, офисные районы, торговые центры, мероприятия, поездки между соседними городами и трансферы в аэропорт Катовице-Пыжовице.',
          'Перед стартом полезно изучить не только центр Катовице, но и основные направления агломерации. Реальный результат зависит от графика, сезона, выбранных приложений, комиссий и расходов на автомобиль.',
        ],
      },
      {
        heading: 'Uber, Bolt и Free Now в Катовице',
        paragraphs: [
          'Vonco Partners помогает водителю подготовить документы и подключиться к доступным платформам. Аккаунт и автомобиль должны быть правильно назначены для рабочей зоны. Если водитель использует несколько приложений, правила каждого сервиса и актуальную конфигурацию необходимо подтвердить до выхода на линию.',
          'Работа сразу с несколькими приложениями может сокращать время ожидания заказов, но водитель должен соблюдать правила платформ, контролировать активные поездки и безопасно пользоваться телефоном.',
        ],
      },
      {
        heading: 'Какой автомобиль выбрать',
        paragraphs: [
          'Для ежедневных поездок по агломерации подходят экономичные автомобили с низким расходом топлива и надежной автоматической коробкой передач. Если водитель планирует больше трансферов или работу в комфортных категориях, стоит сравнить просторные седаны и универсалы.',
          'Можно работать на собственном автомобиле или выбрать машину Vonco Partners. Менеджер подтверждает доступные модели, цену аренды, категории приложений и условия обслуживания конкретного автомобиля.',
        ],
      },
      {
        heading: 'Как начать работу',
        paragraphs: [
          'Оставьте заявку, укажите Катовице, доступные документы и желаемый формат автомобиля. Менеджер обычно отвечает как можно быстрее — в стандартной ситуации в течение нескольких часов — и объясняет дальнейшие шаги. До подписания договора проверьте все платежи, ответственность за автомобиль и порядок расчетов.',
        ],
      },
    ],
    relatedLinks: [
      { href: '/cities/katowice', label: 'Работа в такси в Катовице' },
      { href: '/cities/katowice/uber', label: 'Работа в Uber в Катовице' },
      { href: '/cities/katowice/bolt', label: 'Работа в Bolt в Катовице' },
      { href: '/cars', label: 'Автомобили для работы в Катовице' },
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

export function getArticleLocales(slug: string) {
  return BLOG_LOCALES.filter((locale) =>
    articles.some((article) => article.slug === slug && article.locale === locale),
  );
}
