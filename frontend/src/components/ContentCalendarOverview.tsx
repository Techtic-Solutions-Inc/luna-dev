import { useState } from 'react';
import { useContentCalendar } from '../hooks/useContentCalendar';
import CalendarComponent from './CalendarComponent';
import ScheduledPostsList from './ScheduledPostsList';
import type { ContentCalendarPayload } from '../types/api';

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

export default function ContentCalendarOverview() {
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
  const [forceEditor, setForceEditor] = useState(false);

  const onCreateEmpty = () => {
    setForceEditor(true);
  };

  const wrappedCreate = async (body: ContentCalendarPayload) => {
    const created = await createEntry(body);
    if (created) {
      setForceEditor(false);
    }
    return created;
  };

  const sharedCalendarProps = {
    items: data,
    updateEntry,
    removeEntry,
    isSaving,
    isDeleting,
    mutationError,
  };

  const renderCalendar = () => {
    if (error && data.length === 0 && !loading && !forceEditor) {
      return null;
    }

    if (forceEditor && data.length === 0 && !loading) {
      return (
        <CalendarComponent
          {...sharedCalendarProps}
          createEntry={wrappedCreate}
          initialCreateOpen
          onEditorClosed={() => setForceEditor(false)}
        />
      );
    }

    return (
      <ScheduledPostsList
        {...sharedCalendarProps}
        loading={loading}
        createEntry={createEntry}
        onCreate={onCreateEmpty}
      />
    );
  };

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
            Joseph’s Personal Content Calendar
          </h1>
          <p className="mt-md max-w-[790px] text-lg font-normal leading-7 text-[#B8ADA1]">
            Your personal content calendar designed to grow your business - made
            specifically for you. Drag, drop, edit, and curate your perfect
            content strategy or feel free to use this one already made for you.
          </p>
        </header>
      )}

      {error ? (
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
        {renderCalendar()}
      </div>
    </section>
  );
}
