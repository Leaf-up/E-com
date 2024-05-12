import { NavLink } from 'react-router-dom';
import styles from './header.module.css';

const menu = [
  {
    title: 'Home',
    route: '/',
  },
  {
    title: 'Login',
    route: '/login',
  },
  {
    title: 'Register',
    route: '/register',
  },
  {
    title: 'Test',
    route: '/test',
  },
];

export function Header() {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => (isActive ? styles.nav__link_active : styles.nav__link);

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <div className={styles.header__logo}>E-com</div>
        <nav>
          <ul className={styles.nav__list}>
            {menu.map((item) => (
              <li key={item.title}>
                <NavLink to={item.route} className={getLinkClass}>
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
