import { useState, type FormEvent } from 'react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisabled(true);
    setSubmitted(true);
    setDisabled(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-full flex-col rounded-16 bg-form-gradient p-6 shadow-panel md:p-10"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-1000 border border-white/40">
        <span className="font-kalam text-2xl text-white" aria-hidden="true">
          a
        </span>
      </div>
      <h2
        id="contact-heading"
        className="text-center font-garamond text-[34px] font-medium leading-tight text-white md:text-[42px]"
      >
        Let’s Work Together
      </h2>

      {submitted ? (
        <p className="mt-8 text-center font-almarai text-body-18 text-accent" role="status">
          You’re on the waitlist. We’ll be in touch.
        </p>
      ) : (
        <div className="mt-8 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="sr-only" htmlFor="firstName">
              First Name
            </label>
            <input id="firstName" name="firstName" required className="field-input" placeholder="First Name" />
            <label className="sr-only" htmlFor="lastName">
              Last Name
            </label>
            <input id="lastName" name="lastName" required className="field-input" placeholder="Last Name" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input id="email" name="email" type="email" required className="field-input" placeholder="Email" />
            <label className="sr-only" htmlFor="phone">
              Phone number
            </label>
            <input id="phone" name="phone" type="tel" className="field-input" placeholder="Phone number" />
          </div>
          <label className="sr-only" htmlFor="tenure">
            How long have you been in Real Estate?
          </label>
          <input
            id="tenure"
            name="tenure"
            className="field-input"
            placeholder="How long have you been in Real Estate?"
          />
          <label className="sr-only" htmlFor="marketing">
            What do you currently do for marketing your business?
          </label>
          <input
            id="marketing"
            name="marketing"
            className="field-input"
            placeholder="What do you currently do for marketing your business?"
          />
          <label className="sr-only" htmlFor="message">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="field-textarea min-h-[120px]"
            placeholder="Your Message"
          />
          <div className="flex justify-center pt-2">
            <button type="submit" className="btn-dark" disabled={disabled}>
              Join the waitlist now
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
