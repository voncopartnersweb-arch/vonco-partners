import { SUPPLEMENTAL_CITY_CONTENT } from '@/data/cityContentSupplemental';

export type CityContent = {
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
    demandText: 'Gdynia należy do wspólnego obszaru Trójmiasta, obejmującego Gdańsk, Gdynię i Sopot. Uber, Bolt i Free Now oficjalnie potwierdzają obsługę tego regionu, a popyt tworzą codzienne dojazdy, port, dworzec i ruch między miastami.',
    hotspots: 'Gdynia Główna, Śródmieście, port, Skwer Kościuszki i główne punkty przesiadkowe',
    districts: 'Śródmieście, Redłowo, Orłowo, Chylonia i trasy w kierunku Gdańska oraz Sopotu',
    fleetFocus: 'Ekonomiczne hybrydy do ruchu miejskiego i wygodne auta na dłuższe przejazdy w obrębie Trójmiasta',
    seoText: 'Praca taxi w Gdyni obejmuje wspólny region Trójmiasta: Gdańsk, Gdynię i Sopot. Vonco Partners pomaga dobrać auto, przygotować dokumenty oraz uruchomić Uber, Bolt lub Free Now zgodnie z aktualnymi wymaganiami platformy.',
    earningsText: 'Dochód jest zmienny i zależy od grafiku, sezonu, ruchu w Trójmieście, wybranych aplikacji, prowizji oraz kosztów eksploatacji samochodu.',
  },
  en: {
    name: 'Gdynia',
    inCity: 'in Gdynia',
    demandText: 'Gdynia is part of the Tricity area covering Gdańsk, Gdynia, and Sopot. Uber, Bolt, and Free Now officially confirm service in this region, with demand generated by daily commuting, the port, the railway station, and travel between the three cities.',
    hotspots: 'Gdynia Główna, Śródmieście, the port, Skwer Kościuszki, and main transport interchanges',
    districts: 'Śródmieście, Redłowo, Orłowo, Chylonia, and routes towards Gdańsk and Sopot',
    fleetFocus: 'Economical hybrids for city traffic and comfortable cars for longer journeys across the Tricity area',
    seoText: 'Taxi work in Gdynia covers the Tricity region of Gdańsk, Gdynia, and Sopot. Vonco Partners helps drivers choose a car, prepare documents, and activate Uber, Bolt, or Free Now according to current platform requirements.',
    earningsText: 'Income varies with the schedule, season, Tricity traffic, selected applications, platform fees, and the operating costs of the vehicle.',
  },
  uk: {
    name: 'Гдиня',
    inCity: 'у Гдині',
    demandText: 'Гдиня входить до регіону Триміста, який охоплює Гданськ, Гдиню та Сопот. Uber, Bolt і Free Now офіційно підтверджують роботу в цьому регіоні, а попит формують щоденні поїздки, порт, вокзал і маршрути між трьома містами.',
    hotspots: 'Gdynia Główna, Śródmieście, порт, Skwer Kościuszki та основні транспортні вузли',
    districts: 'Śródmieście, Redłowo, Orłowo, Chylonia та маршрути в напрямку Гданська й Сопота',
    fleetFocus: 'Економні гібриди для міського руху та комфортні авто для довших поїздок у межах Триміста',
    seoText: 'Робота в таксі у Гдині охоплює регіон Триміста: Гданськ, Гдиню та Сопот. Vonco Partners допомагає підібрати авто, підготувати документи й активувати Uber, Bolt або Free Now відповідно до актуальних вимог платформи.',
    earningsText: 'Дохід змінюється залежно від графіка, сезону, трафіку в Тримісті, вибраних застосунків, комісій платформ і витрат на експлуатацію авто.',
  },
  ru: {
    name: 'Гдыня',
    inCity: 'в Гдыне',
    demandText: 'Гдыня входит в регион Труймяста, который охватывает Гданьск, Гдыню и Сопот. Uber, Bolt и Free Now официально подтверждают работу в этом регионе, а спрос формируют ежедневные поездки, порт, вокзал и маршруты между тремя городами.',
    hotspots: 'Gdynia Główna, Śródmieście, порт, Skwer Kościuszki и основные транспортные узлы',
    districts: 'Śródmieście, Redłowo, Orłowo, Chylonia и маршруты в направлении Гданьска и Сопота',
    fleetFocus: 'Экономичные гибриды для городского движения и комфортные авто для длинных поездок по Труймясту',
    seoText: 'Работа в такси в Гдыне охватывает регион Труймяста: Гданьск, Гдыню и Сопот. Vonco Partners помогает подобрать автомобиль, подготовить документы и активировать Uber, Bolt или Free Now согласно актуальным требованиям платформы.',
    earningsText: 'Доход меняется в зависимости от графика, сезона, трафика в Труймясте, выбранных приложений, комиссий платформ и расходов на эксплуатацию авто.',
  },
};

