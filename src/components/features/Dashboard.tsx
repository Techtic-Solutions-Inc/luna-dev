import { useEffect } from 'react';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import { useAuth } from '../../hooks/useAuth';
import useDashboard from '../../hooks/useDashboard';
import DashboardOverview from './dashboard/DashboardOverview';
import ContentCalendar from './dashboard/ContentCalendar';
import ToolsSection from './dashboard/ToolsSection';
import RecentActivityFeed from './dashboard/RecentActivityFeed';

export default function Dashboard() {
  const { updateUser, updateCredits } = useAuth();
  const {
    data,
    calendarEntries,
    dashboardLoading,
    calendarLoading,
    dashboardError,
    calendarError,
    refetch,
    refetchCalendar,
  } = useDashboard();

  useEffect(() => {
    if (!data?.profile) return;
    updateUser({
      id: data.profile.id,
      name: data.profile.name,
      first_name: data.profile.first_name,
      last_name: data.profile.last_name,
      email: data.profile.email,
    });
  }, [data, updateUser]);

  useEffect(() => {
    updateCredits(data?.credits ?? null);
  }, [data, updateCredits]);

  if (dashboardLoading && !data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner label="Loading dashboard" size="lg" />
      </div>
    );
  }

  if (dashboardError || !data) {
    return (
      <div
        className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center"
        role="alert"
      >
        <p className="font-almarai text-base text-[var(--color-57)]">
          {dashboardError ?? 'Unable to load dashboard data.'}
        </p>
        <Button onClick={() => void refetch()} aria-label="Retry loading dashboard">
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-6xl space-y-10 pb-10">
      <div
        className="pointer-events-none absolute -right-20 -top-16 h-64 w-64 rounded-full opacity-30 blur-[120px]"
        style={{ background: 'var(--color-68)' }}
        aria-hidden="true"
      />
      <DashboardOverview data={data} calendarEntries={calendarEntries} />
      <ToolsSection />
      <ContentCalendar
        entries={calendarEntries}
        loading={calendarLoading && calendarEntries.length === 0}
        error={calendarError}
        onRetry={() => void refetchCalendar()}
      />
      <RecentActivityFeed announcements={data.announcements} calendarEntries={calendarEntries} />
    </div>
  );
}
