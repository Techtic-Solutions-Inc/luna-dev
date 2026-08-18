import axios from 'axios'
import { useCallback, useState } from 'react'

interface EmailVerificationResponse {
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

export function useEmailVerification() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const verifyEmail = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const { data } = await api.post<EmailVerificationResponse>(
        '/api/email/verify',
      )
      setSuccessMessage(data.message || 'Your email address has been verified.')
      return true
    } catch (requestError: unknown) {
      const message = axios.isAxiosError<ApiErrorResponse>(requestError)
        ? requestError.response?.data.message
        : undefined

      setError(
        message ||
          'We could not verify your email address. Please try again in a moment.',
      )
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { error, isLoading, successMessage, verifyEmail }
}
