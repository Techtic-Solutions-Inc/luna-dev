import { Heading } from "@/components/ui/heading";
import { homeContainerClass, homeSectionXClass } from "@/lib/home-page-ui";
import { cn } from "@/lib/utils";

const steps = [
  {
    step: "Step 01",
    title: (
      <>
        Browse The Continuously{" "}
        <span className="text-border">Updated</span> Collection.
      </>
    ),
    body: "Explore hundreds of hand-designed templates for social, email, and more. Save the ones that fit your style.",
    mockup: "/assets/figma/frame-2147227816-2270-14191.png",
    mockupAlt: "Agentwise Content Library dashboard",
    mockupHeight: 580,
  },
  {
    step: "Step 02",
    title: (
      <>
        We Personalize It To Your{" "}
        <span className="text-border">Business And</span> Market.
      </>
    ),
    body: "Our AI customizes every template with your brand, your market, and your neighborhood — automatically. What used to take hours now takes seconds.",
    mockup: "/assets/figma/frame-2147227817-2270-14193.png",
    mockupAlt: "Agentwise Ultimate Mind personalization",
    mockupHeight: 580,
  },
  {
    step: "Step 03",
    title: (
      <>
        Post, Attract, Engage, And{" "}
        <span className="text-border">Stand Out.</span>
      </>
    ),
    body: "Download your finished content and share it anywhere. Looks like you have a full-scale marketing team (and with Agentwise, you do.)",
    mockup: "/assets/figma/frame-2147227818-2270-14699.png",
    mockupAlt: "Content preview and download",
    mockupHeight: 580,
  },
] as const;

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className={cn("relative bg-background py-[96px]", homeSectionXClass)}
      aria-labelledby="how-it-works-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      <div className={cn(homeContainerClass, "relative")}>
        <Heading
          id="how-it-works-heading"
          as="h2"
          variant="sectionDark"
          className="mb-16 text-center"
        >
          Stunning Marketing, In Three Simple Steps
        </Heading>
        <div className="flex flex-col gap-20 lg:gap-28">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className={cn(
                "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
                index % 2 === 1 && "lg:[&>div:first-child]:order-2",
              )}
            >
              <div className="flex flex-col gap-4">
                <span className="inline-flex w-fit rounded-full border border-border px-4 py-1 font-ui text-xs font-medium uppercase tracking-wide text-border">
                  {item.step}
                </span>
                <Heading as="h3" variant="subsection" className="font-serif">
                  {item.title}
                </Heading>
                <p className="max-w-md font-sans text-[16px] leading-[26px] text-muted-alt">
                  {item.body}
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/50">
                <img
                  src={item.mockup}
                  alt={item.mockupAlt}
                  className="w-full object-cover object-left-top"
                  style={{ height: `${item.mockupHeight}px` }}
                  width={1200}
                  height={item.mockupHeight}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
