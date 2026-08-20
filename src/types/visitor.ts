export interface VisitorSearchResult {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  category: string;
}

export interface VisitorSearchResponse {
  message: string;
  data: {
    items: VisitorSearchResult[];
  };
}

export interface VisitorSubscribePayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city_state?: string;
  goal?: string;
  message?: string;
}

export interface VisitorSubscribeResponse {
  success: boolean;
  message: string;
}

export interface VisitorTermsPayload {
  privacy_policy: boolean;
  terms_of_service: boolean;
  email: string;
}

export interface VisitorTermsResponse {
  success: boolean;
  message: string;
}

export interface FormFieldErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  city_state?: string;
  goal?: string;
  message?: string;
  privacy_policy?: string;
  terms_of_service?: string;
}

export interface ContactFormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city_state: string;
  goal: string;
  message: string;
  privacy_policy: boolean;
  terms_of_service: boolean;
}
