import { Heading } from "@/components/ui/heading";
import { homeContainerClass, homeSectionXClass } from "@/lib/home-page-ui";
import { cn } from "@/lib/utils";

const collageImages = [
  "/assets/figma/attlgjgqkngefohwz-large-img6232-7-I2295-3482-323-1642.png",
  "/assets/figma/attlgjgqkngefohwz-large-img6232-5-I2295-3482-65-2286.png",
  "/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-65-2287.png",
  "/assets/figma/attlgjgqkngefohwz-large-img6232-6-I2295-3482-323-1645.png",
  "/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-323-1646.png",
  "/assets/figma/attlgjgqkngefohwz-large-img6232-3-I2295-3482-65-2290.png",
  "/assets/figma/attlgjgqkngefohwz-large-img6232-4-I2295-3482-65-2291.png",
] as const;

export function MarketingCollageSection() {
  return (
    <section
      className={cn(
        "bg-marketing-surface pb-[88px] pt-[96px]",
        homeSectionXClass,
      )}
      aria-labelledby="marketing-collage-heading"
    >
      <div className={cn(homeContainerClass, "text-center")}>
        <Heading
          id="marketing-collage-heading"
          as="h2"
          variant="section"
          className="mx-auto max-w-3xl"
        >
          Marketing That Stops The Scroll
        </Heading>
        <p className="mx-auto mt-[16px] max-w-[720px] font-sans text-[16px] leading-[26px] text-muted">
          Hand-designed by our creative team. Personalized by AI to your market.
          Ready to post in minutes.
        </p>
      </div>
      <div className="mt-12 overflow-x-auto pb-4">
        <div className="mx-auto flex w-max gap-4 px-4 sm:px-6 lg:px-8">
          {collageImages.map((src) => (
            <div
              key={src}
              className="h-[360px] w-[220px] shrink-0 overflow-hidden rounded-3xl sm:h-[480px] sm:w-[280px] lg:h-[552px] lg:w-[316px]"
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
                width={316}
                height={552}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
