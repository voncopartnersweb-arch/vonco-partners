import { getTranslations } from 'next-intl/server';
import Script from 'next/script';
import { homeStyles as styles } from '@/lib/uiStyles';
import { getDefaultMapUrl, getGoogleReviews } from '@/lib/googleReviews';
import { getLocalizedUrl } from '@/lib/seo';
import { LOCAL_BUSINESS_ID } from '@/lib/schema';

type Props = {
  lang: string;
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
  const reviewsForSchema = (data?.reviews || [])
    .filter((item) => item.text)
    .slice(0, 5)
    .map((item) => ({
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
      <section
        className={styles.reviewsSection}
        aria-label={t('reviews.ariaLabel')}
      >
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
                {item.text ? (
                  <p className={styles.reviewText}>{item.text}</p>
                ) : null}
                <p className={styles.reviewAuthor}>{item.author}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className={styles.reviewText}>{t('reviews.unavailable')}</p>
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
              '@id': LOCAL_BUSINESS_ID,
              name: 'Vonco Partners',
              url: getLocalizedUrl(lang),
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
