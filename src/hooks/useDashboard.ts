import { useCallback, useEffect, useState } from 'react';
import { fetchContentCalendar, fetchDashboard, getApiErrorMessage } from '../lib/api/client';
import { normalizeCalendarEntries, normalizeDashboardData } from '../lib/dashboard';
import type { ContentCalendarEntry, DashboardData } from '../types/api';

export interface DashboardState {
  data: DashboardData | null;
  calendarEntries: ContentCalendarEntry[];
  dashboardLoading: boolean;
  calendarLoading: boolean;
  dashboardError: string | null;
  calendarError: string | null;
  refetch: () => Promise<void>;
  refetchDashboard: () => Promise<void>;
  refetchCalendar: () => Promise<void>;
}

export default function useDashboard(): DashboardState {
  const [data, setData] = useState<DashboardData | null>(null);
  const [calendarEntries, setCalendarEntries] = useState<ContentCalendarEntry[]>([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [calendarLoading, setCalendarLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState<string | null>(null);
  const [calendarError, setCalendarError] = useState<string | null>(null);

  const refetchDashboard = useCallback(async () => {
    setDashboardLoading(true);
    setDashboardError(null);
    try {
      const dashboard = await fetchDashboard();
      setData(normalizeDashboardData(dashboard.data));
    } catch (err) {
      setData(null);
      setDashboardError(getApiErrorMessage(err));
    } finally {
      setDashboardLoading(false);
    }
  }, []);

  const refetchCalendar = useCallback(async () => {
    setCalendarLoading(true);
    setCalendarError(null);
    try {
      const calendar = await fetchContentCalendar();
      setCalendarEntries(normalizeCalendarEntries(calendar));
    } catch (err) {
      setCalendarError(getApiErrorMessage(err));
      setCalendarEntries([]);
    } finally {
      setCalendarLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    await Promise.all([refetchDashboard(), refetchCalendar()]);
  }, [refetchDashboard, refetchCalendar]);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  const nestedEntries = data?.calendarEntries ?? [];
  const resolvedCalendar = calendarEntries.length > 0 ? calendarEntries : nestedEntries;

  return {
    data,
    calendarEntries: resolvedCalendar,
    dashboardLoading,
    calendarLoading,
    dashboardError,
    calendarError,
    refetch,
    refetchDashboard,
    refetchCalendar,
  };
}
