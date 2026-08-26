import { useNavigate } from 'react-router-dom';
import { logout } from '@/lib/auth/logout';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', href: '#overview' },
  { id: 'ultimate-mind', label: 'Ultimate Mind', href: '#ultimate-mind' },
  { id: 'announcements', label: 'Announcements', href: '#announcements' },
  { id: 'new-features', label: 'New Features', href: '#new-features' },
  { id: 'subscription', label: 'Subscription', href: '#subscription' },
];

interface DashboardSideNavProps {
  profileName?: string;
  currentCredits?: number;
  totalCredits?: number;
  onNavigate?: () => void;
}

export function DashboardSideNav({
  profileName,
  currentCredits,
  totalCredits,
  onNavigate,
}: DashboardSideNavProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    void logout((path) => navigate(path));
  };

  const creditPercent =
    currentCredits !== undefined && totalCredits && totalCredits > 0
      ? Math.min(100, (currentCredits / totalCredits) * 100)
      : 0;

  return (
    <nav
      aria-label="Dashboard navigation"
      className="flex h-full flex-col px-4 py-6"
    >
      {/* Logo */}
      <div className="mb-8 px-2">
        <p
          className="font-kalam text-[28px] leading-none text-ink"
          style={{ fontFamily: 'Kalam, cursive' }}
        >
          Agentwise
        </p>
        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
          Real Estate Marketing
        </p>
      </div>

      {/* Nav items */}
      <ul className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              onClick={onNavigate}
              className="flex items-center gap-3 rounded-control px-3 py-[10px] text-[16px] leading-6 text-ink transition-colors hover:bg-panel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:bg-card"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* AI Credits */}
      {currentCredits !== undefined && totalCredits !== undefined && (
        <div className="mb-4 rounded-section border border-line bg-panel p-4">
          <p className="text-[12px] font-medium uppercase tracking-wide text-accent">
            AI Credit Usage
          </p>
          <div className="mt-3 flex items-end justify-between">
            <span className="text-[14px] text-muted">Current</span>
            <span className="text-[14px] text-ink">
              {currentCredits.toLocaleString()} / {totalCredits.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[#44413e]">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${creditPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* User profile */}
      {profileName && (
        <div className="mb-3 flex items-center gap-3 rounded-control px-2 py-2">
          <img
            src="/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-65-2289.png"
            alt=""
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="text-[14px] text-ink">{profileName}</span>
        </div>
      )}

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-control px-3 py-[10px] text-[16px] text-muted transition-colors hover:bg-panel hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:bg-card"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M10 11l3-3-3-3M13 8H6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Logout
      </button>
    </nav>
  );
}
