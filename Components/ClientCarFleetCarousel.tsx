'use client';

import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';

export default function ClientCarFleetCarousel() {
  const [CarFleetCarousel, setCarFleetCarousel] = useState<null | ComponentType>(
    null,
  );

  useEffect(() => {
    let isMounted = true;
    import('./carsCarusel/CarFleetCarusel').then((mod) => {
      if (isMounted) {
        setCarFleetCarousel(() => mod.default);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (!CarFleetCarousel) return null;
  return <CarFleetCarousel />;
}
