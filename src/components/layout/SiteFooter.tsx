import { BrandMark } from "@/components/layout/BrandMark";
import { FooterSocialIcons } from "@/components/home/SocialBrandIcons";

interface SiteFooterProps {
  contactEmail?: string;
  privacyHref?: string;
  termsHref?: string;
}

const linkClass =
  "text-secondary transition hover:text-accent focus-visible:text-accent active:opacity-80";

export function SiteFooter({
  contactEmail = "hello@agentwisemarketing.com",
  privacyHref = "#privacy-policy",
  termsHref = "#terms-of-service",
}: SiteFooterProps) {
  return (
    <footer className="bg-color-101 px-20 py-48 lg:px-60">
      <div className="mx-auto flex max-w-[1920px] flex-col gap-32">
        <div className="flex flex-col items-start justify-between gap-24 md:flex-row md:items-center">
          <BrandMark compact align="start" tone="accent" />
          <FooterSocialIcons />
        </div>
        <div className="flex flex-col justify-between gap-16 text-almarai-16-20 md:flex-row md:items-center">
          <nav className="flex flex-wrap gap-20" aria-label="Footer">
            <a href="#about" className={linkClass}>
              About
            </a>
            <a href="#content" className={linkClass}>
              Content
            </a>
            <a href="#pricing" className={linkClass}>
              Pricing
            </a>
            <a href="#blog" className={linkClass}>
              Blog
            </a>
            <a href="#contact" className={linkClass}>
              Contact Us
            </a>
          </nav>
          <a href={`mailto:${contactEmail}`} className={linkClass}>
            {contactEmail}
          </a>
        </div>
        <div className="flex flex-col justify-between gap-12 border-t border-color-129 pt-20 text-almarai-14 text-color-135 md:flex-row">
          <p>© 2026 Agentwise. All Rights Reserved.</p>
          <p>
            <a id="terms-of-service" href={termsHref} className="transition hover:text-accent focus-visible:text-accent">
              Terms of Service
            </a>
            <span aria-hidden="true"> | </span>
            <a id="privacy-policy" href={privacyHref} className="transition hover:text-accent focus-visible:text-accent">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
