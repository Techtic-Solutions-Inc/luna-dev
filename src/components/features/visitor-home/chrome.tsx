import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  CalendarDays,
  ChevronRight,
  Crown,
  FolderOpen,
  LayoutGrid,
  LogOut,
  Menu,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const visitorFontAlmarai = "'Almarai', sans-serif";
export const visitorFontPublicSans = "'Public Sans', sans-serif";
export const visitorFontEbGaramond = "'EB Garamond', serif";
export const visitorFontSpaceGrotesk = "'Space Grotesk', sans-serif";
/** Figma uses Fellix; it is not on Google Fonts, so Inter is the licensed fallback. */
export const visitorFontFellix = "'Fellix', 'Inter', sans-serif";
export const visitorFontKalam = "'Kalam', cursive";

export const PHOTOS = {
  city: '/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-65-2289.png',
  cityAlt: '/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-323-1646.png',
  coffee: '/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-65-2287.png',
  coffeeAlt: '/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-323-1644.png',
  desk: '/assets/figma/attlgjgqkngefohwz-large-img6232-3-I2295-3482-65-2290.png',
  deskAlt: '/assets/figma/attlgjgqkngefohwz-large-img6232-3-I2295-3482-323-1647.png',
  contact: '/assets/figma/frame-1618873431-2729-13112.png',
  avatar: '/assets/figma/frame-2147227827-2270-16929.png',
  avatarAlt: '/assets/figma/frame-2147227828-2270-16985.png',
} as const;

export function BrandLogo({
  className,
  wordmarkClassName,
  taglineClassName,
  tagline = true,
  linked = true,
}: {
  className?: string;
  wordmarkClassName?: string;
  taglineClassName?: string;
  tagline?: boolean;
  linked?: boolean;
}) {
  const content = (
    <>
      <span
        className={cn(
          'typo-kalam text-[28px] font-bold leading-[38.8px] text-white',
          wordmarkClassName,
        )}
        style={{ fontFamily: visitorFontKalam }}
      >
        Agentwise
      </span>
      {tagline ? (
        <span
          className={cn(
            'typo-public mt-[2px] text-[10px] font-light uppercase tracking-[0.16em] text-white/80',
            taglineClassName,
          )}
          style={{ fontFamily: visitorFontPublicSans }}
        >
          Real Estate Marketing
        </span>
      ) : null}
    </>
  );

  if (!linked) {
    return <div className={cn('inline-flex flex-col leading-none', className)}>{content}</div>;
  }

  return (
    <Link
      to="/home"
      className={cn(
        'inline-flex flex-col leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e]',
        className,
      )}
      aria-label="Agentwise home"
    >
      {content}
    </Link>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.5 8.5V6.8c0-.7.5-1.3 1.6-1.3H17V3h-2.2C12.3 3 11 4.5 11 6.6v1.9H9v2.7h2V21h3.5v-9.8h2.4l.4-2.7h-2.8z"
      />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8zm9.2 1.3a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2z"
      />
    </svg>
  );
}

export function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M17.6 3h2.8l-6.1 7 7.2 11H16l-4.3-6.3L6.7 21H3.8l6.5-7.5L3.4 3h5.6l3.9 5.8L17.6 3zm-1 16.2h1.5L7.5 4.7H5.8l10.8 14.5z"
      />
    </svg>
  );
}

export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.5 9.2H3.8V20h2.7V9.2zM5.1 4A1.6 1.6 0 1 0 5.1 7.2 1.6 1.6 0 0 0 5.1 4zM20.2 20h-2.7v-5.6c0-1.6-.6-2.7-2-2.7-1.1 0-1.7.7-2 1.5-.1.3-.1.7-.1 1.1V20h-2.7s.04-9.3 0-10.8h2.7v1.8c.4-.7 1.4-1.8 3.4-1.8 2.5 0 4.4 1.6 4.4 5.1V20z"
      />
    </svg>
  );
}

export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.2 3h2.5c.2 1.8 1.3 3.3 3.3 3.8v2.4c-1.1.1-2.2-.2-3.2-.8v6.3c0 3.3-2.6 5.8-6.1 5.8S4.6 18 4.6 14.7c0-3.2 2.5-5.7 5.8-5.8v2.6c-1.7.1-3 1.5-3 3.2 0 1.8 1.4 3.2 3.2 3.2s3.2-1.4 3.2-3.2V3z"
      />
    </svg>
  );
}

