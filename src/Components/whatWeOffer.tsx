import styles from './WhatWeOffer.module.css';

export default function WhatWeOffer() {
  const offerings = [
    {
      title: 'Transparent Payouts Every Monday',
      description:
        'Money transfers are made every Monday directly to your bank account.',
    },
    {
      title: 'Official Employment',
      description:
        'Transparent contract and timely salary payments guaranteed.',
    },
    {
      title: 'Document Processing',
      description:
        'Our specialists will help you with all necessary documents and legalization in Poland.',
    },
    {
      title: 'Flexible Working Hours',
      description: 'Work at a time that is convenient for you.',
    },
    {
      title: '24/7 Support',
      description:
        'We will help you quickly solve any problem or question you have.',
    },
    {
      title: 'New, Economical Vehicles',
      description:
        'All cars in our fleet are insured and equipped with gas installations.',
    },
    {
      title: 'Starting Bonuses',
      description:
        'Receive a 100% discount on the use of Uber, Bolt, and FreeNow apps.',
    },
    {
      title: 'Insurance',
      description: 'We provide assistance with medical insurance.',
    },
    {
      title: 'Refer-a-Friend Promotion',
      description:
        'Recommend work at Hej! and receive a monetary reward for every new driver you register.',
    },
    {
      title: 'Work With Your Own Car',
      description: 'We handle the formalities, so you can focus on driving.',
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>What We Offer</h2>
      <div className={styles.offeringsGrid}>
        {offerings.map((offer, index) => (
          <div key={index} className={styles.card}>
            <h3 className={styles.cardTitle}>{offer.title}</h3>
            <p className={styles.cardDescription}>{offer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
