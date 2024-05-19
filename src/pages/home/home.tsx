import { NavLink } from 'react-router-dom';
import { useCustomer } from '~/entities';

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

export function Home() {
  const { user } = useCustomer();
  return (
    <div>
      <nav>
        <ul>
          {menu
            .filter((el) => (user ? el.customer === Boolean(user) && !el.action : !el.action))
            .map((item) => (
              <li key={item.title}>{item.route && <NavLink to={item.route}>{item.title}</NavLink>}</li>
            ))}
        </ul>
      </nav>
    </div>
  );
}
