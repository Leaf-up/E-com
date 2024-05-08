import { useState, type FormEvent } from 'react';
import { InputEmail, InputPassword } from '~/ui';
import styles from './login-form.module.css';

export function LoginForm() {
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Perform login
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <InputEmail setValid={setEmailValid} />
      <InputPassword setValid={setPasswordValid} />
      <button className={styles.form__button} type="submit" disabled={!emailValid || !passwordValid}>
        Login
      </button>
    </form>
  );
}
