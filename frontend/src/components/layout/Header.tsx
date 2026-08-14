import { FiBell, FiMenu } from 'react-icons/fi';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#0b0b0b] px-4 lg:hidden">
      <p className="font-['EB_Garamond'] text-2xl text-white">Agentwise</p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-lg p-2 text-[#bdbdbd] hover:bg-white/10 hover:text-white"
        >
          <FiBell aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Open navigation menu"
          className="rounded-lg p-2 text-[#bdbdbd] hover:bg-white/10 hover:text-white"
          onClick={onMenuClick}
        >
          <FiMenu aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
