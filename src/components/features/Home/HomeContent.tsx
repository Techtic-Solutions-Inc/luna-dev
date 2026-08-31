import { useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Menu } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useVisitorHome } from '@/hooks/useVisitorHome';
import { getApiError } from '@/lib/api/client';
import { waitlistSchema, type WaitlistFormValues } from '@/lib/validation';
import { cn } from '@/lib/utils';
import type { ErrorResponse, VisitorHomeItem } from '@/types/api';
import { ImageGallery, type GalleryImage } from './ImageGallery';
import { LinkList, type NavLinkItem } from './LinkList';
import { darkFieldStyle, tanButtonStyle } from './visitorTokens';

const FIGMA_GALLERY: GalleryImage[] = [
  {
    src: '/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-65-2287.png',
    alt: 'Lifestyle marketing template',
  },
  {
    src: '/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-65-2289.png',
    alt: 'Neighborhood marketing template',
  },
  {
    src: '/assets/figma/attlgjgqkngefohwz-large-img6232-3-I2295-3482-65-2290.png',
    alt: 'Listing marketing template',
  },
  {
    src: '/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-323-1644.png',
    alt: 'Lifestyle marketing card',
  },
  {
    src: '/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-323-1646.png',
    alt: 'City street marketing card',
  },
  {
    src: '/assets/figma/attlgjgqkngefohwz-large-img6232-3-I2295-3482-323-1647.png',
    alt: 'Architectural marketing card',
  },
];

const DEFAULT_NAV: NavLinkItem[] = [
  { href: '#about', label: 'About' },
  { href: '#content', label: 'Content' },
  { href: '#blog', label: 'Blog' },
  { href: '#pricing', label: 'Pricing' },
];

const FOOTER_NAV: NavLinkItem[] = [
  { href: '#about', label: 'About' },
  { href: '#content', label: 'Content' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact Us' },
];

const TESTIMONIALS = [
  {
    quote:
      'The Ultimate Mind has become my second brain for pricing strategy. It pulls comps and pushes back on my assumptions like a seasoned mentor would.',
    name: 'Marcus Donovan',
    meta: 'Keller Williams - Denver, CO',
    avatar: '/assets/figma/frame-2147227827-2270-16929.png',
  },
  {
    quote:
      'My listings actually look like they belong to a top-1% agent now. Three of my last four clients said the marketing is what sold them on hiring me.',
    name: 'Jordan Hayes',
    meta: 'eXp Realty, Nashville, TN',
    avatar: '/assets/figma/frame-2147227828-2270-16985.png',
  },
] as const;

const TAN_BUTTON =
  'h-auto rounded-100 border border-sofia-accent bg-sofia-accent px-padding-24 py-padding-12 font-almarai text-[16px] font-[700] leading-[18px] text-sofia-color-103 hover:brightness-[0.92] focus-visible:ring-sofia-accent active:brightness-75 disabled:cursor-not-allowed disabled:opacity-50';

const GHOST_BUTTON =
  'h-auto rounded-100 border border-sofia-secondary bg-transparent px-padding-24 py-padding-12 font-public-sans text-[16px] font-[400] leading-[18px] text-sofia-secondary hover:bg-sofia-secondary/10 focus-visible:ring-sofia-accent active:bg-sofia-secondary/20 disabled:cursor-not-allowed disabled:opacity-50';

const DARK_FIELD =
  'visitor-home-input h-[52px] rounded-[12px] border border-sofia-color-111 bg-sofia-color-103 font-almarai text-[16px] font-[400] text-sofia-secondary shadow-none placeholder:text-sofia-background hover:border-sofia-accent focus-visible:ring-sofia-accent focus-visible:ring-offset-sofia-color-103';

function isLocalImage(url: string): boolean {
  return url.startsWith('/images/') || url.startsWith('/assets/');
}

function galleryFromItems(items: VisitorHomeItem[]): GalleryImage[] {
  const fromApi = items
    .map((item) => {
      const src = item.image_url || item.image;
      if (!src || !isLocalImage(src)) {
        return null;
      }
      return {
        src,
        alt: item.title || item.name || 'Marketing template',
      };
    })
    .filter((image): image is GalleryImage => image !== null);

  return fromApi.length > 0 ? fromApi : FIGMA_GALLERY;
}

function extraCtasFromItems(items: VisitorHomeItem[]): NavLinkItem[] {
  return items
    .filter((item) => item.link && (item.title || item.name))
    .map((item) => ({
      href: item.link,
      label: item.title || item.name,
    }));
}

function BrandMark({ tone }: { tone: 'light' | 'gold' }) {
  const colorClass = tone === 'gold' ? 'text-sofia-accent' : 'text-sofia-secondary';
  return (
    <a
      href="#top"
      className="inline-flex flex-col no-underline hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sofia-accent focus-visible:ring-offset-2 focus-visible:ring-offset-sofia-color-103 active:opacity-70"
      aria-label="Agentwise home"
    >
      <span className={cn('font-kalam text-[28px] font-[700] leading-[39px]', colorClass)}>
        Agentwise
      </span>
      {tone === 'gold' ? (
        <span
          className={cn(
            'mt-[-6px] font-almarai text-[10px] font-[400] uppercase tracking-[0.18em]',
            colorClass,
          )}
        >
          Real Estate Marketing
        </span>
      ) : null}
    </a>
  );
}

function SocialIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-full transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sofia-accent active:scale-95"
    >
      {children}
    </a>
  );
}

