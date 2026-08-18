import { CopyIcon, DownloadIcon, SlidersIcon } from './icons';

interface ContentManagementActionsProps {
  downloadHref: string;
  disabled?: boolean;
  onCopyCaption: () => void;
  onCustomize: () => void;
}

const actionButtonClass =
  'box-border inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50';

export default function ContentManagementActions({
  downloadHref,
  disabled = false,
  onCopyCaption,
  onCustomize,
}: ContentManagementActionsProps) {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onCustomize}
          disabled={disabled}
          className={`${actionButtonClass} bg-[#1a1919] text-white hover:bg-black`}
          aria-label="Customize. Click Customize to edit the location, market data, images, or branding."
        >
          <SlidersIcon className="h-4 w-4" />
          Customize
        </button>
        <button
          type="button"
          onClick={onCopyCaption}
          disabled={disabled}
          className={`${actionButtonClass} bg-primary text-white hover:bg-[#b48a5d]`}
          aria-label="Copy Caption. Use Copy Caption to quickly copy the text for your social media post."
        >
          <CopyIcon className="h-4 w-4" />
          Copy Caption
        </button>
        {downloadHref ? (
          <a
            href={downloadHref}
            download
            target="_blank"
            rel="noopener noreferrer"
            className={`${actionButtonClass} border border-primary text-primary hover:bg-[#F3E7D8]`}
            aria-label="Download content"
          >
            <DownloadIcon className="h-4 w-4" />
            Download
          </a>
        ) : (
          <button
            type="button"
            disabled
            className={`${actionButtonClass} border border-primary text-primary`}
            aria-label="Download content, no file available"
          >
            <DownloadIcon className="h-4 w-4" />
            Download
          </button>
        )}
      </div>
      <p className="mt-3 max-w-[520px] text-[12px] leading-5 text-[#6F6258]">
        Click Customize to edit the location, market data, images, or branding.
        Use Copy Caption to quickly copy the text for your social media post.
      </p>
    </div>
  );
}
