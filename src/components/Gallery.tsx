import { cn } from '@/lib/cn';
import type { GalleryImage } from '@/types/home';

export interface GalleryProps {
  images: GalleryImage[];
  captions?: string[];
  className?: string;
  imageClassName?: string;
  layout?: 'carousel' | 'grid';
}

function GalleryCard({
  image,
  caption,
  alt,
  imageClassName,
  loading,
}: {
  image: GalleryImage;
  caption?: string;
  alt: string;
  imageClassName?: string;
  loading: 'eager' | 'lazy';
}) {
  return (
    <figure className="relative mx-auto w-full max-w-[317px] md:mx-0">
      <img
        src={image.src}
        alt={alt}
        className={cn(
          'h-gallery-h w-full rounded-24 object-cover md:h-gallery-h-md md:w-gallery-w-lg',
          imageClassName,
        )}
        loading={loading}
      />
      {caption ? (
        <figcaption className="pointer-events-none absolute inset-x-4 bottom-6 text-center font-serif text-eb-17 text-white">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function Gallery({ images, captions, className, imageClassName, layout = 'carousel' }: GalleryProps) {
  if (images.length === 0) {
    return (
      <p className="text-center font-sans text-almarai-lg text-color-135" role="status">
        No gallery images are available.
      </p>
    );
  }

  const loop = [...images, ...images];
  const useGrid = layout === 'grid';

  return (
    <div className="gallery-shell w-full max-w-full" aria-label="Marketing templates">
      <ul
        className={cn(
          useGrid
            ? 'grid grid-cols-1 justify-items-center gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3'
            : 'grid grid-cols-1 justify-items-center gap-5 px-6 md:hidden',
          className,
        )}
      >
        {images.map((image, index) => (
          <li key={`mobile-${image.src}-${index}`} className="w-full max-w-[317px]">
            <GalleryCard
              image={image}
              caption={image.caption ?? captions?.[index]}
              alt={image.alt}
              imageClassName={imageClassName}
              loading={index < 2 ? 'eager' : 'lazy'}
            />
          </li>
        ))}
      </ul>
      {useGrid ? null : (
        <ul className={cn('gallery-track hidden w-max gap-20 md:flex', className)}>
          {loop.map((image, index) => {
            const caption = image.caption ?? captions?.[index % images.length];
            return (
              <li key={`${image.src}-${index}`} className="shrink-0">
                <GalleryCard
                  image={image}
                  caption={caption}
                  alt={index < images.length ? image.alt : ''}
                  imageClassName={imageClassName}
                  loading={index < 4 ? 'eager' : 'lazy'}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
