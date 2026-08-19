import { DownloadIcon } from './icons';

interface ReDownloadButtonProps {
  title: string;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
}

export default function ReDownloadButton({
  title,
  disabled = false,
  loading = false,
  onClick,
}: ReDownloadButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/70 px-4 py-2 text-[13px] font-medium text-primary transition-colors hover:border-primary hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50 md:px-5 md:py-2.5 md:text-[14px]"
      aria-label={`Re-download ${title}`}
      aria-busy={loading}
    >
      <DownloadIcon className="h-4 w-4" />
      {loading ? 'Downloading…' : 'Re-download'}
    </button>
  );
}
