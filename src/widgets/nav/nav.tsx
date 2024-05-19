import { NavLink } from 'react-router-dom';
import { useCustomer } from '~/entities';
import styles from './nav.module.css';
import NavProps from './types';

const menu = [
  {
    title: 'Home',
    route: '/',
    customer: true,
  },
  {
    title: 'Test',
    route: '/test',
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
    title: 'Logout',
    action: 'logout',
    customer: true,
  },
];

export function Nav({ isColumn }: NavProps) {
  const { user, logout } = useCustomer();

  const getLinkClass = ({ isActive }: { isActive: boolean }) => (isActive ? styles.nav__link_active : styles.nav__link);

  const getColumnLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${getLinkClass({ isActive })} ${styles.nav__link_dark}`;

  return (
    <nav className={styles.nav}>
      <ul className={!isColumn ? styles.nav__list : `${styles.nav__list} ${styles.nav__list_column}`}>
        {menu
          .filter((el) => (user ? el.customer === Boolean(user) : !el.action))
          .map((item) => (
            <li key={item.title}>
              {item.route && (
                <NavLink to={item.route} className={isColumn ? getColumnLinkClass : getLinkClass}>
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
  );
}
