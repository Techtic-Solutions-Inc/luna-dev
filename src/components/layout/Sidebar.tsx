import type { IconType } from 'react-icons';
import {
  LuCalendarDays,
  LuChevronRight,
  LuCreditCard,
  LuLayoutDashboard,
  LuLibrary,
  LuLogOut,
  LuMegaphone,
  LuSparkles,
  LuStar,
  LuX,
} from 'react-icons/lu';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { useDashboard } from '@/contexts/dashboardContextState';
import { cn } from '@/lib/utils/cn';
import { clearAuthToken } from '@/stores/auth';

interface NavItem {
  to: string;
  label: string;
  icon: IconType;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const sections: NavSection[] = [
  {
    title: 'Studio',
    items: [
      { to: '/dashboard', label: 'Overview', icon: LuLayoutDashboard },
      { to: '/content-library', label: 'Content Library', icon: LuLibrary },
      { to: '/content-calendar', label: 'Content Calendar', icon: LuCalendarDays },
    ],
  },
  {
    title: 'Tools',
    items: [{ to: '/ultimate-mind', label: 'Ultimate Mind', icon: LuSparkles }],
  },
  {
    title: 'Account',
    items: [
      { to: '/announcements', label: 'Announcements', icon: LuMegaphone },
      { to: '/new-features', label: 'New Features', icon: LuStar },
      { to: '/subscription', label: 'Subscription', icon: LuCreditCard },
    ],
  },
];

function AiCreditUsageWidget() {
  const { analytics, analyticsState } = useDashboard();
  const credits = analytics.aiCredits;
  const progress =
    credits !== null && credits.total > 0
      ? Math.min(100, Math.round((credits.current / credits.total) * 100))
      : 0;

  return (
    <div
      aria-label="AI Credit Usage"
      className="rounded-10 border border-color-41 bg-color-23 px-12 py-12"
    >
      <p className="type-caption-12 text-color-14">AI Credit Usage</p>
      <div className="mt-8 flex items-end justify-between gap-8">
        <span className="type-caption-12 text-color-14">Current</span>
        {analyticsState === 'loading' ? (
          <span className="type-body-sm-2 text-white">Loading…</span>
        ) : credits ? (
          <span className="type-body-sm-2 text-white">
            {credits.current.toLocaleString()} / {credits.total.toLocaleString()}
          </span>
        ) : (
          <span className="type-body-sm-2 text-color-14">—</span>
        )}
      </div>
      <div
        className="mt-8 h-4 overflow-hidden rounded-full bg-color-41"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        aria-label="AI credit usage progress"
      >
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function SidebarProfile() {
  const { analytics } = useDashboard();
  const user = analytics.user;
  const initials =
    user !== null
      ? `${user.firstName.charAt(0)}${user.lastName.charAt(0) || user.firstName.charAt(1) || ''}`
          .trim()
          .toUpperCase()
      : '?';

  return (
    <Link
      to="/profile"
      className="flex items-center gap-8 rounded-8 px-8 py-8 transition-colors duration-200 hover:bg-color-36"
      aria-label={user ? `View profile for ${user.fullName}` : 'View profile'}
    >
      {user?.avatarUrl ? (
        <img src={user.avatarUrl} alt="" className="h-32 w-32 rounded-full object-cover" />
      ) : (
        <span className="inline-flex h-32 w-32 items-center justify-center rounded-full bg-color-41 text-white">
          <span className="type-caption-12">{initials}</span>
        </span>
      )}
      <span className="type-body-sm-2 min-w-0 flex-1 truncate text-white">
        {user?.fullName ?? 'Your profile'}
      </span>
      <LuChevronRight aria-hidden="true" className="shrink-0 text-color-14" size={16} />
    </Link>
  );
}

interface SidebarProps {
  onNavigate?: () => void;
  onClose?: () => void;
}

export function Sidebar({ onNavigate, onClose }: SidebarProps) {
  const navigate = useNavigate();

  const handleLogout = (): void => {
    clearAuthToken();
    onNavigate?.();
    void navigate('/');
  };

  return (
    <aside className="flex h-full w-[240px] shrink-0 flex-col border-r border-color-41 bg-color-16 px-12 py-20">
      <div className="mb-24 flex items-center justify-between px-8">
        <Link
          to="/dashboard"
          onClick={onNavigate}
          className="type-heading-lg-108 text-white"
          aria-label="Agentwise home"
        >
          Agentwise
        </Link>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-32 w-32 items-center justify-center rounded-full text-white desktop:hidden"
            aria-label="Close navigation"
          >
            <LuX aria-hidden="true" size={18} />
          </button>
        ) : null}
      </div>

      <nav aria-label="Application" className="flex flex-1 flex-col gap-24 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-6">
            <p className="type-caption-12 px-8 uppercase tracking-[0.12em] text-color-14">
              {section.title}
            </p>
            <ul className="flex flex-col gap-4">
              {section.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-8 rounded-8 px-8 py-8 transition-colors duration-200',
                        isActive
                          ? 'bg-color-36 text-white'
                          : 'text-color-14 hover:bg-color-36 hover:text-white',
                      )
                    }
                  >
                    <item.icon aria-hidden="true" size={16} />
                    <span className="type-body-sm-2">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="mt-16 flex flex-col gap-12">
        <AiCreditUsageWidget />
        <SidebarProfile />
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-8 rounded-8 px-8 py-8 text-color-14 transition-colors duration-200 hover:bg-color-36 hover:text-white"
        >
          <LuLogOut aria-hidden="true" size={16} />
          <span className="type-body-sm-2">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
