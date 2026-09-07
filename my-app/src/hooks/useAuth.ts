import { useCallback, useState } from 'react'
import { getApiErrorMessage } from '@/lib/api/client'
import { login as loginRequest } from '@/services/auth'
import type { LoginRequestBody } from '@/types/auth'

const TOKEN_KEY = 'token'
const REFRESH_TOKEN_KEY = 'refreshToken'

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)

  const getToken = useCallback(() => localStorage.getItem(TOKEN_KEY), [])

  const isAuthenticated = useCallback(() => !!getToken(), [getToken])

  const setToken = useCallback((token: string, refreshToken?: string) => {
    localStorage.setItem(TOKEN_KEY, token)
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    }
  }, [])

  const clearToken = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  }, [])

  const login = useCallback(
    async (credentials: LoginRequestBody) => {
      setIsLoading(true)
      try {
        const response = await loginRequest(credentials)
        const token = response.data.token || response.data.accessToken
        if (token) {
          setToken(token, response.data.refreshToken)
        }
        return { success: true as const, data: response }
      } catch (err) {
        return {
          success: false as const,
          error: getApiErrorMessage(err, 'Unable to sign in. Please try again.'),
        }
      } finally {
        setIsLoading(false)
      }
    },
    [setToken],
  )

  const logout = useCallback(() => {
    clearToken()
  }, [clearToken])

  return {
    getToken,
    isAuthenticated,
    setToken,
    clearToken,
    login,
    logout,
    isLoading,
  }
}
