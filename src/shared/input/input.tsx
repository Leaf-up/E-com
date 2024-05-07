import { ReactNode } from 'react';
import styles from './input.module.css';

interface InputProps {
  label?: string;
  id?: string;
  type: 'text' | 'password';
  errorMessage?: string | null;
  placeholder: string;
  inputIcon?: ReactNode;
  onChange?: (value: string) => void;
  onInput?: (value: string) => void;
}

export function Input({ type, label, id, errorMessage, placeholder, inputIcon, onChange, onInput }: InputProps) {
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
