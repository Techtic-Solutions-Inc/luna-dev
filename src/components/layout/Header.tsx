import { Link } from 'react-router-dom';
import { LuBell, LuSearch, LuUser } from 'react-icons/lu';

const Header = () => (
  <header
    className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[var(--color-41)] bg-[var(--color-16)] px-6 lg:hidden"
    role="banner"
  >
    <Link
      to="/"
      className="font-garamond text-xl font-medium text-secondary"
      aria-label="Agentwise home"
    >
      Agentwise
    </Link>
    <div className="flex items-center gap-3">
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-57)] transition-colors hover:text-secondary"
        aria-label="Search"
      >
        <LuSearch size={18} aria-hidden="true" />
      </button>
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-57)] transition-colors hover:text-secondary"
        aria-label="Notifications"
      >
        <LuBell size={18} aria-hidden="true" />
      </button>
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-41)] text-secondary"
        aria-label="User profile"
      >
        <LuUser size={18} aria-hidden="true" />
      </button>
    </div>
  </header>
);

export default Header;
