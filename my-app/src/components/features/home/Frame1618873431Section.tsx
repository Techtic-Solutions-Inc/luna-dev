import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { HOME_CONTACT_AGENT_IMAGE } from './constants';

const waitlistSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  email: z.string().min(1, 'Email is required.').email('Please enter a valid email address.'),
  phone: z.string().optional(),
  experience: z.string().optional(),
  marketing: z.string().optional(),
  message: z.string().optional(),
});

type WaitlistFormValues = z.infer<typeof waitlistSchema>;

/**
 * Frame 1618873431 — Home screen section 9/12 (Figma node 2729:13112).
 */
export function Frame1618873431Section({ className }: { className?: string }) {
  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      experience: '',
      marketing: '',
      message: '',
    },
  });

  const onSubmit = (values: WaitlistFormValues) => {
    void values;
  };

  return (
    <section
      id="contact"
      className={cn(
        'home-frame-1618873431 relative z-10 flex w-full flex-col items-stretch gap-[24px] px-[var(--spacing-padding-60)] py-[var(--home-section-padding-y)] lg:flex-row lg:items-center',
        className,
      )}
      data-figma-node="2729:13112"
    >
      <div
        className="relative min-h-[560px] min-w-0 flex-1 overflow-hidden rounded-[24px]"
        data-figma-node="Frame 1618873431 1"
      >
        <img
          src={HOME_CONTACT_AGENT_IMAGE}
          alt="Real estate agent on a phone call"
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[#00000059]" aria-hidden="true" />
        <div className="relative z-10 flex h-full min-h-[560px] flex-col items-center justify-center px-[32px] text-center">
          <h2 className="home-frame-1618873431__image-heading">Everyone&apos;s Waiting</h2>
          <p className="home-frame-1618873431__image-subheading mt-[8px]">
            to buy until &apos;the market is right&apos;
          </p>
        </div>
      </div>

      <div
        className="home-frame-1618873376 relative min-w-0 flex-1 overflow-hidden rounded-[24px] border border-[#ffffff1a]"
        data-figma-node="Frame 1618873376"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.004)' }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1d1818] to-[#050505]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[280px] w-[360px] -translate-x-1/2 rounded-full bg-[#c8a47e]/30 blur-[90px]" />
        <div className="pointer-events-none absolute bottom-[-40px] right-[-60px] h-[240px] w-[240px] rounded-full bg-[#8b6842]/35 blur-[110px]" />

        <div className="relative z-10 px-[28px] py-[36px] lg:px-[48px]">
          <div className="mx-auto flex w-full max-w-[520px] flex-col items-center">
            <span
              className="home-frame-1618873431__form-icon flex h-[48px] w-[48px] items-center justify-center rounded-full border border-[#c8a47e]"
              aria-hidden="true"
            >
              a
            </span>
            <h2 className="home-frame-1618873431__form-heading mt-[16px] text-center">
              Let&apos;s Work Together
            </h2>

            <Form {...form}>
              <form
                className="mt-[28px] flex w-full flex-col gap-[14px]"
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
              >
                <div className="grid gap-[14px] lg:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="First Name"
                            aria-label="First Name"
                            autoComplete="given-name"
                            className="home-frame-1618873431__input"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Last Name"
                            aria-label="Last Name"
                            autoComplete="family-name"
                            className="home-frame-1618873431__input"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-[14px] lg:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Email"
                            aria-label="Email"
                            autoComplete="email"
                            className="home-frame-1618873431__input"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Phone number"
                            aria-label="Phone number"
                            autoComplete="tel"
                            className="home-frame-1618873431__input"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="How long have you been in Real Estate?"
                          aria-label="How long have you been in Real Estate?"
                          className="home-frame-1618873431__input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="marketing"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="What do you currently do for marketing your business?"
                          aria-label="What do you currently do for marketing your business?"
                          className="home-frame-1618873431__input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <textarea
                          placeholder="Your Message"
                          aria-label="Your Message"
                          rows={4}
                          className="home-frame-1618873431__textarea"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p
                  id="waitlist-unavailable-notice"
                  className="text-center font-['Almarai'] text-[14px] leading-[22px] text-[#ffffff]/70"
                >
                  Waitlist submissions are temporarily unavailable while we finalize the signup
                  endpoint.
                </p>
                <button
                  type="submit"
                  disabled
                  aria-disabled="true"
                  aria-describedby="waitlist-unavailable-notice"
                  className="home-frame-1618873431__submit mx-auto mt-[8px] cursor-not-allowed opacity-60"
                >
                  Join the waitlist now
                </button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
