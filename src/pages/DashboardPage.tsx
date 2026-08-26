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
import { useUltimateMind } from '@/hooks/useUltimateMind';

export function DashboardPage() {
  const {
    data,
    loading,
    error,
    empty,
    mutating,
    refetch,
    createNotification,
    deleteNotification,
    updateSubscription,
  } = useDashboard();
  const {
    suggestions,
    loading: suggestionsLoading,
    error: suggestionsError,
    empty: suggestionsEmpty,
    refetch: refetchSuggestions,
  } = useUltimateMind();
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
            className="flex flex-col gap-4 rounded-section bg-canvas py-8 px-6"
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
              <div className="flex gap-4 overflow-x-auto pb-2">
                {filteredCalendar.map((entry) => (
                  <ContentCard key={entry.id} entry={entry} />
                ))}
              </div>
            )}
          </section>

          <section id="ultimate-mind" className="rounded-section bg-panel p-6">
            <h2
              className="mb-4 text-[24px] font-medium leading-8 text-ink"
              style={{ fontFamily: 'EB Garamond, serif' }}
            >
              Ultimate Mind
            </h2>
            {suggestionsError && (
              <div className="mb-4">
                <Alert
                  message={suggestionsError}
                  onRetry={() => void refetchSuggestions()}
                />
              </div>
            )}
            {suggestionsLoading ? (
              <EmptyState title="Loading suggestions…" />
            ) : suggestionsEmpty ? (
              <EmptyState
                title="No content available"
                body="Ultimate Mind suggestions are not available yet."
              />
            ) : (
              <ul className="flex flex-col gap-3">
                {suggestions.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-control border border-line bg-card p-4"
                  >
                    <h3 className="text-[16px] font-medium leading-6 text-ink">
                      {item.title}
                    </h3>
                    {item.message && (
                      <p className="mt-1 text-[14px] leading-5 text-muted">{item.message}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section id="announcements" className="rounded-section bg-panel p-6">
            <h2
              className="mb-4 text-[24px] font-medium leading-8 text-ink"
              style={{ fontFamily: 'EB Garamond, serif' }}
            >
              Announcements
            </h2>
            <AnnouncementsList
              announcements={data?.announcements ?? []}
              profile={data?.profile}
              mutating={mutating}
              onCreate={createNotification}
              onDelete={deleteNotification}
            />
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
                syncing={mutating}
                onSync={updateSubscription}
              />
            </div>
          )}
        </div>
      )}
    </DashboardShell>
  );
}
