import { cn } from '@/lib/utils';
import { frameRelativeLength } from '@/theme/screens/home';

/**
 * Stunning marketing, in three simple steps — Home screen section 2/12 (Figma node 2264:10451).
 */
export function StunningMarketingStepsSection({ className }: { className?: string }) {
  return (
    <section
      className={cn('home-stunning-marketing-steps absolute inset-x-0 z-[5]', className)}
      style={{ top: frameRelativeLength(60) }}
      aria-labelledby="home-stunning-marketing-steps-heading"
      data-figma-node="2264:10451"
    >
      <h2
        id="home-stunning-marketing-steps-heading"
        className="home-stunning-marketing-steps__heading absolute inset-x-[var(--spacing-padding-60)]"
        data-figma-node="Stunning marketing, in three simple steps"
      >
        Stunning marketing, in three simple steps
      </h2>
    </section>
  );
}
