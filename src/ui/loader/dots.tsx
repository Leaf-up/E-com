import styles from './dots.module.css';

export default function LoaderDots() {
  return (
    <div className={styles.loader__dots}>
      <span className={styles.loader__dots_element} />
      <span className={styles.loader__dots_element} />
      <span className={styles.loader__dots_element} />
    </div>
  );
}
