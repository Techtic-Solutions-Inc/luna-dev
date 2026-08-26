import { useState, type ReactNode } from 'react';
import { SkipLink } from './SkipLink';
import { DashboardSideNav } from '@/components/dashboard/DashboardSideNav';

interface DashboardShellProps {
  children: ReactNode;
  profileName?: string;
  currentCredits?: number;
  totalCredits?: number;
}

export function DashboardShell({
  children,
  profileName,
  currentCredits,
  totalCredits,
}: DashboardShellProps) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="dashboard-canvas flex min-h-screen">
      <SkipLink />

      {/* Mobile menu button */}
      <button
        type="button"
        className="fixed left-4 top-4 z-50 rounded-control border border-line bg-panel p-3 text-ink md:hidden"
        aria-expanded={navOpen}
        aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
        onClick={() => setNavOpen((o) => !o)}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Sidebar overlay on mobile */}
      {navOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          aria-label="Close navigation overlay"
          onClick={() => setNavOpen(false)}
        />
      )}

      <aside
        className={[
          'fixed inset-y-0 left-0 z-40 w-[260px] shrink-0 transform border-r border-line bg-[#000001] transition-transform md:static md:translate-x-0',
          navOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <DashboardSideNav
          profileName={profileName}
          currentCredits={currentCredits}
          totalCredits={totalCredits}
          onNavigate={() => setNavOpen(false)}
        />
      </aside>

      <main id="main" className="min-w-0 flex-1 p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}
