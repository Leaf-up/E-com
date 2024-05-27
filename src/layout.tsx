import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './widgets';
import Loader from './ui/loader/loader';
import './styles.css';

export function Layout() {
  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </Suspense>
  );
}
