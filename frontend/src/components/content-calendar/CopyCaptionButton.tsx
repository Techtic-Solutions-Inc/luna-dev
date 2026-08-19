import { useState } from 'react';
import { CopyIcon } from '@/components/icons';

interface CopyCaptionButtonProps {
  content: string;
  variant?: 'primary' | 'inline';
}

export function CopyCaptionButton({
  content,
  variant = 'primary',
}: CopyCaptionButtonProps) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  const handleCopy = async () => {
    if (!content) return;
    setCopyError(null);

    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError('Unable to copy. Check clipboard permissions and try again.');
    }
  };

  if (variant === 'inline') {
    return (
      <span className="relative inline-block">
        <button
          type="button"
          onClick={handleCopy}
          disabled={!content}
          aria-describedby={copyError ? 'copy-caption-error-inline' : undefined}
          className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[12px] text-white transition-colors hover:bg-[#b48a5d] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CopyIcon className="h-3.5 w-3.5" />
          {copied ? 'Copied' : 'Copy Caption'}
        </button>
        {copyError ? (
          <span
            id="copy-caption-error-inline"
            className="absolute right-0 top-full z-10 mt-1 max-w-[min(100vw-2rem,280px)] text-right text-[11px] text-destructive"
            role="alert"
          >
            {copyError}
          </span>
        ) : null}
      </span>
    );
  }

  return (
    <span className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={handleCopy}
        disabled={!content}
        aria-describedby={copyError ? 'copy-caption-error-primary' : undefined}
        className="focus-ring inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm text-white transition-colors hover:bg-[#b48a5d] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <CopyIcon className="h-4 w-4" />
        {copied ? 'Caption copied to clipboard' : 'Copy Caption'}
      </button>
      {copyError ? (
        <span
          id="copy-caption-error-primary"
          className="text-[12px] text-destructive"
          role="alert"
        >
          {copyError}
        </span>
      ) : null}
    </span>
  );
}
