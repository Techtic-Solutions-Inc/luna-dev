import { type ComponentType, useState } from 'react';
import {
  FaFacebookF,
  FaGoogle,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
} from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import ContentGallery from './ContentGallery';
import ContactForm from './ContactForm';
import useHomeSearch from '../../../hooks/useHomeSearch';
import {
  defaultGallery,
  downloadFromUrl,
  galleryFromSearch,
  homeNavItems,
} from '../../../lib/home';

const heroSocial = [
  { href: 'https://facebook.com', label: 'Facebook', icon: FaFacebookF },
  { href: 'https://instagram.com', label: 'Instagram', icon: FaInstagram },
  { href: 'https://tiktok.com', label: 'TikTok', icon: FaTiktok },
  { href: 'https://google.com', label: 'Google', icon: FaGoogle },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: FaLinkedinIn },
] as const;

const footerSocial = [
  { href: 'https://facebook.com', label: 'Facebook', icon: FaFacebookF },
  { href: 'https://x.com', label: 'X', icon: FaXTwitter },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: FaLinkedinIn },
  { href: 'https://instagram.com', label: 'Instagram', icon: FaInstagram },
] as const;

const steps = [
  {
    number: 'Step 01',
    title: 'Browse The Continuously',
    accent: 'Updated Collection.',
    description:
      'Help real estate professionals create content faster with ready-made templates.',
    image: '/assets/figma/content-library.png',
    alt: 'The Complete Agentwise Content Library',
  },
  {
    number: 'Step 02',
    title: 'We Personalize It To Your',
    accent: 'Business And Market.',
    description:
      'Increase audience engagement through visually appealing social media posts. Click Customize to edit the location, market data, images, or branding.',
    image: '/assets/figma/ultimate-mind.png',
    alt: 'Agentwise Ultimate Mind advisor workspace',
  },
  {
    number: 'Step 03',
    title: 'Post, Attract, Engage, And',
    accent: 'Stand Out.',
    description: 'Download your finished content and share it anywhere.',
    image: '/assets/figma/content-details.png',
    alt: 'Market update template with Customize and Download actions',
  },
] as const;

const testimonials = [
  {
    quote:
      'The Ultimate Mind has become my second brain for pricing strategy. It pulls comps and pushes back on my assumptions like a seasoned mentor would.',
    name: 'Marcus Donovan',
    meta: 'Keller Williams · Denver, CO',
    avatar: '/assets/figma/profile.png',
  },
  {
    quote:
      'My listings actually look like they belong to a top-1% agent now. Three of my last four clients said the marketing is what sold them on hiring me.',
    name: 'Jordan Hayes',
    meta: 'eXp Realty · Nashville, TN',
    avatar: '/assets/figma/about-us.png',
  },
  {
    quote:
      'Agentwise replaced my entire marketing workflow. What used to take a full Sunday now takes a coffee break — and the content is better than anything I was making in Canva.',
    name: 'Jordan Hayes',
    meta: 'eXp Realty · Nashville, TN',
    avatar: '/assets/figma/blog.png',
  },
] as const;

const gridBackground = {
  backgroundColor: 'var(--color-16)',
  backgroundImage:
    'linear-gradient(var(--color-41) 1px, transparent 1px), linear-gradient(90deg, var(--color-41) 1px, transparent 1px)',
  backgroundSize: '56px 56px',
};

