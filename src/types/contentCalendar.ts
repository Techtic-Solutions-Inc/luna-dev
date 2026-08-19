export interface ContentCalendarEntry {
  id: string;
  title: string;
  date: string;
  content: string;
  description: string;
  full_name: string;
  phone: string;
  link: string | null;
  error: null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContentCalendarListResponse {
  success: boolean;
  message: string;
  data: { items: ContentCalendarEntry[] };
}

export interface CreateContentCalendarEntryRequest {
  title: string;
  date: string;
  content: string;
  full_name: string;
  phone: string;
  link?: string;
}

export interface UpdateContentCalendarEntryRequest {
  title?: string;
  date?: string;
  content?: string;
  description?: string;
  full_name?: string;
  phone?: string;
  link?: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export type PostType = 'Post' | 'Story' | 'Reel';

export interface CalendarPost {
  id: string;
  title: string;
  time: string;
  type: PostType;
  platform: 'facebook' | 'instagram';
  imageUrl?: string;
}

export interface CalendarDay {
  dayOfWeek: string;
  dayNumber: number;
  posts: CalendarPost[];
}
