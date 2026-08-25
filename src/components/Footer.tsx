import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { LinkList } from '@/components/LinkList';
import { XIcon } from '@/components/SocialIcons';
import type { NavLinkItem } from '@/types/home';

const DEFAULT_FOOTER_NAV: NavLinkItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Content', href: '/content' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/#contact' },
];

interface FooterProps {
  links?: NavLinkItem[];
}

export function Footer({ links }: FooterProps) {
  const nav = (() => {
    const wanted = ['About', 'Content', 'Pricing', 'Blog', 'Contact Us'];
    const fromApi = wanted
      .map((label) => (links ?? []).find((link) => link.label === label))
      .filter((link): link is NavLinkItem => Boolean(link));
    return fromApi.length === wanted.length ? fromApi : DEFAULT_FOOTER_NAV;
  })();

  const terms = (links ?? []).find((link) => link.label === 'Terms of Service') ?? {
    label: 'Terms of Service',
    href: '/terms',
  };
  const privacy = (links ?? []).find((link) => link.label === 'Privacy Policy') ?? {
    label: 'Privacy Policy',
    href: '/privacy',
  };

  return (
    <footer className="bg-black px-6 pb-10 pt-16 md:px-10 lg:px-16">
      <div className="mx-auto flex max-w-content flex-col gap-12">
        <div className="flex items-start justify-between gap-6">
          <Logo tone="gold" />
          <ul className="flex items-center gap-5 text-white">
            <li>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.6c0-.9.3-1.6 1.6-1.6H17V4.1c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.4H8v3.2h2.6V22h2.9z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://x.com"
                aria-label="X"
                className="transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                target="_blank"
                rel="noreferrer"
              >
                <XIcon />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d="M6.5 9.5H4V20h2.5V9.5zM5.2 4C4.3 4 3.6 4.7 3.6 5.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6S6.1 4 5.2 4zM20 20h-2.5v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V20H11.3V9.5h2.4v1.4h.1c.3-.6 1.2-1.6 2.8-1.6 3 0 3.5 2 3.5 4.5V20z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 1.8H7A2.2 2.2 0 0 0 4.8 7v10A2.2 2.2 0 0 0 7 19.2h10A2.2 2.2 0 0 0 19.2 17V7A2.2 2.2 0 0 0 17 4.8zM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8zm4.6-2.9a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <LinkList links={nav} ariaLabel="Footer" className="gap-8" />
          <a
            href="mailto:hello@agentwisemarketing.com"
            className="font-public-sans text-sm text-white transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            hello@agentwisemarketing.com
          </a>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 text-sm text-color-135 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Agentwise. All Rights Reserved.</p>
            <p className="flex items-center gap-2">
              <Link
                to={terms.href}
                className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {terms.label}
              </Link>
              <span aria-hidden="true">|</span>
              <Link
                to={privacy.href}
                className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {privacy.label}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