function scrollToId(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function AgentwiseLogo({ gold = false }: { gold?: boolean }) {
  return (
    <Link to="/home" className="block" aria-label="Agentwise home">
      <span
        className={`block font-kalam text-[28px] font-bold leading-none ${
          gold ? 'text-accent' : 'text-secondary'
        }`}
      >
        Agentwise
      </span>
      <span
        className={`mt-1 block font-almarai text-[8px] font-bold uppercase tracking-[0.28em] ${
          gold ? 'text-accent' : 'text-secondary'
        }`}
      >
        Real Estate Marketing
      </span>
    </Link>
  );
}

function SocialRow({
  links,
  compact = false,
}: {
  links: readonly {
    href: string;
    label: string;
    icon: ComponentType<{ size?: number; 'aria-hidden'?: boolean }>;
  }[];
  compact?: boolean;
}) {
  const size = compact ? 14 : 16;
  const box = compact ? 'h-9 w-9' : 'h-10 w-10';
  return (
    <div className="flex items-center gap-3" aria-label="Social media links">
      {links.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex ${box} items-center justify-center rounded-full border border-[var(--color-41)] text-secondary transition-colors hover:border-accent hover:text-accent`}
          aria-label={label}
        >
          <Icon size={size} aria-hidden={true} />
        </a>
      ))}
    </div>
  );
}

export default function MainContentArea() {
  const { query, setQuery, items, loading, error, search } = useHomeSearch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const galleryCards =
    items.length > 0 ? galleryFromSearch(items) : hasSearched ? [] : defaultGallery;

  const handleSearch = (value: string) => {
    setHasSearched(value.trim().length > 0);
    void search(value);
  };

  const handleDownload = () => {
    const source = items[0]?.image ?? '/assets/figma/content-details.png';
    downloadFromUrl(source, 'agentwise-content.png');
  };

  return (
    <div className="min-h-screen bg-[var(--color-16)] text-secondary">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-[var(--color-16)]"
      >
        Skip to main content
      </a>

      <section className="relative overflow-hidden" style={gridBackground}>
        <div
          className="pointer-events-none absolute -left-24 top-0 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--color-56) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-10 top-40 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--color-68) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-10 left-10 h-[360px] w-[360px] rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--color-67) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <header className="relative z-20">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
            <AgentwiseLogo />
            <nav aria-label="Main navigation" className="hidden items-center gap-10 md:flex">
              {homeNavItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-almarai text-sm text-secondary transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="hidden items-center gap-3 md:flex">
              <Button
                variant="gold"
                className="px-6 py-2.5"
                onClick={() => scrollToId('contact')}
                aria-label="Get started with Agentwise"
              >
                Get Started
              </Button>
              <Link
                to="/signin"
                className="inline-flex items-center justify-center rounded-full border border-accent px-6 py-2.5 font-almarai text-sm font-bold text-accent transition-colors hover:bg-[var(--color-26)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Log in
              </Link>
            </div>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-secondary text-secondary md:hidden"
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
          {menuOpen ? (
            <nav
              aria-label="Mobile navigation"
              className="space-y-3 border-t border-[var(--color-41)] px-6 py-4 md:hidden"
            >
              {homeNavItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block font-almarai text-sm text-secondary"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                className="block font-almarai text-sm text-secondary"
                onClick={() => {
                  setMenuOpen(false);
                  scrollToId('contact');
                }}
              >
                Get Started
              </button>
              <Link
                to="/signin"
                className="block font-almarai text-sm text-accent"
                onClick={() => setMenuOpen(false)}
              >
                Log in
              </Link>
            </nav>
          ) : null}
        </header>

        <main id="main-content" className="relative z-10 px-6 pb-20 pt-8 lg:px-10 lg:pb-24 lg:pt-12">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h1 className="max-w-xl font-garamond text-4xl font-medium leading-[1.15] text-secondary md:text-5xl lg:text-[55px] lg:leading-[64px]">
                Stunning Real Estate Marketing, Personalized To Your Market In Minutes
              </h1>
              <p className="mt-6 max-w-md font-almarai text-sm leading-relaxed text-[var(--color-57)] md:text-base">
                The all-in-one marketing platform for residential real estate agents — AI-personalized
                content, a custom business dashboard, and a strategic AI advisor that knows your
                market.
              </p>
              <div className="mt-8">
                <SocialRow links={heroSocial} />
              </div>
            </div>
            <div className="relative">
              <div
                className="overflow-hidden rounded-2xl border border-[var(--color-41)]"
                style={{ boxShadow: 'var(--drop-shadow-20)' }}
              >
                <img
                  src="/assets/figma/dashboard-2.png"
                  alt="Agentwise dashboard showing Good Morning, Ava and this week's content calendar"
                  className="aspect-[4/3] w-full object-cover object-left-top"
                />
              </div>
              <article className="absolute right-3 top-6 max-w-[240px] rounded-xl border border-[var(--color-41)] bg-[var(--color-50)]/95 p-4 backdrop-blur-sm">
                <p className="font-garamond text-base font-medium text-secondary">Good Morning, Ava.</p>
                <p className="mt-2 font-almarai text-[11px] leading-4 text-[var(--color-57)]">
                  Let&apos;s keep your Austin brand moving. Today you have 3 fresh content ideas, a
                  planned reel, and a draft waiting in the Mind.
                </p>
              </article>
              <article className="absolute bottom-6 right-4 max-w-[220px] rounded-xl border border-[var(--color-41)] bg-[var(--color-50)]/95 p-4 backdrop-blur-sm">
                <p className="font-almarai text-xs font-bold text-secondary">
                  You have 12 new notifications
                </p>
                <p className="mt-2 font-almarai text-[11px] leading-4 text-[var(--color-57)]">
                  See what&apos;s on deck to be published this week and how your social posts are
                  performing.
                </p>
              </article>
            </div>
          </div>
          <div className="relative mx-auto mt-16 max-w-7xl text-center">
            <p className="font-almarai text-sm text-[var(--color-57)]">
              Join <span className="text-accent">Hundreds</span> of other agents on the waitlist for
              Agentwise
            </p>
            <div className="mt-5">
              <Button onClick={() => scrollToId('contact')} aria-label="Join the Agentwise waitlist">
                Get Started
              </Button>
            </div>
          </div>
        </main>
      </section>

      <ContentGallery
        cards={galleryCards}
        loading={loading}
        error={error}
        query={query}
        searched={hasSearched}
        onQueryChange={setQuery}
        onSearch={handleSearch}
        onRetry={() => void search(query)}
      />

      <section id="about" className="relative px-6 py-20 lg:px-10 lg:py-28" style={gridBackground}>
        <div className="relative mx-auto max-w-7xl">
          <h2 className="text-center font-garamond text-3xl font-medium text-secondary md:text-4xl lg:text-[48px] lg:leading-[58px]">
            Stunning Marketing, In Three Simple Steps
          </h2>
          <div className="mt-16 space-y-20">
            {steps.map((step) => (
              <div key={step.number} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div>
                  <span className="inline-flex rounded-full border border-accent px-4 py-1.5 font-almarai text-xs text-accent">
                    {step.number}
                  </span>
                  <h3 className="mt-5 max-w-md font-garamond text-2xl font-medium leading-tight text-secondary md:text-3xl lg:text-[34px] lg:leading-[42px]">
                    {step.title} <span className="text-accent">{step.accent}</span>
                  </h3>
                  <p className="mt-4 max-w-md font-almarai text-sm leading-relaxed text-[var(--color-57)]">
                    {step.description}
                  </p>
                  {step.number === 'Step 02' ? (
                    <div className="mt-6">
                      <Button
                        onClick={() => scrollToId('contact')}
                        aria-label="Customize location, market data, images, or branding"
                      >
                        Customize
                      </Button>
                    </div>
                  ) : null}
                  {step.number === 'Step 03' ? (
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button
                        variant="dark"
                        onClick={() => scrollToId('contact')}
                        aria-label="Customize your content"
                      >
                        Customize
                      </Button>
                      <Button
                        className="bg-[var(--color-54)] text-[var(--color-16)]"
                        onClick={handleDownload}
                        aria-label="Download your finished content"
                      >
                        Download
                      </Button>
                    </div>
                  ) : null}
                </div>
                <div
                  className="overflow-hidden rounded-2xl border border-[var(--color-41)]"
                  style={{ boxShadow: 'var(--drop-shadow-20)' }}
                >
                  <img src={step.image} alt={step.alt} className="aspect-[16/10] w-full object-cover object-top" />
                </div>
              </div>
            ))}
          </div>

          <div
            id="pricing"
            className="mt-24 overflow-hidden rounded-[32px] lg:grid lg:grid-cols-2"
            style={{ background: 'linear-gradient(90deg, var(--color-67) 0%, var(--color-64) 100%)' }}
          >
            <div className="p-8 lg:p-12">
              <h2 className="font-garamond text-3xl font-medium text-secondary md:text-[34px]">
                Agentwise Ultimate Mind
              </h2>
              <p className="mt-4 max-w-md font-almarai text-sm leading-relaxed text-[var(--color-54)]">
                A bold, strategic AI advisor trained on your market, your business, and the realities
                of residential real estate. Brainstorm campaigns, pressure-test pricing, develop your
                growth plan, and get a second opinion 24/7 from a partner who actually knows your
                business.
              </p>
              <img
                src="/assets/figma/ultimate-mind.png"
                alt="Ultimate Mind advisor interface with prompt suggestions"
                className="mt-8 rounded-2xl object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <h2 className="font-garamond text-3xl font-medium leading-tight text-secondary md:text-4xl lg:text-[38px] lg:leading-[46px]">
                Here&apos;s The Deal…
                <br />
                <span className="text-accent">Great Marketing</span> Is
                <br />
                Just The Start.
              </h2>
              <p className="mt-5 font-almarai text-sm text-secondary">
                A custom business dashboard and a personalized AI advisor built into every plan.
              </p>
              <div className="mt-8">
                <h3 className="mb-4 font-garamond text-xl font-medium text-secondary">
                  Explore Ultimate Mind
                </h3>
                <Button onClick={() => scrollToId('contact')} aria-label="Learn more about Ultimate Mind">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="font-garamond text-4xl font-medium leading-[1.05] text-[var(--color-16)] md:text-5xl lg:text-[52px]">
              Built For
              <br />
              <span className="text-accent">Agents Like You.</span>
            </h2>
            <p className="mt-6 max-w-md font-almarai text-base leading-7 text-[var(--color-60)]">
              New agents, team leaders, and large brokerages are using Agentwise to spend less time
              marketing and more time closing without sacrificing quality.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 sm:items-start">
            {testimonials.map((item, index) => (
              <article
                key={`${item.name}-${index}`}
                className={`rounded-2xl border border-[var(--color-42)] bg-white p-6 ${
                  index === 1 ? 'sm:mt-10' : ''
                }`}
                style={{ boxShadow: 'var(--drop-shadow-39)' }}
              >
                <p className="font-almarai text-sm tracking-wide text-[var(--color-16)]" aria-label="5 star rating">
                  ★★★★★
                </p>
                <p className="mt-3 font-almarai text-sm leading-6 text-[var(--color-60)]">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-almarai text-sm font-bold text-[var(--color-16)]">{item.name}</p>
                    <p className="font-almarai text-xs text-[var(--color-60)]">{item.meta}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[var(--color-16)] px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden rounded-[32px] lg:min-h-[720px]">
            <img
              src="/assets/figma/about-us.png"
              alt="Real estate professional speaking on the phone"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[var(--color-16)]/25" />
            <div className="relative flex h-full min-h-[420px] flex-col items-center justify-center px-8 text-center lg:min-h-[720px]">
              <p className="font-garamond text-4xl font-medium uppercase leading-none text-secondary md:text-5xl lg:text-[56px]">
                Everyone&apos;s Waiting
              </p>
              <p className="mt-3 font-garamond text-xl italic text-secondary md:text-2xl">
                to buy until &apos;the market is right&apos;
              </p>
            </div>
          </div>
          <div className="rounded-[32px] bg-[var(--color-20)] px-6 py-12 lg:px-12 lg:py-16">
            <div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-accent"
              aria-hidden="true"
            >
              <span className="font-kalam text-3xl leading-none text-secondary">a</span>
            </div>
            <h2 className="mt-5 text-center font-garamond text-3xl font-medium text-secondary md:text-4xl">
              Let&apos;s Work Together
            </h2>
            <ContactForm fieldsLoading={loading && items.length === 0 && !hasSearched} />
          </div>
        </div>
      </section>

      <footer className="bg-[var(--color-16)] px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-6 pb-8 md:flex-row md:items-center">
            <AgentwiseLogo gold />
            <SocialRow links={footerSocial} compact />
          </div>
          <div className="flex flex-col items-start justify-between gap-4 py-8 md:flex-row md:items-center">
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-6">
              {[
                { label: 'About', href: '#about' },
                { label: 'Content', href: '#content' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Shop', href: '#shop' },
                { label: 'Contact Us', href: '#contact' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-almarai text-sm text-secondary transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href="mailto:hello@agentwisemarketing.com"
              className="font-almarai text-sm text-secondary transition-colors hover:text-accent"
            >
              hello@agentwisemarketing.com
            </a>
          </div>
          <div className="flex flex-col items-start justify-between gap-4 border-t border-[var(--color-41)] pt-8 md:flex-row md:items-center">
            <p className="font-almarai text-xs text-secondary">
              © {new Date().getFullYear()} Agentwise. All Rights Reserved.
            </p>
            <div className="flex gap-2 font-almarai text-xs text-secondary">
              <a id="terms" href="#terms" className="hover:text-accent">
                Terms of Service
              </a>
              <span aria-hidden="true">|</span>
              <a id="privacy" href="#privacy" className="hover:text-accent">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
