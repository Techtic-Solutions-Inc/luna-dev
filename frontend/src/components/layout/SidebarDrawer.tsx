import { useEffect, useRef } from 'react';
import { CloseIcon } from '@/components/icons';
import { AppSidebar } from '@/components/layout/AppSidebar';

interface SidebarDrawerProps {
  creditLoading?: boolean;
  creditsUsed?: number;
  creditsLimit?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function SidebarDrawer({
  creditLoading = false,
  creditsUsed,
  creditsLimit,
  isOpen,
  onClose,
}: SidebarDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <aside
      className={[
        'fixed inset-y-0 left-0 z-40 w-[244px] transform border-r border-white/5 bg-[#0B0B0B] transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:self-start lg:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}
      aria-label="Sidebar"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-end px-4 pt-4 lg:hidden">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-full text-white"
            aria-label="Close navigation menu"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <AppSidebar
          creditLoading={creditLoading}
          creditsUsed={creditsUsed}
          creditsLimit={creditsLimit}
          onClose={onClose}
        />
      </div>
    </aside>
  );
}
