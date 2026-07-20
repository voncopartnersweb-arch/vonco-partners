import type { SupportedLocale } from '@/lib/seo';

type PreviousProgram = {
  title: string;
  text: string;
};

export type ProgramCampaignsContent = {
  seoDescription: string;
  currentLabel: string;
  currentTitle: string;
  currentAmount: string;
  currentText: string;
  currentNote: string;
  varietyTitle: string;
  varietyIntro: string;
  previousLabel: string;
  previousPrograms: PreviousProgram[];
  fuelArchiveLabel: string;
  statusTitle: string;
  statusText: string;
};

const campaigns: Record<SupportedLocale, ProgramCampaignsContent> = {
  uk: {
    seoDescription: 'Актуальна реферальна програма 400 zł за рекомендацію друга та приклади попередніх програм підтримки водіїв Vonco Partners.',
    currentLabel: 'Діє зараз',
    currentTitle: '400 zł за рекомендацію друга',
    currentAmount: '400 zł',
    currentText: 'Запросіть друга розпочати співпрацю з Vonco Partners та отримайте реферальну винагороду. Актуальний порядок участі й нарахування винагороди менеджер підтверджує перед реєстрацією рекомендації.',
    currentNote: 'Наразі це єдина підтверджена активна акція.',
    varietyTitle: 'Різні формати підтримки водіїв',
    varietyIntro: 'Vonco Partners періодично запускає програми для нових і чинних водіїв: винагороди за результат, компенсацію витрат, стартові пільги та реферальні пропозиції. Нижче — приклади програм, які проводилися раніше.',
    previousLabel: 'Проводилося раніше · зараз не діє',
    previousPrograms: [
      { title: 'Повний бак найкращому водієві тижня', text: 'Щочетверга визначали водія з найбільшим тижневим результатом, а партнер оплачував повний бак пального.' },
      { title: 'Два тижні без комісії для нового водія', text: 'Нові водії могли розпочати співпрацю з двотижневим періодом без комісії партнера.' },
      { title: 'П’ятий тиждень оренди за рахунок партнера', text: 'У межах окремої акції партнер покривав вартість п’ятого тижня оренди автомобіля.' },
    ],
    fuelArchiveLabel: 'Попередня паливна програма · зараз не діє',
    statusTitle: 'Перевіряйте статус перед участю',
    statusText: 'Акції мають обмежений строк і можуть відрізнятися за містом, автомобілем та форматом співпраці. Зараз підтверджена програма 400 zł за рекомендацію друга; умови наступних пропозицій публікуються окремо.',
  },
  pl: {
    seoDescription: 'Aktualny program poleceń 400 zł za zaproszenie znajomego oraz przykłady wcześniejszych programów wsparcia kierowców Vonco Partners.',
    currentLabel: 'Aktywne teraz', currentTitle: '400 zł za polecenie znajomego', currentAmount: '400 zł', currentText: 'Zaproś znajomego do współpracy z Vonco Partners i odbierz premię za polecenie. Aktualne zasady udziału i naliczenia premii manager potwierdzi przed rejestracją polecenia.', currentNote: 'Obecnie jest to jedyna potwierdzona aktywna promocja.',
    varietyTitle: 'Różne formy wsparcia kierowców', varietyIntro: 'Vonco Partners okresowo uruchamia programy dla nowych i obecnych kierowców: nagrody za wyniki, pokrycie wybranych kosztów, ulgi na start i programy poleceń. Poniżej przedstawiamy przykłady wcześniejszych akcji.', previousLabel: 'Program wcześniejszy · obecnie nieaktywny',
    previousPrograms: [
      { title: 'Pełny bak dla najlepszego kierowcy tygodnia', text: 'W każdy czwartek wybierano kierowcę z najlepszym wynikiem tygodnia, a partner pokrywał koszt pełnego baku paliwa.' },
      { title: 'Dwa tygodnie bez prowizji dla nowego kierowcy', text: 'Nowi kierowcy mogli rozpocząć współpracę z dwutygodniowym okresem bez prowizji partnera.' },
      { title: 'Piąty tydzień najmu na koszt partnera', text: 'W ramach jednej z akcji partner pokrywał koszt piątego tygodnia wynajmu samochodu.' },
    ],
    fuelArchiveLabel: 'Wcześniejszy program paliwowy · obecnie nieaktywny', statusTitle: 'Sprawdź status przed udziałem', statusText: 'Promocje są ograniczone czasowo i mogą zależeć od miasta, samochodu oraz modelu współpracy. Obecnie potwierdzony jest program 400 zł za polecenie znajomego; warunki kolejnych ofert będą publikowane osobno.',
  },
  en: {
    seoDescription: 'Current PLN 400 driver referral program and examples of previous Vonco Partners driver support campaigns.',
    currentLabel: 'Active now', currentTitle: 'PLN 400 for referring a friend', currentAmount: 'PLN 400', currentText: 'Invite a friend to start working with Vonco Partners and receive a referral reward. A manager confirms the current participation and reward rules before the referral is registered.', currentNote: 'This is currently the only confirmed active promotion.',
    varietyTitle: 'Different ways we support drivers', varietyIntro: 'Vonco Partners periodically launches programs for new and existing drivers, including performance rewards, selected cost coverage, starter benefits and referral offers. Below are examples of previous campaigns.', previousLabel: 'Previous program · not currently active',
    previousPrograms: [
      { title: 'A full tank for the top driver of the week', text: 'Each Thursday, the driver with the best weekly result was selected and the partner covered a full tank of fuel.' },
      { title: 'Two commission-free weeks for a new driver', text: 'New drivers could begin their cooperation with two weeks free from the partner commission.' },
      { title: 'The fifth rental week covered by the partner', text: 'As part of a previous campaign, the partner covered the fifth week of vehicle rental.' },
    ],
    fuelArchiveLabel: 'Previous fuel program · not currently active', statusTitle: 'Check the status before joining', statusText: 'Campaigns are time-limited and may vary by city, vehicle and cooperation model. The PLN 400 friend-referral program is currently confirmed; future offers will be announced separately.',
  },
  ru: {
    seoDescription: 'Актуальная реферальная программа 400 zł за приглашённого друга и примеры прошлых программ поддержки водителей Vonco Partners.',
    currentLabel: 'Действует сейчас', currentTitle: '400 zł за рекомендацию друга', currentAmount: '400 zł', currentText: 'Пригласите друга начать сотрудничество с Vonco Partners и получите реферальное вознаграждение. Актуальный порядок участия и начисления вознаграждения менеджер подтвердит до регистрации рекомендации.', currentNote: 'Сейчас это единственная подтверждённая активная акция.',
    varietyTitle: 'Разные форматы поддержки водителей', varietyIntro: 'Vonco Partners периодически запускает программы для новых и действующих водителей: награды за результат, компенсацию отдельных расходов, стартовые льготы и реферальные предложения. Ниже приведены примеры прошлых акций.', previousLabel: 'Проводилось ранее · сейчас не действует',
    previousPrograms: [
      { title: 'Полный бак лучшему водителю недели', text: 'Каждый четверг выбирали водителя с лучшим результатом недели, а партнёр оплачивал полный бак топлива.' },
      { title: 'Две недели без комиссии для нового водителя', text: 'Новые водители могли начать сотрудничество с двухнедельным периодом без комиссии партнёра.' },
      { title: 'Пятая неделя аренды за счёт партнёра', text: 'В рамках одной из акций партнёр покрывал стоимость пятой недели аренды автомобиля.' },
    ],
    fuelArchiveLabel: 'Предыдущая топливная программа · сейчас не действует', statusTitle: 'Проверяйте статус перед участием', statusText: 'Акции ограничены по времени и могут зависеть от города, автомобиля и формата сотрудничества. Сейчас подтверждена программа 400 zł за рекомендацию друга; новые предложения будут публиковаться отдельно.',
  },
  es: {
    seoDescription: 'Programa actual de recomendación de 400 PLN y ejemplos de campañas anteriores de apoyo a conductores de Vonco Partners.',
    currentLabel: 'Activo ahora', currentTitle: '400 PLN por recomendar a un amigo', currentAmount: '400 PLN', currentText: 'Invita a un amigo a colaborar con Vonco Partners y recibe una recompensa por recomendación. Un gestor confirmará las reglas actuales antes de registrar la recomendación.', currentNote: 'Actualmente es la única promoción activa confirmada.',
    varietyTitle: 'Diferentes formas de apoyar a los conductores', varietyIntro: 'Vonco Partners organiza periódicamente programas para conductores nuevos y actuales: premios por resultados, cobertura de algunos costes, ventajas iniciales y recomendaciones. Estos son ejemplos de campañas anteriores.', previousLabel: 'Programa anterior · no está activo actualmente',
    previousPrograms: [
      { title: 'Depósito lleno para el mejor conductor de la semana', text: 'Cada jueves se elegía al conductor con el mejor resultado semanal y el socio cubría un depósito completo.' },
      { title: 'Dos semanas sin comisión para nuevos conductores', text: 'Los nuevos conductores podían empezar con dos semanas sin comisión del socio.' },
      { title: 'Quinta semana de alquiler pagada por el socio', text: 'En una campaña anterior, el socio cubría la quinta semana de alquiler del vehículo.' },
    ],
    fuelArchiveLabel: 'Programa de combustible anterior · no activo', statusTitle: 'Comprueba el estado antes de participar', statusText: 'Las campañas tienen una duración limitada y pueden variar según ciudad, vehículo y modelo de colaboración. Actualmente está confirmado el programa de 400 PLN por recomendación.',
  },
  hy: {
    seoDescription: 'Ընկերոջը հրավիրելու համար գործող 400 PLN ծրագիրը և Vonco Partners-ի վարորդների աջակցության նախկին ծրագրերի օրինակները։',
    currentLabel: 'Գործում է հիմա', currentTitle: '400 PLN՝ ընկերոջը հրավիրելու համար', currentAmount: '400 PLN', currentText: 'Հրավիրեք ընկերոջը համագործակցել Vonco Partners-ի հետ և ստացեք պարգևավճար։ Մենեջերը կհաստատի մասնակցության ընթացիկ պայմանները մինչև հրավերի գրանցումը։', currentNote: 'Ներկայումս սա միակ հաստատված գործող ակցիան է։',
    varietyTitle: 'Վարորդների աջակցության տարբեր ձևեր', varietyIntro: 'Vonco Partners-ը պարբերաբար կազմակերպում է արդյունքների պարգևներ, ծախսերի փոխհատուցում, մեկնարկային արտոնություններ և հրավերի ծրագրեր։ Ստորև նախկին ծրագրերի օրինակներ են։', previousLabel: 'Նախկին ծրագիր · այժմ չի գործում',
    previousPrograms: [
      { title: 'Լի բաք՝ շաբաթվա լավագույն վարորդին', text: 'Ամեն հինգշաբթի ընտրվում էր շաբաթվա լավագույն արդյունք գրանցած վարորդը, և գործընկերը վճարում էր լի բաքի համար։' },
      { title: 'Երկու շաբաթ առանց միջնորդավճարի', text: 'Նոր վարորդները կարող էին սկսել երկու շաբաթ առանց գործընկերոջ միջնորդավճարի։' },
      { title: 'Վարձակալության հինգերորդ շաբաթը՝ գործընկերոջ հաշվին', text: 'Նախկին ակցիայի ընթացքում գործընկերը վճարում էր մեքենայի վարձակալության հինգերորդ շաբաթը։' },
    ],
    fuelArchiveLabel: 'Նախկին վառելիքային ծրագիր · այժմ չի գործում', statusTitle: 'Մասնակցելուց առաջ ստուգեք կարգավիճակը', statusText: 'Ակցիաները ժամանակավոր են և կարող են կախված լինել քաղաքից, մեքենայից ու համագործակցության ձևից։ Այժմ հաստատված է ընկերոջ հրավերի 400 PLN ծրագիրը։',
  },
  be: {
    seoDescription: 'Актуальная праграма 400 PLN за рэкамендацыю сябра і прыклады папярэдніх праграм падтрымкі кіроўцаў Vonco Partners.',
    currentLabel: 'Дзейнічае цяпер', currentTitle: '400 PLN за рэкамендацыю сябра', currentAmount: '400 PLN', currentText: 'Запрасіце сябра да супрацоўніцтва з Vonco Partners і атрымайце ўзнагароду. Менеджар пацвердзіць актуальныя правілы перад рэгістрацыяй рэкамендацыі.', currentNote: 'Цяпер гэта адзіная пацверджаная актыўная акцыя.',
    varietyTitle: 'Розныя формы падтрымкі кіроўцаў', varietyIntro: 'Vonco Partners перыядычна запускае ўзнагароды за вынікі, кампенсацыю асобных выдаткаў, стартавыя льготы і рэферальныя праграмы. Ніжэй — прыклады мінулых акцый.', previousLabel: 'Папярэдняя праграма · цяпер не дзейнічае',
    previousPrograms: [
      { title: 'Поўны бак лепшаму кіроўцу тыдня', text: 'Кожны чацвер выбіралі кіроўцу з найлепшым вынікам тыдня, а партнёр аплачваў поўны бак.' },
      { title: 'Два тыдні без камісіі для новага кіроўцы', text: 'Новыя кіроўцы маглі пачаць працу з двух тыдняў без камісіі партнёра.' },
      { title: 'Пяты тыдзень арэнды за кошт партнёра', text: 'У межах папярэдняй акцыі партнёр аплачваў пяты тыдзень арэнды аўтамабіля.' },
    ],
    fuelArchiveLabel: 'Папярэдняя паліўная праграма · цяпер не дзейнічае', statusTitle: 'Правярайце статус перад удзелам', statusText: 'Акцыі абмежаваныя ў часе і могуць залежаць ад горада, аўтамабіля і фармату працы. Цяпер пацверджана праграма 400 PLN за рэкамендацыю сябра.',
  },
  ro: {
    seoDescription: 'Programul actual de recomandare de 400 PLN și exemple de campanii anterioare de sprijin pentru șoferii Vonco Partners.',
    currentLabel: 'Activ acum', currentTitle: '400 PLN pentru recomandarea unui prieten', currentAmount: '400 PLN', currentText: 'Invită un prieten să colaboreze cu Vonco Partners și primește o recompensă de recomandare. Managerul confirmă regulile actuale înainte de înregistrare.', currentNote: 'În prezent, aceasta este singura promoție activă confirmată.',
    varietyTitle: 'Diferite forme de sprijin pentru șoferi', varietyIntro: 'Vonco Partners lansează periodic premii pentru rezultate, acoperirea unor costuri, beneficii de început și programe de recomandare. Mai jos sunt exemple de campanii anterioare.', previousLabel: 'Program anterior · momentan inactiv',
    previousPrograms: [
      { title: 'Un plin pentru cel mai bun șofer al săptămânii', text: 'În fiecare joi era ales șoferul cu cel mai bun rezultat săptămânal, iar partenerul acoperea un plin de combustibil.' },
      { title: 'Două săptămâni fără comision pentru șoferii noi', text: 'Șoferii noi puteau începe cu două săptămâni fără comisionul partenerului.' },
      { title: 'A cincea săptămână de închiriere plătită de partener', text: 'Într-o campanie anterioară, partenerul acoperea a cincea săptămână de închiriere.' },
    ],
    fuelArchiveLabel: 'Program anterior de combustibil · inactiv', statusTitle: 'Verifică statutul înainte de participare', statusText: 'Campaniile sunt limitate în timp și pot varia după oraș, vehicul și modelul de colaborare. Programul de 400 PLN pentru recomandarea unui prieten este confirmat în prezent.',
  },
  ka: {
    seoDescription: 'მეგობრის მოწვევისთვის მოქმედი 400 PLN პროგრამა და Vonco Partners-ის მძღოლთა წინა მხარდამჭერი კამპანიების მაგალითები.',
    currentLabel: 'მოქმედებს ახლა', currentTitle: '400 PLN მეგობრის რეკომენდაციისთვის', currentAmount: '400 PLN', currentText: 'მოიწვიეთ მეგობარი Vonco Partners-თან თანამშრომლობის დასაწყებად და მიიღეთ სარეფერალო ჯილდო. მენეჯერი რეგისტრაციამდე დაადასტურებს მოქმედ წესებს.', currentNote: 'ამჟამად ეს ერთადერთი დადასტურებული აქტიური აქციაა.',
    varietyTitle: 'მძღოლების მხარდაჭერის სხვადასხვა ფორმა', varietyIntro: 'Vonco Partners პერიოდულად მართავს შედეგების ჯილდოებს, ხარჯების ანაზღაურებას, საწყის შეღავათებსა და სარეფერალო პროგრამებს. ქვემოთ წინა კამპანიების მაგალითებია.', previousLabel: 'წინა პროგრამა · ახლა არ მოქმედებს',
    previousPrograms: [
      { title: 'სრული ავზი კვირის საუკეთესო მძღოლს', text: 'ყოველ ხუთშაბათს ირჩევდნენ კვირის საუკეთესო შედეგის მქონე მძღოლს და პარტნიორი სრულ ავზს აფინანსებდა.' },
      { title: 'ორი კვირა საკომისიოს გარეშე ახალი მძღოლისთვის', text: 'ახალ მძღოლებს შეეძლოთ ორი კვირა პარტნიორის საკომისიოს გარეშე დაეწყოთ.' },
      { title: 'ქირაობის მეხუთე კვირა პარტნიორის ხარჯზე', text: 'წინა აქციის ფარგლებში პარტნიორი ავტომობილის ქირაობის მეხუთე კვირას აფინანსებდა.' },
    ],
    fuelArchiveLabel: 'წინა საწვავის პროგრამა · ახლა არ მოქმედებს', statusTitle: 'მონაწილეობამდე გადაამოწმეთ სტატუსი', statusText: 'აქციები დროებითია და შეიძლება განსხვავდებოდეს ქალაქის, ავტომობილისა და თანამშრომლობის ფორმის მიხედვით. ამჟამად დადასტურებულია 400 PLN მეგობრის რეკომენდაციის პროგრამა.',
  },
  uz: {
    seoDescription: 'Do‘stni tavsiya qilish uchun amaldagi 400 PLN dasturi va Vonco Partners haydovchilari uchun oldingi yordam aksiyalari misollari.',
    currentLabel: 'Hozir amal qiladi', currentTitle: 'Do‘stni tavsiya qilish uchun 400 PLN', currentAmount: '400 PLN', currentText: 'Do‘stingizni Vonco Partners bilan hamkorlikka taklif qiling va mukofot oling. Menejer tavsiyani ro‘yxatdan o‘tkazishdan oldin amaldagi qoidalarni tasdiqlaydi.', currentNote: 'Hozirda bu yagona tasdiqlangan faol aksiya.',
    varietyTitle: 'Haydovchilarni qo‘llab-quvvatlashning turli shakllari', varietyIntro: 'Vonco Partners vaqti-vaqti bilan natija uchun mukofotlar, ayrim xarajatlarni qoplash, boshlang‘ich imtiyozlar va tavsiya dasturlarini o‘tkazadi. Quyida oldingi aksiyalar misollari.', previousLabel: 'Oldingi dastur · hozir faol emas',
    previousPrograms: [
      { title: 'Haftaning eng yaxshi haydovchisiga to‘liq bak', text: 'Har payshanba haftaning eng yaxshi natijasiga erishgan haydovchi tanlanib, hamkor to‘liq bak xarajatini qoplagan.' },
      { title: 'Yangi haydovchi uchun ikki hafta komissiyasiz', text: 'Yangi haydovchilar hamkor komissiyasisiz ikki hafta ish boshlashi mumkin edi.' },
      { title: 'Ijara beshinchi haftasi hamkor hisobidan', text: 'Oldingi aksiya doirasida hamkor avtomobil ijarasining beshinchi haftasini qoplagan.' },
    ],
    fuelArchiveLabel: 'Oldingi yonilg‘i dasturi · hozir faol emas', statusTitle: 'Qatnashishdan oldin holatini tekshiring', statusText: 'Aksiyalar vaqt bilan cheklangan va shahar, avtomobil hamda hamkorlik turiga qarab farq qilishi mumkin. Hozir 400 PLN do‘stni tavsiya qilish dasturi tasdiqlangan.',
  },
  kk: {
    seoDescription: 'Дос ұсынғаны үшін қолданыстағы 400 PLN бағдарламасы және Vonco Partners жүргізушілерін қолдаудың бұрынғы акцияларының мысалдары.',
    currentLabel: 'Қазір қолданыста', currentTitle: 'Дос ұсынғаны үшін 400 PLN', currentAmount: '400 PLN', currentText: 'Досыңызды Vonco Partners-пен жұмыс істеуге шақырып, сыйақы алыңыз. Менеджер ұсынысты тіркеу алдында қолданыстағы ережелерді растайды.', currentNote: 'Қазір бұл жалғыз расталған белсенді акция.',
    varietyTitle: 'Жүргізушілерді қолдаудың әртүрлі түрлері', varietyIntro: 'Vonco Partners мерзімді түрде нәтиже үшін сыйақы, жекелеген шығындарды өтеу, бастапқы жеңілдіктер және ұсыныс бағдарламаларын өткізеді. Төменде бұрынғы акциялардың мысалдары.', previousLabel: 'Бұрынғы бағдарлама · қазір белсенді емес',
    previousPrograms: [
      { title: 'Аптаның үздік жүргізушісіне толық бак', text: 'Әр бейсенбіде аптаның үздік нәтижесін көрсеткен жүргізуші таңдалып, серіктес толық бак құнын өтеген.' },
      { title: 'Жаңа жүргізушіге екі апта комиссиясыз', text: 'Жаңа жүргізушілер серіктес комиссиясынсыз екі апта жұмысын бастай алған.' },
      { title: 'Жалдың бесінші аптасы серіктес есебінен', text: 'Бұрынғы акция аясында серіктес автомобиль жалдаудың бесінші аптасын төлеген.' },
    ],
    fuelArchiveLabel: 'Бұрынғы жанармай бағдарламасы · қазір белсенді емес', statusTitle: 'Қатыспас бұрын мәртебесін тексеріңіз', statusText: 'Акциялар уақытпен шектеледі және қалаға, көлікке әрі жұмыс форматына қарай өзгеруі мүмкін. Қазір дос ұсынғаны үшін 400 PLN бағдарламасы расталған.',
  },
  az: {
    seoDescription: 'Dost tövsiyəsinə görə qüvvədə olan 400 PLN proqramı və Vonco Partners sürücüləri üçün əvvəlki dəstək kampaniyalarının nümunələri.',
    currentLabel: 'Hazırda aktivdir', currentTitle: 'Dost tövsiyəsinə görə 400 PLN', currentAmount: '400 PLN', currentText: 'Dostunuzu Vonco Partners ilə əməkdaşlığa dəvət edin və mükafat qazanın. Menecer tövsiyə qeydə alınmazdan əvvəl cari qaydaları təsdiqləyəcək.', currentNote: 'Hazırda bu, təsdiqlənmiş yeganə aktiv kampaniyadır.',
    varietyTitle: 'Sürücü dəstəyinin müxtəlif formaları', varietyIntro: 'Vonco Partners vaxtaşırı nəticə mükafatları, müəyyən xərclərin ödənilməsi, başlanğıc güzəştləri və tövsiyə proqramları keçirir. Aşağıda əvvəlki kampaniyaların nümunələri var.', previousLabel: 'Əvvəlki proqram · hazırda aktiv deyil',
    previousPrograms: [
      { title: 'Həftənin ən yaxşı sürücüsünə tam çən', text: 'Hər cümə axşamı həftənin ən yaxşı nəticəsini göstərən sürücü seçilir, tərəfdaş isə tam çənin xərcini ödəyirdi.' },
      { title: 'Yeni sürücü üçün iki həftə komissiyasız', text: 'Yeni sürücülər tərəfdaş komissiyası olmadan iki həftə işə başlaya bilirdi.' },
      { title: 'İcarənin beşinci həftəsi tərəfdaş hesabına', text: 'Əvvəlki kampaniya çərçivəsində tərəfdaş avtomobil icarəsinin beşinci həftəsini ödəyirdi.' },
    ],
    fuelArchiveLabel: 'Əvvəlki yanacaq proqramı · hazırda aktiv deyil', statusTitle: 'İştirakdan əvvəl statusu yoxlayın', statusText: 'Kampaniyalar müddətlidir və şəhər, avtomobil və əməkdaşlıq formasına görə dəyişə bilər. Hazırda dost tövsiyəsinə görə 400 PLN proqramı təsdiqlənib.',
  },
  tg: {
    seoDescription: 'Барномаи ҷории 400 PLN барои тавсияи дӯст ва намунаҳои барномаҳои пешинаи дастгирии ронандагони Vonco Partners.',
    currentLabel: 'Ҳоло амал мекунад', currentTitle: '400 PLN барои тавсияи дӯст', currentAmount: '400 PLN', currentText: 'Дӯстро ба ҳамкорӣ бо Vonco Partners даъват кунед ва мукофот гиред. Менеҷер пеш аз сабти тавсия қоидаҳои ҷориро тасдиқ мекунад.', currentNote: 'Ҳоло ин ягона аксияи фаъоли тасдиқшуда аст.',
    varietyTitle: 'Шаклҳои гуногуни дастгирии ронандагон', varietyIntro: 'Vonco Partners давра ба давра мукофот барои натиҷа, ҷуброни баъзе хароҷот, имтиёзҳои оғоз ва барномаҳои тавсиявиро баргузор мекунад. Дар поён намунаҳои аксияҳои пешина ҳастанд.', previousLabel: 'Барномаи пешина · ҳоло фаъол нест',
    previousPrograms: [
      { title: 'Баки пур барои беҳтарин ронандаи ҳафта', text: 'Ҳар панҷшанбе ронандаи дорои натиҷаи беҳтарини ҳафта интихоб шуда, шарик харҷи баки пурро мепӯшонд.' },
      { title: 'Ду ҳафта бе комиссия барои ронандаи нав', text: 'Ронандагони нав метавонистанд ду ҳафта бе комиссияи шарик корро оғоз кунанд.' },
      { title: 'Ҳафтаи панҷуми иҷора аз ҳисоби шарик', text: 'Дар доираи аксияи пешина шарик ҳафтаи панҷуми иҷораи мошинро пардохт мекард.' },
    ],
    fuelArchiveLabel: 'Барномаи пешинаи сӯзишворӣ · ҳоло фаъол нест', statusTitle: 'Пеш аз иштирок ҳолатро санҷед', statusText: 'Аксияҳо муҳлати маҳдуд доранд ва метавонанд аз шаҳр, мошин ва шакли ҳамкорӣ вобаста бошанд. Ҳоло барномаи 400 PLN барои тавсияи дӯст тасдиқ шудааст.',
  },
};

