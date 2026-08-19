import { useState, type ReactNode } from 'react';
import { resolveSidebarCredits } from '@/utils/display-defaults';
import { MenuIcon } from '@/components/icons';
import { useDashboardAnalytics } from '@/hooks/useDashboardAnalytics';
import { SidebarDrawer } from '@/components/layout/SidebarDrawer';

interface AppLayoutProps {
  children: ReactNode;
  creditLoading?: boolean;
}

export function AppLayout({ children, creditLoading = false }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: analytics, loading: analyticsLoading } = useDashboardAnalytics();

  const showCreditLoading = creditLoading || analyticsLoading;
  const sidebarCredits = resolveSidebarCredits(
    analytics?.credits_used,
    analytics?.credits_limit,
  );

  return (
    <div className="flex min-h-screen bg-[#0b0b0b]">
      <SidebarDrawer
        creditLoading={showCreditLoading}
        creditsUsed={sidebarCredits.used}
        creditsLimit={sidebarCredits.limit}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {sidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          aria-label="Close navigation overlay"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <div className="flex min-h-screen min-w-0 flex-1 flex-col bg-[#1a1614]">
        <header className="flex items-center gap-3 border-b border-white/5 px-4 py-4 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-full text-white"
            aria-label="Open navigation menu"
            aria-expanded={sidebarOpen}
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
