import { NavLink } from 'react-router-dom';

const tabs = [
  { label: 'Profile', to: '/profile' },
  { label: 'Downloads', to: '/profile/downloads' },
  { label: 'Content Generated', to: '/profile/content-generated' },
] as const;

export default function TabsNavigation() {
  return (
    <nav aria-label="Profile sections" className="mt-8 border-b border-white/10">
      <ul className="flex flex-wrap gap-6 md:gap-8">
        {tabs.map((tab) => (
          <li key={tab.to}>
            <NavLink
              to={tab.to}
              end={tab.to === '/profile'}
              className={({ isActive }) =>
                [
                  'focus-ring relative inline-flex pb-3 text-[15px] leading-5 transition-colors duration-150',
                  isActive
                    ? 'text-primary after:absolute after:inset-x-0 after:bottom-[-1px] after:h-[2px] after:rounded-full after:bg-primary'
                    : 'text-[#BEBBB9] hover:text-white',
                ].join(' ')
              }
            >
              {tab.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
