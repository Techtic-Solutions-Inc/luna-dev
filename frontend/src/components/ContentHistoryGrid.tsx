import { useMemo, useState } from 'react';
import type { ProfileContentItem } from '../types/api';
import {
  formatContentTimestamp,
  getContentDateValue,
  getContentPreview,
} from '../lib/profileContentDisplay';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

export const CONTENT_HISTORY_PAGE_SIZE = 5;

interface ContentHistoryGridProps {
  items: ProfileContentItem[];
  total?: number;
  loading?: boolean;
  suppressEmpty?: boolean;
  onView?: (item: ProfileContentItem) => void;
  onCreate?: () => void;
}

function HistorySkeleton() {
  return (
    <div
      className="rounded-[16px] bg-[#1f1b17] p-5 md:px-6 md:py-6"
      aria-busy="true"
      aria-label="Loading content history"
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="h-6 w-40 animate-pulse rounded bg-white/10" />
        <div className="h-8 w-12 animate-pulse rounded bg-white/10" />
      </div>
      <div className="grid grid-cols-1 gap-md">
        {Array.from({ length: CONTENT_HISTORY_PAGE_SIZE }).map((_, index) => (
          <div key={index} className="rounded-[12px] bg-[#2c2723] px-5 py-5">
            <div className="h-5 w-2/3 animate-pulse rounded bg-white/10" />
            <div className="mt-3 h-4 w-full animate-pulse rounded bg-white/10" />
            <div className="mt-3 h-3 w-40 animate-pulse rounded bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ContentHistoryGrid({
  items,
  total,
  loading = false,
  suppressEmpty = false,
  onView,
  onCreate,
}: ContentHistoryGridProps) {
  const [page, setPage] = useState(0);
  const resolvedTotal = total ?? items.length;
  const pageCount = Math.max(
    1,
    Math.ceil(items.length / CONTENT_HISTORY_PAGE_SIZE),
  );
  const currentPage = Math.min(page, pageCount - 1);

  const pageItems = useMemo(() => {
    const start = currentPage * CONTENT_HISTORY_PAGE_SIZE;
    return items.slice(start, start + CONTENT_HISTORY_PAGE_SIZE);
  }, [currentPage, items]);

  if (loading) {
    return <HistorySkeleton />;
  }

  const showingCount = pageItems.length;
  const canGoPrevious = currentPage > 0;
  const canGoNext =
    currentPage < pageCount - 1 && items.length > CONTENT_HISTORY_PAGE_SIZE;

  return (
    <section
      aria-labelledby="content-history-heading"
      className="rounded-[16px] bg-[#1f1b17] p-5 md:px-6 md:py-6"
    >
      <div className="mb-5 flex items-end justify-between gap-4">
        <h2
          id="content-history-heading"
          className="font-display text-[22px] font-medium leading-7 text-[#F8F2EB] md:text-[24px]"
        >
          Content History
        </h2>
        <p
          className="font-display text-[32px] font-medium leading-none text-primary md:text-[40px]"
          aria-label={`${resolvedTotal} generated items`}
        >
          {resolvedTotal.toLocaleString('en-US')}
        </p>
      </div>

      {items.length === 0 ? (
        suppressEmpty ? null : (
          <div className="py-10 text-center">
            <p className="text-[14px] text-[#959595]" role="status">
              No generated content yet.
            </p>
            {onCreate ? (
              <button
                type="button"
                onClick={onCreate}
                className="focus-ring mt-4 inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-[14px] font-medium text-[#0b0b0b] transition-colors duration-150 hover:bg-[#b48a5d]"
                aria-label="Create generated content"
              >
                Create content
              </button>
            ) : null}
          </div>
        )
      ) : (
        <ul className="grid grid-cols-1 gap-md">
          {pageItems.map((item) => {
            const preview = getContentPreview(item);
            const timestamp = formatContentTimestamp(getContentDateValue(item));

            return (
              <li key={item.id}>
                <article className="box-border flex min-h-[108px] items-start gap-4 rounded-[12px] bg-[#2c2723] px-5 py-5 transition-colors duration-150 hover:bg-[#332d28]">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg font-medium leading-6 text-[#F8F2EB]">
                      {item.title}
                    </h3>
                    {preview ? (
                      <p className="mt-1 truncate text-[13px] leading-5 text-[#BEBBB9]">
                        {preview}
                      </p>
                    ) : null}
                    <p className="mt-2 text-[11px] leading-4 text-[#959595]">
                      {timestamp}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onView?.(item)}
                    className="focus-ring mt-0.5 shrink-0 text-[14px] text-primary transition-colors duration-150 hover:text-[#d4b08c]"
                    aria-label={`View ${item.title}`}
                  >
                    View
                  </button>
                </article>
              </li>
            );
          })}
        </ul>
      )}

      {items.length > 0 ? (
        <div className="mt-5 flex items-center justify-end gap-3">
          <p className="text-[12px] text-primary" aria-live="polite">
            Showing {showingCount} of {resolvedTotal.toLocaleString('en-US')}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((value) => Math.max(0, value - 1))}
              disabled={!canGoPrevious}
              className="focus-ring flex h-8 w-8 items-center justify-center rounded-full text-[#F8F2EB] transition-colors duration-150 hover:bg-white/5 disabled:cursor-not-allowed disabled:text-[#646261]"
              aria-label="Previous page"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setPage((value) => Math.min(pageCount - 1, value + 1))}
              disabled={!canGoNext}
              className="focus-ring flex h-8 w-8 items-center justify-center rounded-full text-[#F8F2EB] transition-colors duration-150 hover:bg-white/5 disabled:cursor-not-allowed disabled:text-[#646261]"
              aria-label="Next page"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
