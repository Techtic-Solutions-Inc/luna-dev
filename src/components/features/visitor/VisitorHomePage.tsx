import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { SiFacebook, SiInstagram, SiTiktok, SiX } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa6';
import { FiStar } from 'react-icons/fi';
import LeadCaptureForm from './LeadCaptureForm';
import ContractGapBanner from '../../ui/ContractGapBanner';
import { useVisitorHome } from '../../../hooks/useVisitorHome';
import { PATHS } from '../../../routes/paths';

const galleryItems = [
  { title: 'Luxury listing', tone: 'from-[#3d3530] to-[#2a2520]' },
  { title: 'Lifestyle content', tone: 'from-[#4a4038] to-[#353028]' },
  { title: 'Market update', tone: 'from-[#2f3d35] to-[#1e2a22]' },
  { title: 'Open house promo', tone: 'from-[#3a3040] to-[#252018]' },
  { title: 'Neighborhood spotlight', tone: 'from-[#353840] to-[#222830]' },
];

const steps = [
  {
    num: '01',
    title: 'Browse The Continuously Updated Collection',
    body: 'Help real estate professionals create content faster with ready-made templates.',
    cta: 'Download',
  },
  {
    num: '02',
    title: 'We Personalize It To Your Business And Market',
    body: 'Click Customize to edit the location, market data, images, or branding.',
    cta: 'Customize',
  },
  {
    num: '03',
    title: 'Post, Attract, Engage, And Stand Out',
    body: 'Increase audience engagement through visually appealing social media posts. Download your finished content and share it anywhere.',
    cta: 'Download',
  },
];

const testimonials = [
  {
    quote:
      'Agentwise cut my content creation time in half. The templates look like they came from a full creative team.',
    name: 'Marcus Doninici',
    role: 'Better Homes & Gardens',
    rating: 5,
  },
  {
    quote:
      'Finally, marketing that actually reflects my market. My engagement doubled within the first month.',
    name: 'Sarah Chen',
    role: 'Compass · Austin, TX',
    rating: 5,
  },
  {
    quote:
      'The Ultimate Mind feature alone is worth the subscription. It knows my business better than I do.',
    name: 'James Rodriguez',
    role: 'Keller Williams · Denver, CO',
    rating: 5,
  },
];

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Content', href: '#content' },
  { label: 'Blog', href: '#blog' },
  { label: 'Pricing', href: '#pricing' },
];

const ContentSearchBar = () => {
  const { attemptSearch, showSearchGapBanner } = useVisitorHome();
  const [query, setQuery] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await attemptSearch(query);
  };

  return (
    <div className="mx-auto mt-8 max-w-xl">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search content library…"
          aria-label="Search content library"
          disabled
          className="flex-1 rounded-full border border-color-24 bg-white px-5 py-3 text-sm text-color-20 placeholder:text-color-57 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-60"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-accent px-6 py-3 text-sm text-white hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Search
        </button>
      </form>
      {showSearchGapBanner ? (
        <div className="mt-3">
          <ContractGapBanner message="Visitor search endpoint not available" />
        </div>
      ) : null}
    </div>
  );
};

const StarRating = ({ count }: { count: number }) => (
  <div
    className="flex gap-0.5 text-accent"
    aria-label={`${count} out of 5 stars`}
  >
    {Array.from({ length: count }).map((_, index) => (
      <FiStar key={index} className="fill-accent" aria-hidden="true" />
    ))}
  </div>
);

