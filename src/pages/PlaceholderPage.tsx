import { Link, useLocation } from "react-router-dom";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";

const titles: Record<string, string> = {
  "/login": "Log in",
  "/about": "About",
  "/content": "Content",
  "/blog": "Blog",
  "/pricing": "Pricing",
  "/contact": "Contact Us",
  "/privacy-policy": "Privacy Policy",
  "/terms-of-service": "Terms of Service",
};

export function PlaceholderPage() {
  const { pathname } = useLocation();
  const title = titles[pathname] ?? "Page";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-cta-pill focus:px-4 focus:py-2 focus:text-text-on-light"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main
        id="main"
        className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center"
      >
        <Heading as="h1" variant="sectionDark">
          {title}
        </Heading>
        <p className="mt-4 max-w-md text-muted-alt">
          This page is not part of the home marketing ticket. Return to the
          Agentwise home page to explore the platform.
        </p>
        <Button variant="pill" size="lg" className="mt-8" asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </main>
      <SiteFooter />
    </div>
  );
}
