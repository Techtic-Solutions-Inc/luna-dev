import type { ReactNode } from "react";
import { BrandMark } from "@/components/layout/BrandMark";

interface AuthLayoutProps {
  children: ReactNode;
  collageSrc: string;
  collageAlt: string;
  brandPlacement?: "panel-start" | "form-center";
  columns?: "signup" | "signin";
}

export function AuthLayout({
  children,
  collageSrc,
  collageAlt,
  brandPlacement = "panel-start",
  columns = "signup",
}: AuthLayoutProps) {
  const grid =
    columns === "signin"
      ? "lg:grid-cols-2"
      : "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]";

  return (
    <div className={`grid min-h-screen bg-color-103 ${grid}`}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <section className="signup-glow relative flex min-h-screen flex-col px-24 py-32 sm:px-40 lg:px-48 lg:py-32">
        {brandPlacement === "panel-start" ? <BrandMark align="start" /> : null}
        <div id="main" className="mx-auto flex w-full max-w-[461px] flex-1 flex-col justify-center py-32">
          {brandPlacement === "form-center" ? (
            <div className="mb-32 flex justify-center">
              <BrandMark align="center" />
            </div>
          ) : null}
          {children}
        </div>
      </section>
      <aside className="relative hidden min-h-screen overflow-hidden bg-color-16 lg:block">
        <img
          src={collageSrc}
          alt={collageAlt}
          className="absolute inset-0 h-full w-full max-w-none object-cover object-right"
        />
      </aside>
    </div>
  );
}
