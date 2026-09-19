import { unstable_cache } from 'next/cache';

import { COMPANY } from '@/data/company';

type GoogleReview = {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
};

export type GoogleReviewsData = {
  placeName: string;
  rating: number;
  totalRatings: number;
  mapUrl: string;
  reviews: GoogleReview[];
};

export type GoogleReviewLocation = {
  officeId: (typeof COMPANY.offices)[number]['id'];
  defaultMapUrl: string;
  data: GoogleReviewsData | null;
};

type FindPlaceResponse = {
  candidates?: Array<{ place_id?: string }>;
  status?: string;
};

type PlaceDetailsResponse = {
  result?: {
    name?: string;
    rating?: number;
    user_ratings_total?: number;
    url?: string;
    reviews?: Array<{
      author_name?: string;
      rating?: number;
      text?: string;
      relative_time_description?: string;
    }>;
  };
  status?: string;
};

const MYSLOWICE_MAP_URL =
  'https://www.google.com/maps/place/VONCO+PARTNERS+SP.+Z.O.O/@50.2543426,19.127952,19z/data=!3m1!4b1!4m6!3m5!1s0x4716c5007ce45117:0x2f86906c9f782676!8m2!3d50.2543426!4d19.127952!16s%2Fg%2F11z0ykzdn_?entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D';
const REVIEWS_REVALIDATE_SECONDS = 86400;
const REVIEWS_LANGUAGE = 'pl';

type GoogleReviewLocationConfig = {
  officeId: GoogleReviewLocation['officeId'];
  defaultMapUrl: string;
  searchQuery: string;
  placeId?: string;
};

const GOOGLE_REVIEW_LOCATIONS: readonly GoogleReviewLocationConfig[] = [
  {
    officeId: 'myslowice',
    defaultMapUrl: MYSLOWICE_MAP_URL,
    searchQuery:
      'VONCO PARTNERS SP. Z.O.O, Obrzezna Polnocna 13, Myslowice, Poland',
  },
  {
    officeId: 'krakow',
    defaultMapUrl: 'https://maps.app.goo.gl/f8x5jn8gauZrDaPY9',
    searchQuery: 'VONCO PARTNERS 2, Długa 1, 32-083 Szczyglice, Poland',
    placeId: 'ChIJnaUDLQBZFkcRfRl2rKcxEN8',
  },
];

type LoadGoogleReviewLocationsOptions = {
  apiKey?: string;
  myslowicePlaceId?: string;
  fetchImpl?: typeof fetch;
};

async function resolvePlaceId(
  location: GoogleReviewLocationConfig,
  apiKey: string,
  myslowicePlaceId: string | undefined,
  fetchImpl: typeof fetch,
): Promise<string | null> {
  const configuredPlaceId =
    location.officeId === 'myslowice' ? myslowicePlaceId : location.placeId;
  if (configuredPlaceId) {
    return configuredPlaceId;
  }

  const findPlaceUrl =
    'https://maps.googleapis.com/maps/api/place/findplacefromtext/json' +
    `?input=${encodeURIComponent(location.searchQuery)}` +
    '&inputtype=textquery' +
    '&fields=place_id' +
    `&language=${encodeURIComponent(REVIEWS_LANGUAGE)}` +
    `&key=${encodeURIComponent(apiKey)}`;

  const findRes = await fetchImpl(findPlaceUrl, {
    next: { revalidate: REVIEWS_REVALIDATE_SECONDS },
  });
  if (!findRes.ok) {
    return null;
  }

  const findData = (await findRes.json()) as FindPlaceResponse;
  return findData.candidates?.[0]?.place_id || null;
}

async function fetchGoogleReviews(
  location: GoogleReviewLocationConfig,
  apiKey: string,
  myslowicePlaceId: string | undefined,
  fetchImpl: typeof fetch,
): Promise<GoogleReviewsData | null> {
  const placeId = await resolvePlaceId(
    location,
    apiKey,
    myslowicePlaceId,
    fetchImpl,
  );
  if (!placeId) {
    return null;
  }

  const detailsUrl =
    'https://maps.googleapis.com/maps/api/place/details/json' +
    `?place_id=${encodeURIComponent(placeId)}` +
    '&fields=name,rating,user_ratings_total,reviews,url' +
    '&reviews_sort=newest' +
    `&language=${encodeURIComponent(REVIEWS_LANGUAGE)}` +
    `&key=${encodeURIComponent(apiKey)}`;

  const detailsRes = await fetchImpl(detailsUrl, {
    next: { revalidate: REVIEWS_REVALIDATE_SECONDS },
  });
  if (!detailsRes.ok) {
    return null;
  }

  const detailsData = (await detailsRes.json()) as PlaceDetailsResponse;
  const place = detailsData.result;
  if (!place) {
    return null;
  }

  const reviews = (place.reviews || [])
    .filter((review) => review.author_name)
    .slice(0, 5)
    .map((review) => ({
      author: review.author_name || 'Google user',
      rating: review.rating || 5,
      text: review.text || '',
      relativeTime: review.relative_time_description || '',
    }));

  return {
    placeName: place.name || 'Vonco Partners',
    rating: place.rating || 0,
    totalRatings: place.user_ratings_total || 0,
    mapUrl: place.url || location.defaultMapUrl,
    reviews,
  };
}

export async function loadGoogleReviewLocations({
  apiKey = process.env.GOOGLE_MAPS_API_KEY,
  myslowicePlaceId = process.env.GOOGLE_PLACE_ID,
  fetchImpl = fetch,
}: LoadGoogleReviewLocationsOptions = {}): Promise<GoogleReviewLocation[]> {
  return Promise.all(
    GOOGLE_REVIEW_LOCATIONS.map(async (location) => {
      if (!apiKey) {
        return {
          officeId: location.officeId,
          defaultMapUrl: location.defaultMapUrl,
          data: null,
        };
      }

      try {
        const data = await fetchGoogleReviews(
          location,
          apiKey,
          myslowicePlaceId,
          fetchImpl,
        );
        return {
          officeId: location.officeId,
          defaultMapUrl: location.defaultMapUrl,
          data,
        };
      } catch {
        return {
          officeId: location.officeId,
          defaultMapUrl: location.defaultMapUrl,
          data: null,
        };
      }
    }),
  );
}

const getGoogleReviewLocationsCached = unstable_cache(
  loadGoogleReviewLocations,
  ['google-review-locations-v3'],
  {
    revalidate: REVIEWS_REVALIDATE_SECONDS,
  },
);

export async function getGoogleReviewLocations(): Promise<GoogleReviewLocation[]> {
  return getGoogleReviewLocationsCached();
}
