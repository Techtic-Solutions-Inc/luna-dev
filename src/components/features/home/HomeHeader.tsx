import { Link } from 'react-router-dom';
import HomeButton from './HomeButton';

const navItems = ['About', 'Content', 'Blog', 'Pricing'];

interface HomeHeaderProps {
  onGetStarted: () => void;
}

const HomeHeader = ({ onGetStarted }: HomeHeaderProps) => (
  <header className="sticky top-0 z-50 border-b border-[var(--color-41)] bg-[var(--color-16)]/95 backdrop-blur-sm">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
      <Link
        to="/home"
        className="font-garamond text-2xl font-medium text-secondary"
        aria-label="Agentwise home"
      >
        Agentwise
      </Link>

      <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="font-almarai text-sm text-[var(--color-57)] transition-colors hover:text-secondary"
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <Link
          to="/dashboard"
          className="hidden font-almarai text-sm text-[var(--color-57)] transition-colors hover:text-secondary sm:block"
        >
          Login
        </Link>
        <HomeButton onClick={onGetStarted} ariaLabel="Get started with Agentwise">
          Get Started
        </HomeButton>
      </div>
    </div>
  </header>
);

export default HomeHeader;
