import axios from 'axios';

import { getToken, setToken } from '@/lib/auth/storage';
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  HomeSearchResponse,
  HomeSubscribeRequest,
  HomeSubscribeResponse,
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
  TermsAcceptanceRequest,
  TermsAcceptanceResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from '@/types/api';

function getApiBaseUrl(): string {
  return (
    process.env.API_BASE_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    ''
  );
}

const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/auth/login', payload);
  const user = response.data.data;
  const accessToken = user.token || user.accessToken;
  if (accessToken) {
    setToken(accessToken);
  }
  return response.data;
}

export async function requestPasswordReset(
  payload: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> {
  const response = await apiClient.post<ForgotPasswordResponse>(
    '/api/auth/forgot-password',
    payload,
  );
  return response.data;
}

export async function signUp(payload: SignUpRequest): Promise<SignUpResponse> {
  const response = await apiClient.post<SignUpResponse>('/api/auth/signup', payload);
  return response.data;
}

export async function verifyEmail(payload: VerifyEmailRequest): Promise<VerifyEmailResponse> {
  const response = await apiClient.post<VerifyEmailResponse>('/api/email/verify', payload);
  return response.data;
}

export async function searchHomeContent(): Promise<HomeSearchResponse> {
  const response = await apiClient.get<HomeSearchResponse>('/api/visitor/home/search');
  return response.data;
}

export async function subscribeHome(payload: HomeSubscribeRequest): Promise<HomeSubscribeResponse> {
  const response = await apiClient.post<HomeSubscribeResponse>(
    '/api/visitor/home/subscribe',
    payload,
  );
  return response.data;
}

export async function acceptHomeTerms(
  payload: TermsAcceptanceRequest,
): Promise<TermsAcceptanceResponse> {
  const response = await apiClient.post<TermsAcceptanceResponse>(
    '/api/visitor/home/terms-acceptance',
    payload,
  );
  return response.data;
}

export default apiClient;
