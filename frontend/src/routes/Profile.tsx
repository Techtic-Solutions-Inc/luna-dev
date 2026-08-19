import AppShell from '../components/layout/AppShell';
import ProfilePageHeader from '../components/ProfilePageHeader';
import UserProfileForm from '../components/UserProfileForm';
import { useProfile } from '../hooks/useProfile';

export default function Profile() {
  const { data, loading } = useProfile();

  return (
    <AppShell creditLoading={loading}>
      <div className="mx-auto w-full max-w-[1180px]">
        <ProfilePageHeader profile={data} profileLoading={loading} />
        <UserProfileForm />
      </div>
    </AppShell>
  );
}
