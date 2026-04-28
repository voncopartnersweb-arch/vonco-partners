import { unstable_cache } from 'next/cache';

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

const DEFAULT_MAP_URL =
  'https://www.google.com/maps/place/VONCO+PARTNERS+SP.+Z.O.O/@50.2543426,19.127952,19z/data=!3m1!4b1!4m6!3m5!1s0x4716c5007ce45117:0x2f86906c9f782676!8m2!3d50.2543426!4d19.127952!16s%2Fg%2F11z0ykzdn_?entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D';

const PLACE_SEARCH_QUERY =
  'VONCO PARTNERS SP. Z.O.O, Obrzezna Polnocna 13, Myslowice, Poland';
const REVIEWS_REVALIDATE_SECONDS = 86400;
const REVIEWS_LANGUAGE = 'pl';

async function fetchGoogleReviews(): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeIdFromEnv = process.env.GOOGLE_PLACE_ID;
  if (!apiKey) {
    return null;
  }

  const safeLocale = REVIEWS_LANGUAGE;
  let placeId = placeIdFromEnv;
  if (!placeId) {
    const findPlaceUrl =
      'https://maps.googleapis.com/maps/api/place/findplacefromtext/json' +
      `?input=${encodeURIComponent(PLACE_SEARCH_QUERY)}` +
      '&inputtype=textquery' +
      '&fields=place_id' +
      `&language=${encodeURIComponent(safeLocale)}` +
      `&key=${encodeURIComponent(apiKey)}`;

    const findRes = await fetch(findPlaceUrl, {
      next: { revalidate: REVIEWS_REVALIDATE_SECONDS },
    });
    if (!findRes.ok) {
      return null;
    }

    const findData = (await findRes.json()) as FindPlaceResponse;
    placeId = findData.candidates?.[0]?.place_id;
  }

  if (!placeId) {
    return null;
  }

  const detailsUrl =
    'https://maps.googleapis.com/maps/api/place/details/json' +
    `?place_id=${encodeURIComponent(placeId)}` +
    '&fields=name,rating,user_ratings_total,reviews,url' +
    '&reviews_sort=newest' +
    `&language=${encodeURIComponent(safeLocale)}` +
    `&key=${encodeURIComponent(apiKey)}`;

  const detailsRes = await fetch(detailsUrl, {
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
    .filter((review) => review.text && review.author_name)
    .slice(0, 6)
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
    mapUrl: place.url || DEFAULT_MAP_URL,
    reviews,
  };
}

const getGoogleReviewsCached = unstable_cache(fetchGoogleReviews, ['google-reviews-v1'], {
  revalidate: REVIEWS_REVALIDATE_SECONDS,
});

export async function getGoogleReviews(
  _locale: string
): Promise<GoogleReviewsData | null> {
  return getGoogleReviewsCached();
}

export function getDefaultMapUrl(): string {
  return DEFAULT_MAP_URL;
}
