'use client';

import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';

const SocialSection = dynamic(() => import('./SocialSection/SocialSection'), {
  ssr: false,
});

export default function ClientSocialSection(props: ComponentProps<any>) {
  return <SocialSection {...props} />;
}
