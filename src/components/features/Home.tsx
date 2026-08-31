import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCurrentUser, useCurrentUserErrorMessage } from '@/hooks/useCurrentUser';
import { getDisplayName } from '@/lib/utils';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import type { AuthUser } from '@/types/api';

interface AccountRow {
  id: string;
  field: string;
  value: string;
}

function toRows(user: AuthUser): AccountRow[] {
  return [
    { id: 'name', field: 'Full name', value: user.name || '—' },
    { id: 'email', field: 'Email', value: user.email || '—' },
    { id: 'first_name', field: 'First name', value: user.first_name || '—' },
    { id: 'last_name', field: 'Last name', value: user.last_name || '—' },
    { id: 'id', field: 'User ID', value: user.id || '—' },
  ];
}

const columns: DataTableColumn<AccountRow>[] = [
  { id: 'field', header: 'Field', cell: (row) => row.field },
  { id: 'value', header: 'Value', cell: (row) => row.value },
];

export default function Home() {
  const { user: sessionUser } = useAuth();
  const query = useCurrentUser(sessionUser);
  const errorMessage = useCurrentUserErrorMessage(query.error);
  const user = query.data ?? sessionUser;

  return (
    <div className="mx-auto flex w-full max-w-[var(--radius-1000)] flex-col gap-gap-24">
      <PageHeader
        title="Overview"
        description="Session status and the account loaded from the API."
        action={
          <Button asChild>
            <Link to="/profile">Open profile</Link>
          </Button>
        }
      />

      <section className="grid gap-gap-16 tablet:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Session</CardDescription>
            <CardTitle className="text-heading-md-14">
              {query.isLoading && !user ? (
                <Skeleton className="h-padding-30 w-[var(--spacing-gap-113)]" />
              ) : (
                'Authenticated'
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StatusBadge status="success" label="Signed in" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Signed in as</CardDescription>
            <CardTitle className="text-heading-md-14">
              {query.isLoading && !user ? (
                <Skeleton className="h-padding-30 w-[var(--spacing-gap-125)]" />
              ) : user ? (
                getDisplayName(user)
              ) : (
                'Unknown'
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-body-sm-2 text-muted-foreground">
            {user?.email ?? '—'}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Profile source</CardDescription>
            <CardTitle className="text-heading-md-14">GET /api/v1/users/me</CardTitle>
          </CardHeader>
          <CardContent>
            {query.isFetching ? (
              <StatusBadge status="info" label="Refreshing" />
            ) : query.isError ? (
              <StatusBadge status="error" label="Unreachable" />
            ) : (
              <StatusBadge status="success" label="Loaded" />
            )}
          </CardContent>
        </Card>
      </section>

      {query.isError && !user ? (
        <ErrorState
          title="Could not load the current user"
          message={errorMessage}
          onRetry={() => {
            void query.refetch();
          }}
        />
      ) : (
        <section className="flex flex-col gap-gap-12">
          <h2 className="font-garamond text-heading-lg-26">Account record</h2>
          {query.isError ? (
            <p className="text-body-sm-2 text-destructive-foreground" role="alert">
              {errorMessage} Showing cached session data.{' '}
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
          <DataTable
            columns={columns}
            data={user ? toRows(user) : []}
            getRowId={(row) => row.id}
            isLoading={query.isLoading && !user}
            emptyTitle="No account fields"
            emptyDescription="The current user request succeeded but returned an empty profile."
            caption="Current user account fields"
          />
        </section>
      )}
    </div>
  );
}
