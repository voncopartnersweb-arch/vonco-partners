# Детальний план реалізації SEO та доопрацювань Vonco Partners

Дата аналізу: 2026-07-15  
Проєкт: `vonco_partners`  
Джерело вимог: `SEO_и_доработки_Vonco_Partners.docx.pdf` (9 сторінок)

## Статус реалізації на 2026-07-15

Реалізовано в репозиторії:

- централізовані title/description без дублю бренду;
- видалення змішаних meta keywords і структурована локалізація цін авто;
- canonical LocalBusiness `@id`, повна business schema, FAQ/Breadcrumb/Article schema;
- контроль indexable locale/platform на рівні міста та коректний sitemap;
- breadcrumbs для вкладених SEO-сторінок;
- `/vykup-avto`, розширений `/cars`, Бельсько-Бяла та Гдиня;
- `/blog`, перша стаття чотирма мовами та Article schema;
- consent-aware GTM loader і conversion events;
- автоматичний `seo:audit` для фактичного production HTML;
- виправлення redirect loop default-польської версії;
- lint, i18n audit, build, runtime SEO audit і browser verification.

Залишаються зовнішні або контентні дії, які не можна завершити лише кодом:

- GTM ID `GTM-MN3FS6B8` уже підключено; після створення GA4 додати Google tag, опублікувати контейнер і перевірити його в GTM Preview/GA4 DebugView;
- провести GSC URL Inspection, повторно подати sitemap і зафіксувати причини індексації `/ru`;
- ролі двох Telegram-каналів уже уточнено; юридичну адресу в Katowice підтверджено як основну для LocalBusiness;
- підготувати наступні статті, переклади нових міст для решти 9 мов і унікальні platform pages;
- системно збирати Google-відгуки та вести GoWork.pl.

## 1. Мета документа

Цей план зіставляє вимоги з PDF з фактичним станом репозиторію та перетворює їх на послідовний backlog для розробника, SEO-фахівця, контент-команди й власника бізнесу.

План не пропонує повторно реалізовувати те, що вже є в коді. Для кожного напряму нижче вказані:

- поточний стан;
- потрібні зміни;
- файли й модулі, яких торкнеться реалізація;
- залежності від бізнесу або зовнішніх сервісів;
- критерії приймання;
- рекомендована черговість.

## 2. Що було перевірено

### 2.1. Код і архітектура

- Next.js 16.1.6, React 19.2.4, App Router, TypeScript.
- 13 локалей через `next-intl`: `uk`, `pl`, `en`, `ru`, `es`, `hy`, `be`, `ro`, `ka`, `uz`, `kk`, `az`, `tg`.
- Польська є мовою за замовчуванням і працює без префікса; інші мови мають префікс.
- Основні маршрути: головна, авто, картка авто, міста, місто, місто + платформа, робота, послуги, контакти, про компанію, privacy policy.
- Дані автопарку зберігаються в `data/cars.tsx`, міста й платформи - у `data/landingPages.ts`, бізнес-дані - у `data/company.ts`.
- Переклади зберігаються у `messages/*.json`.
- Відгуки Google завантажуються через Places API та кешуються на 24 години.
- На сайті підключені Vercel Analytics і Speed Insights, але GA4/GTM не підключені.
- Форма заявки відкриває поштовий клієнт через `mailto:`; серверного збереження ліда немає.

### 2.2. Фактичний HTML локального production build

Перевірено HTML маршрутів `/ru`, `/ru/about`, `/ru/contacts`, `/ru/cities`, `/ru/cities/katowice`, `/ru/cities/katowice/uber`, `/ru/cars`, `/ru/cars/tesla-model-3`, а також `/robots.txt` і `/sitemap.xml`.

Підтверджено:

- canonical присутній і self-referencing;
- `hreflang` присутній для всіх 13 мов плюс `x-default`;
- sitemap містить мовні альтернативи;
- FAQPage уже є на головній та інших релевантних сторінках;
- structured data уже частково реалізована;
- дублювання `Vonco Partners` у title досі є на `/cities` та сторінках `місто/платформа`;
- на `/about` і `/contacts` бренд не дублюється буквально, але шаблон title додає його до заголовка, який уже містить бренд за змістом;
- Open Graph title не отримує другий суфікс у фактичному HTML, тому окремий OG-фікс потрібен лише як частина централізації метаданих;
- російська головна має українські keywords;
- `тиждень` присутній у видимому тексті та metadata карток авто всіх локалей;
- `/ru/cars` має близько 80 слів основного контенту замість рекомендованих 800+;
- `/ru/cities/katowice` має близько 367 слів, а `/ru/cities/katowice/uber` - близько 330 слів, тобто вони коротші за вимогу 500-900 слів;
- форма заявки вже є на головній одразу після блоку "Як це працює", тому задача "додати форму/CTA на головну" не є новою розробкою;
- build, lint та i18n audit проходять успішно.

