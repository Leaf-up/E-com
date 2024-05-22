import { NavLink } from 'react-router-dom';
import { useCustomer } from '~/entities';
import type NavProps from './types';
import logoutIcon from '/icons/logout.svg';
import profileIcon from '/icons/profile.svg';
import styles from './nav.module.css';

const menu = [
  {
    title: 'Home',
    route: '/',
    customer: null,
  },
  {
    title: 'Test',
    route: '/test',
    customer: null,
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
    title: 'Profile',
    route: '/profile',
    customer: true,
  },
  {
    title: 'Logout',
    action: 'logout',
    customer: true,
  },
];

export function NavigationMenu({ isColumn, onClick }: NavProps) {
  const { user, logout } = useCustomer();

  const getLinkClass = ({ isActive }: { isActive: boolean }) => (isActive ? styles.nav__link_active : styles.nav__link);

  return (
    <nav className={!isColumn ? styles.nav : `${styles.nav} ${styles.nav_column}`}>
      <ul className={!isColumn ? styles.nav__list : `${styles.nav__list} ${styles.nav__list_column}`}>
        {menu
          .filter((el) => el.customer === null)
          .map(
            (item) =>
              item.route && (
                <li key={item.title}>
                  <NavLink to={item.route} className={getLinkClass} onClick={onClick}>
                    {item.title}
                  </NavLink>
                </li>
              ),
          )}
      </ul>
      <ul className={!isColumn ? styles.nav__list : `${styles.nav__list} ${styles.nav__list_column}`}>
        {menu
          .filter((el) => el.customer === Boolean(user))
          .map((item) => (
            <li key={item.title}>
              {item.route && !item.customer && (
                <NavLink to={item.route} className={getLinkClass} onClick={onClick}>
                  {item.title}
                </NavLink>
              )}
              {item.route && item.title === 'Profile' && (
                <NavLink to={item.route} className={styles.nav__link} onClick={onClick}>
                  <img src={profileIcon} alt="profile" className={styles.icon} />
                </NavLink>
              )}
              {item.action === 'logout' && (
                <button
                  type="button"
                  className={styles.nav__link}
                  onClick={() => {
                    logout();
                    onClick && onClick();
                  }}
                >
                  <img src={logoutIcon} alt="logout" className={styles.icon} />
                </button>
              )}
            </li>
          ))}
      </ul>
    </nav>
  );
}
