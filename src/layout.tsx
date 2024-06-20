import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from './widgets';
import Loader from './ui/loader/loader';
import './styles/global.css';

export function Layout() {
  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <main className="main">
        <Outlet />
        <Footer />
      </main>
    </Suspense>
  );
}
