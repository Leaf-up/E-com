import { NavLink } from 'react-router-dom';
import styles from './header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <div className={styles.header__logo}>E-com</div>
        <nav className={styles.nav}>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.nav__link_active : styles.nav__link)}>
            Home
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => (isActive ? styles.nav__link_active : styles.nav__link)}>
            Login
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
