'use client';

import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';

const CarFleetCarousel = dynamic(
  () => import('./carsCarusel/CarFleetCarusel'),
  { ssr: false },
);

export default function ClientCarFleetCarousel(props: ComponentProps<any>) {
  return <CarFleetCarousel {...props} />;
}
