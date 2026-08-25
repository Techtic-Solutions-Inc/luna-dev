export interface ApiSuccessResponse<T> {
  success?: boolean;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  message: string;
  errors: Record<string, string[] | string>;
}

export interface ContentCalendarEntry {
  id: string;
  title: string;
  date: string;
  content: string;
  description: string;
  full_name: string;
  phone: string;
  link: string;
  error: null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContentCalendarResponse {
  message: string;
  data: {
    items: ContentCalendarEntry[];
  };
}
