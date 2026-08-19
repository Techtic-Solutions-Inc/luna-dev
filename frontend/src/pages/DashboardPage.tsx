import { useMemo, useState } from 'react';
import { AIPromptSearchBar } from '@/components/dashboard/AIPromptSearchBar';
import { AnnouncementsFeedList } from '@/components/dashboard/AnnouncementsFeedList';
import { ContentCalendarPreviewSection } from '@/components/dashboard/ContentCalendarPreviewSection';
import { DashboardErrorState } from '@/components/dashboard/DashboardErrorState';
import { DashboardGreeting } from '@/components/dashboard/DashboardGreeting';
import { DashboardLoadingSkeleton } from '@/components/dashboard/DashboardLoadingSkeleton';
import { PromptLibraryList } from '@/components/dashboard/PromptLibraryList';
import { QuickActionButtons } from '@/components/dashboard/QuickActionButtons';
import { StatsMetricCard } from '@/components/dashboard/StatsMetricCard';
import { ToolsFeatureCard } from '@/components/dashboard/ToolsFeatureCard';
import { WeeklyContentPreviewRow } from '@/components/dashboard/WeeklyContentPreviewRow';
import { AppLayout } from '@/components/layout/AppLayout';
import { DocumentIcon, DownloadIcon } from '@/components/icons';
import { useContentCalendar } from '@/hooks/useContentCalendar';
import { useDashboardAnalytics } from '@/hooks/useDashboardAnalytics';
import { useDashboardAnnouncements } from '@/hooks/useDashboardAnnouncements';
import {
  getDashboardSubtext,
  getWeekPreviewEntries,
  PROMPT_LIBRARY_ITEMS,
} from '@/utils/dashboard';

export function DashboardPage() {
  const [promptValue, setPromptValue] = useState('');

  const analytics = useDashboardAnalytics();
  const announcements = useDashboardAnnouncements();
  const calendar = useContentCalendar();

  const weekPreviewItems = useMemo(
    () => getWeekPreviewEntries(calendar.data, 5),
    [calendar.data],
  );

  const calendarPreviewItems = useMemo(
    () => getWeekPreviewEntries(calendar.data, 5),
    [calendar.data],
  );

  const subtext = useMemo(
    () => getDashboardSubtext(weekPreviewItems.length),
    [weekPreviewItems.length],
  );

  const isInitialLoading =
    analytics.loading &&
    !analytics.data &&
    calendar.loading &&
    !calendar.data.length &&
    announcements.loading &&
    !announcements.data.length;

  const hasBlockingError =
    analytics.error && !analytics.data && calendar.error && announcements.error;

  const handleRetryAll = () => {
    void analytics.refetch();
    void announcements.refetch();
    void calendar.refetch();
  };

  return (
    <AppLayout creditLoading={analytics.loading}>
      <div className="mx-auto w-full max-w-[1180px] space-y-8 md:space-y-12">
        {isInitialLoading ? (
          <DashboardLoadingSkeleton />
        ) : (
          <>
            <DashboardGreeting subtext={subtext} />

            <div className="space-y-4">
              <AIPromptSearchBar value={promptValue} onChange={setPromptValue} />
              <QuickActionButtons />
            </div>

            {hasBlockingError ? (
              <DashboardErrorState
                message="Unable to load dashboard data. Please try again."
                onRetry={handleRetryAll}
              />
            ) : (
              <>
                {analytics.error ? (
                  <DashboardErrorState
                    message={analytics.error}
                    onRetry={() => void analytics.refetch()}
                  />
                ) : null}

                {calendar.error ? (
                  <DashboardErrorState
                    message={calendar.error}
                    onRetry={() => void calendar.refetch()}
                  />
                ) : null}

                {announcements.error ? (
                  <DashboardErrorState
                    message={announcements.error}
                    onRetry={() => void announcements.refetch()}
                  />
                ) : null}

                <WeeklyContentPreviewRow items={weekPreviewItems} />

                {analytics.data ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <StatsMetricCard
                      title="Downloads"
                      value={analytics.data.downloads}
                      to="/profile/downloads"
                      ariaLabel={`View ${analytics.data.downloads.toLocaleString('en-US')} downloads`}
                      icon={<DownloadIcon className="h-4 w-4" />}
                    />
                    <StatsMetricCard
                      title="Content Generated"
                      value={analytics.data.content_generated}
                      to="/profile/content-generated"
                      ariaLabel={`View ${analytics.data.content_generated.toLocaleString('en-US')} generated content items`}
                      icon={<DocumentIcon className="h-4 w-4" />}
                    />
                  </div>
                ) : analytics.loading ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="h-[120px] animate-pulse rounded-[16px] bg-white/10 md:rounded-[20px]" />
                    <div className="h-[120px] animate-pulse rounded-[16px] bg-white/10 md:rounded-[20px]" />
                  </div>
                ) : null}

                <ToolsFeatureCard />

                <ContentCalendarPreviewSection items={calendarPreviewItems} />

                <div className="grid gap-6 lg:grid-cols-2">
                  <AnnouncementsFeedList
                    items={announcements.data}
                    loading={announcements.loading}
                  />
                  <PromptLibraryList
                    items={PROMPT_LIBRARY_ITEMS}
                    activePrompt={promptValue}
                    onSelectPrompt={setPromptValue}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
}
