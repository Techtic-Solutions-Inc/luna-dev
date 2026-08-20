import { useState } from 'react';
import { LuMenu, LuX } from 'react-icons/lu';
import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { to: '/about', label: 'About' },
  { to: '/content', label: 'Content' },
  { to: '/blog', label: 'Blog' },
  { to: '/pricing', label: 'Pricing' },
] as const;

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const close = (): void => {
    setIsOpen(false);
  };

  return (
    <header className="relative z-20">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-20 focus:top-12 focus:z-50 focus:rounded-8 focus:bg-accent focus:px-12 focus:py-8 focus:text-color-16"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex w-full max-w-[1164px] items-center justify-between px-20 py-16 desktop:py-20">
        <Link to="/" className="type-heading-lg-108 text-white" aria-label="Agentwise home">
          Agentwise
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-32 desktop:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="type-caption-37 uppercase tracking-[0.08em] text-white/80 transition-colors duration-200 hover:text-white"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-12 desktop:flex">
          <Link
            to="/sign-up"
            className="type-body-sm-2 inline-flex h-36 items-center justify-center rounded-full bg-accent px-20 text-color-16 transition-colors duration-200 hover:bg-color-30"
          >
            Get Started
          </Link>
          <Link
            to="/sign-in"
            className="type-body-sm-2 inline-flex h-36 items-center justify-center rounded-full border border-white/40 px-20 text-white transition-colors duration-200 hover:border-white"
          >
            Login
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-36 w-36 items-center justify-center rounded-full text-white desktop:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-site-nav"
          onClick={() => {
            setIsOpen((open) => !open);
          }}
        >
          {isOpen ? <LuX aria-hidden="true" size={22} /> : <LuMenu aria-hidden="true" size={22} />}
          <span className="sr-only">{isOpen ? 'Close navigation' : 'Open navigation'}</span>
        </button>
      </div>

      {isOpen ? (
        <div
          id="mobile-site-nav"
          className="border-t border-color-41 bg-color-16 px-20 py-16 desktop:hidden"
        >
          <nav aria-label="Mobile primary" className="flex flex-col gap-16">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={close}
                className="type-body-sm-2 text-white"
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/sign-up"
              onClick={close}
              className="type-body-sm-2 inline-flex h-36 items-center justify-center rounded-full bg-accent px-20 text-color-16"
            >
              Get Started
            </Link>
            <Link
              to="/sign-in"
              onClick={close}
              className="type-body-sm-2 inline-flex h-36 items-center justify-center rounded-full border border-white/40 px-20 text-white"
            >
              Login
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export default SiteHeader;
