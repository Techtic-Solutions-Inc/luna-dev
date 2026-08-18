import ProfileLayout from '../components/ProfileLayout';
import UserProfileForm from '../components/UserProfileForm';
import { useProfile } from '../hooks/useProfile';

export default function ProfileRoute() {
  const {
    data,
    loading,
    error,
    refetch,
    updateProfile,
    changePassword,
    isSaving,
    isChangingPassword,
    mutationError,
    passwordError,
    fieldErrors,
    passwordFieldErrors,
    successMessage,
    passwordSuccessMessage,
  } = useProfile();

  const alertMessage = error ?? mutationError;
  const displayName = data?.name || `${data?.first_name ?? ''} ${data?.last_name ?? ''}`.trim();

  return (
    <ProfileLayout
      loading={loading}
      creditLoading={loading}
      displayName={displayName || undefined}
      avatarUrl={data?.avatar || undefined}
      memberSince={data?.created_at || undefined}
    >
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

      <UserProfileForm
        profile={error ? null : data}
        loading={loading}
        suppressEmpty={Boolean(error)}
        isSaving={isSaving}
        isChangingPassword={isChangingPassword}
        fieldErrors={fieldErrors}
        passwordError={passwordError}
        passwordFieldErrors={passwordFieldErrors}
        successMessage={error ? null : successMessage}
        passwordSuccessMessage={passwordSuccessMessage}
        onSave={updateProfile}
        onChangePassword={changePassword}
      />
    </ProfileLayout>
  );
}