## 3. Матриця вимог: PDF проти поточного коду

| Вимога з PDF | Фактичний стан | Рішення |
|---|---|---|
| Усунути дубль бренду в title | Не виконано повністю | P0: централізувати побудову title |
| Додати `hreflang` | Уже виконано | Не переписувати; додати автоматичний тест |
| Перевірити canonical | Уже виконано | Залишити; покрити тестом |
| Перевірити robots і sitemap | Уже реалізовано | P0: перевірити live/GSC, виправити генерацію дат і склад URL |
| LocalBusiness JSON-LD | Є часткова вкладена схема | P0: створити одну повну canonical-сутність з `@id` |
| FAQPage на головній | Уже виконано | Лише валідація й синхронізація з видимим FAQ |
| Виправити українські keywords | Не виконано | P0: видалити застарілі keywords або локалізувати, якщо бізнес наполягає |
| Прибрати `тиждень` з RU-карток | Не виконано; значення зашите в загальних даних | P0: відокремити числову ціну/період від локалізованого підпису |
| Додати Бельсько-Бялу та Гдиню | Не виконано | P1: окремі змістовні city pages |
| Додати Освенцим і Затор | Реалізовано для `pl/en/uk/ru` | Додано підтверджені правила Bolt і Uber; platform pages залишено неіндексованими до появи окремого контенту |
| Створити `/vykup-avto` | Не виконано | P1: окрема посадкова сторінка |
| Розширити `/cars` до 800+ слів | Не виконано | P1: гайд вибору, порівняння й FAQ |
| Хлібні крихти | JSON-LD є лише на city/app, видимого UI немає | P1: спільний UI + BreadcrumbList для вкладених сторінок |
| Показати більше Google-відгуків | Реалізовано показ усіх 5 оцінок, які повертає Places API; 2 мають текст, 3 містять рейтинг та автора | Після deployment перевірити production API та продовжити процес збору відгуків |
| Перевірити CTA на головній | Форма вже присутня | Залишити, додати anchor CTA й аналітику |
| Прибрати плутанину з двома Telegram | Уточнено ролі каналів | Основний контакт: `@vonco_partners`; публічна група: `@voncopartnerstelegram`, може залишатися додатковим каналом або бути прибрана |
| Створити блог | Не виконано | P2: `/blog` і `/blog/[slug]` з локалізованим контентом |
| GA4/GTM та conversion events | Не виконано | P1: consent-aware GTM/GA4 та події |
| Перевірити слабку індексацію `/ru` | З коду прямої причини не видно | P0: аудит GSC, live headers, URL Inspection і sitemap processing |

## 4. Ключові технічні висновки

### 4.1. Причина дублювання title

У `app/[lang]/layout.tsx` використовується глобальний шаблон:

```ts
title: {
  default: t('title'),
  template: `%s | Vonco Partners`,
}
```

Частина дочірніх `seoTitle` у `messages/*.json` уже закінчується на `| Vonco Partners`. Через це Next.js додає бренд повторно. Наприклад, фактичний title `/ru/cities`:

`Города для работы водителем такси в Польше | Vonco Partners | Vonco Partners`.

Окремо є проблема довжини: фактичні RU title мають приблизно 63-91 символ, зокрема city/app - 91 символ.

### 4.2. Hreflang уже працює

`lib/seo.ts` формує 13 локалізованих альтернатив та `x-default`. Вони присутні і в `<head>`, і в sitemap. Це треба зберегти. Замість повторної реалізації потрібен regression test, який перевірить:

- взаємність мовних альтернатив;
- правильний default `/` для польської;
- відсутність альтернатив на URL, де переклад/сторінка ще не готові до індексації.

### 4.3. Sitemap зараз будує декартовий добуток

`app/sitemap.ts` створює всі комбінації `CITY_PAGES x APP_PAGES x SUPPORTED_LOCALES`. Це зручно технічно, але суперечить правилу з PDF "не створювати сторінки-пустишки". Після додавання нового міста поточний код автоматично опублікує три платформні сторінки для всіх 13 мов, навіть якщо унікальний контент ще не готовий.

Потрібно перейти від глобального `APP_PAGES` для кожного міста до конфігурації доступних та індексованих платформ на рівні міста.

### 4.4. Structured data існує, але сутності фрагментовані

У layout є `WebSite`, `TaxiService` і вкладений `LocalBusiness`; у блоці відгуків може з'явитися ще один окремий `LocalBusiness`. Поточна бізнес-сутність:

