import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BrandMark } from "@/components/layout/BrandMark";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#content", label: "Content" },
  { href: "/#blog", label: "Blog" },
  { href: "/#pricing", label: "Pricing" },
];

const navLinkClass =
  "text-almarai-16-20 text-secondary transition hover:text-accent focus-visible:text-accent active:opacity-80";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="relative z-20 mx-auto flex max-w-[1920px] items-center justify-between gap-16 px-20 py-20 lg:px-60">
      <BrandMark compact align="start" />
      <nav className="hidden items-center gap-32 md:flex" aria-label="Primary">
        {links.map((link) => (
          <a key={link.href} href={link.href} className={navLinkClass}>
            {link.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-12">
        <button
          type="button"
          className="inline-flex h-44 items-center rounded-1000 border border-secondary px-16 text-almarai-16-bold text-secondary transition hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent active:opacity-80 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          Open navigation
        </button>
        <NavLink
          to="/sign-up"
          className="hidden h-44 items-center rounded-1000 border border-secondary px-20 text-almarai-16-bold text-secondary transition hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent active:bg-secondary/10 sm:inline-flex"
        >
          Get Started
        </NavLink>
        <NavLink
          to="/sign-in"
          className="inline-flex h-44 items-center rounded-1000 bg-accent px-20 text-almarai-16-bold text-color-101 transition hover:bg-color-102 focus-visible:ring-2 focus-visible:ring-accent active:brightness-90"
        >
          Log In
        </NavLink>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="absolute inset-x-20 top-full z-30 flex flex-col gap-16 rounded-24 border border-color-129 bg-color-16 p-20 shadow-elevatedDark md:hidden"
          aria-label="Mobile"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
