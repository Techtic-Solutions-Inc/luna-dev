import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import BrandLogo from '@/components/brand/BrandLogo';
import { FiMenu, FiX } from '@/lib/icons';

const navItems = [
  { to: '/about-us', label: 'About' },
  { to: '/content-list', label: 'Content' },
  { to: '/blogs', label: 'Blog' },
  { to: '/pricing', label: 'Pricing' },
] as const;

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-30 flex items-center justify-between px-5 py-5 tablet:px-10 desktop:px-16">
      <NavLink to="/home" aria-label="Agentwise home">
        <BrandLogo align="start" />
      </NavLink>
      <nav className="hidden items-center gap-10 desktop:flex" aria-label="Primary">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="font-almarai text-sm text-secondary hover:text-accent"
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="hidden items-center gap-3 desktop:flex">
        <NavLink
          to="/sign-up"
          className="inline-flex items-center justify-center rounded-full border border-secondary px-5 py-2 font-almarai text-sm font-bold text-secondary"
        >
          Get Started
        </NavLink>
        <NavLink
          to="/sign-in"
          className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2 font-almarai text-sm font-bold text-color-16"
        >
          Log in
        </NavLink>
      </div>
      <button
        type="button"
        className="rounded-token-8 p-2 text-secondary desktop:hidden"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? (
          <FiX size={22} aria-hidden="true" focusable="false" />
        ) : (
          <FiMenu size={22} aria-hidden="true" focusable="false" />
        )}
      </button>
      {open ? (
        <div className="absolute inset-x-0 top-full border-b border-color-41 bg-color-16 px-5 py-4 desktop:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobile">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="font-almarai text-sm text-secondary"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/sign-up"
              className="font-almarai text-sm text-accent"
              onClick={() => setOpen(false)}
            >
              Get Started
            </NavLink>
            <NavLink
              to="/sign-in"
              className="font-almarai text-sm text-secondary"
              onClick={() => setOpen(false)}
            >
              Log in
            </NavLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
