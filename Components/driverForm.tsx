'use client';
import { useState, useId } from 'react'; // Використовуємо useId для унікальних ID
import styles from './DriverForm.module.css';
import { useTranslations } from 'next-intl';
import NavLink from './ClientComponents/NavLink';
import QuickContact from './QuickContact/QuickContact';
import { COMPANY, COMPANY_EMAIL_HREF } from '@/data/company';

export default function DriverForm() {
  const t = useTranslations('DriverForm');
  const sectionId = useId();

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
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) return;

    const { email, city, name, phoneNumber } = formData;
    const body = `${t('email.bodyIntro')}\nEmail: ${email}\nCity: ${city}\nName: ${name}\nPhone: ${phoneNumber}`;

    window.location.href = `${COMPANY_EMAIL_HREF}?subject=${encodeURIComponent(
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
    <section aria-labelledby={`title-${sectionId}`}>
      <h2 id={`title-${sectionId}`} className={styles.mainTitle}>
        {t('title')}
      </h2>
      <p className={styles.subTitle}>{t('subtitle')}</p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate={false}>
        {/* Поле імені */}
        <div className={styles.fieldWrapper}>
          <label htmlFor='name' className={styles.visuallyHidden}>
            {t('fields.name')}
          </label>
          <input
            id='name'
            type='text'
            name='name'
            required
            minLength={2}
            placeholder={t('fields.name')}
            className={styles.inputField}
            value={formData.name}
            onChange={handleChange}
            aria-required='true'
          />
        </div>

        {/* Телефон */}
        <div className={styles.fieldWrapper}>
          <label htmlFor='phoneNumber' className={styles.visuallyHidden}>
            {t('fields.phone')}
          </label>
          <input
            id='phoneNumber'
            type='tel'
            name='phoneNumber'
            required
            placeholder={t('fields.phone')}
            className={styles.inputField}
            value={formData.phoneNumber}
            onChange={handleChange}
            aria-required='true'
          />
        </div>

        {/* Email */}
        <div className={styles.fieldWrapper}>
          <label htmlFor='email' className={styles.visuallyHidden}>
            {t('fields.email')}
          </label>
          <input
            id='email'
            type='email'
            name='email'
            required
            placeholder={t('fields.email')}
            className={styles.inputField}
            value={formData.email}
            onChange={handleChange}
            aria-required='true'
          />
        </div>

        {/* Місто */}
        <div className={styles.fieldWrapper}>
          <label htmlFor='city' className={styles.visuallyHidden}>
            {t('fields.cityPlaceholder')}
          </label>
          <select
            id='city'
            name='city'
            required
            className={styles.inputField}
            value={formData.city}
            onChange={handleChange}
            aria-required='true'
          >
            <option value='' disabled>
              {t('fields.cityPlaceholder')}
            </option>
            {[
              'katowice',
              'krakow',
              'gdansk',
              'gdynia',
              'bielsko_biala',
              'oswiecim',
              'zakopane',
              'zator',
            ].map((city) => (
              <option key={city} value={city}>
                {t(`cities.${city}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Згода */}
        <div className={styles.consentContainer}>
          <input
            type='checkbox'
            name='consent'
            id='consentCheckbox'
            className={styles.checkbox}
            checked={formData.consent}
            onChange={handleChange}
            required
            aria-required='true'
          />
          <label htmlFor='consentCheckbox' className={styles.consentLabel}>
            <span className={styles.consentText}>
              {t('consent.text')}{' '}
              <NavLink
                aria-label={t('consent.link')}
                href='/privacy-policy'
                activeStyle={styles.link}
                unActiveStyle={styles.link}
              >
                {t('consent.link')}
              </NavLink>
            </span>
          </label>
        </div>

        <button type='submit' className={styles.submitButton}>
          {t('submit')}
        </button>
      </form>
      <QuickContact phoneNumber={COMPANY.phones.katowiceRegion.tel} />
    </section>
  );
}
