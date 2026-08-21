import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { StaticImage } from '../ui/StaticImage';

const FOOTER_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Content', to: '/content' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact Us', to: '/#contact' },
] as const;

const SOCIALS = [
  { label: 'Facebook', href: 'https://facebook.com', icon: FaFacebookF },
  { label: 'X', href: 'https://x.com', icon: FaXTwitter },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: FaLinkedinIn },
  { label: 'Instagram', href: 'https://instagram.com', icon: FaInstagram },
] as const;

export function Footer() {
  return (
    <footer className="bg-black px-5 pb-10 pt-12 text-white md:px-10 lg:px-[100px] xl:px-[120px]">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Link to="/" aria-label="Agentwise home">
            <StaticImage
              src="/assets/figma/logo-gold.png"
              alt="Agentwise Real Estate Marketing"
              className="h-14 w-auto object-contain object-left"
              width={240}
              height={56}
            />
          </Link>
          <ul className="flex items-center gap-5" aria-label="Social media">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center text-white transition-opacity hover:opacity-70"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[15px]">
              {FOOTER_LINKS.map((item) => (
                <li key={item.label}>
                  {item.to.startsWith('/#') ? (
                    <a href={item.to} className="hover:text-gold">
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.to} className="hover:text-gold">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <a
            href="mailto:hello@agentwisemarketing.com"
            className="text-[15px] hover:text-gold"
          >
            hello@agentwisemarketing.com
          </a>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Agentwise. All Rights Reserved.</p>
          <p>
            <Link to="/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <span aria-hidden="true"> | </span>
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
