import { useEffect, useState, type FormEvent } from 'react';
import {
  inferPlatform,
  inferPostType,
  mediaImageUrl,
  type CalendarEditorState,
} from '../lib/contentCalendarDisplay';
import type { ContentCalendarItem } from '../types/api';
import ContentManagementActions from './ContentManagementActions';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardIcon,
  CloseIcon,
  ImageIcon,
} from './icons';

const fieldClassName =
  'box-border h-12 w-full rounded-full border border-[#E0D1C0] bg-white px-4 text-sm text-[#231A17] [color-scheme:light] transition-colors duration-200 placeholder:text-[#A69789] hover:border-primary focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

const textareaClassName =
  'box-border min-h-24 w-full rounded-[20px] border border-[#E0D1C0] bg-white px-4 py-3 text-sm text-[#231A17] transition-colors duration-200 placeholder:text-[#A69789] hover:border-primary focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

interface ContentCalendarDetailsProps {
  view: 'details' | 'editor';
  item: ContentCalendarItem | null;
  items: ContentCalendarItem[];
  editor: CalendarEditorState;
  error: string | null;
  isBusy: boolean;
  isDeleting: boolean;
  isSaving: boolean;
  onClose: () => void;
  onCustomize: () => void;
  onSelectItem: (item: ContentCalendarItem) => void;
  onDelete: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onUpdateEditor: (value: CalendarEditorState) => void;
}

function platformLabel(item: ContentCalendarItem): string {
  const platform = inferPlatform(item);
  const postType = inferPostType(item);
  const brand = platform === 'instagram' ? 'Instagram' : 'Facebook';
  return `${brand} ${postType}`;
}

