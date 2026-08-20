import {
  LuChevronDown,
  LuLogOut,
  LuCalendar,
  LuCreditCard,
  LuLayoutDashboard,
  LuLibrary,
  LuMegaphone,
  LuSparkles,
} from 'react-icons/lu';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDashboard } from '../../hooks/useDashboard';

interface NavItem {
  label: string;
  to: string;
  icon: typeof LuLayoutDashboard;
}

const studioNav: NavItem[] = [
  { label: 'Overview', to: '/dashboard', icon: LuLayoutDashboard },
  { label: 'Content Library', to: '/dashboard/library', icon: LuLibrary },
  { label: 'Content Calendar', to: '/dashboard/calendar', icon: LuCalendar },
];

const toolsNav: NavItem[] = [
  { label: 'Ultimate Mind', to: '/dashboard/ultimate-mind', icon: LuSparkles },
];

const accountNav: NavItem[] = [
  { label: 'Announcements', to: '/dashboard/announcements', icon: LuMegaphone },
  { label: 'New Features', to: '/dashboard/features', icon: LuSparkles },
  { label: 'Subscription', to: '/dashboard/subscription', icon: LuCreditCard },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { data } = useDashboard();

  const creditsUsed = data?.analytics.ai_credits_used ?? 0;
  const creditsTotal = data?.analytics.ai_credits_total ?? 0;
  const creditPercent = creditsTotal > 0 ? (creditsUsed / creditsTotal) * 100 : 0;
  const profileName = data?.profile.name ?? 'User';
  const profileInitials = profileName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const renderNavGroup = (title: string, items: NavItem[]) => (
    <div className="flex flex-col gap-1">
      <span className="px-3 py-2 font-public-sans text-xs font-semibold uppercase tracking-wider text-[var(--color-57)]">
        {title}
      </span>
      <nav aria-label={`${title} navigation`}>
        <ul className="flex flex-col gap-0.5">
          {items.map(({ label, to, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/dashboard'}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 font-almarai text-sm transition-colors ${
                    isActive
                      ? 'bg-[var(--color-41)] text-secondary'
                      : 'text-[var(--color-57)] hover:bg-[var(--color-36)] hover:text-secondary'
                  }`
                }
              >
                <Icon size={18} aria-hidden="true" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  return (
    <aside
      className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-[var(--color-41)] bg-[var(--color-20)] lg:flex"
      aria-label="Main sidebar"
    >
      <div className="flex h-full flex-col px-4 py-6">
        <NavLink
          to="/"
          className="mb-8 px-3 font-garamond text-2xl font-medium text-secondary"
          aria-label="Agentwise home"
        >
          Agentwise
        </NavLink>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto">
          {renderNavGroup('Studio', studioNav)}
          {renderNavGroup('Tools', toolsNav)}
          {renderNavGroup('Account', accountNav)}
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-[var(--color-41)] pt-6">
          <div className="rounded-xl border border-[var(--color-41)] bg-[var(--color-36)] p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-almarai text-xs text-[var(--color-57)]">AI Credit Usage</span>
              <span className="font-almarai text-xs font-bold text-accent">Gold</span>
            </div>
            <div className="mb-1 font-almarai text-sm text-secondary">
              <span className="font-bold">Current: {creditsUsed.toLocaleString()}</span>
              <span className="text-[var(--color-57)]"> / {creditsTotal.toLocaleString()}</span>
            </div>
            <div
              className="h-1.5 overflow-hidden rounded-full bg-[var(--color-41)]"
              role="progressbar"
              aria-valuenow={creditsUsed}
              aria-valuemin={0}
              aria-valuemax={creditsTotal}
              aria-label="AI credit usage"
            >
              <div
                className="h-full rounded-full bg-accent transition-all duration-300"
                style={{ width: `${Math.min(creditPercent, 100)}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-almarai text-sm font-bold text-[var(--color-16)]"
              aria-hidden="true"
            >
              {profileInitials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-almarai text-sm font-bold text-secondary">
                {profileName}
              </p>
            </div>
            <LuChevronDown
              size={16}
              className="shrink-0 text-[var(--color-57)]"
              aria-hidden="true"
            />
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-almarai text-sm text-[var(--color-57)] transition-colors hover:bg-[var(--color-36)] hover:text-secondary"
            aria-label="Log out"
          >
            <LuLogOut size={18} aria-hidden="true" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
