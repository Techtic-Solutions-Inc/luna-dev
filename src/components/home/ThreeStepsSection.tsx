import type { ReactNode } from 'react';

interface Step {
  step: string;
  filled: boolean;
  title: ReactNode;
  body: string;
  image: string;
  alt: string;
}

const STEPS: Step[] = [
  {
    step: 'Step 01',
    filled: true,
    title: (
      <>
        Browse The Continuously <span className="text-accent">Updated</span>{' '}
        <span className="text-accent">Collection.</span>
      </>
    ),
    body: 'Explore hundreds of hand-designed templates for social, email, and more. Save the ones that fit your style.',
    image: '/assets/figma/group-33654450-3654-11562.png',
    alt: 'Agentwise Content Library',
  },
  {
    step: 'Step 02',
    filled: false,
    title: (
      <>
        <span className="type-body-17 font-almarai text-ink">We Personalize It To Your </span>
        <span className="font-garamond text-accent">Business And Market.</span>
      </>
    ),
    body: 'Our AI customizes every template with your brand, your market, and your neighborhood — automatically. What used to take hours now takes seconds.',
    image: '/assets/figma/frame-2147227816-2270-14191.png',
    alt: 'Agentwise Ultimate Mind personalization',
  },
  {
    step: 'Step 03',
    filled: false,
    title: (
      <>
        <span className="type-body-17 font-almarai text-ink">Post, Attract, Engage, And </span>
        <span className="font-garamond text-accent">Stand Out.</span>
      </>
    ),
    body: 'Download your finished content and share it anywhere. Looks like you have a full-scale marketing team (and with Agentwise, you do.)',
    image: '/assets/figma/frame-2147227818-2270-14699.png',
    alt: 'Content library download preview',
  },
];

export function ThreeStepsSection() {
  return (
    <section className="home-steps-bg bg-color-103 px-[20px] py-[113px] md:px-[30px] lg:px-[101px]">
      <h2 className="text-center font-garamond text-[32px] font-medium leading-[1.2] text-ink md:text-[48px]">
        Stunning Marketing, In Three Simple Steps
      </h2>
      <div className="mx-auto mt-[113px] flex max-w-[1760px] flex-col gap-[125px]">
        {STEPS.map((item) => (
          <div key={item.step} className="grid items-center gap-[30px] lg:grid-cols-2 lg:gap-[102px]">
            <div className="flex flex-col gap-[16px]">
              <span
                className={`inline-flex w-fit rounded-[100px] border border-accent px-[16px] py-[6px] font-grotesk text-[12px] font-semibold uppercase tracking-[0.12em] text-accent ${
                  item.filled ? 'bg-accent/10' : 'bg-transparent'
                }`}
              >
                {item.step}
              </span>
              <h3 className="max-w-[480px] font-garamond text-[28px] font-medium leading-[1.2] text-ink md:text-[40px]">
                {item.title}
              </h3>
              <p className="type-body-15 max-w-[461px] text-muted">{item.body}</p>
            </div>
            <img src={item.image} alt={item.alt} className="h-auto w-full rounded-[12px] object-contain" />
          </div>
        ))}
      </div>
    </section>
  );
}
