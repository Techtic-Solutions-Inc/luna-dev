import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { StaticImage } from '../ui/StaticImage';

const NAV_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Content', to: '/content' },
  { label: 'Blog', to: '/blog' },
  { label: 'Pricing', to: '/pricing' },
] as const;

export function NavBar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const mobileNavCloseRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const titleId = useId();

  const closeMobileNav = () => {
    setMobileNavOpen(false);
  };

  useEffect(() => {
    if (!mobileNavOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const closeButton = mobileNavCloseRef.current;
    closeButton?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobileNav();
        return;
      }
      if (event.key !== 'Tab' || !mobileNavRef.current) {
        return;
      }
      const focusable = mobileNavRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) {
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    if (mobileNavOpen) {
      wasOpenRef.current = true;
      return;
    }
    if (wasOpenRef.current) {
      hamburgerRef.current?.focus();
      wasOpenRef.current = false;
    }
  }, [mobileNavOpen]);

  return (
    <header className="relative z-30">
      <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between px-5 py-6 md:px-10 lg:px-[100px] xl:px-[120px]">
        <Link to="/" aria-label="Agentwise home" className="flex shrink-0 items-center">
          <StaticImage
            src="/assets/figma/logo-white.png"
            alt="Agentwise Real Estate Marketing"
            className="h-12 w-auto object-contain object-left md:h-14"
            width={220}
            height={56}
          />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[15px] font-normal text-white transition-colors hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#contact"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white px-6 text-[15px] text-white transition-colors hover:bg-white/10"
          >
            Get Started
          </a>
          <Link
            to="/signin"
            className="inline-flex h-11 items-center justify-center rounded-full bg-gold px-7 text-[15px] font-bold text-[#1a1210] transition-opacity hover:opacity-90"
          >
            Log in
          </Link>
        </div>

        <button
          ref={hamburgerRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white lg:hidden"
          aria-label="Open menu"
          aria-expanded={mobileNavOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileNavOpen(true)}
        >
          <span className="sr-only">Open menu</span>
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
            <path d="M1 1h18M1 7h18M1 13h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {mobileNavOpen ? (
        <div
          id="mobile-nav"
          ref={mobileNavRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-50 flex flex-col bg-ink px-6 py-6 lg:hidden"
        >
          <div className="flex items-center justify-between">
            <p id={titleId} className="font-serif text-2xl text-white">
              Menu
            </p>
            <button
              ref={mobileNavCloseRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white"
              aria-label="Close menu"
              onClick={closeMobileNav}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="mt-10 flex flex-col gap-6" aria-label="Mobile">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="font-serif text-3xl text-white"
                onClick={closeMobileNav}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3 pb-8">
            <a
              href="#contact"
              onClick={closeMobileNav}
              className="inline-flex h-12 items-center justify-center rounded-full border border-white text-white"
            >
              Get Started
            </a>
            <Link
              to="/signin"
              onClick={closeMobileNav}
              className="inline-flex h-12 items-center justify-center rounded-full bg-gold font-bold text-[#1a1210]"
            >
              Log in
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
