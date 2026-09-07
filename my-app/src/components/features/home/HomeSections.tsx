import {
  Brain,
  Calendar,
  ChevronRight,
  LogOut,
  Search,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TESTIMONIALS } from './constants'

function SidebarItem({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div
      className={`rounded-[8px] px-[12px] py-[8px] vh-font-almarai text-[13px] ${
        active ? 'bg-[#ffffff]/10 text-[#ffffff]' : 'text-[#ffffff]/60'
      }`}
    >
      {label}
    </div>
  )
}

export function DashboardPreview() {
  return (
    <div className="relative w-full max-w-[780px]">
      <div className="absolute -right-[20px] -top-[30px] z-10 w-[220px] rounded-[12px] border border-[#ffffff]/10 bg-[var(--vh-color-107)]/90 p-[16px] backdrop-blur-sm">
        <div className="mb-[8px] flex items-center gap-[8px]">
          <Calendar className="h-4 w-4 text-[var(--vh-accent)]" aria-hidden="true" />
          <span className="vh-font-public-sans text-[13px] font-[600] text-[#ffffff]">
            This Week&apos;s Content Calendar
          </span>
        </div>
        <p className="vh-font-almarai text-[12px] leading-[16px] text-[#ffffff]/60">
          Plan and schedule your content for the week ahead.
        </p>
      </div>

      <div className="absolute -bottom-[20px] -right-[10px] z-10 w-[240px] rounded-[12px] border border-[#ffffff]/10 bg-[var(--vh-color-107)]/90 p-[16px] backdrop-blur-sm">
        <div className="mb-[8px] flex items-center gap-[8px]">
          <Brain className="h-4 w-4 text-[var(--vh-accent)]" aria-hidden="true" />
          <span className="vh-font-public-sans text-[13px] font-[600] text-[#ffffff]">
            Agentwise Ultimate Mind
          </span>
        </div>
        <p className="vh-font-almarai text-[12px] leading-[16px] text-[#ffffff]/60">
          Your strategic AI advisor trained on your business and market.
        </p>
      </div>

      <div className="overflow-hidden rounded-[16px] border border-[#ffffff]/10 bg-[var(--vh-color-103)] shadow-2xl">
        <div className="flex">
          <aside className="hidden w-[180px] shrink-0 border-r border-[#ffffff]/10 bg-[var(--vh-color-105)] p-[16px] sm:block">
            <p className="mb-[20px] vh-font-kalam text-[18px] text-[#ffffff]">Agentwise</p>
            <p className="mb-[8px] vh-font-fellix text-[10px] font-[600] uppercase tracking-wider text-[#ffffff]/40">
              Studio
            </p>
            <div className="mb-[16px] space-y-[2px]">
              <SidebarItem label="Overview" active />
              <SidebarItem label="Content Library" />
              <SidebarItem label="Content Calendar" />
            </div>
            <p className="mb-[8px] vh-font-fellix text-[10px] font-[600] uppercase tracking-wider text-[#ffffff]/40">
              Tools
            </p>
            <SidebarItem label="Ultimate Mind" />
            <div className="mt-[24px] rounded-[8px] bg-[#ffffff]/5 p-[10px]">
              <p className="vh-font-almarai text-[10px] text-[#ffffff]/50">AI Credit Usage</p>
              <div className="mt-[6px] h-[4px] rounded-full bg-[#ffffff]/10">
                <div className="h-full w-[28%] rounded-full bg-[var(--vh-accent)]" />
              </div>
              <p className="mt-[4px] vh-font-almarai text-[10px] text-[#ffffff]/40">1,420 / 5,000</p>
            </div>
            <div className="mt-[16px] flex items-center gap-[8px]">
              <div className="h-[28px] w-[28px] overflow-hidden rounded-full">
                <img
                  src="/assets/figma/group-33654450-3654-11562.png"
                  alt="Joseph Stanley"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="vh-font-almarai text-[11px] font-[700] text-[#ffffff]">Joseph Stanley</p>
                <button
                  type="button"
                  className="flex items-center gap-[4px] vh-font-almarai text-[10px] text-[#ffffff]/40"
                >
                  <LogOut className="h-3 w-3" aria-hidden="true" />
                  Logout
                </button>
              </div>
            </div>
          </aside>

          <div className="flex-1 p-[20px]">
            <p className="vh-font-eb-garamond text-[22px] font-[500] text-[#ffffff]">
              Good Morning, Ava.
            </p>
            <p className="mt-[8px] vh-font-almarai text-[13px] leading-[20px] text-[#ffffff]/50">
              We&apos;ve created a new collection of homes and marketing materials specifically for
              your market. Check them out below.
            </p>

            <div className="mt-[16px] flex items-center gap-[8px] rounded-[100px] border border-[#ffffff]/10 bg-[#ffffff]/5 px-[16px] py-[10px]">
              <Search className="h-4 w-4 shrink-0 text-[#ffffff]/40" aria-hidden="true" />
              <span className="vh-font-almarai text-[12px] text-[#ffffff]/40">
                Generate captions, listing descriptions, email blasts, and Reels scripts in your
                brand voice.
              </span>
            </div>

            <div className="mt-[16px] flex gap-[10px]">
              <button
                type="button"
                className="rounded-[100px] bg-[var(--vh-accent)] px-[16px] py-[8px] vh-font-public-sans text-[12px] font-[600] text-[var(--vh-color-103)] transition-colors hover:bg-[var(--vh-accent)]/90"
              >
                Plan My Week
              </button>
              <button
                type="button"
                className="rounded-[100px] border border-[#ffffff]/20 px-[16px] py-[8px] vh-font-public-sans text-[12px] font-[600] text-[#ffffff] transition-colors hover:bg-[#ffffff]/5"
              >
                My Content Calendar
              </button>
            </div>

            <p className="mt-[20px] vh-font-public-sans text-[13px] font-[600] text-[#ffffff]">
              New Content This Week
            </p>
            <div className="mt-[10px] flex gap-[10px] overflow-x-auto">
              {[
                {
                  src: '/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-323-1646.png',
                  tag: 'Reels',
                  alt: 'Reels content preview',
                },
                {
                  src: '/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-323-1644.png',
                  tag: 'Story',
                  alt: 'Story content preview',
                },
                {
                  src: '/assets/figma/attlgjgqkngefohwz-large-img6232-3-I2295-3482-323-1647.png',
                  tag: 'Reels',
                  alt: 'Reels listing content preview',
                },
              ].map((card) => (
                <div key={card.src} className="relative h-[100px] w-[72px] shrink-0 overflow-hidden rounded-[8px]">
                  <img src={card.src} alt={card.alt} className="h-full w-full object-cover" />
                  <span className="absolute bottom-[4px] left-[4px] rounded-[4px] bg-[#000000]/60 px-[4px] py-[1px] vh-font-almarai text-[9px] text-[#ffffff]">
                    {card.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface HeroSectionProps {
  headline?: string
  subheadline?: string
}

export function HeroSection({ headline, subheadline }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pb-[60px] pt-[20px]">
      <div className="vh-grid-overlay" aria-hidden="true" />

      <div className="vh-hero-grid relative mx-auto max-w-[1920px]">
        <div>
          <h1 className="vh-font-eb-garamond text-[40px] font-[500] leading-[52px] text-[#ffffff] sm:text-[50px] sm:leading-[65.25px]">
            {headline ??
              'Stunning Real Estate Marketing, Personalized To Your Market In Minutes'}
          </h1>
          <p className="vh-font-almarai vh-body-34 mt-[20px] max-w-[520px] text-[18px] font-[400] leading-[24px] text-[#ffffff]">
            {subheadline ??
              'The all-in-one marketing platform for residential real estate agents. AI-personalized content, a custom business dashboard, and a strategic AI advisor that knows your market.'}
          </p>

          <div className="mt-[24px] flex items-center gap-[12px]">
            {[
              { label: 'Facebook', color: '#4285f4' },
              { label: 'Instagram', color: '#e53a71' },
              { label: 'TikTok', color: '#ffffff' },
              { label: 'Gmail', color: '#ea4335' },
              { label: 'LinkedIn', color: '#007ebb' },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="flex h-[36px] w-[36px] items-center justify-center rounded-full border border-[#ffffff]/20 bg-[#ffffff]/5 transition-colors hover:bg-[#ffffff]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vh-accent)]"
              >
                <span className="vh-font-public-sans text-[11px] font-[600]" style={{ color: social.color }}>
                  {social.label[0]}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <DashboardPreview />
        </div>
      </div>
    </section>
  )
}

export function WaitlistCta() {
  return (
    <div className="flex flex-col items-center gap-[20px] pb-[80px]">
      <p className="vh-font-almarai vh-body text-center text-[#ffffff]">
        Join <span className="vh-body-25 text-[var(--vh-accent)]">10,000+</span> other agents on the
        waitlist. It&apos;s free to join.
      </p>
      <Button asChild className="vh-btn-accent h-[44px] px-[32px]">
        <a href="#get-started" id="get-started">
          Get Started
        </a>
      </Button>
    </div>
  )
}

export function MarketingGallerySection() {
  return (
    <section id="content" className="bg-[#ffffff] px-[40px] py-[80px]">
      <div className="mx-auto max-w-[1920px]">
        <h2 className="text-center vh-font-eb-garamond text-[40px] font-[500] leading-[52px] text-[var(--vh-color-103)] sm:text-[48px]">
          Marketing That Stops The Scroll
        </h2>
        <p className="mx-auto mt-[20px] max-w-[827px] text-center vh-font-almarai text-[16px] font-[400] leading-[28px] text-[var(--vh-background-muted)]">
          Hand-designed by our creative team. Personalized by AI to your market. Ready to post in
          minutes.
        </p>
      </div>
    </section>
  )
}

function StepBadge({ step }: { step: string }) {
  return (
    <span className="inline-flex items-center rounded-[100px] border border-[var(--vh-accent)]/50 px-[16px] py-[6px] vh-font-space-grotesk text-[13px] font-[500] text-[var(--vh-accent)]">
      {step}
    </span>
  )
}

function ContentLibraryMockup() {
  return (
    <div className="overflow-hidden rounded-[16px] border border-[#ffffff]/10 bg-[var(--vh-color-103)]">
      <div className="flex">
        <aside className="hidden w-[160px] shrink-0 border-r border-[#ffffff]/10 bg-[var(--vh-color-105)] p-[14px] md:block">
          <p className="mb-[16px] vh-font-kalam text-[16px] text-[#ffffff]">Agentwise</p>
          <SidebarItem label="Content Library" active />
          <SidebarItem label="Content Calendar" />
          <SidebarItem label="Ultimate Mind" />
        </aside>
        <div className="flex-1 p-[16px]">
          <p className="vh-font-eb-garamond text-[18px] text-[#ffffff]">
            The Complete Agentwise Content Library
          </p>
          <div className="mt-[12px] flex gap-[8px]">
            <div className="flex flex-1 items-center gap-[6px] rounded-[8px] border border-[#ffffff]/10 px-[10px] py-[6px]">
              <Search className="h-3.5 w-3.5 text-[#ffffff]/40" aria-hidden="true" />
              <span className="vh-font-almarai text-[11px] text-[#ffffff]/40">Search templates...</span>
            </div>
          </div>
          <div className="mt-[12px] grid grid-cols-4 gap-[8px]">
            {[
              {
                src: '/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-323-1646.png',
                alt: 'Suburban home listing template',
              },
              {
                src: '/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-323-1644.png',
                alt: 'Lifestyle marketing template',
              },
              {
                src: '/assets/figma/attlgjgqkngefohwz-large-img6232-3-I2295-3482-323-1647.png',
                alt: 'Patio courtyard listing template',
              },
              {
                src: '/assets/figma/frame-2147227817-2270-14193.png',
                alt: 'Historic building listing template',
              },
            ].map((item) => (
              <div key={item.src} className="aspect-[3/4] overflow-hidden rounded-[8px]">
                <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function UltimateMindMockup() {
  return (
    <div className="overflow-hidden rounded-[16px] border border-[#ffffff]/10 bg-[var(--vh-color-103)]">
      <div className="flex">
        <aside className="hidden w-[160px] shrink-0 border-r border-[#ffffff]/10 bg-[var(--vh-color-105)] p-[14px] md:block">
          <p className="mb-[16px] vh-font-kalam text-[16px] text-[#ffffff]">Agentwise</p>
          <SidebarItem label="Ultimate Mind" active />
        </aside>
        <div className="flex flex-1 flex-col items-center bg-[#ffffff] p-[24px]">
          <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[var(--vh-accent)]/20 vh-font-eb-garamond text-[24px] italic text-[var(--vh-accent)]">
            a
          </div>
          <p className="mt-[12px] vh-font-eb-garamond text-[20px] font-[500] text-[var(--vh-color-103)]">
            Agentwise Ultimate Mind
          </p>
          <p className="mt-[6px] text-center vh-font-almarai text-[13px] text-[var(--vh-background-muted)]">
            Your strategic advisor — trained on your business, your market, and your voice.
          </p>
          <div className="mt-[16px] flex w-full items-center gap-[8px] rounded-[100px] border border-[#637381]/20 bg-[#637381]/5 px-[14px] py-[10px]">
            <span className="vh-font-almarai text-[12px] text-[var(--vh-background-muted)]/60">
              Ask the Mind anything about your business...
            </span>
            <button
              type="button"
              className="ml-auto flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[var(--vh-accent)] text-[var(--vh-color-103)]"
              aria-label="Send"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-[12px] grid w-full grid-cols-2 gap-[8px]">
            {[
              'What should I post this week to stand out in Austin?',
              'Draft a positioning statement for my luxury buyer niche.',
            ].map((prompt) => (
              <div
                key={prompt}
                className="flex items-start gap-[6px] rounded-[8px] bg-[var(--vh-accent)]/10 p-[10px]"
              >
                <Sparkles className="mt-[2px] h-3.5 w-3.5 shrink-0 text-[var(--vh-accent)]" aria-hidden="true" />
                <span className="vh-font-almarai text-[11px] leading-[15px] text-[var(--vh-color-103)]">{prompt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ContentModalMockup() {
  return (
    <div className="relative overflow-hidden rounded-[16px] border border-[#ffffff]/10 bg-[var(--vh-color-103)] p-[16px]">
      <div className="grid grid-cols-3 gap-[6px] opacity-40">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-[3/4] rounded-[6px] bg-[#ffffff]/10" />
        ))}
      </div>
      <div className="absolute inset-[16px] flex items-center justify-end">
        <div className="w-[280px] rounded-[12px] bg-[#ffffff] p-[16px] shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="vh-font-eb-garamond text-[16px] font-[500] text-[var(--vh-color-103)]">
                Market update — Austin Q2
              </p>
              <p className="vh-font-almarai text-[11px] text-[var(--vh-background-muted)]">Instagram Post</p>
            </div>
            <button type="button" className="text-[var(--vh-background-muted)]" aria-label="Close">
              ×
            </button>
          </div>
          <div className="mt-[10px] flex gap-[6px]">
            <button type="button" className="rounded-[6px] bg-[var(--vh-color-103)] px-[10px] py-[4px] vh-font-almarai text-[10px] text-[#ffffff]">
              Customize
            </button>
            <button type="button" className="rounded-[6px] border border-[#637381]/30 px-[10px] py-[4px] vh-font-almarai text-[10px] text-[var(--vh-color-103)]">
              Copy Caption
            </button>
          </div>
          <div className="mt-[10px] overflow-hidden rounded-[8px] bg-[var(--vh-accent)]/10 p-[8px]">
            <img
              src="/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-323-1646.png"
              alt="Listing preview"
              className="mx-auto h-[120px] w-[80px] rounded-[6px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function StepsSection() {
  const steps = [
    {
      step: 'Step 01',
      title: (
        <>
          Browse The Continuously{' '}
          <span className="text-[var(--vh-accent)]">Updated Collection.</span>
        </>
      ),
      description:
        'Explore hundreds of hand-designed templates for social, email, and more. Save the ones that fit your style.',
      mockup: <ContentLibraryMockup />,
    },
    {
      step: 'Step 02',
      title: (
        <>
          We Personalize It To Your{' '}
          <span className="text-[var(--vh-accent)]">Business And</span> Market.
        </>
      ),
      description:
        'Our AI customizes every template with your brand, your market, and your neighborhood — automatically. What used to take hours now takes seconds.',
      mockup: <UltimateMindMockup />,
    },
    {
      step: 'Step 03',
      title: (
        <>
          Post, Attract, Engage, And{' '}
          <span className="text-[var(--vh-accent)]">Stand Out.</span>
        </>
      ),
      description:
        'Download your finished content and share it anywhere. Looks like you have a full-scale marketing team (and with Agentwise, you do.)',
      mockup: <ContentModalMockup />,
    },
  ]

  return (
    <section className="relative px-[40px] py-[80px]">
      <div
        className="pointer-events-none absolute inset-0 bg-[length:40px_40px] opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1920px]">
        <h2 className="mb-[80px] text-center vh-font-eb-garamond text-[40px] font-[500] leading-[52px] text-[#ffffff] sm:text-[48px]">
          Stunning Marketing, In Three Simple Steps
        </h2>

        <div className="flex flex-col gap-[101px]">
          {steps.map((item) => (
            <div key={item.step} className="vh-steps-grid">
              <div>
                <StepBadge step={item.step} />
                <h3 className="mt-[20px] vh-font-eb-garamond text-[32px] font-[500] leading-[42px] text-[#ffffff] sm:text-[40px]">
                  {item.title}
                </h3>
                <p className="mt-[16px] vh-font-almarai text-[16px] font-[400] leading-[26px] text-[#ffffff]/60">
                  {item.description}
                </p>
              </div>
              <div>{item.mockup}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function UltimateMindFeatureSection() {
  return (
    <section
      id="about"
      className="relative bg-[var(--vh-color-103)] px-[40px] py-[80px]"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 800px 500px at 85% 50%, rgba(200, 164, 126, 0.08) 0%, transparent 70%)',
      }}
    >
      <div className="vh-grid-overlay opacity-[0.03]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1920px] items-center gap-[60px] lg:grid-cols-2">
        <div>
          <h2 className="vh-font-eb-garamond text-[36px] font-[500] leading-[46px] text-[#ffffff]">
            Agentwise Ultimate Mind
          </h2>
          <p className="mt-[16px] vh-font-almarai text-[16px] font-[400] leading-[26px] text-[#ffffff]/70">
            A custom business dashboard and a personalized AI advisor built into every plan. Ask
            anything about your market, your content strategy, or your brand positioning.
          </p>
          <div className="mt-[30px]">
            <UltimateMindMockup />
          </div>
        </div>
        <div>
          <h2 className="vh-font-eb-garamond text-[40px] font-[500] leading-[52px] text-[#ffffff] sm:text-[48px]">
            Here&apos;s The Deal...{' '}
            <span className="text-[var(--vh-accent)]">Great Marketing</span> Is Just The Start.
          </h2>
          <p className="mt-[20px] vh-font-almarai text-[16px] font-[400] leading-[26px] text-[#ffffff]/70">
            A custom business dashboard and a personalized AI advisor built into every plan.
          </p>
          <Button asChild className="vh-btn-accent mt-[30px] h-[44px] px-[24px]">
            <a href="#contact">Learn More</a>
          </Button>
        </div>
      </div>
    </section>
  )
}

export function TestimonialsSection() {
  return (
    <section className="bg-[#ffffff] px-[40px] py-[80px]">
      <div className="mx-auto grid max-w-[1920px] gap-[60px] lg:grid-cols-[1fr_1.5fr]">
        <div>
          <h2 className="vh-font-eb-garamond text-[40px] font-[500] leading-[52px] text-[var(--vh-color-103)] sm:text-[48px]">
            Built For{' '}
            <span className="text-[var(--vh-accent)]">Agents Like You.</span>
          </h2>
          <p className="mt-[20px] vh-font-almarai text-[16px] font-[400] leading-[26px] text-[var(--vh-background-muted)]">
            New agents, team leaders, and large brokerages are using Agentwise to spend less time
            marketing and more time closing without sacrificing quality.
          </p>
        </div>
        <div className="columns-1 gap-[16px] sm:columns-2 lg:columns-3">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.name}
              className="mb-[16px] break-inside-avoid rounded-[12px] border border-[#637381]/15 bg-[#ffffff] p-[20px] shadow-sm"
            >
              <div className="mb-[12px] flex gap-[2px]" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-[14px] text-[var(--vh-color-103)]">
                    ★
                  </span>
                ))}
              </div>
              <p className="vh-font-eb-garamond text-[15px] font-[400] leading-[22px] text-[var(--vh-color-103)]">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-[16px] flex items-center gap-[10px]">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-[36px] w-[36px] rounded-full object-cover"
                />
                <div>
                  <p className="vh-font-almarai text-[14px] font-[700] text-[var(--vh-color-103)]">
                    {testimonial.name}
                  </p>
                  <p className="vh-font-almarai text-[12px] text-[var(--vh-background-muted)]">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
