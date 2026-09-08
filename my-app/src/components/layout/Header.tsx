import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <header className="flex items-center justify-between bg-[#0f0f0f] px-[40px] py-[20px]">
      <div className="flex items-center gap-[24px]">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-primary text-primary-foreground">
            <FontAwesomeIcon icon={faCoffee} aria-hidden="true" />
          </span>
          <span className="font-['EB_Garamond'] text-xl font-medium text-foreground">My App</span>
        </Link>
        <nav className="hidden items-center gap-[24px] md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.path ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3">
        {isAuthenticated() ? (
          <Button variant="outline" size="sm" onClick={logout}>
            Sign out
          </Button>
        ) : (
          <Button asChild size="sm" className="bg-primary px-[20px] py-[12px] text-primary-foreground">
            <Link to="/">Sign in</Link>
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;
