import { NavLink, useLocation } from 'react-router-dom';

export type ProfileTab = 'profile' | 'downloads' | 'content-generated';

interface TabItem {
  id: ProfileTab;
  label: string;
  to: string;
  match: (pathname: string) => boolean;
}

const tabs: TabItem[] = [
  {
    id: 'profile',
    label: 'Profile',
    to: '/profile',
    match: (pathname) => pathname === '/profile',
  },
  {
    id: 'downloads',
    label: 'Downloads',
    to: '/profile/downloads',
    match: (pathname) => pathname.startsWith('/profile/downloads'),
  },
  {
    id: 'content-generated',
    label: 'Content Generated',
    to: '/profile/content-generated',
    match: (pathname) => pathname.startsWith('/profile/content-generated'),
  },
];

export default function TabsNavigation() {
  const { pathname } = useLocation();

  return (
    <nav aria-label="Profile sections" className="mt-8 md:mt-10">
      <ul className="flex flex-wrap gap-6 border-b border-white/10 sm:gap-10">
        {tabs.map((tab) => {
          const isActive = tab.match(pathname);

          return (
            <li key={tab.id}>
              <NavLink
                to={tab.to}
                end={tab.id === 'profile'}
                className={[
                  'focus-ring relative inline-flex pb-3 text-[15px] transition-colors duration-200',
                  isActive
                    ? 'font-medium text-white'
                    : 'text-[#A6A4A2] hover:text-white',
                ].join(' ')}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab.label}
                {isActive ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-primary"
                  />
                ) : null}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
