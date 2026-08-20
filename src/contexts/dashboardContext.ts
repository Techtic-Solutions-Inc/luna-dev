import { createContext } from 'react';
import type { ContentCalendarEntry, DashboardOverview } from '../types/api';

export interface DashboardContextValue {
  data: DashboardOverview | null;
  calendarEntries: ContentCalendarEntry[];
  loading: boolean;
  error: string | null;
  fieldErrors: Record<string, string>;
  refetch: () => Promise<void>;
}

export const DashboardContext = createContext<DashboardContextValue | null>(null);
