import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContentLibrary } from '@/components/ContentLibrary';
import { MarketingContent } from '@/components/MarketingContent';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { SocialIconRow } from '@/components/SocialIcons';
import { WaitlistForm } from '@/components/WaitlistForm';
import { useHomeContent } from '@/hooks/useHomeContent';
import type { GalleryImage, MarketingStep, NavLinkItem } from '@/types/home';

const FALLBACK_STEPS: MarketingStep[] = [
  {
    label: 'Step 01',
    title: 'Browse The Continuously Updated Collection.',
    highlight: 'Updated',
    description:
      'Explore hundreds of hand-designed templates for social, email, and more. Save the ones that fit your style.',
    image: '/assets/figma/frame-2147227816-2270-14191.png',
  },
  {
    label: 'Step 02',
    title: 'We Personalize It To Your Business And Market.',
    highlight: 'Business And Market.',
    description:
      'Our AI customizes every template with your brand, your market, and your neighborhood — automatically. What used to take hours now takes seconds.',
    image: '/assets/figma/frame-2147227817-2270-14193.png',
  },
  {
    label: 'Step 03',
    title: 'Post, Attract, Engage, And Stand Out.',
    highlight: 'Stand Out.',
    description:
      'Download your finished content and share it anywhere. Looks like you have a full-scale marketing team (and with Agentwise, you do.)',
    image: '/assets/figma/frame-2147227818-2270-14699.png',
  },
];

const FALLBACK_IMAGES: GalleryImage[] = [
  { src: '/images/gallery-1.png', alt: 'Listing story with a white brick house and address placeholder' },
  { src: '/images/gallery-2.png', alt: 'Lifestyle iced coffee story' },
  { src: '/images/gallery-3.png', alt: 'Aerial courtyard story for neighborhood showings' },
  { src: '/images/gallery-4.png', alt: 'City street at dusk story' },
  { src: '/images/gallery-5.png', alt: 'Workspace flat-lay story' },
];

const TESTIMONIALS = [
  {
    quote:
      'The Ultimate Mind has become my second brain for pricing strategy. It pulls comps and pushes back on my assumptions like a seasoned mentor would.',
    name: 'Marcus Donovan',
    meta: 'Keller Williams · Denver, CO',
    avatar: '/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-65-2289.png',
  },
  {
    quote:
      'My listings actually look like they belong to a top-1% agent now. Three of my last four clients said the marketing is what sold them on hiring me.',
    name: 'Jordan Hayes',
    meta: 'eXp Realty · Nashville, TN',
    avatar: '/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-65-2287.png',
  },
  {
    quote:
      'Agentwise replaced my entire marketing workflow. What used to take a full Sunday now takes a coffee break — and the content is better than anything I was making in Canva.',
    name: 'Jordan Hayes',
    meta: 'eXp Realty · Nashville, TN',
    avatar: '/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-323-1644.png',
  },
  {
    quote:
      'I finally have a marketing system that sounds like me and still looks expensive. My sphere comments on every post.',
    name: 'Marcus Donovan',
    meta: 'Keller Williams · Denver, CO',
    avatar: '/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-323-1646.png',
  },
  {
    quote:
      'The Ultimate Mind has become my second brain for pricing strategy. It pulls comps and pushes back on my assumptions like a seasoned mentor would.',
    name: 'Marcus Donovan',
    meta: 'Keller Williams · Denver, CO',
    avatar: '/assets/figma/attlgjgqkngefohwz-large-img6232-3-I2295-3482-65-2290.png',
  },
  {
    quote:
      'My listings actually look like they belong to a top-1% agent now. Three of my last four clients said the marketing is what sold them on hiring me.',
    name: 'Jordan Hayes',
    meta: 'eXp Realty · Nashville, TN',
    avatar: '/assets/figma/attlgjgqkngefohwz-large-img6232-3-I2295-3482-323-1647.png',
  },
] as const;

function headingOf(headings: string[] | undefined, fragment: string, fallback: string): string {
  const match = headings?.find((item) => item.toLowerCase().includes(fragment.toLowerCase()));
  return match ?? fallback;
}

function linkOf(links: NavLinkItem[] | undefined, label: string, href: string): NavLinkItem {
  return links?.find((link) => link.label === label) ?? { label, href };
}

