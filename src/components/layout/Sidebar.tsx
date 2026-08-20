import { type ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LuBookOpen,
  LuCalendarCheck,
  LuChevronRight,
  LuCrown,
  LuHouse,
  LuLogOut,
  LuMegaphone,
  LuSparkles,
} from 'react-icons/lu';
import { useAuth } from '../../hooks/useAuth';
import { creditPercent } from '../../lib/dashboard';
import { displayInitial, displayName } from '../../lib/session';

interface SidebarProps {
  open: boolean;
  onNavigate?: () => void;
}

const studioLinks = [
  { to: '/dashboard', label: 'Overview', icon: LuHouse, hash: false },
  { to: '/dashboard#content-library', label: 'Content Library', icon: LuBookOpen, hash: true },
  { to: '/dashboard#content-calendar', label: 'Content Calendar', icon: LuCalendarCheck, hash: true },
] as const;

const toolLinks = [{ to: '/dashboard#tools', label: 'Ultimate Mind', icon: LuSparkles }] as const;

const accountLinks = [
  { to: '/dashboard#announcements', label: 'Announcements', icon: LuMegaphone },
  { to: '/dashboard#announcements', label: 'New Features', icon: LuSparkles },
  { to: '/dashboard#tools', label: 'Subscription', icon: LuCrown },
] as const;

const linkClassName = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-xl px-3 py-2.5 font-almarai text-sm transition-colors ${
    isActive
      ? 'bg-[var(--color-36)] text-secondary'
      : 'text-[var(--color-57)] hover:bg-[var(--color-36)] hover:text-secondary'
  }`;

function NavGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-6">
      <p className="px-3 font-almarai text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-57)]">
        {title}
      </p>
      <div className="mt-2 flex flex-col gap-1">{children}</div>
    </div>
  );
}

export default function Sidebar({ open, onNavigate }: SidebarProps) {
  const navigate = useNavigate();
  const { user, credits, logout } = useAuth();
  const name = displayName(user);

  const handleLogout = () => {
    logout();
    onNavigate?.();
    void navigate('/');
  };

  return (
    <aside
      id="app-sidebar"
      className={`fixed inset-y-0 left-0 z-40 flex w-72 shrink-0 flex-col border-r border-[var(--color-41)] bg-[var(--color-16)] px-4 py-6 transition-transform md:sticky md:top-0 md:h-screen md:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="px-3">
        <p className="font-kalam text-[28px] font-bold leading-none text-secondary">Agentwise</p>
        <p className="mt-2 font-almarai text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-57)]">
          Real Estate Marketing
        </p>
      </div>

      <nav aria-label="Main navigation" className="mt-8 flex-1 overflow-y-auto">
        <NavGroup title="Studio">
          {studioLinks.map(({ to, label, icon: Icon, hash }) =>
            hash ? (
              <a key={label} href={to} className={linkClassName({ isActive: false })} onClick={onNavigate}>
                <Icon size={18} aria-hidden="true" />
                {label}
              </a>
            ) : (
              <NavLink key={label} to={to} className={linkClassName} onClick={onNavigate} end>
                <Icon size={18} aria-hidden="true" />
                {label}
              </NavLink>
            ),
          )}
        </NavGroup>

        <NavGroup title="Tools">
          {toolLinks.map(({ to, label, icon: Icon }) => (
            <a key={label} href={to} className={linkClassName({ isActive: false })} onClick={onNavigate}>
              <Icon size={18} aria-hidden="true" />
              {label}
            </a>
          ))}
        </NavGroup>

        <NavGroup title="Account">
          {accountLinks.map(({ to, label, icon: Icon }) => (
            <a key={label} href={to} className={linkClassName({ isActive: false })} onClick={onNavigate}>
              <Icon size={18} aria-hidden="true" />
              {label}
            </a>
          ))}
        </NavGroup>
      </nav>

      <div className="mt-4 space-y-4 px-1">
        <div className="rounded-xl border border-[var(--color-41)] px-4 py-3">
          <p className="font-almarai text-xs text-[var(--color-57)]">AI Credit Usage</p>
          {credits ? (
            <>
              <div className="mt-2 flex items-center justify-between gap-3 font-almarai text-sm text-secondary">
                <span>Current</span>
                <span>
                  {credits.current.toLocaleString()} / {credits.total.toLocaleString()}
                </span>
              </div>
              <div
                className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--color-41)]"
                role="progressbar"
                aria-label="AI credit usage"
                aria-valuemin={0}
                aria-valuemax={credits.total}
                aria-valuenow={credits.current}
              >
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${creditPercent(credits)}%` }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--color-41)]">
                <div className="h-full w-0 rounded-full bg-accent" />
              </div>
              <p className="mt-2 font-almarai text-[11px] text-[var(--color-57)]">
                Usage data unavailable
              </p>
            </>
          )}
        </div>

        {name ? (
          <div className="flex items-center gap-3 px-2">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-41)] bg-[var(--color-36)] font-almarai text-sm text-secondary"
              aria-hidden="true"
            >
              {displayInitial(user)}
            </div>
            <p className="min-w-0 flex-1 truncate font-almarai text-sm text-secondary">{name}</p>
            <LuChevronRight size={16} className="shrink-0 text-[var(--color-57)]" aria-hidden="true" />
          </div>
        ) : null}

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 font-almarai text-sm text-[var(--color-57)] transition-colors hover:bg-[var(--color-36)] hover:text-secondary"
        >
          <LuLogOut size={18} aria-hidden="true" />
          Logout
        </button>
      </div>
    </aside>
  );
}
