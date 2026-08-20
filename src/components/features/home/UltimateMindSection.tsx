import HomeButton from './HomeButton';

interface UltimateMindSectionProps {
  onLearnMore: () => void;
}

const UltimateMindSection = ({ onLearnMore }: UltimateMindSectionProps) => (
  <section className="px-6 py-20 lg:px-10 lg:py-28">
    <div className="mx-auto max-w-7xl">
      <div
        className="overflow-hidden rounded-3xl bg-[var(--color-67)] p-8 lg:p-12"
        style={{ boxShadow: 'var(--drop-shadow-37)' }}
      >
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div
            className="overflow-hidden rounded-2xl border border-[var(--color-41)] bg-[var(--color-20)]"
            style={{ boxShadow: 'var(--drop-shadow-20)' }}
          >
            <div className="p-5">
              <p className="font-garamond text-lg font-medium text-accent">
                Agentwise Ultimate Mind
              </p>
              <p className="mt-1 font-almarai text-sm text-[var(--color-57)]">
                Personalized Market Report
              </p>
              <div className="mt-4 space-y-3">
                <div className="h-3 w-3/4 rounded bg-[var(--color-36)]" aria-hidden="true" />
                <div className="h-3 w-full rounded bg-[var(--color-36)]" aria-hidden="true" />
                <div className="h-3 w-5/6 rounded bg-[var(--color-36)]" aria-hidden="true" />
                <div
                  className="mt-4 h-32 rounded-xl bg-gradient-to-br from-[var(--color-50)] to-[var(--color-64)]"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-garamond text-3xl font-medium text-accent md:text-4xl lg:text-[38px] lg:leading-[50px]">
              Here&apos;s The Deal... Great Marketing Is Just The Start.
            </h2>
            <p className="mt-6 font-almarai text-base leading-relaxed text-[var(--color-54)]">
              Explore Ultimate Mind — your AI-driven market intelligence advisor. Get personalized
              insights, market reports, and strategic guidance tailored to your local real estate
              market.
            </p>
            <div className="mt-8">
              <HomeButton onClick={onLearnMore} ariaLabel="Explore Ultimate Mind">
                Explore Ultimate Mind
              </HomeButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default UltimateMindSection;
