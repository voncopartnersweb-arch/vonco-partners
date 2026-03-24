import { getTranslations } from 'next-intl/server';
import Script from 'next/script';
import styles from './page.module.css';
import { getDefaultMapUrl, getGoogleReviews } from '@/lib/googleReviews';

type Props = {
  lang: string;
};

const reviewsUnavailableCopy: Record<string, string> = {
  uk: 'Відгуки Google тимчасово недоступні. Ви можете відкрити профіль компанії в Google Maps за посиланням нижче.',
  pl: 'Opinie Google sa chwilowo niedostepne. Mozesz otworzyc profil firmy w Google Maps z linku ponizej.',
  en: 'Google reviews are temporarily unavailable. You can open the company profile in Google Maps using the link below.',
  ru: 'Отзывы Google временно недоступны. Вы можете открыть профиль компании в Google Maps по ссылке ниже.',
  es: 'Las resenas de Google no estan disponibles temporalmente. Puede abrir el perfil de la empresa en Google Maps usando el enlace de abajo.',
  ro: 'Recenziile Google sunt temporar indisponibile. Puteti deschide profilul companiei in Google Maps folosind linkul de mai jos.',
  be: 'Водгукі Google часова недаступныя. Вы можаце адкрыць профіль кампаніі ў Google Maps па спасылцы ніжэй.',
  hy: 'Google-ի կարծիքները ժամանակավորապես հասանելի չեն։ Կարող եք բացել ընկերության էջը Google Maps-ում՝ ստորև նշված հղումով։',
  ka: 'Google-ის მიმოხილვები დროებით მიუწვდომელია. კომპანიის პროფილი შეგიძლიათ გახსნათ Google Maps-ში ქვემოთ მოცემული ბმულით.',
  kk: 'Google пікірлері уақытша қолжетімсіз. Компания профилін төмендегі сілтеме арқылы Google Maps ішінде аша аласыз.',
  az: 'Google reyləri müvəqqəti olaraq əlçatan deyil. Şirkətin profilini aşağıdakı link vasitəsilə Google Maps-də aça bilərsiniz.',
  uz: 'Google sharhlari vaqtincha mavjud emas. Kompaniya profilini quyidagi havola orqali Google Maps ichida ochishingiz mumkin.',
  tg: 'Баррасиҳои Google муваққатан дастрас нестанд. Шумо метавонед профили ширкатро аз рӯи пайванди зер дар Google Maps боз кунед.',
};

function stars(rating: number): string {
  const rounded = Math.max(1, Math.min(5, Math.round(rating || 5)));
  return '★'.repeat(rounded) + '☆'.repeat(5 - rounded);
}

export default async function GoogleReviewsSection({ lang }: Props) {
  const t = await getTranslations({ locale: lang, namespace: 'HomePage' });
  const data = await getGoogleReviews(lang);
  const fallbackMap = getDefaultMapUrl();

  const reviewCards = data?.reviews?.length
    ? data.reviews.map((item, index) => ({
        key: `live-${index}`,
        rating: item.rating,
        text: item.text,
        author: item.author,
      }))
    : [];
  const hasLiveReviews = Boolean(data?.reviews?.length && data?.rating);
  const reviewsForSchema = (data?.reviews || []).slice(0, 5).map((item) => ({
    '@type': 'Review',
    reviewBody: item.text,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: item.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      '@type': 'Person',
      name: item.author,
    },
  }));
  const ratingValue = data?.rating ?? null;
  const ratingCount = data?.totalRatings ?? null;
  const schemaMapUrl = data?.mapUrl || fallbackMap;

  return (
    <>
      <section className={styles.reviewsSection} aria-label='Google reviews'>
        <div className={styles.reviewsHeader}>
          <h2>{t('reviews.title')}</h2>
          <p>
            {t('reviews.subtitle')}
            {data?.rating && data?.totalRatings
              ? ` ${data.rating.toFixed(1)} / 5 (${data.totalRatings})`
              : ''}
          </p>
        </div>

        {reviewCards.length ? (
          <div className={styles.reviewsGrid}>
            {reviewCards.map((item) => (
              <article className={styles.reviewCard} key={item.key}>
                <p className={styles.reviewStars}>{stars(item.rating)}</p>
                <p className={styles.reviewText}>{item.text}</p>
                <p className={styles.reviewAuthor}>{item.author}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className={styles.reviewText}>
            {reviewsUnavailableCopy[lang] ?? reviewsUnavailableCopy.en}
          </p>
        )}

        <a
          className={styles.reviewsLink}
          href={schemaMapUrl}
          target='_blank'
          rel='noopener noreferrer'
        >
          {t('reviews.linkText')}
        </a>
      </section>

      {hasLiveReviews ? (
        <Script
          id={`reviews-schema-${lang}`}
          type='application/ld+json'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Vonco Partners',
              url: `https://vonco.partners/${lang}`,
              sameAs: [schemaMapUrl],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue,
                ratingCount,
              },
              review: reviewsForSchema,
            }),
          }}
        />
      ) : null}
    </>
  );
}
