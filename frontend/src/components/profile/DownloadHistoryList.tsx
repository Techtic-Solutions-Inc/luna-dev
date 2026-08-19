import { useEffect, useMemo, useState } from 'react';
import type { ProfileDownloadItem } from '@/types/api';
import { DownloadHistoryItem } from '@/components/profile/DownloadHistoryItem';
import { DownloadsEmptyState } from '@/components/profile/DownloadsEmptyState';
import { DownloadsLoadingSkeleton } from '@/components/profile/DownloadsLoadingSkeleton';
import { DEMO_DOWNLOAD_ITEMS, DEFAULT_ANALYTICS } from '@/utils/display-defaults';
import { ErrorBanner } from '@/components/shared/ErrorBanner';
import { PAGE_SIZE, PaginationFooter } from '@/components/shared/PaginationFooter';
import { useProfileDownloads } from '@/hooks/useProfileDownloads';

export function DownloadHistoryList() {
  const {
    data,
    loading,
    apiReady,
    error,
    refetch,
    reDownload,
    isReDownloading,
    reDownloadingId,
    reDownloadError,
  } = useProfileDownloads();
  const [page, setPage] = useState(1);
  const [localReDownloadError, setLocalReDownloadError] = useState<{
    id: string;
    message: string;
  } | null>(null);

  const listData = apiReady ? data : DEMO_DOWNLOAD_ITEMS;
  const totalCount = apiReady ? data.length : DEFAULT_ANALYTICS.downloads;

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return listData.slice(start, start + PAGE_SIZE);
  }, [listData, page]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(listData.length / PAGE_SIZE));
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [listData.length, page]);

  const handleReDownload = async (id: string) => {
    setLocalReDownloadError(null);

    try {
      const url = await reDownload(id);
      if (!url) {
        setLocalReDownloadError({
          id,
          message: 'Download link was not returned. Please try again.',
        });
        return;
      }

      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = '';
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.click();
    } catch {
      // Mutation error is surfaced via reDownloadError from the hook.
    }
  };

  return (
    <section
      aria-labelledby="download-history-heading"
      className="mt-10 rounded-[16px] border border-white/5 bg-profile-surface p-5 md:rounded-[20px] md:p-6"
    >
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2
          id="download-history-heading"
          className="font-display text-[22px] font-medium text-white md:text-[26px]"
        >
          Download History
        </h2>
        {apiReady && loading ? (
          <div
            className="h-8 w-14 animate-pulse rounded bg-white/10 md:h-9 md:w-16"
            aria-hidden="true"
          />
        ) : (
          <p className="font-display text-[28px] font-medium text-primary md:text-[32px]">
            {totalCount}
          </p>
        )}
      </div>

      {apiReady && loading ? <DownloadsLoadingSkeleton /> : null}

      {apiReady && error ? (
        <ErrorBanner message={error} onRetry={() => refetch()} />
      ) : null}

      {apiReady && !loading && !error && data.length === 0 ? (
        <DownloadsEmptyState />
      ) : null}

      {(!apiReady || (!loading && !error && data.length > 0)) && listData.length > 0 ? (
        <div className="space-y-4">
          {paginatedItems.map((item: ProfileDownloadItem) => {
            const rowReDownloadError =
              reDownloadError && reDownloadingId === item.id
                ? reDownloadError
                : localReDownloadError?.id === item.id
                  ? localReDownloadError.message
                  : null;

            return (
              <DownloadHistoryItem
                key={item.id}
                item={item}
                isReDownloading={isReDownloading && reDownloadingId === item.id}
                reDownloadError={rowReDownloadError}
                onReDownload={apiReady ? handleReDownload : async () => undefined}
              />
            );
          })}

          <PaginationFooter
            page={page}
            total={apiReady ? data.length : totalCount}
            onPageChange={setPage}
          />
        </div>
      ) : null}
    </section>
  );
}
