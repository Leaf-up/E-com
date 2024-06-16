import styles from './.module.css';

const daveSrc = '/image/dave.png';
const witchSrc = '/image/witch3.png';

export default function Providers() {
  return (
    <section className={styles.providers}>
      <h3>Our providers:</h3>
      <div className={styles.providers__card}>
        <img src={daveSrc} alt="dave" />
        <p>
          Remember Dave? Course you are! His family are owners of Lucky farm that provide awesome seeds for a future
          plants.
        </p>
      </div>
      <div className={styles.providers__card}>
        <img src={witchSrc} alt="witch" />
        <p>Young hermit witch from enchanted forest. Provides charmed seeds with various effects.</p>
      </div>
    </section>
  );
}
