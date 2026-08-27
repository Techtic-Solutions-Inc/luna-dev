import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { isAuthenticated, clearToken } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 shadow-header md:px-6">
      <Link
        to={isAuthenticated() ? '/app' : '/'}
        className="font-serif text-xl font-medium text-foreground hover:text-primary focus-visible:outline-none"
      >
        Agentwise
      </Link>
      {isAuthenticated() ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            clearToken();
            navigate('/', { replace: true });
          }}
        >
          Sign out
        </Button>
      ) : null}
    </header>
  );
}
