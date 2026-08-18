import DownloadHistoryList from '../components/DownloadHistoryList';
import ProfileLayout from '../components/ProfileLayout';
import { useProfileDownloads } from '../hooks/useProfileDownloads';

export default function ProfileDownloadsRoute() {
  const {
    data,
    total,
    loading,
    error,
    refetch,
    reDownload,
    reDownloadingId,
    mutationError,
  } = useProfileDownloads();

  const alertMessage = error ?? mutationError;

  return (
    <ProfileLayout creditLoading={loading}>
      {alertMessage ? (
        <div
          role="alert"
          className="mb-6 rounded-[12px] border border-[#ff5630]/40 bg-[#ff5630]/10 px-4 py-3 text-[14px] text-[#fdfdfd]"
        >
          <p>{alertMessage}</p>
          {error ? (
            <button
              type="button"
              onClick={() => void refetch()}
              className="focus-ring mt-2 rounded-sm text-[14px] text-primary underline-offset-2 hover:underline"
            >
              Try again
            </button>
          ) : null}
        </div>
      ) : null}

      <DownloadHistoryList
        items={error ? [] : data}
        total={error ? 0 : total}
        loading={loading}
        suppressEmpty={Boolean(error)}
        reDownloadingId={reDownloadingId}
        onReDownload={(item) => {
          void reDownload(item.id);
        }}
      />
    </ProfileLayout>
  );
}
