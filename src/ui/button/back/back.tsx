import { NavLink } from 'react-router-dom';

import styles from './back.module.css';

export default function ButtonBack({ children, to }: { children: JSX.Element | string; to: string }) {
  return (
    <NavLink className={styles.button__back} to={to}>
      {children}
    </NavLink>
  );
}
