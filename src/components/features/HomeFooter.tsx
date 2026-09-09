import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'About', to: '/home#about' },
  { label: 'Content', to: '/home#content' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact Us', to: '/contact' },
];

export function HomeFooter() {
  return (
    <footer className="home-page__shell-footer border-t px-[32px] py-[40px]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[24px]">
        <div className="flex flex-col items-start justify-between gap-[16px] sm:flex-row sm:items-center">
          <Link
            to="/home"
            className="font-garamond text-[24px] font-medium leading-[31px] [color:var(--token-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:[ring-color:var(--token-border)]"
          >
            Agentwise
          </Link>
          <nav className="flex flex-wrap gap-[24px]" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="font-almarai text-[14px] font-normal leading-[15.624px] [color:var(--token-background)] transition-colors hover:[color:var(--token-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:[ring-color:var(--token-border)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col items-start justify-between gap-[12px] border-t border-[color:var(--token-background)]/30 pt-[24px] sm:flex-row sm:items-center">
          <p className="font-almarai text-[12px] leading-[13.392px] [color:var(--token-background)]">
            © {new Date().getFullYear()} Agentwise. All Rights Reserved.
          </p>
          <div className="flex flex-wrap gap-[16px]">
            <Link
              to="/terms"
              className="font-almarai text-[12px] [color:var(--token-background)] hover:[color:var(--token-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:[ring-color:var(--token-border)]"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="font-almarai text-[12px] [color:var(--token-background)] hover:[color:var(--token-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:[ring-color:var(--token-border)]"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
