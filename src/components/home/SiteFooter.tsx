import { Link } from 'react-router-dom';
import { BrandLogo } from '@/components/home/BrandLogo';
import { readString } from '@/types/api';

const FOOTER_NAV = [
  { label: 'About', to: '#about' },
  { label: 'Content', to: '/content' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact Us', to: '/contact' },
] as const;

const LINK_CLASS =
  'type-body-115 text-ink no-underline hover:text-accent focus-visible:text-accent active:opacity-80';

const SOCIAL = [
  { label: 'Facebook', href: 'https://www.facebook.com', short: 'f' },
  { label: 'X', href: 'https://x.com', short: 'X' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com', short: 'in' },
  { label: 'Instagram', href: 'https://www.instagram.com', short: 'IG' },
] as const;

interface SiteFooterProps {
  data: unknown;
}

export function SiteFooter({ data }: SiteFooterProps) {
  const email = readString(data, 'contact_email') ?? 'hello@agentwisemarketing.com';
  const privacy = readString(data, 'privacy_policy_link') ?? '/privacy-policy';
  const terms = readString(data, 'terms_of_service_link') ?? '/terms-of-service';

  return (
    <footer className="bg-color-103 px-[20px] py-[30px] md:px-[30px] lg:px-[101px]" aria-label="Footer">
      <div className="mx-auto flex max-w-[1760px] flex-col gap-[24px]">
        <div className="flex flex-col gap-[16px] sm:flex-row sm:items-center sm:justify-between">
          <BrandLogo gold />
          <ul className="flex items-center gap-[16px]" aria-label="Social">
            {SOCIAL.map((item) => (
              <li key={item.label}>
                <a
                  className="font-public text-[14px] font-semibold text-ink no-underline hover:text-accent focus-visible:text-accent"
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.short}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-[16px] md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap gap-[30px]" aria-label="Footer navigation">
            {FOOTER_NAV.map((item) =>
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
          <a href={`mailto:${email}`} className={LINK_CLASS}>
            {email}
          </a>
        </div>
        <div className="flex flex-col gap-[12px] border-t border-line pt-[20px] sm:flex-row sm:items-center sm:justify-between">
          <p className="type-body-29 font-fellix text-muted">© 2026 Agentwise. All Rights Reserved.</p>
          <p className="type-body-29 font-fellix text-muted">
            <Link to={terms} className="text-muted no-underline hover:text-accent">
              Terms of Service
            </Link>
            {' | '}
            <Link to={privacy} className="text-muted no-underline hover:text-accent">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
