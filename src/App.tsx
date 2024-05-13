import { Route, Routes } from 'react-router-dom';
import { Layout } from './layout';
import { Home, Login, Register, Test } from './pages';
import './styles.css';
import { ProtectedRoute, useCustomer } from './entities';

function App() {
  const { user } = useCustomer();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<ProtectedRoute isRedirect={!user} redirectTo="/login" />}>
          <Route index element={<Home />} />
          <Route path="/test" element={<Test />} />
        </Route>
        <Route element={<ProtectedRoute isRedirect={Boolean(user)} redirectTo="/" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
