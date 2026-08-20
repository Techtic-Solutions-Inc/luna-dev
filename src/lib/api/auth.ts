import apiClient from './client';
import { ContractGapError } from './errors';
import type {
  EmailVerificationRequest,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  SignupRequest,
} from '../../types/api';

export async function login(body: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/auth/login', body);
  return response.data;
}

export async function signup(body: SignupRequest): Promise<never> {
  void body;
  throw new ContractGapError('Registration endpoint not available');
}

export async function forgotPassword(
  body: ForgotPasswordRequest,
): Promise<never> {
  void body;
  throw new ContractGapError('Password reset endpoint not available');
}

export async function requestEmailVerification(
  body: EmailVerificationRequest,
): Promise<never> {
  void body;
  throw new ContractGapError('Email verification endpoint not available');
}
