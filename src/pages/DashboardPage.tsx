import { useMemo, useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { GreetingHeader } from '@/components/dashboard/GreetingHeader';
import { DashboardSearch } from '@/components/dashboard/DashboardSearch';
import { ContentCard } from '@/components/dashboard/ContentCard';
import { AnnouncementsList } from '@/components/dashboard/AnnouncementsList';
import { NewFeaturesPanel } from '@/components/dashboard/NewFeaturesPanel';
import { SubscriptionPanel } from '@/components/dashboard/SubscriptionPanel';
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Alert } from '@/components/ui/Alert';
import { useDashboard } from '@/hooks/useDashboard';

export function DashboardPage() {
  const { data, loading, error, empty, refetch } = useDashboard();
  const [search, setSearch] = useState('');

  const filteredCalendar = useMemo(() => {
    if (!data?.content_calendar) return [];
    const q = search.toLowerCase().trim();
    if (!q) return data.content_calendar;
    return data.content_calendar.filter(
      (entry) =>
        entry.title.toLowerCase().includes(q) ||
        entry.description.toLowerCase().includes(q),
    );
  }, [data?.content_calendar, search]);

  const profileName = data?.profile.full_name;
  const analytics = data?.analytics.analytics_data;

  return (
    <DashboardShell
      profileName={profileName}
      currentCredits={analytics?.current_ai_credits}
      totalCredits={analytics?.total_ai_credits}
    >
      {loading && <DashboardSkeleton />}

      {error && (
        <div className="mb-4">
          <Alert message={error} onRetry={() => void refetch()} />
        </div>
      )}

      {!loading && (
        <div className="flex flex-col gap-4">
          <section
            id="overview"
            className="flex flex-col gap-4 rounded-section bg-canvas p-4 md:py-8 md:px-6"
          >
            {profileName && <GreetingHeader fullName={profileName} />}
            <DashboardSearch value={search} onChange={setSearch} />
          </section>

          <section className="rounded-section bg-panel p-4">
            {empty && !data ? (
              <EmptyState title="No content available" />
            ) : filteredCalendar.length === 0 ? (
              <EmptyState title="No content available" />
            ) : (
              <div className="flex flex-col gap-4 md:flex-row md:overflow-x-auto md:pb-2">
                {filteredCalendar.map((entry) => (
                  <ContentCard key={entry.id} entry={entry} />
                ))}
              </div>
            )}
          </section>

          <section id="ultimate-mind" className="rounded-section bg-panel p-6">
            <h2 className="mb-4 text-[24px] font-medium leading-8 text-ink">
              Ultimate Mind
            </h2>
            <EmptyState
              title="No content available"
              body="Ultimate Mind suggestions are not available yet."
            />
          </section>

          <section id="announcements" className="rounded-section bg-panel p-6">
            <h2 className="mb-4 text-[24px] font-medium leading-8 text-ink">
              Announcements
            </h2>
            <AnnouncementsList announcements={data?.announcements ?? []} />
          </section>

          <div className="rounded-section bg-panel p-6">
            <NewFeaturesPanel />
          </div>

          {analytics && (
            <div className="rounded-section bg-panel p-6">
              <SubscriptionPanel
                currentCredits={analytics.current_ai_credits}
                totalCredits={analytics.total_ai_credits}
                contentGenerated={analytics.content_generated}
                downloads={analytics.downloads}
              />
            </div>
          )}
        </div>
      )}
    </DashboardShell>
  );
}
