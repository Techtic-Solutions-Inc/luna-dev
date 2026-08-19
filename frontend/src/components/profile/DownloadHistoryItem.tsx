import { DocumentIcon } from '@/components/icons';
import type { ProfileDownloadItem } from '@/types/api';
import { formatDownloadDate } from '@/utils/calendar';
import { formatFileSize } from '@/lib/api/profile-downloads';
import { ReDownloadButton } from '@/components/profile/ReDownloadButton';

interface DownloadHistoryItemProps {
  item: ProfileDownloadItem;
  isReDownloading: boolean;
  reDownloadError?: string | null;
  onReDownload: (id: string) => Promise<void>;
}

function buildMetadata(item: ProfileDownloadItem): string {
  const parts: string[] = [];

  if (item.file_type) {
    parts.push(item.file_type);
  }

  if (item.size) {
    parts.push(formatFileSize(item.size));
  }

  if (item.downloaded_at) {
    parts.push(formatDownloadDate(item.downloaded_at));
  }

  return parts.join(' · ');
}

export function DownloadHistoryItem({
  item,
  isReDownloading,
  reDownloadError,
  onReDownload,
}: DownloadHistoryItemProps) {
  const metadata = buildMetadata(item);

  return (
    <article className="flex flex-col gap-4 rounded-[12px] border border-white/5 bg-[#26231f] p-4 md:p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2f271f] text-primary">
          <DocumentIcon className="h-4 w-4" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-medium leading-5 text-white">
            {item.title}
          </h3>
          {metadata ? (
            <p className="mt-1 text-[13px] leading-5 text-[#A6A4A2]">{metadata}</p>
          ) : null}
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
        <ReDownloadButton
          id={item.id}
          title={item.title}
          isLoading={isReDownloading}
          onReDownload={onReDownload}
        />
        {reDownloadError ? (
          <p className="max-w-[220px] text-[12px] leading-4 text-[#ff5630]" role="alert">
            {reDownloadError}
          </p>
        ) : null}
      </div>
    </article>
  );
}