function HeroSocials() {
  return (
    <ul className="flex items-center gap-gap-12" aria-label="Published on">
      <li>
        <SocialIconLink href="https://facebook.com" label="Facebook">
          <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-sofia-color-13 text-[14px] font-[700] text-sofia-secondary">
            f
          </span>
        </SocialIconLink>
      </li>
      <li>
        <SocialIconLink href="https://instagram.com" label="Instagram">
          <span
            className="flex h-[32px] w-[32px] items-center justify-center rounded-full text-sofia-secondary"
            style={{
              background:
                'linear-gradient(180deg, #faad4f 0%, #dd2a7b 35%, #9537b0 62%, #515bd4 100%)',
            }}
          >
            <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="none" aria-hidden="true">
              <rect
                x="4"
                y="4"
                width="16"
                height="16"
                rx="5"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="16.5" cy="7.5" r="0.9" fill="currentColor" />
            </svg>
          </span>
        </SocialIconLink>
      </li>
      <li>
        <SocialIconLink href="https://tiktok.com" label="TikTok">
          <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-sofia-color-101 text-sofia-secondary ring-1 ring-sofia-secondary/30">
            <svg
              viewBox="0 0 24 24"
              className="h-[16px] w-[16px]"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M14.5 3v10.1a3.4 3.4 0 1 1-2.4-3.25V7.2c-2.9.5-5.1 3-5.1 6.05A6.15 6.15 0 0 0 13.15 21 6.15 6.15 0 0 0 19.3 14.85V8.9A7.1 7.1 0 0 0 22 9.4V6.5a7.05 7.05 0 0 1-4.7-2.2 7.1 7.1 0 0 1-2.8-1.3Z" />
            </svg>
          </span>
        </SocialIconLink>
      </li>
      <li>
        <SocialIconLink href="https://google.com" label="Google">
          <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-sofia-secondary font-inter text-[15px] font-[700]">
            <span className="text-sofia-color-116">M</span>
          </span>
        </SocialIconLink>
      </li>
      <li>
        <SocialIconLink href="https://linkedin.com" label="LinkedIn">
          <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-sofia-color-120 font-almarai text-[11px] font-[700] text-sofia-secondary">
            in
          </span>
        </SocialIconLink>
      </li>
    </ul>
  );
}

