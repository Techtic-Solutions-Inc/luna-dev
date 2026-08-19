import { DownloadIcon } from '@/components/icons';

interface ReDownloadButtonProps {
  id: string;
  title: string;
  isLoading: boolean;
  onReDownload: (id: string) => Promise<void>;
}

export function ReDownloadButton({
  id,
  title,
  isLoading,
  onReDownload,
}: ReDownloadButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onReDownload(id)}
      disabled={isLoading}
      aria-label={`Re-download ${title}`}
      className="focus-ring inline-flex h-10 items-center gap-2 self-start rounded-full border border-primary px-4 text-sm text-primary transition-colors hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-40 sm:self-center"
    >
      <DownloadIcon className="h-4 w-4" aria-hidden="true" />
      {isLoading ? 'Downloading…' : 'Re-download'}
    </button>
  );
}
