import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const profileSchema = z.object({
  name: z.string().min(1, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const waitlistSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  tenure: z.string().min(1, 'Please tell us how long you have been in real estate'),
  marketing: z.string().min(1, 'Please tell us what you currently do for marketing'),
  message: z.string().min(1, 'Message is required'),
});

export type WaitlistFormValues = z.infer<typeof waitlistSchema>;
