import { cn } from '@/lib/utils';
import { TESTIMONIALS } from './constants';
import { TestimonialCard } from './TestimonialCard';

/**
 * Group 33654437 — Home screen section 6/12 (Figma node 2295:3500).
 * Children: Rectangle 28 (white background), Frame 1618873464 (testimonials layout).
 */
export function Group33654437Section({ className }: { className?: string }) {
  const midpoint = Math.ceil(TESTIMONIALS.length / 2);
  const columnA = TESTIMONIALS.slice(0, midpoint);
  const columnB = TESTIMONIALS.slice(midpoint);

  return (
    <section
      className={cn('home-group-33654437 relative z-10 w-full', className)}
      data-figma-node="2295:3500"
      aria-labelledby="home-testimonials-heading"
    >
      <div className="relative w-full bg-[#ffffff]" data-figma-node="Rectangle 28">
        <div
          className="relative w-full px-[var(--spacing-padding-60)] py-[var(--home-section-padding-y)]"
          data-figma-node="Frame 1618873464"
        >
          <div className="relative mx-auto grid w-full items-start gap-[40px] lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-[64px]">
            <div className="lg:sticky lg:top-[40px]">
              <h2 id="home-testimonials-heading" className="home-group-33654437__heading">
                Built For
                <br />
                <span className="text-[#c8a47e]">Agents Like You.</span>
              </h2>
              <p className="home-group-33654437__body mt-[20px] max-w-[380px]">
                New agents, team leaders, and large brokerages are using Agentwise to spend less time
                marketing and more time closing without sacrificing quality.
              </p>
            </div>

            <div className="relative min-h-[200px] overflow-hidden">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[72px] bg-gradient-to-b from-[#ffffff] to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[72px] bg-gradient-to-t from-[#ffffff] to-transparent" />
              <div className="grid max-h-[560px] grid-cols-1 gap-[16px] overflow-y-auto md:grid-cols-2 md:overflow-hidden">
                <div className="flex flex-col gap-[16px]">
                  {columnA.map((testimonial) => (
                    <TestimonialCard key={testimonial.name} {...testimonial} />
                  ))}
                </div>
                {columnB.length > 0 && (
                  <div className="flex flex-col gap-[16px]">
                    {columnB.map((testimonial) => (
                      <TestimonialCard key={`${testimonial.name}-b`} {...testimonial} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
