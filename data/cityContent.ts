type CityContent = {
  name: string;
  inCity: string;
  demandText: string;
  hotspots: string;
  districts: string;
  fleetFocus: string;
  seoText: string;
  earningsText: string;
  platformRulesTitle?: string;
  platformRules?: string[];
};

type LocalizedCityContent = Partial<Record<string, CityContent>>;

const bielskoBiala: LocalizedCityContent = {
  pl: {
    name: 'Bielsko-Biała',
    inCity: 'w Bielsku-Białej',
    demandText: 'Bielsko-Biała łączy regularne przejazdy miejskie z ruchem między dzielnicami, dworcem kolejowym i autobusowym oraz miejscami handlowymi i usługowymi.',
    hotspots: 'Bielsko-Biała Główna, centrum miasta, okolice Sfery i główne węzły przesiadkowe',
    districts: 'Śródmieście, Aleksandrowice, Kamienica, Mikuszowice i trasy łączące miasto z regionem',
    fleetFocus: 'Ekonomiczne auta benzynowe z LPG i hybrydy do regularnej jazdy miejskiej; komfortowe sedany na dłuższe kursy',
    seoText: 'Praca kierowcy taxi w Bielsku-Białej wymaga elastycznego planowania godzin. Popyt tworzą codzienne dojazdy mieszkańców, połączenia z dworcami, lokalne wydarzenia, zakupy i przejazdy między dzielnicami. Vonco Partners pomaga dobrać samochód, przygotować dokumenty i rozpocząć pracę z Uber, Bolt lub Free Now. Strona nie obiecuje stałej liczby zleceń: dostępność platform, auta i warunki współpracy należy potwierdzić z managerem przed rozpoczęciem pracy.',
    earningsText: 'Dochód zależy od liczby godzin online, pory dnia, sezonu, wybranych aplikacji, kosztów paliwa oraz modelu najmu. Manager pomaga porównać dostępne formaty na podstawie aktualnych warunków.',
  },
  en: {
    name: 'Bielsko-Biała',
    inCity: 'in Bielsko-Biała',
    demandText: 'Bielsko-Biała combines regular urban trips with journeys between residential districts, railway and bus stations, shopping areas, and local services.',
    hotspots: 'Bielsko-Biała Główna, the city centre, the Sfera area, and main transport interchanges',
    districts: 'Śródmieście, Aleksandrowice, Kamienica, Mikuszowice, and routes connecting the city with the surrounding region',
    fleetFocus: 'Economical petrol/LPG cars and hybrids for regular city driving, plus comfortable sedans for longer trips',
    seoText: 'Taxi work in Bielsko-Biała requires a flexible schedule. Demand comes from everyday commuting, station transfers, local events, shopping trips, and travel between districts. Vonco Partners helps drivers choose a suitable car, prepare documents, and start working with Uber, Bolt, or Free Now. The page does not promise a fixed number of trips: platform availability, vehicle availability, and cooperation terms must be confirmed with a manager before starting.',
    earningsText: 'Income depends on online hours, time of day, season, selected applications, fuel costs, and the rental model. A manager can compare the currently available options with the driver.',
  },
  uk: {
    name: 'Бельсько-Бяла',
    inCity: 'у Бельсько-Бялій',
    demandText: 'Бельсько-Бяла поєднує регулярні міські поїздки з маршрутами між житловими районами, залізничним та автобусним вокзалами, торговими й сервісними локаціями.',
    hotspots: 'Bielsko-Biała Główna, центр міста, район Sfera та основні транспортні вузли',
    districts: 'Śródmieście, Aleksandrowice, Kamienica, Mikuszowice та маршрути між містом і навколишнім регіоном',
    fleetFocus: 'Економні бензинові авто з LPG і гібриди для міських поїздок, комфортні седани для довших маршрутів',
    seoText: 'Робота водієм таксі у Бельсько-Бялій потребує гнучкого планування графіка. Попит формують щоденні поїздки мешканців, трансфери до вокзалів, локальні події, покупки та маршрути між районами. Vonco Partners допомагає підібрати авто, підготувати документи й почати роботу з Uber, Bolt або Free Now. Сторінка не гарантує постійну кількість замовлень: доступність платформ, автомобілів та умови співпраці потрібно підтвердити з менеджером перед стартом.',
    earningsText: 'Дохід залежить від кількості годин онлайн, часу доби, сезону, вибраних застосунків, витрат на пальне та моделі оренди. Менеджер допоможе порівняти актуальні доступні формати.',
  },
  ru: {
    name: 'Бельско-Бяла',
    inCity: 'в Бельско-Бяле',
    demandText: 'Бельско-Бяла сочетает регулярные городские поездки с маршрутами между жилыми районами, железнодорожным и автобусным вокзалами, торговыми и сервисными локациями.',
    hotspots: 'Bielsko-Biała Główna, центр города, район Sfera и основные транспортные узлы',
    districts: 'Śródmieście, Aleksandrowice, Kamienica, Mikuszowice и маршруты между городом и окружающим регионом',
    fleetFocus: 'Экономичные бензиновые авто с LPG и гибриды для города, комфортные седаны для более длинных поездок',
    seoText: 'Работа водителем такси в Бельско-Бяле требует гибкого планирования графика. Спрос формируют ежедневные поездки жителей, трансферы к вокзалам, локальные события, покупки и маршруты между районами. Vonco Partners помогает подобрать автомобиль, подготовить документы и начать работу с Uber, Bolt или Free Now. Страница не гарантирует постоянное число заказов: доступность платформ, автомобилей и условия сотрудничества нужно подтвердить с менеджером перед стартом.',
    earningsText: 'Доход зависит от количества часов онлайн, времени суток, сезона, выбранных приложений, затрат на топливо и модели аренды. Менеджер поможет сравнить актуальные доступные форматы.',
  },
};

