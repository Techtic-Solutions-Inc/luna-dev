import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const footerLinks = ['About', 'Content', 'Pricing', 'Blog', 'Contact Us'];

const socialLinks = [
  { icon: FaFacebookF, label: 'Facebook', href: 'https://facebook.com' },
  { icon: FaXTwitter, label: 'X', href: 'https://x.com' },
  { icon: FaLinkedinIn, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com' },
];

const HomeFooter = () => (
  <footer className="bg-[var(--color-16)] px-6 py-12 lg:px-10">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col items-start justify-between gap-6 border-b border-[var(--color-41)] pb-8 md:flex-row md:items-center">
        <Link to="/home" className="font-garamond text-2xl font-medium text-secondary">
          Agentwise
        </Link>
        <div className="flex gap-3" aria-label="Social media links">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-41)] text-[var(--color-57)] transition-colors hover:border-accent hover:text-accent"
              aria-label={label}
            >
              <Icon size={14} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 py-8 md:flex-row md:items-center">
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-6">
          {footerLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="font-almarai text-sm text-[var(--color-57)] transition-colors hover:text-secondary"
            >
              {item}
            </a>
          ))}
        </nav>
        <a
          href="mailto:hello@agentwisemarketing.com"
          className="font-almarai text-sm text-[var(--color-57)] transition-colors hover:text-accent"
        >
          hello@agentwisemarketing.com
        </a>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 border-t border-[var(--color-41)] pt-8 md:flex-row md:items-center">
        <p className="font-almarai text-xs text-[var(--color-57)]">
          &copy; {new Date().getFullYear()} Agentwise. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            id="terms"
            href="#terms"
            className="font-almarai text-xs text-[var(--color-57)] transition-colors hover:text-secondary"
          >
            Terms of Service
          </a>
          <a
            id="privacy"
            href="#privacy"
            className="font-almarai text-xs text-[var(--color-57)] transition-colors hover:text-secondary"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default HomeFooter;
