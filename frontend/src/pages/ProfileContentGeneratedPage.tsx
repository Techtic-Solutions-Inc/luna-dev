import { AppLayout } from '@/components/layout/AppLayout';
import { ContentHistoryList } from '@/components/profile/ContentHistoryList';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { useProfile } from '@/hooks/useProfile';

export function ProfileContentGeneratedPage() {
  const { data: profile, loading: profileLoading, apiReady } = useProfile();

  return (
    <AppLayout creditLoading={profileLoading}>
      <div className="mx-auto w-full max-w-[1180px]">
        <ProfileHeader profile={profile} profileLoading={profileLoading && apiReady} />
        <ProfileTabs />
        <ContentHistoryList />
      </div>
    </AppLayout>
  );
}
