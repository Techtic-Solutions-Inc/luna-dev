import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  BrandLogo,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  PHOTOS,
  SiteNav,
  SocialCircle,
  StepBadge,
  TikTokIcon,
  XIcon,
  GmailIcon,
  visitorFontAlmarai,
  visitorFontEbGaramond,
  visitorFontKalam,
  visitorFontPublicSans,
} from '@/components/features/visitor-home/chrome';
import {
  ContentDetailDashboard,
  HeroDashboard,
  LibraryDashboard,
  UltimateMindDashboard,
} from '@/components/features/visitor-home/dashboards';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import type { VisitorHomeItem } from '@/types/api';

const GALLERY = [
  {
    src: PHOTOS.cityAlt,
    alt: 'White cottage listing card',
    caption: '[address + times]',
    italic: false,
  },
  {
    src: PHOTOS.coffee,
    alt: 'Iced drinks and sunglasses',
    caption: "Phone's busy, I'm doing the best I ever have",
    italic: true,
  },
  {
    src: PHOTOS.deskAlt,
    alt: 'Patio aerial template',
    caption: 'Doing showings in [insert neighborhood and city]!',
    italic: false,
  },
  {
    src: PHOTOS.city,
    alt: 'City street at dusk',
    caption: "If I was moving to [City Name], here's where I'd visit first (as a local)",
    italic: true,
  },
  {
    src: PHOTOS.desk,
    alt: 'Workspace flat lay',
    caption: "here's what I'm working on today",
    italic: false,
  },
  {
    src: PHOTOS.coffeeAlt,
    alt: 'Lifestyle coffee still',
    caption: 'What You Need To Know This Week',
    italic: false,
  },
] as const;

const TESTIMONIALS = [
  {
    quote:
      'The Ultimate Mind has become my second brain for pricing strategy. It pulls comps and pushes back on my assumptions like a seasoned mentor would.',
    name: 'Marcus Donovan',
    agency: 'Keller Williams · Denver, CO',
    avatar: PHOTOS.avatar,
  },
  {
    quote:
      'My listings actually look like they belong to a top-1% agent now. Three of my last four clients said the marketing is what sold them on hiring me.',
    name: 'Jordan Hayes',
    agency: 'eXp Realty · Nashville, TN',
    avatar: PHOTOS.avatarAlt,
  },
  {
    quote:
      'Agentwise replaced my entire marketing workflow. What used to take a full Sunday now takes a coffee break — and the content is better than anything I was making in Canva.',
    name: 'Jordan Hayes',
    agency: 'eXp Realty · Nashville, TN',
    avatar: PHOTOS.avatarAlt,
  },
  {
    quote:
      'New agents, team leaders, and large brokerages can finally ship consistent content without a full-time designer on payroll.',
    name: 'Marcus Donovan',
    agency: 'Keller Williams · Denver, CO',
    avatar: PHOTOS.avatar,
  },
] as const;

const FOOTER_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Content', to: '/content' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact Us', to: '#waitlist' },
] as const;

const inputClass =
  'h-[48px] rounded-[12px] border border-white/15 bg-[#1d1a1a] px-[18px] typo-almarai text-[16px] text-white placeholder:text-[#637381] hover:border-[#c8a47e]/60 focus-visible:ring-[#c8a47e] focus-visible:ring-offset-[#11161c] aria-[invalid=true]:border-[#ff5630]';

const headingFont = { fontFamily: visitorFontEbGaramond };
const bodyFont = { fontFamily: visitorFontAlmarai };
const labelFont = { fontFamily: visitorFontPublicSans };
const darkFieldStyle = {
  backgroundColor: '#1d1a1a',
  color: '#ffffff',
  fontFamily: visitorFontAlmarai,
};
const tanCtaStyle = {
  backgroundColor: '#c8a47e',
  color: '#11161c',
  fontFamily: visitorFontPublicSans,
};

interface VisitorHomeViewProps {
  items: VisitorHomeItem[];
}

function galleryCards(items: VisitorHomeItem[]) {
  const fromApi = items
    .filter((item) => item.image_url || item.image)
    .map((item) => ({
      src: item.image_url || item.image,
      alt: item.title || item.name || 'Marketing content',
      caption: item.title || item.description || '',
      italic: false,
    }));
  if (fromApi.length >= 3) {
    return fromApi.slice(0, 8);
  }
  return [...GALLERY];
}

