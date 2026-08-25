import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCalendar, faUser } from '@fortawesome/free-solid-svg-icons';

const LINKS = [
  { to: '/', label: 'Home', icon: faHouse },
  { to: '/content-calendar', label: 'Content Calendar', icon: faCalendar },
  { to: '/dashboard', label: 'Dashboard', icon: faUser },
] as const;

export function Sidebar() {
  return (
    <nav aria-label="Main navigation" className="hidden w-60 shrink-0 border-r border-white/10 bg-color-106 p-6 md:block">
      <ul className="flex flex-col gap-3">
        {LINKS.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `nav-link flex items-center gap-3 rounded-12 px-3 py-2 ${isActive ? 'bg-white/10 text-accent' : ''}`
              }
            >
              <FontAwesomeIcon icon={link.icon} aria-hidden="true" />
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
