import { useEffect, useId, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-color-101/70 px-4 pt-32" role="presentation">
      <button type="button" className="absolute inset-0 cursor-default" aria-label="Close search" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${inputId}-title`}
        className="relative z-10 w-full max-w-xl rounded-24 border border-white/10 bg-color-106 p-6 shadow-lift"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id={`${inputId}-title`} className="font-serif text-2xl text-white">
            Search Agentwise
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95"
            aria-label="Close search"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <label htmlFor={inputId} className="sr-only">
          Search
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-color-135" aria-hidden="true" />
          <input
            ref={inputRef}
            id={inputId}
            type="search"
            name="q"
            placeholder="Search content, blog posts, and plans"
            className="field-input pl-11"
          />
        </div>
      </div>
    </div>
  );
}
