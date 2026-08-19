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

  const handleCopy = async () => {
    if (!content) return;
    await navigator.clipboard.writeText(content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  if (variant === 'inline') {
    return (
      <button
        type="button"
        onClick={handleCopy}
        disabled={!content}
        className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[12px] text-white transition-colors hover:bg-[#b48a5d] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <CopyIcon className="h-3.5 w-3.5" />
        {copied ? 'Copied' : 'Copy Caption'}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={!content}
      className="focus-ring inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm text-white transition-colors hover:bg-[#b48a5d] disabled:cursor-not-allowed disabled:opacity-40"
    >
      <CopyIcon className="h-4 w-4" />
      {copied ? 'Caption copied to clipboard' : 'Copy Caption'}
    </button>
  );
}
