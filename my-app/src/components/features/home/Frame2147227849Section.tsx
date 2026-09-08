import { cn } from '@/lib/utils';
import { HOME_GROUP_33654450_IMAGE } from './constants';
import { UltimateMindGreenCard, UltimateMindSectionShell } from './UltimateMindGreenCard';
import { UltimateMindIntroCopy } from './UltimateMindIntroCopy';

/**
 * Frame 2147227849 — Home screen section 12/12 (Figma node 3654:11564).
 * Ultimate Mind single-column feature: copy and dashboard mockup.
 */
export function Frame2147227849Section({ className }: { className?: string }) {
  return (
    <section
      className={cn('home-frame-2147227849 relative z-10 w-full', className)}
      data-figma-node="3654:11564"
      aria-labelledby="home-ultimate-mind-detail-heading"
    >
      <UltimateMindSectionShell wrapperFigmaNode="Frame 1618873461">
        <UltimateMindGreenCard
          innerClassName="flex flex-col gap-[20px] px-[var(--spacing-padding-32)] py-[48px] lg:px-[64px] lg:py-[64px]"
        >
          <div data-figma-node="Group 33654434">
            <UltimateMindIntroCopy headingId="home-ultimate-mind-detail-heading" />
          </div>

          <div className="relative mt-[10px]" data-figma-node="Group 33654450">
            <div className="relative overflow-hidden rounded-[16px]">
              <div className="relative aspect-[748/515] w-full">
                <img
                  src={HOME_GROUP_33654450_IMAGE}
                  alt="Agentwise Ultimate Mind dashboard with chat prompts and sidebar navigation"
                  className="home-group-33654450__preview absolute top-0 h-full max-w-none object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </UltimateMindGreenCard>
      </UltimateMindSectionShell>
    </section>
  );
}