function FooterSocials() {
  const iconClass = 'h-[18px] w-[18px] fill-sofia-secondary';
  return (
    <ul className="flex items-center gap-gap-18" aria-label="Social media">
      <li>
        <SocialIconLink href="https://facebook.com" label="Facebook">
          <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
            <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1Z" />
          </svg>
        </SocialIconLink>
      </li>
      <li>
        <SocialIconLink href="https://x.com" label="X">
          <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
            <path d="M17.5 3h3.1l-6.8 7.8L22 21h-6.2l-4.8-6.3L5.6 21H2.5l7.3-8.3L2 3h6.3l4.4 5.8L17.5 3Zm-1.1 16.2h1.7L7.7 4.7H5.9l10.5 14.5Z" />
          </svg>
        </SocialIconLink>
      </li>
      <li>
        <SocialIconLink href="https://linkedin.com" label="LinkedIn">
          <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
            <path d="M6.5 9H3.8v11h2.7V9ZM5.1 3.8A1.7 1.7 0 1 0 5.1 7.2 1.7 1.7 0 0 0 5.1 3.8ZM20.2 20h-2.7v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V20H11V9h2.6v1.5h.1c.4-.7 1.3-1.5 2.7-1.5 2.9 0 3.4 1.9 3.4 4.4V20Z" />
          </svg>
        </SocialIconLink>
      </li>
      <li>
        <SocialIconLink href="https://instagram.com" label="Instagram">
          <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
            <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm9.2 1.3a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 8.2A3.8 3.8 0 1 1 12 15.8 3.8 3.8 0 0 1 12 8.2Zm0 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Z" />
          </svg>
        </SocialIconLink>
      </li>
    </ul>
  );
}

function StepRow({
  step,
  title,
  accent,
  body,
  image,
  imageAlt,
}: {
  step: string;
  title: string;
  accent: string;
  body: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <div className="grid items-center gap-gap-30 desktop:grid-cols-[minmax(0,420px)_minmax(0,1fr)] desktop:gap-gap-60">
      <div className="flex max-w-[420px] flex-col gap-gap-16">
        <span className="inline-flex w-fit rounded-100 border border-sofia-accent px-padding-14 py-padding-6 font-public-sans text-[16px] font-[400] leading-[18px] text-sofia-accent">
          {step}
        </span>
        <h3 className="font-garamond text-[42px] font-[500] leading-[54.81px] text-sofia-secondary">
          {title} <span className="text-sofia-accent">{accent}</span>
        </h3>
        <p className="font-almarai text-[16px] font-[400] leading-[26px] text-sofia-background">
          {body}
        </p>
      </div>
      <img src={image} alt={imageAlt} className="h-auto w-full rounded-16 object-contain" />
    </div>
  );
}

function WaitlistFieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }
  return (
    <p id={id} className="font-almarai text-[12px] text-sofia-border" role="alert">
      {message}
    </p>
  );
}