const sopot: LocalizedCityContent = {
  pl: {
    name: 'Sopot',
    inCity: 'w Sopocie',
    demandText: 'Sopot jest częścią obszaru Trójmiasta razem z Gdańskiem i Gdynią. Uber, Bolt i Free Now oficjalnie potwierdzają obsługę regionu, a największy popyt pojawia się w centrum, przy hotelach, plaży, dworcu oraz podczas wydarzeń i sezonu turystycznego.',
    hotspots: 'centrum Sopotu, dworzec Sopot, okolice Monciaka, molo, plaża, hotele i Ergo Arena',
    districts: 'Dolny Sopot, Górny Sopot, Karlikowo, Kamienny Potok oraz trasy do Gdańska i Gdyni',
    fleetFocus: 'Ekonomiczne hybrydy do ruchu miejskiego oraz komfortowe auta na przejazdy turystyczne, nocne i między miastami Trójmiasta',
    seoText: 'Praca taxi w Sopocie obejmuje region Gdańska, Gdyni i Sopotu. Vonco Partners pomaga dobrać samochód, przygotować dokumenty oraz uruchomić Uber, Bolt lub Free Now zgodnie z aktualnymi wymaganiami platformy.',
    earningsText: 'Dochód zależy od sezonu turystycznego, dni tygodnia, wydarzeń, godzin pracy, wybranej platformy oraz kosztów eksploatacji samochodu.',
  },
  en: {
    name: 'Sopot',
    inCity: 'in Sopot',
    demandText: 'Sopot is part of the Tricity area together with Gdańsk and Gdynia. Uber, Bolt, and Free Now officially confirm service in the region, while the strongest demand appears around the centre, hotels, the beach, the railway station, events, and the tourist season.',
    hotspots: 'Sopot city centre, Sopot station, Monciak, the pier, the beach, hotels, and Ergo Arena',
    districts: 'Dolny Sopot, Górny Sopot, Karlikowo, Kamienny Potok, and routes towards Gdańsk and Gdynia',
    fleetFocus: 'Economical hybrids for urban work and comfortable cars for tourist, evening, and intercity journeys across Tricity',
    seoText: 'Taxi work in Sopot covers the Gdańsk, Gdynia, and Sopot region. Vonco Partners helps drivers choose a car, prepare documents, and activate Uber, Bolt, or Free Now according to current platform requirements.',
    earningsText: 'Income depends on the tourist season, day of the week, events, working hours, selected platform, and vehicle operating costs.',
  },
  uk: {
    name: 'Сопот',
    inCity: 'у Сопоті',
    demandText: 'Сопот входить до регіону Триміста разом із Гданськом і Гдинею. Uber, Bolt і Free Now офіційно підтверджують роботу в регіоні, а найбільший попит зосереджується в центрі, біля готелів, пляжу, вокзалу, під час подій і туристичного сезону.',
    hotspots: 'центр Сопота, вокзал Sopot, район Monciak, пірс, пляж, готелі та Ergo Arena',
    districts: 'Dolny Sopot, Górny Sopot, Karlikowo, Kamienny Potok і маршрути до Гданська та Гдині',
    fleetFocus: 'Економні гібриди для міських поїздок і комфортні авто для туристичних, вечірніх та міжміських маршрутів Триміста',
    seoText: 'Робота в таксі у Сопоті охоплює регіон Гданська, Гдині та Сопота. Vonco Partners допомагає підібрати авто, підготувати документи й активувати Uber, Bolt або Free Now відповідно до актуальних вимог платформи.',
    earningsText: 'Дохід залежить від туристичного сезону, дня тижня, подій, робочого графіка, вибраної платформи та витрат на експлуатацію автомобіля.',
  },
  ru: {
    name: 'Сопот',
    inCity: 'в Сопоте',
    demandText: 'Сопот входит в регион Труймяста вместе с Гданьском и Гдыней. Uber, Bolt и Free Now официально подтверждают работу в регионе, а наибольший спрос сосредоточен в центре, возле отелей, пляжа, вокзала, во время мероприятий и туристического сезона.',
    hotspots: 'центр Сопота, вокзал Sopot, район Monciak, пирс, пляж, отели и Ergo Arena',
    districts: 'Dolny Sopot, Górny Sopot, Karlikowo, Kamienny Potok и маршруты в Гданьск и Гдыню',
    fleetFocus: 'Экономичные гибриды для городских поездок и комфортные автомобили для туристических, вечерних и междугородних маршрутов Труймяста',
    seoText: 'Работа в такси в Сопоте охватывает регион Гданьска, Гдыни и Сопота. Vonco Partners помогает подобрать автомобиль, подготовить документы и активировать Uber, Bolt или Free Now согласно актуальным требованиям платформы.',
    earningsText: 'Доход зависит от туристического сезона, дня недели, мероприятий, рабочего графика, выбранной платформы и расходов на эксплуатацию автомобиля.',
  },
};

