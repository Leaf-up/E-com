import { NavLink } from 'react-router-dom';
import styles from './.module.css';

export type TRoute = {
  title: string;
  link: string;
};

export const Breadcrumbs = ({ items = [] }: { items?: TRoute[] }) => {
  return (
    <nav className={styles.nav}>
      <p className={styles.title}>
        {items.length > 0 &&
          items.map((item, index) => {
            if (index === items.length - 1) {
              return <span key={index}>{item.title}</span>;
            } else {
              return (
                <span key={index}>
                  <NavLink className={styles.link} to={item.link}>
                    {item.title}
                  </NavLink>
                  {' / '}
                </span>
              );
            }
          })}
      </p>
    </nav>
  );
};
