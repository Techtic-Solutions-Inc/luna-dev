import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '@/lib/api/login';
import { getApiErrorMessage } from '@/lib/api/errors';
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
  signupInputClass,
  signupButtonClass,
  signupLabelClass,
  signupEyeClass,
  signupLinkClass,
  signupMutedTextClass,
  signupErrorClass,
} from '@/routes/signup-styles';
import { cn } from '@/lib/utils';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required.').email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await loginUser(values);
      const token = response.data.token || response.data.accessToken;
      if (token) {
        localStorage.setItem('token', token);
      }
      toast.success(response.message || 'Signed in successfully.');
      navigate('/visitor-home');
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'Unable to sign in. Please check your credentials.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[16px]" noValidate>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-[8px]">
              <FormLabel className={signupLabelClass}>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="jane@example.com"
                  autoComplete="email"
                  className={signupInputClass}
                  {...field}
                />
              </FormControl>
              <FormMessage className={signupErrorClass} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-[8px]">
              <FormLabel className={signupLabelClass}>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={signupInputClass}
                  eyeClassName={signupEyeClass}
                  {...field}
                />
              </FormControl>
              <FormMessage className={signupErrorClass} />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="ghost"
          className={cn(signupButtonClass, 'mt-[8px]')}
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Signing in…' : 'Log in'}
        </Button>

        <p className={cn('pt-[8px] text-center', signupMutedTextClass)}>
          Don&apos;t have an account?{' '}
          <Link to="/signup" className={signupLinkClass}>
            Sign up
          </Link>
        </p>
      </form>
    </Form>
  );
}
