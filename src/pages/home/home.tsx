import { NavLink } from 'react-router-dom';
import styles from './home.module.css';

const imgSrc = '/image/people-02.svg';

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
];

export function NavigationMenu() {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => (isActive ? styles.nav__link_active : styles.nav__link);

  return (
    <nav>
      <ul className={styles.nav__list}>
        {menu.map((item) => (
          <li key={item.title}>
            {item.route && (
              <NavLink to={item.route} className={getLinkClass}>
                {item.title}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Home() {
  return (
    <div className={styles.home}>
      <NavigationMenu />
      <img className={styles.home__img} src={imgSrc} alt="welcome" />
    </div>
  );
}