const gdynia: LocalizedCityContent = {
  pl: {
    name: 'Gdynia',
    inCity: 'w Gdyni',
    demandText: 'Gdynia generuje przejazdy związane z codziennymi dojazdami, dworcem Gdynia Główna, portem, centrum oraz ruchem między miastami Trójmiasta.',
    hotspots: 'Gdynia Główna, Śródmieście, port, Skwer Kościuszki i główne punkty przesiadkowe',
    districts: 'Śródmieście, Redłowo, Orłowo, Chylonia i trasy w kierunku Gdańska oraz Sopotu',
    fleetFocus: 'Ekonomiczne hybrydy do ruchu miejskiego i wygodne auta na dłuższe przejazdy w obrębie Trójmiasta',
    seoText: 'Praca taxi w Gdyni łączy przejazdy lokalne z ruchem w całym Trójmieście. Na popyt wpływają dojazdy do pracy, dworzec, port, wydarzenia, sezon turystyczny i wieczorne przejazdy między Gdynią, Sopotem i Gdańskiem. Vonco Partners pomaga dobrać auto, przygotować dokumenty i przejść proces podpięcia do platform. Aktualną dostępność Uber, Bolt, Free Now oraz samochodów należy potwierdzić z managerem.',
    earningsText: 'Dochód jest zmienny i zależy od grafiku, sezonu, ruchu w Trójmieście, wybranych aplikacji, prowizji oraz kosztów eksploatacji samochodu.',
  },
  en: {
    name: 'Gdynia',
    inCity: 'in Gdynia',
    demandText: 'Gdynia generates trips related to daily commuting, Gdynia Główna station, the port, the city centre, and movement between the cities of the Tricity area.',
    hotspots: 'Gdynia Główna, Śródmieście, the port, Skwer Kościuszki, and main transport interchanges',
    districts: 'Śródmieście, Redłowo, Orłowo, Chylonia, and routes towards Gdańsk and Sopot',
    fleetFocus: 'Economical hybrids for city traffic and comfortable cars for longer journeys across the Tricity area',
    seoText: 'Taxi work in Gdynia combines local trips with movement across the wider Tricity area. Demand is influenced by commuting, the railway station, the port, events, the tourist season, and evening travel between Gdynia, Sopot, and Gdańsk. Vonco Partners helps drivers choose a car, prepare documents, and complete platform onboarding. Current availability for Uber, Bolt, Free Now, and fleet cars must be confirmed with a manager.',
    earningsText: 'Income varies with the schedule, season, Tricity traffic, selected applications, platform fees, and the operating costs of the vehicle.',
  },
  uk: {
    name: 'Гдиня',
    inCity: 'у Гдині',
    demandText: 'У Гдині попит формують щоденні поїздки, вокзал Gdynia Główna, порт, центр міста та переміщення між містами Триміста.',
    hotspots: 'Gdynia Główna, Śródmieście, порт, Skwer Kościuszki та основні транспортні вузли',
    districts: 'Śródmieście, Redłowo, Orłowo, Chylonia та маршрути в напрямку Гданська й Сопота',
    fleetFocus: 'Економні гібриди для міського руху та комфортні авто для довших поїздок у межах Триміста',
    seoText: 'Робота в таксі у Гдині поєднує локальні поїздки з маршрутами по всьому Тримісту. На попит впливають поїздки на роботу, вокзал, порт, події, туристичний сезон і вечірні маршрути між Гдинею, Сопотом та Гданськом. Vonco Partners допомагає підібрати авто, підготувати документи й пройти підключення до платформ. Актуальну доступність Uber, Bolt, Free Now та автомобілів потрібно підтвердити з менеджером.',
    earningsText: 'Дохід змінюється залежно від графіка, сезону, трафіку в Тримісті, вибраних застосунків, комісій платформ і витрат на експлуатацію авто.',
  },
  ru: {
    name: 'Гдыня',
    inCity: 'в Гдыне',
    demandText: 'В Гдыне спрос формируют ежедневные поездки, вокзал Gdynia Główna, порт, центр города и перемещения между городами Труймяста.',
    hotspots: 'Gdynia Główna, Śródmieście, порт, Skwer Kościuszki и основные транспортные узлы',
    districts: 'Śródmieście, Redłowo, Orłowo, Chylonia и маршруты в направлении Гданьска и Сопота',
    fleetFocus: 'Экономичные гибриды для городского движения и комфортные авто для длинных поездок по Труймясту',
    seoText: 'Работа в такси в Гдыне сочетает локальные поездки с маршрутами по всему Труймясту. На спрос влияют поездки на работу, вокзал, порт, события, туристический сезон и вечерние маршруты между Гдыней, Сопотом и Гданьском. Vonco Partners помогает подобрать авто, подготовить документы и пройти подключение к платформам. Актуальную доступность Uber, Bolt, Free Now и автомобилей нужно подтвердить с менеджером.',
    earningsText: 'Доход меняется в зависимости от графика, сезона, трафика в Труймясте, выбранных приложений, комиссий платформ и расходов на эксплуатацию авто.',
  },
};

