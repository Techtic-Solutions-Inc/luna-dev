import { useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { useVisitorHome, useVisitorHomeErrorMessage } from '@/hooks/useVisitorHome';
import { waitlistSchema, type WaitlistFormValues } from '@/lib/validation';
import { cn } from '@/lib/utils';
import type { VisitorHomeItem } from '@/types/api';
import { ImageGallery, type GalleryImage } from './ImageGallery';
import { LinkList, type NavLinkItem } from './LinkList';
import { visitorColors, visitorFonts } from './visitorTokens';

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
  'h-auto rounded-[100px] border border-[#c8a47e] bg-[#c8a47e] px-[24px] py-[12px] text-[16px] font-[700] leading-[18px] text-[#11161c] hover:brightness-[0.92] focus-visible:ring-[#c8a47e] active:brightness-75 disabled:cursor-not-allowed disabled:opacity-50';

const GHOST_BUTTON =
  'h-auto rounded-[100px] border border-[#ffffff] bg-transparent px-[24px] py-[12px] text-[16px] font-[400] leading-[18px] text-[#ffffff] hover:bg-[#ffffff]/10 focus-visible:ring-[#c8a47e] active:bg-[#ffffff]/20 disabled:cursor-not-allowed disabled:opacity-50';

const DARK_FIELD =
  'visitor-home-input h-[52px] rounded-[12px] border border-[#554545] bg-[#11161c] text-[16px] font-[400] text-[#ffffff] shadow-none placeholder:text-[#637381] hover:border-[#c8a47e] focus-visible:ring-[#c8a47e] focus-visible:ring-offset-[#11161c]';

const tanButtonStyle = {
  fontFamily: visitorFonts.almarai,
  backgroundColor: visitorColors.accent,
  color: visitorColors.color103,
  borderColor: visitorColors.accent,
} as const;

const darkFieldStyle = {
  fontFamily: visitorFonts.almarai,
  backgroundColor: visitorColors.color103,
  color: '#ffffff',
  borderColor: visitorColors.color111,
} as const;

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

function linksFromItems(items: VisitorHomeItem[], fallback: NavLinkItem[]): NavLinkItem[] {
  const fromApi = items
    .filter((item) => item.link && (item.title || item.name))
    .map((item) => ({
      href: item.link,
      label: item.title || item.name,
    }));
  return fromApi.length > 0 ? fromApi : fallback;
}

function BrandMark({ tone }: { tone: 'light' | 'gold' }) {
  const color = tone === 'gold' ? visitorColors.accent : '#ffffff';
  return (
    <a
      href="#top"
      className="inline-flex flex-col no-underline hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11161c] active:opacity-70"
      aria-label="Agentwise home"
    >
      <span
        className="text-[28px] font-[700] leading-[39px]"
        style={{ fontFamily: visitorFonts.kalam, color }}
      >
        Agentwise
      </span>
      {tone === 'gold' ? (
        <span
          className="mt-[-6px] text-[10px] font-[400] uppercase tracking-[0.18em]"
          style={{ fontFamily: visitorFonts.almarai, color }}
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
      className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-full transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e] active:scale-95"
    >
      {children}
    </a>
  );
}

function HeroSocials() {
  return (
    <ul className="flex items-center gap-[12px]" aria-label="Published on">
      <li>
        <SocialIconLink href="https://facebook.com" label="Facebook">
          <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#1877f2] text-[14px] font-[700] text-[#ffffff]">
            f
          </span>
        </SocialIconLink>
      </li>
      <li>
        <SocialIconLink href="https://instagram.com" label="Instagram">
          <span
            className="flex h-[32px] w-[32px] items-center justify-center rounded-full text-[#ffffff]"
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
          <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#000001] text-[#ffffff] ring-1 ring-[#ffffff]/30">
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
          <span
            className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#ffffff] text-[15px] font-[700]"
            style={{ fontFamily: visitorFonts.inter }}
          >
            <span className="text-[#ea4335]">M</span>
          </span>
        </SocialIconLink>
      </li>
      <li>
        <SocialIconLink href="https://linkedin.com" label="LinkedIn">
          <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#007ebb] font-almarai text-[11px] font-[700] text-[#ffffff]">
            in
          </span>
        </SocialIconLink>
      </li>
    </ul>
  );
}

function FooterSocials() {
  const iconClass = 'h-[18px] w-[18px] fill-[#ffffff]';
  return (
    <ul className="flex items-center gap-[18px]" aria-label="Social media">
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
    <div className="grid items-center gap-[30px] desktop:grid-cols-[minmax(0,420px)_minmax(0,1fr)] desktop:gap-[60px]">
      <div className="flex max-w-[420px] flex-col gap-[16px]">
        <span
          className="inline-flex w-fit rounded-[100px] border border-[#c8a47e] px-[14px] py-[6px] text-[16px] font-[400] leading-[18px] text-[#c8a47e]"
          style={{ fontFamily: visitorFonts.publicSans, color: visitorColors.accent }}
        >
          {step}
        </span>
        <h3
          className="text-[42px] font-[500] leading-[54.81px] text-[#ffffff]"
          style={{ fontFamily: visitorFonts.ebGaramond }}
        >
          {title} <span style={{ color: visitorColors.accent }}>{accent}</span>
        </h3>
        <p
          className="text-[16px] font-[400] leading-[26px]"
          style={{ fontFamily: visitorFonts.almarai, color: visitorColors.background }}
        >
          {body}
        </p>
      </div>
      <img src={image} alt={imageAlt} className="h-auto w-full rounded-[16px] object-contain" />
    </div>
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
    <form onSubmit={onSubmit} className="flex flex-col gap-[16px]" noValidate>
      <div className="grid gap-[16px] tablet:grid-cols-2">
        <div className="flex flex-col gap-[6px]">
          <Label
            htmlFor="first_name"
            className="sr-only"
            style={{ fontFamily: visitorFonts.fellix }}
          >
            First Name
          </Label>
          <Input
            id="first_name"
            autoComplete="given-name"
            placeholder="First Name"
            className={DARK_FIELD}
            style={darkFieldStyle}
            aria-invalid={Boolean(fieldError('first_name'))}
            {...form.register('first_name')}
          />
          {fieldError('first_name') ? (
            <p
              className="text-[12px] text-[#ff5630]"
              style={{ fontFamily: visitorFonts.almarai, color: visitorColors.border }}
            >
              {fieldError('first_name')}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-[6px]">
          <Label
            htmlFor="last_name"
            className="sr-only"
            style={{ fontFamily: visitorFonts.fellix }}
          >
            Last Name
          </Label>
          <Input
            id="last_name"
            autoComplete="family-name"
            placeholder="Last Name"
            className={DARK_FIELD}
            style={darkFieldStyle}
            aria-invalid={Boolean(fieldError('last_name'))}
            {...form.register('last_name')}
          />
          {fieldError('last_name') ? (
            <p
              className="text-[12px] text-[#ff5630]"
              style={{ fontFamily: visitorFonts.almarai, color: visitorColors.border }}
            >
              {fieldError('last_name')}
            </p>
          ) : null}
        </div>
      </div>
      <div className="grid gap-[16px] tablet:grid-cols-2">
        <div className="flex flex-col gap-[6px]">
          <Label htmlFor="email" className="sr-only" style={{ fontFamily: visitorFonts.inter }}>
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
            {...form.register('email')}
          />
          {fieldError('email') ? (
            <p
              className="text-[12px] text-[#ff5630]"
              style={{ fontFamily: visitorFonts.almarai, color: visitorColors.border }}
            >
              {fieldError('email')}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-[6px]">
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
            {...form.register('phone')}
          />
          {fieldError('phone') ? (
            <p
              className="text-[12px] text-[#ff5630]"
              style={{ fontFamily: visitorFonts.almarai, color: visitorColors.border }}
            >
              {fieldError('phone')}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col gap-[6px]">
        <Label htmlFor="tenure" className="sr-only">
          How long have you been in Real Estate?
        </Label>
        <Input
          id="tenure"
          placeholder="How long have you been in Real Estate?"
          className={DARK_FIELD}
          style={darkFieldStyle}
          aria-invalid={Boolean(fieldError('tenure'))}
          {...form.register('tenure')}
        />
        {fieldError('tenure') ? (
          <p
            className="text-[12px] text-[#ff5630]"
            style={{ fontFamily: visitorFonts.almarai, color: visitorColors.border }}
          >
            {fieldError('tenure')}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-[6px]">
        <Label htmlFor="marketing" className="sr-only">
          What do you currently do for marketing your business?
        </Label>
        <Input
          id="marketing"
          placeholder="What do you currently do for marketing your business?"
          className={DARK_FIELD}
          style={darkFieldStyle}
          aria-invalid={Boolean(fieldError('marketing'))}
          {...form.register('marketing')}
        />
        {fieldError('marketing') ? (
          <p
            className="text-[12px] text-[#ff5630]"
            style={{ fontFamily: visitorFonts.almarai, color: visitorColors.border }}
          >
            {fieldError('marketing')}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-[6px]">
        <Label htmlFor="message" className="sr-only">
          Your Message
        </Label>
        <textarea
          id="message"
          placeholder="Your Message"
          rows={4}
          className={cn(DARK_FIELD, 'h-auto min-h-[112px] resize-y py-[14px]')}
          style={darkFieldStyle}
          aria-invalid={Boolean(fieldError('message'))}
          {...form.register('message')}
        />
        {fieldError('message') ? (
          <p
            className="text-[12px] text-[#ff5630]"
            style={{ fontFamily: visitorFonts.almarai, color: visitorColors.border }}
          >
            {fieldError('message')}
          </p>
        ) : null}
      </div>
      <div className="flex justify-center pt-[10px]">
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
        <p className="text-center font-almarai text-[14px] text-[#c8a47e]" role="status">
          You are on the waitlist.
        </p>
      ) : null}
    </form>
  );
}

function HomeSkeleton() {
  return (
    <div
      className="visitor-home min-h-screen bg-[#050505]"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center px-[40px] py-[60px]">
        <Skeleton className="mb-[40px] h-[32px] w-full max-w-[1100px] bg-[#1d1a1a]" />
        <div className="grid w-full max-w-[1400px] gap-[30px] desktop:grid-cols-2">
          <div className="flex flex-col gap-[20px]">
            <Skeleton className="h-[180px] w-full bg-[#1d1a1a]" />
            <Skeleton className="h-[60px] w-[80%] bg-[#1d1a1a]" />
            <Skeleton className="h-[32px] w-[200px] bg-[#1d1a1a]" />
          </div>
          <Skeleton className="h-[420px] w-full rounded-[16px] bg-[#1d1a1a]" />
        </div>
      </div>
      <div className="bg-[#ffffff] px-[40px] py-[60px]">
        <Skeleton className="mx-auto mb-[20px] h-[48px] w-[480px]" />
        <div className="grid grid-cols-1 gap-[20px] tablet:grid-cols-2 desktop:grid-cols-3">
          <Skeleton className="h-[320px] rounded-[24px]" />
          <Skeleton className="h-[320px] rounded-[24px]" />
          <Skeleton className="h-[320px] rounded-[24px]" />
        </div>
      </div>
    </div>
  );
}

function VisitorHeader({ links }: { links: NavLinkItem[] }) {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-[1400px] items-center justify-between gap-[20px] px-[20px] py-[24px] tablet:px-[40px]">
      <BrandMark tone="light" />
      <div className="hidden desktop:block">
        <LinkList links={links} ariaLabel="Primary" className="gap-[30px]" />
      </div>
      <div className="flex items-center gap-[12px]">
        <Button asChild className={GHOST_BUTTON}>
          <a href="#waitlist" style={{ fontFamily: visitorFonts.publicSans }}>
            Get Started
          </a>
        </Button>
        <Button asChild className={TAN_BUTTON}>
          <Link to="/login" style={tanButtonStyle}>
            Log in
          </Link>
        </Button>
      </div>
    </header>
  );
}

function VisitorFooter({ links }: { links: NavLinkItem[] }) {
  return (
    <footer className="bg-[#000000] px-[20px] py-[60px] tablet:px-[40px] desktop:px-[80px]">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-[30px]">
        <div className="flex items-start justify-between gap-[20px]">
          <BrandMark tone="gold" />
          <FooterSocials />
        </div>
        <div className="flex flex-col items-start justify-between gap-[16px] tablet:flex-row tablet:items-center">
          <LinkList links={links} ariaLabel="Footer" className="gap-[32px]" />
          <a
            href="mailto:hello@agentwisemarketing.com"
            className="text-[16px] font-[600] text-[#ffffff] hover:text-[#c8a47e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e]"
            style={{ fontFamily: visitorFonts.publicSans }}
          >
            hello@agentwisemarketing.com
          </a>
        </div>
        <div className="h-px w-full bg-[#262626]" />
        <div className="flex flex-col justify-between gap-[12px] tablet:flex-row tablet:items-center">
          <p
            className="text-[16px] font-[300] leading-[17.856px] text-[#637381]"
            style={{ fontFamily: visitorFonts.almarai, color: visitorColors.background }}
          >
            © 2026 Agentwise. All Rights Reserved.
          </p>
          <p
            className="text-[14px] font-[500] text-[#637381]"
            style={{ fontFamily: visitorFonts.spaceGrotesk, color: visitorColors.background }}
          >
            <a
              href="#terms"
              className="hover:text-[#ffffff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e]"
            >
              Terms of Service
            </a>
            <span aria-hidden="true"> | </span>
            <a
              href="#privacy"
              className="hover:text-[#ffffff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e]"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export function HomeContent() {
  const query = useVisitorHome();
  const errorMessage = useVisitorHomeErrorMessage(query.error);
  const items = useMemo(() => query.data?.items ?? [], [query.data?.items]);
  const isEmpty = query.isSuccess && items.length === 0;

  const galleryImages = useMemo(() => galleryFromItems(items), [items]);
  const navLinks = useMemo(() => linksFromItems(items, DEFAULT_NAV), [items]);
  const footerLinks = useMemo(() => {
    const extras = linksFromItems(items, []);
    return extras.length > 0 ? extras : FOOTER_NAV;
  }, [items]);

  if (query.isLoading) {
    return <HomeSkeleton />;
  }

  return (
    <div id="top" className="visitor-home bg-[#050505] text-[#ffffff]">
      {query.isError ? (
        <div className="fixed bottom-[20px] right-[20px] z-50 w-[min(420px,calc(100%-40px))]">
          <ErrorState
            title="Unable to load home"
            message={errorMessage}
            onRetry={() => {
              void query.refetch();
            }}
          />
        </div>
      ) : null}
      {isEmpty ? (
        <div className="fixed bottom-[20px] left-[20px] z-50 w-[min(420px,calc(100%-40px))]">
          <EmptyState title="No Content Available" />
        </div>
      ) : null}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-[16px] focus:top-[16px] focus:z-50 focus:bg-[#c8a47e] focus:px-[16px] focus:py-[8px] focus:text-[#000001]"
      >
        Skip to content
      </a>

      <section className="visitor-home-hero relative overflow-hidden">
        <div
          className="visitor-home-grid pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div
          className="visitor-home-hero-glow pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <VisitorHeader links={navLinks} />
        <div
          id="main"
          className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-[30px] px-[20px] pb-[60px] pt-[20px] tablet:px-[40px] desktop:grid-cols-[minmax(0,520px)_minmax(0,1fr)] desktop:gap-[40px] desktop:pb-[80px] desktop:pt-[40px]"
        >
          <div className="flex flex-col gap-[20px]">
            <h1
              className="max-w-[560px] font-garamond text-[50px] font-[500] leading-[65.25px] text-[#ffffff]"
              style={{ fontFamily: visitorFonts.ebGaramond }}
            >
              Stunning Real Estate Marketing, Personalized To Your Market In Minutes
            </h1>
            <p
              className="max-w-[488px] font-almarai text-[18px] font-[400] leading-[24px] text-[#ffffff]"
              style={{ fontFamily: visitorFonts.almarai }}
            >
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
        <div className="relative z-10 flex flex-col items-center gap-[20px] px-[20px] pb-[80px] text-center">
          <p
            className="flex flex-wrap items-baseline justify-center gap-[6px] font-almarai text-[18px] font-[400] leading-[24px] text-[#ffffff]"
            style={{ fontFamily: visitorFonts.almarai }}
          >
            <span>Join</span>
            <span
              className="font-garamond text-[26px] font-[500] leading-[34px] text-[#c8a47e]"
              style={{ fontFamily: visitorFonts.ebGaramond }}
            >
              Hundreds
            </span>
            <span>of other agents on the waitlist for Agentwise</span>
          </p>
          <Button asChild className={cn(TAN_BUTTON, 'px-[30px] py-[14px]')}>
            <a href="#waitlist" style={tanButtonStyle}>
              Get Started
            </a>
          </Button>
        </div>
      </section>

      <section
        id="content"
        className="bg-[#ffffff] px-[20px] py-[60px] tablet:px-[40px] tablet:py-[80px]"
      >
        <div className="mx-auto mb-[30px] flex max-w-[900px] flex-col items-center gap-[16px] text-center">
          <h2
            className="font-garamond text-[50px] font-[500] leading-[65.25px] text-[#000001]"
            style={{ fontFamily: visitorFonts.ebGaramond }}
          >
            Marketing That Stops The Scroll
          </h2>
          <p
            className="max-w-[827px] font-almarai text-[18px] font-[400] leading-[28px] text-[#637381]"
            style={{ fontFamily: visitorFonts.almarai }}
          >
            Hand-designed by our creative team. Personalized by AI to your market. Ready to post in
            minutes.
          </p>
        </div>
        <ImageGallery images={galleryImages} />
      </section>

      <section
        id="about"
        className="visitor-home-steps relative overflow-hidden px-[20px] py-[80px] tablet:px-[40px] desktop:px-[80px]"
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
        <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-[60px]">
          <h2
            className="text-center font-garamond text-[50px] font-[500] leading-[65.25px] text-[#ffffff]"
            style={{ fontFamily: visitorFonts.ebGaramond }}
          >
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
        className="visitor-home-steps px-[20px] pb-[80px] tablet:px-[40px] desktop:px-[80px]"
      >
        <div className="mx-auto grid w-full max-w-[1400px] gap-[20px] rounded-[32px] bg-[#182620] px-[24px] py-[40px] tablet:px-[40px] tablet:py-[60px] desktop:grid-cols-2 desktop:gap-[60px]">
          <div className="flex flex-col gap-[20px]">
            <h2
              className="font-garamond text-[42px] font-[500] leading-[54.81px] text-[#ffffff]"
              style={{ fontFamily: visitorFonts.ebGaramond }}
            >
              Agentwise Ultimate Mind
            </h2>
            <p
              className="font-almarai text-[16px] font-[400] leading-[26px] text-[#d9d9d9]"
              style={{ fontFamily: visitorFonts.almarai }}
            >
              A bold, strategic AI advisor trained on your market, your business, and the realities
              of residential real estate. Brainstorm campaigns, pressure-test pricing, develop your
              growth plan, and get a second opinion 24/7 from a partner who actually knows your
              business.
            </p>
            <img
              src="/assets/figma/group-33654450-3654-11562.png"
              alt="Agentwise Ultimate Mind"
              className="h-auto w-full rounded-[16px] object-contain"
              width={748}
              height={695}
            />
          </div>
          <div className="flex flex-col justify-center gap-[20px]">
            <h2
              className="font-garamond text-[50px] font-[500] leading-[65.25px] text-[#ffffff]"
              style={{ fontFamily: visitorFonts.ebGaramond }}
            >
              Here’s The Deal...
              <br />
              <span className="text-[#c8a47e]">Great Marketing</span>
              <br />
              Is Just The Start.
            </h2>
            <p
              className="font-almarai text-[16px] font-[400] leading-[26px] text-[#d9d9d9]"
              style={{ fontFamily: visitorFonts.almarai }}
            >
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
        className="bg-[#f9f9f9] px-[20px] py-[80px] tablet:px-[40px] desktop:px-[80px]"
      >
        <div className="mx-auto grid w-full max-w-[1400px] gap-[40px] desktop:grid-cols-[minmax(0,420px)_minmax(0,1fr)] desktop:gap-[60px]">
          <div className="desktop:sticky desktop:top-[40px] desktop:self-start">
            <h2
              className="font-garamond text-[50px] font-[500] leading-[65.25px] text-[#000001]"
              style={{ fontFamily: visitorFonts.ebGaramond }}
            >
              Built For
              <br />
              <span className="text-[#c8a47e]">Agents Like</span>
              <br />
              You.
            </h2>
            <p
              className="mt-[16px] font-almarai text-[16px] font-[400] leading-[26px] text-[#637381]"
              style={{ fontFamily: visitorFonts.almarai }}
            >
              New agents, team leaders, and large brokerages are using Agentwise to spend less time
              marketing and more time closing without sacrificing quality.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-[16px] tablet:grid-cols-2">
            {TESTIMONIALS.map((item) => (
              <article
                key={item.name}
                className="flex flex-col gap-[16px] rounded-[16px] border border-[#eaeaea] bg-[#ffffff] p-[20px]"
              >
                <p
                  className="font-almarai text-[16px] leading-[18px] text-[#000001]"
                  aria-label="5 star rating"
                >
                  ★★★★★
                </p>
                <p
                  className="font-garamond text-[20px] font-[500] leading-[26px] text-[#11161c]"
                  style={{ fontFamily: visitorFonts.ebGaramond }}
                >
                  {item.quote}
                </p>
                <div className="mt-auto flex items-center gap-[12px]">
                  <img
                    src={item.avatar}
                    alt=""
                    className="h-[40px] w-[40px] rounded-full object-cover object-left-bottom"
                  />
                  <div>
                    <p
                      className="text-[16px] font-[700] leading-[18px] text-[#000001]"
                      style={{ fontFamily: visitorFonts.publicSans, color: visitorColors.color101 }}
                    >
                      {item.name}
                    </p>
                    <p
                      className="text-[14px] font-[400] text-[#637381]"
                      style={{ fontFamily: visitorFonts.almarai, color: visitorColors.background }}
                    >
                      {item.meta}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="bg-[#000000] px-[20px] py-[80px] tablet:px-[40px] desktop:px-[80px]"
      >
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-[24px] desktop:grid-cols-2 desktop:items-stretch">
          <div className="relative min-h-[520px] overflow-hidden rounded-[24px]">
            <img
              src="/assets/figma/frame-1618873431-2729-13112.png"
              alt="Agent speaking on the phone"
              className="absolute inset-0 h-full w-full object-cover object-left"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#000001]/20 px-[24px] text-center">
              <p
                className="text-[42px] font-[500] uppercase leading-[50px] text-[#ffffff]"
                style={{ fontFamily: visitorFonts.ebGaramond }}
              >
                EVERYONE’S WAITING
              </p>
              <p
                className="mt-[8px] text-[24px] font-[400] leading-[31px] text-[#ffffff]"
                style={{ fontFamily: visitorFonts.kalam }}
              >
                to buy until “the market is right”
              </p>
            </div>
          </div>
          <div
            id="waitlist"
            className="visitor-home-form-glow min-w-0 rounded-[24px] border border-[#1d1a1a] px-[24px] py-[36px] tablet:px-[30px]"
          >
            <div className="mb-[24px] flex flex-col items-center gap-[12px] text-center">
              <span
                className="flex h-[48px] w-[48px] items-center justify-center rounded-full border border-[#c8a47e] text-[24px] text-[#c8a47e]"
                style={{ fontFamily: visitorFonts.ebGaramond, color: visitorColors.accent }}
                aria-hidden="true"
              >
                a
              </span>
              <h2
                className="text-[42px] font-[500] leading-[54.81px] text-[#ffffff]"
                style={{ fontFamily: visitorFonts.ebGaramond }}
              >
                Let’s Work Together
              </h2>
            </div>
            <WaitlistForm />
          </div>
        </div>
      </section>

      <VisitorFooter links={footerLinks} />
      <div id="terms" className="sr-only">
        Terms of Service
      </div>
      <div id="privacy" className="sr-only">
        Privacy Policy
      </div>
    </div>
  );
}
