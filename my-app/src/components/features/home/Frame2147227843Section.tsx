import { cn } from '@/lib/utils';
import { UltimateMindDashboard } from './mockups/UltimateMindDashboard';
import { UltimateMindGreenCard, UltimateMindSectionShell } from './UltimateMindGreenCard';
import { UltimateMindIntroCopy } from './UltimateMindIntroCopy';

/**
 * Frame 2147227843 — Home screen section 11/12 (Figma node 3330:1780).
 */
export function Frame2147227843Section({ className }: { className?: string }) {
  return (
    <section
      id="about"
      className={cn('home-frame-2147227843 block w-full', className)}
      data-figma-node="3330:1780"
    >
      <UltimateMindSectionShell wrapperFigmaNode="Frame 2147227835">
        <UltimateMindGreenCard
          cardFigmaNode="Rectangle 34624213"
          innerClassName="grid items-center gap-[48px] px-[var(--spacing-padding-32)] py-[48px] lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] lg:px-[64px] lg:py-[64px]"
        >
          <div className="flex flex-col gap-[20px]" data-figma-node="Frame 2147227806">
            <div data-figma-node="Frame 2147227831">
              <UltimateMindIntroCopy />
            </div>

            <div data-figma-node="Frame 2147227830">
              <div className="relative mt-[10px] overflow-hidden rounded-[16px]" data-figma-node="Group 33654428">
                <UltimateMindDashboard sidebar="light" className="w-full border-0 shadow-none" />
              </div>
            </div>
          </div>

          <div
            className="flex flex-col justify-center gap-[20px] pt-[24px] lg:pt-0"
            data-figma-node="Frame 2147227837"
          >
            <h2 className="home-frame-2147227843__right-heading">
              Here&apos;s The Deal...
              <br />
              <span className="text-[#c8a47e]">Great Marketing</span> Is Just The Start.
            </h2>
            <p className="home-frame-2147227843__right-body">
              A custom business dashboard and a personalized AI advisor built into every plan.
            </p>
            <a href="#contact" className="home-frame-2147227843__cta w-fit">
              Learn More
            </a>
          </div>
        </UltimateMindGreenCard>
      </UltimateMindSectionShell>
    </section>
  );
}
