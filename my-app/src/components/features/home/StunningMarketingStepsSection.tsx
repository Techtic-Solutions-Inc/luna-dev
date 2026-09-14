import { HOME_PAGE_INSET_CLASS } from './homeSectionLayout';

const DEFAULT_HEADLINE = 'Stunning marketing, in three simple steps';

export interface StunningMarketingStepsSectionProps {
  headline?: string;
  subheadline?: string;
}

/**
 * Stunning marketing, in three simple steps — Home screen section 2/8 (Figma node 2264:10451).
 */
export function StunningMarketingStepsSection({
  headline,
  subheadline,
}: StunningMarketingStepsSectionProps) {
  const displayHeadline = headline?.trim() || DEFAULT_HEADLINE;
  const showDefaultSubheadline = !headline?.trim() && !subheadline?.trim();

  return (
    <section
      className={`relative z-10 flex w-full flex-col pt-[var(--spacing-padding-60)] ${HOME_PAGE_INSET_CLASS}`}
      aria-labelledby="home-stunning-marketing-steps-heading"
      data-figma-node="2264:10451"
    >
      <h2
        id="home-stunning-marketing-steps-heading"
        className="home-stunning-marketing-steps__heading m-0 text-center"
        data-figma-node="Stunning marketing, in three simple steps"
      >
        {displayHeadline}
      </h2>
      {subheadline?.trim() && (
        <p className="home-stunning-marketing-steps__subheadline mx-auto mt-4 max-w-3xl text-center">
          {subheadline}
        </p>
      )}
      {showDefaultSubheadline && (
        <p className="sr-only">Default hero copy shown; no API headline or subheadline provided.</p>
      )}
    </section>
  );
}
