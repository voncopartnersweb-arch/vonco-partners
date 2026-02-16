'use client';

import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';

const TikTokReelsSection = dynamic(
  () => import('./TikTokReelsSection/TikTokReelsSection'),
  { ssr: false },
);

export default function ClientTikTokReelsSection(props: ComponentProps<any>) {
  return <TikTokReelsSection {...props} />;
}
