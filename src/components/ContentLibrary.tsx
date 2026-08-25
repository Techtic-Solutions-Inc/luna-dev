import { ImageGallery, type ImageGalleryProps } from '@/components/ImageGallery';
import { cn } from '@/lib/cn';

export interface ContentLibraryProps extends ImageGalleryProps {
  title?: string;
  description?: string;
}

export function ContentLibrary({
  title,
  description,
  heading,
  subheading,
  images,
  className,
  ...rest
}: ContentLibraryProps) {
  return (
    <ImageGallery
      heading={title ?? heading}
      subheading={description ?? subheading}
      images={images}
      className={cn(className)}
      {...rest}
    />
  );
}

export default ContentLibrary;
