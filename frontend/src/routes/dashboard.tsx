import { useState } from 'react';
import ContentCalendarSection from '../components/ContentCalendarSection';
import DashboardOverview from '../components/DashboardOverview';
import AppShell from '../components/layout/AppShell';
import RecentActivityFeed from '../components/RecentActivityFeed';
import ToolsSection from '../components/ToolsSection';
import { useContentCalendar } from '../hooks/useContentCalendar';
import {
  useDashboardAnalytics,
  useDashboardAnnouncements,
} from '../hooks/useDashboard';

export default function DashboardRoute() {
  const [prompt, setPrompt] = useState('');
  const calendar = useContentCalendar();
  const announcements = useDashboardAnnouncements();
  const analytics = useDashboardAnalytics();

  const errors = [
    announcements.error,
    analytics.error,
    calendar.error,
  ].filter((message): message is string => Boolean(message));

  return (
    <AppShell
      creditLoading={analytics.loading}
      creditsUsed={analytics.data?.ai_credits_used}
      creditsLimit={analytics.data?.ai_credits_limit}
    >
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-10">
        {errors.length > 0 ? (
          <div
            role="alert"
            className="rounded-[12px] border border-[#ff5630]/40 bg-[#ff5630]/10 px-4 py-3 text-[14px] text-[#fdfdfd]"
          >
            {errors.map((message) => (
              <p key={message}>{message}</p>
            ))}
            <button
              type="button"
              onClick={() => {
                void announcements.refetch();
                void analytics.refetch();
                void calendar.refetch();
              }}
              className="focus-ring mt-2 rounded-sm text-[14px] text-primary underline-offset-2 hover:underline"
            >
              Try again
            </button>
          </div>
        ) : null}

        <DashboardOverview prompt={prompt} onPromptChange={setPrompt} />
        <ToolsSection />
        <ContentCalendarSection />
        <RecentActivityFeed onUsePrompt={setPrompt} />
      </div>
    </AppShell>
  );
}
