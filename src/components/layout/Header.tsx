import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  homeButtonPrimaryClass,
  homeButtonOutlineClass,
} from '@/routes/home-styles';

const navLinks = [
  { to: '/home', label: 'Home' },
  { to: '/visitor-home', label: 'Content' },
];

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/home';

  return (
    <header className="flex items-center justify-between border-b border-[color:var(--token-background)]/30 bg-[color:var(--token-surface-dark)] px-[32px] py-[16px]">
      <Link
        to="/home"
        className="font-garamond text-[24px] font-medium leading-[31px] [color:var(--token-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:[ring-color:var(--token-border)]"
        aria-label="Agentwise Home"
      >
        Agentwise
      </Link>
      <nav className="hidden items-center gap-[24px] md:flex" aria-label="Main navigation">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className={cn(
              'font-almarai text-[16px] font-normal leading-[17.856px] [color:var(--token-primary)] transition-colors hover:[color:var(--token-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:[ring-color:var(--token-border)]',
              isHome && link.to === '/home' && '[color:var(--token-border)]',
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-[12px]">
        <Button asChild variant="ghost" size="sm" className={cn(homeButtonOutlineClass, 'text-[14px]')}>
          <Link to="/signup">Get Started</Link>
        </Button>
        <Button asChild variant="ghost" size="sm" className={cn(homeButtonPrimaryClass, 'text-[14px] px-[20px]')}>
          <Link to="/login">Log in</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