- не має єдиного стабільного `@id`;
- не містить усіх восьми міст;
- використовує реєстраційну адресу в одному місці, хоча PDF пропонує операційний офіс;
- не містить повного набору `legalName`, `email`, `geo`, `areaServed`, `sameAs` в одній сутності;
- включає обидва Telegram URL без підтвердження їхніх ролей.

Потрібна одна canonical-сутність і посилання на неї з Service/Review схем через `@id`.

### 4.5. Локалізація автопарку структурно неправильна

`data/cars.tsx` містить готові рядки на кшталт `1100 zł / 1000 zł (тиждень)` та `від 140 000 zł`. Ці значення виводяться в усіх мовних версіях і потрапляють у description, OG та видимий текст.

Правильна модель:

- у даних зберігати числа, валюту й тип тарифу;
- період, `від`, роздільники та пояснення формувати через локалізатор;
- якщо два числа означають різні умови, дати їм явні поля й підписи, а не показувати незрозуміле `A / B`.

### 4.6. Аналітика не покриває вимоги PDF

Vercel Analytics дає базовий traffic insight, але не замінює GA4/GTM і не має потрібної схеми подій. Cookie banner уже зберігає `all` або `essential`, однак не керує завантаженням маркетингових/аналітичних скриптів. GA4/GTM треба підключати тільки після згоди і синхронізувати з Google Consent Mode v2.

## 5. Рішення, які треба отримати до розробки

### Від власника бізнесу

1. Яку адресу вважати основною для LocalBusiness:
   - операційний офіс: Obrzeżna Północna 13, 41-400 Mysłowice;
   - юридичну адресу: ul. Mikołaja Kopernika 8/6, 40-064 Katowice.
2. Що означають дві ціни оренди в `rentPrice` і який підпис має бути біля кожної.
3. Який Telegram є основним, а яка роль другого каналу/групи.
4. Підтвердити реальні умови програми викупу, особливо формулювання "без першого внеску".
5. Надати реальні дані для кожного нового міста: діапазон заробітку, зони попиту, сезонність, рекомендовані авто, контакт/маршрутизація.
6. Надати реальні фото автопарку, офісу й водіїв для landing pages та блогу.
7. Підтвердити, чи форма має й надалі працювати через `mailto:`, чи ліди треба зберігати/відправляти через backend/CRM.

### Від SEO/маркетингу

1. Доступ до Google Search Console та список verified properties.
2. Доступ або container ID Google Tag Manager і measurement ID GA4.
3. Повний файл семантичного ядра на 25 запитів, згаданий у PDF, але не наданий разом із документом.
4. Код-пакет `vonco-seo-code/`, згаданий у PDF, якщо його треба використати буквально.
5. Підтверджений список індексованих мов на момент запуску нового контенту.
6. Baseline: clicks, impressions, indexed pages, conversions і branded/non-branded queries за останні 3 місяці.

## 6. Етап 0 - baseline і захист від регресій

Термін: 0.5-1 робочий день розробника плюс доступ SEO-фахівця до GSC.

### 6.1. Зафіксувати стартові метрики

- Експортувати з GSC Page indexing окремо для `/ru/`, `/en/` і польських URL без префікса.
- Перевірити URL Inspection для щонайменше:
  - `/ru`;
  - `/ru/cities`;
  - `/ru/cities/katowice`;
  - `/ru/cities/katowice/uber`;
  - еквівалентних `/en/...` URL.
- Зафіксувати причини виключення: crawled/discovered not indexed, duplicate, canonical mismatch, blocked, soft 404.
- Перевірити статус читання sitemap та дату останнього успішного завантаження.
- Зберегти baseline органічного трафіку й конверсій.

### 6.2. Додати технічний SEO audit script

Новий рекомендований файл: `scripts/seo-audit.mjs`.

Скрипт після production build має перевіряти вибірку URL на:

- рівно один title;
- відсутність повтору `Vonco Partners`;
- title бажано до 60 символів або явний allowlist для неминучих винятків;
- description у погодженому діапазоні;
- canonical;
- 13 взаємних hreflang + `x-default` лише для реально опублікованих локалей;
- один H1;
- index/follow;
- наявність валідного JSON-LD;
- відсутність змішаних мов у критичних metadata.

Додати npm-команду `seo:audit` і запускати її після `npm run build` у CI.

### 6.3. Критерії приймання етапу 0

- Baseline GSC задокументований.
- Є machine-readable звіт до змін.
- `npm run lint`, `npm run i18n:audit`, `npm run build`, `npm run seo:audit` проходять.

## 7. Етап P0 - критичні технічні виправлення

Рекомендований термін: перший тиждень. Орієнтир: 3-5 робочих днів розробника без урахування очікування доступів і бізнес-відповідей.

### P0.1. Централізувати title та metadata

Файли:

