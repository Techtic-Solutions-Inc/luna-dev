import { Link } from "react-router-dom";
import { HomeErrorState } from "@/components/home/HomeErrorState";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import {
  FigmaAboutFrame,
} from "@/components/luna-figma/FigmaAboutScreenPage";
import { LunaFigmaApiBridge } from "@/components/luna-figma/LunaFigmaApiBridge";
import "@/components/luna-figma/figma-fonts.css";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { useAboutUs } from "@/hooks/useAboutUs";
import { unwrapEnvelopeData } from "@/lib/envelope";
import { homePillButtonClass } from "@/lib/home-page-ui";
import type { AboutUsData } from "@/types/about-us";
import { cn } from "@/lib/utils";

export function AboutUsPage() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useAboutUs();
  const apiData = unwrapEnvelopeData<AboutUsData>(data);
  const isEmpty =
    !isLoading && !isError && data !== undefined && apiData === undefined;

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-panel-dark">
        <SiteHeader />
        <div
          className="flex flex-1 items-center justify-center p-8"
          role="status"
          aria-live="polite"
        >
          <p className="font-ui text-primary/60">Loading About Us content…</p>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-panel-dark">
      <LunaFigmaApiBridge screen="about" />
      <a
        href="#main"
        className={cn(
          "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:px-4 focus:py-2",
          homePillButtonClass,
        )}
      >
        Skip to main content
      </a>
      {isError ? (
        <HomeErrorState
          error={error}
          onRetry={() => {
            void refetch();
          }}
          isRetrying={isFetching}
        />
      ) : null}
      <SiteHeader />
      <main
        id="main"
        className="relative flex w-full flex-col flex-1 [&_[data-figma-node='3527\\:5463']]:hidden [&_[data-figma-node='643\\:3168']]:hidden"
      >
        {isEmpty ? (
          <div
            className="mx-auto max-w-lg px-6 py-16 text-center"
            role="status"
            aria-live="polite"
          >
            <Heading as="h1" variant="sectionDark" className="mb-4">
              About content unavailable
            </Heading>
            <p className="mb-6 font-ui text-[16px] leading-[26px] text-muted-alt">
              We could not load About Us content from the server.
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
                <Link to="/">Back to home</Link>
              </Button>
            </div>
          </div>
        ) : null}
        <FigmaAboutFrame />
      </main>
      <SiteFooter />
    </div>
  );
}
