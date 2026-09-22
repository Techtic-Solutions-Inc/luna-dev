import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AgentwiseLogo } from "@/components/home/AgentwiseLogo";
import {
  homeContainerClass,
  homePillButtonClass,
  homePillOutlineButtonClass,
  homeSectionXClass,
} from "@/lib/home-page-ui";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", to: "/about" },
  { label: "Content", to: "/content" },
  { label: "Blog", to: "/blog" },
  { label: "Pricing", to: "/pricing" },
] as const;

interface SiteHeaderProps {
  className?: string;
}

export function SiteHeader({ className }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-white/5 bg-background/90 backdrop-blur-md",
        className,
      )}
    >
      <div
        className={cn(
          homeContainerClass,
          homeSectionXClass,
          "flex h-[72px] items-center justify-between gap-4",
        )}
      >
        <AgentwiseLogo />
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-ui text-[15px] font-medium text-primary/90 transition-colors hover:text-border focus-visible:text-border"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="pillOutline"
            size="lg"
            className={cn("font-ui", homePillOutlineButtonClass)}
            asChild
          >
            <a href="#waitlist">Get Started</a>
          </Button>
          <Button
            variant="pill"
            size="lg"
            className={cn("font-ui", homePillButtonClass)}
            asChild
          >
            <Link to="/login">Log in</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
