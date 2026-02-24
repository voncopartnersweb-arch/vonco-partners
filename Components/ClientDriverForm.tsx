'use client';

import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';
import styles from './DriverForm.module.css';

const DriverForm = dynamic(() => import('./driverForm'), { ssr: false });

export default function ClientDriverForm(props: ComponentProps<any>) {
  return (
    <div className={styles.container}>
      {' '}
      <DriverForm {...props} />
    </div>
  );
}
