import styles from './AboutUs.module.css';

export default function AboutUs() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.mainTitle}>About Us</h1>
        <p className={styles.tagline}>
          Your trusted partner for a successful career on the road.
        </p>
      </header>

      <section className={styles.introSection}>
        <div
          className={styles.imagePlaceholder}
          style={{ backgroundImage: "url('/voncoCar.jpg')" }}
        ></div>
        <div className={styles.introText}>
          <p>
            At **Vonco.partners**, our story began over **5 years ago** with a
            simple mission: to empower talented drivers and connect them with
            exceptional opportunities in the ever-evolving world of
            ride-sharing. We saw a need for a partner who was not just a service
            provider but a genuine advocate for their drivers success.
          </p>
          <p>
            From our headquarters in **Katowice, Poland**, we have built a team
            with deep industry knowledge and a passion for people. We have
            helped hundreds of drivers like you achieve financial independence,
            flexibility, and professional growth. We understand the challenges
            and triumphs of life on the road, and we are here to make every
            journey a smooth one.
          </p>
        </div>
      </section>

      <section className={styles.missionSection}>
        <h2 className={styles.sectionTitle}>Our Mission</h2>
        <div className={styles.missionGrid}>
          <div className={styles.missionItem}>
            <h3 className={styles.subheading}>Empowerment</h3>
            <p>
              We provide the tools and support you need to maximize your
              earnings, with a transparent commission structure and daily
              payouts that put you in control of your finances.
            </p>
          </div>
          <div className={styles.missionItem}>
            <h3 className={styles.subheading}>Security</h3>
            <p>
              Your peace of mind is our priority. We offer secure, official
              employment with a direct contract that guarantees your salary and
              gives you access to full state-sponsored social benefits.
            </p>
          </div>
          <div className={styles.missionItem}>
            <h3 className={styles.subheading}>Community</h3>
            <p>
              When you join Vonco.partners, you become part of a supportive
              community. Our 24/7 multilingual support team is always on standby
              to assist you, ensuring you are never alone.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <h2 className={styles.sectionTitle}>What Sets Us Apart?</h2>
        <ul className={styles.valuesList}>
          <li>
            <span className={styles.valueTitle}>Personalized Support:</span> For
            those new to Poland, we go the extra mile to help you settle in.
            From opening a bank account to handling documents, we’re your first
            and best resource.
          </li>
          <li>
            <span className={styles.valueTitle}>Flexible Freedom:</span> We
            offer an unmatched level of scheduling flexibility. You decide when
            and where you work, giving you the freedom to build a career that
            fits your life.
          </li>
          <li>
            <span className={styles.valueTitle}>Modern Fleet:</span> For drivers
            who need a vehicle, our fleet of modern cars (2016-2021 models) is
            meticulously maintained to ensure your safety and comfort.
          </li>
        </ul>
      </section>

      <section className={styles.callToActionSection}>
        <p className={styles.callToAction}>
          Ready to take control of your career and join a partner that truly
          values your success?
        </p>
        <button className={styles.ctaButton}>Join Our Team Today</button>
      </section>
    </div>
  );
}
