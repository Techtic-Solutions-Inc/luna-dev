import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../lib/auth/storage';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  return getToken() ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
