import { AppLayout } from '@/components/layout/AppLayout';
import { DownloadHistoryList } from '@/components/profile/DownloadHistoryList';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { useProfile } from '@/hooks/useProfile';
import { getDemoProfile } from '@/utils/display-defaults';

export function ProfileDownloadsPage() {
  const { data: profile, loading: profileLoading, apiReady } = useProfile();
  const displayProfile = apiReady ? profile : getDemoProfile();

  return (
    <AppLayout creditLoading={profileLoading}>
      <div className="mx-auto w-full max-w-[1180px]">
        <ProfileHeader profile={displayProfile} profileLoading={profileLoading && apiReady} />
        <ProfileTabs />
        <DownloadHistoryList />
      </div>
    </AppLayout>
  );
}
