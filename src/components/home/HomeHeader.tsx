import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrandMark } from './BrandMark';
import { Button } from '../ui/Button';

const NAV = [
  { label: 'About', to: '#about' },
  { label: 'Content', to: '/content' },
  { label: 'Blog', to: '/blog' },
  { label: 'Pricing', to: '/pricing' },
];

const LINK_CLASS =
  'type-body-115 font-medium text-muted no-underline hover:text-accent focus-visible:text-accent active:text-ink';

export function HomeHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-40 px-[20px] pt-[20px] md:px-[40px] lg:px-[80px]">
      <div className="mx-auto flex max-w-[1760px] items-center justify-between gap-[16px]">
        <BrandMark />
        <nav className="hidden items-center gap-[30px] lg:flex" aria-label="Primary">
          {NAV.map((item) =>
            item.to.startsWith('#') ? (
              <a key={item.label} href={item.to} className={LINK_CLASS}>
                {item.label}
              </a>
            ) : (
              <Link key={item.label} to={item.to} className={LINK_CLASS}>
                {item.label}
              </Link>
            ),
          )}
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
          type="button"
          className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-control border border-ink text-ink hover:bg-ink/10 active:bg-ink/15 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="mt-[16px] flex flex-col gap-[12px] rounded-16 border border-line bg-color-103 p-[16px] lg:hidden"
          aria-label="Mobile"
        >
          {NAV.map((item) =>
            item.to.startsWith('#') ? (
              <a
                key={item.label}
                href={item.to}
                className={LINK_CLASS}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                className={LINK_CLASS}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link to="/signup" className={LINK_CLASS} onClick={() => setOpen(false)}>
            Join
          </Link>
          <a href="#contact" className={LINK_CLASS} onClick={() => setOpen(false)}>
            Contact Us
          </a>
          <Button to="/signup" variant="secondary">
            Get Started
          </Button>
          <Button to="/signin" variant="primary">
            Log in
          </Button>
        </nav>
      ) : null}
    </header>
  );
}
