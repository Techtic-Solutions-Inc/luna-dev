import { asString } from "@/lib/bind";
import { HomeCta } from "@/components/home/HomeCta";
import { HeroSocialIcons } from "@/components/home/SocialBrandIcons";

interface HeroSectionProps {
  marketingMessage?: string;
  subHeading?: string;
}

const DEFAULT_HEADLINE = "Stunning Real Estate Marketing, Personalized To Your Market In Minutes";
const DEFAULT_BODY =
  "The all-in-one marketing platform for residential real estate agents. AI-personalized content, a custom business dashboard, and a strategic AI advisor that knows your market.";

export function HeroSection({ marketingMessage, subHeading }: HeroSectionProps) {
  const headline = asString(marketingMessage) ?? DEFAULT_HEADLINE;
  const body = asString(subHeading) ?? DEFAULT_BODY;
  const isDefaultHeadline = headline === DEFAULT_HEADLINE;

  return (
    <section className="relative px-20 pb-60 pt-20 lg:px-60 lg:pb-80 lg:pt-32">
      <div className="mx-auto grid max-w-[1920px] items-center gap-40 lg:grid-cols-2">
        <div>
          <h1 className="max-w-[640px] font-garamond text-home-hero text-secondary">
            {isDefaultHeadline ? (
              <>
                Stunning Real Estate Marketing, Personalized To Your{" "}
                <span className="italic">Market In Minutes</span>
              </>
            ) : (
              headline
            )}
          </h1>
          <p className="mt-20 max-w-[520px] font-public-sans text-almarai-18-24 text-color-131">{body}</p>
          <HeroSocialIcons />
        </div>
        <div className="relative">
          <img
            src="/images/hero-dashboard.png"
            alt="Agentwise dashboard"
            className="w-full rounded-24 object-cover object-left shadow-elevatedDark"
          />
        </div>
      </div>
      <div className="mt-48 flex flex-col items-center gap-16 text-center">
        <p className="font-public-sans text-almarai-16-24 text-secondary">
          Join <span className="font-garamond text-almarai-18-bold italic text-accent">Hundreds</span> of other agents
          on the waitlist for Agentwise
        </p>
        <HomeCta />
      </div>
    </section>
  );
}
