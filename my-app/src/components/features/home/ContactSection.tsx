import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const WAITLIST_UNAVAILABLE_ID = 'waitlist-unavailable-notice'

const WAITLIST_UNAVAILABLE_MESSAGE =
  'Waitlist signup is not available yet. Please email hello@agentwisemarketing.com to join.'

export function ContactSection() {
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

            <form className="mt-[30px] space-y-[16px]" noValidate>
              <div className="grid gap-[16px] sm:grid-cols-2">
                <Input
                  placeholder="First Name"
                  className="vh-input"
                  aria-label="First Name"
                  disabled
                />
                <Input
                  placeholder="Last Name"
                  className="vh-input"
                  aria-label="Last Name"
                  disabled
                />
              </div>

              <div className="grid gap-[16px] sm:grid-cols-2">
                <Input
                  type="email"
                  placeholder="Email"
                  className="vh-input"
                  aria-label="Email"
                  autoComplete="email"
                  disabled
                />
                <Input
                  type="tel"
                  placeholder="Phone number"
                  className="vh-input"
                  aria-label="Phone number"
                  autoComplete="tel"
                  disabled
                />
              </div>

              <Input
                placeholder="How long have you been in Real Estate?"
                className="vh-input"
                aria-label="How long have you been in Real Estate?"
                disabled
              />

              <Input
                placeholder="What do you currently do for marketing your business?"
                className="vh-input"
                aria-label="What do you currently do for marketing your business?"
                disabled
              />

              <textarea
                placeholder="Your Message"
                rows={4}
                aria-label="Your Message"
                className="vh-input vh-textarea w-full"
                disabled
              />

              <div
                id={WAITLIST_UNAVAILABLE_ID}
                role="status"
                className="rounded-[12px] border border-[#ffffff]/20 bg-[#ffffff]/5 px-[16px] py-[12px] text-center vh-font-almarai text-[14px] leading-[22px] text-[#ffffff]/80"
              >
                {WAITLIST_UNAVAILABLE_MESSAGE}
              </div>

              <div className="flex justify-center pt-[8px]">
                <Button
                  type="button"
                  disabled
                  className="vh-btn-waitlist"
                  aria-disabled="true"
                  aria-describedby={WAITLIST_UNAVAILABLE_ID}
                >
                  Join the waitlist now.
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