const oswiecim: LocalizedCityContent = {
  pl: {
    name: 'Oświęcim',
    inCity: 'w Oświęcimiu',
    demandText: 'Warunki współpracy i wynajmu samochodu są zasadniczo takie same jak w Krakowie. Oświęcim pozwala łączyć lokalne kursy z pracą w Krakowie i Zatorze, zależnie od wybranej platformy i konfiguracji konta.',
    hotspots: 'dworzec kolejowy, centrum, hotele, główne punkty usługowe i trasy w kierunku Krakowa oraz Zatora',
    districts: 'Centrum, Zasole, Stare Stawy oraz trasy łączące Oświęcim z regionem',
    fleetFocus: 'Ekonomiczne hybrydy i auta benzynowe z LPG odpowiednie do pracy lokalnej oraz dłuższych przejazdów między miastami',
    seoText: 'Vonco Partners stosuje w Oświęcimiu warunki współpracy zbliżone do krakowskich: pomaga dobrać samochód, przygotować dokumenty i rozpocząć pracę z aplikacjami taxi. Najważniejsza różnica dotyczy sposobu działania kont Bolt i Uber w poszczególnych miastach.',
    earningsText: 'Dochód zależy od liczby godzin online, pory dnia, sezonu, liczby kursów lokalnych i między miastami, kosztów paliwa oraz wybranej aplikacji. Przed startem manager potwierdza aktualną konfigurację konta i samochodu.',
    platformRulesTitle: 'Jak działają Bolt i Uber w Oświęcimiu, Krakowie, Zatorze i Zakopanem',
    platformRules: [
      'Bolt obsługuje Kraków, Oświęcim, Zator i Zakopane jako oddzielne obszary. Jedna konfiguracja aplikacji nie pozwala automatycznie pracować we wszystkich tych miastach.',
      'Aby łączyć pracę na przykład w Krakowie i Oświęcimiu, można przygotować oddzielną konfigurację Bolt na drugim telefonie i osobne konto dla drugiego obszaru. Szczegóły należy ustalić z managerem przed rejestracją.',
      'Uber działa w jednej aplikacji dla Krakowa, Oświęcimia i Zatora, dlatego kierowca może wygodnie łączyć pracę w tych miastach.',
      'Dla Zakopanego konto Uber trzeba przełączyć na właściwy obszar. Zmiana może potrwać do jednego dnia roboczego.',
    ],
  },
  en: {
    name: 'Oświęcim',
    inCity: 'in Oświęcim',
    demandText: 'Cooperation and car rental terms are generally the same as in Kraków. Depending on the platform and account setup, drivers can combine local trips in Oświęcim with work in Kraków and Zator.',
    hotspots: 'the railway station, city centre, hotels, main service areas, and routes towards Kraków and Zator',
    districts: 'Centrum, Zasole, Stare Stawy, and routes connecting Oświęcim with the surrounding region',
    fleetFocus: 'Economical hybrids and petrol/LPG cars suitable for local work and longer intercity journeys',
    seoText: 'Vonco Partners offers terms in Oświęcim similar to those in Kraków and helps drivers choose a car, prepare documents, and start working with taxi applications. The key difference is how Bolt and Uber accounts operate across individual cities.',
    earningsText: 'Income depends on online hours, time of day, season, local and intercity trip volume, fuel costs, and the selected application. A manager confirms the current account and vehicle setup before the driver starts.',
    platformRulesTitle: 'How Bolt and Uber work in Oświęcim, Kraków, Zator, and Zakopane',
    platformRules: [
      'Bolt treats Kraków, Oświęcim, Zator, and Zakopane as separate operating areas. One application setup does not automatically allow work across all four cities.',
      'To combine work in areas such as Kraków and Oświęcim, a separate Bolt setup on a second phone and a separate account for the other area can be prepared. The details should be agreed with a manager before registration.',
      'Uber uses one application for Kraków, Oświęcim, and Zator, making it convenient to combine work across these cities.',
      'For Zakopane, the Uber account must be switched to the relevant area. The change can take up to one business day.',
    ],
  },
  uk: {
    name: 'Освенцим',
    inCity: 'в Освенцимі',
    demandText: 'Умови співпраці й оренди автомобіля практично такі самі, як у Кракові. Залежно від платформи та налаштування акаунта водій може поєднувати локальні поїздки в Освенцимі з роботою у Кракові та Заторі.',
    hotspots: 'залізничний вокзал, центр міста, готелі, основні сервісні локації та маршрути в напрямку Кракова й Затора',
    districts: 'Centrum, Zasole, Stare Stawy та маршрути між Освенцимом і навколишнім регіоном',
    fleetFocus: 'Економні гібриди та бензинові авто з LPG для локальної роботи й довших міжміських поїздок',
    seoText: 'Vonco Partners пропонує в Освенцимі умови, подібні до краківських, допомагає підібрати автомобіль, підготувати документи та почати роботу з таксі-застосунками. Основна відмінність полягає в тому, як акаунти Bolt і Uber працюють у різних містах.',
    earningsText: 'Дохід залежить від кількості годин онлайн, часу доби, сезону, локальних і міжміських замовлень, витрат на пальне та вибраного застосунку. Перед початком роботи менеджер підтверджує актуальне налаштування акаунта й автомобіля.',
    platformRulesTitle: 'Як працюють Bolt і Uber в Освенцимі, Кракові, Заторі та Закопаному',
    platformRules: [
      'Bolt працює для Кракова, Освенцима, Затора й Закопаного як для окремих зон. Одна конфігурація застосунку не дозволяє автоматично працювати в усіх цих містах.',
      'Щоб поєднувати роботу, наприклад у Кракові та Освенцимі, можна підготувати окрему конфігурацію Bolt на другому телефоні та окремий акаунт для іншої зони. Деталі потрібно узгодити з менеджером до реєстрації.',
      'Uber працює в одному застосунку для Кракова, Освенцима й Затора, тому водієві зручно поєднувати роботу в цих містах.',
      'Для Закопаного акаунт Uber потрібно перемкнути на відповідну зону. Зміна може тривати до одного робочого дня.',
    ],
  },
  ru: {
    name: 'Освенцим',
    inCity: 'в Освенциме',
    demandText: 'Условия сотрудничества и аренды автомобиля практически такие же, как в Кракове. В зависимости от платформы и настройки аккаунта водитель может совмещать локальные поездки в Освенциме с работой в Кракове и Заторе.',
    hotspots: 'железнодорожный вокзал, центр города, отели, основные сервисные локации и маршруты в направлении Кракова и Затора',
    districts: 'Centrum, Zasole, Stare Stawy и маршруты между Освенцимом и окружающим регионом',
    fleetFocus: 'Экономичные гибриды и бензиновые авто с LPG для локальной работы и более длинных междугородних поездок',
    seoText: 'Vonco Partners предлагает в Освенциме условия, схожие с краковскими, помогает подобрать автомобиль, подготовить документы и начать работу с приложениями такси. Главное отличие состоит в том, как аккаунты Bolt и Uber работают в разных городах.',
    earningsText: 'Доход зависит от количества часов онлайн, времени суток, сезона, локальных и междугородних заказов, расходов на топливо и выбранного приложения. Перед началом работы менеджер подтверждает актуальную настройку аккаунта и автомобиля.',
    platformRulesTitle: 'Как работают Bolt и Uber в Освенциме, Кракове, Заторе и Закопане',
    platformRules: [
      'Bolt работает для Кракова, Освенцима, Затора и Закопане как для отдельных зон. Одна конфигурация приложения не позволяет автоматически работать во всех этих городах.',
      'Чтобы совмещать работу, например в Кракове и Освенциме, можно подготовить отдельную конфигурацию Bolt на втором телефоне и отдельный аккаунт для другой зоны. Детали нужно согласовать с менеджером до регистрации.',
      'Uber работает в одном приложении для Кракова, Освенцима и Затора, поэтому водителю удобно совмещать работу в этих городах.',
      'Для Закопане аккаунт Uber нужно переключить на соответствующую зону. Изменение может занять до одного рабочего дня.',
    ],
  },
};

