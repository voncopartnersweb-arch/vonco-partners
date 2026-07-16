'use client';

import { useEffect } from 'react';
import {
  CONSENT_CHANGE_EVENT,
  hasAnalyticsConsent,
} from '@/lib/analytics';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-MN3FS6B8';

function loadGtm() {
  if (!GTM_ID || !hasAnalyticsConsent()) return;
  if (document.getElementById('vonco-gtm-script')) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': Date.now(),
    event: 'gtm.js',
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });

  const script = document.createElement('script');
  script.id = 'vonco-gtm-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
  document.head.appendChild(script);
}

export default function AnalyticsProvider() {
  useEffect(() => {
    loadGtm();
    const onConsentChange = () => loadGtm();
    window.addEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
  }, []);

  return null;
}
