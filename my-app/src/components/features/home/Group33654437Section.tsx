import type { HomeTestimonial } from '@/types/home';
import { TESTIMONIAL_HERO_GALLERY_IMAGES, TESTIMONIALS } from './constants';
import { GalleryCard } from './GalleryCard';
import { HOME_PAGE_INSET_CLASS, HOME_SECTION_STACK_CLASS } from './homeSectionLayout';
import { TestimonialCard } from './TestimonialCard';

export interface Group33654437SectionProps {
  testimonials?: HomeTestimonial[];
}

/**
 * Group 33654437 — Home screen section 6/8 (Figma node 2295:3500).
 */
export function Group33654437Section({
  testimonials = TESTIMONIALS,
}: Group33654437SectionProps) {
  const items = testimonials.length > 0 ? testimonials : TESTIMONIALS;
  const midpoint = Math.ceil(items.length / 2);
  const columnA = items.slice(0, midpoint);
  const columnB = items.slice(midpoint);

  return (
    <section
      className={`home-group-33654437 ${HOME_SECTION_STACK_CLASS} block w-full`}
      data-figma-node="2295:3500"
      aria-labelledby="home-testimonials-heading"
    >
      <div className="w-full bg-home-foreground" data-figma-node="Rectangle 28">
        <div
          className={`flex w-full flex-col gap-14 py-16 ${HOME_PAGE_INSET_CLASS}`}
          data-figma-node="Frame 1618873464"
        >
          <div className="flex w-full flex-col gap-14 lg:flex-row lg:items-start">
            <div className="min-w-0 shrink-0 lg:w-[40%]">
              <h2 id="home-testimonials-heading" className="home-group-33654437__heading">
                Built For
                <br />
                <span className="text-home-accent">Agents Like You.</span>
              </h2>
              <p className="home-group-33654437__body mt-5 max-w-[380px]">
                New agents, team leaders, and large brokerages are using Agentwise to spend less
                time marketing and more time closing without sacrificing quality.
              </p>
            </div>

            <div
              className="min-w-0 flex-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              data-figma-node="Group 8"
            >
              <div className="flex w-max gap-3" role="list" aria-label="Agent marketing examples">
                {TESTIMONIAL_HERO_GALLERY_IMAGES.map((image, index) => (
                  <GalleryCard key={`${image.src}-${index}`} image={image} />
                ))}
              </div>
            </div>
          </div>

          <div className="grid max-h-[560px] grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2 md:overflow-hidden">
            <div className="flex flex-col gap-4">
              {columnA.map((testimonial) => (
                <TestimonialCard key={testimonial.name} {...testimonial} />
              ))}
            </div>
            {columnB.length > 0 && (
              <div className="flex flex-col gap-4">
                {columnB.map((testimonial) => (
                  <TestimonialCard key={`${testimonial.name}-b`} {...testimonial} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
