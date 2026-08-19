import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContentCalendarHeader } from '@/components/content-calendar/ContentCalendarHeader';
import { CalendarLoadingSkeleton } from '@/components/content-calendar/CalendarLoadingSkeleton';
import { WeeklyCalendarGrid } from '@/components/content-calendar/WeeklyCalendarGrid';
import { ContentDetailDrawer } from '@/components/content-calendar/ContentDetailDrawer';
import { useContentCalendar } from '@/hooks/useContentCalendar';
import { getDemoCalendarEntries } from '@/utils/display-defaults';
import type { EditorFormState } from '@/components/content-calendar/ContentEntryEditor';

type DrawerMode = 'details' | 'editor';

interface ContentCalendarContentProps {
  selectedEntryId?: string;
  onCloseDetails?: () => void;
}

export function ContentCalendarContent({
  selectedEntryId,
  onCloseDetails,
}: ContentCalendarContentProps) {
  const navigate = useNavigate();
  const {
    data,
    loading,
    error,
    updateEntry,
    removeEntry,
    isSaving,
    isDeleting,
    mutationError,
  } = useContentCalendar();

  const [anchorDate, setAnchorDate] = useState(() => new Date(2026, 5, 1));
  const [drawerMode, setDrawerMode] = useState<DrawerMode>('details');
  const [activeEntryId, setActiveEntryId] = useState<string | null>(
    selectedEntryId ?? null,
  );

  const displayEntries = useMemo(() => {
    if (data.length > 0) return data;
    if (error) return getDemoCalendarEntries();
    return data;
  }, [data, error]);

  const activeEntry = useMemo(
    () => displayEntries.find((entry) => entry.id === activeEntryId) ?? null,
    [activeEntryId, displayEntries],
  );

  useEffect(() => {
    if (selectedEntryId) {
      setActiveEntryId(selectedEntryId);
      setDrawerMode('details');
    }
  }, [selectedEntryId]);

  useEffect(() => {
    if (!loading && !error && activeEntryId && !activeEntry) {
      setActiveEntryId(null);
      setDrawerMode('details');
      onCloseDetails?.();
      navigate('/content-calendar');
    }
  }, [loading, error, activeEntryId, activeEntry, navigate, onCloseDetails]);

  const handleCloseDrawer = () => {
    setActiveEntryId(null);
    setDrawerMode('details');
    onCloseDetails?.();
  };

  const handleNavigateEntry = (entryId: string) => {
    setActiveEntryId(entryId);
    setDrawerMode('details');
    navigate(`/content-calendar/details/${entryId}`);
  };

  const handleSave = async (values: EditorFormState) => {
    if (!activeEntry) return;

    const updated = await updateEntry({
      id: activeEntry.id,
      body: {
        title: values.title,
        date: new Date(values.date).toISOString(),
        content: values.content,
        description: values.description,
        full_name: values.full_name,
        phone: values.phone,
        link: values.link || undefined,
      },
    });

    if (updated) {
      setActiveEntryId(updated.id);
      setDrawerMode('details');
      navigate(`/content-calendar/details/${updated.id}`);
    }
  };

  const handleDelete = async () => {
    if (!activeEntry) return;

    try {
      await removeEntry(activeEntry.id);
      handleCloseDrawer();
      navigate('/content-calendar');
    } catch {
      // mutationError surfaces in the drawer
    }
  };

  return (
    <section
      aria-labelledby={loading ? undefined : 'content-calendar-heading'}
      aria-label={loading ? 'Content calendar' : undefined}
      className="mx-auto w-full max-w-[1180px]"
    >
      {loading ? (
        <CalendarLoadingSkeleton />
      ) : (
        <>
          <ContentCalendarHeader />

          <WeeklyCalendarGrid
            entries={displayEntries}
            anchorDate={anchorDate}
            onAnchorDateChange={setAnchorDate}
          />
        </>
      )}

      {activeEntryId ? (
        <ContentDetailDrawer
          entry={activeEntry}
          entries={displayEntries}
          mode={drawerMode}
          open
          loading={loading && !activeEntry}
          error={!loading && !activeEntry ? error : null}
          isSaving={isSaving}
          isDeleting={isDeleting}
          mutationError={mutationError}
          onClose={handleCloseDrawer}
          onCustomize={() => setDrawerMode('editor')}
          onNavigate={handleNavigateEntry}
          onSave={handleSave}
          onDelete={handleDelete}
          onCancelEdit={() => setDrawerMode('details')}
        />
      ) : null}
    </section>
  );
}
