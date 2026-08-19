import { DownloadIcon } from '@/components/icons';

interface DownloadButtonProps {
  link: string | null;
}

export function DownloadButton({ link }: DownloadButtonProps) {
  const disabled = !link;

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        title="No download link available"
        className="focus-ring inline-flex h-11 items-center gap-2 rounded-full border border-primary/40 px-5 text-sm text-primary opacity-40"
      >
        <DownloadIcon className="h-4 w-4" />
        Download
      </button>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      download
      className="focus-ring inline-flex h-11 items-center gap-2 rounded-full border border-primary px-5 text-sm text-primary transition-colors hover:bg-primary/10"
    >
      <DownloadIcon className="h-4 w-4" />
      Download
    </a>
  );
}