const zator: LocalizedCityContent = {
  pl: {
    name: 'Zator',
    inCity: 'w Zatorze',
    demandText: 'Warunki współpracy i wynajmu samochodu są zasadniczo takie same jak w Krakowie. Zator ma bardziej sezonowy profil przejazdów, a wspólny obszar Uber ułatwia łączenie pracy z Krakowem i Oświęcimiem.',
    hotspots: 'centrum Zatora, okolice Energylandii, hotele, dworzec i trasy w kierunku Oświęcimia oraz Krakowa',
    districts: 'Zator i okoliczne miejscowości oraz trasy łączące miasto z Oświęcimiem i Krakowem',
    fleetFocus: 'Ekonomiczne auta do pracy lokalnej oraz wygodne samochody na przejazdy turystyczne i między miastami',
    seoText: 'Praca taxi w Zatorze łączy ruch lokalny z sezonem turystycznym i przejazdami między miastami. Vonco Partners stosuje warunki zbliżone do krakowskich oraz pomaga przygotować auto, dokumenty i właściwą konfigurację aplikacji.',
    earningsText: 'Dochód zależy od sezonu, dni tygodnia, wydarzeń, liczby godzin online, kosztów samochodu i możliwości łączenia Zatora z Oświęcimiem lub Krakowem.',
    platformRulesTitle: 'Jak działają Bolt i Uber w Zatorze, Krakowie, Oświęcimiu i Zakopanem',
    platformRules: oswiecim.pl?.platformRules,
  },
  en: {
    name: 'Zator',
    inCity: 'in Zator',
    demandText: 'Cooperation and car rental terms are generally the same as in Kraków. Zator has a more seasonal trip profile, while Uber\'s shared operating area makes it easier to combine work with Kraków and Oświęcim.',
    hotspots: 'Zator town centre, the Energylandia area, hotels, the station, and routes towards Oświęcim and Kraków',
    districts: 'Zator, nearby towns, and routes connecting the city with Oświęcim and Kraków',
    fleetFocus: 'Economical cars for local work and comfortable vehicles for tourist and intercity trips',
    seoText: 'Taxi work in Zator combines local demand with tourist-season and intercity trips. Vonco Partners applies terms similar to Kraków and helps prepare the vehicle, documents, and correct application setup.',
    earningsText: 'Income depends on the season, day of the week, events, online hours, vehicle costs, and the ability to combine Zator with Oświęcim or Kraków.',
    platformRulesTitle: 'How Bolt and Uber work in Zator, Kraków, Oświęcim, and Zakopane',
    platformRules: oswiecim.en?.platformRules,
  },
  uk: {
    name: 'Затор',
    inCity: 'у Заторі',
    demandText: 'Умови співпраці й оренди автомобіля практично такі самі, як у Кракові. Затор має більш сезонний характер поїздок, а спільна зона Uber дозволяє зручно поєднувати роботу з Краковом та Освенцимом.',
    hotspots: 'центр Затора, район Energylandia, готелі, вокзал і маршрути в напрямку Освенцима та Кракова',
    districts: 'Затор, навколишні населені пункти та маршрути між містом, Освенцимом і Краковом',
    fleetFocus: 'Економні авто для локальної роботи та комфортні автомобілі для туристичних і міжміських поїздок',
    seoText: 'Робота в таксі у Заторі поєднує локальний попит із туристичним сезоном та міжміськими поїздками. Vonco Partners пропонує умови, подібні до краківських, і допомагає підготувати авто, документи та правильну конфігурацію застосунків.',
    earningsText: 'Дохід залежить від сезону, дня тижня, подій, кількості годин онлайн, витрат на автомобіль і можливості поєднувати роботу в Заторі з Освенцимом або Краковом.',
    platformRulesTitle: 'Як працюють Bolt і Uber у Заторі, Кракові, Освенцимі та Закопаному',
    platformRules: oswiecim.uk?.platformRules,
  },
  ru: {
    name: 'Затор',
    inCity: 'в Заторе',
    demandText: 'Условия сотрудничества и аренды автомобиля практически такие же, как в Кракове. Затор имеет более сезонный характер поездок, а общая зона Uber позволяет удобно совмещать работу с Краковом и Освенцимом.',
    hotspots: 'центр Затора, район Energylandia, отели, вокзал и маршруты в направлении Освенцима и Кракова',
    districts: 'Затор, соседние населённые пункты и маршруты между городом, Освенцимом и Краковом',
    fleetFocus: 'Экономичные авто для локальной работы и комфортные автомобили для туристических и междугородних поездок',
    seoText: 'Работа в такси в Заторе сочетает локальный спрос с туристическим сезоном и междугородними поездками. Vonco Partners предлагает условия, схожие с краковскими, и помогает подготовить автомобиль, документы и правильную конфигурацию приложений.',
    earningsText: 'Доход зависит от сезона, дня недели, мероприятий, количества часов онлайн, расходов на автомобиль и возможности совмещать работу в Заторе с Освенцимом или Краковом.',
    platformRulesTitle: 'Как работают Bolt и Uber в Заторе, Кракове, Освенциме и Закопане',
    platformRules: oswiecim.ru?.platformRules,
  },
};

const CITY_CONTENT: Record<string, LocalizedCityContent> = {
  'bielsko-biala': bielskoBiala,
  gdynia,
  oswiecim,
  zator,
};

export function getDedicatedCityContent(slug: string, locale: string) {
  return CITY_CONTENT[slug]?.[locale];
}
