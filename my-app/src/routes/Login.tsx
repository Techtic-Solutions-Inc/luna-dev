import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { useAuth } from '@/hooks/useAuth';
import { getApiErrorMessage } from '@/lib/api/client';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function Login() {
  const { login, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const response = await login(values);
      if (response.success) {
        toast.success('Signed in successfully.');
        navigate('/dashboard', { replace: true });
        return;
      }
      toast.error(response.message || 'Unable to sign in. Please try again.');
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'Unable to sign in. Please try again.'));
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-[var(--spacing-padding-32)] py-[var(--spacing-padding-60)]">
      <div className="w-full max-w-[420px] rounded-[16px] border border-border bg-card p-[var(--spacing-padding-32)] shadow-sm">
        <h1 className="font-['EB_Garamond'] text-[32px] font-medium leading-[41.76px] text-foreground">
          Sign in
        </h1>
        <p className="mt-2 font-['Almarai'] text-sm text-muted-foreground">
          Enter your credentials to access the dashboard.
        </p>

        <Form {...form}>
          <form
            className="mt-8 space-y-5"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
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
            <Button type="submit" className="w-full" disabled={isLoading} aria-busy={isLoading}>
              {isLoading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </Form>

        <p className="mt-6 text-center font-['Almarai'] text-sm text-muted-foreground">
          <Link to="/" className="text-accent hover:underline">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
