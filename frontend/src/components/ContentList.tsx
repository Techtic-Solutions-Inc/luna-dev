import type { ContentCalendarItem } from '../types/api';
import type { ScheduledPostDisplay } from '../lib/contentCalendarDisplay';
import {
  formatMonthDayLabel,
  formatWeekdayLabel,
  inferDashboardContentKind,
  mediaImageUrl,
} from '../lib/dashboardDisplay';
import { FacebookIcon, ImageIcon, InstagramIcon } from './icons';

export type ContentListVariant = 'list' | 'calendar-card' | 'week';
export type ContentListDateStyle = 'weekday' | 'month-day';
export type ContentListEmptyTone = 'dark' | 'light';

export interface ContentListProps {
  items: ScheduledPostDisplay[];
  variant?: ContentListVariant;
  dateStyle?: ContentListDateStyle;
  loading?: boolean;
  emptyMessage?: string;
  emptyTone?: ContentListEmptyTone;
  selectedId?: string | null;
  onItemClick?: (item: ContentCalendarItem) => void;
  className?: string;
}

const DAY_FORMAT = new Intl.DateTimeFormat('en-US', { weekday: 'short' });

function PlatformIcon({
  platform,
}: {
  platform: ScheduledPostDisplay['platform'];
}) {
  if (platform === 'facebook') {
    return <FacebookIcon className="h-3.5 w-3.5 shrink-0" />;
  }

  return <InstagramIcon className="h-3.5 w-3.5 shrink-0" />;
}

export function CalendarCard({
  post,
  selected = false,
  onItemClick,
}: {
  post: ScheduledPostDisplay;
  selected?: boolean;
  onItemClick?: (item: ContentCalendarItem) => void;
}) {
  const { item, platform, postType, timeLabel } = post;
  const hasImage = /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/i.test(item.link);

  return (
    <button
      type="button"
      onClick={() => onItemClick?.(item)}
      aria-pressed={selected}
      className={`box-border w-full rounded-[10px] border px-2 py-2 text-left shadow-[0_8px_24px_rgba(74,53,35,0.06)] transition-colors duration-200 focus-ring ${
        selected
          ? 'border-[#D7B089] bg-[#FFF7ED]'
          : 'border-[#F1E8DC] bg-white hover:bg-[#FFF9F2]'
      }`}
      aria-label={`${item.title}, ${postType} at ${timeLabel}`}
    >
      <div className="flex items-center gap-1.5">
        <PlatformIcon platform={platform} />
        <span className="truncate text-[11px] leading-none text-[#8A8178]">
          {postType}
        </span>
        <span className="ml-auto shrink-0 text-[10px] leading-none text-[#8A8178]">
          {timeLabel}
        </span>
      </div>
      <div className="mt-2 flex items-start gap-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[6px] bg-[#EBDDCA]">
          {hasImage ? (
            <img
              src={item.link}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <ImageIcon className="h-4 w-4 text-[#A88B6C]" aria-hidden="true" />
          )}
        </div>
        <p className="min-w-0 flex-1 text-[13px] leading-4 text-[#2A201C]">
          {item.title}
        </p>
      </div>
    </button>
  );
}

