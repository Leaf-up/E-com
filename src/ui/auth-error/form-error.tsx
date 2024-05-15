import styles from './form-error.module.css';

export default function FormError({ error }: { error: string }) {
  return <span className={styles.form__error}>{error ?? '\u00a0'}</span>;
}
