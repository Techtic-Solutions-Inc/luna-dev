export interface SubmitEmailRequest {
  email: string;
}

export interface SubmitEmailResponse {
  success: boolean;
  message: string;
}

export interface AcceptTermsRequest {
  privacy_policy: boolean;
  terms_of_service: boolean;
}

export interface AcceptTermsResponse {
  success: boolean;
  message: string;
}

export interface SearchResultItem {
  id: string;
  title: string;
  category: string;
}

export interface SearchResponse {
  success: boolean;
  message: string;
  data: {
    results: SearchResultItem[];
    total: number;
  };
}

export interface ErrorResponse {
  message: string;
  errors: Record<string, string[]>;
}

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error' | 'empty';