const oswiecim: LocalizedCityContent = {
  pl: {
    name: 'Oświęcim',
    inCity: 'w Oświęcimiu',
    demandText: 'Praca kierowcy w Oświęcimiu obejmuje lokalne zlecenia oraz przejazdy w kierunku Krakowa i Zatora. Vonco Partners potwierdza możliwość pracy z Uber, Bolt i Free Now; sposób konfiguracji konta dla wybranej strefy manager ustala indywidualnie przed rozpoczęciem pracy.',
    hotspots: 'dworzec kolejowy, centrum, hotele, główne punkty usługowe i trasy w kierunku Krakowa oraz Zatora',
    districts: 'Centrum, Zasole, Stare Stawy oraz trasy łączące Oświęcim z regionem',
    fleetFocus: 'Ekonomiczne hybrydy i auta benzynowe z LPG odpowiednie do pracy lokalnej oraz dłuższych przejazdów między miastami',
    seoText: 'Vonco Partners pomaga kierowcom w Oświęcimiu dobrać samochód, przygotować dokumenty i uruchomić Uber, Bolt lub Free Now. Aktualne warunki wynajmu, dostępność auta oraz właściwą konfigurację konta manager potwierdza przed rozpoczęciem współpracy.',
    earningsText: 'Dochód zależy od liczby godzin online, pory dnia, sezonu, liczby kursów lokalnych i między miastami, kosztów paliwa oraz wybranej aplikacji. Przed startem manager potwierdza aktualną konfigurację konta i samochodu.',
    platformRulesTitle: 'Jak działają Uber, Bolt i Free Now w Oświęcimiu, Krakowie, Zatorze i Zakopanem',
    platformRules: [
      'Vonco Partners potwierdza dostępność Uber, Bolt i Free Now w Oświęcimiu oraz Zatorze.',
      'W przypadku Bolt konfiguracja konta i strefy jest ustalana indywidualnie. Manager sprawdza aktualny wariant i wyjaśnia, czy potrzebne jest dodatkowe konto lub telefon.',
      'Uber działa w jednej aplikacji dla Krakowa, Oświęcimia i Zatora, dlatego kierowca może wygodnie łączyć pracę w tych miastach.',
      'Free Now jest dostępny w Oświęcimiu i Zatorze; szczegóły aktywacji manager potwierdza przy rejestracji.',
      'Dla Zakopanego konto Uber trzeba przełączyć na właściwy obszar. Zmiana może potrwać do jednego dnia roboczego.',
    ],
  },
  en: {
    name: 'Oświęcim',
    inCity: 'in Oświęcim',
    demandText: 'Driving in Oświęcim includes local bookings and trips towards Kraków and Zator. Vonco Partners confirms access to Uber, Bolt, and Free Now; a manager agrees the correct account and zone configuration individually before work begins.',
    hotspots: 'the railway station, city centre, hotels, main service areas, and routes towards Kraków and Zator',
    districts: 'Centrum, Zasole, Stare Stawy, and routes connecting Oświęcim with the surrounding region',
    fleetFocus: 'Economical hybrids and petrol/LPG cars suitable for local work and longer intercity journeys',
    seoText: 'Vonco Partners helps drivers in Oświęcim choose a suitable car, prepare documents, and activate Uber, Bolt, or Free Now. A manager confirms current rental terms, vehicle availability, and the correct account configuration before cooperation begins.',
    earningsText: 'Income depends on online hours, time of day, season, local and intercity trip volume, fuel costs, and the selected application. A manager confirms the current account and vehicle setup before the driver starts.',
    platformRulesTitle: 'How Uber, Bolt, and Free Now work in Oświęcim, Kraków, Zator, and Zakopane',
    platformRules: [
      'Vonco Partners confirms access to Uber, Bolt, and Free Now in Oświęcim and Zator.',
      'For Bolt, the account and operating-zone configuration is agreed individually. A manager checks the current option and explains whether an additional account or phone is required.',
      'Uber uses one application for Kraków, Oświęcim, and Zator, making it convenient to combine work across these cities.',
      'Free Now is available in Oświęcim and Zator; a manager confirms the activation details during onboarding.',
      'For Zakopane, the Uber account must be switched to the relevant area. The change can take up to one business day.',
    ],
  },
  uk: {
    name: 'Освенцим',
    inCity: 'в Освенцимі',
    demandText: 'Робота водієм в Освенцимі охоплює локальні замовлення та поїздки в напрямку Кракова й Затора. Vonco Partners підтверджує можливість роботи з Uber, Bolt і Free Now; правильну конфігурацію акаунта для вибраної зони менеджер погоджує індивідуально до початку роботи.',
    hotspots: 'залізничний вокзал, центр міста, готелі, основні сервісні локації та маршрути в напрямку Кракова й Затора',
    districts: 'Centrum, Zasole, Stare Stawy та маршрути між Освенцимом і навколишнім регіоном',
    fleetFocus: 'Економні гібриди та бензинові авто з LPG для локальної роботи й довших міжміських поїздок',
    seoText: 'Vonco Partners допомагає водіям в Освенцимі підібрати автомобіль, підготувати документи та активувати Uber, Bolt або Free Now. Актуальні умови оренди, наявність авто й правильну конфігурацію акаунта менеджер підтверджує перед початком співпраці.',
    earningsText: 'Дохід залежить від кількості годин онлайн, часу доби, сезону, локальних і міжміських замовлень, витрат на пальне та вибраного застосунку. Перед початком роботи менеджер підтверджує актуальне налаштування акаунта й автомобіля.',
    platformRulesTitle: 'Як працюють Uber, Bolt і Free Now в Освенцимі, Кракові, Заторі та Закопаному',
    platformRules: [
      'Vonco Partners підтверджує доступність Uber, Bolt і Free Now в Освенцимі та Заторі.',
      'Для Bolt конфігурація акаунта й робочої зони погоджується індивідуально. Менеджер перевірить актуальний варіант і пояснить, чи потрібен додатковий акаунт або телефон.',
      'Uber працює в одному застосунку для Кракова, Освенцима й Затора, тому водієві зручно поєднувати роботу в цих містах.',
      'Free Now доступний в Освенцимі та Заторі; деталі активації менеджер підтвердить під час реєстрації.',
      'Для Закопаного акаунт Uber потрібно перемкнути на відповідну зону. Зміна може тривати до одного робочого дня.',
    ],
  },
  ru: {
    name: 'Освенцим',
    inCity: 'в Освенциме',
    demandText: 'Работа водителем в Освенциме включает локальные заказы и поездки в направлении Кракова и Затора. Vonco Partners подтверждает возможность работы с Uber, Bolt и Free Now; правильную конфигурацию аккаунта для выбранной зоны менеджер согласует индивидуально до начала работы.',
    hotspots: 'железнодорожный вокзал, центр города, отели, основные сервисные локации и маршруты в направлении Кракова и Затора',
    districts: 'Centrum, Zasole, Stare Stawy и маршруты между Освенцимом и окружающим регионом',
    fleetFocus: 'Экономичные гибриды и бензиновые авто с LPG для локальной работы и более длинных междугородних поездок',
    seoText: 'Vonco Partners помогает водителям в Освенциме подобрать автомобиль, подготовить документы и активировать Uber, Bolt или Free Now. Актуальные условия аренды, наличие авто и правильную конфигурацию аккаунта менеджер подтверждает до начала сотрудничества.',
    earningsText: 'Доход зависит от количества часов онлайн, времени суток, сезона, локальных и междугородних заказов, расходов на топливо и выбранного приложения. Перед началом работы менеджер подтверждает актуальную настройку аккаунта и автомобиля.',
    platformRulesTitle: 'Как работают Uber, Bolt и Free Now в Освенциме, Кракове, Заторе и Закопане',
    platformRules: [
      'Vonco Partners подтверждает доступность Uber, Bolt и Free Now в Освенциме и Заторе.',
      'Для Bolt конфигурация аккаунта и рабочей зоны согласуется индивидуально. Менеджер проверит актуальный вариант и объяснит, нужен ли дополнительный аккаунт или телефон.',
      'Uber работает в одном приложении для Кракова, Освенцима и Затора, поэтому водителю удобно совмещать работу в этих городах.',
      'Free Now доступен в Освенциме и Заторе; детали активации менеджер подтвердит во время регистрации.',
      'Для Закопане аккаунт Uber нужно переключить на соответствующую зону. Изменение может занять до одного рабочего дня.',
    ],
  },
};

