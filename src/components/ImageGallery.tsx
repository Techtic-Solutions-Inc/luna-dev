import { Gallery, type GalleryProps } from '@/components/Gallery';
import { cn } from '@/lib/cn';

export interface ImageGalleryProps extends GalleryProps {
  heading?: string;
  subheading?: string;
}

export function ImageGallery({ heading, subheading, images, captions, className, imageClassName }: ImageGalleryProps) {
  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-content px-6 md:px-10">
        {heading ? (
          <h2
            id="gallery-heading"
            className="text-center font-serif text-4xl text-color-101 md:text-5xl lg:text-[56px]"
          >
            {heading}
          </h2>
        ) : null}
        {subheading ? (
          <p className="mx-auto mt-4 max-w-3xl text-center font-sans text-step-desc text-color-132">
            {subheading}
          </p>
        ) : null}
      </div>
      <div className="mt-12 md:mt-16">
        <Gallery
          images={images}
          captions={captions}
          className={cn(
            'gap-4 px-4 md:gap-5 md:px-6 lg:justify-center lg:overflow-visible',
            'max-md:snap-x max-md:snap-mandatory',
            className,
          )}
          imageClassName={cn('max-md:snap-center', imageClassName)}
        />
      </div>
    </section>
  );
}