type CampaignPositioning = Pick<
  ProgramCampaignsContent,
  | 'seoDescription'
  | 'currentNote'
  | 'previousLabel'
  | 'fuelArchiveLabel'
  | 'statusTitle'
  | 'statusText'
>;

const positioning: Record<SupportedLocale, CampaignPositioning> = {
  uk: {
    seoDescription: 'Постійне повернення 8% витрат на пальне, актуальна винагорода 400 zł за рекомендацію друга та періодичні програми для водіїв Vonco Partners.',
    currentNote: 'Це одна з актуальних пропозицій підтримки водіїв Vonco Partners.',
    previousLabel: 'Приклад періодичної акції',
    fuelArchiveLabel: 'Постійна програма',
    statusTitle: 'Як працюють наші програми',
    statusText: 'Повернення 8% витрат на пальне діє постійно. Зараз також доступна винагорода 400 zł за рекомендацію друга. Додаткові акції ми запускаємо час від часу — їхній формат, строки й умови можуть відрізнятися.',
  },
  pl: {
    seoDescription: 'Stały zwrot 8% kosztów paliwa, aktualna premia 400 zł za polecenie znajomego i okresowe programy dla kierowców Vonco Partners.',
    currentNote: 'To jedna z aktualnych form wsparcia kierowców Vonco Partners.', previousLabel: 'Przykład akcji okresowej', fuelArchiveLabel: 'Program stały', statusTitle: 'Jak działają nasze programy', statusText: 'Zwrot 8% kosztów paliwa obowiązuje stale. Aktualnie dostępna jest również premia 400 zł za polecenie znajomego. Dodatkowe akcje uruchamiamy okresowo, a ich forma, czas trwania i zasady mogą się różnić.',
  },
  en: {
    seoDescription: 'Ongoing 8% fuel-cost refund, a current PLN 400 friend-referral reward and periodic driver programs from Vonco Partners.',
    currentNote: 'This is one of the current ways Vonco Partners supports drivers.', previousLabel: 'Example of a periodic campaign', fuelArchiveLabel: 'Ongoing program', statusTitle: 'How our programs work', statusText: 'The 8% fuel-cost refund is an ongoing program. A PLN 400 friend-referral reward is also currently available. We launch additional campaigns from time to time, and their format, duration and rules may vary.',
  },
  ru: {
    seoDescription: 'Постоянный возврат 8% расходов на топливо, актуальная награда 400 zł за рекомендацию друга и периодические программы Vonco Partners.',
    currentNote: 'Это одна из актуальных форм поддержки водителей Vonco Partners.', previousLabel: 'Пример периодической акции', fuelArchiveLabel: 'Постоянная программа', statusTitle: 'Как работают наши программы', statusText: 'Возврат 8% расходов на топливо действует постоянно. Сейчас также доступна награда 400 zł за рекомендацию друга. Дополнительные акции мы запускаем время от времени — их формат, сроки и условия могут отличаться.',
  },
  es: {
    seoDescription: 'Reembolso permanente del 8% del combustible, recompensa actual de 400 PLN por recomendación y programas periódicos de Vonco Partners.',
    currentNote: 'Esta es una de las formas actuales de apoyo de Vonco Partners.', previousLabel: 'Ejemplo de campaña periódica', fuelArchiveLabel: 'Programa permanente', statusTitle: 'Cómo funcionan nuestros programas', statusText: 'El reembolso del 8% de los costes de combustible es permanente. También está disponible una recompensa de 400 PLN por recomendar a un amigo. Lanzamos campañas adicionales periódicamente, con formatos, plazos y condiciones variables.',
  },
  hy: {
    seoDescription: 'Վառելիքի ծախսերի մշտական 8% վերադարձ, ընկերոջ հրավերի գործող 400 PLN պարգև և Vonco Partners-ի պարբերական ծրագրեր։',
    currentNote: 'Սա Vonco Partners-ի վարորդների աջակցության գործող ձևերից մեկն է։', previousLabel: 'Պարբերական ակցիայի օրինակ', fuelArchiveLabel: 'Մշտական ծրագիր', statusTitle: 'Ինչպես են գործում մեր ծրագրերը', statusText: 'Վառելիքի ծախսերի 8% վերադարձը մշտական ծրագիր է։ Այժմ գործում է նաև ընկերոջ հրավերի 400 PLN պարգևը։ Լրացուցիչ ակցիաներ անցկացնում ենք ժամանակ առ ժամանակ, և դրանց ձևաչափն ու պայմանները կարող են տարբերվել։',
  },
  be: {
    seoDescription: 'Пастаяннае вяртанне 8% выдаткаў на паліва, актуальная ўзнагарода 400 PLN за сябра і перыядычныя праграмы Vonco Partners.',
    currentNote: 'Гэта адна з актуальных форм падтрымкі кіроўцаў Vonco Partners.', previousLabel: 'Прыклад перыядычнай акцыі', fuelArchiveLabel: 'Пастаянная праграма', statusTitle: 'Як працуюць нашы праграмы', statusText: 'Вяртанне 8% выдаткаў на паліва дзейнічае пастаянна. Цяпер таксама даступная ўзнагарода 400 PLN за рэкамендацыю сябра. Дадатковыя акцыі мы запускаем час ад часу, таму іх фармат і ўмовы могуць адрознівацца.',
  },
  ro: {
    seoDescription: 'Rambursare permanentă de 8% a costurilor de combustibil, recompensă actuală de 400 PLN pentru recomandare și programe periodice Vonco Partners.',
    currentNote: 'Aceasta este una dintre formele actuale de sprijin Vonco Partners.', previousLabel: 'Exemplu de campanie periodică', fuelArchiveLabel: 'Program permanent', statusTitle: 'Cum funcționează programele noastre', statusText: 'Rambursarea a 8% din costurile de combustibil este permanentă. În prezent este disponibilă și recompensa de 400 PLN pentru recomandarea unui prieten. Lansăm periodic alte campanii, cu formate și condiții diferite.',
  },
  ka: {
    seoDescription: 'საწვავის ხარჯის მუდმივი 8%-იანი დაბრუნება, მეგობრის რეკომენდაციის მოქმედი 400 PLN ჯილდო და Vonco Partners-ის პერიოდული პროგრამები.',
    currentNote: 'ეს Vonco Partners-ის მძღოლთა მხარდაჭერის ერთ-ერთი მოქმედი ფორმაა.', previousLabel: 'პერიოდული აქციის მაგალითი', fuelArchiveLabel: 'მუდმივი პროგრამა', statusTitle: 'როგორ მუშაობს ჩვენი პროგრამები', statusText: 'საწვავის ხარჯის 8%-იანი დაბრუნება მუდმივად მოქმედებს. ამჟამად ასევე ხელმისაწვდომია 400 PLN მეგობრის რეკომენდაციისთვის. დამატებით აქციებს პერიოდულად ვატარებთ და მათი ფორმატი და პირობები შეიძლება განსხვავდებოდეს.',
  },
  uz: {
    seoDescription: 'Yonilg‘i xarajatining doimiy 8% qaytarilishi, do‘st tavsiyasi uchun amaldagi 400 PLN mukofot va Vonco Partners davriy dasturlari.',
    currentNote: 'Bu Vonco Partners haydovchilarini qo‘llab-quvvatlashning amaldagi shakllaridan biri.', previousLabel: 'Davriy aksiya namunasi', fuelArchiveLabel: 'Doimiy dastur', statusTitle: 'Dasturlarimiz qanday ishlaydi', statusText: 'Yonilg‘i xarajatining 8% qaytarilishi doimiy amal qiladi. Hozir do‘stni tavsiya qilish uchun 400 PLN mukofot ham mavjud. Qo‘shimcha aksiyalarni vaqti-vaqti bilan o‘tkazamiz; ularning shakli va shartlari farq qilishi mumkin.',
  },
  kk: {
    seoDescription: 'Жанармай шығынының тұрақты 8% қайтарымы, дос ұсынғаны үшін қолданыстағы 400 PLN сыйақы және Vonco Partners мерзімді бағдарламалары.',
    currentNote: 'Бұл Vonco Partners жүргізушілерін қолдаудың қолданыстағы түрлерінің бірі.', previousLabel: 'Мерзімді акцияның мысалы', fuelArchiveLabel: 'Тұрақты бағдарлама', statusTitle: 'Бағдарламаларымыз қалай жұмыс істейді', statusText: 'Жанармай шығынының 8% қайтарымы тұрақты түрде қолданылады. Қазір дос ұсынғаны үшін 400 PLN сыйақы да бар. Қосымша акцияларды уақыт өте өткіземіз, олардың форматы мен шарттары өзгеруі мүмкін.',
  },
  az: {
    seoDescription: 'Yanacaq xərcinin daimi 8% geri qaytarılması, dost tövsiyəsinə görə cari 400 PLN mükafat və Vonco Partners-in dövri proqramları.',
    currentNote: 'Bu, Vonco Partners-in sürücülərə cari dəstək formalarından biridir.', previousLabel: 'Dövri kampaniya nümunəsi', fuelArchiveLabel: 'Daimi proqram', statusTitle: 'Proqramlarımız necə işləyir', statusText: 'Yanacaq xərcinin 8%-nin geri qaytarılması daimi proqramdır. Hazırda dost tövsiyəsinə görə 400 PLN mükafat da mövcuddur. Əlavə kampaniyaları vaxtaşırı keçiririk; onların formatı və şərtləri fərqlənə bilər.',
  },
  tg: {
    seoDescription: 'Баргардонидани доимии 8% хароҷоти сӯзишворӣ, мукофоти ҷории 400 PLN барои тавсияи дӯст ва барномаҳои даврии Vonco Partners.',
    currentNote: 'Ин яке аз шаклҳои ҷории дастгирии ронандагони Vonco Partners аст.', previousLabel: 'Намунаи аксияи даврӣ', fuelArchiveLabel: 'Барномаи доимӣ', statusTitle: 'Барномаҳои мо чӣ гуна кор мекунанд', statusText: 'Баргардонидани 8% хароҷоти сӯзишворӣ доимӣ амал мекунад. Ҳоло мукофоти 400 PLN барои тавсияи дӯст низ дастрас аст. Аксияҳои иловагиро гоҳ-гоҳ баргузор мекунем ва шаклу шартҳои онҳо метавонанд фарқ кунанд.',
  },
};

const ongoingFuelLabels: Record<SupportedLocale, string> = {
  uk: 'Постійно: повернення 8%',
  pl: 'Stale: zwrot 8%',
  en: 'Ongoing: 8% refund',
  ru: 'Постоянно: возврат 8%',
  es: 'Permanente: reembolso del 8%',
  hy: 'Մշտական՝ 8% վերադարձ',
  be: 'Пастаянна: вяртанне 8%',
  ro: 'Permanent: rambursare 8%',
  ka: 'მუდმივად: 8% დაბრუნება',
  uz: 'Doimiy: 8% qaytarish',
  kk: 'Тұрақты: 8% қайтарым',
  az: 'Daimi: 8% geri qaytarma',
  tg: 'Доимӣ: баргардонидани 8%',
};

export function getProgramCampaignsContent(locale: string): ProgramCampaignsContent {
  const safeLocale = locale in campaigns ? (locale as SupportedLocale) : 'en';
  return {
    ...campaigns[safeLocale],
    ...positioning[safeLocale],
    fuelArchiveLabel: ongoingFuelLabels[safeLocale],
  };
}
