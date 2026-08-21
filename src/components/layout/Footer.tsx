import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Content', href: '#content' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact Us', href: '#contact' },
];

const socialLinks = [
  { icon: FaFacebookF, label: 'Facebook', href: 'https://facebook.com' },
  { icon: FaXTwitter, label: 'X (Twitter)', href: 'https://x.com' },
  { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: FaLinkedinIn, label: 'LinkedIn', href: 'https://linkedin.com' },
];

const Footer = () => (
  <footer className="bg-color-16 text-color-14" aria-label="Site footer">
    <div className="mx-auto max-w-[1440px] px-padding-16 py-padding-40 tablet:px-padding-40">
      <div className="flex flex-col gap-gap-32 tablet:flex-row tablet:items-center tablet:justify-between">
        <Link
          to="/"
          className="font-garamond text-heading-lg-26 text-secondary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
          aria-label="Agentwise home"
        >
          Agentwise
        </Link>

        <div className="flex items-center gap-gap-16">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-color-20 text-color-14 hover:text-accent hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-gap-32 flex flex-col gap-gap-16 tablet:flex-row tablet:items-center tablet:justify-between border-t border-color-20 pt-gap-32">
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-gap-24">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-almarai text-body-sm-106 text-color-14 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href="mailto:hello@agentwisemarketing.com"
          className="font-almarai text-body-sm-106 text-color-14 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
        >
          hello@agentwisemarketing.com
        </a>
      </div>

      <div className="mt-gap-24 flex flex-col gap-gap-8 tablet:flex-row tablet:items-center tablet:justify-between border-t border-color-20 pt-gap-24">
        <p className="font-almarai text-caption-49 text-color-14">
          © 2024 Agentwise. All rights Reserved.
        </p>
        <div className="flex gap-gap-24">
          <a
            href="#terms"
            className="font-almarai text-caption-49 text-color-14 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#privacy"
            className="font-almarai text-caption-49 text-color-14 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
