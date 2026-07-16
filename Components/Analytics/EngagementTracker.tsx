'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

type Props = {
  city: string;
  locale: string;
  platform?: string;
};

export default function EngagementTracker({ city, locale, platform }: Props) {
  useEffect(() => {
    let activeMs = 0;
    let sent = false;
    const interval = window.setInterval(() => {
      if (document.visibilityState !== 'visible' || sent) return;
      activeMs += 1000;
      if (activeMs >= 120_000) {
        sent = true;
        trackEvent('city_page_engaged_120s', {
          city,
          locale,
          platform,
        });
        window.clearInterval(interval);
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [city, locale, platform]);

  return null;
}
