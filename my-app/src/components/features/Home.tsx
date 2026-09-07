import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorMessage } from '@/components/ErrorMessage'
import { useAuth } from '@/hooks/useAuth'
import { fetchData } from '@/lib/api/client'
import { colors } from '@/theme/tokens'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required.').email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
})

type LoginFormValues = z.infer<typeof loginSchema>

function Home() {
  const { login, isLoading, isAuthenticated } = useAuth()
  const [apiStatus, setApiStatus] = useState<'loading' | 'connected' | 'error'>('loading')
  const [apiError, setApiError] = useState<string | null>(null)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  useEffect(() => {
    let cancelled = false

    const checkApi = async () => {
      setApiStatus('loading')
      setApiError(null)
      try {
        await fetchData('/health')
        if (!cancelled) setApiStatus('connected')
      } catch {
        if (!cancelled) {
          setApiStatus('error')
          setApiError('Unable to reach the API. The backend may not be running yet.')
        }
      }
    }

    void checkApi()
    return () => {
      cancelled = true
    }
  }, [])

  const onSubmit = async (values: LoginFormValues) => {
    const result = await login(values)
    if (result.success) {
      toast.success('Signed in successfully.')
    } else {
      toast.error(result.error)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-['EB_Garamond'] text-[30px] font-[500] text-[#ffffff]">Welcome</h2>
          <p className="text-[16px] text-[#828282]">
            React + Vite + TypeScript frontend with design tokens and API integration.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[#c8a47e]">
          <FontAwesomeIcon icon={faCoffee} aria-hidden="true" />
          <span className="text-[14px]">Font Awesome ready</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>API Status</CardTitle>
            <CardDescription>Connection to {import.meta.env.VITE_API_URL ?? 'http://localhost:4040'}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {apiStatus === 'loading' && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            )}
            {apiStatus === 'connected' && (
              <Badge variant="success">Connected</Badge>
            )}
            {apiStatus === 'error' && apiError && (
              <ErrorMessage
                message={apiError}
                onRetry={() => {
                  setApiStatus('loading')
                  void fetchData('/health')
                    .then(() => setApiStatus('connected'))
                    .catch(() => {
                      setApiStatus('error')
                      setApiError('Unable to reach the API. The backend may not be running yet.')
                    })
                }}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Design Tokens</CardTitle>
            <CardDescription>Figma-mapped theme colors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {(['accent', 'secondary', 'color-24', 'color-59'] as const).map((key) => (
                <div key={key} className="flex items-center gap-2">
                  <span
                    className="inline-block h-6 w-6 rounded-[4px] border border-[#3a3541]"
                    style={{ backgroundColor: colors[key] }}
                    aria-hidden="true"
                  />
                  <span className="text-[14px] text-[#828282]">{key}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {!isAuthenticated() && (
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Authenticate via POST /auth/login</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" autoComplete="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput autoComplete="current-password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} aria-busy={isLoading}>
                  {isLoading ? 'Signing in…' : 'Sign in'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {isAuthenticated() && (
        <Card>
          <CardHeader>
            <CardTitle>Authenticated</CardTitle>
            <CardDescription>You are signed in. Protected routes are available.</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="success">Session active</Badge>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Home
