import { useState, type FormEvent } from 'react';
import { InputEmail, InputPassword, ButtonSubmit, FormError, FormLink } from '~/ui';
import { TCredentials } from '~/api/auth/types';
import performLogin from '~/api/auth/login';
import message from '~/widgets/message/message';

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

    const formData = new FormData(e.currentTarget);
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

      setLoading(false);
      if (response.customer) {
        const { firstName, lastName } = response.customer;
        message.show(`Successfully logged in as ${firstName} ${lastName}`);
      }
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <InputEmail setValid={setEmailValid} />
      <InputPassword setValid={setPasswordValid} />
      <FormError error={error} />
      <ButtonSubmit loading={loading} disabled={!emailValid || !passwordValid}>
        Sign in
      </ButtonSubmit>
      <FormLink text="No account?" linkText="Create a new account" path="/register" />
    </form>
  );
}
