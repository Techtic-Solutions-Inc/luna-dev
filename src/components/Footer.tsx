import { Link } from 'react-router-dom';
import type { HomeLink } from '../types/home';
import { Logo } from './Logo';

interface FooterProps {
  links: HomeLink[];
}

const FOOTER_NAV_LABELS = ['About', 'Content', 'Pricing', 'Blog', 'Contact Us'] as const;

const SOCIAL = [
  { label: 'Facebook', href: 'https://facebook.com', d: 'M15 8h-2.5C11.67 8 11 8.67 11 9.5V11H9v3h2v7h3v-7h2.2l.8-3H14V9.7c0-.4.3-.7.7-.7H17V6h-2z' },
  { label: 'X', href: 'https://x.com', d: 'M17.6 4H20l-6.16 7.04L21 20h-5.36l-4.2-5.48L6.6 20H4.16l6.6-7.52L3 4h5.48l3.8 5.04zm-.96 14.4h1.32L7.44 5.52H6.04z' },
  { label: 'Instagram', href: 'https://instagram.com', d: 'M12 7.2A4.8 4.8 0 1 0 16.8 12 4.81 4.81 0 0 0 12 7.2zm0 7.92A3.12 3.12 0 1 1 15.12 12 3.12 3.12 0 0 1 12 15.12zM17.84 6.96a1.12 1.12 0 1 1-1.12-1.12 1.12 1.12 0 0 1 1.12 1.12zM21 7.2a6.24 6.24 0 0 0-1.7-4.42A6.3 6.3 0 0 0 14.88 1H9.12A6.3 6.3 0 0 0 4.7 2.78 6.24 6.24 0 0 0 3 7.2v5.76a6.24 6.24 0 0 0 1.7 4.42A6.3 6.3 0 0 0 9.12 23h5.76a6.3 6.3 0 0 0 4.42-1.62A6.24 6.24 0 0 0 21 16.8z' },
  { label: 'TikTok', href: 'https://tiktok.com', d: 'M16.5 6.2a4.7 4.7 0 0 0 2.9 1V9.4a6.7 6.7 0 0 1-2.9-.72v5.5a5.18 5.18 0 1 1-5.18-5.18c.14 0 .28 0 .42.02v2.1a3.1 3.1 0 1 0 2.16 2.96V4h2.6c0 .76.28 1.5.78 2.08z' },
] as const;

export function Footer({ links }: FooterProps) {
  const legalLabels = ['Terms of Service', 'Privacy Policy'];
  const legalLinks = links.filter((link) => legalLabels.includes(link.label));
  const navLinks = FOOTER_NAV_LABELS.flatMap((label) => {
    const match = links.find((link) => link.label === label);
    return match ? [match] : [];
  });

  return (
    <footer className="bg-color-101 px-5 py-12 md:px-12">
      <div className="mx-auto max-w-wide">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <Logo accent />
          <ul className="flex items-center gap-gap-16" aria-label="Social media">
            {SOCIAL.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="text-color-134 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                    <path d={item.d} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center gap-x-gap-20 gap-y-gap-12">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-link font-almarai text-almarai-16 text-color-134 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href="mailto:hello@agentwisemarketing.com"
            className="text-link font-almarai text-almarai-16"
          >
            hello@agentwisemarketing.com
          </a>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-almarai text-almarai-14 text-color-134">
            © 2024 Agentwise. All Rights Reserved.
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-2 font-almarai text-almarai-14 text-color-134">
            {legalLinks.length > 0 ? (
              legalLinks.map((link, index) => (
                <span key={link.href} className="inline-flex items-center gap-3">
                  {index > 0 ? <span aria-hidden="true">|</span> : null}
                  <Link to={link.href} className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                    {link.label}
                  </Link>
                </span>
              ))
            ) : (
              <>
                <Link to="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
                <span aria-hidden="true">|</span>
                <Link to="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
