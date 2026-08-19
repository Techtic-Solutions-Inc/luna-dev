import { NavLink } from 'react-router-dom';

const tabs = [
  { label: 'Profile', to: '/profile' },
  { label: 'Downloads', to: '/profile/downloads' },
  { label: 'Content Generated', to: '/profile/content-generated' },
];

export function ProfileTabs() {
  return (
    <nav aria-label="Profile sections" className="mt-8 border-b border-white/10">
      <ul className="flex flex-wrap gap-6">
        {tabs.map((tab) => (
          <li key={tab.to}>
            <NavLink
              to={tab.to}
              end={tab.to === '/profile'}
              className={({ isActive }) =>
                [
                  'focus-ring inline-flex pb-3 text-[14px] transition-colors',
                  isActive
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-[#A6A4A2] hover:text-white',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <span aria-current={isActive ? 'page' : undefined}>{tab.label}</span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
