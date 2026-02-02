'use client';

import { useState } from 'react';
import styles from './HowToStart.module.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const steps = [
  {
    title: 'IMPORTANT INFORMATION:',
    content: (
      <ul>
        <li>
          1. To simplify your start, we have divided the instructions into clear
          steps.
        </li>
        <li>2. Legalize your stay and work in Poland to avoid issues.</li>
        <li>
          3. Act quickly. Timeliness in submitting documents speeds up the
          process.
        </li>
        <li>
          4. Before you start, fill out the application form on our website to
          begin your registration.
        </li>
      </ul>
    ),
  },
  {
    title: 'DRIVER DOCUMENT PREPARATION',
    content: (
      <p>
        Please prepare the following documents: a valid driver’s license, a
        passport or ID card, and any necessary permits for working in Poland.
        Our specialists will help you with all the paperwork to legalize your
        employment.
      </p>
    ),
  },
  {
    title: 'PHONE SETUP',
    content: (
      <p>
        To start accepting orders, you need a smartphone with the Uber, Bolt,
        and FreeNow apps installed. Our team will help you configure the
        applications correctly and set up your driver profile.
      </p>
    ),
  },
  {
    title: 'MEETING AT VONCO PARTNERS OFFICE',
    content: (
      <p>
        After your online registration, you will be invited for a short meeting
        at our office. During the meeting, you will sign a transparent contract
        and get answers to all your questions.
      </p>
    ),
  },
  {
    title: 'START',
    content: (
      <p>
        Congratulations! After completing all the above steps, you are ready to
        start working as a driver with Vonco Partners. You can now log into the
        apps and begin earning money with a flexible schedule.
      </p>
    ),
  },
];

export default function HowToStart() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number | null) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.mainTitle}>Как начать работать</h2>
      <p className={styles.subtitle}>на арендованном такси Bolt Uber FreeNow</p>
      <p className={styles.introText}>
        Мы приглашаем вас ознакомиться с нашим подробным пошаговым руководством,
        которое поможет вам начать работу с нашим арендованным такси.
      </p>

      <div className={styles.accordion}>
        {steps.map((step, index) => (
          <div key={index} className={styles.accordionItem}>
            <button
              className={styles.accordionHeader}
              onClick={() => handleToggle(index)}
            >
              <div className={styles.accordionHeaderContent}>
                <span className={styles.stepNumber}>{index + 1}</span>
                <span className={styles.stepTitle}>{step.title}</span>
              </div>
              <span className={styles.accordionIcon}>
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            <div
              className={`${styles.accordionContent} ${
                openIndex === index ? styles.open : ''
              }`}
            >
              <div className={styles.accordionContentInner}>{step.content}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
