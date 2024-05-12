import { Route, Routes } from 'react-router-dom';
import { Layout } from './layout';
import { Home, Login, Register } from './pages';
import './styles.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
