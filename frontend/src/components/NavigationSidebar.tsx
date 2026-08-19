import { CloseIcon } from './icons';
import NavigationMenu from './NavigationMenu';

interface NavigationSidebarProps {
  creditLoading?: boolean;
  creditsUsed?: number;
  creditsLimit?: number;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function NavigationSidebar({
  creditLoading = false,
  creditsUsed,
  creditsLimit,
  isOpen = true,
  onClose,
}: NavigationSidebarProps) {
  return (
    <aside
      className={[
        'fixed inset-y-0 left-0 z-40 w-[244px] transform border-r border-white/5 bg-[#0b0b0b] transition-transform duration-200 lg:static lg:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}
      aria-label="Sidebar"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-end px-4 pt-4 lg:hidden">
          <button
            type="button"
            onClick={onClose}
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-full text-white"
            aria-label="Close navigation menu"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <NavigationMenu
          creditLoading={creditLoading}
          creditsUsed={creditsUsed}
          creditsLimit={creditsLimit}
          onClose={onClose}
        />
      </div>
    </aside>
  );
}
