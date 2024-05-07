import { useEffect, useState } from 'react';
import { Input } from '~/shared';
import { checkRules, validationRules } from '~/utils';
import eyeClosedIcon from '../../assets/icons/eye-closed.svg';
import eyeIcon from '../../assets/icons/eye.svg';
import styles from './input-password.module.css';

interface InputPasswordProps {
  value: string | null;
  setValue: (value: string) => void;
  setValid: (valid: boolean) => void;
}

const passwordRules = validationRules().nullable().notEmpty().noSpaces().minSize(8).password().finalize();
const validatePassword = (password: string | null) => checkRules(password, passwordRules);

export function InputPassword({ value, setValue, setValid }: InputPasswordProps) {
  const [eyeImg, setEyeImg] = useState(false);

  const errorMessage = validatePassword(value);

  useEffect(() => {
    setValid(!errorMessage);
  }, [errorMessage, setValid]);

  return (
    <Input
      label="Password"
      type={eyeImg ? 'text' : 'password'}
      id="password"
      errorMessage={errorMessage}
      placeholder="Enter your password"
      inputIcon={
        <div className={styles.icon__container} onClick={() => setEyeImg(!eyeImg)} aria-hidden="true">
          {eyeImg ? (
            <img className={styles.icon} src={eyeIcon} alt="eye" />
          ) : (
            <img className={styles.icon} src={eyeClosedIcon} alt="closed eye" />
          )}
        </div>
      }
      onInput={(password) => setValue(password)}
    />
  );
}
