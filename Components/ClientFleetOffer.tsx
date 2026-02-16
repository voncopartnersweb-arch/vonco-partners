'use client';

import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';

const FleetOffer = dynamic(() => import('./FleetOffer/FleetOffer'), {
  ssr: false,
});

export default function ClientFleetOffer(props: ComponentProps<any>) {
  return <FleetOffer {...props} />;
}