function WeekCard({
  post,
  index,
  dateStyle,
  selected = false,
  onItemClick,
}: {
  post: ScheduledPostDisplay;
  index: number;
  dateStyle: ContentListDateStyle;
  selected?: boolean;
  onItemClick?: (item: ContentCalendarItem) => void;
}) {
  const { item, scheduledAt } = post;
  const kind = inferDashboardContentKind(item, index);
  const image = mediaImageUrl(item.link);
  const dateLabel =
    dateStyle === 'month-day'
      ? formatMonthDayLabel(scheduledAt)
      : formatWeekdayLabel(scheduledAt);

  return (
    <button
      type="button"
      onClick={() => onItemClick?.(item)}
      aria-pressed={selected}
      className={`box-border w-full overflow-hidden rounded-[16px] border p-3 text-left transition-colors duration-200 focus-ring ${
        selected
          ? 'border-primary bg-[#1C1916]'
          : 'border-white/10 bg-[#171411] hover:border-primary/40 hover:bg-[#1C1916]'
      }`}
      aria-label={`${item.title}, ${kind} on ${dateLabel}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] uppercase tracking-[0.14em] text-[#8A8178]">
          {dateLabel}
        </span>
        <span className="text-[11px] text-primary">{kind}</span>
      </div>
      <div className="relative mt-3 aspect-[3/4] overflow-hidden rounded-[12px] bg-[#2A231D]">
        {image ? (
          <img src={image} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ImageIcon className="h-8 w-8 text-[#A88B6C]" aria-hidden="true" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <p className="line-clamp-3 text-[13px] leading-5 text-white">
            {item.title}
          </p>
        </div>
      </div>
    </button>
  );
}

function ListRow({
  post,
  onItemClick,
}: {
  post: ScheduledPostDisplay;
  onItemClick?: (item: ContentCalendarItem) => void;
}) {
  const { item, platform, postType, scheduledAt, timeLabel } = post;

  return (
    <button
      type="button"
      onClick={() => onItemClick?.(item)}
      className="focus-ring flex w-full items-center gap-3 rounded-[10px] border border-white/10 bg-[#14100d] px-3 py-2.5 text-left transition-colors hover:bg-white/5"
      aria-label={`${item.title}, ${postType} on ${DAY_FORMAT.format(scheduledAt)} at ${timeLabel}`}
    >
      <PlatformIcon platform={platform} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] text-white">{item.title}</p>
        <p className="text-[11px] text-[#959595]">
          {postType} · {DAY_FORMAT.format(scheduledAt)} · {timeLabel}
        </p>
      </div>
    </button>
  );
}

function ContentListSkeleton({ variant }: { variant: ContentListVariant }) {
  if (variant === 'week') {
    return (
      <div className="rounded-[16px] border border-white/10 bg-[#171411] p-3">
        <div className="flex items-center justify-between">
          <div className="h-3 w-12 animate-pulse rounded bg-white/10" />
          <div className="h-3 w-10 animate-pulse rounded bg-white/10" />
        </div>
        <div className="mt-3 aspect-[3/4] animate-pulse rounded-[12px] bg-white/10" />
      </div>
    );
  }

  if (variant === 'calendar-card') {
    return (
      <div className="rounded-[10px] border border-[#EAEAEA] bg-white p-2">
        <div className="flex gap-1">
          <div className="h-3.5 w-3.5 animate-pulse rounded bg-[#EAEAEA]" />
          <div className="h-3 w-10 animate-pulse rounded bg-[#EAEAEA]" />
          <div className="ml-auto h-3 w-8 animate-pulse rounded bg-[#EAEAEA]" />
        </div>
        <div className="mt-2 h-10 animate-pulse rounded-[6px] bg-[#EAEAEA]" />
      </div>
    );
  }

  return (
    <div className="rounded-[10px] border border-white/10 bg-[#14100d] px-3 py-2.5">
      <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
      <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-white/10" />
    </div>
  );
}

export default function ContentList({
  items,
  variant = 'list',
  dateStyle = 'weekday',
  loading = false,
  emptyMessage = 'No scheduled posts yet',
  emptyTone = 'dark',
  selectedId = null,
  onItemClick,
  className = '',
}: ContentListProps) {
  if (loading) {
    const skeletonCount = variant === 'week' ? 5 : variant === 'calendar-card' ? 3 : 4;

    return (
      <div
        className={
          variant === 'week'
            ? `grid grid-cols-1 gap-md sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ${className}`
            : `space-y-2 ${className}`
        }
        aria-busy="true"
        aria-label="Loading scheduled posts"
      >
        <span className="sr-only">Loading scheduled posts</span>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <ContentListSkeleton key={index} variant={variant} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    const emptyClassName =
      emptyTone === 'light'
        ? 'rounded-[16px] border border-[#E5DACE] bg-[#F7F2EC] px-4 py-8 text-center text-[13px] text-[#828282]'
        : variant === 'week'
          ? 'rounded-[16px] border border-white/10 bg-[#171411] px-4 py-8 text-center text-[13px] text-[#959595]'
          : 'text-center text-[13px] text-[#959595]';

    return (
      <p className={`${emptyClassName} ${className}`} role="status">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul
      className={
        variant === 'week'
          ? `grid grid-cols-1 gap-md sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ${className}`
          : `space-y-2 ${className}`
      }
    >
      {items.map((post, index) => (
        <li key={post.item.id}>
          {variant === 'week' ? (
            <WeekCard
              post={post}
              index={index}
              dateStyle={dateStyle}
              selected={post.item.id === selectedId}
              onItemClick={onItemClick}
            />
          ) : variant === 'calendar-card' ? (
            <CalendarCard
              post={post}
              selected={post.item.id === selectedId}
              onItemClick={onItemClick}
            />
          ) : (
            <ListRow post={post} onItemClick={onItemClick} />
          )}
        </li>
      ))}
    </ul>
  );
}
