'use client';

import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';

const DriverForm = dynamic(() => import('./driverForm'), { ssr: false });

export default function ClientDriverForm(props: ComponentProps<any>) {
  return <DriverForm {...props} />;
}
