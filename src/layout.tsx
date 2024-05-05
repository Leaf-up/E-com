import { Outlet } from 'react-router-dom';
import { Header } from './widgets';

export function Layout() {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </>
  );
}