- `lib/seo.ts`;
- `app/[lang]/layout.tsx`;
- усі `generateMetadata` в `app/[lang]/**/page.tsx`;
- `messages/*.json`;
- новий `scripts/seo-audit.mjs`.

Реалізація:

1. Додати `buildTitle(rawTitle)`:
   - нормалізувати пробіли;
   - не додавати бренд, якщо він уже є;
   - не створювати подвійний роздільник;
   - підтримати absolute title там, де Next template не повинен застосовуватися.
2. Обрати одну модель:
   - рекомендовано: translation keys не містять бренд, а `buildTitle` додає його один раз;
   - виняток: головна може мати absolute marketing title без додаткового суфікса.
3. Скоротити city та city/app title, зберігши головний запит і місто.
4. Не змінювати title і H1 одним і тим самим довгим рядком: H1 може бути природнішим і довшим за metadata title.
5. Централізувати OG/Twitter metadata helper, щоб title, description, URL та image не розходилися.
6. Додати автоматичну перевірку всіх route templates і ключових локалей.

Критерії приймання:

- у жодному фактичному `<title>` бренд не повторюється;
- `/ru/cities` і `/ru/cities/katowice/uber` мають один бренд;
- title не перевищує погоджений ліміт без documented exception;
- OG/Twitter title не містять дубля;
- title унікальні в межах sitemap.

### P0.2. Виправити мовне змішування в metadata та авто

Файли:

- `data/cars.tsx`;
- `app/[lang]/page.tsx`;
- `app/[lang]/cars/page.tsx`;
- `app/[lang]/about/page.tsx`;
- `app/[lang]/work/page.tsx`;
- `app/[lang]/cities/[city]/page.tsx`;
- `app/[lang]/cities/[city]/[app]/page.tsx`;
- `messages/*.json`.

Реалізація:

1. Прибрати текстові `rentPrice`/`price` зі спільного data layer.
2. Ввести структуровані поля, наприклад `weeklyRent`, `alternateWeeklyRent`, `buyoutPriceFrom`, `currency`.
3. Додати локалізовані formatter keys для `per week`, `from`, примітки про два тарифи.
4. Перегенерувати видимий текст і metadata description карток авто з локалізованих частин.
5. `meta keywords` рекомендовано видалити повністю, оскільки Google не використовує цей тег для ranking. Якщо SEO-фахівець вимагає лишити - зберігати keywords у локалізованих message keys.
6. Прибрати англо-польські hardcoded keywords на city pages або локалізувати їх.

Критерії приймання:

- `rg -n "тиждень|від " data/cars.tsx` не знаходить локалізованих UI-рядків;
- RU metadata й UI не містять українських слів;
- аналогічна перевірка проходить для всіх 13 мов;
- ціни залишаються фактично правильними після структурної міграції.

### P0.3. Уніфікувати LocalBusiness JSON-LD

Файли:

- `data/company.ts`;
- `app/[lang]/layout.tsx`;
- `app/[lang]/GoogleReviewsSection.tsx`;
- рекомендовано новий `lib/schema.ts` або `Components/StructuredData.tsx`.

Реалізація:

1. Після бізнес-підтвердження записати окремо `registeredAddress` і `operatingAddress`.
2. Створити одну сутність з `@id: https://vonco.partners/#localbusiness`.
3. Додати `name`, `legalName`, `url`, `image`, `telephone`, `email`, address, geo, `areaServed` для 8 міст, підтверджені `sameAs`.
4. TaxiService, Service та review/aggregateRating повинні посилатися на цю сутність через `@id`, а не створювати несумісні дублікати.
5. Не публікувати aggregateRating без live-даних.
6. Залишити FAQPage тільки там, де ті самі питання й відповіді видимі користувачу.
7. Локалізувати `name`, `serviceType` та інші user-facing поля Service schema; не залишати hardcoded English на RU/PL сторінках.

Критерії приймання:

- Rich Results Test/Schema Validator не показує errors;
- LocalBusiness має один canonical `@id`;
- адреса в schema збігається з погодженою бізнес-адресою;
- `areaServed` містить усі фактично обслуговувані міста;
- FAQ schema дослівно збігається з видимим FAQ.

### P0.4. Дослідити індексацію `/ru`, не припускаючи причину

Код уже має canonical, hreflang, index/follow і sitemap. Тому не слід робити випадкові технічні зміни без GSC evidence.

Перевірка:

1. Live URL headers і rendered HTML production, не лише локальний build.
2. Google-selected canonical проти user-declared canonical.
3. Sitemap discovery і last crawl.
4. Soft 404/low-content сигнали для коротких сторінок.
5. Чи не вважає Google 13 мовних сторінок занадто подібними або машинно перекладеними.
6. Internal links до RU pages і crawl depth.
7. Server logs/hosting analytics для Googlebot на `/ru`.
8. Після виправлень - Request Indexing лише для пріоритетних URL, а не масово без покращення контенту.

