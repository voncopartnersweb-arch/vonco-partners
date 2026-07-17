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
      'Водій отримує підготовлений автомобіль і сплачує погоджену тижневу орендну плату. Планове технічне обслуговування та ремонт автомобіля виконує компанія відповідно до умов договору оренди.',
    buyoutTitle: 'Авто під виплату',
    buyoutText:
      'Водій обирає автомобіль і погоджує з компанією загальну суму викупу, можливий перший внесок та розмір тижневого платежу. Платежі, визначені як викупні, у повному обсязі зараховуються в погоджену вартість автомобіля.',
    processTitle: 'Як працює програма викупу',
    steps: [
      { title: 'Консультація', text: 'Уточнюємо досвід водія, місто роботи, бюджет і бажаний автомобіль.' },
      { title: 'Індивідуальні умови', text: 'Погоджуємо суму викупу, перший внесок за його наявності, тижневий платіж і строк програми.' },
      { title: 'Письмовий договір', text: 'Фіксуємо графік платежів, відповідальність сторін, правила користування авто та умови дострокового припинення.' },
      { title: 'Робота й виплати', text: 'Водій працює на автомобілі та регулярно сплачує погоджені платежі, які зараховуються у вартість викупу.' },
      { title: 'Перехід у власність', text: 'Після повного виконання договору сторони оформлюють передачу автомобіля у власність водія.' },
    ],
    paymentsTitle: 'Перший внесок і тижневі платежі',
    paymentsText:
      'Розмір першого внеску не є однаковим для всіх. Програма може передбачати стартовий платіж або бути доступною без нього для водіїв, які вже тривалий час успішно співпрацюють із Vonco Partners. Остаточне рішення та графік завжди фіксуються в індивідуальному договорі.',
    costsTitle: 'Хто відповідає за автомобіль',
    rentalCostsTitle: 'За звичайної оренди',
    rentalCostsText:
      'Компанія організовує ремонт і планове технічне обслуговування автомобіля в межах договору. Водій відповідає за належне користування авто та повідомлення про несправності або пошкодження.',
    buyoutCostsTitle: 'У програмі викупу',
    buyoutCostsText:
      'Поточне обслуговування, експлуатаційні витрати та ремонт автомобіля здійснює водій власним коштом. Точний перелік витрат, страхування та дій у разі пошкодження визначається договором.',
    contractTitle: 'Що обов’язково фіксується в договорі',
    contractText:
      'До початку програми водій отримує зрозумілі письмові умови. Усні домовленості не замінюють підписаний договір.',
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
      'Інформація на сторінці описує загальну модель співпраці та не є публічною офертою. Ціна автомобіля, внесок, платежі, строк, витрати й порядок переходу права власності визначаються лише підписаним договором.',
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
      'Kierowca otrzymuje przygotowany samochód i opłaca ustaloną stawkę tygodniową. Planowy serwis techniczny i naprawy realizuje firma zgodnie z warunkami umowy najmu.',
    buyoutTitle: 'Wynajem z wykupem',
    buyoutText:
      'Kierowca wybiera samochód i uzgadnia z firmą łączną cenę wykupu, ewentualną wpłatę początkową oraz wysokość raty tygodniowej. Płatności określone w umowie jako wykupowe są w całości zaliczane na uzgodnioną cenę pojazdu.',
    processTitle: 'Jak działa program wykupu',
    steps: [
      { title: 'Konsultacja', text: 'Ustalamy doświadczenie kierowcy, miasto pracy, budżet i preferowany samochód.' },
      { title: 'Warunki indywidualne', text: 'Uzgadniamy cenę wykupu, wpłatę początkową, ratę tygodniową i czas trwania programu.' },
      { title: 'Umowa pisemna', text: 'Zapisujemy harmonogram, odpowiedzialność stron, zasady użytkowania i warunki wcześniejszego zakończenia.' },
      { title: 'Praca i spłata', text: 'Kierowca pracuje na samochodzie i regularnie wnosi płatności zaliczane na poczet wykupu.' },
      { title: 'Przeniesienie własności', text: 'Po wykonaniu całej umowy strony formalnie przenoszą samochód na kierowcę.' },
    ],
    paymentsTitle: 'Wpłata początkowa i raty tygodniowe',
    paymentsText:
      'Wpłata początkowa nie jest jednakowa dla wszystkich. Program może ją przewidywać albo, w przypadku kierowców z dłuższą i dobrą historią współpracy z Vonco Partners, zostać uzgodniony bez niej. Ostateczną decyzję i harmonogram zawsze określa indywidualna umowa.',
    costsTitle: 'Odpowiedzialność za samochód',
    rentalCostsTitle: 'Przy zwykłym wynajmie',
    rentalCostsText:
      'Firma organizuje naprawy i planowe przeglądy w zakresie określonym umową. Kierowca odpowiada za prawidłowe użytkowanie pojazdu oraz zgłaszanie usterek i szkód.',
    buyoutCostsTitle: 'W programie wykupu',
    buyoutCostsText:
      'Bieżący serwis, koszty eksploatacyjne i naprawy kierowca pokrywa samodzielnie. Dokładny zakres kosztów, ubezpieczenia i postępowania w razie szkody określa umowa.',
    contractTitle: 'Co zapisujemy w umowie',
    contractText:
      'Przed rozpoczęciem programu kierowca otrzymuje jasne warunki na piśmie. Ustalenia ustne nie zastępują podpisanej umowy.',
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
      'Treść strony opisuje ogólny model współpracy i nie stanowi oferty w rozumieniu prawa. Cena auta, wpłata, raty, okres, koszty i przeniesienie własności wynikają wyłącznie z podpisanej umowy.',
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
      'The driver receives a taxi-ready vehicle and pays an agreed weekly rental charge. The company handles scheduled maintenance and repairs within the scope of the rental agreement.',
    buyoutTitle: 'Rent to own',
    buyoutText:
      'The driver selects a vehicle and agrees the total purchase amount, any initial payment and the weekly instalment. Payments identified in the agreement as purchase payments are credited in full towards the agreed vehicle price.',
    processTitle: 'How the buyout programme works',
    steps: [
      { title: 'Consultation', text: 'We discuss your experience, working city, budget and preferred vehicle.' },
      { title: 'Individual terms', text: 'We agree the purchase amount, initial payment, weekly instalment and programme length.' },
      { title: 'Written agreement', text: 'The schedule, responsibilities, vehicle-use rules and early-termination terms are recorded in writing.' },
      { title: 'Work and payments', text: 'You work with the vehicle and make regular payments credited towards the buyout.' },
      { title: 'Ownership transfer', text: 'After the agreement is fully completed, the parties formally transfer the vehicle to the driver.' },
    ],
    paymentsTitle: 'Initial payment and weekly instalments',
    paymentsText:
      'The initial payment is not the same for every driver. It may be required, or the programme may be agreed without one for drivers with a longer and reliable history with Vonco Partners. The final decision and schedule are always written into the individual agreement.',
    costsTitle: 'Who is responsible for the car',
    rentalCostsTitle: 'Standard rental',
    rentalCostsText:
      'The company arranges repairs and scheduled maintenance within the agreement. The driver is responsible for proper use and for reporting faults or damage.',
    buyoutCostsTitle: 'Rent-to-own programme',
    buyoutCostsText:
      'The driver covers routine servicing, running costs and repairs. The exact allocation of costs, insurance and damage procedures is defined in the agreement.',
    contractTitle: 'What the agreement must contain',
    contractText:
      'Before the programme starts, the driver receives clear written terms. Verbal arrangements do not replace the signed agreement.',
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
      'This page describes the general cooperation model and is not a binding offer. Vehicle price, initial payment, instalments, term, costs and ownership transfer are governed solely by the signed agreement.',
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
      'Водитель получает подготовленный автомобиль и оплачивает согласованную недельную аренду. Плановое обслуживание и ремонт выполняет компания в пределах договора аренды.',
    buyoutTitle: 'Авто под выплату',
    buyoutText:
      'Водитель выбирает автомобиль и согласовывает общую сумму выкупа, возможный первоначальный взнос и недельный платёж. Платежи, указанные в договоре как выкупные, полностью засчитываются в согласованную стоимость автомобиля.',
    processTitle: 'Как работает программа выкупа',
    steps: [
      { title: 'Консультация', text: 'Уточняем опыт, город работы, бюджет и желаемый автомобиль.' },
      { title: 'Индивидуальные условия', text: 'Согласовываем сумму выкупа, первый взнос, недельный платёж и срок.' },
      { title: 'Письменный договор', text: 'Фиксируем график, ответственность, правила пользования и досрочного прекращения.' },
      { title: 'Работа и выплаты', text: 'Водитель работает на авто и регулярно вносит платежи, засчитываемые в выкуп.' },
      { title: 'Переход в собственность', text: 'После выполнения договора стороны оформляют передачу автомобиля водителю.' },
    ],
    paymentsTitle: 'Первый взнос и недельные платежи',
    paymentsText:
      'Первоначальный взнос не одинаков для всех. Он может быть предусмотрен либо отменён для водителей с длительной и надёжной историей сотрудничества с Vonco Partners. Окончательное решение и график всегда закрепляются индивидуальным договором.',
    costsTitle: 'Ответственность за автомобиль',
    rentalCostsTitle: 'При обычной аренде',
    rentalCostsText:
      'Компания организует ремонт и плановое обслуживание в рамках договора. Водитель отвечает за правильную эксплуатацию и сообщение о неисправностях или повреждениях.',
    buyoutCostsTitle: 'В программе выкупа',
    buyoutCostsText:
      'Текущее обслуживание, эксплуатационные расходы и ремонт водитель оплачивает самостоятельно. Точный перечень расходов, страхование и действия при повреждении определяет договор.',
    contractTitle: 'Что фиксируется в договоре',
    contractText:
      'До начала программы водитель получает понятные письменные условия. Устные договорённости не заменяют подписанный договор.',
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
      'Страница описывает общую модель сотрудничества и не является публичной офертой. Цена, взнос, платежи, срок, расходы и переход собственности определяются только подписанным договором.',
  },
};

export function getBuyoutContent(locale: string): BuyoutContent | undefined {
  return content[locale as SupportedLocale];
}
