import InputProps from './types';
import styles from './input.module.css';

export function Input({
  type = 'text',
  label,
  name,
  id,
  errorMessage,
  placeholder,
  value,
  readonly,
  inputIcon,
  onChange,
  onClick,
}: InputProps) {
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
          value={value}
          autoComplete="off"
          readOnly={readonly}
          onChange={(e) => onChange?.(e.currentTarget.value)}
          onClick={(e) => onClick?.(e.currentTarget.value)}
        />
        {errorMessage && <div className={styles.message}>{errorMessage}</div>}
        {inputIcon && inputIcon}
      </div>
    </div>
  );
}
