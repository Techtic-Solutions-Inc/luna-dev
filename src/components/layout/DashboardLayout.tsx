import { useEffect, useRef, useState, type ReactNode } from "react";
import { BrandMark } from "@/components/layout/BrandMark";
import { AccountInfoHeader } from "@/components/dashboard/AccountInfoHeader";
import { DashboardSidebarNav } from "@/components/dashboard/DashboardSidebarNav";

interface DashboardLayoutProps {
  children: ReactNode;
  name?: string;
  creditsUsed?: number;
  creditsTotal?: number;
}

export function DashboardLayout({ children, name, creditsUsed, creditsTotal }: DashboardLayoutProps) {
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("#overview");
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => setHash(window.location.hash || "#overview");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    const node = drawerRef.current;
    const previously = document.activeElement;
    node?.querySelectorAll<HTMLElement>("a,button,input,[tabindex]:not([tabindex='-1'])")?.[0]?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") {
        return;
      }
      const node = drawerRef.current;
      if (!node) {
        return;
      }
      const focusable = node.querySelectorAll<HTMLElement>("a,button,input,[tabindex]:not([tabindex='-1'])");
      if (focusable.length === 0) {
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (previously instanceof HTMLElement) {
        previously.focus();
      }
    };
  }, [open]);

  const sidebar = (
    <>
      <BrandMark compact align="start" />
      <div className="mt-32 flex min-h-0 flex-1 flex-col">
        <DashboardSidebarNav active={hash} onNavigate={() => setOpen(false)}>
          <AccountInfoHeader name={name} creditsUsed={creditsUsed} creditsTotal={creditsTotal} />
        </DashboardSidebarNav>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-color-16 text-secondary">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="mx-auto flex max-w-canvas">
        <aside className="sticky top-0 hidden h-screen w-sidebar shrink-0 flex-col border-r border-color-129 bg-color-16 px-20 py-24 lg:flex">
          {sidebar}
        </aside>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between px-16 py-16 lg:hidden">
            <BrandMark compact />
            <button
              type="button"
              className="rounded-12 border border-color-129 px-16 py-10 text-almarai-16-20 hover:border-accent"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              Open navigation
            </button>
          </div>
          {open ? (
            <div className="fixed inset-0 z-40 lg:hidden">
              <button
                type="button"
                className="absolute inset-0 bg-color-16/70"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
              />
              <div
                ref={drawerRef}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation"
                className="relative z-10 flex h-full w-[min(100%,260px)] flex-col bg-color-16 px-20 py-24 shadow-elevatedDark"
              >
                {sidebar}
              </div>
            </div>
          ) : null}
          <main id="main" className="dashboard-canvas min-h-screen px-16 pb-40 pt-8 lg:px-24 lg:pt-32">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
