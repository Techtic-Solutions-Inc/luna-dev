import AppShell from '../components/layout/AppShell';
import ContentHistorySection from '../components/ContentHistorySection';
import ProfilePageHeader from '../components/ProfilePageHeader';
import { useProfileContent } from '../hooks/useProfileContent';

export default function ProfileContentGenerated() {
  const { loading } = useProfileContent();

  return (
    <AppShell creditLoading={loading}>
      <div className="mx-auto w-full max-w-[1180px]">
        <ProfilePageHeader />
        <ContentHistorySection />
      </div>
    </AppShell>
  );
}
