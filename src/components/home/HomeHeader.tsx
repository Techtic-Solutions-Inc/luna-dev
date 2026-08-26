import { Link } from 'react-router-dom';

const navLinkClass =
  'text-[16px] font-normal leading-[17.856px] text-ink transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:opacity-80';

export function HomeHeader() {
  return (
    <header className="relative z-50">
      <div className="mx-auto flex max-w-[1920px] items-center justify-between px-6 py-[20px] md:px-[40px]">
        <Link
          to="/"
          className="flex flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span
            className="text-[28px] leading-none text-ink md:text-[32px]"
            style={{ fontFamily: 'Kalam, cursive' }}
          >
            Agentwise
          </span>
          <span
            className="mt-[4px] text-[9px] font-medium uppercase tracking-[0.14em] text-ink/80 md:text-[10px]"
            style={{ fontFamily: 'Public Sans, sans-serif' }}
          >
            Real Estate Marketing
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[30px] lg:flex"
        >
          <a href="#about" className={navLinkClass}>
            About
          </a>
          <a href="#content" className={navLinkClass}>
            Content
          </a>
          <a href="#blog" className={navLinkClass}>
            Blog
          </a>
          <a href="#pricing" className={navLinkClass}>
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-[12px]">
          <Link
            to="/signup"
            className="hidden h-[44px] items-center rounded-[100px] border border-ink px-[20px] text-[16px] font-semibold leading-6 text-ink transition-all hover:bg-ink/10 active:bg-ink/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:inline-flex"
          >
            Get Started
          </Link>
          <Link
            to="/signin"
            className="inline-flex h-[44px] items-center rounded-[100px] bg-accent px-[20px] text-[16px] font-semibold leading-6 text-[#000001] transition-all hover:brightness-90 active:brightness-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Log in
          </Link>
        </div>
      </div>
    </header>
  );
}