function Stars() {
  return (
    <div className="flex gap-1 text-color-101" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

export function HomePage() {
  const { data, isLoading, isError, isEmpty, error, refetch } = useHomeContent();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, [location.hash, data]);

  if (isLoading) {
    return (
      <div className="overflow-x-hidden bg-page text-white">
        <Header />
        <LoadingSkeleton variant="home" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen flex-col bg-page">
        <Header />
        <main className="flex flex-1 items-center justify-center px-6 py-24">
          <div className="max-w-md text-center" role="alert">
            <h1 className="font-serif text-4xl text-white">We couldn’t load this page.</h1>
            <p className="mt-4 font-sans text-step-desc text-color-131">
              {error?.message ?? 'Something went wrong while loading home content.'}
            </p>
            <button type="button" className="btn-gold mt-8" onClick={refetch}>
              Try again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex min-h-screen flex-col bg-page">
        <Header links={data?.links} />
        <main className="flex flex-1 items-center justify-center px-6 py-24">
          <p className="font-serif text-3xl text-white" role="status">
            No content is available.
          </p>
        </main>
        <Footer links={data?.links} />
      </div>
    );
  }

  const headings = data?.headings ?? [];
  const links = data?.links ?? [];
  const steps = data?.marketing?.length ? data.marketing : FALLBACK_STEPS;
  const images = data?.images?.length ? data.images : FALLBACK_IMAGES;
  const getStarted = linkOf(links, 'Get Started', '/signup');
  const learnMore = linkOf(links, 'Learn More', '/#learn-more');
  const galleryHeading = 'Marketing That Stops The Scroll';
  const gallerySub = headingOf(
    headings,
    'Hand-designed',
    'Hand-designed by our creative team. Personalized by AI to your market. Ready to post in minutes.',
  );
  const stepsTitle = 'Stunning Marketing, In Three Simple Steps';
  const testimonialBody = headingOf(
    headings,
    'New agents',
    'New agents, team leaders, and large brokerages are using Agentwise to spend less time marketing and more time closing without sacrificing quality.',
  );
  const dealBody = headingOf(
    headings,
    'custom business dashboard',
    'A custom business dashboard and a personalized AI advisor built into every plan.',
  );

  return (
    <div className="overflow-x-hidden bg-page text-white">
      <div className="hero-glows bg-grid overflow-x-hidden">
        <Header links={links} />
        <section className="relative overflow-hidden" aria-labelledby="hero-heading">
          <div className="mx-auto grid max-w-content items-center gap-12 px-6 pb-8 pt-8 md:px-10 lg:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)] lg:gap-8 lg:px-16 lg:pt-6">
            <div>
              <h1
                id="hero-heading"
                className="max-w-xl font-serif text-[42px] font-normal leading-[1.08] text-white md:text-6xl lg:text-page-title"
              >
                Stunning Real Estate Marketing,{' '}
                <span className="text-accent">Personalized To Your Market</span> In Minutes
              </h1>
              <p className="mt-6 max-w-md font-sans text-step-desc text-color-131">
                The all-in-one marketing platform for residential real estate agents. AI-personalized content, a
                custom business dashboard, and a strategic AI advisor that knows your market.
              </p>
              <SocialIconRow className="mt-8" />
            </div>
            <div className="relative">
              <img
                src="/images/hero-dashboard.png"
                alt="Agentwise dashboard preview"
                className="relative z-10 w-full rounded-24 object-contain object-right"
              />
            </div>
          </div>

          <div className="mx-auto flex max-w-content flex-col items-center px-6 pb-16 pt-4 text-center md:pb-20">
            <p className="font-sans text-section-title text-white">
              Join <span className="text-accent">{headingOf(headings, 'Hundreds', 'Hundreds')}</span> of other agents
              on the waitlist for Agentwise
            </p>
            <Link to={getStarted.href} className="btn-gold btn-header mt-6">
              {getStarted.label}
            </Link>
          </div>
        </section>
      </div>

      <main>
      <ContentLibrary title={galleryHeading} description={gallerySub} images={images} />

      <MarketingContent title={stepsTitle} steps={steps} />

      <section id="learn-more" className="bg-grid bg-color-105 px-4 py-16 md:px-10 md:py-24" aria-labelledby="deal-heading">
        <div className="ultimate-mind-panel mx-auto grid max-w-content overflow-hidden rounded-[40px] md:grid-cols-2">
          <div className="px-8 py-12 md:px-12 md:py-16">
            <h2 id="ultimate-mind-heading" className="font-serif text-4xl text-white md:text-5xl">
              Agentwise Ultimate Mind
            </h2>
            <p className="mt-6 max-w-lg font-sans text-step-desc text-color-125">
              A bold, strategic AI advisor trained on your market, your business, and the realities of residential
              real estate. Brainstorm campaigns, pressure-test pricing, develop your growth plan, and get a second
              opinion 24/7 from a partner who actually knows your business.
            </p>
            <img
              src="/assets/figma/group-33654450-3654-11562.png"
              alt="Agentwise Ultimate Mind"
              className="mt-10 w-full rounded-24 object-contain shadow-deep"
            />
          </div>
          <div className="flex flex-col justify-center px-8 py-12 md:px-12 md:py-16">
            <h2 id="deal-heading" className="font-serif text-4xl leading-tight text-white md:text-5xl lg:text-[56px]">
              Here’s The Deal...
              <span className="mt-2 block text-accent">Great Marketing</span>
              <span className="block">Is Just The Start.</span>
            </h2>
            <p className="mt-8 max-w-md font-sans text-step-desc text-color-125">{dealBody}</p>
            <Link to={learnMore.href} className="btn-gold mt-10 w-fit px-8">
              {learnMore.label}
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="bg-white py-20 md:py-28" aria-labelledby="testimonials-heading">
        <div className="mx-auto grid max-w-content gap-12 px-6 md:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] md:items-start md:px-10 lg:px-16">
          <div className="md:sticky md:top-16">
            <h2
              id="testimonials-heading"
              className="font-serif text-4xl leading-tight text-color-101 md:text-5xl lg:text-[56px]"
            >
              Built For
              <span className="mt-1 block text-accent">Agents Like You.</span>
            </h2>
            <p className="mt-6 max-w-sm font-sans text-step-desc text-color-132">{testimonialBody}</p>
          </div>
          <div className="relative max-h-[640px] overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-white to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-white to-transparent" />
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {TESTIMONIALS.map((item, index) => (
                <article
                  key={`${item.name}-${index}`}
                  className="mb-4 break-inside-avoid rounded-24 border border-color-128 bg-white p-6 shadow-panel"
                >
                  <Stars />
                  <p className="mt-4 font-serif text-lg leading-7 text-color-101">“{item.quote}”</p>
                  <div className="mt-6 flex items-center gap-3">
                    <img src={item.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                    <div>
                      <p className="font-public-sans text-sm font-semibold text-color-101">{item.name}</p>
                      <p className="font-sans text-xs text-color-135">{item.meta}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-color-101 px-4 py-16 md:px-10 md:py-20" aria-labelledby="waitlist-heading">
        <div className="mx-auto grid max-w-content gap-5 lg:grid-cols-2">
          <div className="relative min-h-[520px] overflow-hidden rounded-[40px]">
            <img
              src="/images/contact-portrait.png"
              alt="Agent speaking on the phone"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
              <p className="font-serif text-4xl font-semibold uppercase tracking-wide text-white md:text-5xl">
                Everyone’s Waiting
              </p>
              <p className="mt-3 font-serif text-xl italic text-white md:text-2xl">
                to buy until ‘the market is right’
              </p>
            </div>
          </div>
          <div className="rounded-[40px] border border-white/10 bg-gradient-to-b from-color-106 to-color-105 px-6 py-10 shadow-hairline md:px-12 md:py-14">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/40">
              <span className="font-script text-2xl leading-none text-accent" aria-hidden="true">
                a
              </span>
              <span className="sr-only">Agentwise Real Estate Content</span>
            </div>
            <h2 id="waitlist-heading" className="text-center font-serif text-4xl text-white md:text-5xl">
              Let’s Work Together
            </h2>
            <div className="mt-10">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer links={links} />
    </div>
  );
}

export default HomePage;
