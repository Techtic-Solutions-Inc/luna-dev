import { createContext, useContext } from 'react';

import type { Announcement } from '@/types/api';
import type { DashboardViewModel } from '@/types/dashboard';

export type DashboardRequestState = 'idle' | 'loading' | 'success' | 'error';

export interface DashboardContextValue {
  announcements: Announcement[];
  announcementsState: DashboardRequestState;
  announcementsError: string | null;
  analytics: DashboardViewModel;
  analyticsState: DashboardRequestState;
  analyticsError: string | null;
  refresh: () => Promise<void>;
}

export const DashboardContext = createContext<DashboardContextValue | null>(null);

export const useDashboard = (): DashboardContextValue => {
  const context = useContext(DashboardContext);

  if (context === null) {
    throw new Error('useDashboard must be used within a DashboardProvider.');
  }

  return context;
};
