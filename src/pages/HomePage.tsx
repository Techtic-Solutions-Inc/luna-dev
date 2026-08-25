import { Alert } from "@/components/ui/Alert";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeSkeleton } from "@/components/home/HomeSkeleton";
import { MarketingSections } from "@/components/home/MarketingSections";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { useHomeContent } from "@/hooks/useHomeContent";
import { asString } from "@/lib/bind";

export function HomePage() {
  const { data, loading, error, reload } = useHomeContent();
  const marketingMessage = asString(data?.marketing_message);
  const subHeading = asString(data?.sub_heading);
  const contactEmail = asString(data?.contact_email);
  const privacy = asString(data?.privacy_policy_link) ?? "#privacy-policy";
  const terms = asString(data?.terms_of_service_link) ?? "#terms-of-service";

  return (
    <div className="min-h-screen bg-color-16">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <main id="main">
        <div className="hero-glow">
          <SiteHeader />
          {error ? (
            <div className="relative z-10 px-20 pt-20 lg:px-60">
              <Alert message={error} onRetry={reload} />
            </div>
          ) : null}
          {loading ? <HomeSkeleton /> : <HeroSection marketingMessage={marketingMessage} subHeading={subHeading} />}
        </div>
        {loading ? null : <MarketingSections />}
      </main>
      <SiteFooter contactEmail={contactEmail} privacyHref={privacy} termsHref={terms} />
    </div>
  );
}
