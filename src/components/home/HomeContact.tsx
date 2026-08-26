import { type FormEvent, useState } from 'react';
import { Button } from '../ui/Button';
import { readString } from '../../lib/api/home';

interface HomeContactProps {
  data: unknown;
}

const FIELD =
  'w-full rounded-12 border border-line bg-color-103 px-[16px] py-[12px] type-body-15 text-ink placeholder:text-muted hover:border-accent focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-50';

export function HomeContact({ data }: HomeContactProps) {
  const [submitted, setSubmitted] = useState(false);
  const phoneHint = readString(data, 'phone');
  const emailHint = readString(data, 'contact_email');

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="home-contact-panel px-[20px] py-[80px] md:px-[40px] lg:px-[80px]"
    >
      <div className="mx-auto grid max-w-[1760px] gap-[30px] lg:grid-cols-2">
        <div className="relative min-h-[480px] overflow-hidden rounded-[32px] lg:min-h-[640px]">
          <img
            src="/assets/figma/group-33654450-3654-11562.png"
            alt="Everyone's waiting to buy until the market is right"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="rounded-[32px] border border-line bg-color-103 px-[20px] py-[40px] md:px-[40px]">
          <div className="mx-auto mb-[24px] flex h-[72px] w-[72px] items-center justify-center rounded-full border border-accent">
            <span className="font-kalam text-[32px] text-accent">a</span>
          </div>
          <h2 className="text-center font-garamond text-[32px] font-medium leading-[1.2] text-ink md:text-[40px]">
            Let’s Work Together
          </h2>
          {emailHint ? (
            <p className="type-body-15 mt-[8px] text-center text-muted">{emailHint}</p>
          ) : null}
          {submitted ? (
            <p className="type-body-16 mt-[24px] text-center text-accent">
              Thanks — you’re on the waitlist.
            </p>
          ) : (
            <form className="mt-[32px] flex flex-col gap-[16px]" onSubmit={onSubmit}>
              <div className="grid gap-[16px] sm:grid-cols-2">
                <label className="sr-only" htmlFor="first-name">
                  First Name
                </label>
                <input id="first-name" name="firstName" className={FIELD} placeholder="First Name" required />
                <label className="sr-only" htmlFor="last-name">
                  Last Name
                </label>
                <input id="last-name" name="lastName" className={FIELD} placeholder="Last Name" required />
              </div>
              <div className="grid gap-[16px] sm:grid-cols-2">
                <label className="sr-only" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={FIELD}
                  placeholder={emailHint ?? 'Email'}
                  required
                />
                <label className="sr-only" htmlFor="phone">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className={FIELD}
                  placeholder={phoneHint ?? 'Phone number'}
                  required
                />
              </div>
              <label className="sr-only" htmlFor="tenure">
                How long have you been in Real Estate?
              </label>
              <input
                id="tenure"
                name="tenure"
                className={FIELD}
                placeholder="How long have you been in Real Estate?"
                required
              />
              <label className="sr-only" htmlFor="marketing">
                What do you currently do for marketing your business?
              </label>
              <input
                id="marketing"
                name="marketing"
                className={FIELD}
                placeholder="What do you currently do for marketing your business?"
                required
              />
              <label className="sr-only" htmlFor="message">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                className={`${FIELD} min-h-[120px] resize-y`}
                placeholder="Your Message"
                required
              />
              <Button
                type="submit"
                variant="secondary"
                className="mx-auto mt-[8px] min-w-[240px] border-color-102 bg-color-106 hover:bg-color-107 active:bg-color-107"
              >
                Join the waitlist now
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
