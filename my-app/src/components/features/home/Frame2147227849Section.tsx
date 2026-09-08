import { cn } from '@/lib/utils';
import { ULTIMATE_MIND_SECTION_12_COPY } from './constants';
import { UltimateMindDashboard } from './mockups/UltimateMindDashboard';
import { UltimateMindGreenCard, UltimateMindSectionShell } from './UltimateMindGreenCard';

/**
 * Frame 2147227849 — Home screen section 12/12 (Figma node 3654:11564).
 * Full-width Ultimate Mind dashboard with section-specific intro copy.
 */
export function Frame2147227849Section({ className }: { className?: string }) {
  return (
    <section
      className={cn('home-frame-2147227849 relative z-10 w-full', className)}
      data-figma-node="3654:11564"
      aria-labelledby="home-ultimate-mind-detail-heading"
    >
      <UltimateMindSectionShell wrapperFigmaNode="Frame 1618873461">
        <UltimateMindGreenCard innerClassName="flex flex-col gap-[20px] px-[var(--spacing-padding-32)] py-[48px] lg:px-[64px] lg:py-[64px]">
          <div data-figma-node="Group 33654434">
            <h2 id="home-ultimate-mind-detail-heading" className="home-ultimate-mind__heading">
              {ULTIMATE_MIND_SECTION_12_COPY.heading}
            </h2>
            <p className="home-ultimate-mind__body mt-[16px] max-w-[560px]">
              {ULTIMATE_MIND_SECTION_12_COPY.body}
            </p>
          </div>

          <div className="relative mt-[10px]" data-figma-node="Group 33654450">
            <div className="overflow-hidden rounded-[16px]">
              <UltimateMindDashboard sidebar="light" className="w-full" />
            </div>
          </div>
        </UltimateMindGreenCard>
      </UltimateMindSectionShell>
    </section>
  );
}
