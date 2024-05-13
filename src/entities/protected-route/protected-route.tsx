import { Navigate, Outlet } from 'react-router-dom';
import ProtectedRouteProps from './types';

export const ProtectedRoute = ({ isRedirect, redirectTo }: ProtectedRouteProps) => {
  return isRedirect ? <Navigate to={redirectTo} replace /> : <Outlet />;
};
