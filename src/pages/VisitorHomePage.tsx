import { HomeErrorState } from "@/components/home/HomeErrorState";
import { HeroSection } from "@/components/home/HeroSection";
import { HomePageSkeleton } from "@/components/home/HomePageSkeleton";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { MarketingCollageSection } from "@/components/home/MarketingCollageSection";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { UltimateMindSection } from "@/components/home/UltimateMindSection";
import { WaitlistSection } from "@/components/home/WaitlistSection";
import { useVisitorHome } from "@/hooks/useVisitorHome";
import type { HomeApiData } from "@/lib/api-string";
import { homePillButtonClass } from "@/lib/home-page-ui";
import { cn } from "@/lib/utils";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function unwrapHomeData(payload: unknown): HomeApiData | undefined {
  if (!isPlainObject(payload)) {
    return undefined;
  }
  if (!("success" in payload) || payload.success !== true) {
    return undefined;
  }
  if (!("data" in payload) || !isPlainObject(payload.data)) {
    return undefined;
  }
  return payload.data;
}

export function VisitorHomePage() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useVisitorHome();
  const apiData = unwrapHomeData(data);

  if (isLoading) {
    return <HomePageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background">
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
      <main id="main">
        <HeroSection apiData={apiData} />
        <MarketingCollageSection />
        <HowItWorksSection />
        <UltimateMindSection />
        <TestimonialsSection />
        <WaitlistSection />
      </main>
      <SiteFooter />
    </div>
  );
}