export function GmailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M3 6.5 12 13l9-6.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6.5z" />
      <path fill="#4285F4" d="M21 6.5 12 13 3 6.5 5 4l7 5 7-5 2 2.5z" />
      <path fill="#34A853" d="M3 6.5V18l4-3.2V8.2L3 6.5z" />
      <path fill="#FBBC04" d="M21 6.5V18l-4-3.2V8.2L21 6.5z" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: 'About', href: '#waitlist' },
  { label: 'Content', href: '#waitlist' },
  { label: 'Blog', href: '#waitlist' },
  { label: 'Pricing', href: '#waitlist' },
] as const;

const navLinkClass =
  'typo-public text-[16px] font-semibold leading-[18.8px] text-white transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e] active:opacity-50';

const menuItemClass =
  'cursor-pointer text-white focus:bg-white/10 focus:text-white data-[highlighted]:bg-white/10 data-[highlighted]:text-white';

export function SiteNav() {
  return (
    <header className="relative z-20 mx-auto flex w-full max-w-[1680px] items-center justify-between gap-[16px] px-[30px] py-[24px] desktop:px-[40px]">
      <BrandLogo />
      <nav aria-label="Primary" className="hidden items-center gap-[30px] desktop:flex">
        {NAV_LINKS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={navLinkClass}
            style={{ fontFamily: visitorFontPublicSans }}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-[12px]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full border border-white text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e] desktop:hidden"
              aria-label="Open menu"
              style={{ fontFamily: visitorFontPublicSans }}
            >
              <Menu className="h-[20px] w-[20px]" aria-hidden="true" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="min-w-[180px] border-white/15 bg-[#11161c] text-white"
          >
            {NAV_LINKS.map((item) => (
              <DropdownMenuItem key={item.label} asChild className={menuItemClass}>
                <a
                  href={item.href}
                  className="typo-public text-[16px] font-semibold text-white"
                  style={{ fontFamily: visitorFontPublicSans }}
                >
                  {item.label}
                </a>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem asChild className={menuItemClass}>
              <a
                href="#waitlist"
                className="typo-public text-[16px] font-semibold text-white"
                style={{ fontFamily: visitorFontPublicSans }}
              >
                Get Started
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className={menuItemClass}>
              <Link
                to="/login"
                className="typo-public text-[16px] font-semibold text-white"
                style={{ fontFamily: visitorFontPublicSans }}
              >
                Log in
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <a
          href="#waitlist"
          className="typo-public hidden h-[44px] items-center justify-center rounded-[100px] border border-white px-[20px] text-[16px] font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e] active:scale-[0.98] desktop:inline-flex"
          style={{ fontFamily: visitorFontPublicSans }}
        >
          Get Started
        </a>
        <Link
          to="/login"
          className="typo-public hidden h-[44px] items-center justify-center rounded-[100px] bg-[#c8a47e] px-[20px] text-[16px] font-semibold text-[#11161c] transition hover:bg-[#8b6842] hover:text-[#11161c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e] active:brightness-75 desktop:inline-flex"
          style={{
            fontFamily: visitorFontPublicSans,
            color: '#11161c',
            backgroundColor: '#c8a47e',
          }}
        >
          Log in
        </Link>
      </div>
    </header>
  );
}

export function SocialCircle({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#waitlist"
      aria-label={label}
      className={cn(
        'flex h-[44px] w-[44px] items-center justify-center rounded-full text-white shadow-[0_4px_16px_#0000003f] transition hover:scale-105 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e] active:scale-95',
        className,
      )}
    >
      {children}
    </a>
  );
}

type SidebarVariant = 'dark' | 'light';

const SIDEBAR_ITEMS = [
  { group: 'Studio', items: ['Overview', 'Content Library', 'Content Calendar'] },
  { group: 'Tools', items: ['Ultimate Mind'] },
  { group: 'Account', items: ['Announcements', 'New Features', 'Subscription'] },
] as const;

function sidebarIcon(label: string) {
  switch (label) {
    case 'Overview':
      return LayoutGrid;
    case 'Content Library':
      return FolderOpen;
    case 'Content Calendar':
      return CalendarDays;
    case 'Ultimate Mind':
      return Sparkles;
    case 'Announcements':
      return Bell;
    case 'New Features':
      return Sparkles;
    case 'Subscription':
      return Crown;
    default:
      return LayoutGrid;
  }
}

export function AppSidebar({
  active,
  variant = 'dark',
}: {
  active: string;
  variant?: SidebarVariant;
}) {
  const isLight = variant === 'light';
  return (
    <aside
      className={cn(
        'hidden h-full w-[210px] shrink-0 flex-col justify-between px-[14px] py-[16px] tablet:flex',
        isLight ? 'bg-[#f7f2ec] text-[#11161c]' : 'bg-[#11161c] text-white',
      )}
    >
      <div>
        <BrandLogo
          linked={false}
          className="mb-[20px] px-[4px]"
          wordmarkClassName={cn(
            'text-[22px] leading-[28px]',
            isLight ? 'text-[#11161c]' : 'text-white',
          )}
          taglineClassName={isLight ? 'text-[#666666]' : 'text-white/70'}
        />
        <div className="flex flex-col gap-[16px]">
          {SIDEBAR_ITEMS.map((group) => (
            <div key={group.group} className="flex flex-col gap-[4px]">
              <p
                className={cn(
                  'typo-grotesk px-[8px] text-[10px] uppercase tracking-[0.12em]',
                  isLight ? 'text-[#637381]' : 'text-white/40',
                )}
                style={{ fontFamily: visitorFontSpaceGrotesk }}
              >
                {group.group}
              </p>
              {group.items.map((item) => {
                const Icon = sidebarIcon(item);
                const isActive = item === active;
                return (
                  <div
                    key={item}
                    className={cn(
                      'typo-fellix flex items-center gap-[8px] rounded-[10px] px-[8px] py-[7px] text-left text-[12px]',
                      isActive
                        ? isLight
                          ? 'bg-[#efe4d9] text-[#11161c]'
                          : 'bg-[#1d1a1a] text-white'
                        : isLight
                          ? 'text-[#637381]'
                          : 'text-white/70',
                    )}
                    style={{ fontFamily: visitorFontFellix }}
                  >
                    <Icon className="h-[14px] w-[14px] shrink-0" aria-hidden="true" />
                    {item}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-[12px]">
        <div
          className={cn(
            'rounded-[12px] border px-[10px] py-[10px]',
            isLight ? 'border-[#c8a47e33] bg-white' : 'border-white/10 bg-[#14100d]',
          )}
        >
          <p className="typo-inter text-[10px] text-[#637381]">AI Credit Usage</p>
          <p
            className={cn('typo-inter mt-[4px] text-[12px]', isLight ? 'text-[#11161c]' : '')}
            style={{ fontFamily: visitorFontAlmarai }}
          >
            Current 1,420 / 5,000
          </p>
          <div className="mt-[8px] h-[4px] overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[28%] rounded-full bg-[#c8a47e]" />
          </div>
        </div>
        <div className="flex items-center gap-[8px] px-[4px]">
          <img
            src={PHOTOS.avatar}
            alt="Joseph Stanley"
            className="h-[28px] w-[28px] rounded-full object-cover object-[20%_85%]"
          />
          <span className="flex-1 truncate typo-almarai text-[12px]">Joseph Stanley</span>
          <ChevronRight className="h-[14px] w-[14px] opacity-60" aria-hidden="true" />
        </div>
        <div
          className={cn(
            'flex items-center gap-[8px] px-[4px] typo-almarai text-[12px]',
            isLight ? 'text-[#666666]' : 'text-white/70',
          )}
        >
          <LogOut className="h-[14px] w-[14px]" aria-hidden="true" />
          Logout
        </div>
      </div>
    </aside>
  );
}

export function StepBadge({ label }: { label: string }) {
  return (
    <span
      className="typo-garamond inline-flex w-fit items-center rounded-[100px] border border-[#c8a47e] px-[14px] py-[6px] text-[16px] font-medium text-[#c8a47e]"
      style={{ fontFamily: visitorFontEbGaramond }}
    >
      {label}
    </span>
  );
}

export function MockWindow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      inert
      className={cn(
        'overflow-hidden rounded-[24px] border border-white/10 bg-[#11161c] shadow-[0_34px_44px_#00000072]',
        className,
      )}
    >
      {children}
    </div>
  );
}
