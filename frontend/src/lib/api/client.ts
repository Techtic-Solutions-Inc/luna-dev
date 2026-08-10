import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type {
  AboutResponse,
  AuthLoginResponse,
  LoginRequest,
  LoginResponse,
  ProfileResponse,
  RegisterRequest,
  RegisterResponse,
  SignupRequest,
  SignupResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from '../../types/api';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  },
);

export const fetchData = async <T = unknown>(path: string): Promise<T> => {
  const response = await apiClient.get<T>(path);
  return response.data;
};

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/api/login', payload);
  return response.data;
};

export const authLogin = async (
  payload: LoginRequest,
): Promise<AuthLoginResponse> => {
  const response = await apiClient.post<AuthLoginResponse>(
    '/api/auth/login',
    payload,
  );
  return response.data;
};

export const register = async (
  payload: RegisterRequest,
): Promise<RegisterResponse> => {
  const response = await apiClient.post<RegisterResponse>(
    '/api/register',
    payload,
  );
  return response.data;
};

export const signup = async (
  payload: SignupRequest,
): Promise<SignupResponse> => {
  const response = await apiClient.post<SignupResponse>('/api/signup', payload);
  return response.data;
};

export const getProfile = async (): Promise<ProfileResponse> => {
  const response = await apiClient.get<ProfileResponse>('/api/profile');
  return response.data;
};

export const updateProfile = async (
  payload: UpdateProfileRequest,
): Promise<UpdateProfileResponse> => {
  const response = await apiClient.put<UpdateProfileResponse>(
    '/api/profile',
    payload,
  );
  return response.data;
};

export const getAbout = async (): Promise<AboutResponse> => {
  const response = await apiClient.get<AboutResponse>('/api/about');
  return response.data;
};

export default apiClient;
