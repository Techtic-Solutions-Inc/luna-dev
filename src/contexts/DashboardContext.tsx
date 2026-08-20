import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import {
  DashboardContext,
  type DashboardContextValue,
  type DashboardRequestState,
} from '@/contexts/dashboardContextState';
import { ApiError, fetchAnnouncements, fetchDashboardAnalytics } from '@/lib/api/client';
import { announcementToActivity, buildDashboardViewModel } from '@/lib/dashboard/normalize';
import type { Announcement } from '@/types/api';
import type { DashboardViewModel } from '@/types/dashboard';

const emptyAnalytics: DashboardViewModel = {
  user: null,
  aiCredits: null,
  hero: null,
  stats: null,
  weeklyContent: [],
  contentCalendar: [],
  recentActivities: [],
  promptLibrary: [],
};

interface DashboardProviderProps {
  children: ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [announcementsState, setAnnouncementsState] = useState<DashboardRequestState>('idle');
  const [announcementsError, setAnnouncementsError] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<DashboardViewModel>(emptyAnalytics);
  const [analyticsState, setAnalyticsState] = useState<DashboardRequestState>('idle');
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);

  const loadAnnouncements = useCallback(async (): Promise<void> => {
    setAnnouncementsState('loading');
    setAnnouncementsError(null);

    try {
      const response = await fetchAnnouncements();
      setAnnouncements(response.data.items);
      setAnnouncementsState('success');
    } catch (error) {
      const message = error instanceof ApiError ? error.message : 'Unable to load announcements.';
      setAnnouncements([]);
      setAnnouncementsError(message);
      setAnnouncementsState('error');
    }
  }, []);

  const loadAnalytics = useCallback(async (): Promise<void> => {
    setAnalyticsState('loading');
    setAnalyticsError(null);

    try {
      const response = await fetchDashboardAnalytics();
      setAnalytics(buildDashboardViewModel(response.data));
      setAnalyticsState('success');
    } catch (error) {
      const message = error instanceof ApiError ? error.message : 'Unable to load analytics.';
      setAnalytics(emptyAnalytics);
      setAnalyticsError(message);
      setAnalyticsState('error');
    }
  }, []);

  const refresh = useCallback(async (): Promise<void> => {
    await Promise.all([loadAnnouncements(), loadAnalytics()]);
  }, [loadAnalytics, loadAnnouncements]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const mergedAnalytics = useMemo((): DashboardViewModel => {
    if (analytics.recentActivities.length > 0 || announcements.length === 0) {
      return analytics;
    }

    return {
      ...analytics,
      recentActivities: announcements.map(announcementToActivity),
    };
  }, [analytics, announcements]);

  const value = useMemo(
    (): DashboardContextValue => ({
      announcements,
      announcementsState,
      announcementsError,
      analytics: mergedAnalytics,
      analyticsState,
      analyticsError,
      refresh,
    }),
    [
      announcements,
      announcementsError,
      announcementsState,
      analyticsError,
      analyticsState,
      mergedAnalytics,
      refresh,
    ],
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export default DashboardProvider;
