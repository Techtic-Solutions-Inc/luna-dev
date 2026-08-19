import { useEffect, useRef } from 'react';
import { CloseIcon } from '@/components/icons';
import type { ContentCalendarEntry } from '@/types/api';
import { ContentDetailPanel } from '@/components/content-calendar/ContentDetailPanel';
import {
  ContentEntryEditor,
  type EditorFormState,
} from '@/components/content-calendar/ContentEntryEditor';
import { DetailErrorState } from '@/components/content-calendar/DetailErrorState';
import { DetailLoadingSkeleton } from '@/components/content-calendar/DetailLoadingSkeleton';
import { inferPlatform, inferPostType } from '@/utils/calendar';
import { trapFocus } from '@/utils/focus-trap';

type DrawerMode = 'details' | 'editor';

interface ContentDetailDrawerProps {
  entry: ContentCalendarEntry | null;
  entries: ContentCalendarEntry[];
  mode: DrawerMode;
  open: boolean;
  loading?: boolean;
  error?: string | null;
  isSaving?: boolean;
  isDeleting?: boolean;
  mutationError?: string | null;
  onClose: () => void;
  onCustomize: () => void;
  onNavigate: (entryId: string) => void;
  onSave: (values: EditorFormState) => Promise<void>;
  onDelete: () => Promise<void>;
  onCancelEdit: () => void;
}

function formatPlatformLabel(entry: ContentCalendarEntry): string {
  const platform = inferPlatform(entry);
  const postType = inferPostType(entry);
  const platformName = platform === 'instagram' ? 'Instagram' : 'Facebook';
  return `${platformName} ${postType}`;
}

export function ContentDetailDrawer({
  entry,
  entries,
  mode,
  open,
  loading = false,
  error = null,
  isSaving = false,
  isDeleting = false,
  mutationError = null,
  onClose,
  onCustomize,
  onNavigate,
  onSave,
  onDelete,
  onCancelEdit,
}: ContentDetailDrawerProps) {
  const drawerRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !drawerRef.current) return;

    closeButtonRef.current?.focus();
    return trapFocus(drawerRef.current);
  }, [open, loading, mode, entry?.id]);

  if (!open) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 bg-black/35"
        aria-label="Close content details overlay"
        onClick={onClose}
      />

      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={loading ? undefined : 'calendar-drawer-title'}
        aria-label={loading ? 'Loading content details' : undefined}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[640px] flex-col overflow-y-auto bg-[#F7F2EC] shadow-[-24px_0_60px_rgba(0,0,0,0.28)]"
      >
        <div className="sticky top-0 z-10 border-b border-[#E5DACE] bg-[#F7F2EC] px-6 py-5 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-3">
              {loading ? (
                <>
                  <div className="h-8 w-3/4 animate-pulse rounded bg-[#E5DACE]" />
                  <div className="h-6 w-32 animate-pulse rounded-full bg-[#EADBCD]" />
                </>
              ) : entry ? (
                <>
                  <h2
                    id="calendar-drawer-title"
                    className="font-display text-[24px] font-medium leading-tight text-[#211815] sm:text-[28px]"
                  >
                    {entry.title}
                  </h2>
                  <span className="inline-flex rounded-full bg-[#EADBCD] px-3 py-1 text-[12px] font-medium text-primary">
                    {formatPlatformLabel(entry)}
                  </span>
                </>
              ) : null}
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close content details"
              className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#322722] transition-colors hover:bg-[#E5DACE]"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 px-6 py-6 sm:px-8 sm:py-8">
          {loading ? (
            <DetailLoadingSkeleton />
          ) : entry ? (
            error ? (
              <DetailErrorState message={error} onClose={onClose} />
            ) : mode === 'editor' ? (
              <ContentEntryEditor
                entry={entry}
                onSave={onSave}
                onDelete={onDelete}
                onCancel={onCancelEdit}
                isSaving={isSaving}
                isDeleting={isDeleting}
                error={mutationError}
              />
            ) : (
              <ContentDetailPanel
                entry={entry}
                entries={entries}
                onCustomize={onCustomize}
                onNavigate={onNavigate}
              />
            )
          ) : null}
        </div>
      </aside>
    </>
  );
}
