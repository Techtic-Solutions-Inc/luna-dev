import { useMemo, useState } from 'react';
import { resolveAnalyticsDisplay, getDemoCalendarEntries } from '@/utils/display-defaults';
import { AIPromptSearchBar } from '@/components/dashboard/AIPromptSearchBar';
import { AnnouncementsFeedList } from '@/components/dashboard/AnnouncementsFeedList';
import { ContentCalendarPreviewSection } from '@/components/dashboard/ContentCalendarPreviewSection';
import { DashboardGreeting } from '@/components/dashboard/DashboardGreeting';
import { DashboardHeroSection } from '@/components/dashboard/DashboardHeroSection';
import { DashboardLoadingSkeleton } from '@/components/dashboard/DashboardLoadingSkeleton';
import { NewContentThisWeekSection } from '@/components/dashboard/NewContentThisWeekSection';
import { PromptLibraryList } from '@/components/dashboard/PromptLibraryList';
import { QuickActionButtons } from '@/components/dashboard/QuickActionButtons';
import { StatsMetricCard } from '@/components/dashboard/StatsMetricCard';
import { ToolsFeatureCard } from '@/components/dashboard/ToolsFeatureCard';
import { AppLayout } from '@/components/layout/AppLayout';
import { DocumentIcon, DownloadIcon } from '@/components/icons';
import { useContentCalendar } from '@/hooks/useContentCalendar';
import { useDashboardAnalytics } from '@/hooks/useDashboardAnalytics';
import { useDashboardAnnouncements } from '@/hooks/useDashboardAnnouncements';
import {
  getDashboardHeroDescription,
  getDashboardHeroHeadline,
  getDashboardSubtext,
  getWeekPreviewEntries,
  PROMPT_LIBRARY_ITEMS,
} from '@/utils/dashboard';

export function DashboardPage() {
  const [promptValue, setPromptValue] = useState('');

  const analytics = useDashboardAnalytics();
  const announcements = useDashboardAnnouncements();
  const calendar = useContentCalendar();

  const calendarEntries = useMemo(() => {
    if (calendar.data.length > 0) return calendar.data;
    if (calendar.error) return getDemoCalendarEntries();
    return calendar.data;
  }, [calendar.data, calendar.error]);

  const weekPreviewItems = useMemo(
    () => getWeekPreviewEntries(calendarEntries, 5),
    [calendarEntries],
  );

  const calendarPreviewItems = useMemo(
    () => getWeekPreviewEntries(calendarEntries, 5),
    [calendarEntries],
  );

  const subtext = useMemo(
    () => getDashboardSubtext(weekPreviewItems.length),
    [weekPreviewItems.length],
  );

  const heroHeadline = useMemo(
    () => getDashboardHeroHeadline(weekPreviewItems.length),
    [weekPreviewItems.length],
  );

  const heroDescription = useMemo(
    () => getDashboardHeroDescription(weekPreviewItems.length),
    [weekPreviewItems.length],
  );

  const displayAnalytics = useMemo(
    () => resolveAnalyticsDisplay(analytics.data),
    [analytics.data],
  );

  const isInitialLoading =
    analytics.loading &&
    !analytics.data &&
    calendar.loading &&
    !calendar.data.length &&
    announcements.loading &&
    !announcements.data.length;

  return (
    <AppLayout creditLoading={analytics.loading}>
      <div className="mx-auto w-full max-w-[1180px] space-y-8 md:space-y-12">
        {isInitialLoading ? (
          <DashboardLoadingSkeleton />
        ) : (
          <>
            <DashboardGreeting subtext={subtext} />

            <DashboardHeroSection
              headline={heroHeadline}
              description={heroDescription}
              promptSearch={
                <AIPromptSearchBar value={promptValue} onChange={setPromptValue} />
              }
              actionButtons={<QuickActionButtons />}
              announcements={announcements.data}
              announcementsLoading={announcements.loading}
            />

            <NewContentThisWeekSection items={weekPreviewItems} />

            <div className="grid gap-4 md:grid-cols-2">
              <StatsMetricCard
                title="Downloads"
                value={displayAnalytics.downloads}
                to="/profile/downloads"
                ariaLabel={`View ${displayAnalytics.downloads.toLocaleString('en-US')} downloads`}
                icon={<DownloadIcon className="h-4 w-4" />}
              />
              <StatsMetricCard
                title="Content Generated"
                value={displayAnalytics.content_generated}
                to="/profile/content-generated"
                ariaLabel={`View ${displayAnalytics.content_generated.toLocaleString('en-US')} generated content items`}
                icon={<DocumentIcon className="h-4 w-4" />}
              />
            </div>

            <ToolsFeatureCard />

            <ContentCalendarPreviewSection items={calendarPreviewItems} />

            <div className="grid gap-6 lg:grid-cols-2">
              <PromptLibraryList
                items={PROMPT_LIBRARY_ITEMS}
                activePrompt={promptValue}
                onSelectPrompt={setPromptValue}
              />
              <AnnouncementsFeedList
                items={announcements.data}
                loading={announcements.loading}
              />
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