function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      tenure: '',
      marketing: '',
      message: '',
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    setSubmitted(true);
    toast.success(`Thanks ${values.first_name}. You are on the waitlist.`);
    form.reset();
  });

  const fieldError = (name: keyof WaitlistFormValues) => form.formState.errors[name]?.message;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-gap-16" noValidate>
      <div className="grid gap-gap-16 tablet:grid-cols-2">
        <div className="flex flex-col gap-gap-6">
          <Label htmlFor="first_name" className="sr-only font-fellix">
            First Name
          </Label>
          <Input
            id="first_name"
            autoComplete="given-name"
            placeholder="First Name"
            className={DARK_FIELD}
            style={darkFieldStyle}
            aria-invalid={Boolean(fieldError('first_name'))}
            aria-describedby={fieldError('first_name') ? 'waitlist-first_name-error' : undefined}
            {...form.register('first_name')}
          />
          <WaitlistFieldError id="waitlist-first_name-error" message={fieldError('first_name')} />
        </div>
        <div className="flex flex-col gap-gap-6">
          <Label htmlFor="last_name" className="sr-only font-fellix">
            Last Name
          </Label>
          <Input
            id="last_name"
            autoComplete="family-name"
            placeholder="Last Name"
            className={DARK_FIELD}
            style={darkFieldStyle}
            aria-invalid={Boolean(fieldError('last_name'))}
            aria-describedby={fieldError('last_name') ? 'waitlist-last_name-error' : undefined}
            {...form.register('last_name')}
          />
          <WaitlistFieldError id="waitlist-last_name-error" message={fieldError('last_name')} />
        </div>
      </div>
      <div className="grid gap-gap-16 tablet:grid-cols-2">
        <div className="flex flex-col gap-gap-6">
          <Label htmlFor="email" className="sr-only font-inter">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            className={DARK_FIELD}
            style={darkFieldStyle}
            aria-invalid={Boolean(fieldError('email'))}
            aria-describedby={fieldError('email') ? 'waitlist-email-error' : undefined}
            {...form.register('email')}
          />
          <WaitlistFieldError id="waitlist-email-error" message={fieldError('email')} />
        </div>
        <div className="flex flex-col gap-gap-6">
          <Label htmlFor="phone" className="sr-only">
            Phone number
          </Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Phone number"
            className={DARK_FIELD}
            style={darkFieldStyle}
            aria-invalid={Boolean(fieldError('phone'))}
            aria-describedby={fieldError('phone') ? 'waitlist-phone-error' : undefined}
            {...form.register('phone')}
          />
          <WaitlistFieldError id="waitlist-phone-error" message={fieldError('phone')} />
        </div>
      </div>
      <div className="flex flex-col gap-gap-6">
        <Label htmlFor="tenure" className="sr-only">
          How long have you been in Real Estate?
        </Label>
        <Input
          id="tenure"
          placeholder="How long have you been in Real Estate?"
          className={DARK_FIELD}
          style={darkFieldStyle}
          aria-invalid={Boolean(fieldError('tenure'))}
          aria-describedby={fieldError('tenure') ? 'waitlist-tenure-error' : undefined}
          {...form.register('tenure')}
        />
        <WaitlistFieldError id="waitlist-tenure-error" message={fieldError('tenure')} />
      </div>
      <div className="flex flex-col gap-gap-6">
        <Label htmlFor="marketing" className="sr-only">
          What do you currently do for marketing your business?
        </Label>
        <Input
          id="marketing"
          placeholder="What do you currently do for marketing your business?"
          className={DARK_FIELD}
          style={darkFieldStyle}
          aria-invalid={Boolean(fieldError('marketing'))}
          aria-describedby={fieldError('marketing') ? 'waitlist-marketing-error' : undefined}
          {...form.register('marketing')}
        />
        <WaitlistFieldError id="waitlist-marketing-error" message={fieldError('marketing')} />
      </div>
      <div className="flex flex-col gap-gap-6">
        <Label htmlFor="message" className="sr-only">
          Your Message
        </Label>
        <textarea
          id="message"
          placeholder="Your Message"
          rows={4}
          className={cn(DARK_FIELD, 'h-auto min-h-[112px] resize-y py-padding-14')}
          style={darkFieldStyle}
          aria-invalid={Boolean(fieldError('message'))}
          aria-describedby={fieldError('message') ? 'waitlist-message-error' : undefined}
          {...form.register('message')}
        />
        <WaitlistFieldError id="waitlist-message-error" message={fieldError('message')} />
      </div>
      <div className="flex justify-center pt-padding-10">
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className={TAN_BUTTON}
          style={tanButtonStyle}
        >
          Join the waitlist now
        </Button>
      </div>
      {submitted ? (
        <p className="text-center font-almarai text-[14px] text-sofia-accent" role="status">
          You are on the waitlist.
        </p>
      ) : null}
    </form>
  );
}

function HomeSkeleton() {
  return (
    <div
      className="visitor-home min-h-screen bg-sofia-color-105"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center px-padding-40 py-padding-60">
        <Skeleton className="mb-padding-40 h-[32px] w-full max-w-[1100px] bg-sofia-color-106" />
        <div className="grid w-full max-w-[1400px] gap-gap-30 desktop:grid-cols-2">
          <div className="flex flex-col gap-gap-20">
            <Skeleton className="h-[180px] w-full bg-sofia-color-106" />
            <Skeleton className="h-[60px] w-[80%] bg-sofia-color-106" />
            <Skeleton className="h-[32px] w-[200px] bg-sofia-color-106" />
          </div>
          <Skeleton className="h-[420px] w-full rounded-16 bg-sofia-color-106" />
        </div>
      </div>
      <div className="bg-sofia-secondary px-padding-40 py-padding-60">
        <Skeleton className="mx-auto mb-padding-20 h-[48px] w-full max-w-[480px]" />
        <div className="grid grid-cols-1 gap-gap-20 tablet:grid-cols-2 desktop:grid-cols-3">
          <Skeleton className="h-[320px] rounded-24" />
          <Skeleton className="h-[320px] rounded-24" />
          <Skeleton className="h-[320px] rounded-24" />
        </div>
      </div>
    </div>
  );
}

