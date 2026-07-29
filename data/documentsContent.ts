import type { SupportedLocale } from '@/lib/seo';

export const DOCUMENT_GUIDE_LOCALES = [
  'ru',
  'uk',
  'pl',
  'en',
] as const satisfies readonly SupportedLocale[];

export type DocumentGuideLocale = (typeof DOCUMENT_GUIDE_LOCALES)[number];

type DocumentGuideContent = {
  navLabel: string;
  seoTitle: string;
  seoDescription: string;
  badge: string;
  title: string;
  lead: string;
  reviewLabel: string;
  reviewText: string;
  sections: Array<{
    title: string;
    intro: string;
    items: string[];
  }>;
  formatsTitle: string;
  formats: Array<{ title: string; text: string }>;
  processTitle: string;
  steps: Array<{ title: string; text: string }>;
  checklistTitle: string;
  checklist: string[];
  faqTitle: string;
  faq: Array<{ q: string; a: string }>;
  sourcesTitle: string;
  disclaimer: string;
  ctaTitle: string;
  ctaText: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export const DOCUMENT_GUIDE_SOURCES = [
  {
    name: 'Uber — wymagania dotyczące kierowców w Polsce',
    href: 'https://www.uber.com/pl/pl/drive/requirements/',
  },
  {
    name: 'Bolt — wymagania dotyczące rejestracji kierowcy',
    href: 'https://bolt.eu/pl-pl/driver/guide/documents/',
  },
  {
    name: 'Bolt — wymagania pojazdów i kategorii',
    href: 'https://bolt.eu/pl-pl/support/articles/360010743320/',
  },
] as const;

const CONTENT: Record<DocumentGuideLocale, DocumentGuideContent> = {
  ru: {
    navLabel: 'Документы для работы',
    seoTitle: 'Документы для работы в такси в Польше: Uber и Bolt',
    seoDescription:
      'Какие документы нужны водителю такси в Польше для Uber, Bolt и Free Now: водительские документы, автомобиль, лицензия, проверки и подключение.',
    badge: 'Гид водителя · Польша',
    title: 'Документы для работы в такси в Польше',
    lead:
      'Практический список для водителей Uber, Bolt и Free Now. Требования зависят от платформы, города, гражданства и формата сотрудничества, поэтому окончательный комплект подтверждается перед регистрацией.',
    reviewLabel: 'Проверено командой Vonco Partners',
    reviewText:
      'Последняя проверка: 29 июля 2026 года. Материал основан на официальных требованиях платформ и практическом процессе подключения водителей.',
    sections: [
      {
        title: 'Документы водителя',
        intro:
          'До регистрации подготовьте оригиналы и четкие фотографии документов. Платформы проводят личную проверку личности.',
        items: [
          'Действующее польское водительское удостоверение категории B.',
          'Паспорт, удостоверение личности или действующая карта побыту.',
          'Документ, подтверждающий законное основание пребывания и доступа к рынку труда, если это применимо.',
          'Справка об отсутствии судимости — для проверки платформ обычно требуется актуальный документ, выданный не ранее чем за 30 дней.',
          'Действующие медицинское и психологическое заключения для работы водителем такси.',
          'Актуальная фотография профиля и личная проверка оригиналов документов.',
          'Идентификатор водителя такси, если его требует выбранная гмина.',
        ],
      },
      {
        title: 'Документы автомобиля',
        intro:
          'Собственный или арендованный автомобиль должен соответствовать требованиям такси и конкретной платформы.',
        items: [
          'Свидетельство о регистрации с отметкой TAXI.',
          'Действующий полис обязательного страхования OC.',
          'Выписка на автомобиль из лицензии такси партнера.',
          'Действующий технический осмотр и обязательное оснащение автомобиля.',
          'Городская маркировка, лампа TAXI и другие элементы, если они требуются локальными правилами.',
          'Фотографии автомобиля и номерного знака для проверки в приложении.',
        ],
      },
      {
        title: 'Аккаунт и подключение к платформам',
        intro:
          'Uber, Bolt и Free Now проверяют документы отдельно. Аккаунт должен быть настроен для правильной рабочей зоны и автомобиля.',
        items: [
          'Активные номер телефона и электронная почта.',
          'Загруженные документы без обрезанных краев и нечитаемых данных.',
          'Привязка к партнеру автопарка и автомобилю, на котором водитель фактически работает.',
          'Подтверждение города и доступных приложений до выхода на линию.',
          'Банковские и расчетные данные согласно выбранной форме сотрудничества.',
        ],
      },
    ],
    formatsTitle: 'Собственный автомобиль или авто компании',
    formats: [
      {
        title: 'Работа на собственном авто',
        text:
          'Компания помогает проверить требования, оформить выписку из лицензии на автомобиль и подготовить документы. Водитель самостоятельно отвечает за техническое состояние, обслуживание, страхование и расходы своего автомобиля.',
      },
      {
        title: 'Аренда автомобиля Vonco Partners',
        text:
          'Водитель получает подготовленный автомобиль с документами для работы. Недельный платеж, залог, обслуживание, ответственность за повреждения и правила возврата фиксируются в договоре.',
      },
      {
        title: 'Авто под выкуп',
        text:
          'Модель, первый взнос, недельный платеж, общая сумма и срок согласовываются индивидуально. Все платежи, указанные в договоре как выкупные, засчитываются в стоимость автомобиля.',
      },
    ],
    processTitle: 'Как проходит проверка и старт',
    steps: [
      {
        title: 'Заявка',
        text: 'Укажите город, контактные данные и наличие собственного автомобиля.',
      },
      {
        title: 'Проверка документов',
        text: 'Менеджер проверит комплект, объяснит недостающие этапы и доступные платформы.',
      },
      {
        title: 'Автомобиль и договор',
        text: 'Выберите собственное авто, аренду или выкуп и внимательно проверьте все платежи и обязанности.',
      },
      {
        title: 'Активация',
        text: 'После проверки оригиналов, настройки аккаунтов и автомобиля можно выходить на линию.',
      },
    ],
    checklistTitle: 'Что проверить до подписания договора',
    checklist: [
      'Полный список платежей, размер залога и периодичность расчетов.',
      'Кто оплачивает обслуживание, ремонт, шины, страховку и простой.',
      'Ответственность за повреждения и размер возможной страховой франшизы.',
      'Правила смены автомобиля, возврата и завершения сотрудничества.',
      'Какие платформы и рабочие зоны будут активированы.',
      'Какие условия являются индивидуальными и должны быть записаны в договоре.',
    ],
    faqTitle: 'Частые вопросы о документах',
    faq: [
      {
        q: 'Можно ли начать работу без собственного автомобиля?',
        a: 'Да. Можно выбрать подготовленный автомобиль Vonco Partners. Наличие конкретной модели и актуальные условия подтверждает менеджер.',
      },
      {
        q: 'Подходит ли иностранное водительское удостоверение?',
        a: 'Требования зависят от действующего законодательства и платформы. Uber и Bolt публикуют требования к польскому водительскому удостоверению, поэтому документ нужно проверить до регистрации.',
      },
      {
        q: 'Нужна ли справка об отсутствии судимости?',
        a: 'Да. Она входит в базовый комплект проверки водителя. Для личной проверки платформ обычно требуется документ не старше 30 дней.',
      },
      {
        q: 'Сколько занимает проверка заявки?',
        a: 'Vonco Partners отвечает как можно быстрее — обычно в течение нескольких часов. Общий срок старта зависит от наличия всех документов, автомобиля и проверки платформы.',
      },
    ],
    sourcesTitle: 'Официальные источники',
    disclaimer:
      'Материал носит информационный характер. Требования платформ, гмин и законодательства могут меняться. Перед регистрацией менеджер проверяет актуальный комплект для конкретного водителя, города и автомобиля.',
    ctaTitle: 'Проверить документы перед стартом',
    ctaText:
      'Отправьте заявку менеджеру Vonco Partners — мы проверим вашу ситуацию, город и желаемый формат автомобиля.',
    ctaPrimary: 'Оставить заявку',
    ctaSecondary: 'Выбрать автомобиль',
  },
  uk: {
    navLabel: 'Документи для роботи',
    seoTitle: 'Документи для роботи в таксі у Польщі: Uber і Bolt',
    seoDescription:
      'Які документи потрібні водієві таксі в Польщі для Uber, Bolt і Free Now: документи водія, авто, ліцензія, перевірки та підключення.',
    badge: 'Порадник водія · Польща',
    title: 'Документи для роботи в таксі у Польщі',
    lead:
      'Практичний перелік для водіїв Uber, Bolt і Free Now. Вимоги залежать від платформи, міста, громадянства та формату співпраці, тому остаточний комплект підтверджується перед реєстрацією.',
    reviewLabel: 'Перевірено командою Vonco Partners',
    reviewText:
      'Остання перевірка: 29 липня 2026 року. Матеріал базується на офіційних вимогах платформ і практичному процесі підключення водіїв.',
    sections: [
      {
        title: 'Документи водія',
        intro:
          'До реєстрації підготуйте оригінали та чіткі фотографії документів. Платформи проводять особисту перевірку.',
        items: [
          'Чинне польське посвідчення водія категорії B.',
          'Паспорт, посвідчення особи або чинна карта побиту.',
          'Документ про законну підставу перебування та доступ до ринку праці, якщо це застосовується.',
          'Довідка про несудимість — для перевірки платформ зазвичай потрібен актуальний документ, виданий не раніше ніж за 30 днів.',
          'Чинні медичний і психологічний висновки для роботи водієм таксі.',
          'Актуальне фото профілю й особиста перевірка оригіналів документів.',
          'Ідентифікатор водія таксі, якщо його вимагає обрана гміна.',
        ],
      },
      {
        title: 'Документи автомобіля',
        intro:
          'Власний або орендований автомобіль має відповідати вимогам таксі та конкретної платформи.',
        items: [
          'Свідоцтво про реєстрацію з відміткою TAXI.',
          'Чинний поліс обов’язкового страхування OC.',
          'Виписка на автомобіль із ліцензії таксі партнера.',
          'Чинний технічний огляд та обов’язкове оснащення автомобіля.',
          'Міське маркування, лампа TAXI та інші елементи, якщо їх вимагають локальні правила.',
          'Фотографії автомобіля й номерного знака для перевірки в застосунку.',
        ],
      },
      {
        title: 'Акаунт і підключення до платформ',
        intro:
          'Uber, Bolt і Free Now перевіряють документи окремо. Акаунт має бути налаштований для правильної робочої зони й автомобіля.',
        items: [
          'Активні номер телефону та електронна пошта.',
          'Завантажені документи без обрізаних країв і нечитабельних даних.',
          'Прив’язка до партнера автопарку й автомобіля, на якому водій фактично працює.',
          'Підтвердження міста та доступних застосунків до виходу на лінію.',
          'Банківські й розрахункові дані відповідно до обраної форми співпраці.',
        ],
      },
    ],
    formatsTitle: 'Власний автомобіль чи авто компанії',
    formats: [
      {
        title: 'Робота на власному авто',
        text:
          'Компанія допомагає перевірити вимоги, оформити виписку з ліцензії на автомобіль і підготувати документи. Водій самостійно відповідає за технічний стан, обслуговування, страхування та витрати свого авто.',
      },
      {
        title: 'Оренда автомобіля Vonco Partners',
        text:
          'Водій отримує підготовлений автомобіль із документами для роботи. Тижневий платіж, застава, обслуговування, відповідальність за пошкодження та правила повернення фіксуються в договорі.',
      },
      {
        title: 'Авто під виплату',
        text:
          'Модель, перший внесок, тижневий платіж, загальна сума й строк погоджуються індивідуально. Усі платежі, визначені договором як викупні, зараховуються у вартість автомобіля.',
      },
    ],
    processTitle: 'Як проходить перевірка та старт',
    steps: [
      {
        title: 'Заявка',
        text: 'Вкажіть місто, контактні дані та наявність власного автомобіля.',
      },
      {
        title: 'Перевірка документів',
        text: 'Менеджер перевірить комплект, пояснить відсутні етапи та доступні платформи.',
      },
      {
        title: 'Автомобіль і договір',
        text: 'Оберіть власне авто, оренду або виплату й уважно перевірте всі платежі та обов’язки.',
      },
      {
        title: 'Активація',
        text: 'Після перевірки оригіналів, налаштування акаунтів і автомобіля можна виходити на лінію.',
      },
    ],
    checklistTitle: 'Що перевірити до підписання договору',
    checklist: [
      'Повний перелік платежів, розмір застави та періодичність розрахунків.',
      'Хто оплачує обслуговування, ремонт, шини, страхування та простій.',
      'Відповідальність за пошкодження й розмір можливої страхової франшизи.',
      'Правила зміни автомобіля, повернення й завершення співпраці.',
      'Які платформи та робочі зони будуть активовані.',
      'Які умови є індивідуальними й мають бути записані в договорі.',
    ],
    faqTitle: 'Часті питання про документи',
    faq: [
      {
        q: 'Чи можна почати роботу без власного автомобіля?',
        a: 'Так. Можна обрати підготовлений автомобіль Vonco Partners. Наявність конкретної моделі й актуальні умови підтверджує менеджер.',
      },
      {
        q: 'Чи підходить іноземне посвідчення водія?',
        a: 'Вимоги залежать від чинного законодавства та платформи. Uber і Bolt публікують вимоги до польського посвідчення, тому документ потрібно перевірити до реєстрації.',
      },
      {
        q: 'Чи потрібна довідка про несудимість?',
        a: 'Так. Вона входить до базового комплекту перевірки водія. Для особистої перевірки платформ зазвичай потрібен документ не старший за 30 днів.',
      },
      {
        q: 'Скільки триває перевірка заявки?',
        a: 'Vonco Partners відповідає якнайшвидше — зазвичай протягом кількох годин. Загальний строк старту залежить від наявності документів, автомобіля та перевірки платформи.',
      },
    ],
    sourcesTitle: 'Офіційні джерела',
    disclaimer:
      'Матеріал має інформаційний характер. Вимоги платформ, гмін і законодавства можуть змінюватися. Перед реєстрацією менеджер перевіряє актуальний комплект для конкретного водія, міста й автомобіля.',
    ctaTitle: 'Перевірити документи перед стартом',
    ctaText:
      'Надішліть заявку менеджеру Vonco Partners — ми перевіримо вашу ситуацію, місто й бажаний формат автомобіля.',
    ctaPrimary: 'Залишити заявку',
    ctaSecondary: 'Обрати автомобіль',
  },
  pl: {
    navLabel: 'Dokumenty kierowcy',
    seoTitle: 'Dokumenty do pracy w taxi w Polsce: Uber i Bolt',
    seoDescription:
      'Dokumenty kierowcy taxi w Polsce dla Uber, Bolt i Free Now: prawo jazdy, niekaralność, badania, dokumenty auta, licencja i weryfikacja.',
    badge: 'Poradnik kierowcy · Polska',
    title: 'Dokumenty do pracy jako kierowca taxi w Polsce',
    lead:
      'Praktyczna lista dla kierowców Uber, Bolt i Free Now. Wymagania zależą od platformy, miasta, obywatelstwa i modelu współpracy, dlatego ostateczny zestaw należy potwierdzić przed rejestracją.',
    reviewLabel: 'Sprawdzone przez zespół Vonco Partners',
    reviewText:
      'Ostatnia weryfikacja: 29 lipca 2026 roku. Materiał opiera się na oficjalnych wymaganiach platform i praktycznym procesie wdrażania kierowców.',
    sections: [
      {
        title: 'Dokumenty kierowcy',
        intro:
          'Przed rejestracją przygotuj oryginały i czytelne zdjęcia dokumentów. Platformy prowadzą osobistą weryfikację.',
        items: [
          'Ważne polskie prawo jazdy kategorii B.',
          'Dowód osobisty, paszport lub ważna karta pobytu.',
          'Dokument potwierdzający legalny pobyt i dostęp do rynku pracy, jeżeli ma zastosowanie.',
          'Zaświadczenie o niekaralności — do weryfikacji platform zwykle wymagany jest dokument wystawiony nie wcześniej niż 30 dni przed wizytą.',
          'Aktualne orzeczenie lekarskie i psychologiczne do pracy jako kierowca taxi.',
          'Aktualne zdjęcie profilowe i osobista weryfikacja oryginałów.',
          'Identyfikator kierowcy taxi, jeżeli wymaga go dana gmina.',
        ],
      },
      {
        title: 'Dokumenty samochodu',
        intro:
          'Własny lub wynajęty samochód musi spełniać wymagania taxi i wybranej platformy.',
        items: [
          'Dowód rejestracyjny z pieczątką TAXI.',
          'Ważne ubezpieczenie OC.',
          'Wypis na pojazd z licencji taxi partnera.',
          'Ważne badanie techniczne i wymagane wyposażenie.',
          'Oznaczenie miejskie, lampa TAXI i inne elementy wymagane lokalnie.',
          'Zdjęcia pojazdu i tablicy rejestracyjnej do weryfikacji w aplikacji.',
        ],
      },
      {
        title: 'Konto i aktywacja platform',
        intro:
          'Uber, Bolt i Free Now sprawdzają dokumenty osobno. Konto musi być przypisane do właściwej strefy i pojazdu.',
        items: [
          'Aktywny numer telefonu i adres e-mail.',
          'Czytelne skany bez uciętych krawędzi.',
          'Przypisanie do partnera flotowego i faktycznie używanego samochodu.',
          'Potwierdzenie miasta i dostępnych aplikacji przed rozpoczęciem jazdy.',
          'Dane bankowe i rozliczeniowe zgodne z formą współpracy.',
        ],
      },
    ],
    formatsTitle: 'Własny samochód czy auto firmy',
    formats: [
      {
        title: 'Praca na własnym aucie',
        text:
          'Firma pomaga sprawdzić wymagania, uzyskać wypis z licencji na pojazd i przygotować dokumenty. Kierowca odpowiada za stan techniczny, serwis, ubezpieczenie i koszty własnego samochodu.',
      },
      {
        title: 'Wynajem auta Vonco Partners',
        text:
          'Kierowca otrzymuje przygotowany samochód z dokumentami do pracy. Tygodniowa opłata, kaucja, serwis, odpowiedzialność za uszkodzenia i zwrot auta są określone w umowie.',
      },
      {
        title: 'Auto z wykupem',
        text:
          'Model, wpłata początkowa, tygodniowa opłata, łączna kwota i okres są ustalane indywidualnie. Wszystkie płatności wskazane w umowie jako wykupowe zaliczają się na cenę auta.',
      },
    ],
    processTitle: 'Jak przebiega weryfikacja i start',
    steps: [
      {
        title: 'Zgłoszenie',
        text: 'Podaj miasto, dane kontaktowe i informację o własnym samochodzie.',
      },
      {
        title: 'Sprawdzenie dokumentów',
        text: 'Manager sprawdzi zestaw, wyjaśni brakujące etapy i dostępne platformy.',
      },
      {
        title: 'Auto i umowa',
        text: 'Wybierz własne auto, wynajem lub wykup i sprawdź wszystkie opłaty oraz obowiązki.',
      },
      {
        title: 'Aktywacja',
        text: 'Po sprawdzeniu oryginałów, konfiguracji kont i samochodu możesz rozpocząć jazdę.',
      },
    ],
    checklistTitle: 'Co sprawdzić przed podpisaniem umowy',
    checklist: [
      'Pełną listę opłat, wysokość kaucji i częstotliwość rozliczeń.',
      'Kto opłaca serwis, naprawy, opony, ubezpieczenie i przestój.',
      'Odpowiedzialność za uszkodzenia i wysokość udziału własnego.',
      'Zasady zmiany samochodu, zwrotu i zakończenia współpracy.',
      'Platformy i strefy, które zostaną aktywowane.',
      'Warunki indywidualne, które muszą znaleźć się w umowie.',
    ],
    faqTitle: 'Najczęstsze pytania o dokumenty',
    faq: [
      {
        q: 'Czy można zacząć bez własnego samochodu?',
        a: 'Tak. Można wybrać przygotowany samochód Vonco Partners. Dostępność modelu i aktualne warunki potwierdza manager.',
      },
      {
        q: 'Czy zagraniczne prawo jazdy jest akceptowane?',
        a: 'Wymagania zależą od prawa i platformy. Uber i Bolt publikują wymagania dotyczące polskiego prawa jazdy, dlatego dokument należy sprawdzić przed rejestracją.',
      },
      {
        q: 'Czy potrzebne jest zaświadczenie o niekaralności?',
        a: 'Tak. Jest częścią podstawowej weryfikacji kierowcy. Platformy zwykle wymagają dokumentu nie starszego niż 30 dni.',
      },
      {
        q: 'Ile trwa sprawdzenie zgłoszenia?',
        a: 'Vonco Partners odpowiada możliwie szybko, zwykle w ciągu kilku godzin. Termin rozpoczęcia zależy od dokumentów, samochodu i weryfikacji platformy.',
      },
    ],
    sourcesTitle: 'Oficjalne źródła',
    disclaimer:
      'Materiał ma charakter informacyjny. Wymagania platform, gmin i prawa mogą się zmieniać. Przed rejestracją manager sprawdza aktualny zestaw dla danego kierowcy, miasta i samochodu.',
    ctaTitle: 'Sprawdź dokumenty przed startem',
    ctaText:
      'Wyślij zgłoszenie do managera Vonco Partners — sprawdzimy Twoją sytuację, miasto i wybrany format samochodu.',
    ctaPrimary: 'Wyślij zgłoszenie',
    ctaSecondary: 'Wybierz samochód',
  },
  en: {
    navLabel: 'Driver documents',
    seoTitle: 'Documents for taxi work in Poland: Uber and Bolt',
    seoDescription:
      'Documents required for taxi work in Poland with Uber, Bolt, and Free Now: driving licence, background check, medical checks, vehicle and taxi licence.',
    badge: 'Driver guide · Poland',
    title: 'Documents required for taxi work in Poland',
    lead:
      'A practical checklist for Uber, Bolt, and Free Now drivers. Requirements depend on the platform, city, nationality, and cooperation model, so the final set must be confirmed before registration.',
    reviewLabel: 'Reviewed by the Vonco Partners team',
    reviewText:
      'Last reviewed on 29 July 2026. This guide is based on official platform requirements and the practical driver onboarding process.',
    sections: [
      {
        title: 'Driver documents',
        intro:
          'Prepare original documents and clear photographs before registration. Platforms perform in-person identity verification.',
        items: [
          'A valid Polish category B driving licence.',
          'An identity card, passport, or valid residence card.',
          'Evidence of legal residence and access to the labour market, where applicable.',
          'A criminal record certificate — platforms commonly require one issued no more than 30 days before verification.',
          'Valid medical and psychological certificates for taxi driving.',
          'A current profile photograph and in-person verification of original documents.',
          'A taxi driver ID if required by the selected municipality.',
        ],
      },
      {
        title: 'Vehicle documents',
        intro:
          'An owned or rented vehicle must meet taxi regulations and the requirements of the selected platform.',
        items: [
          'Vehicle registration document with a TAXI stamp.',
          'Valid third-party liability insurance.',
          'A vehicle excerpt from the fleet partner’s taxi licence.',
          'A valid technical inspection and mandatory equipment.',
          'City markings, a TAXI lamp, and other locally required elements.',
          'Vehicle and registration-plate photographs for in-app verification.',
        ],
      },
      {
        title: 'Platform account and activation',
        intro:
          'Uber, Bolt, and Free Now verify documents separately. The account must be assigned to the correct work zone and vehicle.',
        items: [
          'An active phone number and email address.',
          'Readable uploads without cropped edges.',
          'Assignment to the fleet partner and the vehicle actually being used.',
          'Confirmation of the city and available applications before starting work.',
          'Bank and settlement information appropriate to the cooperation model.',
        ],
      },
    ],
    formatsTitle: 'Your own vehicle or a company car',
    formats: [
      {
        title: 'Working with your own car',
        text:
          'The company helps check requirements, arrange the vehicle’s taxi licence excerpt, and prepare documents. The driver remains responsible for the condition, maintenance, insurance, and costs of their vehicle.',
      },
      {
        title: 'Renting a Vonco Partners car',
        text:
          'The driver receives a prepared vehicle with work documents. Weekly payments, the deposit, maintenance, liability for damage, and return rules are recorded in the agreement.',
      },
      {
        title: 'Rent-to-own car',
        text:
          'The model, initial payment, weekly payment, total amount, and term are agreed individually. Every payment defined as a buyout payment in the agreement counts towards the vehicle price.',
      },
    ],
    processTitle: 'Verification and onboarding process',
    steps: [
      {
        title: 'Application',
        text: 'Provide the city, contact details, and information about your own vehicle.',
      },
      {
        title: 'Document review',
        text: 'A manager checks the set and explains missing steps and available platforms.',
      },
      {
        title: 'Vehicle and agreement',
        text: 'Choose your own car, rental, or rent-to-own and review every payment and responsibility.',
      },
      {
        title: 'Activation',
        text: 'Once originals, accounts, and the vehicle are verified, you can begin accepting trips.',
      },
    ],
    checklistTitle: 'What to check before signing',
    checklist: [
      'The complete list of charges, deposit, and settlement frequency.',
      'Who pays for maintenance, repairs, tyres, insurance, and downtime.',
      'Liability for damage and any insurance excess.',
      'Rules for changing or returning the vehicle and ending cooperation.',
      'Which platforms and work zones will be activated.',
      'Which individual terms must be written into the agreement.',
    ],
    faqTitle: 'Frequently asked questions about documents',
    faq: [
      {
        q: 'Can I start without my own car?',
        a: 'Yes. You can choose a prepared Vonco Partners car. A manager confirms current vehicle availability and terms.',
      },
      {
        q: 'Is a foreign driving licence accepted?',
        a: 'Requirements depend on current law and the platform. Uber and Bolt publish Polish driving-licence requirements, so the document must be checked before registration.',
      },
      {
        q: 'Is a criminal record certificate required?',
        a: 'Yes. It is part of the standard driver verification set. Platforms commonly require a document issued within the previous 30 days.',
      },
      {
        q: 'How long does the application review take?',
        a: 'Vonco Partners replies as quickly as possible, usually within a few hours. The complete onboarding time depends on the documents, vehicle, and platform verification.',
      },
    ],
    sourcesTitle: 'Official sources',
    disclaimer:
      'This guide is for information only. Platform, municipal, and legal requirements may change. Before registration, a manager checks the current set for the specific driver, city, and vehicle.',
    ctaTitle: 'Check your documents before starting',
    ctaText:
      'Send an application to a Vonco Partners manager. We will review your situation, city, and preferred vehicle format.',
    ctaPrimary: 'Send an application',
    ctaSecondary: 'Choose a vehicle',
  },
};

export function isDocumentGuideLocale(
  locale: string,
): locale is DocumentGuideLocale {
  return DOCUMENT_GUIDE_LOCALES.some((candidate) => candidate === locale);
}

export function getDocumentGuideContent(locale: string) {
  return isDocumentGuideLocale(locale) ? CONTENT[locale] : null;
}
