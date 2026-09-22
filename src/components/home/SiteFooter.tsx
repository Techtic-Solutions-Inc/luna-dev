import { Link } from "react-router-dom";
import { AgentwiseLogo } from "@/components/home/AgentwiseLogo";
import { FooterSocialIcons } from "@/components/home/SocialIcons";
import { Separator } from "@/components/ui/separator";
import { homeContainerClass, homeSectionXClass } from "@/lib/home-page-ui";
import { cn } from "@/lib/utils";

const footerNav = [
  { label: "About", to: "/about" },
  { label: "Content", to: "/content" },
  { label: "Pricing", to: "/pricing" },
  { label: "Blog", to: "/blog" },
  { label: "Contact Us", to: "/contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className={cn("bg-background pb-8 pt-12", homeSectionXClass)}>
      <div className={homeContainerClass}>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <AgentwiseLogo variant="footer" />
          <FooterSocialIcons />
        </div>
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-6" aria-label="Footer">
            {footerNav.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-ui text-sm text-primary transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            href="mailto:hello@agentwisemarketing.com"
            className="font-ui text-sm text-primary transition-opacity hover:opacity-70"
          >
            hello@agentwisemarketing.com
          </a>
        </div>
        <Separator className="my-8 bg-white/10" />
        <div className="flex flex-col gap-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Agentwise. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link
              to="/terms-of-service"
              className="transition-opacity hover:opacity-70"
            >
              Terms of Service
            </Link>
            <span aria-hidden>|</span>
            <Link
              to="/privacy-policy"
              className="transition-opacity hover:opacity-70"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
