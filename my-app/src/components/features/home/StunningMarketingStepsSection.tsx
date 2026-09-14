import { HOME_PAGE_INSET_CLASS } from './homeSectionLayout';

/**
 * Stunning marketing, in three simple steps — Home screen section 2/8 (Figma node 2264:10451).
 */
export function StunningMarketingStepsSection() {
  return (
    <section
      className={`relative z-10 flex w-full flex-col pt-[var(--spacing-padding-60)] ${HOME_PAGE_INSET_CLASS}`}
      aria-labelledby="home-stunning-marketing-steps-heading"
      data-figma-node="2264:10451"
    >
      <h2
        id="home-stunning-marketing-steps-heading"
        className="home-stunning-marketing-steps__heading m-0"
        data-figma-node="Stunning marketing, in three simple steps"
      >
        Stunning marketing, in three simple steps
      </h2>
    </section>
  );
}
