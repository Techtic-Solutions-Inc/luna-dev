export interface AiCreditUsage {
  current: number;
  total: number;
}

export interface DashboardUser {
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl: string | null;
}

export interface DashboardHero {
  headline: string;
  description: string;
}

export interface DashboardStat {
  downloads: number;
  contentGenerated: number;
}

export interface ContentCalendarItem {
  id: string;
  dayLabel: string;
  typeLabel: string;
  title: string;
  subtitle: string;
  imageUrl: string | null;
}

export interface RecentActivity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
}

export interface PromptLibraryItem {
  id: string;
  label: string;
  prompt: string;
}

export interface DashboardViewModel {
  user: DashboardUser | null;
  aiCredits: AiCreditUsage | null;
  hero: DashboardHero | null;
  stats: DashboardStat | null;
  weeklyContent: ContentCalendarItem[];
  contentCalendar: ContentCalendarItem[];
  recentActivities: RecentActivity[];
  promptLibrary: PromptLibraryItem[];
}
