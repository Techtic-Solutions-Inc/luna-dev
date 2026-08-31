import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', label: 'Overview', icon: faHouse, end: true },
  { to: '/profile', label: 'Profile', icon: faIdCard, end: false },
] as const;

export default function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-border bg-sofia-color-16 tablet:flex tablet:flex-col">
      <nav className="flex flex-col gap-gap-4 p-padding-16" aria-label="Primary">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-gap-10 rounded-lg px-padding-12 py-padding-10 text-sm font-semibold transition-colors',
                'hover:bg-muted hover:text-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                'active:scale-[0.99]',
                isActive ? 'bg-muted text-primary' : 'text-muted-foreground',
              )
            }
          >
            <FontAwesomeIcon icon={item.icon} className="h-4 w-4" aria-hidden="true" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
