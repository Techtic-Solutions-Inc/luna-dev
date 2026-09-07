export interface LoginRequestBody {
  email: string
  password: string
}

export interface LoginResponseData {
  id: string
  name: string
  first_name: string
  last_name: string
  email: string
  token: string
  accessToken: string
  refreshToken: string
  tokenType: string
}

export interface LoginResponse {
  success: boolean
  message: string
  data: LoginResponseData
}

export interface ErrorEnvelope {
  message: string
  errors: Record<string, string[]>
}

export interface ApiErrorResponse {
  message?: string
  detail?: string
  errors?: Record<string, string[]>
}
