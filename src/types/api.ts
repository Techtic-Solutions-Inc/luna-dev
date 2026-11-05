export interface SignupRequestBody {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  terms_accepted: boolean;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}