async function copyText(value: string): Promise<boolean> {
  if (!value) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

export default function ContentCalendarDetails({
  view,
  item,
  items,
  editor,
  error,
  isBusy,
  isDeleting,
  isSaving,
  onClose,
  onCustomize,
  onSelectItem,
  onDelete,
  onSubmit,
  onUpdateEditor,
}: ContentCalendarDetailsProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <>
      <button
        type="button"
        aria-label="Close panel"
        className="fixed inset-0 z-40 bg-black/45 transition-colors duration-200 focus-visible:outline-none"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="calendar-drawer-title"
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[640px] flex-col bg-[#F7F2EC] text-[#211815] shadow-[-24px_0_60px_rgba(0,0,0,0.28)]"
      >
        {view === 'editor' ? (
          <EditorView
            editor={editor}
            error={error}
            isBusy={isBusy}
            isDeleting={isDeleting}
            isSaving={isSaving}
            onClose={onClose}
            onDelete={onDelete}
            onSubmit={onSubmit}
            onUpdateEditor={onUpdateEditor}
          />
        ) : item ? (
          <DetailsView
            item={item}
            items={items}
            onClose={onClose}
            onCustomize={onCustomize}
            onSelectItem={onSelectItem}
          />
        ) : null}
      </aside>
    </>
  );
}

function DetailsView({
  item,
  items,
  onClose,
  onCustomize,
  onSelectItem,
}: {
  item: ContentCalendarItem;
  items: ContentCalendarItem[];
  onClose: () => void;
  onCustomize: () => void;
  onSelectItem: (item: ContentCalendarItem) => void;
}) {
  const [copied, setCopied] = useState(false);
  const image = mediaImageUrl(item.link);
  const caption = item.content.trim();
  const about = item.description.trim();
  const currentIndex = Math.max(
    0,
    items.findIndex((entry) => entry.id === item.id),
  );
  const total = Math.max(items.length, 1);
  const canCycle = items.length > 1;

  const go = (direction: -1 | 1) => {
    if (!canCycle) {
      return;
    }

    const nextIndex = (currentIndex + direction + items.length) % items.length;
    const nextItem = items[nextIndex];
    if (nextItem) {
      onSelectItem(nextItem);
    }
  };

  const onCopy = async () => {
    const ok = await copyText(caption || about);
    setCopied(ok);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const onDownload = () => {
    const href = item.link.trim();
    if (!href) {
      return;
    }

    const anchor = document.createElement('a');
    anchor.href = href;
    anchor.target = '_blank';
    anchor.rel = 'noreferrer';
    const filename = href.split('/').pop();
    if (filename) {
      anchor.download = filename;
    }
    anchor.click();
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 px-8 pt-8 sm:px-10">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2
              id="calendar-drawer-title"
              className="font-display text-[32px] font-medium leading-[1.12] text-[#211815]"
            >
              {item.title}
            </h2>
            <p className="mt-3 inline-flex h-7 items-center rounded-full bg-[#EADBCD] px-3 text-[12px] text-[#C8A47E]">
              {platformLabel(item)}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close content details"
            className="rounded-full p-2 text-[#211815] transition-colors duration-200 hover:bg-[#ECDDCC] focus-ring"
            onClick={onClose}
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 h-px bg-[#E5DACE]" />

        <ContentManagementActions
          copied={copied}
          downloadDisabled={!item.link.trim()}
          onCustomize={onCustomize}
          onCopyCaption={() => void onCopy()}
          onDownload={onDownload}
        />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-8 pb-10 pt-6 sm:px-10">
        <div className="rounded-[28px] bg-[#EFE4D9] px-4 py-6 sm:px-8">
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous scheduled post"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#211815] transition-colors duration-200 hover:bg-[#E4D3C0] focus-ring disabled:opacity-30"
              onClick={() => go(-1)}
              disabled={!canCycle}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <div className="relative aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded-[18px] bg-[#D8C4AE]">
              {image ? (
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <ImageIcon className="h-10 w-10 text-[#A88B6C]" />
                </div>
              )}
            </div>
            <button
              type="button"
              aria-label="Next scheduled post"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#211815] transition-colors duration-200 hover:bg-[#E4D3C0] focus-ring disabled:opacity-30"
              onClick={() => go(1)}
              disabled={!canCycle}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-4 text-center text-[13px] text-[#211815]">
            {currentIndex + 1}/{total}
          </p>
        </div>

        {about ? (
          <section className="mt-8">
            <h3 className="font-display text-[26px] font-medium text-[#211815]">
              About This Template
            </h3>
            <p className="mt-3 text-[15px] leading-6 text-[#6B645E]">{about}</p>
          </section>
        ) : null}

        <section className="mt-8 rounded-[20px] bg-[#0B0B0B] px-6 py-6 sm:px-8">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-[24px] font-medium text-white">
              Caption
            </h3>
            <button
              type="button"
              onClick={() => void onCopy()}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-[13px] text-white transition-colors duration-200 hover:bg-[#b48a5d] focus-ring"
            >
              <ClipboardIcon className="h-3.5 w-3.5" />
              Copy Caption
            </button>
          </div>
          <div className="mt-5 h-px bg-[#2A2A2A]" />
          <p className="mt-5 text-[14px] leading-6 text-[#A0A0A0]">
            {caption || 'No caption has been added for this post yet.'}
          </p>
        </section>
      </div>
    </div>
  );
}

function EditorView({
  editor,
  error,
  isBusy,
  isDeleting,
  isSaving,
  onClose,
  onDelete,
  onSubmit,
  onUpdateEditor,
}: {
  editor: CalendarEditorState;
  error: string | null;
  isBusy: boolean;
  isDeleting: boolean;
  isSaving: boolean;
  onClose: () => void;
  onDelete: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onUpdateEditor: (value: CalendarEditorState) => void;
}) {
  const setField = <Key extends keyof CalendarEditorState>(
    key: Key,
    value: CalendarEditorState[Key],
  ) => {
    onUpdateEditor({ ...editor, [key]: value });
  };

  return (
    <form className="flex h-full min-h-0 flex-col" onSubmit={onSubmit}>
      <div className="flex items-start justify-between gap-3 border-b border-[#E5DACE] px-8 py-6 sm:px-10">
        <div>
          <h2
            id="calendar-drawer-title"
            className="font-display text-[22px] text-[#211815]"
          >
            {editor.id ? 'Edit scheduled post' : 'Create scheduled post'}
          </h2>
          <p className="mt-1 text-sm text-[#76675B]">
            Drag, drop, edit, and curate your perfect content strategy.
          </p>
        </div>
        <button
          type="button"
          aria-label="Close content editor"
          className="rounded-full p-2 text-[#5A4940] transition-colors duration-200 hover:bg-[#ECDDCC] focus-ring"
          onClick={onClose}
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-8 py-6 sm:px-10">
        <label className="block text-sm text-[#6F6258]">
          Content title
          <input
            className={`mt-2 ${fieldClassName}`}
            value={editor.title}
            required
            onChange={(event) => setField('title', event.target.value)}
          />
        </label>
        <label className="block text-sm text-[#6F6258]">
          Scheduled time
          <input
            className={`mt-2 ${fieldClassName}`}
            type="datetime-local"
            value={editor.date}
            required
            onChange={(event) => setField('date', event.target.value)}
          />
        </label>
        <label className="block text-sm text-[#6F6258]">
          Image or post link
          <input
            className={`mt-2 ${fieldClassName}`}
            value={editor.link}
            onChange={(event) => setField('link', event.target.value)}
          />
        </label>
        <label className="block text-sm text-[#6F6258]">
          Description
          <textarea
            className={`mt-2 ${textareaClassName}`}
            value={editor.description}
            onChange={(event) => setField('description', event.target.value)}
          />
        </label>
        <label className="block text-sm text-[#6F6258]">
          Caption
          <textarea
            className={`mt-2 ${textareaClassName}`}
            value={editor.content}
            onChange={(event) => setField('content', event.target.value)}
          />
        </label>
        <label className="block text-sm text-[#6F6258]">
          Full name
          <input
            className={`mt-2 ${fieldClassName}`}
            value={editor.full_name}
            onChange={(event) => setField('full_name', event.target.value)}
          />
        </label>
        <label className="block text-sm text-[#6F6258]">
          Phone
          <input
            className={`mt-2 ${fieldClassName}`}
            value={editor.phone}
            onChange={(event) => setField('phone', event.target.value)}
          />
        </label>

        {error ? (
          <p
            role="alert"
            className="rounded-[16px] border border-[#D4A4A1] bg-[#FFF2F1] px-4 py-3 text-sm text-[#8D312A]"
          >
            {error}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-3 border-t border-[#E5DACE] px-8 py-5 sm:px-10">
        <button
          type="submit"
          disabled={isBusy || !editor.date}
          className="inline-flex h-11 min-w-[152px] items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-[#FFF8F1] transition-colors duration-200 hover:bg-[#b48a5d] focus-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? 'Saving' : editor.id ? 'Save changes' : 'Create entry'}
        </button>
        {editor.id ? (
          <button
            type="button"
            onClick={onDelete}
            disabled={isBusy}
            className="inline-flex h-11 min-w-[152px] items-center justify-center rounded-full border border-[#C78272] bg-transparent px-5 text-sm font-medium text-[#AD5449] transition-colors duration-200 hover:bg-[#FFF0EE] focus-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? 'Deleting' : 'Delete entry'}
          </button>
        ) : null}
      </div>
    </form>
  );
}

export function ContentCalendarDetailsSkeleton({
  onClose,
}: {
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <>
      <button
        type="button"
        aria-label="Close panel"
        className="fixed inset-0 z-40 bg-black/45 transition-colors duration-200 focus-visible:outline-none"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-busy="true"
        aria-label="Loading content details"
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[640px] flex-col bg-[#F7F2EC] text-[#211815] shadow-[-24px_0_60px_rgba(0,0,0,0.28)]"
      >
        <span className="sr-only">Loading content details</span>
        <div className="px-8 pt-8 sm:px-10">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1 space-y-3">
              <div className="h-9 w-4/5 max-w-md animate-pulse rounded bg-[#E5DACE]" />
              <div className="h-7 w-28 animate-pulse rounded-full bg-[#EADBCD]" />
            </div>
            <button
              type="button"
              aria-label="Close content details"
              className="rounded-full p-2 text-[#211815] transition-colors duration-200 hover:bg-[#ECDDCC] focus-ring"
              onClick={onClose}
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-6 h-px bg-[#E5DACE]" />
          <div className="mt-5 flex flex-wrap gap-3">
            <div className="h-11 w-32 animate-pulse rounded-full bg-[#D8CEC1]" />
            <div className="h-11 w-36 animate-pulse rounded-full bg-[#D8CEC1]" />
            <div className="h-11 w-28 animate-pulse rounded-full bg-[#E5DACE]" />
          </div>
        </div>
        <div className="flex-1 px-8 pb-10 pt-6 sm:px-10">
          <div className="rounded-[28px] bg-[#EFE4D9] px-4 py-6 sm:px-8">
            <div className="mx-auto aspect-[9/16] w-full max-w-[280px] animate-pulse rounded-[18px] bg-[#D8C4AE]" />
          </div>
          <div className="mt-8 space-y-3">
            <div className="h-7 w-56 animate-pulse rounded bg-[#E5DACE]" />
            <div className="h-4 w-full animate-pulse rounded bg-[#E5DACE]" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-[#E5DACE]" />
          </div>
          <div className="mt-8 h-40 animate-pulse rounded-[20px] bg-[#2A2A2A]" />
        </div>
      </aside>
    </>
  );
}
