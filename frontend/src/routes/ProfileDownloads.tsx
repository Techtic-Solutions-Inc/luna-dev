import AppShell from '../components/layout/AppShell';
import DownloadHistorySection from '../components/DownloadHistorySection';
import ProfilePageHeader from '../components/ProfilePageHeader';
import { useProfileDownloads } from '../hooks/useProfileDownloads';

export default function ProfileDownloads() {
  const { loading } = useProfileDownloads();

  return (
    <AppShell creditLoading={loading}>
      <div className="mx-auto w-full max-w-[1180px]">
        <ProfilePageHeader />
        <DownloadHistorySection />
      </div>
    </AppShell>
  );
}
