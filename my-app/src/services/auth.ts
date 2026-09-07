import { apiClient } from '@/lib/api/client'
import type { LoginRequestBody, LoginResponse } from '@/types/auth'

export async function login(credentials: LoginRequestBody): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/auth/login', credentials)
  return response.data
}
