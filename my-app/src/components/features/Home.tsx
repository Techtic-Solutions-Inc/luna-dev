import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/hooks/useAuth';
import { getApiErrorMessage } from '@/lib/api/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ErrorMessage } from '@/components/ErrorMessage';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function Home() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setApiError(null);
    try {
      const response = await login(values);
      toast.success(response.message || 'Signed in successfully.');
    } catch (err) {
      const message = getApiErrorMessage(err, 'Unable to sign in. Please try again.');
      setApiError(message);
      toast.error(message);
    }
  };

  if (isAuthenticated()) {
    return (
      <div className="flex flex-col px-[60px] py-[40px]">
        <div className="mb-8">
          <Badge variant="success" className="mb-4">
            Authenticated
          </Badge>
          <h1 className="font-['EB_Garamond'] text-[32px] font-medium leading-[41.76px] text-foreground">
            Welcome back
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            You are signed in. Navigate to the dashboard to explore protected routes.
          </p>
        </div>
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FontAwesomeIcon icon={faRocket} className="text-primary" aria-hidden="true" />
              Project Setup Complete
            </CardTitle>
            <CardDescription>
              Vite, TypeScript, React Router, Axios, shadcn/ui, and Figma design tokens are
              configured and ready for feature development.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Routing shell with protected routes</li>
              <li>API client with bearer token auth</li>
              <li>Theme provider with Sofia design tokens</li>
              <li>shadcn/ui component library</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-[60px] py-[40px]">
      <div className="mb-8 w-full max-w-lg text-center">
        <h1 className="font-['EB_Garamond'] text-[32px] font-medium leading-[41.76px] text-foreground">
          Welcome
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Sign in to access the application dashboard.
        </p>
      </div>

      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Enter your credentials to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          {apiError && (
            <ErrorMessage message={apiError} className="mb-4" onRetry={() => setApiError(null)} />
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        {...field}
                      />
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
                      <PasswordInput autoComplete="current-password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" isLoading={isLoading}>
                {isLoading ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