Критерії приймання:

- причина слабшої індексації задокументована кодом статусу та evidence з GSC;
- є список URL і конкретна дія для кожної групи виключень;
- sitemap повторно відправлений після релізу;
- індексація перевіряється щотижня перший місяць, потім раз на два тижні.

### P0.5. Уточнити robots/sitemap без безумовної заміни

Файли:

- `app/robots.ts`;
- `app/sitemap.ts`;
- `data/landingPages.ts`.

Реалізація:

1. Зберегти поточне `Allow: /`, host і sitemap, якщо live-версія збігається.
2. Не використовувати `new Date()` як `lastModified` для кожного URL на кожному запиті. Зберігати реальну дату оновлення контенту або прибрати поле до появи надійного джерела.
3. Генерувати тільки реально готові й indexable routes.
4. Не додавати в sitemap city/app сторінки автоматично через повний декартовий добуток.
5. Перевірити відсутність redirect URL і non-200 URL в sitemap.

Критерії приймання:

- усі sitemap URL повертають 200 і мають self-canonical;
- sitemap не містить thin/непідготовлених маршрутів;
- `lastmod` змінюється лише при реальному оновленні сторінки;
- GSC успішно обробляє sitemap без помилок.

## 8. Етап P1 - контентні landing pages і конверсія

Рекомендований термін: тижні 2-4. Орієнтир: 8-14 робочих днів розробки плюс підготовка/переклад контенту.

### P1.1. Перебудувати конфігурацію міст

Файли:

- `data/landingPages.ts`;
- `app/[lang]/cities/page.tsx`;
- `app/[lang]/cities/[city]/page.tsx`;
- `app/[lang]/cities/[city]/[app]/page.tsx`;
- `app/sitemap.ts`;
- `messages/*.json` або окремі content files.

Рекомендована модель міста:

```ts
type CityConfig = {
  slug: string;
  enabledLocales: SupportedLocale[];
  platforms: Array<'uber' | 'bolt' | 'freenow'>;
  indexablePlatformPages: Array<'uber' | 'bolt' | 'freenow'>;
  contentVersion: string;
  updatedAt: string;
};
```

Порядок:

1. Додати Бельсько-Бялу та Гдиню.
2. Спочатку опублікувати city page з унікальним контентом.
3. Platform pages вмикати тільки після готовності унікальних platform-specific секцій.
4. Освенцим і Затор додано за тією самою схемою з підтвердженими платформними нюансами.
5. `generateStaticParams`, city hub, internal links і sitemap повинні читати одну конфігурацію, щоб не розходитися.

Контент кожного міста:

- H1 із містом та головним запитом;
- 500-900 слів корисного унікального тексту;
- реалістичний діапазон заробітку з дисклеймером;
- локальні hotspots і райони;
- сезонність/особливості попиту;
- рекомендований тип авто;
- 5-8 FAQ;
- CTA до форми;
- посилання на сусідні міста й тільки готові platform pages;
- дата останньої перевірки бізнес-даних.

Критерії приймання:

- сторінки не є копією з підстановкою назви міста;
- кожна має мінімум 500 слів корисного основного контенту;
- усі цифри підтверджені бізнесом;
- жоден неготовий city/app URL не потрапляє в sitemap;
- сторінки проходять metadata, schema, mobile і accessibility перевірки.

### P1.2. Створити `/vykup-avto`

Рекомендовані файли:

- `app/[lang]/vykup-avto/page.tsx`;
- `app/[lang]/vykup-avto/VykupAuto.module.css`;
- секція перекладів `BuyoutPage` у `messages/*.json`;
- оновлення `Components/header.tsx`, `Components/footer.tsx`, `data/company.ts`, `app/sitemap.ts`.

Структура сторінки:

1. H1 і коротке підтверджене УТП.
2. Для кого програма.
3. Як працює: вибір авто, договір, платежі, перехід права власності.
4. Чітке пояснення першого внеску без двозначних обіцянок.
5. Порівняння звичайної оренди та викупу.
6. Доступні моделі або критерії доступності.
7. Повна вартість, додаткові платежі, страховка, сервіс - лише підтверджені дані.
8. FAQ.
9. CTA до заявки з preselected intent `buyout`.
10. Product/Service + FAQ + Breadcrumb schema.

Критерії приймання:

- сторінка має унікальний title/description/canonical/hreflang;
- не містить непідтвердженої обіцянки "без першого внеску";
- заявка передає intent `buyout`;
- є внутрішні посилання з `/cars`, `/services`, головної й релевантних карток авто.

### P1.3. Розширити `/cars` до повноцінного гіда

