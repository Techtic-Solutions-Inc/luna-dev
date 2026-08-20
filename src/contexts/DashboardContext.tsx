import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { isAxiosError } from 'axios';
import { getContentCalendar, getDashboard } from '../lib/api/dashboard';
import type { ApiErrorEnvelope, ContentCalendarEntry, DashboardOverview } from '../types/api';

interface DashboardContextValue {
  data: DashboardOverview | null;
  calendarEntries: ContentCalendarEntry[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const DashboardContext = createContext<DashboardContextValue | null>(null);

const extractErrorMessage = (err: unknown): string => {
  if (isAxiosError<ApiErrorEnvelope>(err)) {
    return err.response?.data?.message ?? err.message;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return 'Unable to load dashboard data. Please try again.';
};

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [calendarEntries, setCalendarEntries] = useState<ContentCalendarEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [dashboardResult, calendarResult] = await Promise.allSettled([
        getDashboard(),
        getContentCalendar(),
      ]);

      if (dashboardResult.status === 'fulfilled') {
        setData(dashboardResult.value);
      } else {
        throw dashboardResult.reason;
      }

      if (calendarResult.status === 'fulfilled') {
        setCalendarEntries(calendarResult.value);
      } else {
        setCalendarEntries(
          dashboardResult.status === 'fulfilled'
            ? dashboardResult.value.content_calendar_entries
            : [],
        );
      }
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  const value = useMemo(
    () => ({ data, calendarEntries, loading, error, refetch }),
    [data, calendarEntries, loading, error, refetch],
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};
