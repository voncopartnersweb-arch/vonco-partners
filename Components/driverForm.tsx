'use client';
import { useState } from 'react';
import styles from './DriverForm.module.css';
import { useTranslations } from 'next-intl';

export default function DriverForm() {
  const t = useTranslations('DriverForm');

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    city: '',
    consent: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, checked } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, city, name, phoneNumber } = formData;

    const body = `
${t('email.bodyIntro')}
Email: ${email}
City: ${city}
Name: ${name}
Phone: ${phoneNumber}
`;
    window.location.href = `mailto:vonco.partners@gmail.com?subject=${encodeURIComponent(
      t('email.subject'),
    )}&body=${encodeURIComponent(body)}`;

    setFormData({
      name: '',
      phoneNumber: '',
      email: '',
      city: '',
      consent: false,
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>{t('title')}</h1>
      <p className={styles.subTitle}>{t('subtitle')}</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder={t('fields.name')}
          className={styles.inputField}
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type='tel'
          name='phoneNumber'
          placeholder={t('fields.phone')}
          className={styles.inputField}
          value={formData.phoneNumber}
          onChange={handleChange}
        />

        <input
          type='email'
          name='email'
          placeholder={t('fields.email')}
          className={styles.inputField}
          value={formData.email}
          onChange={handleChange}
        />

        <select
          name='city'
          className={styles.inputField}
          value={formData.city}
          onChange={handleChange}
        >
          <option value='' disabled hidden>
            {t('fields.cityPlaceholder')}
          </option>
          <option value='katowice'>{t('cities.katowice')}</option>
          <option value='krakow'>{t('cities.krakow')}</option>

          <option value='gdansk'>{t('cities.gdansk')}</option>
          <option value='gdynia'>{t('cities.gdynia')}</option>
          <option value='bielsko_biala'>{t('cities.bielsko_biala')}</option>
          <option value='oswiecim'>{t('cities.oswiecim')}</option>
          <option value='zakopane'>{t('cities.zakopane')}</option>
          <option value='zator'>{t('cities.zator')}</option>
        </select>

        <div className={styles.consentContainer}>
          <input
            type='checkbox'
            name='consent'
            id='consentCheckbox'
            checked={formData.consent}
            onChange={handleChange}
            required
          />
          <label htmlFor='consentCheckbox' className={styles.consentText}>
            {t('consent.text')}{' '}
            <a href='#' className={styles.link}>
              {t('consent.link')}
            </a>
          </label>
        </div>

        <button type='submit' className={styles.submitButton}>
          {t('submit')}
        </button>
      </form>
    </div>
  );
}
