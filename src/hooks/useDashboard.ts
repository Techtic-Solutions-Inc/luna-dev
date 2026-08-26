import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  deleteDashboardNotification,
  getDashboard,
  postDashboardNotification,
  putDashboardSubscription,
} from '@/lib/api/dashboard';
import { clearSession } from '@/lib/auth/session';
import { ApiClientError } from '@/types/api';
import type {
  CreateDashboardNotificationRequest,
  DashboardOverviewData,
  UpdateSubscriptionRequest,
} from '@/types/dashboard';

export function useDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardOverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [empty, setEmpty] = useState(false);
  const [mutating, setMutating] = useState(false);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    setEmpty(false);
    try {
      const result = await getDashboard();
      setData(result);
      const noAnnouncements = result.announcements.length === 0;
      const noCalendar = result.content_calendar.length === 0;
      setEmpty(noAnnouncements && noCalendar);
    } catch (err) {
      if (err instanceof ApiClientError) {
        if (err.status === 401 || err.status === 403) {
          clearSession();
          navigate('/signin', { replace: true });
          return;
        }
        if (err.status === 404) {
          setEmpty(true);
          setData(null);
        } else {
          setError(err.message);
        }
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const createNotification = useCallback(
    async (body: CreateDashboardNotificationRequest) => {
      setMutating(true);
      try {
        await postDashboardNotification(body);
        await fetchDashboard();
      } finally {
        setMutating(false);
      }
    },
    [fetchDashboard],
  );

  const deleteNotification = useCallback(
    async (id: string) => {
      setMutating(true);
      try {
        await deleteDashboardNotification(id);
        await fetchDashboard();
      } finally {
        setMutating(false);
      }
    },
    [fetchDashboard],
  );

  const updateSubscription = useCallback(
    async (body: UpdateSubscriptionRequest = {}) => {
      setMutating(true);
      try {
        await putDashboardSubscription(body);
        await fetchDashboard();
      } finally {
        setMutating(false);
      }
    },
    [fetchDashboard],
  );

  useEffect(() => {
    void fetchDashboard();
  }, [fetchDashboard]);

  return {
    data,
    loading,
    error,
    empty,
    mutating,
    refetch: fetchDashboard,
    createNotification,
    deleteNotification,
    updateSubscription,
  };
}
