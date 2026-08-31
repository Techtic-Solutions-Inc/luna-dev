import { NavLink, Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';

export default function AppShell() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden px-padding-16 py-padding-24 tablet:px-padding-32 desktop:px-padding-40">
          <Outlet />
        </main>
      </div>
      <nav
        className="flex items-center justify-around border-t border-border bg-sofia-color-16 px-padding-8 py-padding-8 tablet:hidden"
        aria-label="Mobile"
      >
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            cn(
              'rounded-md px-padding-12 py-padding-8 text-body-sm-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-padding-2 focus-visible:ring-ring',
              isActive ? 'text-foreground' : 'text-muted-foreground',
            )
          }
        >
          Overview
        </NavLink>
        <NavLink
          to="/settings/profile"
          className={({ isActive }) =>
            cn(
              'rounded-md px-padding-12 py-padding-8 text-body-sm-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-padding-2 focus-visible:ring-ring',
              isActive ? 'text-foreground' : 'text-muted-foreground',
            )
          }
        >
          Profile
        </NavLink>
      </nav>
    </div>
  );
}
