import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '@/components/home/BrandLogo';
import { Button } from '@/components/ui/Button';

const NAV = [
  { label: 'About', to: '#about' },
  { label: 'Content', to: '/content' },
  { label: 'Blog', to: '/blog' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Join', to: '/signup' },
  { label: 'Contact Us', to: '#contact' },
] as const;

const LINK_CLASS =
  'type-body-115 font-medium text-ink no-underline hover:text-[#c8a47e] focus-visible:text-[#c8a47e] active:opacity-80';

const FOCUSABLE = 'a[href], button:not([disabled])';

function NavLink({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) {
  if (to.startsWith('#')) {
    return (
      <a href={to} className={LINK_CLASS} onClick={onClick}>
        {label}
      </a>
    );
  }
  return (
    <Link to={to} className={LINK_CLASS} onClick={onClick}>
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    const panel = panelRef.current;
    panel?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab' || !panel) {
        return;
      }
      const nodes = panel.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (nodes.length === 0) {
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  const links: ReactNode = NAV.map((item) => (
    <NavLink key={item.label} to={item.to} label={item.label} onClick={open ? close : undefined} />
  ));

  return (
    <header className="relative z-40 bg-[#11161c] px-[20px] pt-[20px] md:px-[30px] lg:px-[101px]">
      <div className="mx-auto flex max-w-[1760px] items-center justify-between gap-[16px]">
        <BrandLogo />
        <nav className="hidden items-center gap-[30px] lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <NavLink key={item.label} to={item.to} label={item.label} />
          ))}
        </nav>
        <div className="hidden items-center gap-[12px] lg:flex">
          <Button to="/signup" variant="secondary" className="h-[44px] min-w-[140px]">
            Get Started
          </Button>
          <Button to="/signin" variant="primary" className="h-[44px] min-w-[110px]">
            Log in
          </Button>
        </div>
        <button
          ref={toggleRef}
          type="button"
          className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[100px] border border-ink text-ink hover:bg-ink/10 active:bg-ink/15 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => (open ? close() : setOpen(true))}
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>
      </div>
      {open ? (
        <nav
          ref={panelRef}
          id="mobile-nav"
          tabIndex={-1}
          className="mt-[16px] flex flex-col gap-[12px] rounded-[16px] border border-[#637381] bg-[#11161c] p-[16px] lg:hidden"
          aria-label="Mobile"
        >
          {links}
          <Button to="/signup" variant="secondary" onClick={close}>
            Get Started
          </Button>
          <Button to="/signin" variant="primary" onClick={close}>
            Log in
          </Button>
        </nav>
      ) : null}
    </header>
  );
}
