import Spinner from '../ui/Spinner';
import { useDashboard } from '../../hooks/useDashboard';
import AnnouncementsSection from './dashboard/AnnouncementsSection';
import ContentCalendar from './dashboard/ContentCalendar';
import DashboardOverviewSection from './dashboard/DashboardOverview';
import RecentActivityFeed from './dashboard/RecentActivityFeed';
import ToolsSection from './dashboard/ToolsSection';

const Dashboard = () => {
  const { data, calendarEntries, loading, error, fieldErrors, refetch } = useDashboard();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner label="Loading dashboard" size="lg" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div
        className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center"
        role="alert"
      >
        <p className="font-almarai text-base text-text-secondary">
          {error ?? 'Unable to load dashboard data. Please try again later.'}
        </p>
        {Object.keys(fieldErrors).length > 0 && (
          <ul className="max-w-md space-y-1 text-left font-almarai text-sm text-border">
            {Object.entries(fieldErrors).map(([field, message]) => (
              <li key={field}>
                <span className="font-bold capitalize">{field.replace(/_/g, ' ')}:</span> {message}
              </li>
            ))}
          </ul>
        )}
        <button
          type="button"
          onClick={() => void refetch()}
          className="rounded-full bg-accent px-6 py-2 font-almarai text-sm font-bold text-[var(--color-16)] transition-opacity hover:opacity-90"
        >
          Try again
        </button>
      </div>
    );
  }

  const mergedCalendar =
    calendarEntries.length > 0 ? calendarEntries : data.content_calendar_entries;

  return (
    <div className="relative mx-auto max-w-5xl space-y-8 pb-8">
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-[120px]"
        style={{ background: 'var(--color-68)' }}
        aria-hidden="true"
      />

      <DashboardOverviewSection
        profile={data.profile}
        announcements={data.announcements}
        calendarEntries={mergedCalendar}
        contentGeneratedCount={mergedCalendar.length}
      />

      <ToolsSection />

      <ContentCalendar entries={mergedCalendar} />

      <div className="grid gap-8 lg:grid-cols-2">
        <AnnouncementsSection announcements={data.announcements} />
        <RecentActivityFeed announcements={data.announcements} calendarEntries={mergedCalendar} />
      </div>
    </div>
  );
};

export default Dashboard;
