import { useState } from 'react';
import eyeClosedIcon from '/icons/eye-closed.svg';
import eyeIcon from '/icons/eye.svg';
import { Input } from '~/shared';
import { checkRules, validationRules } from '~/utils';
import type InputPasswordProps from './types';
import styles from './input-password.module.css';

const passwordRules = validationRules().notEmpty().noSpaces().minSize(8).password().finalize();
const validatePassword = (password: string | null) => checkRules(password, passwordRules);

export function InputPassword({ setValid }: InputPasswordProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  return (
    <Input
      label="Password*"
      type={show ? 'text' : 'password'}
      name="password"
      id="password"
      errorMessage={errorMessage}
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
      onChange={(password) => {
        const error = validatePassword(password);
        setErrorMessage(error);
        setValid(!error);
      }}
    />
  );
}
