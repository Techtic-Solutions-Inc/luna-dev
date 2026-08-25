import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faFolderOpen,
  faGaugeHigh,
  faBrain,
  faBullhorn,
  faStar,
  faCreditCard,
  faRightFromBracket,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../hooks/useAuth';

interface NavItem {
  to: string;
  label: string;
  icon: typeof faGaugeHigh;
}

const studioNav: NavItem[] = [
  { to: '/studio/overview', label: 'Overview', icon: faGaugeHigh },
  { to: '/studio/content-library', label: 'Content Library', icon: faFolderOpen },
  { to: '/studio/content-calendar', label: 'Content Calendar', icon: faCalendarDays },
];

const toolsNav: NavItem[] = [
  { to: '/studio/ultimate-mind', label: 'Ultimate Mind', icon: faBrain },
];

const accountNav: NavItem[] = [
  { to: '/studio/announcements', label: 'Announcements', icon: faBullhorn },
  { to: '/studio/new-features', label: 'New Features', icon: faStar },
  { to: '/studio/subscription', label: 'Subscription', icon: faCreditCard },
];

function NavSection({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div className="flex flex-col gap-gap-4">
      <p className="px-padding-12 font-public-sans text-xs font-semibold uppercase tracking-wide text-color-15">
        {title}
      </p>
      <ul className="flex flex-col gap-gap-2">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                [
                  'flex items-center gap-gap-12 rounded-radius-12 px-padding-12 py-padding-10 font-almarai text-sm leading-[18px] transition-colors',
                  isActive
                    ? 'border border-secondary bg-color-89 text-secondary'
                    : 'text-color-15 hover:bg-color-89/50 hover:text-secondary',
                ].join(' ')
              }
            >
              <FontAwesomeIcon icon={item.icon} className="w-4" aria-hidden="true" />
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

const Sidebar = () => {
  const { user, logout } = useAuth();
  const creditUsed = 1420;
  const creditTotal = 5000;
  const creditPercent = (creditUsed / creditTotal) * 100;

  return (
    <aside
      className="flex w-full shrink-0 flex-col bg-black tablet:w-[280px]"
      aria-label="Studio navigation"
    >
      <div className="border-b border-color-129 px-padding-24 py-padding-24">
        <p className="font-garamond text-[24px] font-normal italic leading-[31.32px] text-secondary">
          Agentwise
        </p>
        <p className="mt-gap-4 font-public-sans text-[10px] font-semibold uppercase tracking-[0.4px] text-color-15">
          Real Estate Marketing
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-gap-24 overflow-y-auto px-padding-16 py-padding-24">
        <NavSection title="Studio" items={studioNav} />
        <NavSection title="Tools" items={toolsNav} />
        <NavSection title="Account" items={accountNav} />
      </nav>

      <div className="flex flex-col gap-gap-16 border-t border-color-129 px-padding-16 py-padding-16">
        <div className="rounded-radius-12 border border-color-129 p-padding-12">
          <p className="font-almarai text-xs leading-[13.392px] text-color-15">
            AI Credit Usage
          </p>
          <p className="mt-gap-8 font-almarai text-sm leading-[18px] text-secondary">
            Current {creditUsed.toLocaleString()} / {creditTotal.toLocaleString()}
          </p>
          <div
            className="mt-gap-8 h-[4px] overflow-hidden rounded-radius-10000 bg-color-64"
            role="progressbar"
            aria-valuenow={creditUsed}
            aria-valuemin={0}
            aria-valuemax={creditTotal}
            aria-label="AI credit usage"
          >
            <div
              className="h-full rounded-radius-10000 bg-color-108 transition-all"
              style={{ width: `${creditPercent}%` }}
            />
          </div>
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-between rounded-radius-12 px-padding-12 py-padding-10 text-left transition-colors hover:bg-color-89/50"
          aria-label="Open profile"
        >
          <div className="flex items-center gap-gap-12">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-radius-10000 bg-color-73 font-almarai text-sm font-bold text-secondary">
              {user?.firstName?.[0] ?? 'J'}
            </div>
            <span className="font-almarai text-sm leading-[18px] text-secondary">
              {user?.name ?? 'Joseph Stanley'}
            </span>
          </div>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-color-15"
            aria-hidden="true"
          />
        </button>

        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-gap-12 px-padding-12 py-padding-8 font-almarai text-sm leading-[18px] text-color-15 transition-colors hover:text-secondary"
        >
          <FontAwesomeIcon icon={faRightFromBracket} aria-hidden="true" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
