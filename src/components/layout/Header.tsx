import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const navLinks = [
  { to: '/about', label: 'About' },
  { to: '/content', label: 'Content' },
  { to: '/blog', label: 'Blog' },
  { to: '/pricing', label: 'Pricing' },
];

const Header = () => (
  <header className="relative z-10 border-b border-color-129 bg-color-16/80 backdrop-blur-[15px]">
    <div className="mx-auto flex max-w-[1920px] items-center justify-between px-padding-24 py-padding-16 tablet:px-padding-40 desktop:px-padding-60">
      <Link
        to="/"
        className="font-garamond text-[28px] font-normal italic leading-[36.54px] text-secondary transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label="Agentwise home"
      >
        Agentwise
      </Link>

      <nav
        className="hidden items-center gap-gap-32 desktop:flex"
        aria-label="Main navigation"
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              [
                'font-almarai text-base leading-[17.856px] transition-colors',
                isActive
                  ? 'text-accent'
                  : 'text-secondary hover:text-accent focus-visible:text-accent',
              ].join(' ')
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-gap-12">
        <Link
          to="/sign-up"
          className="hidden rounded-radius-10000 border border-secondary px-padding-20 py-padding-10 font-public-sans text-sm font-semibold text-secondary transition-colors hover:bg-color-20 active:bg-color-129 tablet:inline-flex"
        >
          Get Started
        </Link>
        <Link
          to="/sign-in"
          className="inline-flex items-center gap-gap-8 rounded-radius-10000 bg-accent px-padding-20 py-padding-10 font-public-sans text-sm font-semibold text-color-16 transition-[filter] hover:brightness-90 active:brightness-75"
        >
          <FontAwesomeIcon icon={faHouse} aria-hidden="true" className="desktop:hidden" />
          <span>Log In</span>
        </Link>
      </div>
    </div>
  </header>
);

export default Header;
