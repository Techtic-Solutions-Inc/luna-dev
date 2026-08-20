import type { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface AppShellProps {
  children: ReactNode;
}

const AppShell = ({ children }: AppShellProps) => (
  <div className="relative min-h-screen overflow-hidden bg-[var(--color-16)]">
    <div
      className="pointer-events-none absolute -right-40 top-0 h-[480px] w-[480px] rounded-full opacity-20 blur-[160px]"
      style={{ background: 'radial-gradient(circle, var(--color-68) 0%, transparent 70%)' }}
      aria-hidden="true"
    />
    <Sidebar />
    <div className="relative flex min-h-screen flex-col lg:pl-64">
      <Header />
      <main className="flex-1 p-6 lg:p-8" role="main">
        {children}
      </main>
    </div>
  </div>
);

export default AppShell;