const zator: LocalizedCityContent = {
  pl: {
    name: 'Zator',
    inCity: 'w Zatorze',
    demandText: 'Praca kierowcy w Zatorze ma wyraźnie sezonowy charakter. Ruch rośnie szczególnie w dni otwarcia Energylandii i Zatorlandu, w weekendy, święta, ferie i wakacje. Zamówienia tworzą także obiekty noclegowe, dworzec oraz przejazdy do Oświęcimia i Krakowa. Vonco Partners potwierdza dostępność Uber, Bolt i Free Now.',
    hotspots: 'Energylandia, Zatorland, centrum Zatora, obiekty noclegowe, dworzec kolejowy i trasy w kierunku Oświęcimia oraz Krakowa',
    districts: 'Zator i okoliczne miejscowości oraz trasy łączące miasto z Oświęcimiem i Krakowem',
    fleetFocus: 'Ekonomiczne auta do pracy lokalnej oraz wygodne samochody na przejazdy turystyczne i między miastami',
    seoText: 'Vonco Partners pomaga kierowcom w Zatorze dobrać samochód, przygotować dokumenty i skonfigurować Uber, Bolt lub Free Now do pracy lokalnej i przejazdów między miastami. Aktualne warunki najmu, dostępność aut oraz konfigurację konta manager potwierdza przed rozpoczęciem współpracy.',
    earningsText: 'Dochód zależy od sezonu, dni tygodnia, wydarzeń, liczby godzin online, kosztów samochodu i możliwości łączenia Zatora z Oświęcimiem lub Krakowem.',
    platformRulesTitle: 'Jak działają Bolt i Uber w Zatorze, Krakowie, Oświęcimiu i Zakopanem',
    platformRules: oswiecim.pl?.platformRules,
  },
  en: {
    name: 'Zator',
    inCity: 'in Zator',
    demandText: 'Driving in Zator has a distinctly seasonal profile. Traffic rises especially on Energylandia and Zatorland operating days, weekends, public holidays, school breaks, and during summer. Accommodation, the railway station, and journeys to Oświęcim and Kraków also generate trips. Vonco Partners confirms access to Uber, Bolt, and Free Now.',
    hotspots: 'Energylandia, Zatorland, Zator town centre, accommodation, the railway station, and routes towards Oświęcim and Kraków',
    districts: 'Zator, nearby towns, and routes connecting the city with Oświęcim and Kraków',
    fleetFocus: 'Economical cars for local work and comfortable vehicles for tourist and intercity trips',
    seoText: 'Vonco Partners helps drivers in Zator choose a suitable car, prepare documents, and configure Uber, Bolt, or Free Now for local and intercity work. A manager confirms current rental terms, vehicle availability, and account setup before cooperation begins.',
    earningsText: 'Income depends on the season, day of the week, events, online hours, vehicle costs, and the ability to combine Zator with Oświęcim or Kraków.',
    platformRulesTitle: 'How Bolt and Uber work in Zator, Kraków, Oświęcim, and Zakopane',
    platformRules: oswiecim.en?.platformRules,
  },
  uk: {
    name: 'Затор',
    inCity: 'у Заторі',
    demandText: 'Робота водієм у Заторі має виражений сезонний характер. Рух особливо зростає у дні роботи Energylandia і Zatorland, у вихідні, свята, під час канікул та влітку. Замовлення також формують готелі й інші місця проживання, залізничний вокзал і поїздки до Освенцима та Кракова. Vonco Partners підтверджує доступність Uber, Bolt і Free Now.',
    hotspots: 'Energylandia, Zatorland, центр Затора, готелі й інші місця проживання, залізничний вокзал і маршрути в напрямку Освенцима та Кракова',
    districts: 'Затор, навколишні населені пункти та маршрути між містом, Освенцимом і Краковом',
    fleetFocus: 'Економні авто для локальної роботи та комфортні автомобілі для туристичних і міжміських поїздок',
    seoText: 'Vonco Partners допомагає водіям у Заторі підібрати автомобіль, підготувати документи та налаштувати Uber, Bolt або Free Now для локальної й міжміської роботи. Актуальні умови оренди, наявність авто та конфігурацію акаунта менеджер підтверджує перед початком співпраці.',
    earningsText: 'Дохід залежить від сезону, дня тижня, подій, кількості годин онлайн, витрат на автомобіль і можливості поєднувати роботу в Заторі з Освенцимом або Краковом.',
    platformRulesTitle: 'Як працюють Bolt і Uber у Заторі, Кракові, Освенцимі та Закопаному',
    platformRules: oswiecim.uk?.platformRules,
  },
  ru: {
    name: 'Затор',
    inCity: 'в Заторе',
    demandText: 'Работа водителем в Заторе имеет выраженный сезонный характер. Движение особенно возрастает в дни работы Energylandia и Zatorland, в выходные, праздники, во время каникул и летом. Заказы также формируют гостиницы и другие места размещения, железнодорожный вокзал и поездки в Освенцим и Краков. Vonco Partners подтверждает доступность Uber, Bolt и Free Now.',
    hotspots: 'Energylandia, Zatorland, центр Затора, гостиницы и другие места размещения, железнодорожный вокзал и маршруты в направлении Освенцима и Кракова',
    districts: 'Затор, соседние населённые пункты и маршруты между городом, Освенцимом и Краковом',
    fleetFocus: 'Экономичные авто для локальной работы и комфортные автомобили для туристических и междугородних поездок',
    seoText: 'Vonco Partners помогает водителям в Заторе подобрать автомобиль, подготовить документы и настроить Uber, Bolt или Free Now для локальной и междугородней работы. Актуальные условия аренды, наличие автомобилей и конфигурацию аккаунта менеджер подтверждает до начала сотрудничества.',
    earningsText: 'Доход зависит от сезона, дня недели, мероприятий, количества часов онлайн, расходов на автомобиль и возможности совмещать работу в Заторе с Освенцимом или Краковом.',
    platformRulesTitle: 'Как работают Bolt и Uber в Заторе, Кракове, Освенциме и Закопане',
    platformRules: oswiecim.ru?.platformRules,
  },
};

const CITY_CONTENT: Record<string, LocalizedCityContent> = {
  'bielsko-biala': bielskoBiala,
  gdynia,
  sopot,
  oswiecim,
  zator,
};

export function getDedicatedCityContent(slug: string, locale: string) {
  return CITY_CONTENT[slug]?.[locale] ?? SUPPLEMENTAL_CITY_CONTENT[slug]?.[locale];
}
