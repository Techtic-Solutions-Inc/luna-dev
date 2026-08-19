import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import ErrorAlert from '@/components/ui/ErrorAlert';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-color-16 px-6">
        <ErrorAlert
          message="Authentication failed. Sign in to continue."
          onRetry={() => navigate('/sign-in')}
        />
      </div>
    );
  }

  return children;
}
