import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../lib/auth/storage';
import { PATHS } from '../../routes/paths';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return (
      <Navigate
        to={PATHS.SIGN_IN}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
