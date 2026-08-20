import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const footerLinks = [
  { to: '/about', label: 'About' },
  { to: '/content', label: 'Content' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact Us' },
] as const;

const socialLinks = [
  { href: 'https://facebook.com', label: 'Facebook', icon: FaFacebookF },
  { href: 'https://x.com', label: 'X', icon: FaXTwitter },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: FaLinkedinIn },
  { href: 'https://instagram.com', label: 'Instagram', icon: FaInstagram },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-black px-20 py-40">
      <div className="mx-auto w-full max-w-[1164px]">
        <div className="flex flex-col gap-24 desktop:flex-row desktop:items-center desktop:justify-between">
          <Link to="/" className="type-heading-lg-108 text-white" aria-label="Agentwise home">
            Agentwise
          </Link>

          <div className="flex gap-16">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-32 w-32 items-center justify-center rounded-full border border-color-41 text-white/70 transition-colors duration-200 hover:border-white hover:text-white"
              >
                <social.icon aria-hidden="true" size={14} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-32 flex flex-col gap-16 border-t border-color-41 pt-32 desktop:flex-row desktop:items-center desktop:justify-between">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-16">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="type-caption-58 text-white/60 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="mailto:hello@agentwisemarketing.com"
            className="type-caption-58 text-white/60 transition-colors duration-200 hover:text-white"
          >
            hello@agentwisemarketing.com
          </a>
        </div>

        <div className="mt-24 flex flex-col gap-12 desktop:flex-row desktop:items-center desktop:justify-between">
          <p className="type-caption-58 text-white/40">
            &copy; {new Date().getFullYear()} Agentwise. All rights reserved.
          </p>

          <div className="flex gap-16">
            <Link
              to="/terms"
              className="type-caption-58 text-white/40 transition-colors duration-200 hover:text-white"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="type-caption-58 text-white/40 transition-colors duration-200 hover:text-white"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
