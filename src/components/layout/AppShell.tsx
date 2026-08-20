import { useState, type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Spinner } from '@/components/ui/Spinner';
import { DashboardProvider } from '@/contexts/DashboardContext';

interface AppShellProps {
  children?: ReactNode;
  isLoading?: boolean;
}

function AppShellLayout({ children, isLoading = false }: AppShellProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const closeNav = (): void => {
    setIsNavOpen(false);
  };

  return (
    <div className="surface-aurora flex min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-20 focus:top-12 focus:z-50 focus:rounded-8 focus:bg-accent focus:px-12 focus:py-8 focus:text-color-16"
      >
        Skip to main content
      </a>

      <div className="hidden desktop:block">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
      </div>

      {isNavOpen ? (
        <div className="fixed inset-0 z-40 desktop:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-color-16/80"
            aria-label="Close navigation overlay"
            onClick={closeNav}
          />
          <div className="relative h-full">
            <Sidebar onNavigate={closeNav} onClose={closeNav} />
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onOpenNavigation={() => setIsNavOpen(true)} />
        <main id="main-content" className="flex-1 px-16 py-16 desktop:px-32 desktop:py-24">
          {isLoading ? <Spinner /> : (children ?? <Outlet />)}
        </main>
      </div>
    </div>
  );
}

export function AppShell(props: AppShellProps) {
  return (
    <DashboardProvider>
      <AppShellLayout {...props} />
    </DashboardProvider>
  );
}

export default AppShell;
