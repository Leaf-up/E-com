import { forwardRef } from 'react';
import type InputProps from './types';
import styles from './input.module.css';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      label,
      name,
      id,
      errorMessage,
      placeholder,
      value,
      readonly,
      defaultChecked,
      disabled,
      checked,
      inputIcon,
      onChange,
      onClick,
    }: InputProps,
    ref,
  ) => {
    return type === 'radio' || type === 'checkbox' ? (
      <div className={styles.field_check}>
        {label && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}
        <div className={styles.input_container}>
          <input
            className={styles.input}
            style={{ cursor: !disabled ? 'pointer' : 'auto' }}
            type={type}
            name={name}
            id={id}
            value={value}
            defaultChecked={defaultChecked}
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange?.(e.currentTarget.value)}
            ref={ref}
          />
        </div>
      </div>
    ) : (
      <div className={styles.field}>
        {label && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}
        <div className={styles.input_container}>
          <input
            className={errorMessage ? `${styles.input} ${styles.input_invalid}` : styles.input}
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            value={value}
            autoComplete="off"
            disabled={disabled}
            readOnly={readonly}
            onChange={(e) => onChange?.(e.currentTarget.value)}
            onClick={(e) => onClick?.(e.currentTarget.value)}
            ref={ref}
          />
          {errorMessage && <div className={styles.message}>{errorMessage}</div>}
          {inputIcon && inputIcon}
        </div>
      </div>
    );
  },
);

export { Input };
