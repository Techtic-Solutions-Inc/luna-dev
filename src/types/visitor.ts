export interface HomeSearchItem {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  link: string | null;
}

export interface HomeSearchResponse {
  success: boolean;
  message: string;
  data: {
    items: HomeSearchItem[];
  };
}

export interface SubscribeRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface SubscribeResult {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: string;
}

export interface SubscribeResponse {
  success: boolean;
  message: string;
  data: SubscribeResult;
}

export interface TermsAcceptanceRequest {
  privacy_policy: boolean;
  terms_of_service: boolean;
  email: string;
}

export interface TermsAcceptanceResult {
  privacy_policy: boolean;
  terms_of_service: boolean;
  email: string;
  accepted_at: string;
}

export interface TermsAcceptanceResponse {
  success: boolean;
  message: string;
  data: TermsAcceptanceResult;
}
