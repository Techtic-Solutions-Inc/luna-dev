/**
 * Luna generated page
 * Page: FigmaScreenPage
 * Ownership: Figma-owned layout
 * Behavior: useFigmaScreenData / figmaFieldContract
 * luna-spec-codegen: owned-layout
 */
import { useState, useEffect, type ReactElement } from "react";
import { FigmaScreenDataProvider } from "./useFigmaScreenData";
import { SignInPage } from "./SignInPage";
import { ProfilePage } from "./ProfilePage";
import { HomePage } from "./HomePage";

const routes: Record<string, () => ReactElement> = {
  "": HomePage,
  "home": HomePage,
  "login": SignInPage,
  "sign-in": SignInPage,
  "user-profile": ProfilePage,
  "profile": ProfilePage,
};

// Project pages linked from this design whose screens are not built yet.
const PENDING_ROUTES: ReadonlySet<string> = new Set(["about-us", "admin-fe-activity-logging-dashboard", "admin-fe-ai-permissions-management", "admin-fe-content-management-interface", "admin-fe-revenue-dashboard", "announcement", "announcements", "blog", "blog-details", "caching-layer", "common-error-handling-and-exception-classes", "content-calendar", "content-generated", "content-library", "content-library-interface", "content-list", "dashboard", "downloads", "email-notification-service-abstraction", "email-verification", "file-upload-storage-service", "forgot-password", "new-blog-details", "new-content-library", "plan-change", "pricing", "sign-up", "subscription", "their-account-management", "ultimate-mind-dashboard", "updated-dashboard"]);

function FigmaRouteNotFound({ path }: { path: string }) {
  const pending = PENDING_ROUTES.has(path);
  return (
    <main
      role="alert"
      data-figma-route-error={pending ? "pending" : "not_found"}
      data-figma-route={path}
      className="flex min-h-screen items-center justify-center p-6 text-center"
    >
      <p>
        {pending
          ? `/${path} is a page that has not been built yet.`
          : `No page exists at /${path}.`}
      </p>
    </main>
  );
}

/**
 * Reactive client-side router.
 *
 * When `routePath` is provided (e.g. from a Next.js wrapper that uses
 * `usePathname()`), the component is fully SSR-safe and uses the
 * supplied path without touching `window`.
 *
 * Without `routePath` (Vite / standalone): listens to popstate so that
 * `history.pushState()` calls from generated navigation anchors update
 * the rendered screen without a full reload.
 */
export function FigmaScreenPage({ routePath }: { routePath?: string } = {}) {
  const [clientPath, setClientPath] = useState<string | null>(null);
  useEffect(() => {
    if (routePath !== undefined) return;
    setClientPath(window.location.pathname.replace(/^\/+|\/+$/g, ""));
    const handler = () =>
      setClientPath(window.location.pathname.replace(/^\/+|\/+$/g, ""));
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, [routePath]);
  const path = routePath ?? clientPath ?? "";
  const Screen = routes[path];
  if (!Screen) {
    return <FigmaRouteNotFound path={path} />;
  }
  return (
    <FigmaScreenDataProvider routePath={path}>
      <Screen />
    </FigmaScreenDataProvider>
  );
}
