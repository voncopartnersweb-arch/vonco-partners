import type { CityContent } from '@/data/cityContent';

type CitySlug =
  | 'bielsko-biala'
  | 'gdynia'
  | 'sopot'
  | 'oswiecim'
  | 'zator';

type LocalePack = {
  cities: Record<
    CitySlug,
    Pick<CityContent, 'name' | 'inCity' | 'demandText'>
  >;
  fleetFocus: string;
  seoText: string;
  earningsText: string;
};

const CITY_FACTS: Record<
  CitySlug,
  Pick<CityContent, 'hotspots' | 'districts'>
> = {
  'bielsko-biala': {
    hotspots:
      'Bielsko-Biała Główna, Galeria Sfera, Dworzec Autobusowy, Śródmieście',
    districts: 'Śródmieście, Aleksandrowice, Kamienica, Mikuszowice',
  },
  gdynia: {
    hotspots: 'Gdynia Główna, Skwer Kościuszki, Port Gdynia, Orłowo',
    districts: 'Śródmieście, Redłowo, Orłowo, Chylonia, Trójmiasto',
  },
  sopot: {
    hotspots: 'Sopot Centrum, Sopot PKP, Monciak, Molo, Ergo Arena',
    districts: 'Dolny Sopot, Górny Sopot, Karlikowo, Kamienny Potok, Trójmiasto',
  },
  oswiecim: {
    hotspots: 'Oświęcim PKP, Zasole, Stare Stawy, Auschwitz-Birkenau, DW933',
    districts: 'Centrum, Zasole, Stare Stawy, Kraków, Zator',
  },
  zator: {
    hotspots: 'Energylandia, Zatorland, Zator PKP, centrum Zatora, obiekty noclegowe, DK44',
    districts: 'Zator, Energylandia, Zatorland, Oświęcim, Kraków',
  },
};

