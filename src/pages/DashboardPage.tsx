import { useMemo, useState } from "react";
import { AnnouncementsList, type AnnouncementRow } from "@/components/dashboard/AnnouncementsList";
import { ContentCard, WEEK_CARDS } from "@/components/dashboard/ContentCard";
import { DashboardSearch } from "@/components/dashboard/DashboardSearch";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { NewFeaturesList, type FeatureRow } from "@/components/dashboard/NewFeaturesList";
import { SubscriptionPanel } from "@/components/dashboard/SubscriptionPanel";
import { Alert } from "@/components/ui/Alert";
import { EmptyState } from "@/components/ui/EmptyState";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useDashboard } from "@/hooks/useDashboard";
import { useAuth } from "@/lib/auth/useAuth";
import { asArray, asNumber, asRecord, asString, displayName, personName } from "@/lib/bind";
import {
  deleteDashboardNotification,
  updateDashboardSubscription,
} from "@/lib/api/dashboard";
import type { SuggestionItem } from "@/lib/api/types";

function greetingPrefix(): string {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good Morning";
  }
  if (hour < 17) {
    return "Good Afternoon";
  }
  return "Good Evening";
}

function mapAnnouncements(raw: unknown[] | undefined): AnnouncementRow[] {
  if (!raw) {
    return [];
  }
  return raw.flatMap((entry) => {
    const rec = asRecord(entry);
    if (!rec) {
      return [];
    }
    const title =
      asString(rec.title) ?? asString(rec.message) ?? asString(rec.announcement_title);
    if (!title) {
      return [];
    }
    return [
      {
        id: asString(rec.id),
        title,
        detail: asString(rec.description) ?? asString(rec.announcement_content) ?? asString(rec.message),
        when: asString(rec.date) ?? asString(rec.created_at),
      },
    ];
  });
}

function mapFeatures(raw: unknown[] | undefined): FeatureRow[] {
  if (!raw) {
    return [];
  }
  return raw.flatMap((entry) => {
    const rec = asRecord(entry);
    if (!rec) {
      return [];
    }
    const title = asString(rec.title);
    if (!title) {
      return [];
    }
    return [{ id: asString(rec.id), title, description: asString(rec.description) }];
  });
}

function mapCalendar(raw: unknown[] | undefined) {
  if (!raw) {
    return [];
  }
  return raw.flatMap((entry, index) => {
    const rec = asRecord(entry);
    if (!rec) {
      return [];
    }
    const fallback = WEEK_CARDS[index % WEEK_CARDS.length];
    const link = asString(rec.link);
    const src = link && link.startsWith("/assets/") ? link : fallback.src;
    return [
      {
        id: asString(rec.id) ?? fallback.id,
        day: asString(rec.date) ?? fallback.day,
        kind: asString(rec.title) ?? fallback.kind,
        overlay: asString(rec.content) ?? asString(rec.description) ?? fallback.overlay,
        src,
      },
    ];
  });
}

function suggestionText(item: SuggestionItem): string {
  return item.prompt ?? item.message ?? item.text ?? item.title ?? "";
}

