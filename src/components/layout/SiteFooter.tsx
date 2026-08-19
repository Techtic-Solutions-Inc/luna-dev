import { NavLink } from 'react-router-dom';

import BrandLogo from '@/components/brand/BrandLogo';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from '@/lib/icons';

const footerLinks = [
  { to: '/about-us', label: 'About' },
  { to: '/content-list', label: 'Content' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/blogs', label: 'Blog' },
  { to: '/home#contact', label: 'Contact Us' },
] as const;

export default function SiteFooter() {
  return (
    <footer className="bg-color-59 px-5 py-12 tablet:px-10 desktop:px-16">
      <div className="mb-10 flex items-center justify-between">
        <BrandLogo align="start" tone="accent" />
        <div className="flex items-center gap-4 text-secondary">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-accent"
          >
            <FaFacebookF size={16} aria-hidden="true" focusable="false" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="hover:text-accent"
          >
            <FaTwitter size={16} aria-hidden="true" focusable="false" />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-accent"
          >
            <FaLinkedinIn size={16} aria-hidden="true" focusable="false" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-accent"
          >
            <FaInstagram size={16} aria-hidden="true" focusable="false" />
          </a>
        </div>
      </div>
      <div className="mb-8 flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
        <nav className="flex flex-wrap gap-x-8 gap-y-2" aria-label="Footer">
          {footerLinks.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className="font-almarai text-sm text-secondary hover:text-accent"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <a
          href="mailto:hello@agentwisemarketing.com"
          className="font-almarai text-sm text-secondary hover:text-accent"
        >
          hello@agentwisemarketing.com
        </a>
      </div>
      <div className="flex flex-col gap-3 border-t border-color-41 pt-6 tablet:flex-row tablet:items-center tablet:justify-between">
        <p className="font-almarai text-xs text-color-46">© 2026 Agentwise. All Rights Reserved.</p>
        <p className="font-almarai text-xs text-color-46">
          <NavLink to="/terms-of-service" className="hover:text-secondary">
            Terms of Service
          </NavLink>
          <span className="mx-2" aria-hidden="true">
            |
          </span>
          <NavLink to="/privacy-policy" className="hover:text-secondary">
            Privacy Policy
          </NavLink>
        </p>
      </div>
    </footer>
  );
}
