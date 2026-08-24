export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ImageGalleryProps {
  images: GalleryImage[];
  isLoading?: boolean;
}

export function ImageGallery({ images, isLoading = false }: ImageGalleryProps) {
  if (isLoading) {
    return (
      <div
        className="flex gap-gap-16 overflow-hidden px-4 md:px-8"
        aria-busy="true"
        aria-label="Loading image gallery"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="skeleton h-[420px] w-[240px] shrink-0 rounded-16 md:h-[520px] md:w-[280px]"
          />
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <p className="px-4 text-center font-almarai text-almarai-16 text-color-134" role="status">
        No gallery images are available.
      </p>
    );
  }

  return (
    <div
      className="flex gap-gap-16 overflow-x-auto px-4 pb-2 md:gap-6 md:px-8"
      role="list"
      aria-label="Marketing content gallery"
    >
      {images.map((image) => (
        <figure
          key={image.src}
          role="listitem"
          className="relative h-[420px] w-[240px] shrink-0 overflow-hidden rounded-16 shadow-soft md:h-[520px] md:w-[280px]"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover object-center"
          />
          {image.caption ? (
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-color-105/90 to-transparent px-4 pb-5 pt-16">
              <p className="font-almarai text-almarai-14 leading-snug text-white">{image.caption}</p>
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
