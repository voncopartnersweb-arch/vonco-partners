'use client';

import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';

export default function ClientSocialSection() {
  const [SocialSection, setSocialSection] = useState<null | ComponentType>(
    null,
  );

  useEffect(() => {
    let isMounted = true;
    import('./SocialSection/SocialSection').then((mod) => {
      if (isMounted) {
        setSocialSection(() => mod.default);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (!SocialSection) return null;
  return <SocialSection />;
}
