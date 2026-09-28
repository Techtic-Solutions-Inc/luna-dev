import { useEffect } from "react";
import { FigmaScreenPage } from "./components/luna-figma/FigmaScreenPage";
import { LunaFigmaApiBridge } from "./components/luna-figma/LunaFigmaApiBridge";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { HomeErrorState } from "@/components/home/HomeErrorState";
import { AboutUsPage } from "@/pages/AboutUsPage";
import { PlaceholderPage } from "@/pages/PlaceholderPage";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { useVisitorHome } from "@/hooks/useVisitorHome";
import { unwrapEnvelopeData } from "@/lib/envelope";
import type { VisitorHomeMarketingData } from "@/types/visitor-home";

function ensureFigmaAnchor(nodeId: string, href: string): void {
  const el = document.querySelector(`[data-figma-node="${nodeId}"]`);
  if (!el) {
    return;
  }
  if (el instanceof HTMLAnchorElement) {
    el.href = href;
    return;
  }
  const anchor = document.createElement("a");
  anchor.setAttribute("data-figma-node", nodeId);
  anchor.href = href;
  anchor.className = el.className;
  const inlineStyle = el.getAttribute("style");
  if (inlineStyle) {
    anchor.setAttribute("style", inlineStyle);
  }
  anchor.textContent = el.textContent ?? "";
  el.replaceWith(anchor);
}

function applyHomeLegalLinks(apiData: VisitorHomeMarketingData): void {
  const terms =
    apiData.terms_of_service_link?.trim() || "/terms-of-service";
  const privacy = apiData.privacy_policy_link?.trim() || "/privacy-policy";
  ensureFigmaAnchor("2270:16915", terms);
  ensureFigmaAnchor("2270:16917", privacy);
}

function FigmaHomeRoute() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useVisitorHome();
  const apiData = unwrapEnvelopeData<VisitorHomeMarketingData>(data);
  const isEmpty =
    !isLoading && !isError && data !== undefined && apiData === undefined;

  useEffect(() => {
    if (!apiData) {
      return;
    }
    applyHomeLegalLinks(apiData);
    const timer = window.setTimeout(() => {
      applyHomeLegalLinks(apiData);
    }, 0);
    return () => {
      window.clearTimeout(timer);
    };
  }, [apiData]);

  return (
    <>
      <LunaFigmaApiBridge screen="home" />
      {isLoading ? (
        <div
          className="fixed left-1/2 top-4 z-[100] -translate-x-1/2 rounded-full bg-black/80 px-6 py-2"
          role="status"
          aria-live="polite"
        >
          <p className="font-almarai text-sm text-white">
            Loading home content…
          </p>
        </div>
      ) : null}
      {isError ? (
        <HomeErrorState
          error={error}
          onRetry={() => {
            void refetch();
          }}
          isRetrying={isFetching}
        />
      ) : null}
      {isEmpty ? (
        <div
          className="fixed left-4 right-4 top-4 z-[100] mx-auto max-w-lg rounded-lg border border-white/20 bg-panel-dark p-6 text-center shadow-lg sm:left-auto sm:right-6"
          role="status"
          aria-live="polite"
        >
          <Heading as="h1" variant="sectionDark" className="mb-3 text-xl">
            Home content unavailable
          </Heading>
          <p className="mb-4 font-ui text-[16px] leading-[26px] text-muted-alt">
            We could not load marketing content from the server.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              type="button"
              variant="pill"
              onClick={() => {
                void refetch();
              }}
              disabled={isFetching}
              aria-busy={isFetching}
            >
              {isFetching ? "Retrying…" : "Retry"}
            </Button>
            <Button asChild variant="pillOutline">
              <Link to="/about">About us</Link>
            </Button>
          </div>
        </div>
      ) : null}
      <FigmaScreenPage />
    </>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<FigmaHomeRoute />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/login" element={<PlaceholderPage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/content" element={<PlaceholderPage />} />
      <Route path="/blog" element={<PlaceholderPage />} />
      <Route path="/pricing" element={<PlaceholderPage />} />
      <Route path="/contact" element={<PlaceholderPage />} />
      <Route path="/privacy-policy" element={<PlaceholderPage />} />
      <Route path="/terms-of-service" element={<PlaceholderPage />} />
    </Routes>
  );
}
