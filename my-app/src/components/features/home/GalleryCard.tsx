import type { GalleryImage } from '@/types/home';

export function GalleryCard({ image }: { image: GalleryImage }) {
  return (
    <article
      role="listitem"
      className="grid aspect-[316/552] h-[min(552px,70vh)] w-[min(316px,85vw)] shrink-0 grid-cols-1 grid-rows-1 overflow-hidden rounded-[24px]"
    >
      <img
        src={image.src}
        alt={image.alt}
        className="col-start-1 row-start-1 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="col-start-1 row-start-1 bg-[var(--home-image-scrim)]" aria-hidden="true" />
      {image.overlay && (
        <p className="home-group-33654438__card-caption col-start-1 row-start-1 flex items-center justify-center px-[18px] text-center">
          {image.overlay}
        </p>
      )}
    </article>
  );
}
