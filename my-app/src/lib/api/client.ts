import axios, { type AxiosError } from 'axios'
import type { ApiErrorResponse } from '@/types/auth'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4040'

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export function getApiErrorMessage(err: unknown, fallback = 'Something went wrong. Please try again.'): string {
  if (!axios.isAxiosError(err)) {
    if (err instanceof Error && err.message && !err.message.includes('AxiosError')) {
      return err.message
    }
    return fallback
  }

  const axiosError = err as AxiosError<ApiErrorResponse>

  if (!axiosError.response) {
    if (axiosError.code === 'ECONNABORTED') {
      return 'The request is taking longer than expected. Please check the current status before trying again.'
    }
    return 'Unable to connect. Please check your connection.'
  }

  const status = axiosError.response.status
  const data = axiosError.response.data

  if (status === 401) {
    return 'Your session may have expired. Please sign in again.'
  }

  if (status >= 500) {
    return fallback
  }

  if (data?.message && typeof data.message === 'string') {
    return data.message
  }

  if (data?.detail && typeof data.detail === 'string') {
    return data.detail
  }

  if (data?.errors && typeof data.errors === 'object') {
    const firstField = Object.values(data.errors)[0]
    if (Array.isArray(firstField) && firstField[0]) {
      return firstField[0]
    }
  }

  return fallback
}

export const fetchData = async <T>(endpoint: string): Promise<T> => {
  const response = await apiClient.get<T>(endpoint)
  return response.data
}
