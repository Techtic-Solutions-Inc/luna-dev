import { Gallery, type GalleryProps } from '@/components/Gallery';
import { cn } from '@/lib/cn';

export interface ImageGalleryProps extends GalleryProps {
  heading?: string;
  subheading?: string;
  layout?: 'carousel' | 'grid';
}

export function ImageGallery({
  heading,
  subheading,
  images,
  captions,
  className,
  imageClassName,
  layout = 'carousel',
}: ImageGalleryProps) {
  return (
    <section className="overflow-x-hidden bg-white py-20 md:py-28" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-content px-6 md:px-10">
        {heading ? (
          <h2
            id="gallery-heading"
            className="text-center font-serif text-4xl text-color-101 md:text-5xl lg:text-[56px] lg:leading-[1.1]"
          >
            {heading}
          </h2>
        ) : null}
        {subheading ? (
          <p className="mx-auto mt-4 max-w-3xl text-center font-sans text-section-title text-color-132">
            {subheading}
          </p>
        ) : null}
      </div>
      <div className="mt-12 w-full max-w-full overflow-hidden md:mt-16">
        <Gallery
          images={images}
          captions={captions}
          layout={layout}
          className={cn('px-4 md:px-6', className)}
          imageClassName={imageClassName}
        />
      </div>
    </section>
  );
}
