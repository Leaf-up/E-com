import InputProps from './types';
import styles from './input.module.css';

export function Input({ type, label, name, id, errorMessage, placeholder, inputIcon, onChange, onInput }: InputProps) {
  return (
    <div className={styles.field__container}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={styles.input__container}>
        <input
          className={errorMessage ? `${styles.input} ${styles.input_invalid}` : styles.input}
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          autoComplete="off"
          onChange={(e) => onChange?.(e.currentTarget.value)}
          onInput={(e) => onInput?.(e.currentTarget.value)}
        />
        {errorMessage && <div className={styles.message}>{errorMessage}</div>}
        {inputIcon && inputIcon}
      </div>
    </div>
  );
}
