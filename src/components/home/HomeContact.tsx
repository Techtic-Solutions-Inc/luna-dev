import { useState, type FormEvent } from 'react';

export function HomeContact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    'h-[52px] w-full rounded-[8px] border border-line bg-panel px-[12px] text-[16px] leading-[17.856px] text-ink placeholder:text-muted transition-colors hover:border-accent/60 focus-visible:border-accent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <section id="contact" className="bg-[#050505] px-6 py-[80px] md:px-[40px]">
      <div className="mx-auto grid max-w-[1920px] gap-[24px] lg:grid-cols-2 lg:gap-[24px]">
        <div className="relative min-h-[480px] overflow-hidden rounded-[24px] lg:min-h-[640px]">
          <img
            src="/assets/figma/frame-2147227751-1660-2184.png"
            alt="Real estate professional on a phone call"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 px-6 text-center">
            <p
              className="text-[32px] font-medium uppercase leading-[1.1] text-ink md:text-[48px]"
            >
              Everyone&apos;s Waiting
            </p>
            <p className="mt-[12px] text-[20px] italic leading-[28px] text-ink/90 md:text-[24px]">
              to buy until &ldquo;the market is right&rdquo;
            </p>
          </div>
        </div>

        <div className="home-contact-panel flex flex-col rounded-[24px] px-6 py-[40px] md:px-[40px] md:py-[48px]">
          <div className="mb-[24px] text-center">
            <div
              className="mx-auto mb-[16px] flex h-[48px] w-[48px] items-center justify-center rounded-full border border-accent text-accent"
              aria-hidden="true"
            >
              <span className="text-[20px] font-medium">a</span>
            </div>
            <h2 className="text-[32px] font-medium leading-[1.2] text-ink md:text-[40px]">
              Let&apos;s Work Together
            </h2>
          </div>

          {submitted ? (
            <p role="status" className="text-center text-[16px] leading-[26px] text-ink/80">
              Thank you for your interest. We&apos;ll be in touch soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]" noValidate>
              <div className="grid gap-[16px] sm:grid-cols-2">
                <div className="flex flex-col gap-[8px]">
                  <label htmlFor="contact-first-name" className="text-[14px] text-ink/80">
                    First Name
                  </label>
                  <input
                    id="contact-first-name"
                    name="first_name"
                    type="text"
                    required
                    autoComplete="given-name"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <label htmlFor="contact-last-name" className="text-[14px] text-ink/80">
                    Last Name
                  </label>
                  <input
                    id="contact-last-name"
                    name="last_name"
                    type="text"
                    required
                    autoComplete="family-name"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid gap-[16px] sm:grid-cols-2">
                <div className="flex flex-col gap-[8px]">
                  <label htmlFor="contact-email" className="text-[14px] text-ink/80">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <label htmlFor="contact-phone" className="text-[14px] text-ink/80">
                    Phone number
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[8px]">
                <label htmlFor="contact-experience" className="text-[14px] text-ink/80">
                  How long have you been in Real Estate?
                </label>
                <input
                  id="contact-experience"
                  name="experience"
                  type="text"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-[8px]">
                <label htmlFor="contact-marketing" className="text-[14px] text-ink/80">
                  What do you currently do for marketing your business?
                </label>
                <input
                  id="contact-marketing"
                  name="marketing"
                  type="text"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-[8px]">
                <label htmlFor="contact-message" className="text-[14px] text-ink/80">
                  Your Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  className={`${inputClass} h-auto min-h-[120px] resize-y py-[12px]`}
                />
              </div>

              <button
                type="submit"
                className="mx-auto mt-[8px] inline-flex h-[52px] items-center rounded-[100px] border border-line bg-panel px-[32px] text-[16px] font-semibold leading-6 text-ink transition-all hover:border-accent hover:bg-accent/20 active:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50"
              >
                Join the waitlist now
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
