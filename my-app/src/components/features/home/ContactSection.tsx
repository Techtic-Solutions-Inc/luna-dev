import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

const waitlistSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  email: z.string().min(1, 'Email is required.').email('Please enter a valid email address.'),
  phone: z.string().min(1, 'Phone number is required.'),
  experience: z.string().optional(),
  marketing: z.string().optional(),
  message: z.string().optional(),
})

type WaitlistFormValues = z.infer<typeof waitlistSchema>

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

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
  })

  const onSubmit = async (values: WaitlistFormValues) => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      toast.success(`Thank you, ${values.firstName}! You have been added to the waitlist.`)
      form.reset()
    } catch {
      toast.error('Unable to join the waitlist. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="bg-[var(--vh-color-105)] px-[40px] py-[80px]">
      <div className="vh-contact-grid mx-auto max-w-[1920px]">
        <div className="relative min-h-[500px] overflow-hidden rounded-[24px]">
          <img
            src="/assets/figma/group-33654428-2264-10401.png"
            alt="Real estate agent on phone"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--vh-color-101)]/30 px-[40px] text-center">
            <p className="vh-font-eb-garamond text-[36px] font-[500] uppercase leading-[44px] tracking-wide text-[#ffffff] sm:text-[44px]">
              EVERYONE&apos;S WAITING
            </p>
            <p className="vh-font-eb-garamond mt-[8px] text-[24px] font-[400] italic leading-[32px] text-[#ffffff] sm:text-[28px]">
              to buy until &apos;the market is right&apos;
            </p>
          </div>
        </div>

        <div className="vh-contact-form-panel">
          <div className="vh-contact-form-inner">
            <div className="mx-auto mb-[24px] flex h-[48px] w-[48px] items-center justify-center rounded-full border border-[#ffffff]/20 bg-[var(--vh-color-106)]">
              <span className="vh-font-eb-garamond text-[20px] italic text-[#ffffff]">A</span>
            </div>
            <h2 className="vh-font-eb-garamond text-center text-[36px] font-[500] leading-[46px] text-[#ffffff]">
              Let&apos;s Work Together
            </h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-[30px] space-y-[16px]" noValidate>
                <div className="grid gap-[16px] sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="First Name"
                            className="vh-input"
                            aria-label="First Name"
                          />
                        </FormControl>
                        <FormMessage role="alert" className="vh-font-almarai text-[14px] text-[var(--vh-border)]" />
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
                            {...field}
                            placeholder="Last Name"
                            className="vh-input"
                            aria-label="Last Name"
                          />
                        </FormControl>
                        <FormMessage role="alert" className="vh-font-almarai text-[14px] text-[var(--vh-border)]" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-[16px] sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Email"
                            className="vh-input"
                            aria-label="Email"
                            autoComplete="email"
                          />
                        </FormControl>
                        <FormMessage role="alert" className="vh-font-almarai text-[14px] text-[var(--vh-border)]" />
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
                            {...field}
                            type="tel"
                            placeholder="Phone number"
                            className="vh-input"
                            aria-label="Phone number"
                            autoComplete="tel"
                          />
                        </FormControl>
                        <FormMessage role="alert" className="vh-font-almarai text-[14px] text-[var(--vh-border)]" />
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
                          {...field}
                          placeholder="How long have you been in Real Estate?"
                          className="vh-input"
                          aria-label="How long have you been in Real Estate?"
                        />
                      </FormControl>
                      <FormMessage role="alert" className="vh-font-almarai text-[14px] text-[var(--vh-border)]" />
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
                          {...field}
                          placeholder="What do you currently do for marketing your business?"
                          className="vh-input"
                          aria-label="What do you currently do for marketing your business?"
                        />
                      </FormControl>
                      <FormMessage role="alert" className="vh-font-almarai text-[14px] text-[var(--vh-border)]" />
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
                          {...field}
                          placeholder="Your Message"
                          rows={4}
                          aria-label="Your Message"
                          className="vh-input vh-textarea w-full"
                        />
                      </FormControl>
                      <FormMessage role="alert" className="vh-font-almarai text-[14px] text-[var(--vh-border)]" />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center pt-[8px]">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="vh-btn-waitlist"
                  >
                    {isSubmitting ? 'Submitting…' : 'Join the waitlist now.'}
                  </button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}
