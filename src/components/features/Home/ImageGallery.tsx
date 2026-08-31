import { cn } from '@/lib/utils';

export interface GalleryImage {
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  className?: string;
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  if (images.length === 0) {
    return (
      <p
        className="px-padding-40 text-center font-almarai text-[16px] font-[400] leading-[22px] text-sofia-background"
        role="status"
      >
        No Content Available
      </p>
    );
  }

  return (
    <div
      className={cn(
        'flex gap-[21px] overflow-x-auto px-padding-20 pb-padding-10 tablet:px-padding-40',
        className,
      )}
      role="list"
      aria-label="Marketing templates"
    >
      {images.map((image, index) => (
        <figure
          key={`${image.src}-${index}`}
          className="h-[552px] w-[316px] shrink-0 overflow-hidden rounded-24"
          role="listitem"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover"
            width={316}
            height={552}
          />
        </figure>
      ))}
    </div>
  );
}
