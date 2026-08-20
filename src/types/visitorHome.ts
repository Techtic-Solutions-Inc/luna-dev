export interface HomeSearchItem {
  id: string;
  title: string;
  image_url: string;
  description: string;
}

export interface HomeSearchResponse {
  success: boolean;
  message: string;
  data: {
    items: HomeSearchItem[];
  };
}

export interface HomeSubscribeRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  team_size?: string;
  website_link?: string;
  message?: string;
}

export interface HomeSubscribeResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
  };
}

export interface HomeTermsAcceptanceRequest {
  privacy_policy: boolean;
  terms_of_service: boolean;
  email: string;
}

export interface HomeTermsAcceptanceResponse {
  success: boolean;
  message: string;
}

export interface ApiErrorEnvelope {
  message: string;
  errors: Record<string, string[]>;
}

export interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  teamSize: string;
  websiteLink: string;
  message: string;
  privacyPolicy: boolean;
  termsOfService: boolean;
}

export interface ContactFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  teamSize?: string;
  websiteLink?: string;
  message?: string;
  privacyPolicy?: string;
  termsOfService?: string;
  form?: string;
}
