import { useState, type FormEvent } from 'react';
import { InputEmail, InputPassword } from '~/ui';
import styles from './login-form.module.css';

export function LoginForm() {
  const [email, setEmail] = useState<string | null>(null);
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [password, setPassword] = useState<string | null>(null);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // TODO: Perform login
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <InputEmail value={email} setValue={setEmail} setValid={setEmailValid} />
      <InputPassword value={password} setValue={setPassword} setValid={setPasswordValid} />
      <button
        className={styles.form__button}
        type="submit"
        disabled={!email || !password || !emailValid || !passwordValid}
      >
        Login
      </button>
    </form>
  );
}
