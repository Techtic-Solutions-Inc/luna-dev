import { useState, type FormEvent } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  homeContainerClass,
  homeSectionXClass,
  homeWaitlistFieldWrapClass,
  homeWaitlistInputClass,
  homeWaitlistTextareaClass,
  homeWaitlistTextareaWrapClass,
} from "@/lib/home-page-ui";
import { cn } from "@/lib/utils";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: string;
  marketing: string;
  message: string;
}

const initialForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  experience: "",
  marketing: "",
  message: "",
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function WaitlistSection() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  function updateField<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setSubmitError(null);
  }

  function validate(): boolean {
    const errors: Partial<Record<keyof FormState, string>> = {};
    if (!form.firstName.trim()) {
      errors.firstName = "First name is required.";
    }
    if (!form.lastName.trim()) {
      errors.lastName = "Last name is required.";
    }
    if (!form.email.trim()) {
      errors.email = "Email is required.";
    } else if (!isValidEmail(form.email)) {
      errors.email = "Please enter a valid email address.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setSubmitError(
      "Waitlist signup is not available yet. Please try again when the backend is ready.",
    );
  }

  return (
    <section
      id="waitlist"
      className={cn("bg-background py-[88px]", homeSectionXClass)}
      aria-labelledby="waitlist-heading"
    >
      <div
        className={cn(
          homeContainerClass,
          "grid gap-[24px] lg:grid-cols-2 lg:items-stretch",
        )}
      >
        <div className="relative min-h-[480px] min-w-0 overflow-hidden rounded-[24px]">
          <img
            src="/assets/figma/frame-1618873431-2729-13112.png"
            alt=""
            className="absolute inset-0 h-full w-[210%] max-w-none object-cover object-left"
          />
          <div className="absolute inset-0 bg-black/35" aria-hidden />
          <div className="relative flex h-full min-h-[480px] flex-col items-center justify-center px-8 text-center">
            <p className="font-serif text-[32px] font-medium uppercase leading-[1.15] tracking-[0.04em] text-primary sm:text-[36px]">
              EVERYONE&apos;S WAITING
            </p>
            <p className="mt-2 font-serif text-[18px] italic leading-[28px] text-primary/95 sm:text-[20px]">
              to buy until &apos;the market is right&apos;
            </p>
          </div>
        </div>
        <div className="min-w-0 rounded-[24px] bg-gradient-to-b from-panel-dark to-waitlist-panel p-8 sm:p-9">
          <div className="mb-8 text-center">
            <div
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/5 text-xl font-serif italic text-text-primary"
              aria-hidden
            >
              a
            </div>
            <Heading
              id="waitlist-heading"
              as="h2"
              variant="sectionDark"
              className="text-center text-[32px] sm:text-[36px]"
            >
              Let&apos;s Work Together
            </Heading>
          </div>
          {submitError ? (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Unable to join waitlist</AlertTitle>
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          ) : null}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="firstName" className="sr-only">
                  First Name
                </Label>
                <div className={homeWaitlistFieldWrapClass}>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    aria-invalid={Boolean(fieldErrors.firstName)}
                    aria-describedby={
                      fieldErrors.firstName ? "firstName-error" : undefined
                    }
                    className={homeWaitlistInputClass}
                  />
                </div>
                {fieldErrors.firstName ? (
                  <p
                    id="firstName-error"
                    className="text-xs text-red-400"
                    role="alert"
                  >
                    {fieldErrors.firstName}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="lastName" className="sr-only">
                  Last Name
                </Label>
                <div className={homeWaitlistFieldWrapClass}>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    aria-invalid={Boolean(fieldErrors.lastName)}
                    aria-describedby={
                      fieldErrors.lastName ? "lastName-error" : undefined
                    }
                    className={homeWaitlistInputClass}
                  />
                </div>
                {fieldErrors.lastName ? (
                  <p
                    id="lastName-error"
                    className="text-xs text-red-400"
                    role="alert"
                  >
                    {fieldErrors.lastName}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email" className="sr-only">
                  Email
                </Label>
                <div className={homeWaitlistFieldWrapClass}>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={
                      fieldErrors.email ? "email-error" : undefined
                    }
                    className={homeWaitlistInputClass}
                  />
                </div>
                {fieldErrors.email ? (
                  <p
                    id="email-error"
                    className="text-xs text-red-400"
                    role="alert"
                  >
                    {fieldErrors.email}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone" className="sr-only">
                  Phone number
                </Label>
                <div className={homeWaitlistFieldWrapClass}>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Phone number"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className={homeWaitlistInputClass}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="experience" className="sr-only">
                How long have you been in Real Estate?
              </Label>
              <div className={homeWaitlistFieldWrapClass}>
                <Input
                  id="experience"
                  name="experience"
                  placeholder="How long have you been in Real Estate?"
                  value={form.experience}
                  onChange={(e) => updateField("experience", e.target.value)}
                  className={homeWaitlistInputClass}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="marketing" className="sr-only">
                What do you currently do for marketing your business?
              </Label>
              <div className={homeWaitlistFieldWrapClass}>
                <Input
                  id="marketing"
                  name="marketing"
                  placeholder="What do you currently do for marketing your business?"
                  value={form.marketing}
                  onChange={(e) => updateField("marketing", e.target.value)}
                  className={homeWaitlistInputClass}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="message" className="sr-only">
                Your Message
              </Label>
              <div className={homeWaitlistTextareaWrapClass}>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className={homeWaitlistTextareaClass}
                />
              </div>
            </div>
            <div className="pt-2 text-center">
              <Button
                type="submit"
                variant="pillDark"
                size="lg"
                className="min-w-[240px] font-ui text-primary"
              >
                Join the waitlist now
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
