import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const navLinkClass =
  'text-[16px] font-normal leading-[17.856px] text-ink transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:opacity-80';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#learn-more', label: 'Learn More' },
  { href: '#content', label: 'Content' },
  { href: '#blog', label: 'Blog' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
] as const;

export function HomeHeader() {
  const [navOpen, setNavOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeNav = () => setNavOpen(false);

  useEffect(() => {
    if (!navOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setNavOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [navOpen]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1280px)');
    const onChange = () => {
      if (media.matches) setNavOpen(false);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return (
    <header className="relative z-50">
      <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-3 px-6 py-[20px] md:px-[40px]">
        <Link
          to="/"
          className="flex min-w-0 shrink flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span className="truncate text-[22px] font-medium leading-none text-ink sm:text-[28px] md:text-[32px]">
            Agentwise
          </span>
          <span className="mt-[4px] truncate text-[9px] font-medium uppercase tracking-[0.14em] text-ink/80 md:text-[10px]">
            Real Estate Marketing
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden min-w-0 flex-1 flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 xl:flex"
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={navLinkClass}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-[12px]">
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-control border border-ink text-ink xl:hidden"
            aria-expanded={navOpen}
            aria-controls="mobile-nav"
            aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setNavOpen((open) => !open)}
          >
            {navOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M5 5l10 10M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M3 5h14M3 10h14M3 15h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
          <Link
            to="/signup"
            className="inline-flex h-[44px] items-center rounded-[100px] border border-ink px-3 text-[14px] font-semibold leading-6 text-ink transition-all hover:bg-ink/10 active:bg-ink/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-[20px] sm:text-[16px]"
          >
            Get Started
          </Link>
          <Link
            to="/signin"
            className="inline-flex h-[44px] items-center rounded-[100px] bg-accent px-3 text-[14px] font-semibold leading-6 text-[#000001] transition-all hover:brightness-90 active:brightness-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-[20px] sm:text-[16px]"
          >
            Log in
          </Link>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!navOpen}
        inert={!navOpen}
        className="border-t border-ink/10 bg-[#050505] px-6 py-4 xl:hidden"
      >
        <ul className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block rounded-control px-3 py-3 text-[16px] leading-6 text-ink hover:bg-ink/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                onClick={closeNav}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/signup"
              className="block rounded-control px-3 py-3 text-[16px] font-semibold leading-6 text-accent hover:bg-ink/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              onClick={closeNav}
            >
              Get Started
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
