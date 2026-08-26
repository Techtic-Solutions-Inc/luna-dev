import { Button } from '@/components/ui/Button';
import { SocialRow } from '@/components/home/SocialRow';
import { readString } from '@/types/api';

const DEFAULT_HEADLINE = 'Stunning Real Estate Marketing, Personalized To Your Market In Minutes';
const DEFAULT_SUBCOPY =
  'The all-in-one marketing platform for residential real estate agents AI-personalized content, a custom business dashboard, and a strategic AI advisor that knows your market.';

interface HeroSectionProps {
  data: unknown;
}

export function HeroSection({ data }: HeroSectionProps) {
  const headline = readString(data, 'headline') ?? DEFAULT_HEADLINE;
  const subcopy = readString(data, 'sub_heading') ?? readString(data, 'subcopy') ?? DEFAULT_SUBCOPY;

  return (
    <section className="hero-glow bg-color-103 px-[20px] pb-[101px] pt-[30px] md:px-[30px] lg:px-[101px]">
      <div className="mx-auto grid max-w-[1760px] items-center gap-[30px] lg:grid-cols-2 lg:gap-[101px]">
        <div>
          <h1 className="max-w-[640px] font-garamond text-[32px] font-medium leading-[1.305] text-ink md:text-[50px] md:leading-[65.25px]">
            {headline}
          </h1>
          <p className="type-body-34 mt-[20px] max-w-[560px] text-ink">{subcopy}</p>
          <SocialRow />
        </div>
        <div>
          <img
            src="/images/home.png"
            alt="Agentwise dashboard"
            className="h-auto w-full rounded-[16px] object-contain"
          />
        </div>
      </div>
      <div className="mx-auto mt-[30px] flex max-w-[1760px] flex-col items-center text-center">
        <p className="type-body-117 text-ink">
          Join <span className="type-body-55 text-accent">Hundreds</span> of other agents on the waitlist for Agentwise
        </p>
        <Button to="/signup" variant="primary" className="mt-[20px] min-w-[180px]">
          Get Started
        </Button>
      </div>
    </section>
  );
}
