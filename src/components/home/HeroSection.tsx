import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { SocialIcons } from "@/components/home/SocialIcons";
import { apiString, type HomeApiData } from "@/lib/api-string";
import {
  homeContainerClass,
  homePillButtonClass,
  homeSectionXClass,
} from "@/lib/home-page-ui";
import { cn } from "@/lib/utils";

const FALLBACK_BODY =
  "The all-in-one marketing platform for residential real estate agents — AI-personalized content, a custom business dashboard, and a strategic AI advisor that knows your market.";

interface HeroSectionProps {
  apiData?: HomeApiData;
}

export function HeroSection({ apiData }: HeroSectionProps) {
  const apiHeading =
    apiString(apiData, "heading") ?? apiString(apiData, "title");
  const body = apiString(apiData, "description") ?? FALLBACK_BODY;

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-background pb-[72px] pt-[40px]",
        homeSectionXClass,
      )}
      aria-labelledby="hero-heading"
    >
      <img
        src="/assets/figma/1-2289-17245.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.35]"
      />
      <div className={cn(homeContainerClass, "relative")}>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-[48px]">
          <div className="flex flex-col gap-[24px]">
            <Heading id="hero-heading" as="h1" variant="hero">
              {apiHeading ?? (
                <>
                  Stunning Real Estate Marketing, Personalized To Your Market In{" "}
                  <span className="text-accent">Minutes</span>
                </>
              )}
            </Heading>
            <p className="max-w-[520px] font-sans text-[16px] font-normal leading-[26px] text-muted-alt">
              {body}
            </p>
            <SocialIcons />
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <img
              src="/assets/figma/group-33654428-2264-10401.png"
              alt="Agentwise dashboard preview"
              className="h-auto w-full max-w-full object-contain object-left-top drop-shadow-2xl lg:max-h-[582px]"
              width={1584}
              height={582}
            />
          </div>
        </div>
        <div className="mt-[56px] flex flex-col items-center gap-[16px] text-center">
          <p className="font-ui text-[16px] leading-[24px] text-primary/90">
            Join{" "}
            <span className="font-semibold text-accent">Hundreds</span> of other
            agents on the waitlist for Agentwise
          </p>
          <Button
            variant="pill"
            size="lg"
            className={cn("font-ui px-10", homePillButtonClass)}
            asChild
          >
            <a href="#waitlist">Get Started</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
