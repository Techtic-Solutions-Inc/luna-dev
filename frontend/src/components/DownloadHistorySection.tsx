import { useEffect, useMemo, useState } from 'react';
import { useProfileDownloads } from '../hooks/useProfileDownloads';
import {
  formatDownloadMetadata,
} from '../lib/profileDisplay';
import type { ProfileDownloadItem } from '../types/api';
import { ChevronLeftIcon, ChevronRightIcon, ClipboardIcon } from './icons';
import ReDownloadButton from './ReDownloadButton';

const PAGE_SIZE = 5;

function DownloadHistorySkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading download history"
      className="mt-8 overflow-hidden rounded-[16px] border border-white/5 bg-[#1f1b17] md:mt-10 md:rounded-[20px]"
    >
      <span className="sr-only">Loading download history</span>
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-5 md:px-8 md:py-6">
        <div className="h-7 w-44 animate-pulse rounded bg-white/10" />
        <div className="h-9 w-16 animate-pulse rounded bg-white/10" />
      </div>
      <div className="space-y-3 px-4 py-4 md:space-y-4 md:px-6 md:py-6">
        {Array.from({ length: PAGE_SIZE }).map((_, index) => (
          <div
            key={`download-history-skeleton-${index}`}
            className="rounded-[12px] border border-white/5 bg-[#26231f] px-4 py-4 md:px-5 md:py-5"
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-white/10" />
              <div className="min-w-0 flex-1">
                <div className="h-5 w-3/5 max-w-sm animate-pulse rounded bg-white/10" />
                <div className="mt-3 h-4 w-48 animate-pulse rounded bg-white/10" />
              </div>
              <div className="h-9 w-28 animate-pulse rounded-full bg-white/10" />
            </div>
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

function DownloadHistoryItem({
  item,
  isReDownloading,
  onReDownload,
}: {
  item: ProfileDownloadItem;
  isReDownloading: boolean;
  onReDownload: (item: ProfileDownloadItem) => void;
}) {
  const metadata = formatDownloadMetadata(
    item.file_type,
    item.size,
    item.downloaded_at,
  );

  return (
    <article className="rounded-[12px] border border-white/5 bg-[#26231f] px-4 py-4 md:px-5 md:py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex min-w-0 flex-1 items-start gap-4 sm:items-center">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#1f1b17] text-primary"
          >
            <ClipboardIcon className="h-[18px] w-[18px]" />
          </span>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-[15px] font-bold leading-snug text-white md:text-base">
              {item.title}
            </h3>
            {metadata ? (
              <p className="mt-2 text-[13px] leading-5 text-[#A6A4A2] md:text-[14px] md:leading-6">
                {metadata}
              </p>
            ) : null}
          </div>
        </div>

        <ReDownloadButton
          title={item.title}
          loading={isReDownloading}
          onClick={() => onReDownload(item)}
        />
      </div>
    </article>
  );
}

export default function DownloadHistorySection() {
  const {
    data,
    loading,
    error,
    refetch,
    reDownload,
    isReDownloading,
    reDownloadingId,
  } = useProfileDownloads();
  const [page, setPage] = useState(0);
  const [actionError, setActionError] = useState<string | null>(null);

  const totalCount = data.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const pageItems = useMemo(() => {
    const start = page * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [data, page]);

  useEffect(() => {
    setPage(0);
  }, [totalCount]);

  const handleReDownload = async (item: ProfileDownloadItem) => {
    setActionError(null);

    if (item.download_url) {
      window.open(item.download_url, '_blank', 'noopener,noreferrer');
      return;
    }

    const result = await reDownload(item.id);

    if (result.url) {
      window.open(result.url, '_blank', 'noopener,noreferrer');
      return;
    }

    if (result.error) {
      setActionError(result.error);
    }
  };

  if (loading) {
    return <DownloadHistorySkeleton />;
  }

  return (
    <section
      aria-labelledby="download-history-heading"
      className="mt-8 overflow-hidden rounded-[16px] border border-white/5 bg-[#1f1b17] md:mt-10 md:rounded-[20px]"
    >
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-5 md:px-8 md:py-6">
        <h2
          id="download-history-heading"
          className="font-display text-[22px] font-medium text-white md:text-[26px]"
        >
          Download History
        </h2>
        <p
          className="font-display text-[28px] font-medium leading-none text-primary md:text-[34px]"
          aria-label={`${totalCount} total downloads`}
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

      {actionError ? (
        <div
          role="alert"
          className="mx-4 mt-4 rounded-[12px] border border-[#ff5630]/40 bg-[#ff5630]/10 px-4 py-3 text-[14px] text-[#fdfdfd] md:mx-6"
        >
          <p>{actionError}</p>
        </div>
      ) : null}

      {!error && totalCount === 0 ? (
        <div className="px-5 py-12 text-center md:px-8 md:py-16">
          <p className="font-display text-[20px] text-white">No downloads yet</p>
          <p className="mt-2 text-[14px] leading-6 text-[#A6A4A2]">
            Resources you download from the studio will appear here.
          </p>
        </div>
      ) : null}

      {!error && totalCount > 0 ? (
        <>
          <div className="space-y-3 px-4 py-4 md:space-y-4 md:px-6 md:py-6">
            {pageItems.map((item) => (
              <DownloadHistoryItem
                key={item.id}
                item={item}
                isReDownloading={isReDownloading && reDownloadingId === item.id}
                onReDownload={(downloadItem) => {
                  void handleReDownload(downloadItem);
                }}
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
