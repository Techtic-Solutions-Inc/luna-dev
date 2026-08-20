import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = Boolean(localStorage.getItem('token') ?? sessionStorage.getItem('token'));
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
