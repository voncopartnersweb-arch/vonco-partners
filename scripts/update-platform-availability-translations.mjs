import fs from 'node:fs';
import path from 'node:path';

const translations = {
  uk: {
    title: 'Доступність платформи',
    text: 'Офіційні відкриті джерела наразі не підтверджують локальне покриття {appName} у місті {cityLabel}. Сторінка містить інформацію про підготовку до роботи; перед реєстрацією менеджер перевірить актуальні можливості або найближчу робочу зону.',
  },
  pl: {
    title: 'Dostępność platformy',
    text: 'Oficjalne źródła publiczne nie potwierdzają obecnie lokalnego zasięgu {appName} w mieście {cityLabel}. Strona opisuje przygotowanie do pracy; przed rejestracją manager sprawdzi aktualne możliwości lub najbliższą aktywną strefę.',
  },
  en: {
    title: 'Platform availability',
    text: 'Official public sources do not currently confirm local {appName} coverage in {cityLabel}. This page explains how to prepare; before registration, a manager will verify current options or the nearest active work area.',
  },
  ru: {
    title: 'Доступность платформы',
    text: 'Официальные открытые источники пока не подтверждают локальное покрытие {appName} в городе {cityLabel}. Страница описывает подготовку к работе; перед регистрацией менеджер проверит актуальные возможности или ближайшую активную зону.',
  },
  es: {
    title: 'Disponibilidad de la plataforma',
    text: 'Las fuentes públicas oficiales no confirman actualmente la cobertura local de {appName} en {cityLabel}. Esta página explica la preparación; antes del registro, un gerente comprobará las opciones actuales o la zona activa más cercana.',
  },
  hy: {
    title: 'Հարթակի հասանելիություն',
    text: 'Պաշտոնական բաց աղբյուրները ներկայում չեն հաստատում {appName}-ի տեղական հասանելիությունը {cityLabel}-ում։ Էջը ներկայացնում է աշխատանքի նախապատրաստումը, իսկ գրանցումից առաջ մենեջերը կստուգի ընթացիկ տարբերակները կամ մոտակա ակտիվ գոտին։',
  },
  be: {
    title: 'Даступнасць платформы',
    text: 'Афіцыйныя адкрытыя крыніцы пакуль не пацвярджаюць лакальнае пакрыццё {appName} у горадзе {cityLabel}. Старонка апісвае падрыхтоўку да працы; перад рэгістрацыяй менеджар праверыць актуальныя магчымасці або бліжэйшую актыўную зону.',
  },
  ro: {
    title: 'Disponibilitatea platformei',
    text: 'Sursele publice oficiale nu confirmă în prezent acoperirea locală {appName} în {cityLabel}. Pagina explică pregătirea pentru lucru; înainte de înregistrare, un manager va verifica opțiunile actuale sau cea mai apropiată zonă activă.',
  },
  ka: {
    title: 'პლატფორმის ხელმისაწვდომობა',
    text: 'ოფიციალური ღია წყაროები ამჟამად არ ადასტურებს {appName}-ის ადგილობრივ დაფარვას ქალაქ {cityLabel}-ში. გვერდი აღწერს მომზადებას; რეგისტრაციამდე მენეჯერი გადაამოწმებს მიმდინარე შესაძლებლობებს ან უახლოეს აქტიურ ზონას.',
  },
  uz: {
    title: 'Platforma mavjudligi',
    text: 'Rasmiy ochiq manbalar hozircha {cityLabel} shahrida {appName} mahalliy qamrovini tasdiqlamaydi. Sahifa ishga tayyorgarlikni tushuntiradi; ro‘yxatdan oldin menejer joriy imkoniyatlar yoki eng yaqin faol hududni tekshiradi.',
  },
  kk: {
    title: 'Платформаның қолжетімділігі',
    text: 'Ресми ашық дереккөздер қазір {cityLabel} қаласында {appName} жергілікті қамтуын растамайды. Бұл бет жұмысқа дайындықты түсіндіреді; тіркелу алдында менеджер ағымдағы мүмкіндіктерді немесе ең жақын белсенді аймақты тексереді.',
  },
  az: {
    title: 'Platformanın əlçatanlığı',
    text: 'Rəsmi açıq mənbələr hazırda {cityLabel} şəhərində {appName} yerli əhatəsini təsdiqləmir. Səhifə işə hazırlığı izah edir; qeydiyyatdan əvvəl menecer cari imkanları və ya ən yaxın aktiv zonanı yoxlayacaq.',
  },
  tg: {
    title: 'Дастрасии платформа',
    text: 'Манбаъҳои расмии кушода ҳоло фарогирии маҳаллии {appName}-ро дар шаҳри {cityLabel} тасдиқ намекунанд. Саҳифа омодагӣ ба корро шарҳ медиҳад; пеш аз бақайдгирӣ менеҷер имкониятҳои ҷорӣ ё минтақаи фаъоли наздиктаринро месанҷад.',
  },
};

for (const [locale, copy] of Object.entries(translations)) {
  const file = path.join('messages', `${locale}.json`);
  const messages = JSON.parse(fs.readFileSync(file, 'utf8'));
  messages.CitiesPage.cityApp.availabilityTitle = copy.title;
  messages.CitiesPage.cityApp.availabilityUnconfirmed = copy.text;
  fs.writeFileSync(file, `${JSON.stringify(messages, null, 2)}\n`);
}
