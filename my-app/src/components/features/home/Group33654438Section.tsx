import { cn } from '@/lib/utils';
import { MARKETING_GALLERY_IMAGES } from './constants';

/**
 * Group 33654438 — Home screen section 5/12 (Figma node 2295:3505).
 * Children: Group 33654436 (heading), Group 33654435 (subtitle), Frame 2147227823 (gallery).
 */
export function Group33654438Section({ className }: { className?: string }) {
  return (
    <section
      id="content"
      className={cn(
        'home-group-33654438 relative z-10 w-full overflow-hidden bg-[#ffffff]',
        className,
      )}
      data-figma-node="2295:3505"
      aria-labelledby="home-marketing-gallery-heading"
    >
      <div className="relative flex w-full flex-col items-center gap-[12px] px-[var(--spacing-padding-60)] py-[60px]">
        <div data-figma-node="Group 33654436">
          <h2
            id="home-marketing-gallery-heading"
            className="home-group-33654438__heading text-center"
          >
            Marketing that stops the scroll
          </h2>
        </div>

        <div data-figma-node="Group 33654435">
          <p className="home-group-33654438__body mx-auto max-w-[827px] text-center">
            Hand-designed by our creative team. Personalized by AI to your market. Ready to post in
            minutes.
          </p>
        </div>
      </div>

      <div
        className="relative mt-[30px] w-full overflow-x-auto pb-[60px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        data-figma-node="Frame 2147227823"
      >
        <div
          className="flex w-max gap-[24px] px-[var(--spacing-padding-60)]"
          role="list"
          aria-label="Marketing content gallery"
        >
          {MARKETING_GALLERY_IMAGES.map((image, index) => (
            <article
              key={`${image.src}-${index}`}
              role="listitem"
              className="relative h-[552px] w-[316px] shrink-0 overflow-hidden rounded-[24px]"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-[#00000033]" aria-hidden="true" />
              {image.overlay && (
                <p className="home-group-33654438__card-caption absolute inset-x-[18px] top-1/2 -translate-y-1/2 text-center">
                  {image.overlay}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
