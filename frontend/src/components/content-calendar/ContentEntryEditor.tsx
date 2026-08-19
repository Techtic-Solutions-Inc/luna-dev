import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { ContentCalendarEntry } from '@/types/api';
import {
  FormField,
  inputClassName,
  textareaClassName,
} from '@/components/shared/FormField';
import { toDatetimeLocalValue } from '@/utils/calendar';

export interface EditorFormState {
  title: string;
  date: string;
  content: string;
  description: string;
  full_name: string;
  phone: string;
  link: string;
}

interface ContentEntryEditorProps {
  entry: ContentCalendarEntry;
  onSave: (values: EditorFormState) => Promise<void>;
  onDelete: () => Promise<void>;
  onCancel: () => void;
  isSaving?: boolean;
  isDeleting?: boolean;
  error?: string | null;
}

function buildInitialState(entry: ContentCalendarEntry): EditorFormState {
  const date = new Date(entry.date);
  return {
    title: entry.title,
    date: Number.isNaN(date.getTime())
      ? ''
      : toDatetimeLocalValue(date),
    content: entry.content,
    description: entry.description,
    full_name: entry.full_name,
    phone: entry.phone,
    link: entry.link ?? '',
  };
}

export function ContentEntryEditor({
  entry,
  onSave,
  onDelete,
  onCancel,
  isSaving = false,
  isDeleting = false,
  error = null,
}: ContentEntryEditorProps) {
  const [values, setValues] = useState<EditorFormState>(() => buildInitialState(entry));
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof EditorFormState, string>>>({});
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValues(buildInitialState(entry));
    firstFieldRef.current?.focus();
  }, [entry]);

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof EditorFormState, string>> = {};

    if (!values.title.trim()) nextErrors.title = 'Title is required';
    if (!values.date) nextErrors.date = 'Date is required';
    if (!values.content.trim()) nextErrors.content = 'Content is required';
    if (!values.full_name.trim()) nextErrors.full_name = 'Full name is required';
    if (!values.phone.trim()) nextErrors.phone = 'Phone is required';

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    await onSave(values);
  };

  const handleDelete = async () => {
    try {
      await onDelete();
    } catch {
      // Parent surfaces mutationError
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField id="editor-title" label="Title" error={fieldErrors.title}>
        <input
          ref={firstFieldRef}
          id="editor-title"
          value={values.title}
          onChange={(event) =>
            setValues((current) => ({ ...current, title: event.target.value }))
          }
          className={inputClassName}
        />
      </FormField>

      <FormField id="editor-date" label="Scheduled date" error={fieldErrors.date}>
        <input
          id="editor-date"
          type="datetime-local"
          value={values.date}
          onChange={(event) =>
            setValues((current) => ({ ...current, date: event.target.value }))
          }
          className={`${inputClassName} [color-scheme:light]`}
        />
      </FormField>

      <FormField id="editor-content" label="Caption" error={fieldErrors.content}>
        <textarea
          id="editor-content"
          value={values.content}
          onChange={(event) =>
            setValues((current) => ({ ...current, content: event.target.value }))
          }
          className={textareaClassName}
        />
      </FormField>

      <FormField id="editor-description" label="Description">
        <textarea
          id="editor-description"
          value={values.description}
          onChange={(event) =>
            setValues((current) => ({ ...current, description: event.target.value }))
          }
          className={textareaClassName}
        />
      </FormField>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField id="editor-full-name" label="Full name" error={fieldErrors.full_name}>
          <input
            id="editor-full-name"
            value={values.full_name}
            onChange={(event) =>
              setValues((current) => ({ ...current, full_name: event.target.value }))
            }
            className={inputClassName}
          />
        </FormField>

        <FormField id="editor-phone" label="Phone" error={fieldErrors.phone}>
          <input
            id="editor-phone"
            value={values.phone}
            onChange={(event) =>
              setValues((current) => ({ ...current, phone: event.target.value }))
            }
            className={inputClassName}
          />
        </FormField>
      </div>

      <FormField id="editor-link" label="Media link">
        <input
          id="editor-link"
          value={values.link}
          onChange={(event) =>
            setValues((current) => ({ ...current, link: event.target.value }))
          }
          className={inputClassName}
        />
      </FormField>

      {error ? (
        <p className="text-sm text-[#8D312A]" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting || isSaving}
          className="focus-ring rounded-full border border-[#C78272]/30 px-5 py-2.5 text-sm text-[#AD5449] transition-colors hover:bg-[#FFF0EE] disabled:opacity-40"
        >
          {isDeleting ? 'Deleting…' : 'Delete'}
        </button>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving || isDeleting}
            className="focus-ring rounded-full bg-[#646261] px-5 py-2.5 text-sm text-white transition-colors hover:bg-[#858585] disabled:opacity-40"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving || isDeleting}
            className="focus-ring rounded-full bg-primary px-5 py-2.5 text-sm text-white transition-colors hover:bg-[#b48a5d] disabled:opacity-40"
          >
            {isSaving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </form>
  );
}
