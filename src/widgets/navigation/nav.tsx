import { NavLink } from 'react-router-dom';
import { useCustomer } from '~/entities/customer/customer';
import type NavProps from './types';

import styles from './nav.module.css';

const logoutIcon = '/icons/logout.svg';
const profileIcon = '/icons/profile.svg';
const basketIcon = '/icons/basket.svg';

const topMenu = [
  {
    title: 'Home',
    route: '/',
    customer: null,
  },
  {
    title: 'Catalog',
    route: '/catalog',
    customer: null,
  },
  {
    title: 'Test',
    route: '/test',
    customer: null,
  },
  {
    title: 'About',
    route: '/about',
    customer: null,
  },
];

const userActionsMenu = [
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
    icon: profileIcon,
  },
  {
    title: 'Basket',
    route: '/basket',
    customer: null,
    icon: basketIcon,
  },
  {
    title: 'Logout',
    action: 'logout',
    customer: true,
    icon: logoutIcon,
  },
];

export function NavigationMenu({ isColumn, onClick }: NavProps) {
  const { user, logout } = useCustomer();

  const getLinkClass = ({ isActive }: { isActive: boolean }) => (isActive ? styles.nav__link_active : styles.nav__link);

  return (
    <nav className={!isColumn ? styles.nav : `${styles.nav} ${styles.nav_column}`}>
      <ul className={!isColumn ? styles.nav__list : `${styles.nav__list} ${styles.nav__list_column}`}>
        {topMenu.map(
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
        {userActionsMenu
          .filter((el) => el.customer === null || el.customer === Boolean(user))
          .map((item) => (
            <li key={item.title}>
              {item.route && !item.customer && !item.icon && (
                <NavLink to={item.route} className={getLinkClass} onClick={onClick}>
                  {item.title}
                </NavLink>
              )}
              {item.route && item.icon && (
                <NavLink to={item.route} className={styles.nav__link} onClick={onClick}>
                  <img src={item.icon} alt={item.title.toLowerCase()} className={styles.icon} />
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
                  <img src={item.icon} alt={item.title.toLowerCase()} className={styles.icon} />
                </button>
              )}
            </li>
          ))}
      </ul>
    </nav>
  );
}
