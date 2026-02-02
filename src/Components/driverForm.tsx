'use client';
import { useState } from 'react';
import styles from './DriverForm.module.css';
import { useTranslations } from 'next-intl';

export default function DriverForm() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    city: '',
    consent: false,
  });
  const t = useTranslations('HomePage');

  const handleChange = (e: {
    target: { name: string; value?: string; type?: string; checked?: boolean };
  }) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    const { email, city, name, phoneNumber } = formData;
    const body = `
Hi! I would like to join your flat partner and became a taxi driver! There is my data to get in touch with me:
Email: ${email}
City: ${city}
Name: ${name}
Phone: ${phoneNumber}
`;
    const encodedBody = encodeURIComponent(body);
    e.preventDefault();
    window.location.href = `mailto:alejandroburdenyk@gmail.com?subject=Work as a taxi driver&body=${encodedBody}`;

    console.log('Form Data Submitted:', formData);
    // You can add your form submission logic here (e.g., API call)
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
      <p className={styles.subTitle}>Send us email for contact</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder='Name'
          className={styles.inputField}
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type='tel'
          name='phoneNumber'
          placeholder='Phone number'
          className={styles.inputField}
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <input
          type='email'
          name='email'
          placeholder='E-mail'
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
            City where you want to work *
          </option>
          <option value='katowice'>Katowice</option>
          <option value='krakow'>Krakow</option>
          {/* Add more cities here */}
        </select>
        <div className={styles.consentContainer}>
          <input
            type='checkbox'
            name='consent'
            id='consentCheckbox'
            className={styles.checkbox}
            checked={formData.consent}
            onChange={handleChange}
            required
          />
          <label htmlFor='consentCheckbox' className={styles.consentText}>
            I consent to the processing of my personal data provided in the form
            for marketing purposes. I declare that I have read and marked all
            the consents given{' '}
            <a href='#' className={styles.link}>
              here
            </a>
            .
          </label>
        </div>
        <button type='submit' className={styles.submitButton}>
          SEND
        </button>
      </form>
    </div>
  );
}
