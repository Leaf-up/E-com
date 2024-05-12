import styles from './error.module.css';

export default function FormError({ error }: { error: string }) {
  if (!error) return null;

  return <span className={styles.form__error}>{error}</span>;
}
