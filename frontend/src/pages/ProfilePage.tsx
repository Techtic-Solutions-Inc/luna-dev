import { AppLayout } from '@/components/layout/AppLayout';
import { ProfileFeatureUnavailableState } from '@/components/profile/ProfileFeatureUnavailableState';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileLoadingSkeleton } from '@/components/profile/ProfileLoadingSkeleton';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { useProfile } from '@/hooks/useProfile';

export function ProfilePage() {
  const {
    data,
    loading,
    apiReady,
    error,
    refetch,
    updateProfile,
    isUpdating,
    updateError,
    changePassword,
    isChangingPassword,
    changePasswordError,
  } = useProfile();

  return (
    <AppLayout creditLoading={loading}>
      <div className="mx-auto w-full max-w-[1180px]">
        <ProfileHeader profile={data} profileLoading={loading && apiReady} />
        <ProfileTabs />
        {!apiReady ? (
          <section
            aria-labelledby="profile-settings-heading"
            className="mt-10 rounded-[16px] border border-white/5 bg-profile-surface p-5 md:rounded-[20px] md:p-6"
          >
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2
                id="profile-settings-heading"
                className="font-display text-[22px] font-medium text-white md:text-[26px]"
              >
                Profile Settings
              </h2>
            </div>
            <ProfileFeatureUnavailableState
              variant="embedded"
              title="Profile unavailable"
              description="Profile settings are not available until the backend API is ready."
            />
          </section>
        ) : (
          <>
            {loading ? <ProfileLoadingSkeleton /> : null}
            <ProfileForm
              profile={data}
              loading={loading}
              error={error}
              updateError={updateError}
              isUpdating={isUpdating}
              onSave={async (values) => {
                await updateProfile(values);
              }}
              onRetry={() => refetch()}
              changePassword={changePassword}
              isChangingPassword={isChangingPassword}
              changePasswordError={changePasswordError}
            />
          </>
        )}
      </div>
    </AppLayout>
  );
}
