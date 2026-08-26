import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { readString } from '@/types/api';

const inputClass =
  'w-full rounded-[12px] border border-line bg-color-103 px-[16px] py-[12px] type-body-15 text-ink placeholder:text-muted hover:border-accent focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-50';
const labelClass = 'mb-[6px] block font-inter text-[16px] font-normal leading-[16px] text-ink';

interface ContactSectionProps {
  data: unknown;
}

export function ContactSection({ data }: ContactSectionProps) {
  const [status, setStatus] = useState<string | null>(null);
  const phone = readString(data, 'phone');
  const email = readString(data, 'contact_email');

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStatus('Thanks — we have your details. We will be in touch.');
  }

  return (
    <section id="contact" className="home-contact-panel bg-color-103 px-[20px] py-[113px] md:px-[30px] lg:px-[101px]">
      <div className="mx-auto grid max-w-[1760px] items-stretch gap-[30px] lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-[24px]">
          <img
            src="/assets/figma/attlgjgqkngefohwz-large-img6232-3-I2295-3482-323-1647.png"
            alt="Everyone's waiting to buy until the market is right"
            className="h-full min-h-[400px] w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-color-101/30 px-[24px] text-center">
            <p className="font-garamond text-[32px] font-medium uppercase leading-[1.15] text-ink md:text-[40px]">
              Everyone’s waiting
            </p>
            <p className="mt-[10px] font-garamond text-[18px] italic text-ink">to buy until ‘the market is right’</p>
          </div>
        </div>
        <div className="rounded-[24px] border border-line bg-panel px-[24px] py-[30px] md:px-[30px]">
          <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-[100px] border border-accent">
            <span className="font-kalam text-[32px] text-accent">a</span>
          </div>
          <h2 className="text-center font-garamond text-[32px] font-medium leading-[1.2] text-ink md:text-[40px]">
            Let’s Work Together
          </h2>
          {email ? <p className="type-body-29 mt-[10px] text-center text-muted">{email}</p> : null}
          {phone ? <p className="type-body-15 mt-[10px] text-center text-muted">{phone}</p> : null}
          {status ? (
            <p className="type-body-16 mt-[24px] text-center text-muted" role="status">
              {status}
            </p>
          ) : null}
          <form className="mt-[30px] flex flex-col gap-[16px]" onSubmit={onSubmit} noValidate>
            <div className="grid gap-[16px] sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="first-name">
                  First Name
                </label>
                <input id="first-name" name="firstName" className={inputClass} required />
              </div>
              <div>
                <label className={labelClass} htmlFor="last-name">
                  Last Name
                </label>
                <input id="last-name" name="lastName" className={inputClass} required />
              </div>
            </div>
            <div className="grid gap-[16px] sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="email">
                  Email
                </label>
                <input id="email" name="email" type="email" className={inputClass} required />
              </div>
              <div>
                <label className={labelClass} htmlFor="phone">
                  Phone number
                </label>
                <input id="phone" name="phone" type="tel" className={inputClass} defaultValue={phone} />
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor="tenure">
                How long have you been in Real Estate?
              </label>
              <input id="tenure" name="tenure" className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="marketing">
                What do you currently do for marketing your business?
              </label>
              <input id="marketing" name="marketing" className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="message">
                Your Message
              </label>
              <textarea id="message" name="message" className={`${inputClass} min-h-[120px] resize-y`} />
            </div>
            <Button type="submit" variant="waitlist" className="mx-auto mt-[10px] min-w-[240px]">
              Join the waitlist now
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
