import HomeButton from './HomeButton';

interface StepsSectionProps {
  onCustomize: () => void;
  onDownload: () => void;
}

const steps = [
  {
    number: '01',
    title: 'Browse The Continuously Updated Collection.',
    description: 'Help real estate professionals create content faster with ready-made templates.',
    action: null as 'customize' | 'download' | null,
  },
  {
    number: '02',
    title: 'We Personalize It To Your Business And Market.',
    description: 'Click Customize to edit the location, market data, images, or branding.',
    action: 'customize' as const,
  },
  {
    number: '03',
    title: 'Post, Attract, Engage, And Stand Out.',
    description: 'Download your finished content and share it anywhere.',
    action: 'download' as const,
  },
];

const StepsSection = ({ onCustomize, onDownload }: StepsSectionProps) => (
  <section
    className="relative px-6 py-20 lg:px-10 lg:py-28"
    style={{
      backgroundColor: 'var(--color-16)',
      backgroundImage:
        'linear-gradient(var(--color-41) 1px, transparent 1px), linear-gradient(90deg, var(--color-41) 1px, transparent 1px)',
      backgroundSize: '60px 60px',
    }}
  >
    <div className="relative mx-auto max-w-7xl">
      <h2 className="text-center font-garamond text-3xl font-medium text-secondary md:text-4xl lg:text-[42px]">
        Stunning Marketing, In Three Simple Steps
      </h2>

      <div className="mt-16 space-y-20">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
              index % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
            }`}
          >
            <div>
              <span className="font-garamond text-6xl font-medium text-accent/30 lg:text-8xl">
                {step.number}
              </span>
              <h3 className="mt-2 font-garamond text-2xl font-medium text-secondary md:text-3xl lg:text-[30px] lg:leading-[39px]">
                {step.title}
              </h3>
              <p className="mt-4 font-almarai text-base leading-relaxed text-[var(--color-57)]">
                {step.description}
              </p>
              {step.action === 'customize' && (
                <div className="mt-6">
                  <HomeButton onClick={onCustomize} variant="outline" ariaLabel="Customize content">
                    Customize
                  </HomeButton>
                </div>
              )}
              {step.action === 'download' && (
                <div className="mt-6">
                  <HomeButton onClick={onDownload} variant="primary" ariaLabel="Download content">
                    Download
                  </HomeButton>
                </div>
              )}
            </div>

            <div
              className="overflow-hidden rounded-2xl border border-[var(--color-41)] bg-[var(--color-20)]"
              style={{ boxShadow: 'var(--drop-shadow-20)' }}
            >
              <div className="p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-45)]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-35)]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-17)]" />
                </div>
                <div className="rounded-xl bg-[var(--color-36)] p-5">
                  {step.number === '01' && (
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <div
                          key={n}
                          className="aspect-[3/4] rounded-lg bg-gradient-to-br from-[var(--color-50)] to-[var(--color-64)]"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  )}
                  {step.number === '02' && (
                    <div className="space-y-3">
                      <div className="h-8 rounded-lg bg-[var(--color-16)]" aria-hidden="true" />
                      <div className="h-8 rounded-lg bg-[var(--color-16)]" aria-hidden="true" />
                      <div
                        className="h-24 rounded-lg bg-gradient-to-br from-[var(--color-50)] to-[var(--color-64)]"
                        aria-hidden="true"
                      />
                      <p className="font-almarai text-xs text-[var(--color-57)]">
                        Click Customize to edit the location, market data, images, or branding.
                      </p>
                    </div>
                  )}
                  {step.number === '03' && (
                    <div className="mx-auto max-w-[200px]">
                      <div className="aspect-[9/16] rounded-2xl bg-gradient-to-br from-[var(--color-67)] to-[var(--color-50)] p-4">
                        <p className="mt-8 text-center font-garamond text-sm text-secondary">
                          Your Brand
                        </p>
                        <p className="mt-2 text-center font-almarai text-[10px] text-[var(--color-57)]">
                          Ready to post
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StepsSection;
