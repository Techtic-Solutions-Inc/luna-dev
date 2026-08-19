import { NavLink } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { FiLogOut, FiMenu } from '@/lib/icons';

interface HeaderProps {
  onOpenNavigation?: () => void;
}

export default function Header({ onOpenNavigation }: HeaderProps) {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-color-41 bg-color-16 px-4 py-4 tablet:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-token-8 p-2 text-secondary tablet:hidden"
          aria-label="Open navigation"
          onClick={onOpenNavigation}
        >
          <FiMenu size={20} aria-hidden="true" focusable="false" />
        </button>
        <p className="font-garamond text-xl text-secondary">Agentwise</p>
      </div>
      {isAuthenticated ? (
        <button
          type="button"
          onClick={logout}
          className="inline-flex items-center gap-2 rounded-token-8 px-3 py-2 text-sm text-color-18 hover:text-secondary"
          aria-label="Log out"
        >
          <FiLogOut size={16} aria-hidden="true" focusable="false" />
          Log out
        </button>
      ) : (
        <NavLink
          to="/"
          className="rounded-full bg-accent px-4 py-2 text-sm font-bold text-color-16"
        >
          Get Started
        </NavLink>
      )}
    </header>
  );
}
