import { cn } from '@/lib/utils';
import { visitorColors, visitorFonts } from './visitorTokens';

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
        className="px-[40px] text-center text-[16px] font-[400] leading-[22px] text-[#637381]"
        style={{ fontFamily: visitorFonts.almarai, color: visitorColors.background }}
        role="status"
      >
        No Content Available
      </p>
    );
  }

  return (
    <div
      className={cn(
        'flex gap-[21px] overflow-x-auto px-[20px] pb-[10px] tablet:px-[40px]',
        className,
      )}
      role="list"
      aria-label="Marketing templates"
    >
      {images.map((image, index) => (
        <figure
          key={`${image.src}-${index}`}
          className="h-[552px] w-[316px] shrink-0 overflow-hidden rounded-[24px]"
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
