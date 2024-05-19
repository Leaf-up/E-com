import { NavLink } from 'react-router-dom';
import styles from './header.module.css';
import { Nav } from '../nav/nav';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <div className={styles.header__logo}>
          <NavLink to="/" className={styles.header__logo_img} />
          <span className={styles.header__logo_title}>E-com</span>
        </div>
        <Nav />
        <div className={styles.header__logo} />
      </div>
    </header>
  );
}
