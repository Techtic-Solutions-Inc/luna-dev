import { useState, type ReactNode } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-color-16 text-secondary">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-token-8 focus:bg-accent focus:px-3 focus:py-2 focus:text-color-16"
      >
        Skip to main content
      </a>
      <div className="hidden tablet:flex">
        <Sidebar />
      </div>
      {navOpen ? (
        <div className="fixed inset-0 z-40 tablet:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-color-58"
            aria-label="Close navigation"
            onClick={() => setNavOpen(false)}
          />
          <div className="relative z-10 h-full">
            <Sidebar onNavigate={() => setNavOpen(false)} />
          </div>
        </div>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col">
        <Header onOpenNavigation={() => setNavOpen(true)} />
        <main id="main-content" className="flex-1 px-4 py-6 tablet:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
