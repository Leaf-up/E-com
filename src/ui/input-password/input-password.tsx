import { useEffect, useState } from 'react';
import { Input } from '~/shared';
import { checkRules, validationRules } from '~/utils';
import InputPasswordProps from './types';
import eyeClosedIcon from '../../assets/icons/eye-closed.svg';
import eyeIcon from '../../assets/icons/eye.svg';
import styles from './input-password.module.css';

const passwordRules = validationRules().notEmpty().noSpaces().minSize(8).password().finalize();
const validatePassword = (password: string | null) => checkRules(password, passwordRules);

export function InputPassword({ setValid }: InputPasswordProps) {
  const [value, setValue] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  const errorMessage = validatePassword(value);

  useEffect(() => {
    setValid(!errorMessage);
  }, [errorMessage, setValid]);

  return (
    <Input
      label="Password"
      type={show ? 'text' : 'password'}
      name="password"
      id="password"
      errorMessage={value !== null ? errorMessage : null}
      placeholder="Enter your password"
      inputIcon={
        <div className={styles.icon__container} onClick={() => setShow(!show)} aria-hidden="true">
          {show ? (
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
