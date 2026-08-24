import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBullhorn,
  faCalendarDays,
  faCreditCard,
  faHouse,
  faLayerGroup,
  faBrain,
  faRightFromBracket,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface NavItem {
  to: string;
  label: string;
  icon: IconDefinition;
  end?: boolean;
}

const studioItems: NavItem[] = [
  { to: '/app', label: 'Overview', icon: faHouse, end: true },
  { to: '/app/library', label: 'Content Library', icon: faLayerGroup },
  { to: '/app/calendar', label: 'Content Calendar', icon: faCalendarDays },
];

const toolsItems: NavItem[] = [{ to: '/app/ultimate-mind', label: 'Ultimate Mind', icon: faBrain }];

const accountItems: NavItem[] = [
  { to: '/app/announcements', label: 'Announcements', icon: faBullhorn },
  { to: '/app/features', label: 'New Features', icon: faStar },
  { to: '/app/subscription', label: 'Subscription', icon: faCreditCard },
];

function NavGroup({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div className="flex flex-col gap-gap-4">
      <p className="px-padding-12 typo-caption-4 uppercase tracking-wide text-color-15">{title}</p>
      {items.map((item) => (
        <NavLink
          key={item.label}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            [
              'flex items-center gap-gap-12 rounded-radius-12 px-padding-12 py-padding-10 typo-body-sm-106 transition-colors',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
              isActive
                ? 'bg-color-132 text-secondary'
                : 'text-color-15 hover:bg-color-89 hover:text-secondary active:bg-color-81',
            ].join(' ')
          }
        >
          <FontAwesomeIcon icon={item.icon} aria-hidden="true" />
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}

export default function Sidebar() {
  const { clearToken } = useAuth();
  const navigate = useNavigate();
  const creditUsed = 1420;
  const creditTotal = 5000;
  const creditPercent = (creditUsed / creditTotal) * 100;

  const handleLogout = () => {
    clearToken();
    navigate('/', { replace: true });
  };

  return (
    <aside className="flex w-full shrink-0 flex-col justify-between gap-gap-24 border-r border-color-26 bg-color-16 px-padding-16 py-padding-24 md:w-[260px] md:min-h-screen">
      <div className="flex flex-col gap-gap-24">
        <div>
          <p className="font-eb-garamond text-heading-lg-19 text-secondary">Agentwise</p>
          <p className="mt-gap-6 typo-caption-4 uppercase tracking-[0.16em] text-color-15">
            Real Estate Marketing
          </p>
        </div>
        <nav className="flex flex-col gap-gap-20" aria-label="Primary">
          <NavGroup title="Studio" items={studioItems} />
          <NavGroup title="Tools" items={toolsItems} />
          <NavGroup title="Account" items={accountItems} />
        </nav>
      </div>
      <div className="flex flex-col gap-gap-16">
        <div className="rounded-radius-12 border border-color-26 p-padding-16">
          <p className="typo-caption-4 text-color-15">AI Credit Usage</p>
          <p className="mt-gap-8 typo-body-sm-106 text-secondary">
            Current {creditUsed.toLocaleString()} / {creditTotal.toLocaleString()}
          </p>
          <div
            className="mt-gap-10 h-2 overflow-hidden rounded-radius-100 bg-color-26"
            role="progressbar"
            aria-label="AI credit usage"
            aria-valuemin={0}
            aria-valuemax={creditTotal}
            aria-valuenow={creditUsed}
          >
            <div
              className="h-full rounded-radius-100 bg-accent"
              style={{ width: `${String(creditPercent)}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-gap-12 px-padding-4">
          <span
            className="flex h-padding-40 w-padding-40 items-center justify-center rounded-radius-100 bg-color-89 typo-body-sm-23 text-secondary"
            aria-hidden="true"
          >
            JS
          </span>
          <p className="typo-body-sm-106 text-secondary">Joseph Stanley</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-gap-12 rounded-radius-12 px-padding-12 py-padding-10 typo-body-sm-106 text-color-15 hover:bg-color-89 hover:text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:bg-color-81 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faRightFromBracket} aria-hidden="true" />
          Logout
        </button>
      </div>
    </aside>
  );
}
