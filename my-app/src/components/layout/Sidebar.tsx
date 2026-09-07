import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
]

function Sidebar() {
  return (
    <aside className="flex w-[240px] shrink-0 flex-col border-r border-[#3a3541] bg-[#0e0d0d] px-[16px] py-[24px]">
      <div className="mb-8">
        <span className="font-['EB_Garamond'] text-[24px] font-[500] text-[#c8a47e]">Sofia</span>
      </div>
      <nav className="flex flex-col gap-2" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'rounded-[8px] px-3 py-2 text-[16px] font-[400] text-[#ffffff] transition-colors hover:bg-[#3a3541]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e]',
                isActive && 'bg-[#3a3541] text-[#c8a47e]',
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
