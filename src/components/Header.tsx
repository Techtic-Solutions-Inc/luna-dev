import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { LinkList } from '@/components/LinkList';
import { SearchModal } from '@/components/SearchModal';
import type { NavLinkItem } from '@/types/home';

const DEFAULT_NAV: NavLinkItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Content', href: '/content' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: '/pricing' },
];

interface HeaderProps {
  links?: NavLinkItem[];
}

export function Header({ links }: HeaderProps) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const mobileNavCloseRef = useRef<HTMLButtonElement>(null);

  const navLinks = useMemo(() => {
    const labels = new Set(['About', 'Content', 'Blog', 'Pricing']);
    const fromApi = (links ?? []).filter((link) => labels.has(link.label));
    return fromApi.length === 4 ? fromApi : DEFAULT_NAV;
  }, [links]);

  const getStarted = (links ?? []).find((link) => link.label === 'Get Started') ?? {
    label: 'Get Started',
    href: '/signup',
  };
  const logIn = (links ?? []).find((link) => link.label === 'Log in') ?? { label: 'Log in', href: '/signin' };

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    mobileNavCloseRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
      if (event.key !== 'Tab' || !mobileNavRef.current) return;
      const focusable = mobileNavRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    const hamburgerButton = hamburgerRef.current;
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      hamburgerButton?.focus();
    };
  }, [menuOpen]);

  return (
    <header className="site-header relative z-30 text-[#FFFFFF]">
      <div className="relative mx-auto flex max-w-content items-center justify-between gap-4 px-6 py-6 md:px-10 lg:px-16">
        <Logo tone="light" />

        <div className="pointer-events-none absolute inset-x-0 hidden justify-center lg:flex">
          <div className="pointer-events-auto">
            <LinkList links={navLinks} ariaLabel="Primary" className="gap-8" />
          </div>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            className="sr-only rounded-full p-2 text-white transition hover:bg-white/10 focus:not-sr-only focus:absolute focus:right-[340px] focus:top-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>
          <Link to={getStarted.href} className="btn-outline btn-header text-sm">
            {getStarted.label}
          </Link>
          <Link to={logIn.href} className="btn-gold btn-header text-sm">
            {logIn.label}
          </Link>
        </div>

        <button
          ref={hamburgerRef}
          type="button"
          className="rounded-full p-2 text-white lg:hidden hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen ? (
        <div
          ref={mobileNavRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="border-t border-white/10 bg-color-105 px-6 py-6 lg:hidden"
        >
          <button
            ref={mobileNavCloseRef}
            type="button"
            className="mb-4 rounded-full p-2 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
          <LinkList links={navLinks} ariaLabel="Mobile primary" className="flex-col items-start gap-4" />
          <div className="mt-6 flex flex-col gap-3">
            <button type="button" className="btn-outline w-full" onClick={() => setSearchOpen(true)}>
              Search
            </button>
            <Link to={getStarted.href} className="btn-outline w-full">
              {getStarted.label}
            </Link>
            <Link to={logIn.href} className="btn-gold w-full">
              {logIn.label}
            </Link>
          </div>
        </div>
      ) : null}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
