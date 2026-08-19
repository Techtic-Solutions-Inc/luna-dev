import AppShell from '../components/layout/AppShell';
import ContentCalendarSection from '../components/ContentCalendarSection';
import DashboardOverview from '../components/DashboardOverview';
import RecentActivityFeed from '../components/RecentActivityFeed';
import ToolsSection from '../components/ToolsSection';
import {
  useDashboardAnalytics,
  useDashboardAnnouncements,
} from '../hooks/useDashboard';

export default function Dashboard() {
  const {
    data: analytics,
    loading: analyticsLoading,
    error: analyticsError,
    refetch: refetchAnalytics,
  } = useDashboardAnalytics();

  const {
    data: announcements,
    loading: announcementsLoading,
    error: announcementsError,
    refetch: refetchAnnouncements,
  } = useDashboardAnnouncements();

  const shellLoading = analyticsLoading;
  const pageLoading = analyticsLoading || announcementsLoading;

  return (
    <AppShell
      creditLoading={shellLoading}
      creditsUsed={analytics?.credits_used}
      creditsLimit={analytics?.credits_limit}
    >
      <div className="mx-auto w-full max-w-[1180px] space-y-10 md:space-y-12">
        <DashboardOverview
          analytics={analytics}
          loading={analyticsLoading}
          error={analyticsError}
          onRetry={() => {
            void refetchAnalytics();
          }}
        />

        <ToolsSection />

        <ContentCalendarSection />

        <RecentActivityFeed
          announcements={announcements}
          activities={analytics?.recent_activities ?? []}
          prompts={analytics?.prompts ?? []}
          loading={pageLoading}
          announcementsError={announcementsError}
          onRetryAnnouncements={() => {
            void refetchAnnouncements();
          }}
        />
      </div>
    </AppShell>
  );
}
