import type { SupportedLocale } from '@/lib/seo';

export type BuyoutContent = {
  seoTitle: string;
  seoDescription: string;
  badge: string;
  title: string;
  lead: string;
  modelsTitle: string;
  modelsIntro: string;
  ownCarTitle: string;
  ownCarText: string;
  rentalTitle: string;
  rentalText: string;
  buyoutTitle: string;
  buyoutText: string;
  processTitle: string;
  steps: { title: string; text: string }[];
  paymentsTitle: string;
  paymentsText: string;
  costsTitle: string;
  rentalCostsTitle: string;
  rentalCostsText: string;
  buyoutCostsTitle: string;
  buyoutCostsText: string;
  contractTitle: string;
  contractText: string;
  contractPoints: string[];
  ctaTitle: string;
  ctaText: string;
  disclaimer: string;
};

const content: Partial<Record<SupportedLocale, BuyoutContent>> = {
  uk: {
    seoTitle: 'Авто під виплату для таксі в Польщі',
    seoDescription:
      'Власне авто, оренда автомобіля або авто під виплату у Vonco Partners. Індивідуальні тижневі платежі, прозорий договір і перехід авто у власність після повного розрахунку.',
    badge: 'Три формати співпраці',
    title: 'Від роботи в таксі — до власного автомобіля',
    lead:
      'Vonco Partners пропонує водіям три варіанти співпраці: роботу на власному автомобілі, оренду підготовленого авто компанії або програму поступового викупу. Формат підбирається індивідуально з урахуванням досвіду водія, доступного автомобіля та погодженого фінансового плану.',
    modelsTitle: 'Оберіть зручний формат',
    modelsIntro:
      'Кожна модель має різний розподіл витрат і відповідальності. Менеджер пояснює умови до підписання договору.',
    ownCarTitle: 'Робота на власному авто',
    ownCarText:
      'Водій використовує власний автомобіль, а компанія допомагає підготувати документи, необхідні для легальної роботи в таксі, зокрема оформлення автомобіля в межах ліцензії партнера та підключення до доступних платформ.',
    rentalTitle: 'Оренда авто компанії',
    rentalText:
      'Водій отримує підготовлений автомобіль і сплачує погоджену тижневу орендну плату. Застава дорівнює вартості одного тижня оренди, мінімальний строк становить один місяць, а про повернення авто потрібно повідомити щонайменше за два тижні.',
    buyoutTitle: 'Авто під виплату',
    buyoutText:
      'Водій обирає автомобіль і погоджує з менеджером індивідуальну суму викупу, можливий перший внесок, тижневий платіж і строк. Усі платежі, визначені договором як викупні, у повному обсязі зараховуються в погоджену вартість автомобіля.',
    processTitle: 'Як працює програма викупу',
    steps: [
      { title: 'Консультація', text: 'Уточнюємо досвід водія, місто роботи, бюджет і бажаний автомобіль.' },
      { title: 'Індивідуальні умови', text: 'Менеджер розраховує суму викупу, перший внесок за його наявності, тижневий платіж і строк для конкретного авто.' },
      { title: 'Письмовий договір', text: 'Фіксуємо погоджені платежі, відповідальність сторін, правила користування авто та індивідуальні умови дострокового припинення.' },
      { title: 'Робота й виплати', text: 'Водій працює на автомобілі та регулярно сплачує погоджені платежі, які зараховуються у вартість викупу.' },
      { title: 'Перехід у власність', text: 'Після повного виконання договору сторони оформлюють передачу автомобіля у власність водія.' },
    ],
    paymentsTitle: 'Перший внесок і тижневі платежі',
    paymentsText:
      'Єдиної публічної суми та стандартного графіка немає: вони залежать від конкретного авто, першого внеску й погодженого тижневого платежу. Програма може передбачати стартовий платіж або бути доступною без нього для водіїв із тривалою успішною співпрацею. Менеджер розраховує умови індивідуально, після чого вони фіксуються в договорі.',
    costsTitle: 'Хто відповідає за автомобіль',
    rentalCostsTitle: 'За звичайної оренди',
    rentalCostsText:
      'Власник автомобіля організовує передбачені договором ремонт і планове технічне обслуговування. Водій відповідає за належне користування, нові пошкодження, пошкодження шин, погоджені витратні матеріали та збереження технічного й візуального стану авто.',
    buyoutCostsTitle: 'У програмі викупу',
    buyoutCostsText:
      'Поточне обслуговування, експлуатаційні витрати та ремонт автомобіля здійснює водій власним коштом. Точний перелік витрат, страхування та дій у разі пошкодження визначається договором.',
    contractTitle: 'Що обов’язково фіксується в договорі',
    contractText:
      'До початку програми водій отримує письмові умови. Можливість зміни автомобіля, дострокового завершення або окремої конфігурації акаунта Bolt обговорюється з менеджером індивідуально та, коли це стосується договору, фіксується письмово.',
    contractPoints: [
      'автомобіль, його стан і погоджена загальна сума викупу;',
      'перший внесок, розмір і графік тижневих платежів;',
      'які платежі зараховуються у вартість автомобіля;',
      'розподіл витрат на сервіс, ремонт, страхування та експлуатацію;',
      'умови завершення програми, дострокового припинення та передачі права власності.',
    ],
    ctaTitle: 'Хочете підібрати автомобіль і розрахувати умови?',
    ctaText:
      'Залиште заявку. Менеджер перевірить доступні авто та підготує індивідуальний варіант оренди або викупу.',
    disclaimer:
      'Інформація на сторінці описує загальну модель співпраці та не є публічною офертою. Для програми викупу немає єдиного публічного графіка: ціна автомобіля, внесок, платежі, строк, дострокове завершення, витрати й порядок переходу права власності погоджуються з менеджером і визначаються підписаним договором.',
  },
  pl: {
    seoTitle: 'Auto na wykup do taxi w Polsce',
    seoDescription:
      'Własne auto, wynajem samochodu lub auto na wykup w Vonco Partners. Indywidualne raty tygodniowe, przejrzysta umowa i przeniesienie własności po pełnym rozliczeniu.',
    badge: 'Trzy modele współpracy',
    title: 'Od pracy w taxi do własnego samochodu',
    lead:
      'Vonco Partners oferuje kierowcom trzy modele współpracy: pracę na własnym samochodzie, wynajem przygotowanego auta firmowego albo program stopniowego wykupu. Rozwiązanie dobieramy indywidualnie do doświadczenia kierowcy, dostępnego pojazdu i uzgodnionego planu finansowego.',
    modelsTitle: 'Wybierz odpowiedni model',
    modelsIntro:
      'Każdy wariant inaczej rozdziela koszty i odpowiedzialność. Manager przedstawia szczegóły przed podpisaniem umowy.',
    ownCarTitle: 'Praca na własnym aucie',
    ownCarText:
      'Kierowca korzysta z własnego samochodu, a firma pomaga przygotować dokumenty potrzebne do legalnej pracy w taxi, w tym objąć pojazd licencją partnera i podłączyć go do dostępnych platform.',
    rentalTitle: 'Wynajem auta firmowego',
    rentalText:
      'Kierowca otrzymuje przygotowany samochód i opłaca ustaloną stawkę tygodniową. Kaucja odpowiada cenie jednego tygodnia wynajmu, minimalny okres wynosi miesiąc, a zwrot auta należy zgłosić co najmniej dwa tygodnie wcześniej.',
    buyoutTitle: 'Wynajem z wykupem',
    buyoutText:
      'Kierowca wybiera samochód i uzgadnia z managerem indywidualną cenę wykupu, ewentualną wpłatę początkową, ratę tygodniową oraz okres programu. Wszystkie płatności określone w umowie jako wykupowe są w całości zaliczane na uzgodnioną cenę pojazdu.',
    processTitle: 'Jak działa program wykupu',
    steps: [
      { title: 'Konsultacja', text: 'Ustalamy doświadczenie kierowcy, miasto pracy, budżet i preferowany samochód.' },
      { title: 'Warunki indywidualne', text: 'Manager wylicza cenę wykupu, ewentualną wpłatę początkową, ratę tygodniową i okres dla konkretnego auta.' },
      { title: 'Umowa pisemna', text: 'Zapisujemy uzgodnione wpłaty, odpowiedzialność stron, zasady użytkowania i indywidualne warunki wcześniejszego zakończenia.' },
      { title: 'Praca i spłata', text: 'Kierowca pracuje na samochodzie i regularnie wnosi płatności zaliczane na poczet wykupu.' },
      { title: 'Przeniesienie własności', text: 'Po wykonaniu całej umowy strony formalnie przenoszą samochód na kierowcę.' },
    ],
    paymentsTitle: 'Wpłata początkowa i raty tygodniowe',
    paymentsText:
      'Nie ma jednej publicznej ceny ani standardowego harmonogramu: zależą one od konkretnego auta, wpłaty początkowej i uzgodnionej raty tygodniowej. Program może wymagać wpłaty albo zostać uzgodniony bez niej dla kierowców z dłuższą, rzetelną historią współpracy. Manager wylicza warunki indywidualnie, a następnie są one zapisywane w umowie.',
    costsTitle: 'Odpowiedzialność za samochód',
    rentalCostsTitle: 'Przy zwykłym wynajmie',
    rentalCostsText:
      'Właściciel auta organizuje naprawy i planowe przeglądy przewidziane umową. Kierowca odpowiada za prawidłowe użytkowanie, nowe szkody, uszkodzenia opon, uzgodnione materiały eksploatacyjne oraz zachowanie właściwego stanu technicznego i wizualnego auta.',
    buyoutCostsTitle: 'W programie wykupu',
    buyoutCostsText:
      'Bieżący serwis, koszty eksploatacyjne i naprawy kierowca pokrywa samodzielnie. Dokładny zakres kosztów, ubezpieczenia i postępowania w razie szkody określa umowa.',
    contractTitle: 'Co zapisujemy w umowie',
    contractText:
      'Przed rozpoczęciem programu kierowca otrzymuje warunki pisemne. Zmiana auta, wcześniejsze zakończenie lub osobna konfiguracja konta Bolt są omawiane indywidualnie z managerem i — gdy dotyczą umowy — zapisywane na piśmie.',
    contractPoints: [
      'samochód, jego stan oraz uzgodniona całkowita cena wykupu;',
      'wpłata początkowa, wysokość i harmonogram rat tygodniowych;',
      'płatności zaliczane na poczet ceny samochodu;',
      'podział kosztów serwisu, napraw, ubezpieczenia i eksploatacji;',
      'zasady zakończenia programu, wcześniejszego rozwiązania i przeniesienia własności.',
    ],
    ctaTitle: 'Chcesz dobrać auto i poznać indywidualne warunki?',
    ctaText:
      'Wyślij zgłoszenie. Manager sprawdzi dostępne samochody i przygotuje wariant wynajmu lub wykupu.',
    disclaimer:
      'Treść strony opisuje ogólny model współpracy i nie stanowi oferty w rozumieniu prawa. Program nie ma jednego publicznego harmonogramu: cena auta, wpłata, raty, okres, wcześniejsze zakończenie, koszty i przeniesienie własności są uzgadniane z managerem i wynikają z podpisanej umowy.',
  },
  en: {
    seoTitle: 'Rent-to-own taxi cars in Poland',
    seoDescription:
      'Use your own car, rent a fleet car or choose a rent-to-own vehicle with Vonco Partners. Individual weekly payments and ownership transfer after the agreement is completed.',
    badge: 'Three cooperation models',
    title: 'Turn your taxi work into car ownership',
    lead:
      'Vonco Partners offers three ways to cooperate: drive your own car, rent a taxi-ready company vehicle, or enter an individual rent-to-own programme. The model is selected according to the driver’s experience, available vehicle and agreed financial plan.',
    modelsTitle: 'Choose the right model',
    modelsIntro:
      'Each option assigns costs and responsibilities differently. A manager explains the details before any agreement is signed.',
    ownCarTitle: 'Drive your own car',
    ownCarText:
      'The driver uses their own vehicle, while the company helps prepare the documents required for lawful taxi work, including placing the vehicle under the partner’s taxi licence and connecting it to available platforms.',
    rentalTitle: 'Rent a company car',
    rentalText:
      'The driver receives a taxi-ready vehicle and pays an agreed weekly rental charge. The deposit equals one week of rent, the minimum term is one month, and vehicle return must be reported at least two weeks in advance.',
    buyoutTitle: 'Rent to own',
    buyoutText:
      'The driver selects a vehicle and agrees an individual purchase amount, any initial payment, weekly instalment, and programme term with a manager. Every payment identified in the agreement as a purchase payment is credited in full towards the agreed vehicle price.',
    processTitle: 'How the buyout programme works',
    steps: [
      { title: 'Consultation', text: 'We discuss your experience, working city, budget and preferred vehicle.' },
      { title: 'Individual terms', text: 'A manager calculates the purchase amount, any initial payment, weekly instalment, and term for the specific vehicle.' },
      { title: 'Written agreement', text: 'The agreed payments, responsibilities, vehicle-use rules, and individual early-termination terms are recorded in writing.' },
      { title: 'Work and payments', text: 'You work with the vehicle and make regular payments credited towards the buyout.' },
      { title: 'Ownership transfer', text: 'After the agreement is fully completed, the parties formally transfer the vehicle to the driver.' },
    ],
    paymentsTitle: 'Initial payment and weekly instalments',
    paymentsText:
      'There is no single public total or standard schedule: the terms depend on the specific car, initial payment, and agreed weekly instalment. The programme may require an initial payment or be agreed without one for drivers with a longer, reliable cooperation history. A manager calculates the terms individually and records them in the agreement.',
    costsTitle: 'Who is responsible for the car',
    rentalCostsTitle: 'Standard rental',
    rentalCostsText:
      'The vehicle owner arranges repairs and scheduled maintenance covered by the agreement. The driver is responsible for proper use, new damage, tyre damage, agreed consumables, and maintaining the vehicle’s technical and visual condition.',
    buyoutCostsTitle: 'Rent-to-own programme',
    buyoutCostsText:
      'The driver covers routine servicing, running costs and repairs. The exact allocation of costs, insurance and damage procedures is defined in the agreement.',
    contractTitle: 'What the agreement must contain',
    contractText:
      'Before the programme starts, the driver receives written terms. Changing the vehicle, ending the agreement early, or setting up a separate Bolt account is discussed individually with a manager and recorded in writing when it affects the agreement.',
    contractPoints: [
      'the vehicle, its condition and the agreed total purchase amount;',
      'the initial payment and weekly payment schedule;',
      'which payments are credited towards the vehicle price;',
      'responsibility for maintenance, repairs, insurance and running costs;',
      'completion, early termination and ownership-transfer rules.',
    ],
    ctaTitle: 'Want to select a car and calculate your terms?',
    ctaText:
      'Send an enquiry. A manager will check available vehicles and prepare an individual rental or buyout option.',
    disclaimer:
      'This page describes the general cooperation model and is not a binding offer. There is no single public payment schedule: the vehicle price, initial payment, instalments, term, early termination, costs, and ownership transfer are agreed with a manager and governed by the signed agreement.',
  },
  ru: {
    seoTitle: 'Авто под выплату для такси в Польше',
    seoDescription:
      'Собственный автомобиль, аренда или авто под выплату в Vonco Partners. Индивидуальные еженедельные платежи и переход права собственности после выполнения договора.',
    badge: 'Три формата сотрудничества',
    title: 'От работы в такси — к собственному автомобилю',
    lead:
      'Vonco Partners предлагает три модели сотрудничества: работу на собственном автомобиле, аренду подготовленного авто компании или индивидуальную программу постепенного выкупа. Формат подбирается с учётом опыта водителя, доступного автомобиля и согласованного финансового плана.',
    modelsTitle: 'Выберите подходящий формат',
    modelsIntro:
      'В каждом варианте расходы и ответственность распределяются по-разному. Менеджер разъясняет условия до подписания договора.',
    ownCarTitle: 'Работа на собственном авто',
    ownCarText:
      'Водитель использует свой автомобиль, а компания помогает подготовить документы для легальной работы в такси, включая оформление автомобиля в рамках лицензии партнёра и подключение к доступным платформам.',
    rentalTitle: 'Аренда авто компании',
    rentalText:
      'Водитель получает подготовленный автомобиль и оплачивает согласованную недельную аренду. Залог равен стоимости одной недели аренды, минимальный срок составляет один месяц, а о возврате авто нужно предупредить минимум за две недели.',
    buyoutTitle: 'Авто под выплату',
    buyoutText:
      'Водитель выбирает автомобиль и согласовывает с менеджером индивидуальную сумму выкупа, возможный первоначальный взнос, недельный платёж и срок. Все платежи, указанные в договоре как выкупные, полностью засчитываются в согласованную стоимость автомобиля.',
    processTitle: 'Как работает программа выкупа',
    steps: [
      { title: 'Консультация', text: 'Уточняем опыт, город работы, бюджет и желаемый автомобиль.' },
      { title: 'Индивидуальные условия', text: 'Менеджер рассчитывает сумму выкупа, возможный первый взнос, недельный платёж и срок для конкретного авто.' },
      { title: 'Письменный договор', text: 'Фиксируем согласованные платежи, ответственность, правила пользования и индивидуальные условия досрочного прекращения.' },
      { title: 'Работа и выплаты', text: 'Водитель работает на авто и регулярно вносит платежи, засчитываемые в выкуп.' },
      { title: 'Переход в собственность', text: 'После выполнения договора стороны оформляют передачу автомобиля водителю.' },
    ],
    paymentsTitle: 'Первый взнос и недельные платежи',
    paymentsText:
      'Единой публичной суммы и стандартного графика нет: условия зависят от конкретного автомобиля, первого взноса и согласованного недельного платежа. Взнос может быть обязательным или программа может быть согласована без него для водителей с длительной надёжной историей сотрудничества. Менеджер рассчитывает условия индивидуально и фиксирует их в договоре.',
    costsTitle: 'Ответственность за автомобиль',
    rentalCostsTitle: 'При обычной аренде',
    rentalCostsText:
      'Владелец автомобиля организует предусмотренные договором ремонт и плановое обслуживание. Водитель отвечает за правильную эксплуатацию, новые повреждения, повреждение шин, согласованные расходные материалы и сохранение технического и визуального состояния авто.',
    buyoutCostsTitle: 'В программе выкупа',
    buyoutCostsText:
      'Текущее обслуживание, эксплуатационные расходы и ремонт водитель оплачивает самостоятельно. Точный перечень расходов, страхование и действия при повреждении определяет договор.',
    contractTitle: 'Что фиксируется в договоре',
    contractText:
      'До начала программы водитель получает письменные условия. Замена автомобиля, досрочное завершение или отдельная конфигурация аккаунта Bolt обсуждаются с менеджером индивидуально и, если относятся к договору, фиксируются письменно.',
    contractPoints: [
      'автомобиль, его состояние и общая сумма выкупа;',
      'первоначальный взнос и график недельных платежей;',
      'платежи, засчитываемые в стоимость автомобиля;',
      'расходы на сервис, ремонт, страхование и эксплуатацию;',
      'завершение программы, досрочное прекращение и передача собственности.',
    ],
    ctaTitle: 'Хотите подобрать автомобиль и рассчитать условия?',
    ctaText:
      'Оставьте заявку. Менеджер проверит доступные авто и подготовит индивидуальный вариант аренды или выкупа.',
    disclaimer:
      'Страница описывает общую модель сотрудничества и не является публичной офертой. Единого публичного графика нет: цена, взнос, платежи, срок, досрочное завершение, расходы и переход собственности согласовываются с менеджером и определяются подписанным договором.',
  },
};

export function getBuyoutContent(locale: string): BuyoutContent | undefined {
  return content[locale as SupportedLocale];
}
