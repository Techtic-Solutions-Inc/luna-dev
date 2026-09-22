import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { SocialIcons } from "@/components/home/SocialIcons";
import {
  homeContainerClass,
  homePillButtonClass,
  homeSectionXClass,
} from "@/lib/home-page-ui";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-background pb-[72px] pt-[40px]",
        homeSectionXClass,
      )}
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[10%] h-[720px] w-[900px] -translate-x-1/4 rounded-full opacity-50 blur-[100px]"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle, rgba(200,164,126,0.45) 0%, rgba(200,164,126,0.12) 45%, transparent 72%)",
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-[5%] h-[560px] w-[640px] rounded-full opacity-40 blur-[90px]"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle, rgba(114,0,255,0.22) 0%, rgba(221,42,123,0.08) 40%, transparent 70%)",
        }}
      />
      <div className={cn(homeContainerClass, "relative")}>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-[48px]">
          <div className="flex flex-col gap-[24px]">
            <Heading id="hero-heading" as="h1" variant="hero">
              Stunning Real Estate Marketing, Personalized To Your Market In{" "}
              <span className="text-border">Minutes</span>
            </Heading>
            <p className="max-w-[520px] font-sans text-[16px] font-normal leading-[26px] text-muted-alt">
              The all-in-one marketing platform for residential real estate
              agents — AI-personalized content, a custom business dashboard, and
              a strategic AI advisor that knows your market.
            </p>
            <SocialIcons />
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <img
              src="/assets/figma/group-33654428-2264-10401.png"
              alt="Agentwise dashboard preview"
              className="h-[582px] w-auto max-w-full object-cover object-left-top drop-shadow-2xl"
              width={1584}
              height={582}
            />
          </div>
        </div>
        <div className="mt-[56px] flex flex-col items-center gap-[16px] text-center">
          <p className="font-ui text-[16px] leading-[24px] text-primary/90">
            Join{" "}
            <span className="font-semibold text-border">Hundreds</span> of other
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
