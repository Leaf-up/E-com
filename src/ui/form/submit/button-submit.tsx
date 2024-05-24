import type { FC } from 'react';
import type ButtonSubmitProps from './types';
import styles from './button-submit.module.css';

const ButtonSubmit: FC<ButtonSubmitProps> = ({ children, loading, disabled }) => {
  return (
    <button className={styles.form__button} type="submit" disabled={disabled}>
      {loading ? <div className={styles.form__button_loader} /> : children}
    </button>
  );
};

export default ButtonSubmit;
