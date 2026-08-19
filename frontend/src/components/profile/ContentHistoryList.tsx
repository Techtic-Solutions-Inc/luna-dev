import { useEffect, useMemo, useState } from 'react';
import { ContentHistoryEmptyState } from '@/components/profile/ContentHistoryEmptyState';
import { ContentHistoryItem } from '@/components/profile/ContentHistoryItem';
import { ContentHistoryLoadingSkeleton } from '@/components/profile/ContentHistoryLoadingSkeleton';
import { DEMO_CONTENT_ITEMS, DEFAULT_ANALYTICS } from '@/utils/display-defaults';
import { ErrorBanner } from '@/components/shared/ErrorBanner';
import { PAGE_SIZE, PaginationFooter } from '@/components/shared/PaginationFooter';
import { useProfileContent } from '@/hooks/useProfileContent';

export function ContentHistoryList() {
  const { data, loading, apiReady, error, refetch } = useProfileContent();
  const [page, setPage] = useState(1);

  const listData = apiReady ? data : DEMO_CONTENT_ITEMS;
  const totalCount = apiReady ? data.length : DEFAULT_ANALYTICS.content_generated;

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

  return (
    <section
      aria-labelledby="content-history-heading"
      className="mt-10 rounded-[16px] border border-white/5 bg-profile-surface p-5 md:rounded-[20px] md:p-6"
    >
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2
          id="content-history-heading"
          className="font-display text-[22px] font-medium text-white md:text-[26px]"
        >
          Content History
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

      {apiReady && loading ? <ContentHistoryLoadingSkeleton /> : null}

      {apiReady && error ? (
        <ErrorBanner message={error} onRetry={() => refetch()} />
      ) : null}

      {apiReady && !loading && !error && data.length === 0 ? (
        <ContentHistoryEmptyState />
      ) : null}

      {(!apiReady || (!loading && !error && data.length > 0)) && listData.length > 0 ? (
        <div className="space-y-4">
          {paginatedItems.map((item) => (
            <ContentHistoryItem key={item.id} item={item} />
          ))}

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
