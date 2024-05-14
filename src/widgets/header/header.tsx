import { NavLink } from 'react-router-dom';
import styles from './header.module.css';
import { useCustomer } from '~/entities';

const menu = [
  {
    title: 'Home',
    route: '/',
    customer: true,
  },
  {
    title: 'Login',
    route: '/login',
    customer: false,
  },
  {
    title: 'Register',
    route: '/register',
    customer: false,
  },
  {
    title: 'Test',
    route: '/test',
    customer: true,
  },
  {
    title: 'Logout',
    action: 'logout',
    customer: true,
  },
];

export function Header() {
  const { user, logout } = useCustomer();
  const getLinkClass = ({ isActive }: { isActive: boolean }) => (isActive ? styles.nav__link_active : styles.nav__link);

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <div className={styles.header__logo}>
          <NavLink to="/" className={styles.header__logo_img} />
          <span className={styles.header__logo_title}>E-com</span>
        </div>
        <nav>
          <ul className={styles.nav__list}>
            {menu
              .filter((el) => el.customer === Boolean(user))
              .map((item) => (
                <li key={item.title}>
                  {item.route && (
                    <NavLink to={item.route} className={getLinkClass}>
                      {item.title}
                    </NavLink>
                  )}
                  {item.action === 'logout' && (
                    <button type="button" className={styles.nav__link} onClick={logout}>
                      {item.title}
                    </button>
                  )}
                </li>
              ))}
          </ul>
        </nav>
        <div className={styles.header__logo} />
      </div>
    </header>
  );
}
