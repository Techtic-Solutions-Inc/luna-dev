import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { SearchModal } from './SearchModal';

const NAV = [
  { label: 'About', href: '/about' },
  { label: 'Content', href: '/content' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: '/pricing' },
] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogId = useId();

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    const trigger = triggerRef.current;
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
      trigger?.focus();
    };
  }, [menuOpen]);

  return (
    <header className="relative z-30">
      <div className="mx-auto flex max-w-wide items-center justify-between gap-4 px-5 py-6 md:px-12">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.href} to={item.href} className="text-link text-public-16">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-gap-12 lg:flex">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-1000 text-white hover:bg-white/10 active:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="Open search"
            onClick={() => setSearchOpen(true)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </button>
          <Link to="/signup" className="btn-ghost">
            Get Started
          </Link>
          <Link to="/signin" className="btn-primary">
            Log in
          </Link>
        </div>
        <button
          ref={triggerRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-12 text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          aria-controls={dialogId}
          onClick={() => setMenuOpen(true)}
        >
          <span className="flex flex-col gap-1.5" aria-hidden="true">
            <span className="block h-0.5 w-5 bg-white" />
            <span className="block h-0.5 w-5 bg-white" />
            <span className="block h-0.5 w-5 bg-white" />
          </span>
        </button>
      </div>

      {menuOpen ? (
        <div
          id={dialogId}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-50 bg-color-105/95 p-6 lg:hidden"
        >
          <div className="flex justify-end">
            <button
              ref={closeRef}
              type="button"
              className="btn-ghost px-4 py-2"
              onClick={() => setMenuOpen(false)}
            >
              Close
            </button>
          </div>
          <nav className="mt-10 flex flex-col gap-6" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-link font-garamond text-3xl"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              className="text-link text-left font-garamond text-3xl"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
            >
              Search
            </button>
            <Link to="/signup" className="btn-ghost w-full" onClick={() => setMenuOpen(false)}>
              Get Started
            </Link>
            <Link to="/signin" className="btn-primary w-full" onClick={() => setMenuOpen(false)}>
              Log in
            </Link>
          </nav>
        </div>
      ) : null}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
