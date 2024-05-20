import { Link } from 'react-router-dom';
import styles from './form-link.module.css';
import type FormLinkProps from './types';

export function FormLink({ text, linkText, path }: FormLinkProps) {
  return (
    <div className={styles.form_link}>
      {text}
      {'\u00A0'}
      <Link to={path} className={styles.form_link__item}>
        {linkText}
      </Link>
    </div>
  );
}
