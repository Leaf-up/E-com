import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { Layout } from './layout';
import { Home, Login, Register, PageTest, Page404, Profile, Catalog, Product } from './pages';
import { useCustomer } from './entities';

interface ProtectedRouteProps {
  isRedirect: boolean;
  redirectTo: string;
}

function ProtectedRoute({ isRedirect, redirectTo }: ProtectedRouteProps) {
  return isRedirect ? <Navigate to={redirectTo} replace /> : <Outlet />;
}

function App() {
  const { user } = useCustomer();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/catalog/:category?/:subcategory?" element={<Catalog />} />
        <Route path="/products/:category?/:subcategory?/:key" element={<Product />} />
        <Route path="/test" element={<PageTest />} />
        <Route element={<ProtectedRoute isRedirect={!user} redirectTo="/" />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<ProtectedRoute isRedirect={Boolean(user)} redirectTo="/" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default App;
