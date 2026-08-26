import { Link } from 'react-router-dom';
import { BrandMark } from './BrandMark';
import { readString } from '../../lib/api/home';

interface HomeFooterProps {
  data: unknown;
}

const FOOTER_NAV = [
  { label: 'About', to: '#about' },
  { label: 'Content', to: '/content' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact Us', to: '#contact' },
];

const LINK_CLASS =
  'type-body-115 text-ink no-underline hover:text-accent focus-visible:text-accent active:opacity-80';

export function HomeFooter({ data }: HomeFooterProps) {
  const email = readString(data, 'contact_email') ?? 'hello@agentwisemarketing.com';
  const privacy = readString(data, 'privacy_policy_link') ?? '/privacy-policy';
  const terms = readString(data, 'terms_of_service_link') ?? '/terms-of-service';

  return (
    <footer className="bg-color-101 px-[20px] py-[40px] md:px-[40px] lg:px-[80px]" aria-label="Footer">
      <div className="mx-auto flex max-w-[1760px] flex-col gap-[32px]">
        <div className="flex flex-col gap-[16px] sm:flex-row sm:items-center sm:justify-between">
          <BrandMark gold />
          <ul className="flex items-center gap-[16px]" aria-label="Social">
            {['Facebook', 'X', 'LinkedIn', 'Instagram'].map((name) => (
              <li key={name}>
                <a
                  className="font-public text-[14px] font-semibold text-ink no-underline hover:text-accent focus-visible:text-accent"
                  href={`https://${name === 'X' ? 'x.com' : `${name.toLowerCase()}.com`}`}
                  aria-label={name}
                  target="_blank"
                  rel="noreferrer"
                >
                  {name === 'Facebook' ? 'f' : name === 'LinkedIn' ? 'in' : name === 'X' ? 'X' : 'IG'}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-[16px] md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap gap-[20px]" aria-label="Footer navigation">
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
          <p className="font-fellix text-[12px] leading-[16px] text-muted">
            © 2026 Agentwise. All Rights Reserved.
          </p>
          <p className="font-fellix text-[12px] leading-[16px] text-muted">
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
