import { useEffect, useMemo, useState } from 'react';
import { useProfileContent } from '../hooks/useProfileContent';
import { formatContentGeneratedDate } from '../lib/profileDisplay';
import type { ProfileContentItem } from '../types/api';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

const PAGE_SIZE = 5;

interface ContentHistorySectionProps {
  onViewItem?: (item: ProfileContentItem) => void;
}

function ContentHistorySkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading content history"
      className="mt-8 overflow-hidden rounded-[16px] border border-white/5 bg-[#1f1b17] md:mt-10 md:rounded-[20px]"
    >
      <span className="sr-only">Loading content history</span>
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-5 md:px-8 md:py-6">
        <div className="h-7 w-40 animate-pulse rounded bg-white/10" />
        <div className="h-9 w-16 animate-pulse rounded bg-white/10" />
      </div>
      <div className="space-y-3 px-4 py-4 md:space-y-4 md:px-6 md:py-6">
        {Array.from({ length: PAGE_SIZE }).map((_, index) => (
          <div
            key={`content-history-skeleton-${index}`}
            className="rounded-[12px] border border-white/5 bg-[#26231f] px-4 py-4 md:px-5 md:py-5"
          >
            <div className="h-5 w-3/5 max-w-sm animate-pulse rounded bg-white/10" />
            <div className="mt-3 h-4 w-full animate-pulse rounded bg-white/10" />
            <div className="mt-4 h-3 w-36 animate-pulse rounded bg-white/10" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end gap-3 border-t border-white/5 px-5 py-4 md:px-8">
        <div className="h-4 w-28 animate-pulse rounded bg-white/10" />
        <div className="h-8 w-16 animate-pulse rounded bg-white/10" />
      </div>
    </section>
  );
}

function ContentHistoryItem({
  item,
  onView,
}: {
  item: ProfileContentItem;
  onView?: (item: ProfileContentItem) => void;
}) {
  const timestamp = formatContentGeneratedDate(
    item.created_at || item.updated_at,
  );

  const handleView = () => {
    if (item.link) {
      window.open(item.link, '_blank', 'noopener,noreferrer');
      return;
    }

    onView?.(item);
  };

  return (
    <article className="rounded-[12px] border border-white/5 bg-[#26231f] px-4 py-4 md:px-5 md:py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-bold leading-snug text-white md:text-base">
            {item.title}
          </h3>
          {item.description ? (
            <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-[#A6A4A2] md:text-[14px] md:leading-6">
              {item.description}
            </p>
          ) : null}
          {timestamp ? (
            <p className="mt-3 text-[12px] text-[#858585] md:text-[13px]">
              {timestamp}
            </p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={handleView}
          className="focus-ring shrink-0 self-start text-[14px] font-medium text-primary transition-colors hover:text-[#d4b08e] sm:self-center"
          aria-label={`View ${item.title}`}
        >
          View
        </button>
      </div>
    </article>
  );
}

export default function ContentHistorySection({
  onViewItem,
}: ContentHistorySectionProps) {
  const { data, loading, error, refetch } = useProfileContent();
  const [page, setPage] = useState(0);

  const totalCount = data.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const pageItems = useMemo(() => {
    const start = page * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [data, page]);

  useEffect(() => {
    setPage(0);
  }, [totalCount]);

  if (loading) {
    return <ContentHistorySkeleton />;
  }

  return (
    <section
      aria-labelledby="content-history-heading"
      className="mt-8 overflow-hidden rounded-[16px] border border-white/5 bg-[#1f1b17] md:mt-10 md:rounded-[20px]"
    >
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-5 md:px-8 md:py-6">
        <h2
          id="content-history-heading"
          className="font-display text-[22px] font-medium text-white md:text-[26px]"
        >
          Content History
        </h2>
        <p
          className="font-display text-[28px] font-medium leading-none text-primary md:text-[34px]"
          aria-label={`${totalCount} total generated content items`}
        >
          {totalCount.toLocaleString('en-US')}
        </p>
      </div>

      {error ? (
        <div
          role="alert"
          className="mx-4 my-4 rounded-[12px] border border-[#ff5630]/40 bg-[#ff5630]/10 px-4 py-3 text-[14px] text-[#fdfdfd] md:mx-6"
        >
          <p>{error}</p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="focus-ring mt-2 rounded-sm text-[14px] text-primary underline-offset-2 hover:underline"
          >
            Try again
          </button>
        </div>
      ) : null}

      {!error && totalCount === 0 ? (
        <div className="px-5 py-12 text-center md:px-8 md:py-16">
          <p className="font-display text-[20px] text-white">
            No generated content yet
          </p>
          <p className="mt-2 text-[14px] leading-6 text-[#A6A4A2]">
            Content you generate in the studio will appear here.
          </p>
        </div>
      ) : null}

      {!error && totalCount > 0 ? (
        <>
          <div className="space-y-3 px-4 py-4 md:space-y-4 md:px-6 md:py-6">
            {pageItems.map((item) => (
              <ContentHistoryItem
                key={item.id}
                item={item}
                onView={onViewItem}
              />
            ))}
          </div>

          <footer className="flex items-center justify-end gap-3 border-t border-white/5 px-5 py-4 md:px-8">
            <p className="text-[13px] text-[#858585]">
              Showing {pageItems.length} of {totalCount.toLocaleString('en-US')}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(0, current - 1))}
                disabled={page === 0}
                className="focus-ring flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[#A6A4A2] transition-colors hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setPage((current) =>
                    Math.min(totalPages - 1, current + 1),
                  )
                }
                disabled={page >= totalPages - 1}
                className="focus-ring flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[#A6A4A2] transition-colors hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </footer>
        </>
      ) : null}
    </section>
  );
}
