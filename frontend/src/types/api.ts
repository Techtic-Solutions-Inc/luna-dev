export interface RegisterResponse {
  user_id: string;
  email: string;
}

export interface ConfirmEmailResponse {
  message: string;
}

export interface LoginResponse {
  token: string;
}

export interface ProfileData {
  bio?: string;
  [key: string]: unknown;
}

export interface ProfileResponse {
  email: string;
  profile: ProfileData;
}

export interface UpdateProfileResponse {
  email: string;
  profile: ProfileData;
}

export interface UpdateProfileRequest {
  bio: string;
}

export interface EmailVerificationResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
    first_name: string;
    address: string;
    title: string;
    message: string;
    description: string;
    link: string | null;
  };
}

export interface PasswordRecoveryResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
    title: string;
    message: string;
    description: string;
    link: string | null;
  };
}

export interface AuthLoginResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
    access_token: string;
    token_type: string;
    expires_in: number;
    title: string;
    message: string;
    description: string;
    link: string;
    redirect: string;
  };
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    name: string;
    title: string;
    message: string;
    description: string;
    link: string | null;
    redirect: string;
  };
}

export interface ApiErrorEnvelope {
  success: boolean;
  message: string;
  error: {
    code: string;
    details: Record<string, unknown> | null;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  terms_accepted: boolean;
}

export interface AboutTeamMember {
  id: string;
  name: string;
  role: string;
  image_url: string;
}

export interface AboutContentSection {
  title: string;
  body: string;
}

export interface AboutMarketing {
  headline_primary: string;
  headline_secondary: string;
  description: string;
  tagline: string;
}

export interface AboutNavLink {
  label: string;
  href: string;
}

export interface AboutContact {
  email: string;
  waitlist_label: string;
  waitlist_href: string;
  links: AboutNavLink[];
}

export interface AboutLegalLink {
  label: string;
  href: string;
}

export interface AboutResponse {
  title: string;
  description: string;
  sections: AboutContentSection[];
  belief_headline: string;
  belief_body: string;
  team_headline: string;
  team_subheadline: string;
  marketing: AboutMarketing;
  team_members: AboutTeamMember[];
  contact: AboutContact;
  legal_links: AboutLegalLink[];
  footer_copyright: string;
}
