import { AppLayout } from '@/components/layout/AppLayout';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileLoadingSkeleton } from '@/components/profile/ProfileLoadingSkeleton';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { useProfile } from '@/hooks/useProfile';
import { getDemoProfile } from '@/utils/display-defaults';

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

  const demoProfile = getDemoProfile();

  return (
    <AppLayout creditLoading={loading}>
      <div className="mx-auto w-full max-w-[1180px]">
        <ProfileHeader
          profile={apiReady ? data : demoProfile}
          profileLoading={loading && apiReady}
        />
        <ProfileTabs />
        {!apiReady ? (
          <ProfileForm
            profile={demoProfile}
            loading={false}
            error={null}
            updateError={null}
            isUpdating={false}
            onSave={async () => undefined}
            onRetry={() => undefined}
            changePassword={async () => undefined}
            isChangingPassword={false}
            changePasswordError={null}
            previewMode
          />
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
