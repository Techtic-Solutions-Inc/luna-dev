import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { useAuth, useAuthLogout } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
];

function Header() {
  const { isAuthenticated } = useAuth();
  const logout = useAuthLogout();
  const location = useLocation();

  return (
    <header className="flex items-center justify-between bg-[var(--shell-header)] px-[var(--spacing-padding-40)] py-[var(--spacing-padding-20)]">
      <div className="flex min-w-0 flex-1 items-center gap-[24px]">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-primary text-primary-foreground">
            <FontAwesomeIcon icon={faCoffee} aria-hidden="true" />
          </span>
          <span className="font-['EB_Garamond'] text-xl font-medium text-foreground">My App</span>
        </Link>
        <nav
          className="flex items-center gap-[24px] overflow-x-auto max-[767px]:gap-[16px]"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`shrink-0 text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.path ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {isAuthenticated ? (
          <Button variant="outline" size="sm" onClick={logout}>
            Sign out
          </Button>
        ) : (
          <Button
            asChild
            size="sm"
            className="bg-primary px-[var(--spacing-padding-20)] py-[var(--spacing-padding-12)] text-primary-foreground"
          >
            <Link to="/">Sign in</Link>
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;
