import { useCallback, useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ImagePlaceholderIcon } from '@/components/icons';
import type { DashboardAnnouncement } from '@/types/api';
import { getImageUrl } from '@/utils/calendar';

interface AnnouncementsCarouselProps {
  items: DashboardAnnouncement[];
  loading?: boolean;
}

function getAnnouncementImageUrl(item: DashboardAnnouncement): string | null {
  if (item.link) {
    return getImageUrl(item.link);
  }
  return null;
}

export function AnnouncementsCarousel({
  items,
  loading = false,
}: AnnouncementsCarouselProps) {
  const slides = items.slice(0, 5);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    setActiveIndex((current) =>
      slides.length === 0 ? 0 : (current - 1 + slides.length) % slides.length,
    );
  }, [slides.length]);

  const goToNext = useCallback(() => {
    setActiveIndex((current) =>
      slides.length === 0 ? 0 : (current + 1) % slides.length,
    );
  }, [slides.length]);

  useEffect(() => {
    if (activeIndex >= slides.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, slides.length]);

  if (loading) {
    return (
      <div
        className="h-[220px] w-full animate-pulse rounded-[16px] bg-white/10 md:h-[260px] md:rounded-[20px] lg:w-[280px] lg:shrink-0"
        aria-busy="true"
        aria-label="Loading announcements carousel"
      />
    );
  }

  if (slides.length === 0) {
    return (
      <div className="flex h-[220px] w-full items-center justify-center rounded-[16px] border border-white/5 bg-[#14100d]/80 md:h-[260px] md:rounded-[20px] lg:w-[280px] lg:shrink-0">
        <p className="px-4 text-center text-sm text-[#858585]">No announcements yet.</p>
      </div>
    );
  }

  const activeSlide = slides[activeIndex];
  const imageUrl = getAnnouncementImageUrl(activeSlide);

  return (
    <div
      className="relative flex h-[220px] w-full flex-col overflow-hidden rounded-[16px] border border-white/5 bg-[#14100d]/80 md:h-[260px] md:rounded-[20px] lg:w-[280px] lg:shrink-0"
      aria-roledescription="carousel"
      aria-label="Featured announcements"
    >
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#2a2520] text-[#858585]">
            <ImagePlaceholderIcon className="h-10 w-10" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
          <p className="line-clamp-2 font-display text-[15px] leading-5 text-white">
            {activeSlide.title}
          </p>
        </div>
      </div>

      {slides.length > 1 ? (
        <>
          <button
            type="button"
            onClick={goToPrevious}
            className="focus-ring absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white transition-colors hover:bg-black/70"
            aria-label="Previous announcement"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="focus-ring absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white transition-colors hover:bg-black/70"
            aria-label="Next announcement"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={[
                  'focus-ring h-1.5 rounded-full transition-all',
                  index === activeIndex
                    ? 'w-4 bg-primary'
                    : 'w-1.5 bg-white/40 hover:bg-white/60',
                ].join(' ')}
                aria-label={`Go to announcement ${index + 1}`}
                aria-current={index === activeIndex ? 'true' : undefined}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
