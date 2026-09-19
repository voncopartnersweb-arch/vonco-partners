'use client';
import { useState, useId } from 'react'; // Використовуємо useId для унікальних ID
import { formStyles as styles } from '@/lib/uiStyles';
import { useTranslations } from 'next-intl';
import NavLink from './ClientComponents/NavLink';
import QuickContact from './QuickContact/QuickContact';
import { COMPANY } from '@/data/company';
import { trackEvent } from '@/lib/analytics';
import { submitDriverApplication } from '@/lib/lead-client';
import {
  PREFERRED_CONTACT_METHODS,
  type PreferredContactMethod,
} from '@/lib/contact-methods';

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

type FormDataState = {
  name: string;
  phoneNumber: string;
  email: string;
  city: string;
  consent: boolean;
  preferredContactMethods: PreferredContactMethod[];
  company: string;
};

type DriverFormProps = {
  variant?: 'page' | 'modal';
  showIntro?: boolean;
  labelledBy?: string;
};

export default function DriverForm({
  variant = 'page',
  showIntro = true,
  labelledBy,
}: DriverFormProps) {
  const t = useTranslations('DriverForm');
  const sectionId = useId();
  const fieldId = (name: string) => `${name}-${sectionId}`;

  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    phoneNumber: '',
    email: '',
    city: '',
    consent: false,
    preferredContactMethods: [],
    company: '',
  });
  const [hasStarted, setHasStarted] = useState(false);
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>('idle');
  const preferredContactLabels: Record<PreferredContactMethod, string> = {
    telegram: 'Telegram',
    viber: 'Viber',
    whatsapp: 'WhatsApp',
    call: t('preferredContact.call'),
    sms: 'SMS',
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (submissionStatus === 'success' || submissionStatus === 'error') {
      setSubmissionStatus('idle');
    }

    if (name === 'city' && value) {
      trackEvent('application_city_select', {
        city: value,
        locale: document.documentElement.lang,
        page_path: window.location.pathname,
      });
    }
  };

  const handlePreferredContactChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const method = event.target.value as PreferredContactMethod;
    setFormData((previous) => ({
      ...previous,
      preferredContactMethods: event.target.checked
        ? [...previous.preferredContactMethods, method]
        : previous.preferredContactMethods.filter((item) => item !== method),
    }));
    if (submissionStatus === 'success' || submissionStatus === 'error') {
      setSubmissionStatus('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submissionStatus === 'submitting') return;

    const { city } = formData;
    const locale = document.documentElement.lang || 'pl';
    setSubmissionStatus('submitting');

    try {
      const wasSent = await submitDriverApplication({
        ...formData,
        locale,
        pagePath: `${window.location.pathname}${window.location.search}`,
      });
      if (!wasSent) throw new Error('Lead submission failed.');

      trackEvent('application_submit', {
        city,
        locale,
        page_path: window.location.pathname,
        transport: 'resend',
      });

      setFormData({
        name: '',
        phoneNumber: '',
        email: '',
        city: '',
        consent: false,
        preferredContactMethods: [],
        company: '',
      });
      setSubmissionStatus('success');
    } catch {
      setSubmissionStatus('error');
    }
  };

  return (
    <section
      className={variant === 'modal' ? styles.modalContainer : styles.container}
      aria-labelledby={labelledBy ?? `title-${sectionId}`}
    >
      {showIntro ? (
        <>
          <h2 id={`title-${sectionId}`} className={styles.mainTitle}>
            {t('title')}
          </h2>
          <p className={styles.subTitle}>{t('subtitle')}</p>
        </>
      ) : null}

      <form
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate={false}
        onFocusCapture={() => {
          if (hasStarted) return;
          setHasStarted(true);
          trackEvent('application_form_start', {
            locale: document.documentElement.lang,
            page_path: window.location.pathname,
          });
        }}
      >
        <div className={styles.visuallyHidden} aria-hidden='true'>
          <label htmlFor={fieldId('company')}>Company</label>
          <input
            id={fieldId('company')}
            type='text'
            name='company'
            tabIndex={-1}
            autoComplete='off'
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        {/* Поле імені */}
        <div className={styles.fieldWrapper}>
          <label htmlFor={fieldId('name')} className={styles.visuallyHidden}>
            {t('fields.name')}
          </label>
          <input
            id={fieldId('name')}
            type='text'
            name='name'
            minLength={2}
            placeholder={t('fields.name')}
            className={styles.inputField}
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Телефон */}
        <div className={styles.fieldWrapper}>
          <label htmlFor={fieldId('phoneNumber')} className={styles.visuallyHidden}>
            {t('fields.phone')}
          </label>
          <input
            id={fieldId('phoneNumber')}
            type='tel'
            name='phoneNumber'
            required={!formData.email.trim()}
            placeholder={t('fields.phone')}
            className={styles.inputField}
            value={formData.phoneNumber}
            onChange={handleChange}
            aria-required={!formData.email.trim()}
            aria-describedby={fieldId('contactRequirement')}
          />
        </div>

        {/* Email */}
        <div className={styles.fieldWrapper}>
          <label htmlFor={fieldId('email')} className={styles.visuallyHidden}>
            {t('fields.email')}
          </label>
          <input
            id={fieldId('email')}
            type='email'
            name='email'
            required={!formData.phoneNumber.trim()}
            placeholder={t('fields.email')}
            className={styles.inputField}
            value={formData.email}
            onChange={handleChange}
            aria-required={!formData.phoneNumber.trim()}
            aria-describedby={fieldId('contactRequirement')}
          />
        </div>

        {/* Місто */}
        <div className={styles.fieldWrapper}>
          <label htmlFor={fieldId('city')} className={styles.visuallyHidden}>
            {t('fields.cityPlaceholder')}
          </label>
          <select
            id={fieldId('city')}
            name='city'
            className={styles.inputField}
            value={formData.city}
            onChange={handleChange}
          >
            <option value='' disabled>
              {t('fields.cityPlaceholder')}
            </option>
            {[
              'katowice',
              'krakow',
              'gdansk',
              'gdynia',
              'sopot',
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

        <p id={fieldId('contactRequirement')} className={styles.contactRequirement}>
          {t('contactRequirement')}
        </p>

        <fieldset className={styles.preferencesFieldset}>
          <legend className={styles.preferencesLegend}>
            {t('preferredContact.title')}
          </legend>
          <div className={styles.preferenceOptions}>
            {PREFERRED_CONTACT_METHODS.map((method) => (
              <label className={styles.preferenceLabel} key={method}>
                <input
                  type='checkbox'
                  name='preferredContactMethods'
                  value={method}
                  className={styles.preferenceCheckbox}
                  checked={formData.preferredContactMethods.includes(method)}
                  onChange={handlePreferredContactChange}
                />
                <span>{preferredContactLabels[method]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Згода */}
        <div className={styles.consentContainer}>
          <input
            type='checkbox'
            name='consent'
            id={fieldId('consentCheckbox')}
            className={styles.checkbox}
            checked={formData.consent}
            onChange={handleChange}
          />
          <label htmlFor={fieldId('consentCheckbox')} className={styles.consentLabel}>
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

        <button
          type='submit'
          className={styles.submitButton}
          disabled={submissionStatus === 'submitting'}
        >
          {submissionStatus === 'submitting' ? t('sending') : t('submit')}
        </button>

        <p
          className={
            submissionStatus === 'error'
              ? styles.errorMessage
              : styles.statusMessage
          }
          role={submissionStatus === 'error' ? 'alert' : 'status'}
          aria-live='polite'
        >
          {submissionStatus === 'success' && t('success')}
          {submissionStatus === 'error' && t('error')}
        </p>
      </form>
      <QuickContact phoneNumber={COMPANY.phones.katowiceRegion.tel} />
    </section>
  );
}
