import { useMemo, useState } from 'react';
import type { ProfileDownloadItem } from '../types/api';
import { formatDownloadMeta } from '../lib/profileDownloadsDisplay';
import { ChevronLeftIcon, ChevronRightIcon, FileIcon } from './icons';
import ReDownloadButton from './ReDownloadButton';

export const DOWNLOAD_HISTORY_PAGE_SIZE = 5;

interface DownloadHistoryListProps {
  items: ProfileDownloadItem[];
  total?: number;
  loading?: boolean;
  suppressEmpty?: boolean;
  reDownloadingId?: string | null;
  onReDownload?: (item: ProfileDownloadItem) => void;
}

function HistorySkeleton() {
  return (
    <div
      className="rounded-[16px] bg-[#25211e] p-5 md:p-6"
      aria-busy="true"
      aria-label="Loading download history"
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="h-6 w-44 animate-pulse rounded bg-white/10" />
        <div className="h-8 w-12 animate-pulse rounded bg-white/10" />
      </div>
      <div className="space-y-md">
        {Array.from({ length: DOWNLOAD_HISTORY_PAGE_SIZE }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-[12px] bg-[#1c1815] px-5 py-5"
          >
            <div className="h-11 w-11 shrink-0 animate-pulse rounded-full bg-white/10" />
            <div className="min-w-0 flex-1">
              <div className="h-5 w-2/3 animate-pulse rounded bg-white/10" />
              <div className="mt-3 h-3 w-48 animate-pulse rounded bg-white/10" />
            </div>
            <div className="h-10 w-28 shrink-0 animate-pulse rounded-full bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DownloadHistoryList({
  items,
  total,
  loading = false,
  suppressEmpty = false,
  reDownloadingId = null,
  onReDownload,
}: DownloadHistoryListProps) {
  const [page, setPage] = useState(0);
  const resolvedTotal = total ?? items.length;
  const pageCount = Math.max(
    1,
    Math.ceil(items.length / DOWNLOAD_HISTORY_PAGE_SIZE),
  );
  const currentPage = Math.min(page, pageCount - 1);

  const pageItems = useMemo(() => {
    const start = currentPage * DOWNLOAD_HISTORY_PAGE_SIZE;
    return items.slice(start, start + DOWNLOAD_HISTORY_PAGE_SIZE);
  }, [currentPage, items]);

  if (loading) {
    return <HistorySkeleton />;
  }

  const showingCount = pageItems.length;
  const canGoPrevious = currentPage > 0;
  const canGoNext =
    currentPage < pageCount - 1 && items.length > DOWNLOAD_HISTORY_PAGE_SIZE;

  return (
    <section
      aria-labelledby="download-history-heading"
      className="rounded-[16px] bg-[#25211e] p-5 md:px-6 md:py-6"
    >
      <div className="mb-5 flex items-end justify-between gap-4">
        <h2
          id="download-history-heading"
          className="font-display text-[22px] font-medium leading-7 text-[#F8F2EB] md:text-[24px]"
        >
          Download History
        </h2>
        <p
          className="font-display text-[32px] font-medium leading-none text-primary md:text-[40px]"
          aria-label={`${resolvedTotal} downloads`}
        >
          {resolvedTotal.toLocaleString('en-US')}
        </p>
      </div>

      {items.length === 0 ? (
        suppressEmpty ? null : (
          <p
            className="py-10 text-center text-[14px] text-[#959595]"
            role="status"
          >
            No downloads available.
          </p>
        )
      ) : (
        <ul className="space-y-md">
          {pageItems.map((item) => {
            const meta = formatDownloadMeta(item);

            return (
              <li key={item.id}>
                <article className="flex flex-col gap-3 rounded-[12px] border border-white/5 bg-[#1c1815] px-4 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-5 sm:py-5">
                  <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#14110f] text-[#F8F2EB]"
                    >
                      <FileIcon className="h-[18px] w-[18px]" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-bold leading-6 text-[#F8F2EB]">
                        {item.title}
                      </h3>
                      {meta ? (
                        <p className="mt-1 truncate text-[13px] leading-5 text-[#BEBBB9]">
                          {meta}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <ReDownloadButton
                    title={item.title}
                    loading={reDownloadingId === item.id}
                    onClick={() => onReDownload?.(item)}
                  />
                </article>
              </li>
            );
          })}
        </ul>
      )}

      {items.length > 0 ? (
        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-[12px] text-[#959595]">
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
