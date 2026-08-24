export interface ContentCalendarItem {
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

export interface ContentCalendarListResponse {
  success: boolean;
  message: string;
  data: {
    items: ContentCalendarItem[];
  };
}

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date?: string;
}