Поточний основний контент `/ru/cars` - близько 80 слів. Ціль - 800+ слів корисного матеріалу, не рахуючи header/footer.

Додати:

- як вибрати авто для Uber/Bolt/Free Now;
- economy/comfort/green/XL use cases;
- оренда проти викупу;
- витрати на паливо/заряджання без вигаданих цифр;
- кому підійде гібрид, LPG, electric;
- пояснення двох тарифів оренди;
- сервіс, документи, страхування;
- таблицю порівняння моделей;
- CTA і посилання на `/vykup-avto`;
- 5-8 FAQ.

Архітектурно великий текст краще залишити Server Component, а клієнтською зробити лише інтерактивну таблицю/фільтри. Поточний `Components/carFleet.tsx` повністю client-side; його варто розділити на server page content і невеликий client filter за потреби.

Критерії приймання:

- 800+ змістовних слів для кожної індексованої цільової локалі;
- жодної непідтвердженої ціни/умови;
- mobile table доступна й не має horizontal overflow;
- FAQ schema відповідає видимому FAQ;
- картки авто зберігають працездатність.

### P1.4. Додати breadcrumbs

Рекомендовані файли:

- новий `Components/Breadcrumbs/Breadcrumbs.tsx`;
- новий helper у `lib/schema.ts`;
- сторінки city, city/app, cars/carId, blog/article, buyout.

Вимоги:

- видимий `<nav aria-label="Breadcrumb">`;
- локалізовані назви;
- current page без клікабельного self-link;
- BreadcrumbList JSON-LD генерується з того самого масиву, що й UI;
- URL враховують default locale без `/pl`.

Критерії приймання:

- UI і JSON-LD мають однакову ієрархію;
- breadcrumbs присутні на всіх вкладених SEO-сторінках;
- keyboard і screen-reader navigation коректні.

### P1.5. Відгуки й Local SEO на сайті

Файли:

- `lib/googleReviews.ts`;
- `app/[lang]/GoogleReviewsSection.tsx`;
- стилі головної;
- за потреби новий серверний endpoint/admin sync.

Реалізація:

1. Перевірити production env `GOOGLE_MAPS_API_KEY` і `GOOGLE_PLACE_ID`.
2. Показувати до 6 доступних live-відгуків; не вважати старе число 18 константою.
3. Додати зрозумілий fallback, якщо API недоступний, без фальшивого rating schema.
4. Додати кнопку "Залишити відгук" на підтверджений review URL.
5. Не копіювати довгі Google reviews у власну базу без перевірки політик API.
6. Створити бізнес-процес запиту відгуку через 2-4 тижні співпраці.

Зовнішні задачі:

- перевірити категорії Google Business Profile;
- досягати 50+ органічно, без стимулювання/накрутки;
- створити й підтримувати профіль GoWork.pl на P2.

### P1.6. Єдина Telegram-точка входу

Після бізнес-рішення:

- залишити один primary CTA у QuickContact, SocialSection і footer;
- якщо другий URL є спільнотою для чинних водіїв, підписати його явно та не показувати як дубль primary contact;
- у `sameAs` schema включати тільки офіційні публічні профілі;
- оновити переклади всіх 13 мов.

### P1.7. CTA на головній

Оскільки форма вже є, не створювати ще одну копію. Замість цього:

- додати біля/після `HowItWorks` явну anchor-кнопку до існуючої форми;
- дати формі стабільний `id`, наприклад `driver-application`;
- передавати source/intent/city, якщо користувач прийшов з city, car або buyout page;
- показати success/failure UX, якщо форма буде переведена з `mailto:` на backend;
- додати аналітичні події.

## 9. Етап P1 - GA4/GTM і conversion tracking

Термін: 1-2 робочі дні після надання GTM/GA4 доступів; більше, якщо форма інтегрується з CRM.

### 9.1. Consent-aware інтеграція

Файли:

- `app/[lang]/layout.tsx`;
- `Components/CookieConsent/CookieConsent.tsx`;
- рекомендовано `lib/analytics.ts` і client provider.

Реалізація:

