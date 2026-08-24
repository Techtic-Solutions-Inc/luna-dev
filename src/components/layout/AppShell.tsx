import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function AppShell() {
  return (
    <div className="flex min-h-screen bg-color-24">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-padding-16 focus:rounded-radius-8 focus:bg-accent focus:px-padding-16 focus:py-padding-8 focus:text-secondary"
      >
        Skip to main content
      </a>
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main id="main-content" className="flex-1 p-padding-24">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
