import { NavLink } from 'react-router-dom';
import { Home, IdCard } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', label: 'Overview', icon: Home, end: true },
  { to: '/profile', label: 'Profile', icon: IdCard, end: false },
] as const;

export default function Sidebar() {
  return (
    <aside className="hidden w-[var(--radius-240)] shrink-0 border-r border-border bg-sofia-color-16 tablet:flex tablet:flex-col">
      <nav className="flex flex-col gap-gap-4 p-padding-16" aria-label="Primary">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-gap-10 rounded-lg px-padding-12 py-padding-10 text-body-sm-2 font-semibold transition-colors',
                  'hover:bg-muted hover:text-foreground',
                  'focus-visible:outline-none focus-visible:ring-padding-2 focus-visible:ring-ring',
                  'active:scale-[0.99]',
                  isActive ? 'bg-muted text-foreground' : 'text-muted-foreground',
                )
              }
            >
              <Icon className="h-padding-16 w-padding-16" aria-hidden="true" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
