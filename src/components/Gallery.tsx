import { cn } from '@/lib/cn';
import type { GalleryImage } from '@/types/home';

export interface GalleryProps {
  images: GalleryImage[];
  captions?: string[];
  className?: string;
  imageClassName?: string;
}

export function Gallery({ images, captions, className, imageClassName }: GalleryProps) {
  if (images.length === 0) {
    return (
      <p className="text-center font-sans text-almarai-lg text-color-135" role="status">
        No gallery images are available.
      </p>
    );
  }

  return (
    <ul className={cn('flex gap-4 overflow-x-auto pb-2', className)}>
      {images.map((image, index) => {
        const caption = image.caption ?? captions?.[index];
        return (
          <li key={`${image.src}-${index}`} className="shrink-0">
            <figure className="relative">
              <img
                src={image.src}
                alt={image.alt}
                className={cn('h-[420px] w-[240px] rounded-24 object-cover md:h-[553px] md:w-[317px]', imageClassName)}
              />
              {caption ? (
                <figcaption className="pointer-events-none absolute inset-x-4 bottom-6 text-center font-serif text-eb-17 text-white">
                  {caption}
                </figcaption>
              ) : null}
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
