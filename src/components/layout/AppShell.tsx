import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const titles: Record<string, string> = {
  '/app': 'Overview',
  '/app/library': 'Content Library',
  '/app/calendar': 'Content Calendar',
  '/app/ultimate-mind': 'Ultimate Mind',
  '/app/announcements': 'Announcements',
  '/app/features': 'New Features',
  '/app/subscription': 'Subscription',
};

const AppShell = () => {
  const { pathname } = useLocation();
  const title = titles[pathname] ?? 'Agentwise';

  return (
    <div className="flex min-h-screen bg-color-16 text-secondary">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <Header title={title} />
        <details className="border-b border-color-26 md:hidden">
          <summary className="cursor-pointer list-none px-padding-16 py-padding-12 typo-body-sm-106 text-color-15 hover:text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">
            Menu
          </summary>
          <Sidebar />
        </details>
        <main className="flex-1 bg-color-105 p-padding-24 md:p-padding-40">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppShell;
