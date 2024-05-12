import { useState, type FormEvent } from 'react';
import { InputEmail, InputPassword, ButtonSubmit, FormError } from '~/ui';
import { TCredentials } from '~/api/auth/types';
import { performLogin } from '~/api';
import styles from './login-form.module.css';

export function LoginForm() {
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const credentials: TCredentials = {
      email: formData.get('email')?.toString() ?? '',
      password: formData.get('password')?.toString() ?? '',
    };
    performLogin(credentials).then((response) => {
      if (response.error) {
        setError(response.error);
        setLoading(false);
        return;
      }
      console.log(response.customer);
      setLoading(false);
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <InputEmail setValid={setEmailValid} />
      <InputPassword setValid={setPasswordValid} />
      <FormError error={error} />
      <ButtonSubmit loading={loading} disabled={!emailValid || !passwordValid}>
        Login
      </ButtonSubmit>
    </form>
  );
}