const PACKS: Record<string, LocalePack> = {
  es: {
    cities: {
      'bielsko-biala': {
        name: 'Bielsko-Biała',
        inCity: 'en Bielsko-Biała',
        demandText:
          'Bielsko-Biała combina viajes urbanos habituales con trayectos entre barrios residenciales, estaciones y zonas comerciales y de servicios.',
      },
      gdynia: {
        name: 'Gdynia',
        inCity: 'en Gdynia',
        demandText:
          'Gdynia forma parte de la zona compartida de Triciudad. La demanda procede de los desplazamientos diarios, el puerto, la estación y los viajes hacia Gdańsk y Sopot.',
      },
      sopot: {
        name: 'Sopot',
        inCity: 'en Sopot',
        demandText:
          'Sopot pertenece a la zona de Triciudad y registra mayor demanda en el centro, cerca de hoteles, la playa, la estación y durante eventos y temporada turística.',
      },
      oswiecim: {
        name: 'Oświęcim',
        inCity: 'en Oświęcim',
        demandText:
          'El trabajo en Oświęcim combina pedidos locales con trayectos hacia Cracovia y Zator. Vonco Partners confirma la disponibilidad de Uber, Bolt y Free Now; el gestor acuerda individualmente la configuración correcta de la cuenta.',
      },
      zator: {
        name: 'Zator',
        inCity: 'en Zator',
        demandText:
          'El mercado de Zator es estacional: el tráfico aumenta en los días de apertura de Energylandia y Zatorland, fines de semana, festivos, vacaciones escolares y verano. También generan viajes los alojamientos, la estación y las rutas hacia Oświęcim y Cracovia. Uber, Bolt y Free Now están disponibles.',
      },
    },
    fleetFocus:
      'Híbridos económicos y coches con GLP para la ciudad, además de vehículos cómodos para trayectos más largos',
    seoText:
      'Vonco Partners ayuda a elegir el coche, preparar los documentos y comprobar la disponibilidad y configuración actual de las plataformas antes de empezar.',
    earningsText:
      'Los ingresos dependen del horario, la temporada, la demanda, las aplicaciones activas, las comisiones y los costes del vehículo.',
  },
  hy: {
    cities: {
      'bielsko-biala': {
        name: 'Բելսկո-Բյալա',
        inCity: 'Բելսկո-Բյալայում',
        demandText:
          'Բելսկո-Բյալայում քաղաքային կանոնավոր ուղևորությունները համակցվում են բնակելի թաղամասերի, կայարանների, առևտրային և սպասարկման վայրերի միջև երթուղիների հետ։',
      },
      gdynia: {
        name: 'Գդինիա',
        inCity: 'Գդինիայում',
        demandText:
          'Գդինիան Տրոյմյաստոյի միասնական գոտու մասն է։ Պահանջարկը ձևավորվում է ամենօրյա ուղևորություններից, նավահանգստից, կայարանից և Գդանսկ ու Սոպոտ երթուղիներից։',
      },
      sopot: {
        name: 'Սոպոտ',
        inCity: 'Սոպոտում',
        demandText:
          'Սոպոտը Տրոյմյաստոյի գոտու մասն է, իսկ առավել բարձր պահանջարկը կենտրոնում, հյուրանոցների, լողափի, կայարանի մոտ և զբոսաշրջային սեզոնին է։',
      },
      oswiecim: {
        name: 'Օսվենցիմ',
        inCity: 'Օսվենցիմում',
        demandText:
          'Օսվենցիմում աշխատանքը ներառում է տեղական պատվերներ և ուղևորություններ դեպի Կրակով ու Զատոր։ Vonco Partners-ը հաստատում է Uber, Bolt և Free Now-ի հասանելիությունը, իսկ հաշվի կարգավորումը մենեջերը համաձայնեցնում է անհատապես։',
      },
      zator: {
        name: 'Զատոր',
        inCity: 'Զատորում',
        demandText:
          'Զատորի շուկան սեզոնային է․ երթևեկությունը հատկապես աճում է Energylandia-ի և Zatorland-ի աշխատանքային օրերին, հանգստյան օրերին, տոներին, արձակուրդներին և ամռանը։ Ուղևորություններ են ձևավորում նաև կացարանները, կայարանը և Օսվենցիմ ու Կրակով ուղղությունները։ Uber-ը, Bolt-ը և Free Now-ը հասանելի են։',
      },
    },
    fleetFocus:
      'Քաղաքային աշխատանքի համար տնտեսող հիբրիդներ և LPG մեքենաներ, իսկ երկար երթուղիների համար՝ հարմարավետ ավտոմեքենաներ',
    seoText:
      'Vonco Partners-ը օգնում է ընտրել մեքենա, պատրաստել փաստաթղթերը և մեկնարկից առաջ ստուգել հարթակների ընթացիկ հասանելիությունն ու կարգավորումները։',
    earningsText:
      'Եկամուտը կախված է գրաֆիկից, սեզոնից, պահանջարկից, ակտիվ հավելվածներից, միջնորդավճարներից և մեքենայի ծախսերից։',
  },
  be: {
    cities: {
      'bielsko-biala': {
        name: 'Бельска-Бяла',
        inCity: 'у Бельска-Бяле',
        demandText:
          'Бельска-Бяла спалучае рэгулярныя гарадскія паездкі з маршрутамі паміж жылымі раёнамі, вакзаламі, гандлёвымі і сэрвіснымі аб’ектамі.',
      },
      gdynia: {
        name: 'Гдыня',
        inCity: 'у Гдыні',
        demandText:
          'Гдыня ўваходзіць у агульную зону Труймяста. Попыт ствараюць штодзённыя паездкі, порт, вакзал і маршруты ў Гданьск і Сопат.',
      },
      sopot: {
        name: 'Сопат',
        inCity: 'у Сопаце',
        demandText:
          'Сопат уваходзіць у зону Труймяста, а найбольшы попыт назіраецца ў цэнтры, каля гатэляў, пляжа, вакзала, падчас падзей і турыстычнага сезона.',
      },
      oswiecim: {
        name: 'Асвенцім',
        inCity: 'у Асвенціме',
        demandText:
          'Праца ў Асвенціме ахоплівае мясцовыя заказы і паездкі ў Кракаў і Затор. Vonco Partners пацвярджае даступнасць Uber, Bolt і Free Now, а канфігурацыю акаўнта менеджар узгадняе індывідуальна.',
      },
      zator: {
        name: 'Затор',
        inCity: 'у Заторы',
        demandText:
          'Рынак Затора мае сезонны характар: рух асабліва ўзрастае ў дні працы Energylandia і Zatorland, у выхадныя, святы, падчас канікул і летам. Паездкі таксама ствараюць месцы размяшчэння, вакзал і маршруты ў Асвенцім і Кракаў. Даступныя Uber, Bolt і Free Now.',
      },
    },
    fleetFocus:
      'Эканамічныя гібрыды і аўтамабілі з LPG для горада, а таксама камфортныя машыны для даўжэйшых маршрутаў',
    seoText:
      'Vonco Partners дапамагае выбраць аўтамабіль, падрыхтаваць дакументы і праверыць актуальную даступнасць і налады платформ перад пачаткам працы.',
    earningsText:
      'Даход залежыць ад графіка, сезона, попыту, актыўных праграм, камісій і выдаткаў на аўтамабіль.',
  },
  ro: {
    cities: {
      'bielsko-biala': {
        name: 'Bielsko-Biała',
        inCity: 'în Bielsko-Biała',
        demandText:
          'Bielsko-Biała combină cursele urbane regulate cu traseele dintre cartiere, gări, zone comerciale și puncte de servicii.',
      },
      gdynia: {
        name: 'Gdynia',
        inCity: 'în Gdynia',
        demandText:
          'Gdynia face parte din zona comună Trójmiasto. Cererea este susținută de naveta zilnică, port, gară și cursele spre Gdańsk și Sopot.',
      },
      sopot: {
        name: 'Sopot',
        inCity: 'în Sopot',
        demandText:
          'Sopot face parte din Trójmiasto, iar cererea maximă apare în centru, lângă hoteluri, plajă, gară, la evenimente și în sezonul turistic.',
      },
      oswiecim: {
        name: 'Oświęcim',
        inCity: 'în Oświęcim',
        demandText:
          'Activitatea în Oświęcim include comenzi locale și curse spre Cracovia și Zator. Vonco Partners confirmă disponibilitatea Uber, Bolt și Free Now, iar configurarea corectă a contului este stabilită individual cu managerul.',
      },
      zator: {
        name: 'Zator',
        inCity: 'în Zator',
        demandText:
          'Piața din Zator este sezonieră: traficul crește în zilele de funcționare ale Energylandia și Zatorland, în weekenduri, sărbători, vacanțe școlare și vara. Cazările, gara și cursele spre Oświęcim și Cracovia generează de asemenea cerere. Uber, Bolt și Free Now sunt disponibile.',
      },
    },
    fleetFocus:
      'Mașini hibride economice și vehicule cu GPL pentru oraș, plus automobile confortabile pentru trasee mai lungi',
    seoText:
      'Vonco Partners ajută la alegerea mașinii, pregătirea documentelor și verificarea disponibilității și configurării actuale a platformelor înainte de începere.',
    earningsText:
      'Veniturile depind de program, sezon, cerere, aplicațiile active, comisioane și costurile automobilului.',
  },
  ka: {
    cities: {
      'bielsko-biala': {
        name: 'ბიელსკო-ბიალა',
        inCity: 'ბიელსკო-ბიალაში',
        demandText:
          'ბიელსკო-ბიალა აერთიანებს რეგულარულ საქალაქო მგზავრობებს საცხოვრებელ უბნებს, სადგურებს, სავაჭრო და მომსახურების ობიექტებს შორის მარშრუტებთან.',
      },
      gdynia: {
        name: 'გდინია',
        inCity: 'გდინიაში',
        demandText:
          'გდინია ტრუიმიასტოს საერთო ზონის ნაწილია. მოთხოვნას ქმნის ყოველდღიური გადაადგილება, პორტი, სადგური და მარშრუტები გდანსკსა და სოპოტში.',
      },
      sopot: {
        name: 'სოპოტი',
        inCity: 'სოპოტში',
        demandText:
          'სოპოტი ტრუიმიასტოს ზონაში შედის, ხოლო ყველაზე მაღალი მოთხოვნაა ცენტრში, სასტუმროებთან, სანაპიროსთან, სადგურთან, ღონისძიებებისა და ტურისტული სეზონის დროს.',
      },
      oswiecim: {
        name: 'ოსვენციმი',
        inCity: 'ოსვენციმში',
        demandText:
          'ოსვენციმში მუშაობა მოიცავს ადგილობრივ შეკვეთებს და მგზავრობებს კრაკოვისა და ზატორის მიმართულებით. Vonco Partners ადასტურებს Uber-ის, Bolt-ისა და Free Now-ის ხელმისაწვდომობას, ხოლო ანგარიშის სწორ კონფიგურაციას მენეჯერი ინდივიდუალურად ათანხმებს.',
      },
      zator: {
        name: 'ზატორი',
        inCity: 'ზატორში',
        demandText:
          'ზატორის ბაზარი სეზონურია: მოძრაობა განსაკუთრებით იზრდება Energylandia-სა და Zatorland-ის მუშაობის დღეებში, შაბათ-კვირას, დღესასწაულებზე, სასკოლო არდადეგებსა და ზაფხულში. მოთხოვნას ასევე ქმნის საცხოვრებელი ობიექტები, სადგური და მგზავრობები ოსვენციმისა და კრაკოვის მიმართულებით. Uber, Bolt და Free Now ხელმისაწვდომია.',
      },
    },
    fleetFocus:
      'ეკონომიური ჰიბრიდები და LPG ავტომობილები ქალაქისთვის, ასევე კომფორტული მანქანები გრძელი მარშრუტებისთვის',
    seoText:
      'Vonco Partners გეხმარებათ ავტომობილის შერჩევაში, დოკუმენტების მომზადებასა და მუშაობის დაწყებამდე პლატფორმების მიმდინარე ხელმისაწვდომობისა და პარამეტრების შემოწმებაში.',
    earningsText:
      'შემოსავალი დამოკიდებულია გრაფიკზე, სეზონზე, მოთხოვნაზე, აქტიურ აპებზე, საკომისიოებსა და ავტომობილის ხარჯებზე.',
  },
  uz: {
    cities: {
      'bielsko-biala': {
        name: 'Belsko-Byala',
        inCity: 'Belsko-Byalada',
        demandText:
          'Belsko-Byala muntazam shahar safarlarini turar joy hududlari, vokzallar, savdo va xizmat ko‘rsatish nuqtalari orasidagi yo‘nalishlar bilan birlashtiradi.',
      },
      gdynia: {
        name: 'Gdinya',
        inCity: 'Gdinyada',
        demandText:
          'Gdinya Uchshahar umumiy hududiga kiradi. Talab kundalik qatnovlar, port, vokzal hamda Gdansk va Sopot yo‘nalishlari hisobiga shakllanadi.',
      },
      sopot: {
        name: 'Sopot',
        inCity: 'Sopotda',
        demandText:
          'Sopot Uchshahar hududining bir qismi bo‘lib, eng yuqori talab markazda, mehmonxonalar, sohil, vokzal yaqinida, tadbirlar va sayyohlik mavsumida kuzatiladi.',
      },
      oswiecim: {
        name: 'Osvensim',
        inCity: 'Osvensimda',
        demandText:
          'Osvensimdagi ish mahalliy buyurtmalar va Krakov hamda Zator yo‘nalishidagi safarlarni qamrab oladi. Vonco Partners Uber, Bolt va Free Now mavjudligini tasdiqlaydi, hisob sozlamalari esa menejer bilan alohida kelishiladi.',
      },
      zator: {
        name: 'Zator',
        inCity: 'Zatorda',
        demandText:
          'Zator bozori mavsumiy: Energylandia va Zatorland ishlaydigan kunlarda, dam olish va bayramlarda, maktab ta’tillari hamda yozda harakat kuchayadi. Mehmonxonalar, vokzal va Osvensim hamda Krakov yo‘nalishlari ham safarlarni shakllantiradi. Uber, Bolt va Free Now mavjud.',
      },
    },
    fleetFocus:
      'Shahar uchun tejamkor gibrid va LPG avtomobillari, uzoq yo‘nalishlar uchun esa qulay mashinalar',
    seoText:
      'Vonco Partners avtomobil tanlash, hujjatlarni tayyorlash hamda ish boshlashdan oldin platformalarning joriy mavjudligi va sozlamalarini tekshirishga yordam beradi.',
    earningsText:
      'Daromad ish jadvali, mavsum, talab, faol ilovalar, komissiyalar va avtomobil xarajatlariga bog‘liq.',
  },
  kk: {
    cities: {
      'bielsko-biala': {
        name: 'Бельско-Бяла',
        inCity: 'Бельско-Бялада',
        demandText:
          'Бельско-Бяла тұрақты қалалық сапарларды тұрғын аудандар, вокзалдар, сауда және қызмет көрсету орындары арасындағы бағыттармен біріктіреді.',
      },
      gdynia: {
        name: 'Гдыня',
        inCity: 'Гдыняда',
        demandText:
          'Гдыня Үшқала ортақ аймағына кіреді. Сұранысты күнделікті сапарлар, порт, вокзал және Гданьск пен Сопот бағыттары қалыптастырады.',
      },
      sopot: {
        name: 'Сопот',
        inCity: 'Сопотта',
        demandText:
          'Сопот Үшқала аймағына кіреді, ал ең жоғары сұраныс орталықта, қонақүйлер, жағажай, вокзал маңында, іс-шаралар мен туристік маусымда байқалады.',
      },
      oswiecim: {
        name: 'Освенцим',
        inCity: 'Освенцимде',
        demandText:
          'Освенцимдегі жұмыс жергілікті тапсырыстарды және Краков пен Затор бағытындағы сапарларды қамтиды. Vonco Partners Uber, Bolt және Free Now қолжетімділігін растайды, ал аккаунт конфигурациясы менеджермен жеке келісіледі.',
      },
      zator: {
        name: 'Затор',
        inCity: 'Заторда',
        demandText:
          'Затор нарығы маусымдық: Energylandia және Zatorland жұмыс істейтін күндері, демалыс пен мерекелерде, мектеп каникулдары және жазда қозғалыс артады. Қонақүйлер, вокзал және Освенцим мен Краков бағыттары да сапарларға сұраныс қалыптастырады. Uber, Bolt және Free Now қолжетімді.',
      },
    },
    fleetFocus:
      'Қалаға арналған үнемді гибридтер мен LPG автомобильдері, ал ұзақ бағыттарға жайлы көліктер',
    seoText:
      'Vonco Partners көлік таңдауға, құжаттарды дайындауға және жұмысты бастамас бұрын платформалардың ағымдағы қолжетімділігі мен баптауларын тексеруге көмектеседі.',
    earningsText:
      'Табыс кестеге, маусымға, сұранысқа, белсенді қолданбаларға, комиссияларға және көлік шығындарына байланысты.',
  },
  az: {
    cities: {
      'bielsko-biala': {
        name: 'Belsko-Byala',
        inCity: 'Belsko-Byalada',
        demandText:
          'Belsko-Byala müntəzəm şəhər səfərlərini yaşayış rayonları, vağzallar, ticarət və xidmət məntəqələri arasındakı marşrutlarla birləşdirir.',
      },
      gdynia: {
        name: 'Qdınya',
        inCity: 'Qdınya şəhərində',
        demandText:
          'Qdınya Üçşəhər ümumi zonasına daxildir. Tələbat gündəlik səfərlər, liman, vağzal və Qdansk ilə Sopot istiqamətləri hesabına formalaşır.',
      },
      sopot: {
        name: 'Sopot',
        inCity: 'Sopotda',
        demandText:
          'Sopot Üçşəhər zonasının bir hissəsidir; ən yüksək tələbat mərkəzdə, hotellər, çimərlik və vağzal yaxınlığında, tədbirlər və turizm mövsümündə yaranır.',
      },
      oswiecim: {
        name: 'Osvensim',
        inCity: 'Osvensimdə',
        demandText:
          'Osvensimdə iş yerli sifarişləri və Krakovla Zator istiqamətində səfərləri əhatə edir. Vonco Partners Uber, Bolt və Free Now xidmətlərinin mövcudluğunu təsdiqləyir, hesabın düzgün qurulması isə menecerlə fərdi qaydada razılaşdırılır.',
      },
      zator: {
        name: 'Zator',
        inCity: 'Zatorda',
        demandText:
          'Zator bazarı mövsümidir: Energylandia və Zatorland-ın iş günlərində, həftəsonu, bayramlarda, məktəb tətillərində və yayda hərəkət artır. Yerləşmə obyektləri, vağzal, Osvensim və Krakov istiqamətləri də səfərlər yaradır. Uber, Bolt və Free Now mövcuddur.',
      },
    },
    fleetFocus:
      'Şəhər işi üçün qənaətcil hibrid və LPG avtomobilləri, uzun marşrutlar üçün isə rahat maşınlar',
    seoText:
      'Vonco Partners avtomobil seçməyə, sənədləri hazırlamağa və işə başlamazdan əvvəl platformaların cari əlçatanlığını və ayarlarını yoxlamağa kömək edir.',
    earningsText:
      'Gəlir iş qrafiki, mövsüm, tələbat, aktiv tətbiqlər, komissiyalar və avtomobil xərclərindən asılıdır.',
  },
  tg: {
    cities: {
      'bielsko-biala': {
        name: 'Белско-Бяла',
        inCity: 'дар Белско-Бяла',
        demandText:
          'Белско-Бяла сафарҳои мунтазами шаҳриро бо хатсайрҳои байни маҳаллаҳо, истгоҳҳо, марказҳои савдо ва хизматрасонӣ муттаҳид мекунад.',
      },
      gdynia: {
        name: 'Гдиня',
        inCity: 'дар Гдиня',
        demandText:
          'Гдиня ба минтақаи ягонаи Труймясто дохил мешавад. Талаботро сафарҳои ҳаррӯза, бандар, истгоҳ ва хатсайрҳо ба Гданск ва Сопот ташкил медиҳанд.',
      },
      sopot: {
        name: 'Сопот',
        inCity: 'дар Сопот',
        demandText:
          'Сопот қисми минтақаи Труймясто аст; талаботи баландтарин дар марказ, назди меҳмонхонаҳо, соҳил, истгоҳ, ҳангоми чорабиниҳо ва мавсими сайёҳӣ ба вуҷуд меояд.',
      },
      oswiecim: {
        name: 'Освенцим',
        inCity: 'дар Освенцим',
        demandText:
          'Кор дар Освенцим фармоишҳои маҳаллӣ ва сафарҳо ба Кракову Заторро дар бар мегирад. Vonco Partners дастрасии Uber, Bolt ва Free Now-ро тасдиқ мекунад, танзими ҳисоб бошад бо менеджер алоҳида мувофиқа мешавад.',
      },
      zator: {
        name: 'Затор',
        inCity: 'дар Затор',
        demandText:
          'Бозори Затор мавсимӣ аст: ҳаракат дар рӯзҳои кори Energylandia ва Zatorland, рӯзҳои истироҳат, идҳо, таътили мактабӣ ва тобистон меафзояд. Ҷойҳои истиқомат, истгоҳ ва хатсайрҳо ба Освенциму Краков низ сафарҳоро ба вуҷуд меоранд. Uber, Bolt ва Free Now дастрасанд.',
      },
    },
    fleetFocus:
      'Гибридҳо ва мошинҳои LPG-и каммасраф барои шаҳр, инчунин автомобилҳои бароҳат барои хатсайрҳои дароз',
    seoText:
      'Vonco Partners барои интихоби мошин, омода кардани ҳуҷҷатҳо ва санҷидани дастрасӣ ва танзимоти ҷории платформаҳо пеш аз оғоз кӯмак мекунад.',
    earningsText:
      'Даромад аз ҷадвал, мавсим, талабот, барномаҳои фаъол, комиссияҳо ва хароҷоти мошин вобаста аст.',
  },
};

export const SUPPLEMENTAL_CITY_CONTENT: Record<
  string,
  Partial<Record<string, CityContent>>
> = {};

for (const [locale, pack] of Object.entries(PACKS)) {
  for (const [slug, city] of Object.entries(pack.cities) as [
    CitySlug,
    LocalePack['cities'][CitySlug],
  ][]) {
    SUPPLEMENTAL_CITY_CONTENT[slug] ??= {};
    SUPPLEMENTAL_CITY_CONTENT[slug][locale] = {
      ...city,
      ...CITY_FACTS[slug],
      fleetFocus: pack.fleetFocus,
      seoText: pack.seoText,
      earningsText: pack.earningsText,
    };
  }
}
