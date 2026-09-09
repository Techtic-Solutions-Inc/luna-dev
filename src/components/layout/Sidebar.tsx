import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUserPlus } from 'react-icons/fa';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/home', label: 'Home', icon: FaHome },
  { to: '/signup', label: 'Sign Up', icon: FaUserPlus },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-[#2f2f2f] bg-[#0b0b0b] px-[24px] py-[32px] md:flex">
      <nav className="flex flex-col gap-[8px]" aria-label="Sidebar navigation">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              'flex items-center gap-[12px] rounded-[6px] px-[12px] py-[8px] font-almarai text-[16px] font-normal [color:var(--token-primary)] transition-colors hover:bg-[color:var(--token-border)]/10 hover:[color:var(--token-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:[ring-color:var(--token-border)]',
              location.pathname === to && 'bg-[color:var(--token-border)]/10 [color:var(--token-border)]',
            )}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
