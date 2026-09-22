import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import {
  homeContainerClass,
  homePillButtonClass,
  homeSectionXClass,
} from "@/lib/home-page-ui";
import { cn } from "@/lib/utils";

export function UltimateMindSection() {
  return (
    <section
      id="ultimate-mind"
      className={cn("py-[72px]", homeSectionXClass)}
      aria-labelledby="ultimate-mind-heading"
    >
      <div
        className={cn(
          homeContainerClass,
          "overflow-hidden rounded-[24px] bg-green-panel",
        )}
      >
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col gap-6 p-8 sm:p-12 lg:p-14">
            <Heading
              id="ultimate-mind-heading"
              as="h2"
              variant="sectionDark"
              className="text-[36px] sm:text-[42px]"
            >
              Agentwise Ultimate Mind
            </Heading>
            <p className="font-sans text-[16px] leading-[26px] text-primary/85 sm:text-[17px]">
              A bold, strategic AI advisor trained on your market, your
              business, and the realities of residential real estate. Brainstorm
              campaigns, pressure-test pricing, develop your growth plan, and
              get a second opinion 24/7 from a partner who actually knows your
              business.
            </p>
            <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-xl shadow-lg">
              <img
                src="/assets/figma/group-33654450-3654-11562.png"
                alt="Agentwise Ultimate Mind dashboard interface"
                className="absolute inset-0 h-[170%] w-full object-cover object-[center_88%]"
                width={800}
                height={380}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-6 bg-panel-dark p-8 sm:p-12 lg:p-14">
            <Heading as="h3" variant="sectionDark" className="text-[32px] sm:text-[40px]">
              Here&apos;s The Deal…{" "}
              <span className="text-accent">Great Marketing</span> Is Just The
              Start.
            </Heading>
            <p className="font-sans text-[16px] leading-[26px] text-muted-alt">
              A custom business dashboard and a personalized AI advisor built
              into every plan.
            </p>
            <div>
              <Button
                variant="pill"
                size="lg"
                className={cn("font-ui", homePillButtonClass)}
                asChild
              >
                <a href="#how-it-works">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
