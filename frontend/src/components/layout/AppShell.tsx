import { useState, type PropsWithChildren } from 'react';
import { MenuIcon } from '../icons';
import NavigationSidebar from '../NavigationSidebar';

interface AppShellProps extends PropsWithChildren {
  creditLoading?: boolean;
  creditsUsed?: number;
  creditsLimit?: number;
}

export default function AppShell({
  children,
  creditLoading = false,
  creditsUsed,
  creditsLimit,
}: AppShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0b0b0b]">
      <NavigationSidebar
        creditLoading={creditLoading}
        creditsUsed={creditsUsed}
        creditsLimit={creditsLimit}
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      {mobileNavOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          aria-label="Close navigation overlay"
          onClick={() => setMobileNavOpen(false)}
        />
      ) : null}

      <div className="flex min-h-screen min-w-0 flex-1 flex-col bg-[#1a1614]">
        <header className="flex items-center gap-3 border-b border-white/5 px-4 py-4 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-full text-white"
            aria-label="Open navigation menu"
            aria-expanded={mobileNavOpen}
          >
            <MenuIcon className="h-5 w-5" />
          </button>
          <p className="font-script text-[22px] text-white">Agentwise</p>
        </header>

        <main className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
