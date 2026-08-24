import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { GalleryImage } from '../../types/contentCalendar';

interface ImageGalleryProps {
  images: GalleryImage[];
}

function GalleryCard({ image }: { image: GalleryImage }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <article className="relative h-[260px] tablet:h-[320px] desktop:h-[360px] rounded-radius-20 overflow-hidden shadow-drop-shadow-39 group">
      {!loaded ? (
        <div
          className="absolute inset-0 animate-pulse bg-color-20"
          aria-hidden="true"
          data-testid="image-skeleton"
        />
      ) : null}
      <img
        src={image.imageUrl}
        alt={image.title}
        onLoad={() => setLoaded(true)}
        className={[
          'w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-focus-within:scale-105',
          loaded ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-color-16/90 via-color-16/30 to-transparent transition-opacity group-hover:via-color-16/50 group-focus-within:via-color-16/50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 p-padding-16 pointer-events-none">
        <h3 className="font-almarai text-body-115 text-secondary">{image.title}</h3>
        {image.description ? (
          <p className="font-almarai text-caption-49 text-color-14 mt-1 line-clamp-2">{image.description}</p>
        ) : null}
      </div>
      <Link
        to="/signup"
        className="absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset rounded-radius-20"
        aria-label={`View ${image.title} template`}
      >
        <span className="sr-only">Explore {image.title}</span>
      </Link>
    </article>
  );
}

export function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <ul
      className="flex gap-16 tablet:gap-20 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-padding-8 -mx-padding-16 tablet:mx-0 px-padding-16 tablet:px-0"
      aria-label="Content library gallery"
    >
      {images.map((image) => (
        <li
          key={image.id}
          className="snap-start flex-shrink-0 w-[180px] tablet:w-[220px] desktop:w-[240px]"
        >
          <GalleryCard image={image} />
        </li>
      ))}
    </ul>
  );
}

export default ImageGallery;
