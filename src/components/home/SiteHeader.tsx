import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { AgentwiseLogo } from "@/components/home/AgentwiseLogo";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  homeContainerClass,
  homePillButtonClass,
  homePillOutlineButtonClass,
} from "@/lib/home-page-ui";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", to: "/about" },
  { label: "Content", to: "/content" },
  { label: "Blog", to: "/blog" },
  { label: "Pricing", to: "/pricing" },
] as const;

const headerCtaClass =
  "h-9 rounded-full px-3 text-sm lg:h-11 lg:px-8 lg:text-base";

interface SiteHeaderProps {
  className?: string;
}

export function SiteHeader({ className }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

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
          "flex min-h-[72px] flex-wrap items-center justify-between gap-x-2 gap-y-2 px-4 py-2 sm:px-10 lg:h-[72px] lg:flex-nowrap lg:px-[72px] lg:py-0",
        )}
      >
        <AgentwiseLogo className="min-w-0 shrink" />
        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-ui text-[15px] font-medium text-primary/90 transition-colors hover:text-accent focus-visible:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex min-w-0 flex-wrap items-center justify-end gap-1.5 sm:gap-2 lg:gap-3">
          <div className="lg:hidden">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 shrink-0 rounded-full text-primary"
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-primary-nav"
                  onClick={() => setMenuOpen((open) => !open)}
                >
                  {menuOpen ? <X /> : <Menu />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {menuOpen ? "Close menu" : "Menu"}
              </TooltipContent>
            </Tooltip>
          </div>
          <Button
            variant="pillOutline"
            size="sm"
            className={cn("font-ui", headerCtaClass, homePillOutlineButtonClass)}
            asChild
          >
            <a href="#waitlist">Get Started</a>
          </Button>
          <Button
            variant="pill"
            size="sm"
            className={cn("font-ui", headerCtaClass, homePillButtonClass)}
            asChild
          >
            <Link to="/login">Log in</Link>
          </Button>
        </div>
      </div>
      <nav
        id="mobile-primary-nav"
        className={cn(
          homeContainerClass,
          "flex-col gap-1 border-t border-white/10 px-4 py-3 sm:px-10 lg:hidden lg:px-[72px]",
          menuOpen ? "flex" : "hidden",
        )}
        aria-label="Primary"
      >
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="rounded-md px-2 py-2 font-ui text-[15px] font-medium text-primary/90 transition-colors hover:text-accent focus-visible:text-accent"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
