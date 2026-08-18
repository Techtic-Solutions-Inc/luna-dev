import type { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AICreditUsageDisplay from './AICreditUsageDisplay';
import {
  CalendarIcon,
  CardIcon,
  ChevronRightIcon,
  HomeIcon,
  LibraryIcon,
  LogoutIcon,
  MegaphoneIcon,
  SparkIcon,
  StarIcon,
} from './icons';

interface NavigationMenuProps {
  creditLoading?: boolean;
  creditsUsed?: number;
  creditsLimit?: number;
  onClose?: () => void;
}

interface NavItem {
  label: string;
  icon: (props: { className?: string }) => ReactNode;
  to: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: 'Studio',
    items: [
      { label: 'Overview', icon: HomeIcon, to: '/dashboard' },
      { label: 'Content Library', icon: LibraryIcon, to: '/content-library' },
      { label: 'Content Calendar', icon: CalendarIcon, to: '/content-calendar' },
    ],
  },
  {
    title: 'Tools',
    items: [{ label: 'Ultimate Mind', icon: SparkIcon, to: '/ultimate-mind' }],
  },
  {
    title: 'Account',
    items: [
      { label: 'Announcements', icon: MegaphoneIcon, to: '/announcements' },
      { label: 'New Features', icon: StarIcon, to: '/new-features' },
      { label: 'Subscription', icon: CardIcon, to: '/subscription' },
    ],
  },
];

function getDisplayName(): string {
  const stored =
    localStorage.getItem('name') ??
    localStorage.getItem('userName') ??
    localStorage.getItem('first_name');

  if (stored) {
    return stored;
  }

  const firstName = localStorage.getItem('first_name');
  const lastName = localStorage.getItem('last_name');

  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }

  return 'Joseph Stanley';
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function NavigationMenu({
  creditLoading = false,
  creditsUsed,
  creditsLimit,
  onClose,
}: NavigationMenuProps) {
  const navigate = useNavigate();
  const displayName = getDisplayName();
  const avatarUrl =
    localStorage.getItem('avatar') ?? localStorage.getItem('avatarUrl');

  const onLogout = () => {
    localStorage.removeItem('token');
    onClose?.();
    navigate('/dashboard');
  };

  return (
    <nav
      aria-label="Main navigation"
      className="flex h-full min-h-0 flex-col bg-[#0b0b0b] px-3 py-5"
    >
      <div className="mb-8 shrink-0 px-2">
        <NavLink
          to="/dashboard"
          onClick={onClose}
          className="rounded-sm text-white focus-ring"
          aria-label="Agentwise home"
        >
          <span className="block font-script text-[28px] leading-none">
            Agentwise
          </span>
          <span className="mt-1 block text-[8px] uppercase tracking-[0.24em] text-white/70">
            Real Estate Marketing
          </span>
        </NavLink>
      </div>

      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.title}>
            <p className="mb-2 px-3 text-[11px] uppercase tracking-[0.12em] text-[#646261]">
              {section.title}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        [
                          'focus-ring box-border flex h-8 items-center gap-3 rounded-[8px] border px-3 text-[13px] transition-colors duration-200',
                          isActive
                            ? 'border-white text-white'
                            : 'border-transparent text-[#CAC1B7] hover:bg-white/5 hover:text-white',
                        ].join(' ')
                      }
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
        <AICreditUsageDisplay
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
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
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
          onClick={onLogout}
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