export function DashboardPage() {
  const { user } = useAuth();
  const { data, suggestions, loading, error, reload } = useDashboard();
  const [query, setQuery] = useState("");
  const [manageError, setManageError] = useState<string | null>(null);
  const [managing, setManaging] = useState(false);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);

  const overviewName =
    displayName(data) ?? personName(user?.full_name, user?.name, user?.first_name);
  const used = asNumber(data?.ai_credits_used);
  const total = asNumber(data?.ai_credits_total);
  const status = asString(data?.subscription_status) ?? asString(asRecord(data?.subscription)?.status);

  const announcements = useMemo(() => {
    const rows = mapAnnouncements(asArray(data?.announcements)).filter((row) => !hiddenIds.includes(row.id ?? ""));
    const q = query.trim().toLowerCase();
    if (!q) {
      return rows;
    }
    return rows.filter((row) => row.title.toLowerCase().includes(q) || (row.detail ?? "").toLowerCase().includes(q));
  }, [data, hiddenIds, query]);

  const features = useMemo(() => {
    const rows = mapFeatures(asArray(data?.new_features));
    const q = query.trim().toLowerCase();
    if (!q) {
      return rows;
    }
    return rows.filter((row) => row.title.toLowerCase().includes(q) || (row.description ?? "").toLowerCase().includes(q));
  }, [data, query]);

  const rawCalendar = asArray(data?.content_calendar) ?? asArray(data?.items);
  const calendar = useMemo(() => {
    const fromApi = rawCalendar ? mapCalendar(rawCalendar) : WEEK_CARDS.map((card) => ({ ...card }));
    const q = query.trim().toLowerCase();
    if (!q) {
      return fromApi;
    }
    return fromApi.filter((card) => `${card.day} ${card.kind} ${card.overlay}`.toLowerCase().includes(q));
  }, [rawCalendar, query]);

  const prompts = useMemo(() => {
    const texts = suggestions.map(suggestionText).filter((text) => text.length > 0);
    const q = query.trim().toLowerCase();
    if (!q) {
      return texts;
    }
    return texts.filter((text) => text.toLowerCase().includes(q));
  }, [suggestions, query]);

  const downloads = asNumber(data?.downloads);
  const generated = asNumber(data?.content_generated);

  async function onDismiss(id: string) {
    if (!id) {
      return;
    }
    try {
      await deleteDashboardNotification(id);
      setHiddenIds((prev) => [...prev, id]);
    } catch {
      setHiddenIds((prev) => [...prev, id]);
    }
  }

  async function onManage() {
    setManaging(true);
    setManageError(null);
    try {
      await updateDashboardSubscription();
      reload();
    } catch (err: unknown) {
      setManageError(err instanceof Error ? err.message : "Unable to update subscription");
    } finally {
      setManaging(false);
    }
  }

  if (loading) {
    return <DashboardSkeleton />;
  }

  const title = overviewName ? `${greetingPrefix()}, ${overviewName}.` : `${greetingPrefix()}.`;

  return (
    <DashboardLayout name={overviewName} creditsUsed={used} creditsTotal={total}>
      {error ? (
        <div className="mb-24">
          <Alert message={error} onRetry={reload} />
        </div>
      ) : null}

      <section id="overview" className="flex flex-col gap-16 rounded-10 bg-color-16 py-32 px-24">
        <h1 className="font-garamond text-[32px] font-medium leading-[41.76px] text-secondary">{title}</h1>
        <p className="max-w-[640px] text-almarai-16-24 text-color-131">
          Let’s keep your brand moving. Today you have fresh content ideas, a planned reel, and a draft waiting in the
          Mind.
        </p>
        <DashboardSearch value={query} onChange={setQuery} />
        <div className="flex flex-wrap gap-12">
          <a
            href="#content-calendar"
            className="inline-flex h-44 items-center rounded-1000 bg-accent px-20 text-almarai-16-bold text-color-101 hover:bg-color-102"
          >
            Plan My Week
          </a>
          <a
            href="#content-calendar"
            className="inline-flex h-44 items-center rounded-1000 border border-secondary px-20 text-almarai-16-20 text-secondary hover:border-accent hover:text-accent"
          >
            My Content Calendar
          </a>
        </div>
        <div className="mt-8 flex gap-16 overflow-x-auto rounded-10 bg-color-106 p-16">
          {calendar.length > 0 ? (
            calendar.map((card) => (
              <ContentCard key={card.id} day={card.day} kind={card.kind} overlay={card.overlay} src={card.src} />
            ))
          ) : (
            <EmptyState title="No content available" />
          )}
        </div>
      </section>

      <section className="mt-24 grid gap-16 md:grid-cols-2">
        <article className="relative rounded-16 border border-color-129 bg-color-106 p-24">
          <p className="text-almarai-16-20 text-color-131">Downloads</p>
          <p className="mt-12 font-garamond text-stat text-accent">{downloads ?? "—"}</p>
        </article>
        <article className="relative rounded-16 border border-color-129 bg-color-106 p-24">
          <p className="text-almarai-16-20 text-color-131">Content Generated</p>
          <p className="mt-12 font-garamond text-stat text-accent">{generated ?? "—"}</p>
        </article>
      </section>

      <section id="ultimate-mind" className="mt-40">
        <h2 className="font-garamond text-section-title text-secondary">Your Tools</h2>
        <p className="mt-8 text-almarai-16-20 text-color-131">Two places to do the work.</p>
        <article className="mt-20 rounded-16 border border-color-129 bg-color-106 p-24">
          <div className="flex flex-col gap-16 md:flex-row md:items-center">
            <span className="inline-flex h-56 w-56 items-center justify-center rounded-1000 bg-accent font-kalam text-[28px] text-color-101">
              a
            </span>
            <div className="flex-1">
              <h3 className="font-garamond text-hero-serif text-secondary">Agentwise Ultimate Mind</h3>
              <p className="mt-8 max-w-[720px] text-almarai-16-24 text-color-131">
                Agentwise Ultimate Mind is your strategic advisor and business partner customized for your business -
                not just a generic chatbot.
              </p>
              <a
                href="#ultimate-mind"
                className="mt-16 inline-flex h-44 items-center rounded-1000 bg-accent px-20 text-almarai-16-bold text-color-101 hover:bg-color-102"
              >
                Start a session →
              </a>
            </div>
          </div>
        </article>
      </section>

      <section id="content-library" className="sr-only">
        Content library
      </section>

      <section id="content-calendar" className="mt-40">
        <div className="flex items-end justify-between gap-16">
          <div>
            <h2 className="font-garamond text-section-title text-secondary">Your Content Calendar</h2>
            <p className="mt-8 text-almarai-16-20 text-color-131">A gentle rhythm to keep your brand consistent.</p>
          </div>
          <a href="#content-calendar" className="text-almarai-16-20 text-accent hover:text-color-102">
            Browse all
          </a>
        </div>
        <div className="mt-20 flex gap-16 overflow-x-auto">
          {calendar.length > 0 ? (
            calendar.map((card) => (
              <ContentCard key={`cal-${card.id}`} day={card.day} kind={card.kind} overlay={card.overlay} src={card.src} />
            ))
          ) : (
            <EmptyState title="No content available" />
          )}
        </div>
      </section>

      <div className="mt-40 grid gap-16 lg:grid-cols-2">
        <section id="announcements" className="rounded-16 border border-color-129 bg-color-106 p-24">
          <div className="mb-16 flex items-center justify-between">
            <h2 className="font-garamond text-hero-serif text-secondary">Announcements</h2>
            <a href="#announcements" className="text-almarai-16-20 text-accent hover:text-color-102">
              View all
            </a>
          </div>
          <AnnouncementsList items={announcements} onDismiss={onDismiss} />
        </section>
        <section className="rounded-16 border border-color-129 bg-color-106 p-24">
          <h2 className="font-garamond text-hero-serif text-secondary">Prompt Library</h2>
          {prompts.length === 0 ? (
            <div className="mt-16">
              <EmptyState title="No Content Available" detail="No prompts are available yet." />
            </div>
          ) : (
            <ul className="mt-16 flex flex-col gap-10">
              {prompts.map((text) => (
                <li key={text} className="rounded-12 border border-color-129 bg-color-107 px-16 py-14">
                  <p className="text-almarai-14 text-accent">Post</p>
                  <p className="mt-8 text-almarai-16-20 text-secondary">{text}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section id="new-features" className="mt-40 rounded-16 border border-color-129 bg-color-106 p-24">
        <h2 className="font-garamond text-hero-serif text-secondary">New Features</h2>
        <div className="mt-16">
          <NewFeaturesList items={features} />
        </div>
      </section>

      <section id="subscription" className="mt-40">
        <h2 className="font-garamond text-hero-serif text-secondary">Subscription</h2>
        <div className="mt-16">
          <SubscriptionPanel
            used={used}
            total={total}
            status={status}
            onManage={() => void onManage()}
            managing={managing}
            error={manageError}
          />
        </div>
      </section>

    </DashboardLayout>
  );
}
