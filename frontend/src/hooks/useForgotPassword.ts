import axios from 'axios'
import { useCallback, useState } from 'react'

interface ForgotPasswordRequest {
  email: string
}

interface ForgotPasswordResponse {
  success: boolean
  message: string
}

interface ApiErrorResponse {
  success: false
  message: string
  error: {
    code: string
    details: Record<string, string[]> | null
  }
  path: string
  timestamp: string
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  headers: {
    'Content-Type': 'application/json',
  },
})

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const requestReset = useCallback(async (email: string) => {
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const { data } = await api.post<
        ForgotPasswordResponse,
        { data: ForgotPasswordResponse },
        ForgotPasswordRequest
      >('/api/auth/forgot-password', { email })

      const message =
        data.message || 'A password reset link has been sent to your email.'
      setSuccessMessage(message)
      return true
    } catch (requestError: unknown) {
      const message = axios.isAxiosError<ApiErrorResponse>(requestError)
        ? requestError.response?.data.message
        : undefined

      setError(
        message ||
          'We could not send the reset link. Please try again in a moment.',
      )
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { error, isLoading, requestReset, successMessage }
}
