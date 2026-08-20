interface HeaderProps {
  onMenuClick: () => void;
  menuOpen: boolean;
}

export default function Header({ onMenuClick, menuOpen }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-[var(--color-41)] bg-[var(--color-16)] px-4 py-4 md:hidden">
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-41)] text-secondary"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        aria-controls="app-sidebar"
        onClick={onMenuClick}
      >
        <span aria-hidden="true" className="font-almarai text-lg leading-none">
          {menuOpen ? '✕' : '☰'}
        </span>
      </button>
      <p className="font-kalam text-xl font-bold text-secondary">Agentwise</p>
      <span className="w-10" aria-hidden="true" />
    </header>
  );
}
