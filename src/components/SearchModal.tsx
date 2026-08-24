import { useEffect, useId, useRef } from 'react';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }
    inputRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-color-105/80 px-4 pt-24"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-xl rounded-16 bg-color-103 p-section-pad shadow-panel"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={titleId} className="font-garamond text-2xl text-white">
          Search Agentwise
        </h2>
        <form
          className="mt-gap-16"
          onSubmit={(event) => {
            event.preventDefault();
            onClose();
          }}
        >
          <label htmlFor="home-search" className="sr-only">
            Search
          </label>
          <input
            ref={inputRef}
            id="home-search"
            name="q"
            type="search"
            className="field-input"
            placeholder="Search content, blog, and pricing"
          />
          <div className="mt-gap-16 flex justify-end gap-gap-12">
            <button type="button" className="btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
