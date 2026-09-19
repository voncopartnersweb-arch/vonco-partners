import assert from 'node:assert/strict';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { GoogleReviewsView } from '../app/[lang]/GoogleReviewsSection';
import {
  loadGoogleReviewLocations,
  type GoogleReviewLocation,
} from '../lib/googleReviews';

function googleDetailsResponse({
  name,
  rating,
  totalRatings,
  mapUrl,
}: {
  name: string;
  rating: number;
  totalRatings: number;
  mapUrl: string;
}) {
  return Response.json({
    status: 'OK',
    result: {
      name,
      rating,
      user_ratings_total: totalRatings,
      url: mapUrl,
      reviews: [
        {
          author_name: `${name} reviewer`,
          rating: 5,
          text: `${name} review`,
          relative_time_description: 'this week',
        },
      ],
    },
  });
}

test('loads current Google reviews for the Mysłowice and Kraków offices', async () => {
  const requestedPlaceIds: string[] = [];
  const fetchImpl: typeof fetch = async (input) => {
    const url = new URL(String(input));
    const placeId = url.searchParams.get('place_id');
    assert.ok(placeId);
    requestedPlaceIds.push(placeId);

    if (placeId === 'myslowice-place-id') {
      return googleDetailsResponse({
        name: 'VONCO PARTNERS SP. Z.O.O',
        rating: 4.9,
        totalRatings: 120,
        mapUrl: 'https://maps.google.com/myslowice',
      });
    }

    assert.equal(placeId, 'ChIJnaUDLQBZFkcRfRl2rKcxEN8');
    return googleDetailsResponse({
      name: 'VONCO PARTNERS 2',
      rating: 5,
      totalRatings: 8,
      mapUrl: 'https://maps.google.com/krakow',
    });
  };

  const locations = await loadGoogleReviewLocations({
    apiKey: 'test-key',
    myslowicePlaceId: 'myslowice-place-id',
    fetchImpl,
  });

  assert.deepEqual(requestedPlaceIds, [
    'myslowice-place-id',
    'ChIJnaUDLQBZFkcRfRl2rKcxEN8',
  ]);
  assert.deepEqual(
    locations.map(({ officeId, data }) => ({
      officeId,
      rating: data?.rating,
      totalRatings: data?.totalRatings,
      reviewText: data?.reviews[0]?.text,
    })),
    [
      {
        officeId: 'myslowice',
        rating: 4.9,
        totalRatings: 120,
        reviewText: 'VONCO PARTNERS SP. Z.O.O review',
      },
      {
        officeId: 'krakow',
        rating: 5,
        totalRatings: 8,
        reviewText: 'VONCO PARTNERS 2 review',
      },
    ],
  );
});

test('keeps Kraków reviews available when the Mysłowice profile request fails', async () => {
  const fetchImpl: typeof fetch = async (input) => {
    const url = new URL(String(input));
    const placeId = url.searchParams.get('place_id');

    if (placeId === 'myslowice-place-id') {
      return new Response('Unavailable', { status: 503 });
    }

    return googleDetailsResponse({
      name: 'VONCO PARTNERS 2',
      rating: 5,
      totalRatings: 8,
      mapUrl: 'https://maps.google.com/krakow',
    });
  };

  const locations = await loadGoogleReviewLocations({
    apiKey: 'test-key',
    myslowicePlaceId: 'myslowice-place-id',
    fetchImpl,
  });

  assert.equal(locations[0]?.officeId, 'myslowice');
  assert.equal(locations[0]?.data, null);
  assert.equal(locations[1]?.officeId, 'krakow');
  assert.equal(locations[1]?.data?.rating, 5);
});

test('renders up to five reviews per office, including rating-only reviews', () => {
  const locations: GoogleReviewLocation[] = [
    {
      officeId: 'myslowice',
      defaultMapUrl: 'https://maps.example/myslowice-fallback',
      data: {
        placeName: 'Vonco Mysłowice',
        rating: 4.9,
        totalRatings: 120,
        mapUrl: 'https://maps.example/myslowice',
        reviews: [1, 2, 3, 4, 5, 6].map((index) => ({
          author: `Mysłowice author ${index}`,
          rating: 5,
          text: `Mysłowice review ${index}`,
          relativeTime: 'this week',
        })),
      },
    },
    {
      officeId: 'krakow',
      defaultMapUrl: 'https://maps.example/krakow-fallback',
      data: {
        placeName: 'Vonco Kraków',
        rating: 5,
        totalRatings: 8,
        mapUrl: 'https://maps.example/krakow',
        reviews: [1, 2, 3, 4, 5, 6].map((index) => ({
          author: `Kraków author ${index}`,
          rating: 5,
          text: index <= 3 ? `Kraków review ${index}` : '',
          relativeTime: 'this week',
        })),
      },
    },
  ];

  const markup = renderToStaticMarkup(
    createElement(GoogleReviewsView, {
      locations,
      copy: {
        title: 'Driver reviews',
        subtitle: 'Current Google reviews',
        linkText: 'Open Google Maps reviews',
        ariaLabel: 'Google reviews',
        unavailable: 'Reviews unavailable',
      },
    }),
  );

  assert.match(markup, /Mysłowice/);
  assert.match(markup, /Kraków \/ Szczyglice/);
  assert.match(markup, /Mysłowice review 5/);
  assert.doesNotMatch(markup, /Mysłowice review 6/);
  assert.match(markup, /Kraków review 3/);
  assert.match(markup, /Kraków author 5/);
  assert.doesNotMatch(markup, /Kraków author 6/);
  assert.match(markup, /href="https:\/\/maps\.example\/myslowice"/);
  assert.match(markup, /href="https:\/\/maps\.example\/krakow"/);
});
