import { useEffect, useMemo, useState } from 'react';
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

  return (
    <header className="relative z-30">
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
            onClick={() => setSearchOpen(true)}
            className="rounded-full p-2 text-white transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95"
            aria-label="Open search"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </button>
          <Link to={getStarted.href} className="btn-outline px-6 py-2.5 text-sm">
            {getStarted.label}
          </Link>
          <Link to={logIn.href} className="btn-gold px-6 py-2.5 text-sm">
            {logIn.label}
          </Link>
        </div>

        <button
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
        <div id="mobile-nav" className="border-t border-white/10 bg-color-105 px-6 py-6 lg:hidden">
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
