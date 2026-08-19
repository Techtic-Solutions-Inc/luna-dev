import { NavLink } from 'react-router-dom';

import { FiHome } from '@/lib/icons';

const linkClassName = ({ isActive }: { isActive: boolean }) =>
  [
    'flex items-center gap-3 rounded-token-8 px-3 py-2 text-sm',
    isActive ? 'bg-color-41 text-secondary' : 'text-color-18 hover:text-secondary',
  ].join(' ');

interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-color-41 bg-color-59 px-4 py-6">
      <p className="mb-6 px-3 font-garamond text-lg text-secondary">Agentwise</p>
      <nav aria-label="Primary">
        <ul className="flex flex-col gap-1">
          <li>
            <NavLink to="/" className={linkClassName} end onClick={onNavigate}>
              <FiHome size={18} aria-hidden="true" focusable="false" />
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
