import { ContentCardGrid } from '@/components/dashboard/ContentCard';
import { SectionHeader, SectionState } from '@/components/dashboard/DashboardSection';
import { useDashboard } from '@/contexts/dashboardContextState';

export function ContentCalendar() {
  const { analytics, analyticsState, analyticsError, refresh } = useDashboard();

  return (
    <section aria-labelledby="content-calendar-heading">
      <SectionHeader
        title="Your Content Calendar"
        description="A gentle rhythm to keep your brand consistent."
        actionLabel="Browse all"
        actionHref="/content-calendar"
      />

      <SectionState
        isLoading={analyticsState === 'loading'}
        error={analyticsState === 'error' ? analyticsError : null}
        isEmpty={analyticsState === 'success' && analytics.contentCalendar.length === 0}
        emptyTitle="Your content calendar is empty."
        emptyDescription="Scheduled posts and campaigns will show up here."
        onRetry={() => {
          void refresh();
        }}
      >
        <ContentCardGrid
          items={analytics.contentCalendar}
          emptyTitle="Your content calendar is empty."
        />
      </SectionState>
    </section>
  );
}

export default ContentCalendar;