1. Додати env `NEXT_PUBLIC_GTM_ID` або `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
2. За замовчуванням встановити analytics/ad storage denied.
3. Завантажувати/активувати analytics лише після `cookie-consent=all`.
4. При decline не відправляти non-essential events.
5. Додати можливість змінити consent пізніше з privacy/cookie settings.
6. Оновити privacy policy відповідно до фактичних інструментів.

### 9.2. Події

Рекомендована event taxonomy:

| Подія | Коли | Параметри |
|---|---|---|
| `application_form_start` | Перша взаємодія з формою | `page_path`, `locale`, `source`, `intent` |
| `application_city_select` | Вибір міста | `city`, `locale`, `page_path` |
| `application_submit` | Валідна відправка | `city`, `locale`, `source`, `intent`, `transport` |
| `quick_contact_click` | Phone/Telegram/WhatsApp/SMS | `channel`, `page_path`, `locale`, `city_context` |
| `cta_click` | CTA з landing page | `cta_id`, `destination`, `page_type` |
| `city_page_engaged_120s` | 120 секунд активної взаємодії | `city`, `platform`, `locale` |
| `review_link_click` | Google review/profile click | `action`, `locale` |

Не передавати email, телефон, ім'я або інші PII в GA4/GTM.

### 9.3. Критерії приймання

- events видно в GTM Preview і GA4 DebugView;
- до consent non-essential hits не відправляються;
- після consent кожна дія відправляється один раз;
- route change у App Router не дублює page_view;
- форма не відправляє PII в analytics payload;
- конверсією позначено `application_submit`, а не простий click по кнопці.

## 10. Етап P2 - блог і довгостроковий контент

Термін: місяці 2-3. Розробка каркаса: 3-5 днів. Контент - окремий постійний процес.

### 10.1. Технічна архітектура блогу

Рекомендована структура:

```text
app/[lang]/blog/page.tsx
app/[lang]/blog/[slug]/page.tsx
content/blog/<locale>/<slug>.mdx
lib/blog.ts
```

Вимоги:

- локалізований список статей;
- `generateStaticParams` тільки для реально наявних перекладів;
- article metadata, canonical, hreflang лише між наявними відповідниками;
- Article + Breadcrumb schema;
- author/reviewer, publish date, modified date;
- related commercial links;
- CTA в кінці;
- sitemap на базі реальних content timestamps;
- draft не потрапляє в build/sitemap;
- реальні фото з описовими alt.

Якщо повна стаття відсутня певною мовою, не створювати порожній переклад і не додавати його в hreflang.

### 10.2. Черга контенту з PDF

Місяць 1:

1. Landing `/vykup-avto`.
2. "Що таке партнер Uber/Bolt і навіщо він потрібен".

Місяць 2:

1. "Оренда чи власна машина для таксі - що вигідніше".
2. "Як отримати карту побиту через роботу в таксі" - обов'язкова юридична перевірка й дисклеймер.

Місяць 3:

1. "Податки та VAT для водія таксі в Польщі" - обов'язкова перевірка бухгалтером/юристом.
2. Розширений FAQ на 15-20 реальних питань.

Вимоги до кожної статті:

- 1000-1500 змістовних слів;
- первинний запит і search intent;
- реальні фото;
- підтверджені цифри й дата актуальності;
- 2-3 внутрішні посилання на commercial pages;
- один primary CTA;
- редакторська, фактологічна й мовна перевірка;
- запит індексації після публікації пріоритетних матеріалів.

## 11. Етап P2 - Освенцим, Затор і решта city/platform coverage

Поточний статус:

1. Унікальний контент для Освенцима й Затора підготовлено для `pl/en/uk/ru` на основі даних замовника.
2. City pages додано до спільної конфігурації, sitemap і внутрішньої навігації.
3. Додано пояснення: окремі зони Bolt, спільна конфігурація Uber для Кракова/Освенцима/Затора та перемикання Uber для Закопаного.
4. Platform pages створювати лише там, де є реальна локальна специфіка.
5. Не ставити KPI "8 міст x 3 платформи" вище за якість. KPI з PDF варто трактувати як бажане покриття, а не дозвіл на 24 шаблонні сторінки.
6. Після релізу відстежувати impressions, indexing і engagement окремо для кожного template type.

## 12. Зміни форми заявки: рекомендований окремий трек

Поточна форма через `mailto:` залежить від налаштованого поштового клієнта й не дає надійного server-side success. Для SEO це не обов'язково, але для вимірювання конверсії є ризиком.

Рекомендована еволюція:

1. Створити `POST /api/leads` або Server Action.
2. Додати server-side validation, rate limiting і spam protection.
3. Відправляти lead у погоджений канал: email, CRM, Telegram bot або таблицю.
4. Повертати реальний success/error state.
5. Логувати без PII в аналітиці; PII зберігати лише в дозволеному бізнес-сховищі.
6. Додати hidden attribution: landing page, locale, city, platform, campaign UTM.
7. Лише після server success відправляти `application_submit`.

Цей трек потребує окремого рішення власника й не повинен непомітно змінювати поточний процес отримання заявок.

## 13. Порядок реалізації за pull request

Щоб зменшити ризик, не об'єднувати все в один великий PR.

1. **PR 1 - SEO tests і title helper**  
   Audit script, buildTitle, скорочені titles, metadata regression tests.
2. **PR 2 - локалізація даних авто**  
   Структуровані ціни, видалення `тиждень`, cleanup keywords.
3. **PR 3 - schema consolidation**  
   LocalBusiness `@id`, address decision, review linkage, schema validation.
4. **PR 4 - sitemap/indexable content model**  
   Per-city platforms, real lastModified, no thin URLs.
5. **PR 5 - breadcrumbs**  
   Shared UI/schema on cars, cities, platform pages.
6. **PR 6 - Bielsko-Biała і Gdynia**  
   Спочатку city pages; platform pages лише з готовим контентом.
7. **PR 7 - `/vykup-avto`**  
   Landing, CTA, schema, internal links.
8. **PR 8 - `/cars` content expansion**  
   Guide, comparison, FAQ, server/client split.
9. **PR 9 - analytics і consent**  
   GTM/GA4, event taxonomy, consent tests.
10. **PR 10 - blog foundation**  
    Blog routes, content loader, Article schema, first article.

## 14. Перевірка після кожного релізу

### Автоматично

- `npm run lint`;
- `npm run i18n:audit`;
- `npm run build`;
- `npm run seo:audit`;
- перевірка sitemap URL на 200/canonical/indexability;
- JSON-LD parse test;
- smoke tests ключових локалей;
- Lighthouse mobile для performance/SEO/accessibility.

### Вручну

- mobile/desktop visual check;
- language switcher зберігає еквівалентний path;
- Rich Results Test / Schema Validator;
- GSC URL Inspection;
- GTM Preview / GA4 DebugView;
- форма й усі quick contact channels;
- перевірка реальних цифр, адрес, телефонів і Telegram.

## 15. Definition of Done для всього проєкту

Технічна частина вважається завершеною, коли:

1. Немає дубльованих або неконтрольовано довгих title.
2. Кожна indexable сторінка має унікальні title, description, canonical і коректний hreflang.
3. Sitemap містить лише 200/indexable/canonical URL і реальні lastmod.
4. Немає змішаних мов у metadata, картках авто та schema.
5. LocalBusiness, FAQ, Breadcrumb та Article schema валідні й відповідають видимому контенту.
6. Нові city pages мають унікальний локальний матеріал, а не шаблонну підстановку міста.
7. `/cars` має 800+ слів корисного контенту; `/vykup-avto` існує й має підтверджені умови.
8. GA4/GTM події працюють лише відповідно до consent і не містять PII.
9. Lint, i18n audit, build та SEO audit проходять у CI.
10. GSC підтверджує discovery/crawl/indexing пріоритетних RU URL або дає конкретні причини, для яких заведені наступні задачі.

Бізнес/SEO частина оцінюється окремо через 4-6+ місяців:

- усі якісно опубліковані RU URL індексуються;
- органічний RU traffic зростає щонайменше на 30% від зафіксованого baseline;
- пріоритетні commercial queries рухаються до top 10;
- заявки мають вимірюваний source/city/intent;
- Google Business Profile стабільно отримує реальні відгуки;
- результати перевіряються в GSC раз на 2 тижні, GA4 - щомісяця.

## 16. Орієнтовна оцінка

| Напрям | Розробка | Контент/бізнес | Зовнішня залежність |
|---|---:|---:|---|
| Baseline + SEO audit | 0.5-1 день | 0.5 дня SEO | GSC |
| Title/metadata | 1-2 дні | редактура 13 мов | немає |
| Локалізація авто | 1-2 дні | підтвердження тарифів | власник |
| Schema consolidation | 1 день | підтвердження адреси | власник |
| Sitemap/content model | 1 день | статус готовності сторінок | SEO |
| Bielsko-Biała + Gdynia | 2-4 дні | 4-8+ днів контенту/перекладу | локальні дані |
| `/vykup-avto` | 2-3 дні | 2-4 дні контенту/legal review | умови договору |
| `/cars` expansion | 2-3 дні | 2-4 дні контенту | тарифи/фото |
| Breadcrumbs | 1-2 дні | мінімально | немає |
| GA4/GTM | 1-2 дні | 0.5 дня аналітика | IDs/access |
| Blog foundation | 3-5 днів | постійно | контент |

Сумарно для P0 + P1: приблизно 12-22 робочі дні розробки, але календарний строк залежить від швидкості підготовки унікального контенту для 13 мов і відповідей власника. Найбільший ризик строку - не код, а підтверджені локальні дані, переклади й зовнішні доступи.

## 17. Рекомендований старт

Почати з PR 1-4: title/metadata, мовні дані авто, schema і sitemap model. Ці зміни закривають підтверджені P0-проблеми й створюють безпечний фундамент. Паралельно бізнес готує рішення щодо адреси, тарифів, Telegram і контент для Бельсько-Бяли/Гдині. Після цього переходити до landing pages та GA4/GTM.
