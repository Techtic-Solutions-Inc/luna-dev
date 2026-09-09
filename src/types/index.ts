export interface SignupResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
  };
}

export interface SignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface VisitorItem {
  id: string;
  name: string;
  title: string;
  description: string;
  link: string;
  image: string;
  category: string;
  tags: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface VisitorHomeResponse {
  success: boolean;
  message: string;
  data: {
    items: VisitorItem[];
    pagination: {
      page: number;
      limit: number;
      total?: number;
      total_pages?: number;
    };
  };
}

export interface VisitorHomeParams {
  q?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export interface ApiErrorEnvelope {
  message?: string;
  errors?: Record<string, string[]>;
  detail?: string;
}
