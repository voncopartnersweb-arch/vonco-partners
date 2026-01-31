import styles from './WorkWithUs.module.css';

export default function WorkWithUs() {
  return (
    <div className={styles.container}>
      {/* <h1 className={styles.mainTitle}>Work with us</h1> */}
      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Us</h2>
          <h3 className={styles.subheading}>
            Your Partner on the Road to Success
          </h3>
          <p>
            At **Vonco.partners**, we believe in empowering drivers with the
            tools, support, and opportunities they need to build a successful
            career. Based in **Katowice, Poland**, our team brings over **5
            years** of industry experience to help you thrive in the taxi and
            ride-sharing industry. We are more than just a partner—we are a
            dedicated team committed to your professional growth and financial
            independence.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Why Drive with Us?</h2>

          <h3 className={styles.subheading}>
            Exceptional Earning Potential & Daily Payouts
          </h3>
          <p>
            Your hard work deserves to be rewarded. With our extensive network
            of orders and competitive commission structure, you have the
            potential to earn **up to 12,000 zł per month**. We value your
            financial well-being, which is why we ensure your earnings are
            transferred to your account every single day.
          </p>

          <h3 className={styles.subheading}>Unmatched Flexibility & Freedom</h3>
          <p>
            Take control of your work-life balance. We offer a completely
            flexible schedule, allowing you to work when and where you want.
            Whether you are looking for a full-time career or a part-time side
            hustle, our platform puts you in the driver s seat of your own
            success.
          </p>

          <h3 className={styles.subheading}>
            Full Support, Every Step of the Way
          </h3>
          <p>
            We are here for you **24/7**. Our dedicated dispatch team provides
            round-the-clock technical support in both Russian and Polish,
            ensuring you’re never alone on the road. For those new to Poland,
            our comprehensive assistance package helps with adapting to your new
            home—from bank accounts and mobile services to insurance and
            document processing.
          </p>

          <h3 className={styles.subheading}>Secure & Official Employment</h3>
          <p>
            Drive with peace of mind. Your contract is directly with us, a
            certified partner, which guarantees timely salary payments and full
            social benefits from the state. We are committed to providing a
            secure and stable working environment for all our drivers.
          </p>

          <p className={styles.callToAction}>
            Whether you have your own vehicle or need one from our modern fleet
            of 2016-2021 models, we have a place for you. Join a community of
            professional drivers and start your journey with a partner that
            truly values you. At **Vonco.partners**, your success is our
            mission.
          </p>
        </section>
      </div>
    </div>
  );
}
