import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const links = [{ to: '/app', label: 'Workspace' }];

export default function Sidebar() {
  return (
    <nav
      aria-label="Main navigation"
      className="border-b border-border bg-card p-3 md:min-h-full md:w-56 md:border-b-0 md:border-r"
    >
      <ul className="flex gap-2 md:flex-col">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'block rounded-md px-3 py-2 text-sm hover:bg-muted focus-visible:outline-none',
                  isActive ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground'
                )
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
