import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getToken } from '../../lib/session';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const hasToken = Boolean(getToken());
  return isAuthenticated && hasToken ? children : <Navigate to="/signin" replace />;
}
