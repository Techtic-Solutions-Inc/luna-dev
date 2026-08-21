import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';
import Button from '../ui/Button';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Content', href: '#content' },
  { label: 'Blog', href: '#blog' },
  { label: 'Pricing', href: '#pricing' },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleMobileClose = () => {
    closeMobile();
    hamburgerRef.current?.focus();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-color-23/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-padding-16 py-padding-16 tablet:px-padding-40 tablet:py-padding-20">
        <Link
          to="/"
          className="font-garamond text-heading-lg-26 text-secondary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
          aria-label="Agentwise home"
        >
          Agentwise
        </Link>

        <nav
          className="hidden desktop:flex items-center gap-gap-40"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-almarai text-body-77 text-secondary hover:text-accent active:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden desktop:flex items-center gap-gap-16">
          <Link to="/signup">
            <Button variant="outline" size="sm" aria-label="Get started with Agentwise">
              Get Started
            </Button>
          </Link>
          <Link to="/signin">
            <Button variant="primary" size="sm" aria-label="Log in to your account">
              Log in
            </Button>
          </Link>
        </div>

        <button
          ref={hamburgerRef}
          type="button"
          className="desktop:hidden flex items-center justify-center w-10 h-10 text-secondary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-radius-8 transition-colors"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => {
            if (mobileOpen) {
              handleMobileClose();
            } else {
              setMobileOpen(true);
            }
          }}
        >
          {mobileOpen ? <FaXmark size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="desktop:hidden border-t border-color-20 bg-color-23 px-padding-16 py-padding-24"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              handleMobileClose();
            }
          }}
        >
          <div className="flex justify-end mb-gap-16">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleMobileClose}
              className="flex items-center justify-center w-10 h-10 text-secondary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-radius-8 transition-colors"
              aria-label="Close menu"
            >
              <FaXmark size={20} />
            </button>
          </div>
          <ul className="flex flex-col gap-gap-16">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={handleMobileClose}
                  className="block font-almarai text-body-34 text-secondary hover:text-accent py-padding-8 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-padding-8 border-t border-color-20">
              <Link
                to="/signup"
                onClick={handleMobileClose}
                className="block font-almarai text-body-34 text-secondary hover:text-accent py-padding-8 transition-colors"
              >
                Get Started
              </Link>
            </li>
            <li>
              <Link to="/signin" onClick={handleMobileClose}>
                <Button variant="primary" size="md" fullWidth aria-label="Log in">
                  Log in
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
