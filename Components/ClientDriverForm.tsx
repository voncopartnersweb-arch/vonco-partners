'use client';

import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';

export default function ClientDriverForm() {
  const [DriverForm, setDriverForm] = useState<null | ComponentType>(null);

  useEffect(() => {
    let isMounted = true;
    import('./driverForm').then((mod) => {
      if (isMounted) {
        setDriverForm(() => mod.default);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (!DriverForm) return null;
  return <DriverForm />;
}
