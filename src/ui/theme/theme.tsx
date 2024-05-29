import React from 'react';
import { customerStore } from '~/entities';
import styles from './theme.module.css';

export function ThemeSwitcher() {
  const [dark, setDark] = React.useState(customerStore.theme === 'dark');

  const changeHandler = ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
    document.documentElement.classList.toggle('dark', checked);
    document.documentElement.style.setProperty('--dark-theme', checked ? '1' : '0');
    customerStore.theme = checked ? 'dark' : 'light';
    setDark(checked);
  };

  return (
    <div className={styles.theme}>
      <input className={styles.theme__switcher} type="checkbox" checked={dark} onChange={changeHandler} />
    </div>
  );
}
