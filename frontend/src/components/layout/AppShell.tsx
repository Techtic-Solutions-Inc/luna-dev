import { useEffect, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FontAwesomeIcon,
  faBars,
  faBell,
  faCalendarDays,
  faChevronRight,
  faCreditCard,
  faFolderOpen,
  faHouse,
  faLightbulb,
  faRightFromBracket,
  faStar,
  faXmark,
} from '../../theme/icons';
import { IMAGES } from '../../constants/images';
import './AppShell.css';

interface AppShellProps {
  children: ReactNode;
}

const STUDIO_NAV = [
  {
    label: 'Studio',
    items: [
      { label: 'Overview', href: '/dashboard', icon: faHouse },
      { label: 'Content Library', href: '/dashboard', icon: faFolderOpen },
      { label: 'Content Calendar', href: '/dashboard', icon: faCalendarDays },
    ],
  },
  {
    label: 'Tools',
    items: [{ label: 'Ultimate Mind', href: '/dashboard', icon: faLightbulb }],
  },
  {
    label: 'Account',
    items: [
      { label: 'Announcements', href: '/dashboard', icon: faBell },
      { label: 'New Features', href: '/dashboard', icon: faStar },
      { label: 'Subscription', href: '/dashboard', icon: faCreditCard },
    ],
  },
] as const;

const USER = {
  name: 'Joseph Stanley',
  avatar: IMAGES.avatarMarcus,
} as const;

export function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!sidebarOpen) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSidebarOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [sidebarOpen]);

  return (
    <div className="app-shell">
      <button
        type="button"
        className="app-shell__menu-toggle"
        aria-expanded={sidebarOpen}
        aria-controls="app-shell-sidebar"
        onClick={() => {
          setSidebarOpen((current) => !current);
        }}
      >
        <FontAwesomeIcon icon={sidebarOpen ? faXmark : faBars} />
        <span className="visually-hidden">
          {sidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
        </span>
      </button>

      {sidebarOpen ? (
        <button
          type="button"
          className="app-shell__backdrop"
          aria-label="Close navigation menu"
          onClick={() => {
            setSidebarOpen(false);
          }}
        />
      ) : null}

      <aside
        id="app-shell-sidebar"
        className={[
          'app-shell__sidebar',
          sidebarOpen ? 'app-shell__sidebar--open' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="app-shell__brand">
          <Link className="app-shell__brand-link" to="/dashboard">
            <span className="app-shell__brand-mark">Agentwise</span>
            <span className="app-shell__brand-tagline">Real Estate Marketing</span>
          </Link>
        </div>

        <nav className="app-shell__nav" aria-label="Main navigation">
          {STUDIO_NAV.map((section) => (
            <div key={section.label} className="app-shell__nav-section">
              <p className="app-shell__nav-heading">{section.label}</p>
              <ul className="app-shell__nav-list">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      className="app-shell__nav-link"
                      to={item.href}
                      aria-current={
                        location.pathname === item.href ? 'page' : undefined
                      }
                    >
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="app-shell__nav-icon"
                      />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="app-shell__sidebar-footer">
          <div className="app-shell__credits">
            <div className="app-shell__credits-header">
              <span>AI Credit Usage</span>
              <span className="app-shell__credits-label">Current</span>
            </div>
            <div
              className="app-shell__credits-bar"
              role="progressbar"
              aria-valuenow={1420}
              aria-valuemin={0}
              aria-valuemax={5000}
              aria-label="AI credit usage: 1,420 of 5,000"
            >
              <span style={{ width: '28.4%' }} />
            </div>
            <p className="app-shell__credits-value">1,420 / 5,000</p>
          </div>

          <Link
            className="app-shell__user"
            to="/settings/profile"
            aria-current={
              location.pathname.startsWith('/settings/profile') ? 'page' : undefined
            }
          >
            <img
              className="app-shell__user-avatar"
              src={USER.avatar}
              alt=""
              width={36}
              height={36}
            />
            <span className="app-shell__user-name">{USER.name}</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>

          <Link className="app-shell__logout" to="/sign-in">
            <FontAwesomeIcon icon={faRightFromBracket} />
            Logout
          </Link>
        </div>
      </aside>

      <div className="app-shell__main">{children}</div>
    </div>
  );
}

export default AppShell;
