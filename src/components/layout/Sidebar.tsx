import { Link } from 'react-router-dom';
import {
  FiCalendar,
  FiCreditCard,
  FiFileText,
  FiGrid,
  FiLogOut,
  FiMessageSquare,
  FiZap,
  FiX,
} from 'react-icons/fi';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: 'Overview', icon: FiGrid },
  { label: 'Content Library', icon: FiFileText },
  { label: 'Content Calendar', icon: FiCalendar },
  { label: 'Ultimate Mind', icon: FiZap },
  { label: 'Announcements', icon: FiMessageSquare },
  { label: 'Subscription', icon: FiCreditCard },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          aria-label="Close navigation menu"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/5 bg-[#090909] px-3 py-5 transition-transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <Link to="/overview" className="font-['EB_Garamond'] text-3xl text-white">
            Agentwise
          </Link>
          <button
            type="button"
            aria-label="Close navigation menu"
            className="rounded p-2 text-[#bdbdbd] lg:hidden"
            onClick={onClose}
          >
            <FiX aria-hidden="true" />
          </button>
        </div>
        <p className="mb-2 px-2 text-xs text-[#858585]">Studio</p>
        <nav aria-label="Primary navigation" className="space-y-1">
          {navItems.map(({ label, icon: Icon }, index) => (
            <Link
              to="/overview"
              key={label}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm ${index === 0 ? 'bg-white/10 text-white' : 'text-[#959595] hover:bg-white/5 hover:text-white'}`}
            >
              <Icon aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto space-y-4">
          <div className="rounded-md border border-[#c8a47e]/20 bg-[#14100d] p-3 text-xs">
            <p className="font-semibold text-white">AI Credit Usage</p>
            <div className="mt-2 flex justify-between text-[#bdbdbd]">
              <span>Current</span>
              <span>0 / 5,000</span>
            </div>
            <div className="mt-2 h-1 rounded-full bg-white/10">
              <div className="h-1 w-0 rounded-full bg-[#c8a47e]" />
            </div>
          </div>
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-[#959595] hover:bg-white/5 hover:text-white"
          >
            <FiLogOut aria-hidden="true" />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}
