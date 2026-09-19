import { getTranslations } from 'next-intl/server';

import JsonLd from '@/Components/JsonLd';
import { COMPANY } from '@/data/company';
import {
  getGoogleReviewLocations,
  type GoogleReviewLocation,
} from '@/lib/googleReviews';
import { LOCAL_BUSINESS_ID } from '@/lib/schema';
import { getLocalizedUrl } from '@/lib/seo';
import { homeStyles as styles } from '@/lib/uiStyles';

type Props = {
  lang: string;
};

type ReviewsCopy = {
  title: string;
  subtitle: string;
  linkText: string;
  ariaLabel: string;
  unavailable: string;
};

type GoogleReviewsViewProps = {
  locations: GoogleReviewLocation[];
  copy: ReviewsCopy;
};

function stars(rating: number): string {
  const rounded = Math.max(1, Math.min(5, Math.round(rating || 5)));
  return '★'.repeat(rounded) + '☆'.repeat(5 - rounded);
}

function findOffice(officeId: GoogleReviewLocation['officeId']) {
  return COMPANY.offices.find((office) => office.id === officeId);
}

export function GoogleReviewsView({
  locations,
  copy,
}: GoogleReviewsViewProps) {
  return (
    <section className={styles.reviewsSection} aria-label={copy.ariaLabel}>
      <div className={styles.reviewsHeader}>
        <div>
          <h2>{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </div>
      </div>

      <div className={styles.reviewLocations}>
        {locations.map((location) => {
          const office = findOffice(location.officeId);
          if (!office) {
            return null;
          }

          const { data } = location;
          const reviewCards = (data?.reviews || []).slice(0, 5);
          const mapUrl = data?.mapUrl || location.defaultMapUrl;

          return (
            <section
              className={styles.reviewLocation}
              aria-label={`${copy.ariaLabel} — ${office.label}`}
              key={location.officeId}
            >
              <div className={styles.reviewLocationHeader}>
                <div>
                  <h3 className={styles.reviewLocationTitle}>{office.label}</h3>
                  <p className={styles.reviewLocationAddress}>
                    {office.addressLine1}, {office.cityPostal}
                  </p>
                </div>
                {data?.rating && data.totalRatings ? (
                  <p className={styles.reviewLocationRating}>
                    <span aria-hidden='true'>★</span>{' '}
                    {data.rating.toFixed(1)} / 5 ({data.totalRatings})
                  </p>
                ) : null}
              </div>

              {reviewCards.length ? (
                <div className={styles.reviewsGrid}>
                  {reviewCards.map((item, index) => (
                    <article
                      className={styles.reviewCard}
                      key={`${location.officeId}-${item.author}-${index}`}
                    >
                      <p className={styles.reviewStars}>{stars(item.rating)}</p>
                      {item.text ? (
                        <p className={styles.reviewText}>{item.text}</p>
                      ) : (
                        <div className={styles.reviewSpacer} aria-hidden='true' />
                      )}
                      <p className={styles.reviewAuthor}>{item.author}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <p className={styles.reviewUnavailable}>{copy.unavailable}</p>
              )}

              <a
                className={styles.reviewsLink}
                href={mapUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                {copy.linkText}
              </a>
            </section>
          );
        })}
      </div>
    </section>
  );
}

export default async function GoogleReviewsSection({ lang }: Props) {
  const t = await getTranslations({ locale: lang, namespace: 'HomePage' });
  const locations = await getGoogleReviewLocations();
  const copy: ReviewsCopy = {
    title: t('reviews.title'),
    subtitle: t('reviews.subtitle'),
    linkText: t('reviews.linkText'),
    ariaLabel: t('reviews.ariaLabel'),
    unavailable: t('reviews.unavailable'),
  };

  return (
    <>
      <GoogleReviewsView locations={locations} copy={copy} />

      {locations.map((location) => {
        const office = findOffice(location.officeId);
        const { data } = location;
        if (!office || !data?.rating || !data.totalRatings) {
          return null;
        }

        const visibleReviews = data.reviews
          .filter((review) => review.text)
          .slice(0, 3)
          .map((review) => ({
            '@type': 'Review',
            reviewBody: review.text,
            reviewRating: {
              '@type': 'Rating',
              ratingValue: review.rating,
              bestRating: 5,
              worstRating: 1,
            },
            author: {
              '@type': 'Person',
              name: review.author,
            },
          }));

        return (
          <JsonLd
            key={location.officeId}
            id={`reviews-schema-${lang}-${location.officeId}`}
            type='application/ld+json'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                '@id': `${LOCAL_BUSINESS_ID}-${location.officeId}`,
                name: `${COMPANY.name} — ${office.label}`,
                url: getLocalizedUrl(lang),
                telephone:
                  location.officeId === 'krakow'
                    ? COMPANY.phones.krakowRegion.tel
                    : COMPANY.phones.katowiceRegion.tel,
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: office.addressLine1,
                  postalCode: office.postalCode,
                  addressLocality: office.locality,
                  addressCountry: 'PL',
                },
                sameAs: [data.mapUrl || location.defaultMapUrl],
                parentOrganization: { '@id': LOCAL_BUSINESS_ID },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: data.rating,
                  ratingCount: data.totalRatings,
                },
                review: visibleReviews,
              }),
            }}
          />
        );
      })}
    </>
  );
}