const VisitorHomePage = () => (
  <div className="bg-black text-white">
    {/* Hero */}
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 75% 15%, rgba(200,164,126,0.22) 0%, transparent 45%), radial-gradient(circle at 15% 85%, rgba(100,60,180,0.18) 0%, transparent 40%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 py-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-4">
          <p className="font-garamond text-2xl italic leading-none sm:text-3xl">
            Agentwise
          </p>
          <nav
            className="hidden items-center gap-8 font-public text-sm text-color-93 md:flex"
            aria-label="Main"
          >
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to={PATHS.SIGN_UP}
              className="rounded-full border border-white/30 px-3 py-2 text-xs text-white hover:bg-white/10 sm:px-4 sm:text-sm"
            >
              Get Started
            </Link>
            <Link
              to={PATHS.SIGN_IN}
              className="rounded-full bg-accent px-3 py-2 text-xs text-white hover:brightness-110 sm:px-4 sm:text-sm"
            >
              Login
            </Link>
          </div>
        </header>

        <div className="mt-12 grid items-center gap-12 pb-16 lg:mt-16 lg:grid-cols-2 lg:gap-16 lg:pb-24">
          <div>
            <h1 className="font-garamond text-[2.75rem] font-medium leading-[1.1] sm:text-5xl lg:text-[5.25rem] lg:leading-[1.05]">
              Stunning Real Estate Marketing,{' '}
              <span className="text-accent">Personalized</span> To Your Market
              In Minutes
            </h1>
            <p className="mt-6 max-w-lg font-almarai text-base leading-[26px] text-color-93">
              Built for agents like you. Help real estate professionals create
              content faster with ready-made templates and increase audience
              engagement through visually appealing social media posts.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { Icon: SiFacebook, label: 'Facebook' },
                { Icon: SiInstagram, label: 'Instagram' },
                { Icon: SiTiktok, label: 'TikTok' },
                { Icon: FaLinkedinIn, label: 'LinkedIn' },
                { Icon: SiX, label: 'X' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-sm hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Icon />
                </a>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <p className="text-sm text-color-93">
                Join 15,000+ other agents already creating standout content
              </p>
              <Link
                to={PATHS.SIGN_UP}
                className="rounded-full bg-accent px-6 py-2.5 text-sm font-almarai text-white hover:brightness-110"
              >
                Join Now
              </Link>
            </div>
          </div>

          <div
            className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-color-63 to-color-20 lg:block"
            aria-hidden="true"
          >
            <div className="absolute inset-4 rounded-xl border border-white/10 bg-black/40 p-4">
              <p className="font-garamond text-lg text-white">
                Good Morning, Ava.
              </p>
              <p className="mt-1 text-xs text-color-93">
                Agentwise Ultimate Mind
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="h-16 rounded-lg bg-white/10" />
                <div className="h-16 rounded-lg bg-white/10" />
                <div className="col-span-2 h-20 rounded-lg bg-accent/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Marketing gallery */}
    <section
      id="content"
      className="bg-white px-4 py-16 text-color-20 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-[1200px]">
        <h2 className="text-center font-garamond text-3xl font-medium sm:text-4xl lg:text-[2.5rem]">
          Marketing That Stops The Scroll
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center font-almarai text-base leading-[26px] text-color-57">
          Explore Ultimate Mind — content designed to convert, hand-created for
          your business.
        </p>
        <ContentSearchBar />
        <div className="mt-10 flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {galleryItems.map((item) => (
            <div
              key={item.title}
              className={`flex h-56 w-44 shrink-0 flex-col justify-end rounded-2xl bg-gradient-to-b p-4 lg:h-64 lg:w-auto ${item.tone}`}
            >
              <p className="font-almarai text-sm text-white">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Steps */}
    <section
      id="about"
      className="px-4 py-16 sm:px-8 lg:px-10"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    >
      <div className="mx-auto max-w-[1200px]">
        <h2 className="text-center font-garamond text-3xl font-medium sm:text-4xl">
          Stunning Marketing, In Three Simple Steps
        </h2>
        <div className="mt-14 space-y-16 lg:space-y-24">
          {steps.map((step, index) => (
            <div
              key={step.num}
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                index % 2 === 1 ? 'lg:[direction:rtl]' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:[direction:ltr]' : ''}>
                <p className="font-garamond text-5xl text-accent">{step.num}</p>
                <h3 className="mt-4 font-almarai text-xl font-bold leading-snug sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 font-almarai text-base leading-[26px] text-color-93">
                  {step.body}
                </p>
                <button
                  type="button"
                  className="mt-6 rounded-full border border-accent px-6 py-2.5 text-sm text-accent hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {step.cta}
                </button>
              </div>
              <div
                className={`aspect-[4/3] rounded-2xl border border-white/10 bg-gradient-to-br from-color-63 to-color-20 ${
                  index % 2 === 1 ? 'lg:[direction:ltr]' : ''
                }`}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Ultimate Mind */}
    <section className="px-4 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 rounded-3xl bg-[#1a2e1f] px-6 py-12 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:py-16">
        <div>
          <h2 className="font-garamond text-3xl font-medium sm:text-4xl">
            Agentwise Ultimate Mind
          </h2>
          <p className="mt-4 font-almarai text-base leading-[26px] text-color-93">
            Your strategic advisor — trained on your business, your market, and
            your voice. Ask anything.
          </p>
          <div
            className="mt-8 aspect-video rounded-xl border border-white/10 bg-black/30"
            aria-hidden="true"
          />
        </div>
        <div>
          <h3 className="font-garamond text-2xl font-medium leading-snug sm:text-3xl lg:text-4xl">
            Here&apos;s The Deal…{' '}
            <span className="text-accent">Great Marketing</span> Is Just The
            Start.
          </h3>
          <p className="mt-4 font-almarai text-base leading-[26px] text-color-93">
            Download your finished content and share it anywhere. Explore the
            tools built specifically for real estate professionals.
          </p>
          <Link
            to={PATHS.SIGN_UP}
            className="mt-8 inline-block rounded-full bg-accent px-8 py-3 text-sm font-almarai text-white hover:brightness-110"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="bg-white px-4 py-16 text-color-20 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <h2 className="font-garamond text-3xl font-medium sm:text-4xl lg:text-[2.5rem]">
            Built For <span className="text-accent">Agents Like You.</span>
          </h2>
          <p className="mt-4 font-almarai text-base leading-[26px] text-color-57">
            Join thousands of real estate professionals creating standout
            content with Agentwise.
          </p>
        </div>
        <div className="space-y-4">
          {testimonials.map((item) => (
            <blockquote
              key={item.name}
              className="rounded-2xl border border-color-24 bg-color-48 p-6"
            >
              <StarRating count={item.rating} />
              <p className="mt-3 font-almarai text-sm leading-relaxed text-color-20">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-4 flex items-center gap-3">
                <div
                  className="h-10 w-10 shrink-0 rounded-full bg-color-24"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-almarai text-sm font-bold">{item.name}</p>
                  <p className="text-xs text-color-57">{item.role}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>

    {/* Contact / Lead */}
    <section id="contact" className="px-4 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1200px] gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="relative flex min-h-[320px] items-end overflow-hidden rounded-2xl bg-gradient-to-br from-color-63 to-color-20 p-8">
          <p className="relative z-10 max-w-xs font-garamond text-2xl leading-snug sm:text-3xl">
            EVERYONE&apos;S WAITING to buy until &apos;the market is right&apos;
          </p>
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
        </div>
        <div className="rounded-2xl bg-color-20 p-6 sm:p-8">
          <h2 className="font-garamond text-2xl font-medium sm:text-3xl">
            Let&apos;s Work Together
          </h2>
          <p className="mt-2 font-almarai text-sm text-color-93">
            Join the waitlist and be first to access Agentwise when we launch in
            your market.
          </p>
          <div className="mt-6">
            <LeadCaptureForm />
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="border-t border-white/10 px-4 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-garamond text-2xl italic">Agentwise</p>
          <div className="flex gap-3">
            {[SiX, FaLinkedinIn, SiInstagram].map((Icon, index) => (
              <a
                key={index}
                href="#"
                aria-label="Social link"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-color-93 hover:bg-white/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <nav
            className="flex flex-wrap gap-x-6 gap-y-2 font-public text-sm text-color-93"
            aria-label="Footer"
          >
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </a>
            ))}
            <a href="#contact" className="hover:text-white">
              Contact Us
            </a>
          </nav>
          <a
            href="mailto:hello@agentwisemarketing.com"
            className="text-sm text-color-93 hover:text-white"
          >
            hello@agentwisemarketing.com
          </a>
        </div>
        <div className="mt-6 flex flex-col gap-2 text-xs text-color-57 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Agentwise Inc. · All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default VisitorHomePage;
