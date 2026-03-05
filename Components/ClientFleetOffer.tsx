'use client';

import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';

export default function ClientFleetOffer() {
  const [FleetOffer, setFleetOffer] = useState<null | ComponentType>(null);

  useEffect(() => {
    let isMounted = true;
    import('./FleetOffer/FleetOffer').then((mod) => {
      if (isMounted) {
        setFleetOffer(() => mod.default);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (!FleetOffer) return null;
  return <FleetOffer />;
}
