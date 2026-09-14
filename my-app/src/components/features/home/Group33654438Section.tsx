import type { GalleryImage } from '@/types/home';
import { MARKETING_GALLERY_IMAGES } from './constants';
import { GalleryCard } from './GalleryCard';
import { HOME_PAGE_INSET_CLASS, HOME_SECTION_STACK_CLASS } from './homeSectionLayout';

export interface Group33654438SectionProps {
  galleryImages?: GalleryImage[];
}

/**
 * Group 33654438 — Home screen section 5/8 (Figma node 2295:3505).
 */
export function Group33654438Section({
  galleryImages = MARKETING_GALLERY_IMAGES,
}: Group33654438SectionProps) {
  const images = galleryImages.length > 0 ? galleryImages : MARKETING_GALLERY_IMAGES;

  return (
    <section
      id="content"
      className={`home-group-33654438 ${HOME_SECTION_STACK_CLASS} block w-full overflow-hidden bg-home-foreground`}
      data-figma-node="2295:3505"
      aria-labelledby="home-marketing-gallery-heading"
    >
      <div className={`flex w-full flex-col items-center gap-3 py-16 ${HOME_PAGE_INSET_CLASS}`}>
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
        className="w-full overflow-x-auto pb-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        data-figma-node="Frame 2147227823"
      >
        <div
          className={`flex w-max gap-5 ${HOME_PAGE_INSET_CLASS}`}
          role="list"
          aria-label="Marketing content gallery"
        >
          {images.map((image, index) => (
            <GalleryCard key={`${image.src}-${index}`} image={image} />
          ))}
        </div>
      </div>
    </section>
  );
}
