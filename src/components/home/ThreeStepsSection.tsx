import { LuDownload, LuPencil, LuSearch } from 'react-icons/lu';

interface Step {
  number: string;
  title: string;
  description: string;
  action?: {
    label: string;
    icon: typeof LuSearch;
  };
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Browse The Continuously Updated Collection',
    description: 'Help real estate professionals create content faster with ready-made templates.',
    action: { label: 'Get Started', icon: LuSearch },
  },
  {
    number: '02',
    title: 'We Personalize It To Your Business And Market',
    description: 'Click Customize to edit the location, market data, images, or branding.',
    action: { label: 'Customize', icon: LuPencil },
  },
  {
    number: '03',
    title: 'Post, Attract, Engage, And Stand Out',
    description:
      'Download your finished content and share it anywhere. Increase audience engagement through visually appealing social media posts.',
    action: { label: 'Download', icon: LuDownload },
  },
];

function StepMockup({ stepNumber }: { stepNumber: string }) {
  if (stepNumber === '01') {
    return (
      <div
        aria-hidden="true"
        className="h-[280px] w-full overflow-hidden rounded-16 border border-color-41 bg-color-23 shadow-drop-shadow-20 tablet:h-[320px] desktop:h-[360px] desktop:w-[480px]"
      >
        <div className="flex h-full flex-col gap-12 p-16">
          <div className="h-16 w-[140px] rounded-4 bg-color-53" />
          <div className="grid flex-1 grid-cols-3 gap-8">
            <div className="rounded-8 bg-[linear-gradient(160deg,#473e33,#1a1919)]" />
            <div className="rounded-8 bg-[linear-gradient(160deg,#2f271f,#0e0d0d)]" />
            <div className="rounded-8 bg-[linear-gradient(160deg,#44413e,#191919)]" />
            <div className="rounded-8 bg-[linear-gradient(160deg,#3a3541,#141010)]" />
            <div className="rounded-8 bg-[linear-gradient(160deg,#473e33,#1a1919)]" />
            <div className="rounded-8 bg-[linear-gradient(160deg,#2f271f,#0e0d0d)]" />
          </div>
        </div>
      </div>
    );
  }

  if (stepNumber === '02') {
    return (
      <div
        aria-hidden="true"
        className="h-[280px] w-full overflow-hidden rounded-16 border border-color-41 bg-color-23 shadow-drop-shadow-20 tablet:h-[320px] desktop:h-[360px] desktop:w-[480px]"
      >
        <div className="flex h-full flex-col gap-12 p-16">
          <div className="h-16 w-[180px] rounded-4 bg-color-53" />
          <div className="flex flex-col gap-8">
            <div className="h-32 rounded-8 border border-color-41 bg-color-22" />
            <div className="h-32 rounded-8 border border-color-41 bg-color-22" />
            <div className="h-32 rounded-8 border border-color-41 bg-color-22" />
          </div>
          <div className="mt-auto h-28 w-[120px] rounded-full bg-accent/80" />
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="mx-auto h-[280px] w-[160px] overflow-hidden rounded-24 border border-color-41 bg-color-23 shadow-drop-shadow-20 tablet:h-[320px] tablet:w-[180px] desktop:h-[360px] desktop:w-[200px]"
    >
      <div className="flex h-full flex-col">
        <div className="h-[60%] bg-[linear-gradient(160deg,#473e33,#1a1919)]" />
        <div className="flex flex-1 flex-col gap-6 p-12">
          <div className="h-8 w-full rounded-4 bg-color-53" />
          <div className="h-8 w-[70%] rounded-4 bg-color-95" />
          <div className="mt-auto flex gap-6">
            <div className="h-16 w-16 rounded-full bg-color-15" />
            <div className="h-16 w-16 rounded-full bg-color-86" />
            <div className="h-16 w-16 rounded-full bg-color-85" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ThreeStepsSection() {
  return (
    <section
      aria-labelledby="three-steps-heading"
      className="relative bg-color-16 px-20 py-60 tablet:py-80 desktop:py-102"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-lines bg-grid opacity-40"
      />

      <div className="relative mx-auto w-full max-w-[1164px]">
        <h2
          id="three-steps-heading"
          className="type-heading-xl-63 text-center text-white desktop:type-heading-xl-73"
        >
          Stunning Marketing, In Three Simple Steps
        </h2>

        <div className="mt-52 flex flex-col gap-60 desktop:mt-80 desktop:gap-102">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col gap-32 desktop:flex-row desktop:items-center desktop:gap-60"
            >
              <div className="desktop:w-[400px] desktop:shrink-0">
                <span className="type-heading-xl-53 text-accent">{step.number}</span>
                <h3 className="type-heading-lg-48 mt-12 text-white">{step.title}</h3>
                <p className="type-body-68 mt-16 text-white/70">{step.description}</p>
                {step.action !== undefined ? (
                  <button
                    type="button"
                    className="type-body-sm-2 mt-24 inline-flex h-36 items-center gap-8 rounded-full bg-accent px-20 text-color-16 transition-colors duration-200 hover:bg-color-30"
                  >
                    <step.action.icon aria-hidden="true" size={16} />
                    {step.action.label}
                  </button>
                ) : null}
              </div>

              <div className="desktop:flex-1">
                <StepMockup stepNumber={step.number} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ThreeStepsSection;
