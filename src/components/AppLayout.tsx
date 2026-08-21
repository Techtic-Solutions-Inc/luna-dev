import { useState, type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBeer, FaCalendarAlt, FaHome, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../lib/auth/AuthProvider';

interface AppLayoutProps {
  children: ReactNode;
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'flex items-center gap-[var(--spacing-gap-10)] rounded-[var(--radius-medium)] px-[var(--spacing-padding-12)] py-[var(--spacing-padding-10)] text-[length:var(--typography-body-15-font-size)] leading-[var(--typography-body-15-line-height)] transition-colors',
    isActive
      ? 'bg-[color:var(--color-color-23)] text-accent'
      : 'text-secondary hover:bg-[color:var(--color-color-20)]',
  ].join(' ');

const AppLayout = ({ children }: AppLayoutProps) => {
  const { isAuthenticated, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[color:var(--color-color-16)] text-secondary">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-[var(--spacing-padding-16)] focus:top-[var(--spacing-padding-16)] focus:z-50 focus:bg-accent focus:px-[var(--spacing-padding-12)] focus:py-[var(--spacing-padding-8)] focus:text-[color:var(--color-color-16)]"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[color:var(--color-color-20)] bg-[color:var(--color-color-22)] px-[var(--spacing-padding-16)] py-[var(--spacing-padding-12)] desktop:px-[var(--spacing-padding-24)]">
        <div className="flex items-center gap-[var(--spacing-gap-12)]">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-medium)] border border-[color:var(--color-color-20)] desktop:hidden"
            aria-expanded={sidebarOpen}
            aria-controls="app-sidebar"
            onClick={() => setSidebarOpen((open) => !open)}
          >
            {sidebarOpen ? (
              <FaTimes aria-hidden="true" />
            ) : (
              <FaBars aria-hidden="true" />
            )}
            <span className="sr-only">Toggle navigation</span>
          </button>
          <p className="flex items-center gap-[var(--spacing-gap-8)] font-heading text-[length:var(--typography-heading-md-57-font-size)] font-semibold leading-[var(--typography-heading-md-57-line-height)] text-accent">
            <FaBeer aria-hidden="true" />
            Sofia
          </p>
        </div>
        {isAuthenticated ? (
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-[var(--spacing-gap-8)] rounded-[var(--radius-medium)] px-[var(--spacing-padding-12)] py-[var(--spacing-padding-8)] text-[length:var(--typography-body-sm-24-font-size)] leading-[var(--typography-body-sm-24-line-height)] text-secondary hover:bg-[color:var(--color-color-20)]"
          >
            <FaSignOutAlt aria-hidden="true" />
            Sign out
          </button>
        ) : null}
      </header>
      <div className="desktop:grid desktop:grid-cols-[240px_1fr]">
        {sidebarOpen ? (
          <button
            type="button"
            aria-label="Close navigation"
            className="fixed inset-0 z-20 bg-[color:var(--color-color-97)] desktop:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        ) : null}
        <aside
          id="app-sidebar"
          className={[
            'fixed inset-y-0 left-0 z-30 w-[240px] border-r border-[color:var(--color-color-20)] bg-[color:var(--color-color-22)] px-[var(--spacing-padding-16)] py-[var(--spacing-padding-24)] transition-transform desktop:static desktop:translate-x-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full desktop:translate-x-0',
          ].join(' ')}
        >
          <nav aria-label="Primary">
            <ul className="flex flex-col gap-[var(--spacing-gap-8)]">
              <li>
                <NavLink
                  to="/"
                  className={navLinkClass}
                  onClick={() => setSidebarOpen(false)}
                  end
                >
                  <FaHome aria-hidden="true" />
                  Home
                </NavLink>
              </li>
              {isAuthenticated ? (
                <li>
                  <NavLink
                    to="/calendar"
                    className={navLinkClass}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <FaCalendarAlt aria-hidden="true" />
                    Calendar
                  </NavLink>
                </li>
              ) : null}
            </ul>
          </nav>
        </aside>
        <main id="main-content" className="min-h-[calc(100vh-64px)] p-[var(--spacing-padding-20)] desktop:p-[var(--spacing-padding-32)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