function testimonialCards(items: VisitorHomeItem[]) {
  const fromApi = items
    .filter((item) => item.description && (item.full_name || item.name || item.title))
    .map((item) => ({
      quote: item.description,
      name: item.full_name || item.name || item.title,
      agency: item.category || 'Agentwise',
      avatar: item.image_url || item.image || PHOTOS.avatar,
    }));
  if (fromApi.length >= 2) {
    return fromApi.slice(0, 6);
  }
  return [...TESTIMONIALS];
}

export function VisitorHomeView({ items }: VisitorHomeViewProps) {
  const [waitlistSubmitting, setWaitlistSubmitting] = useState(false);
  const gallery = galleryCards(items);
  const testimonials = testimonialCards(items);
  const marquee = [...gallery, ...gallery];
  const columnA = [...testimonials, ...testimonials];
  const columnB = [...testimonials.slice(1), testimonials[0], ...testimonials.slice(1)];

  const onWaitlistSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setWaitlistSubmitting(true);
    window.setTimeout(() => {
      setWaitlistSubmitting(false);
      toast.success('You are on the Agentwise waitlist.');
      form.reset();
    }, 400);
  };

  return (
    <div
      className="visitor-home bg-[#11161c] text-white"
      style={{ fontFamily: visitorFontAlmarai }}
    >
      <section className="relative overflow-hidden bg-[#11161c]">
        <div className="pointer-events-none absolute inset-0 visitor-grid-bg" />
        <div className="pointer-events-none absolute -left-[120px] top-[-80px] h-[520px] w-[520px] rounded-full bg-[#8a43e1]/35 blur-[220px]" />
        <div className="pointer-events-none absolute left-[28%] top-[180px] h-[420px] w-[420px] rounded-full bg-[#105d39]/40 blur-[180px]" />
        <div className="pointer-events-none absolute right-[-80px] top-[40px] h-[480px] w-[480px] rounded-full bg-[#4b92eb99]/50 blur-[200px]" />
        <div className="pointer-events-none absolute left-[40%] top-[80px] h-[360px] w-[360px] rounded-full bg-[#c8a47e]/25 blur-[180px]" />
        <div className="pointer-events-none absolute bottom-[80px] left-[10%] h-[280px] w-[280px] rounded-full bg-[#8b6842]/30 blur-[160px]" />

        <SiteNav />

        <div className="relative mx-auto grid w-full max-w-[1680px] items-center gap-[40px] px-[40px] pb-[40px] pt-[20px] desktop:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
          <div className="flex max-w-[560px] flex-col gap-[20px]">
            <h1
              className="typo-garamond text-[50px] font-[500] leading-[65.25px] text-[#ffffff]"
              style={headingFont}
            >
              Stunning Real Estate
              <br />
              Marketing,
              <br />
              Personalized To Your
              <br />
              Market In Minutes
            </h1>
            <p
              className="typo-almarai max-w-[480px] text-[18px] font-[400] leading-[28px] text-[#637381]"
              style={bodyFont}
            >
              The all-in-one marketing platform for residential real estate agents AI-personalized
              content, a custom business dashboard, and a strategic AI advisor that knows your
              market.
            </p>
            <div className="flex items-center gap-[12px]" aria-label="Social platforms">
              <SocialCircle label="Facebook" className="bg-[#1877f2]">
                <FacebookIcon className="h-[18px] w-[18px]" />
              </SocialCircle>
              <SocialCircle
                label="Instagram"
                className="bg-[linear-gradient(180deg,#faad4f_0%,#dd2a7b_35%,#9537b0_62%,#515bd4_100%)]"
              >
                <InstagramIcon className="h-[18px] w-[18px]" />
              </SocialCircle>
              <SocialCircle label="TikTok" className="bg-[#1a1a1a]">
                <TikTokIcon className="h-[18px] w-[18px]" />
              </SocialCircle>
              <SocialCircle label="Gmail" className="bg-white">
                <GmailIcon className="h-[20px] w-[20px]" />
              </SocialCircle>
              <SocialCircle label="LinkedIn" className="bg-[#007ebb]">
                <LinkedInIcon className="h-[18px] w-[18px]" />
              </SocialCircle>
            </div>
          </div>
          <HeroDashboard />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-[16px] px-[40px] pb-[72px] pt-[12px]">
          <p
            className="text-center typo-almarai text-[18px] leading-[24px] text-white"
            style={bodyFont}
          >
            Join{' '}
            <span
              className="typo-garamond text-[24px] font-medium text-[#c8a47e]"
              style={headingFont}
            >
              Hundreds
            </span>{' '}
            of other agents on the waitlist for Agentwise
          </p>
          <Button
            asChild
            className="typo-public h-[48px] rounded-[100px] bg-[#c8a47e] px-[28px] text-[16px] font-semibold text-[#11161c] hover:bg-[#8b6842] hover:text-[#11161c] active:brightness-75"
          >
            <a href="#waitlist" style={tanCtaStyle}>
              Get Started
            </a>
          </Button>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-[120px] bg-gradient-to-b from-transparent to-white" />
      </section>

      <section className="overflow-hidden bg-white py-[60px]">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-[12px] px-[40px] text-center">
          <h2
            className="typo-garamond text-[50px] font-medium leading-[65.25px] text-[#11161c]"
            style={headingFont}
          >
            Marketing that stops the scroll
          </h2>
          <p className="typo-almarai text-[18px] leading-[28px] text-[#637381]" style={bodyFont}>
            Hand-designed by our creative team. Personalized by AI to your market. Ready to post in
            minutes.
          </p>
        </div>
        <div className="mt-[30px] overflow-hidden">
          <div className="visitor-marquee flex w-max gap-[24px] pr-[24px]">
            {marquee.map((card, index) => (
              <article
                key={`${card.src}-${index}`}
                className="relative h-[552px] w-[316px] shrink-0 overflow-hidden rounded-[24px]"
              >
                <img src={card.src} alt={card.alt} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[#00000033]" />
                <p
                  className={`absolute inset-x-[18px] top-1/2 -translate-y-1/2 text-center typo-garamond text-[20px] leading-[26px] text-white ${
                    card.italic ? 'italic' : ''
                  }`}
                >
                  {card.caption}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#11161c] py-[102px]">
        <div className="pointer-events-none absolute inset-0 visitor-grid-bg" />
        <div className="pointer-events-none absolute left-1/2 top-[40%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#c8a47e]/15 blur-[180px]" />
        <div className="pointer-events-none absolute inset-0 visitor-grid-bg" />
        <div className="relative mx-auto flex max-w-[1680px] flex-col gap-[80px] px-[40px]">
          <h2
            className="text-center typo-garamond text-[42px] font-medium leading-[55px] text-white"
            style={headingFont}
          >
            Stunning Marketing, In Three Simple Steps
          </h2>

          <div className="grid items-center gap-[40px] desktop:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] desktop:gap-[80px]">
            <div className="flex max-w-[460px] flex-col gap-[16px]">
              <StepBadge label="Step 01" />
              <h3
                className="typo-garamond text-[38px] font-medium leading-[50px] text-white"
                style={headingFont}
              >
                Browse The Continuously <span className="text-[#c8a47e]">Updated</span> Collection.
              </h3>
              <p
                className="typo-almarai text-[18px] leading-[28px] text-[#637381]"
                style={bodyFont}
              >
                Explore hundreds of hand-designed templates for social, email, and more. Save the
                ones that fit your style.
              </p>
            </div>
            <LibraryDashboard />
          </div>

          <div className="grid items-center gap-[40px] desktop:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] desktop:gap-[80px]">
            <div className="flex max-w-[460px] flex-col gap-[16px]">
              <StepBadge label="Step 02" />
              <h3
                className="typo-garamond text-[38px] font-medium leading-[50px] text-white"
                style={headingFont}
              >
                We Personalize It To Your{' '}
                <span className="text-[#c8a47e]">Business And Market.</span>
              </h3>
              <p
                className="typo-almarai text-[18px] leading-[28px] text-[#637381]"
                style={bodyFont}
              >
                Our AI customizes every template with your brand, your market, and your neighborhood
                — automatically. What used to take hours now takes seconds.
              </p>
            </div>
            <UltimateMindDashboard />
          </div>

          <div className="grid items-center gap-[40px] desktop:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] desktop:gap-[80px]">
            <div className="flex max-w-[460px] flex-col gap-[16px]">
              <StepBadge label="Step 03" />
              <h3
                className="typo-garamond text-[38px] font-medium leading-[50px] text-white"
                style={headingFont}
              >
                Post, Attract, Engage, And <span className="text-[#c8a47e]">Stand Out.</span>
              </h3>
              <p
                className="typo-almarai text-[18px] leading-[28px] text-[#637381]"
                style={bodyFont}
              >
                Download your finished content and share it anywhere. Looks like you have a
                full-scale marketing team (and with Agentwise, you do.)
              </p>
            </div>
            <ContentDetailDashboard />
          </div>
        </div>
      </section>

      <section className="bg-[#11161c] px-[24px] pb-[102px] tablet:px-[30px]">
        <div className="visitor-grid-bg-green relative mx-auto grid max-w-[1680px] overflow-hidden rounded-[24px] bg-gradient-to-b from-[#1d1a1a] to-[#105d39] px-[32px] py-[48px] tablet:px-[48px] desktop:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] desktop:gap-[48px] desktop:px-[64px] desktop:py-[64px]">
          <div className="pointer-events-none absolute left-[-80px] top-[-80px] h-[360px] w-[360px] rounded-full bg-[#c8a47e]/20 blur-[140px]" />
          <div className="pointer-events-none absolute right-[20%] top-[10%] h-[280px] w-[280px] rounded-full bg-[#8b6842]/25 blur-[120px]" />
          <div className="relative z-10 flex flex-col gap-[20px]">
            <h2
              className="typo-garamond text-[36px] font-medium leading-[47px] text-white"
              style={headingFont}
            >
              Agentwise Ultimate Mind
            </h2>
            <p
              className="max-w-[560px] typo-almarai text-[16px] leading-[26px] text-white/75"
              style={bodyFont}
            >
              A bold, strategic AI advisor trained on your market, your business, and the realities
              of residential real estate. Brainstorm campaigns, pressure-test pricing, develop your
              growth plan, and get a second opinion 24/7 from a partner who actually knows your
              business.
            </p>
            <UltimateMindDashboard sidebar="light" />
          </div>
          <div className="relative z-10 flex flex-col justify-center gap-[20px] pt-[24px] desktop:pt-0">
            <h2
              className="typo-garamond text-[48px] font-medium leading-[58px] text-white"
              style={headingFont}
            >
              Here&apos;s The Deal...
              <br />
              <span className="text-[#c8a47e]">Great Marketing</span> Is Just The Start.
            </h2>
            <p className="typo-almarai text-[18px] leading-[28px] text-white/75" style={bodyFont}>
              A custom business dashboard and a personalized AI advisor built into every plan.
            </p>
            <Button
              asChild
              className="typo-public h-[48px] w-fit rounded-[100px] bg-[#c8a47e] px-[28px] text-[16px] font-semibold text-[#11161c] hover:bg-[#8b6842] hover:text-[#11161c]"
            >
              <Link to="/about" style={tanCtaStyle}>
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-[80px]">
        <div className="mx-auto grid max-w-[1680px] items-start gap-[40px] px-[40px] desktop:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] desktop:gap-[64px]">
          <div className="desktop:sticky desktop:top-[40px]">
            <h2
              className="typo-garamond text-[60px] font-medium leading-[72px] text-[#11161c]"
              style={headingFont}
            >
              Built For
              <br />
              <span className="text-[#c8a47e]">Agents Like You.</span>
            </h2>
            <p
              className="mt-[20px] max-w-[380px] typo-almarai text-[16px] leading-[26px] text-[#637381]"
              style={bodyFont}
            >
              New agents, team leaders, and large brokerages are using Agentwise to spend less time
              marketing and more time closing without sacrificing quality.
            </p>
          </div>
          <div className="relative h-[560px] overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[72px] bg-gradient-to-b from-white to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[72px] bg-gradient-to-t from-white to-transparent" />
            <div className="grid h-full grid-cols-1 gap-[16px] tablet:grid-cols-2">
              <div className="visitor-testimonial-col flex flex-col gap-[16px]">
                {columnA.map((card, index) => (
                  <TestimonialCard key={`a-${card.name}-${index}`} {...card} />
                ))}
              </div>
              <div className="visitor-testimonial-col-delayed hidden flex-col gap-[16px] tablet:flex">
                {columnB.map((card, index) => (
                  <TestimonialCard key={`b-${card.name}-${index}`} {...card} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="waitlist" className="bg-[#11161c] px-[24px] py-[102px] tablet:px-[30px]">
        <div className="mx-auto grid max-w-[1680px] gap-[24px] desktop:grid-cols-2">
          <article className="relative min-h-[560px] overflow-hidden rounded-[24px]">
            <img
              src={PHOTOS.contact}
              alt="Agent on a call"
              className="absolute inset-0 h-full w-[200%] max-w-none object-cover object-left"
            />
            <div className="absolute inset-0 bg-[#00000059]" />
            <div className="relative z-10 flex h-full min-h-[560px] flex-col items-center justify-center px-[32px] text-center">
              <h2
                className="typo-garamond text-[42px] font-medium uppercase leading-[50px] text-white"
                style={headingFont}
              >
                Everyone&apos;s Waiting
              </h2>
              <p
                className="typo-kalam mt-[8px] text-[22px] text-white"
                style={{ fontFamily: visitorFontKalam }}
              >
                to buy until &apos;the market is right&apos;
              </p>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-b from-[#1d1818] to-[#050505] px-[28px] py-[36px] tablet:px-[48px]">
            <div className="pointer-events-none absolute left-1/2 top-0 h-[280px] w-[360px] -translate-x-1/2 rounded-full bg-[#c8a47e]/30 blur-[90px]" />
            <div className="pointer-events-none absolute right-[-60px] bottom-[-40px] h-[240px] w-[240px] rounded-full bg-[#8b6842]/35 blur-[110px]" />
            <div className="relative mx-auto flex w-full max-w-[520px] flex-col items-center">
              <span className="flex h-[64px] w-[64px] items-center justify-center rounded-full border border-[#c8a47e] bg-white typo-kalam text-[28px] text-[#c8a47e]">
                a
              </span>
              <h2
                className="mt-[16px] text-center typo-garamond text-[42px] font-medium leading-[54px] text-white"
                style={headingFont}
              >
                Let&apos;s Work Together
              </h2>
              <form
                className="mt-[28px] flex w-full flex-col gap-[14px]"
                onSubmit={onWaitlistSubmit}
              >
                <div className="grid gap-[14px] tablet:grid-cols-2">
                  <Input
                    name="firstName"
                    required
                    placeholder="First Name"
                    autoComplete="given-name"
                    aria-label="First Name"
                    className={inputClass}
                    style={darkFieldStyle}
                  />
                  <Input
                    name="lastName"
                    required
                    placeholder="Last Name"
                    autoComplete="family-name"
                    aria-label="Last Name"
                    className={inputClass}
                    style={darkFieldStyle}
                  />
                </div>
                <div className="grid gap-[14px] tablet:grid-cols-2">
                  <Input
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    autoComplete="email"
                    aria-label="Email"
                    className={inputClass}
                    style={darkFieldStyle}
                  />
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Phone number"
                    autoComplete="tel"
                    aria-label="Phone number"
                    className={inputClass}
                    style={darkFieldStyle}
                  />
                </div>
                <Input
                  name="experience"
                  placeholder="How long have you been in Real Estate?"
                  aria-label="How long have you been in Real Estate?"
                  className={inputClass}
                  style={darkFieldStyle}
                />
                <Input
                  name="marketing"
                  placeholder="What do you currently do for marketing your business?"
                  aria-label="What do you currently do for marketing your business?"
                  className={inputClass}
                  style={darkFieldStyle}
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  aria-label="Your Message"
                  rows={4}
                  className="min-h-[120px] rounded-[12px] border border-white/15 bg-[#1d1a1a] px-[18px] py-[14px] typo-almarai text-[16px] text-white placeholder:text-[#637381] hover:border-[#c8a47e]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e] aria-[invalid=true]:border-[#ff5630]"
                  style={darkFieldStyle}
                />
                <Button
                  type="submit"
                  disabled={waitlistSubmitting}
                  className="typo-public mx-auto mt-[8px] h-[48px] w-full max-w-[280px] rounded-[100px] bg-[#c8a47e] text-[16px] font-semibold text-[#11161c] hover:bg-[#8b6842] hover:text-[#11161c]"
                  style={tanCtaStyle}
                >
                  {waitlistSubmitting ? 'Joining…' : 'Join the waitlist now'}
                </Button>
              </form>
            </div>
          </article>
        </div>
      </section>

      <footer className="bg-[#050505] px-[30px] pb-[30px] pt-[64px]">
        <div className="mx-auto flex max-w-[1680px] flex-col gap-[30px]">
          <div className="flex items-start justify-between gap-[24px]">
            <BrandLogo
              wordmarkClassName="text-[32px] text-[#c8a47e]"
              taglineClassName="text-[#c8a47e]"
            />
            <div className="flex items-center gap-[18px]">
              <a
                href="https://www.facebook.com"
                aria-label="Facebook"
                className="text-white transition hover:text-[#c8a47e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e]"
              >
                <FacebookIcon className="h-[16px] w-[16px]" />
              </a>
              <a
                href="https://x.com"
                aria-label="X"
                className="text-white transition hover:text-[#c8a47e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e]"
              >
                <XIcon className="h-[16px] w-[16px]" />
              </a>
              <a
                href="https://www.linkedin.com"
                aria-label="LinkedIn"
                className="text-white transition hover:text-[#c8a47e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e]"
              >
                <LinkedInIcon className="h-[16px] w-[16px]" />
              </a>
              <a
                href="https://www.instagram.com"
                aria-label="Instagram"
                className="text-white transition hover:text-[#c8a47e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e]"
              >
                <InstagramIcon className="h-[16px] w-[16px]" />
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-[16px] tablet:flex-row tablet:items-center tablet:justify-between">
            <nav aria-label="Footer" className="flex flex-wrap gap-[24px]">
              {FOOTER_LINKS.map((item) =>
                item.to.startsWith('#') ? (
                  <a
                    key={item.label}
                    href={item.to}
                    className="typo-almarai text-[16px] text-white transition hover:text-[#c8a47e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e]"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="typo-almarai text-[16px] text-white transition hover:text-[#c8a47e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e]"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
            <a
              href="mailto:hello@agentwisemarketing.com"
              className="typo-almarai text-[16px] text-white transition hover:text-[#c8a47e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e]"
            >
              hello@agentwisemarketing.com
            </a>
          </div>
          <Separator className="bg-[#333333]" />
          <div
            className="typo-public flex flex-col gap-[12px] text-[14px] text-[#637381] tablet:flex-row tablet:items-center tablet:justify-between"
            style={labelFont}
          >
            <p>© 2026 Agentwise. All Rights Reserved.</p>
            <p>
              <Link
                to="/terms"
                className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e]"
              >
                Terms of Service
              </Link>
              {' | '}
              <Link
                to="/privacy"
                className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e]"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TestimonialCard({
  quote,
  name,
  agency,
  avatar,
}: {
  quote: string;
  name: string;
  agency: string;
  avatar: string;
}) {
  return (
    <article className="rounded-[16px] border border-[#eaeaea] bg-white p-[24px] shadow-[0_8px_16px_#919eab28]">
      <p className="typo-almarai text-[14px] tracking-[0.12em] text-[#11161c]" aria-label="5 stars">
        ★★★★★
      </p>
      <p className="typo-almarai mt-[12px] text-[16px] leading-[24px] text-[#11161c]">{quote}</p>
      <div className="mt-[16px] flex items-center gap-[12px]">
        <img
          src={avatar}
          alt=""
          className="h-[40px] w-[40px] rounded-full object-cover object-[20%_85%]"
        />
        <div>
          <p
            className="typo-public text-[14px] font-semibold text-[#11161c]"
            style={{ fontFamily: visitorFontPublicSans }}
          >
            {name}
          </p>
          <p className="typo-almarai text-[12px] text-[#637381]">{agency}</p>
        </div>
      </div>
    </article>
  );
}
