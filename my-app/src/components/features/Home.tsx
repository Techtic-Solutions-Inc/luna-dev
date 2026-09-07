import { useState } from 'react'
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
import { ErrorMessage } from '@/components/ErrorMessage'
import { useAuth } from '@/hooks/useAuth'
import { colors } from '@/theme/tokens'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required.').email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
})

type LoginFormValues = z.infer<typeof loginSchema>

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4040'

function Home() {
  const { login, isLoading, isAuthenticated } = useAuth()
  const [loginError, setLoginError] = useState<string | null>(null)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (values: LoginFormValues) => {
    setLoginError(null)
    const result = await login(values)
    if (result.success) {
      toast.success(result.data.message || 'Signed in successfully.')
    } else {
      setLoginError(result.error)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
        <div>
          <h2 className="font-heading text-heading-lg font-heading-lg text-foreground">Welcome</h2>
          <p className="font-body text-body text-muted-foreground">
            React + Vite + TypeScript frontend with design tokens and API integration.
          </p>
        </div>
        <div className="flex items-center gap-2 text-accent">
          <FontAwesomeIcon icon={faCoffee} aria-hidden="true" />
          <span className="font-body text-body-sm">Font Awesome ready</span>
        </div>
      </div>

      <div className="grid gap-6 tablet:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>Contract-backed endpoints configured for this app</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="font-body text-body-sm text-muted-foreground">Base URL</p>
              <code className="block rounded-md border border-shell-border bg-shell px-3 py-2 font-body text-body-sm text-foreground">
                {API_BASE_URL}
              </code>
            </div>
            <div className="space-y-2">
              <p className="font-body text-body-sm text-muted-foreground">Available endpoints</p>
              <ul className="space-y-1 font-body text-body-sm text-foreground">
                <li>
                  <Badge variant="secondary" className="mr-2">
                    POST
                  </Badge>
                  /auth/login
                </li>
              </ul>
            </div>
            <p className="font-body text-body-sm text-muted-foreground">
              Sign in below to verify connectivity. A successful login confirms the API is reachable.
            </p>
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
                    className="inline-block h-6 w-6 rounded-sm border border-shell-border"
                    style={{ backgroundColor: colors[key] }}
                    aria-hidden="true"
                  />
                  <span className="font-body text-body-sm text-muted-foreground">{key}</span>
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
                {loginError && (
                  <ErrorMessage
                    message={loginError}
                    onRetry={() => {
                      void form.handleSubmit(onSubmit)()
                    }}
                  />
                )}
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
