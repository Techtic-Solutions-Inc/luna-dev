import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { isAxiosError } from 'axios';
import { getContentCalendar, getDashboard } from '../lib/api/dashboard';
import type { ApiErrorEnvelope, ContentCalendarEntry, DashboardOverview } from '../types/api';
import { DashboardContext } from './dashboardContext';

const parseDashboardError = (
  err: unknown,
): { message: string; fieldErrors: Record<string, string> } => {
  if (isAxiosError<ApiErrorEnvelope>(err) && err.response?.data) {
    const { message, errors } = err.response.data;
    const fieldErrors: Record<string, string> = {};

    if (errors) {
      Object.entries(errors).forEach(([key, messages]) => {
        if (messages.length > 0) {
          fieldErrors[key] = messages[0];
        }
      });
    }

    return {
      message: message ?? err.message,
      fieldErrors,
    };
  }

  if (err instanceof Error) {
    return { message: err.message, fieldErrors: {} };
  }

  return {
    message: 'Unable to load dashboard data. Please try again.',
    fieldErrors: {},
  };
};

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [calendarEntries, setCalendarEntries] = useState<ContentCalendarEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setFieldErrors({});

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
      const parsed = parseDashboardError(err);
      setError(parsed.message);
      setFieldErrors(parsed.fieldErrors);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  const value = useMemo(
    () => ({ data, calendarEntries, loading, error, fieldErrors, refetch }),
    [data, calendarEntries, loading, error, fieldErrors, refetch],
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};
