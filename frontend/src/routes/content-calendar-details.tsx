import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import ContentCalendarDetails from '../components/ContentCalendarDetails';
import ContentCalendarOverview from '../components/ContentCalendarOverview';
import { useContentCalendar } from '../hooks/useContentCalendar';

export default function ContentCalendarDetailsRoute() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const entryId = searchParams.get('id');
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
  } = useContentCalendar({ source: 'entries' });

  const item = useMemo(() => {
    if (data.length === 0) {
      return null;
    }

    if (entryId) {
      return data.find((entry) => entry.id === entryId) ?? null;
    }

    return data[0];
  }, [data, entryId]);

  const notFound = Boolean(entryId) && !loading && data.length > 0 && item === null;

  const handleClose = () => {
    navigate('/content-calendar');
  };

  return (
    <AppShell creditLoading={loading}>
      {error ? (
        <div
          role="alert"
          className="relative z-[60] mb-6 rounded-[12px] border border-[#ff5630]/40 bg-[#ff5630]/10 px-4 py-3 text-[14px] text-[#fdfdfd]"
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
      <div className="relative">
        <div className="pointer-events-none select-none blur-[2px] brightness-[0.7]">
          <ContentCalendarOverview selectionDisabled showError={false} />
        </div>
        <ContentCalendarDetails
          item={item}
          items={data}
          loading={loading}
          error={mutationError}
          isBusy={isSaving || isDeleting}
          isDeleting={isDeleting}
          isSaving={isSaving}
          notFound={notFound}
          onClose={handleClose}
          onCreate={async (body) => {
            const created = await createEntry(body);
            if (created) {
              navigate(
                `/content-calendar/details?id=${encodeURIComponent(created.id)}`,
                { replace: true },
              );
              return true;
            }
            return false;
          }}
          onDelete={async () => {
            if (!item) {
              return false;
            }
            const removed = await removeEntry(item.id);
            if (removed) {
              handleClose();
            }
            return removed;
          }}
          onSave={async (id, body) => {
            const updated = await updateEntry(id, body);
            return Boolean(updated);
          }}
          onSelectItem={(next) => {
            navigate(
              `/content-calendar/details?id=${encodeURIComponent(next.id)}`,
            );
          }}
        />
      </div>
    </AppShell>
  );
}
