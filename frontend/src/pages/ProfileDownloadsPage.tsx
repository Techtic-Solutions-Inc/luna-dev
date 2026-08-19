import { AppLayout } from '@/components/layout/AppLayout';
import { DownloadHistoryList } from '@/components/profile/DownloadHistoryList';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { useProfile } from '@/hooks/useProfile';

export function ProfileDownloadsPage() {
  const { data: profile, loading: profileLoading } = useProfile();

  return (
    <AppLayout creditLoading={profileLoading}>
      <div className="mx-auto w-full max-w-[1180px]">
        <ProfileHeader profile={profile} profileLoading={profileLoading} />
        <ProfileTabs />
        <DownloadHistoryList />
      </div>
    </AppLayout>
  );
}
