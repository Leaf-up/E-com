import { LoginForm } from '~/widgets';

import styles from './login.module.css';

export function Login() {
  return (
    <section className={styles.login}>
      <LoginForm />
    </section>
  );
}