function VisitorHeader({ links }: { links: NavLinkItem[] }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-10 mx-auto flex w-full max-w-[1400px] items-center justify-between gap-gap-20 px-padding-20 py-padding-24 tablet:px-padding-40">
      <BrandMark tone="light" />
      <div className="hidden desktop:block">
        <LinkList links={links} ariaLabel="Primary" className="gap-gap-30" />
      </div>
      <div className="flex items-center gap-gap-12">
        <Button asChild className={cn(GHOST_BUTTON, 'hidden tablet:inline-flex')}>
          <a href="#waitlist">Get Started</a>
        </Button>
        <Button asChild className={TAN_BUTTON}>
          <Link to="/login" style={tanButtonStyle}>
            Log in
          </Link>
        </Button>
        <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-sofia-secondary hover:bg-sofia-secondary/10 hover:text-sofia-secondary desktop:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="visitor-mobile-nav"
            >
              <Menu className="h-padding-24 w-padding-24" aria-hidden="true" />
            </Button>
          </DialogTrigger>
          <DialogContent
            id="visitor-mobile-nav"
            className="border-sofia-color-106 bg-sofia-color-105 text-sofia-secondary"
          >
            <DialogHeader>
              <DialogTitle className="font-garamond text-sofia-secondary">Menu</DialogTitle>
              <DialogDescription className="sr-only">
                Primary navigation for Agentwise
              </DialogDescription>
            </DialogHeader>
            <LinkList
              links={links}
              ariaLabel="Primary"
              className="flex-col items-start gap-gap-16"
              onNavigate={() => {
                setMenuOpen(false);
              }}
            />
            <Button asChild className={TAN_BUTTON}>
              <a
                href="#waitlist"
                style={tanButtonStyle}
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                Get Started
              </a>
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}

