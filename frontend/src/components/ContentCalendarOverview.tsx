import { useNavigate } from 'react-router-dom';
import { useContentCalendar } from '../hooks/useContentCalendar';
import type { ContentCalendarItem } from '../types/api';
import ScheduledPostsList from './ScheduledPostsList';

function resolveOwnerName(items: ContentCalendarItem[]): string {
  const fromItem = items.find((item) => item.full_name.trim())?.full_name.trim();

  if (fromItem) {
    const firstName = fromItem.split(' ')[0];
    return firstName || fromItem;
  }

  const stored =
    localStorage.getItem('first_name') ??
    localStorage.getItem('name') ??
    localStorage.getItem('userName');

  if (stored) {
    return stored.split(' ')[0] ?? stored;
  }

  return 'Joseph';
}

function OverviewSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading content calendar overview">
      <span className="sr-only">Loading content calendar</span>
      <div className="h-8 w-3/4 max-w-md animate-pulse rounded bg-white/10 md:h-10" />
      <div className="mt-md h-4 w-full max-w-2xl animate-pulse rounded bg-white/10" />
      <div className="mt-2 h-4 w-5/6 max-w-xl animate-pulse rounded bg-white/10" />
    </div>
  );
}

interface ContentCalendarOverviewProps {
  selectionDisabled?: boolean;
  showError?: boolean;
}

export default function ContentCalendarOverview({
  selectionDisabled = false,
  showError = true,
}: ContentCalendarOverviewProps) {
  const navigate = useNavigate();
  const {
    data,
    loading,
    error,
    refetch,
    createEntry,
    updateEntry,
    removeEntry,
    isSaving,
    isDeleting,
    mutationError,
  } = useContentCalendar();

  const ownerName = resolveOwnerName(data);
  const possessive = ownerName.endsWith('s') || ownerName.endsWith('S')
    ? `${ownerName}\u2019`
    : `${ownerName}\u2019s`;

  return (
    <section
      aria-labelledby={loading ? undefined : 'content-calendar-heading'}
      aria-label={loading ? 'Content calendar' : undefined}
      className="mx-auto w-full max-w-[1180px]"
    >
      {loading ? (
        <OverviewSkeleton />
      ) : (
        <header className="mb-6 md:mb-8">
          <h1
            id="content-calendar-heading"
            className="font-display text-[28px] font-medium leading-[1.12] text-[#F8F2EB] sm:text-[42px] sm:leading-[54px]"
          >
            {possessive} Personal Content Calendar
          </h1>
          <p className="mt-md max-w-[790px] text-lg font-normal leading-7 text-[#B8ADA1]">
            Your personal content calendar designed to grow your business - made
            specifically for you. Drag, drop, edit, and curate your perfect content
            strategy or feel free to use this one already made for you.
          </p>
        </header>
      )}

      {showError && error ? (
        <div
          role="alert"
          className="mb-6 rounded-[12px] border border-[#ff5630]/40 bg-[#ff5630]/10 px-4 py-3 text-[14px] text-[#fdfdfd]"
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

      <div className={loading ? 'mt-6' : undefined}>
        <ScheduledPostsList
          items={data}
          loading={loading}
          createEntry={selectionDisabled ? undefined : createEntry}
          updateEntry={selectionDisabled ? undefined : updateEntry}
          removeEntry={selectionDisabled ? undefined : removeEntry}
          isSaving={isSaving}
          isDeleting={isDeleting}
          mutationError={mutationError}
          onItemClick={
            selectionDisabled
              ? undefined
              : (item: ContentCalendarItem) => {
                  navigate(
                    `/content-calendar/details?id=${encodeURIComponent(item.id)}`,
                  );
                }
          }
        />
      </div>
    </section>
  );
}
