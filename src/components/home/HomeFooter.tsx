import type { ReactNode } from 'react';

function SocialFooterIcon({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="text-ink transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:opacity-80"
    >
      {children}
    </a>
  );
}

export function HomeFooter() {
  const footerLinkClass =
    'text-[16px] font-normal leading-[17.856px] text-ink transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:opacity-80';

  return (
    <footer className="bg-[#000001] px-6 py-[40px] md:px-[40px]">
      <div className="mx-auto max-w-[1920px]">
        <div className="flex flex-col items-start justify-between gap-[24px] md:flex-row md:items-center">
          <div>
            <p className="text-[28px] font-medium leading-none text-accent md:text-[32px]">
              Agentwise
            </p>
            <p className="mt-[4px] text-[9px] font-medium uppercase tracking-[0.14em] text-ink/80 md:text-[10px]">
              Real Estate Marketing
            </p>
          </div>

          <div className="flex items-center gap-[16px]">
            <SocialFooterIcon label="Facebook" href="https://facebook.com">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </SocialFooterIcon>
            <SocialFooterIcon label="X" href="https://x.com">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </SocialFooterIcon>
            <SocialFooterIcon label="LinkedIn" href="https://linkedin.com">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.062 2.062 0 114.126 0 2.062 2.062 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </SocialFooterIcon>
            <SocialFooterIcon label="Instagram" href="https://instagram.com">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.849 0-3.204-.013-3.583-.07-4.849-.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </SocialFooterIcon>
          </div>
        </div>

        <div className="mt-[32px] flex flex-col items-start justify-between gap-[16px] md:flex-row md:items-center">
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-[24px]">
            <a href="#about" className={footerLinkClass}>
              About
            </a>
            <a href="#content" className={footerLinkClass}>
              Content
            </a>
            <a href="#pricing" className={footerLinkClass}>
              Pricing
            </a>
            <a href="#blog" className={footerLinkClass}>
              Blog
            </a>
            <a href="#contact" className={footerLinkClass}>
              Contact Us
            </a>
          </nav>
          <a
            href="mailto:hello@agentwisemarketing.com"
            className={`${footerLinkClass} text-ink/80`}
          >
            hello@agentwisemarketing.com
          </a>
        </div>

        <hr className="my-[24px] border-0 border-t border-[#333333]" />

        <div className="flex flex-col items-start justify-between gap-[12px] sm:flex-row sm:items-center">
          <p className="text-[14px] leading-[18px] text-[#554545]">
            &copy; {new Date().getFullYear()} Agentwise. All Rights Reserved.
          </p>
          <nav aria-label="Legal links" className="flex gap-[16px]">
            <a
              href="#terms-of-service"
              className="text-[14px] leading-[18px] text-[#554545] transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Terms of Service
            </a>
            <span className="text-[14px] text-[#554545]" aria-hidden="true">
              |
            </span>
            <a
              href="#privacy-policy"
              className="text-[14px] leading-[18px] text-[#554545] transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Privacy Policy
            </a>
          </nav>
        </div>
      </div>

      <div id="privacy-policy" className="sr-only" aria-hidden="true">
        Privacy Policy
      </div>
      <div id="terms-of-service" className="sr-only" aria-hidden="true">
        Terms of Service
      </div>
    </footer>
  );
}
