import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { breakpoints } from '@/theme/breakpoints';

export default function AppShell() {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2"
      >
        Skip to main content
      </a>
      <Header />
      <div className="flex flex-col md:flex-row" style={{ minHeight: `calc(100vh - 57px)` }}>
        <Sidebar />
        <main id="main" className="flex-1 p-4 md:p-6" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
      <span className="sr-only">{`Layout stacks below ${breakpoints.tablet}`}</span>
    </div>
  );
}
