import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useContentCalendar } from '../hooks/useContentCalendar';
import {
  buildWeekDays,
  getCardGradient,
  getCardImageUrl,
  getCardOverlayText,
  getContentTypeLabel,
  getPrimaryItemForDay,
} from '../lib/dashboardDisplay';

function CalendarSectionSkeleton() {
  return (
    <section aria-busy="true" aria-label="Loading content calendar section">
      <span className="sr-only">Loading content calendar</span>
      <div className="flex items-center justify-between">
        <div className="h-8 w-56 animate-pulse rounded bg-white/10" />
        <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
      </div>
      <div className="mt-6 flex gap-3 overflow-hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={`calendar-skeleton-${index}`}
            className="h-[280px] min-w-[160px] flex-1 animate-pulse rounded-[16px] bg-white/10 sm:h-[320px]"
          />
        ))}
      </div>
    </section>
  );
}

interface CalendarDayCardProps {
  dayLabel: string;
  contentType: string;
  overlayText: string;
  imageUrl: string | null;
  gradient: string;
  entryId?: string;
}

function CalendarDayCard({
  dayLabel,
  contentType,
  overlayText,
  imageUrl,
  gradient,
  entryId,
}: CalendarDayCardProps) {
  const backgroundStyle = imageUrl
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(12,12,12,0.05) 0%, rgba(12,12,12,0.82) 100%), url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : { background: gradient };

  const cardInner = (
    <article
      className="relative min-w-[160px] flex-1 overflow-hidden rounded-[16px] border border-white/5"
      style={backgroundStyle}
    >
      <div className="flex min-h-[280px] flex-col justify-between p-4 sm:min-h-[320px]">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white">
            {dayLabel}
          </p>
          <span className="rounded-full bg-black/35 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-primary">
            {contentType}
          </span>
        </div>
        {overlayText ? (
          <p className="font-display text-[17px] leading-[1.25] text-white sm:text-[19px]">
            {overlayText}
          </p>
        ) : (
          <p className="text-[12px] text-white/50">No content scheduled</p>
        )}
      </div>
    </article>
  );

  if (entryId) {
    return (
      <Link
        to={`/content-calendar/details/${entryId}`}
        className="focus-ring block min-w-[160px] flex-1 rounded-[16px] transition-opacity hover:opacity-90"
        aria-label={`${dayLabel} ${contentType}: ${overlayText || 'View details'}`}
      >
        {cardInner}
      </Link>
    );
  }

  return cardInner;
}

export default function ContentCalendarSection() {
  const { data, loading, error } = useContentCalendar();
  const weekDays = useMemo(() => buildWeekDays(data), [data]);

  if (loading) {
    return <CalendarSectionSkeleton />;
  }

  return (
    <section aria-labelledby="dashboard-content-calendar-heading">
      <div className="flex items-end justify-between gap-4">
        <h2
          id="dashboard-content-calendar-heading"
          className="font-display text-[26px] font-medium leading-tight text-white sm:text-[30px]"
        >
          Your Content Calendar
        </h2>
        <Link
          to="/content-calendar"
          className="focus-ring shrink-0 text-[13px] text-[#A6A4A2] transition-colors hover:text-white"
        >
          Browse all
        </Link>
      </div>

      {error ? (
        <div
          role="alert"
          className="mt-4 rounded-[12px] border border-[#ff5630]/40 bg-[#ff563028] px-4 py-3 text-sm text-white"
        >
          {error}
        </div>
      ) : null}

      <div
        className="mt-6 flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="list"
        aria-label="Weekly content calendar"
      >
        {weekDays.map((day, index) => {
          const primaryItem = getPrimaryItemForDay(day);

          return (
            <CalendarDayCard
              key={day.dayLabel}
              dayLabel={day.dayLabel}
              contentType={getContentTypeLabel(primaryItem)}
              overlayText={getCardOverlayText(primaryItem)}
              imageUrl={getCardImageUrl(primaryItem)}
              gradient={getCardGradient(index)}
              entryId={primaryItem?.id}
            />
          );
        })}
      </div>

      {!loading && data.length === 0 ? (
        <p className="mt-4 text-sm text-[#A6A4A2]">
          No scheduled posts yet. Visit your content calendar to add content.
        </p>
      ) : null}
    </section>
  );
}
