import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from '@/hooks/useSession';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useSession();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
