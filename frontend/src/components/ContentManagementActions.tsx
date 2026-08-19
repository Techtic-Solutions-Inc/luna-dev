import { ClipboardIcon, DownloadIcon, SlidersIcon } from './icons';

interface ContentManagementActionsProps {
  copied: boolean;
  downloadDisabled?: boolean;
  onCopyCaption: () => void;
  onCustomize: () => void;
  onDownload: () => void;
}

export default function ContentManagementActions({
  copied,
  downloadDisabled = false,
  onCopyCaption,
  onCustomize,
  onDownload,
}: ContentManagementActionsProps) {
  return (
    <>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onCustomize}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-[#0B0B0B] px-5 text-sm text-white transition-colors duration-200 hover:bg-[#2A2A2A] focus-ring"
        >
          <SlidersIcon className="h-4 w-4" />
          Customize
        </button>
        <button
          type="button"
          onClick={onCopyCaption}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm text-white transition-colors duration-200 hover:bg-[#b48a5d] focus-ring"
        >
          <ClipboardIcon className="h-4 w-4" />
          {copied ? 'Copied' : 'Copy Caption'}
        </button>
        <button
          type="button"
          onClick={onDownload}
          disabled={downloadDisabled}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-primary bg-transparent px-5 text-sm text-primary transition-colors duration-200 hover:bg-[#F3E6D6] focus-ring disabled:cursor-not-allowed disabled:opacity-40"
        >
          <DownloadIcon className="h-4 w-4" />
          Download
        </button>
      </div>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Caption copied to clipboard' : ''}
      </span>
    </>
  );
}
