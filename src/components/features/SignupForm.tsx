import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '@/lib/api/signup';
import { getApiErrorMessage } from '@/lib/api/errors';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Checkbox } from '@/components/ui/checkbox';
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
  signupCheckboxClass,
  signupCheckboxLabelClass,
  signupLinkClass,
  signupMutedTextClass,
  signupErrorClass,
} from '@/routes/signup-styles';
import { cn } from '@/lib/utils';

const signupSchema = z.object({
  first_name: z.string().min(1, 'First name is required.'),
  last_name: z.string().min(1, 'Last name is required.'),
  email: z.string().min(1, 'Email is required.').email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  terms_accepted: z.boolean().refine((val) => val === true, {
    message: 'Please accept the Terms of Use and Privacy Policy.',
  }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      terms_accepted: false,
    },
  });

  const termsAccepted = form.watch('terms_accepted');

  const onSubmit = async (values: SignupFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await signupUser({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
      });
      toast.success(response.message || 'Account created successfully.');
      navigate('/visitor-home');
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'Unable to create account. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[16px]" noValidate>
        <div className="grid gap-[16px] sm:grid-cols-2">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="space-y-[8px]">
                <FormLabel className={signupLabelClass}>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jane"
                    autoComplete="given-name"
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
            name="last_name"
            render={({ field }) => (
              <FormItem className="space-y-[8px]">
                <FormLabel className={signupLabelClass}>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Doe"
                    autoComplete="family-name"
                    className={signupInputClass}
                    {...field}
                  />
                </FormControl>
                <FormMessage className={signupErrorClass} />
              </FormItem>
            )}
          />
        </div>

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
              <FormLabel className={signupLabelClass}>Create a Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={signupInputClass}
                  eyeClassName={signupEyeClass}
                  {...field}
                />
              </FormControl>
              <FormMessage className={signupErrorClass} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="terms_accepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-[10px] space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                  className={signupCheckboxClass}
                />
              </FormControl>
              <div className="space-y-[8px] leading-none">
                <FormLabel
                  className={cn(signupCheckboxLabelClass, 'mt-0 font-normal leading-[22px]')}
                >
                  I have read and agree to the{' '}
                  <a href="/terms" className={signupLinkClass}>
                    Terms of Use
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className={signupLinkClass}>
                    Privacy Policy
                  </a>
                  .
                </FormLabel>
                <FormMessage className={signupErrorClass} />
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="ghost"
          className={cn(signupButtonClass, 'mt-[8px]')}
          disabled={isSubmitting || !termsAccepted}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Submitting…' : 'Sign Up'}
        </Button>

        <p className={cn('pt-[8px] text-center', signupMutedTextClass)}>
          Already have an account?{' '}
          <Link to="/login" className={signupLinkClass}>
            Sign in
          </Link>
        </p>
      </form>
    </Form>
  );
}
