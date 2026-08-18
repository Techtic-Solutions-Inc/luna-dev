import { DownloadIcon } from './icons';

interface ReDownloadButtonProps {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export default function ReDownloadButton({
  title,
  loading = false,
  disabled = false,
  onClick,
}: ReDownloadButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-label={`Re-download ${title}`}
      aria-busy={loading || undefined}
      className="focus-ring box-border inline-flex h-10 min-w-[146px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-primary bg-transparent px-4 text-[13px] leading-none text-primary transition-colors duration-150 hover:bg-primary/10 active:bg-primary/15 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <DownloadIcon className="h-3.5 w-3.5" />
      Re-download
    </button>
  );
}
