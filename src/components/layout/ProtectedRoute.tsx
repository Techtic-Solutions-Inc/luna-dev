import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { getToken } from '../../lib/auth/tokenStorage';

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = Boolean(getToken());
  return isAuthenticated ? children : <Navigate to="/sign-in" replace />;
}
