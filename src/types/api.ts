export interface ContentCalendarEntry {
  id: string;
  title: string;
  date: string;
  content: string;
  description: string;
  full_name: string;
  phone: string;
  link: string | null;
  error: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContentCalendarResponse {
  success: boolean;
  message: string;
  data: {
    items: ContentCalendarEntry[];
  };
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    token: string;
    accessToken: string;
    refreshToken: string;
    tokenType: string;
  };
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export interface ContentLibraryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date?: string;
}