function VisitorFooter({ links }: { links: NavLinkItem[] }) {
  return (
    <footer className="bg-sofia-text-primary px-padding-20 py-padding-60 tablet:px-padding-40 desktop:px-[80px]">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-gap-30">
        <div className="flex items-start justify-between gap-gap-20">
          <BrandMark tone="gold" />
          <FooterSocials />
        </div>
        <div className="flex flex-col items-start justify-between gap-gap-16 tablet:flex-row tablet:items-center">
          <LinkList links={links} ariaLabel="Footer" className="gap-gap-32" />
          <a
            href="mailto:hello@agentwisemarketing.com"
            className="font-public-sans text-[16px] font-[600] text-sofia-secondary hover:text-sofia-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sofia-accent"
          >
            hello@agentwisemarketing.com
          </a>
        </div>
        <div className="h-px w-full bg-sofia-color-132" />
        <div className="flex flex-col justify-between gap-gap-12 tablet:flex-row tablet:items-center">
          <p className="font-almarai text-[16px] font-[300] leading-[17.856px] text-sofia-background">
            © 2026 Agentwise. All Rights Reserved.
          </p>
          <p className="font-grotesk text-[14px] font-[500] text-sofia-background">
            <Link
              to="/visitor/terms"
              className="hover:text-sofia-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sofia-accent"
            >
              Terms of Service
            </Link>
            <span aria-hidden="true"> | </span>
            <Link
              to="/visitor/privacy"
              className="hover:text-sofia-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sofia-accent"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function fieldErrorLines(errors: ErrorResponse['errors']): string[] {
  return Object.entries(errors).flatMap(([field, messages]) =>
    messages.map((item) => `${field}: ${item}`),
  );
}

function VisitorHomeErrorBanner({ error, onRetry }: { error: unknown; onRetry: () => void }) {
  const envelope = getApiError(error);
  const details = fieldErrorLines(envelope.errors);

  return (
    <div
      className="relative z-20 border-b border-sofia-accent/30 bg-sofia-color-105 px-padding-20 py-padding-8"
      role="alert"
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-gap-8">
        <div className="min-w-0 flex-1">
          <p className="font-almarai text-[14px] font-[400] leading-[18px] text-sofia-secondary">
            {envelope.message}
          </p>
          {details.length > 0 ? (
            <ul className="mt-gap-4 list-disc pl-padding-16 font-almarai text-[12px] leading-[16px] text-sofia-background">
              {details.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </div>
        <Button
          type="button"
          variant="outline"
          className="h-auto rounded-100 border-sofia-accent bg-transparent px-padding-16 py-padding-6 font-public-sans text-[14px] font-[600] text-sofia-accent hover:bg-sofia-accent/10 hover:text-sofia-accent"
          onClick={onRetry}
        >
          Try again
        </Button>
      </div>
    </div>
  );
}

export function HomeContent() {
  const query = useVisitorHome();
  const items = useMemo(() => query.data?.items ?? [], [query.data?.items]);
  const isEmpty = query.isSuccess && items.length === 0;

  const galleryImages = useMemo(() => (isEmpty ? [] : galleryFromItems(items)), [items, isEmpty]);
  const extraCtas = useMemo(() => extraCtasFromItems(items), [items]);

  if (query.isLoading) {
    return <HomeSkeleton />;
  }

  return (
    <div id="top" className="visitor-home bg-sofia-color-105 text-sofia-secondary">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-padding-16 focus:top-padding-16 focus:z-50 focus:bg-sofia-accent focus:px-padding-16 focus:py-padding-8 focus:text-sofia-color-101"
      >
        Skip to content
      </a>
      {query.isError ? (
        <VisitorHomeErrorBanner
          error={query.error}
          onRetry={() => {
            void query.refetch();
          }}
        />
      ) : null}

      <section className="visitor-home-hero relative overflow-hidden">
        <div
          className="visitor-home-grid pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div
          className="visitor-home-hero-glow pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <VisitorHeader links={DEFAULT_NAV} />
        <div
          id="main"
          className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-gap-30 px-padding-20 pb-padding-60 pt-padding-20 tablet:px-padding-40 desktop:grid-cols-[minmax(0,520px)_minmax(0,1fr)] desktop:gap-gap-40 desktop:pb-[80px] desktop:pt-padding-40"
        >
          <div className="flex flex-col gap-gap-20">
            <h1 className="max-w-[560px] font-garamond text-[50px] font-[500] leading-[65.25px] text-sofia-secondary">
              Stunning Real Estate Marketing, Personalized To Your Market In Minutes
            </h1>
            <p className="max-w-[488px] font-almarai text-[18px] font-[400] leading-[24px] text-sofia-secondary">
              The all-in-one marketing platform for residential real estate agents AI-personalized
              content, a custom business dashboard, and a strategic AI advisor that knows your
              market.
            </p>
            <HeroSocials />
          </div>
          <img
            src="/assets/figma/group-33654428-2264-10401.png"
            alt="Agentwise Ultimate Mind"
            className="h-auto w-full object-contain"
            width={1590}
            height={622}
          />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-gap-20 px-padding-20 pb-[80px] text-center">
          <p className="flex flex-wrap items-baseline justify-center gap-gap-6 font-almarai text-[18px] font-[400] leading-[24px] text-sofia-secondary">
            <span>Join</span>
            <span className="font-garamond text-[26px] font-[500] leading-[34px] text-sofia-accent">
              Hundreds
            </span>
            <span>of other agents on the waitlist for Agentwise</span>
          </p>
          <Button asChild className={cn(TAN_BUTTON, 'px-padding-30 py-padding-14')}>
            <a href="#waitlist" style={tanButtonStyle}>
              Get Started
            </a>
          </Button>
        </div>
      </section>

      <section
        id="content"
        className="bg-sofia-secondary px-padding-20 py-padding-60 tablet:px-padding-40 tablet:py-[80px]"
      >
        <div className="mx-auto mb-gap-30 flex max-w-[900px] flex-col items-center gap-gap-16 text-center">
          <h2 className="font-garamond text-[50px] font-[500] leading-[65.25px] text-sofia-color-101">
            Marketing That Stops The Scroll
          </h2>
          <p className="max-w-[827px] font-almarai text-[18px] font-[400] leading-[28px] text-sofia-background">
            Hand-designed by our creative team. Personalized by AI to your market. Ready to post in
            minutes.
          </p>
        </div>
        {isEmpty ? (
          <p
            className="px-padding-40 text-center font-almarai text-[16px] font-[400] leading-[22px] text-sofia-background"
            role="status"
          >
            No Content Available
          </p>
        ) : (
          <ImageGallery images={galleryImages} />
        )}
        {extraCtas.length > 0 ? (
          <div className="mx-auto mt-gap-24 flex max-w-[900px] flex-wrap justify-center gap-gap-12">
            {extraCtas.map((cta) => (
              <Button key={`${cta.href}-${cta.label}`} asChild className={TAN_BUTTON}>
                <a href={cta.href} style={tanButtonStyle}>
                  {cta.label}
                </a>
              </Button>
            ))}
          </div>
        ) : null}
      </section>

      <section
        id="about"
        className="visitor-home-steps relative overflow-hidden px-padding-20 py-[80px] tablet:px-padding-40 desktop:px-[80px]"
      >
        <div
          className="visitor-home-grid pointer-events-none absolute inset-0 opacity-70"
          aria-hidden="true"
        />
        <img
          src="/assets/figma/ld0pdcexwugrmn6c7l8cvcjcsjk-1-2289-17245.png"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-gap-60">
          <h2 className="text-center font-garamond text-[50px] font-[500] leading-[65.25px] text-sofia-secondary">
            Stunning Marketing,
            <br />
            In Three Simple Steps
          </h2>
          <StepRow
            step="Step 01"
            title="Browse The Continuously"
            accent="Updated Collection."
            body="Explore hundreds of hand-designed templates for social, email, and more. Save the ones that fit your style."
            image="/assets/figma/frame-2147227816-2270-14191.png"
            imageAlt="The Complete Agentwise Content Library"
          />
          <StepRow
            step="Step 02"
            title="We Personalize It To Your"
            accent="Business And Market."
            body="Our AI customizes every template with your brand, your market, and your neighborhood — automatically. What used to take hours now takes seconds."
            image="/assets/figma/frame-2147227817-2270-14193.png"
            imageAlt="Agentwise Ultimate Mind personalization"
          />
          <StepRow
            step="Step 03"
            title="Post, Attract, Engage, And"
            accent="Stand Out."
            body="Download your finished content and share it anywhere. Looks like you have a full-scale marketing team (and with Agentwise, you do.)"
            image="/assets/figma/frame-2147227818-2270-14699.png"
            imageAlt="Finished content ready to post"
          />
        </div>
      </section>

      <section
        id="pricing"
        className="visitor-home-steps px-padding-20 pb-[80px] tablet:px-padding-40 desktop:px-[80px]"
      >
        <div className="mx-auto grid w-full max-w-[1400px] gap-gap-20 rounded-[32px] bg-sofia-color-93 px-padding-24 py-padding-40 tablet:px-padding-40 tablet:py-padding-60 desktop:grid-cols-2 desktop:gap-gap-60">
          <div className="flex flex-col gap-gap-20">
            <h2 className="font-garamond text-[42px] font-[500] leading-[54.81px] text-sofia-secondary">
              Agentwise Ultimate Mind
            </h2>
            <p className="font-almarai text-[16px] font-[400] leading-[26px] text-sofia-color-27">
              A bold, strategic AI advisor trained on your market, your business, and the realities
              of residential real estate. Brainstorm campaigns, pressure-test pricing, develop your
              growth plan, and get a second opinion 24/7 from a partner who actually knows your
              business.
            </p>
            <img
              src="/assets/figma/group-33654450-3654-11562.png"
              alt="Agentwise Ultimate Mind"
              className="h-auto w-full rounded-16 object-contain"
              width={748}
              height={695}
            />
          </div>
          <div className="flex flex-col justify-center gap-gap-20">
            <h2 className="font-garamond text-[50px] font-[500] leading-[65.25px] text-sofia-secondary">
              Here’s The Deal...
              <br />
              <span className="text-sofia-accent">Great Marketing</span>
              <br />
              Is Just The Start.
            </h2>
            <p className="font-almarai text-[16px] font-[400] leading-[26px] text-sofia-color-27">
              A custom business dashboard and a personalized AI advisor built into every plan.
            </p>
            <div>
              <Button asChild className={TAN_BUTTON}>
                <a href="#waitlist" style={tanButtonStyle}>
                  Learn More
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="blog"
        className="bg-sofia-color-91 px-padding-20 py-[80px] tablet:px-padding-40 desktop:px-[80px]"
      >
        <div className="mx-auto grid w-full max-w-[1400px] gap-gap-40 desktop:grid-cols-[minmax(0,420px)_minmax(0,1fr)] desktop:gap-gap-60">
          <div className="desktop:sticky desktop:top-padding-40 desktop:self-start">
            <h2 className="font-garamond text-[50px] font-[500] leading-[65.25px] text-sofia-color-101">
              Built For
              <br />
              <span className="text-sofia-accent">Agents Like</span>
              <br />
              You.
            </h2>
            <p className="mt-gap-16 font-almarai text-[16px] font-[400] leading-[26px] text-sofia-background">
              New agents, team leaders, and large brokerages are using Agentwise to spend less time
              marketing and more time closing without sacrificing quality.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-gap-16 tablet:grid-cols-2">
            {TESTIMONIALS.map((item) => (
              <Card
                key={item.name}
                className="flex flex-col gap-gap-16 rounded-16 border-sofia-color-55 bg-sofia-secondary p-padding-20 shadow-none"
              >
                <CardContent className="flex flex-col gap-gap-16 p-0">
                  <p
                    className="font-almarai text-[16px] leading-[18px] text-sofia-color-101"
                    aria-label="5 star rating"
                  >
                    ★★★★★
                  </p>
                  <p className="font-garamond text-[20px] font-[500] leading-[26px] text-sofia-color-103">
                    {item.quote}
                  </p>
                </CardContent>
                <CardFooter className="mt-auto gap-gap-12 p-0">
                  <img
                    src={item.avatar}
                    alt=""
                    className="h-[40px] w-[40px] rounded-full object-cover object-left-bottom"
                  />
                  <div>
                    <p className="font-public-sans text-[16px] font-[700] leading-[18px] text-sofia-color-101">
                      {item.name}
                    </p>
                    <p className="font-almarai text-[14px] font-[400] text-sofia-background">
                      {item.meta}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="bg-sofia-text-primary px-padding-20 py-[80px] tablet:px-padding-40 desktop:px-[80px]"
      >
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-gap-24 desktop:grid-cols-2 desktop:items-stretch">
          <div className="relative min-h-[520px] overflow-hidden rounded-24">
            <img
              src="/assets/figma/frame-1618873431-2729-13112.png"
              alt="Agent speaking on the phone"
              className="absolute inset-0 h-full w-full object-cover object-left"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-sofia-color-101/20 px-padding-24 text-center">
              <p className="font-garamond text-[42px] font-[500] uppercase leading-[50px] text-sofia-secondary">
                EVERYONE’S WAITING
              </p>
              <p className="mt-gap-8 font-kalam text-[24px] font-[400] leading-[31px] text-sofia-secondary">
                to buy until “the market is right”
              </p>
            </div>
          </div>
          <div
            id="waitlist"
            className="visitor-home-form-glow min-w-0 rounded-24 border border-sofia-color-106 px-padding-24 py-padding-36 tablet:px-padding-30"
          >
            <div className="mb-padding-24 flex flex-col items-center gap-gap-12 text-center">
              <span
                className="flex h-[48px] w-[48px] items-center justify-center rounded-full border border-sofia-accent font-garamond text-[24px] text-sofia-accent"
                aria-hidden="true"
              >
                a
              </span>
              <h2 className="font-garamond text-[42px] font-[500] leading-[54.81px] text-sofia-secondary">
                Let’s Work Together
              </h2>
            </div>
            <WaitlistForm />
          </div>
        </div>
      </section>

      <VisitorFooter links={FOOTER_NAV} />
    </div>
  );
}
