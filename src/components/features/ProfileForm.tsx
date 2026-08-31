import { useCurrentUser, useCurrentUserErrorMessage } from '@/hooks/useCurrentUser';
import { useAuth } from '@/hooks/useAuth';
import { getDisplayName } from '@/lib/utils';
import { profileSchema } from '@/lib/validation';
import { FormField } from '@/components/shared/FormField';
import { ErrorState } from '@/components/shared/ErrorState';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProfileForm() {
  const { user: sessionUser } = useAuth();
  const query = useCurrentUser(sessionUser);
  const errorMessage = useCurrentUserErrorMessage(query.error);

  if (query.isLoading && !query.data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Loading your account details.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-gap-16">
          <Skeleton className="h-padding-40 w-full" />
          <Skeleton className="h-padding-40 w-full" />
          <Skeleton className="h-padding-40 w-full" />
          <Skeleton className="h-padding-40 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (query.isError && !query.data) {
    return (
      <ErrorState
        title="Profile unavailable"
        message={errorMessage}
        onRetry={() => {
          void query.refetch();
        }}
      />
    );
  }

  const user = query.data;
  if (!user) {
    return (
      <ErrorState
        title="No profile"
        message="The account request succeeded but no user record was returned."
        onRetry={() => {
          void query.refetch();
        }}
      />
    );
  }

  const parsed = profileSchema.safeParse({
    name: user.name,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
  });
  const fieldErrors = parsed.success ? undefined : parsed.error.flatten().fieldErrors;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Account details for {getDisplayName(user)}. Fields stay read-only because the API contract
          does not include a profile update endpoint — changes cannot be persisted.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {query.isError ? (
          <p className="mb-padding-16 text-body-sm-2 text-destructive-foreground" role="alert">
            {errorMessage} Showing the last known profile.{' '}
            <button
              type="button"
              className="underline hover:text-foreground focus-visible:outline-none focus-visible:ring-padding-2 focus-visible:ring-ring"
              onClick={() => {
                void query.refetch();
              }}
            >
              Retry
            </button>
          </p>
        ) : null}
        <form className="grid gap-gap-16 tablet:grid-cols-2" aria-label="Profile" noValidate>
          <FormField id="profile-name" label="Full name" required error={fieldErrors?.name?.[0]}>
            <Input id="profile-name" value={user.name} readOnly aria-readonly="true" />
          </FormField>
          <FormField id="profile-email" label="Email" required error={fieldErrors?.email?.[0]}>
            <Input
              id="profile-email"
              type="email"
              value={user.email}
              readOnly
              aria-readonly="true"
            />
          </FormField>
          <FormField
            id="profile-first-name"
            label="First name"
            required
            error={fieldErrors?.first_name?.[0]}
          >
            <Input id="profile-first-name" value={user.first_name} readOnly aria-readonly="true" />
          </FormField>
          <FormField
            id="profile-last-name"
            label="Last name"
            required
            error={fieldErrors?.last_name?.[0]}
          >
            <Input id="profile-last-name" value={user.last_name} readOnly aria-readonly="true" />
          </FormField>
        </form>
      </CardContent>
    </Card>
  );
}
