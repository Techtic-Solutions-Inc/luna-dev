import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { loginRequest } from '@/services/auth';
import { getApiError } from '@/lib/api/client';
import { loginSchema, type LoginFormValues } from '@/lib/validation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/components/shared/FormField';
import type { AuthUser } from '@/types/api';

function toAuthUser(data: {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
}): AuthUser {
  return {
    id: data.id ?? '',
    name: data.name ?? '',
    first_name: data.first_name ?? '',
    last_name: data.last_name ?? '',
    email: data.email,
  };
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const [unmappedErrors, setUnmappedErrors] = useState<string[]>([]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = form.handleSubmit(async (values) => {
    setFormError(null);
    setUnmappedErrors([]);
    try {
      const response = await loginRequest(values);
      const payload = response.data;
      const token = payload.token || payload.accessToken;
      if (!token) {
        const message = 'Login succeeded but no access token was returned.';
        setFormError(message);
        toast.error(message);
        return;
      }
      login(token, toAuthUser(payload));
      toast.success(response.message || 'Signed in successfully.');
      navigate('/', { replace: true });
    } catch (error) {
      const apiError = getApiError(error);
      setFormError(apiError.message);
      toast.error(apiError.message);
      const leftover: string[] = [];
      Object.entries(apiError.errors).forEach(([field, messages]) => {
        if (field === 'email' || field === 'password') {
          form.setError(field, { type: 'server', message: messages[0] });
        } else {
          leftover.push(...messages.map((message) => `${field}: ${message}`));
        }
      });
      setUnmappedErrors(leftover);
    }
  });

  const { errors, isSubmitting } = form.formState;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-padding-16 py-padding-32">
      <Card className="w-full max-w-[var(--spacing-gap-465)]">
        <CardHeader>
          <p className="text-body-sm-2 font-semibold uppercase tracking-widest text-foreground">
            Sofia Admin
          </p>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Authenticate with your work email to open the workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="flex flex-col gap-gap-16" noValidate>
            {formError || unmappedErrors.length > 0 ? (
              <div
                className="rounded-lg border border-destructive px-padding-12 py-padding-10 text-body-sm-2 text-destructive-foreground"
                role="alert"
              >
                {formError ? <p>{formError}</p> : null}
                {unmappedErrors.length > 0 ? (
                  <ul className="mt-padding-8 list-disc pl-padding-16">
                    {unmappedErrors.map((message) => (
                      <li key={message}>{message}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}
            <FormField id="email" label="Email" required error={errors.email?.message}>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                disabled={isSubmitting}
                {...form.register('email')}
              />
            </FormField>
            <FormField id="password" label="Password" required error={errors.password?.message}>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                disabled={isSubmitting}
                {...form.register('password')}
              />
            </FormField>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
