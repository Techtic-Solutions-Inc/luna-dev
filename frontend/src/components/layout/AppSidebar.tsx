import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  AnnouncementsIcon,
  CalendarIcon,
  ChevronRightIcon,
  ContentLibraryIcon,
  LogoutIcon,
  NewFeaturesIcon,
  OverviewIcon,
  SubscriptionIcon,
  UltimateMindIcon,
} from '@/components/icons';
import { AICreditUsageCard } from '@/components/shared/AICreditUsageCard';
import { getDisplayFullName, getInitials } from '@/utils/calendar';

const navGroups = [
  {
    title: 'Studio',
    items: [
      { label: 'Overview', icon: OverviewIcon, to: '/dashboard' },
      { label: 'Content Library', icon: ContentLibraryIcon, to: '/content-library' },
      { label: 'Content Calendar', icon: CalendarIcon, to: '/content-calendar' },
    ],
  },
  {
    title: 'Tools',
    items: [{ label: 'Ultimate Mind', icon: UltimateMindIcon, to: '/ultimate-mind' }],
  },
  {
    title: 'Account',
    items: [
      { label: 'Announcements', icon: AnnouncementsIcon, to: '/announcements' },
      { label: 'New Features', icon: NewFeaturesIcon, to: '/new-features' },
      { label: 'Subscription', icon: SubscriptionIcon, to: '/subscription' },
    ],
  },
];

interface AppSidebarProps {
  creditLoading?: boolean;
  creditsUsed?: number;
  creditsLimit?: number;
  onClose?: () => void;
}

export function AppSidebar({
  creditLoading = false,
  creditsUsed,
  creditsLimit,
  onClose,
}: AppSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const displayName = getDisplayFullName();
  const avatar = localStorage.getItem('avatar') ?? localStorage.getItem('avatarUrl');

  const handleLogout = () => {
    localStorage.removeItem('token');
    onClose?.();
    navigate('/content-calendar');
  };

  return (
    <nav
      aria-label="Main navigation"
      className="flex h-full min-h-0 flex-col bg-[#0B0B0B] px-3 py-4"
    >
      <div className="mb-6 shrink-0 px-2">
        <Link
          to="/dashboard"
          onClick={onClose}
          className="focus-ring rounded-sm text-white"
          aria-label="Agentwise home"
        >
          <span className="block font-script text-[28px] leading-none">Agentwise</span>
          <span className="mt-1 block text-[8px] uppercase tracking-[0.24em] text-white/70">
            Real Estate Marketing
          </span>
        </Link>
      </div>

      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-2 px-3 text-[11px] uppercase tracking-[0.12em] text-[#646261]">
              {group.title}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={onClose}
                      end={item.to !== '/content-calendar'}
                      className={({ isActive }) => {
                        const active =
                          isActive ||
                          (item.to === '/content-calendar' &&
                            location.pathname.startsWith('/content-calendar'));

                        return [
                          'focus-ring box-border flex h-8 items-center gap-3 rounded-[8px] px-3 text-[13px] transition-colors duration-200',
                          active
                            ? 'bg-[#2d2d2d] text-white'
                            : 'text-[#CAC1B7] hover:bg-white/5 hover:text-white',
                        ].join(' ');
                      }}
                    >
                      <Icon className="h-[15px] w-[15px]" />
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 shrink-0 space-y-4">
        <AICreditUsageCard
          loading={creditLoading}
          used={creditsUsed}
          limit={creditsLimit}
        />

        <button
          type="button"
          onClick={() => {
            onClose?.();
            navigate('/profile');
          }}
          className="focus-ring flex w-full items-center justify-between rounded-[10px] px-2 py-2 text-left transition-colors hover:bg-white/5"
          aria-label={`Open profile for ${displayName}`}
        >
          <span className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[#DAB89A] text-[11px] font-semibold text-[#201816]">
              {avatar ? (
                <img src={avatar} alt="" className="h-full w-full object-cover" />
              ) : (
                getInitials(displayName)
              )}
            </span>
            <span className="text-[13px] text-white">{displayName}</span>
          </span>
          <ChevronRightIcon className="h-4 w-4 text-[#CAC1B7]" />
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="focus-ring flex h-8 w-full items-center gap-3 rounded-[8px] px-3 text-[13px] text-[#CAC1B7] transition-colors duration-200 hover:bg-white/5 hover:text-white"
          aria-label="Logout"
        >
          <LogoutIcon className="h-[15px] w-[15px]" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
