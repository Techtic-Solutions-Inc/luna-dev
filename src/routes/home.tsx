import { Link } from 'react-router-dom';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { ImageGallery } from '../components/ImageGallery';
import { MarketingContent } from '../components/MarketingContent';
import { SocialIcons } from '../components/SocialIcons';
import { FALLBACK_HOME_CONTENT } from '../data/homeContent';
import { useHomeContent } from '../hooks/useHomeContent';
import type { HomeLink } from '../types/home';

const GALLERY = [
  {
    src: '/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-65-2289.png',
    alt: 'Modern white house marketing template',
    caption: 'If I was moving to a new city, here’s where I’d visit first as a local',
  },
  {
    src: '/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-323-1644.png',
    alt: 'Lifestyle marketing still with coffee and sunglasses',
    caption: 'Morning ritual content for lifestyle-focused agents',
  },
  {
    src: '/assets/figma/attlgjgqkngefohwz-large-img6232-3-I2295-3482-65-2290.png',
    alt: 'Overhead neighborhood marketing template',
    caption: 'Neighborhood spotlight from a local perspective',
  },
  {
    src: '/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-323-1646.png',
    alt: 'City street marketing template at night',
    caption: 'Urban market energy for downtown listings',
  },
  {
    src: '/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-65-2287.png',
    alt: 'Headphones and books lifestyle marketing still',
    caption: 'Personal brand content that feels authentic',
  },
];

const TESTIMONIALS = [
  {
    quote:
      'The Ultimate Mind has become my second brain for pricing strategy. It pulls comps and pushes back on my assumptions like a seasoned mentor would.',
    name: 'Marcus Donovan',
    role: 'Realty Horizons · Denver, CO',
    avatar: '/assets/figma/frame-2147227827-2270-16929.png',
  },
  {
    quote:
      'Agentwise replaced my entire marketing workflow. What used to take a full Sunday now takes a coffee break — and the content is better than anything I was making in Canva.',
    name: 'Jordan Hayes',
    role: 'eXp Realty · Nashville, TN',
    avatar: '/assets/figma/frame-2147227828-2270-16985.png',
  },
  {
    quote:
      'My listings actually look like they belong to a top-1% agent now. Three of my last four clients said the marketing is what sold them on hiring me.',
    name: 'Sarah Chen',
    role: 'Luxury Agent · Miami, FL',
    avatar: '/assets/figma/frame-2147227827-2270-16929.png',
  },
] as const;

function Stars() {
  return (
    <div className="flex gap-1 text-accent" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="M10 1.5l2.35 4.76 5.25.76-3.8 3.7.9 5.22L10 13.48 5.3 15.94l.9-5.22-3.8-3.7 5.25-.76z" />
        </svg>
      ))}
    </div>
  );
}

function StepBadge({ step }: { step: string }) {
  return (
    <p className="inline-flex w-fit rounded-1000 border border-accent px-4 py-1 font-almarai text-almarai-14 text-accent">
      {step}
    </p>
  );
}

function HomeSkeleton() {
  return (
    <div className="space-y-section p-section-pad" aria-busy="true" aria-label="Loading home">
      <div className="grid gap-section md:grid-cols-2">
        <div className="space-y-4">
          <div className="skeleton h-16 w-3/4" />
          <div className="skeleton h-16 w-2/3" />
          <div className="skeleton h-24 w-full" />
        </div>
        <div className="skeleton h-[320px] w-full rounded-16" />
      </div>
      <ImageGallery images={[]} isLoading />
    </div>
  );
}

export default function Home() {
  const { data, isLoading, isError, isEmpty, errorMessage, refetch } = useHomeContent();
  const content = data ?? FALLBACK_HOME_CONTENT;
  const links: HomeLink[] = content.links;
  const marketing = content.marketing[0];

  const showContent = !isLoading && !isError && !isEmpty;

  return (
    <div className="min-h-screen bg-page-bg text-white">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <div className="relative overflow-hidden bg-color-105">
        <div className="pointer-events-none absolute inset-0 grid-overlay opacity-60" />
        <img
          src="/assets/figma/ld0pdcexwugrmn6c7l8cvcjcsjk-1-2289-17245.png"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-screen"
        />
        <Header />

        <main id="main">
          {isLoading ? <HomeSkeleton /> : null}

          {isError ? (
            <div className="mx-auto max-w-page px-5 py-24 text-center md:px-12" role="alert">
              <h1 className="font-garamond text-section-heading">Something went wrong</h1>
              <p className="mt-4 font-almarai text-body-18 text-color-134">
                {errorMessage ?? 'We could not load the home content. Please try again.'}
              </p>
              <button type="button" className="btn-primary mt-8" onClick={refetch}>
                Retry
              </button>
            </div>
          ) : null}

          {isEmpty ? (
            <div className="mx-auto max-w-page px-5 py-24 text-center md:px-12" role="status">
              <h1 className="font-garamond text-section-heading">No content is available</h1>
              <p className="mt-4 font-almarai text-body-18 text-color-134">
                Check back soon for marketing updates from Agentwise.
              </p>
            </div>
          ) : null}

          {showContent ? (
            <>
              <section
                className="relative mx-auto grid max-w-wide items-center gap-section p-section-pad md:grid-cols-2"
                aria-labelledby="hero-heading"
              >
                <div>
                  <h1
                    id="hero-heading"
                    className="font-garamond text-page-title font-normal text-white"
                  >
                    Stunning Real Estate Marketing, Personalized To Your Market In{' '}
                    <span className="text-accent">Minutes.</span>
                  </h1>
                  <p className="mt-6 max-w-xl font-almarai text-body-18 text-color-134">
                    The all-in-one marketing platform for residential real estate agents.
                    AI-personalized content, a custom business dashboard, and a strategic AI advisor
                    that knows your market.
                  </p>
                  <div className="mt-8">
                    <SocialIcons />
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="/assets/figma/group-33654428-2264-10401.png"
                    alt="Agentwise dashboard with content calendar and Ultimate Mind advisor"
                    className="relative z-10 h-auto w-full object-contain drop-shadow-[0_34px_44px_#00000072]"
                  />
                </div>
              </section>

              <section className="relative px-5 pb-16 text-center md:px-12 md:pb-24">
                <p className="font-almarai text-body-18 text-white">
                  Join <span className="text-accent">Hundreds</span> of other agents on the
                  waitlist for Agentwise
                </p>
                <Link to="/signup" className="btn-primary mt-6">
                  Get Started
                </Link>
              </section>
            </>
          ) : null}
        </main>
      </div>

      {showContent ? (
        <>
          <section
            id="content"
            className="bg-white py-16 md:py-24"
            aria-labelledby="content-library-heading"
          >
            <div className="mx-auto max-w-wide">
              <h2
                id="content-library-heading"
                className="px-5 text-center font-garamond text-section-heading font-medium text-color-105"
              >
                Marketing That Stops The Scroll
              </h2>
              <p className="mx-auto mt-4 max-w-2xl px-5 text-center font-almarai text-body-18 text-background">
                Hand-designed by our creative team. Personalized by AI to your market. Ready to post
                in minutes.
              </p>
              <div className="mt-12">
                <ImageGallery images={GALLERY} />
              </div>
              <div className="mt-8 text-center">
                <Link to="/content" className="text-link font-almarai text-almarai-16-bold">
                  Browse all →
                </Link>
              </div>
            </div>
          </section>

          <section
            className="relative overflow-hidden bg-color-136 py-16 md:py-24"
            aria-labelledby="steps-heading"
          >
            <div className="pointer-events-none absolute inset-0 grid-overlay opacity-40" />
            <div className="relative mx-auto max-w-wide px-5 md:px-12">
              <h2
                id="steps-heading"
                className="text-center font-garamond text-section-heading font-medium capitalize text-white"
              >
                {marketing?.title ?? 'Stunning marketing, in three simple steps'}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center font-almarai text-body-18 text-color-134">
                {marketing?.description ?? 'Browse the continuously updated collection.'}
              </p>

              <div className="mt-section space-y-section">
                <article className="grid items-center gap-section md:grid-cols-2">
                  <div className="md:order-1">
                    <StepBadge step="Step 01" />
                    <h3 className="mt-5 font-garamond text-section-heading font-medium leading-tight text-white">
                      Browse The Continuously{' '}
                      <span className="text-accent">Updated Collection.</span>
                    </h3>
                    <p className="mt-4 font-almarai text-body-18 text-color-134">
                      Explore hundreds of hand-designed templates for social, email, and more. Save
                      the ones that fit your style.
                    </p>
                  </div>
                  <img
                    src="/assets/figma/frame-2147227816-2270-14191.png"
                    alt="Agentwise content library with hundreds of templates"
                    className="h-auto w-full object-contain md:order-2"
                  />
                </article>

                <article className="grid items-center gap-section md:grid-cols-2">
                  <img
                    src="/assets/figma/frame-2147227817-2270-14193.png"
                    alt="Agentwise Ultimate Mind personalizing content to a market"
                    className="h-auto w-full object-contain md:order-1"
                  />
                  <div className="md:order-2">
                    <StepBadge step="Step 02" />
                    <h3 className="mt-5 font-garamond text-section-heading font-medium leading-tight text-white">
                      We Personalize It To Your{' '}
                      <span className="text-accent">Business And Market.</span>
                    </h3>
                    <p className="mt-4 font-almarai text-body-18 text-color-134">
                      Our AI customizes every template with your brand, your market, and your
                      neighborhood — automatically. What used to take hours now takes seconds.
                    </p>
                  </div>
                </article>

                <article className="grid items-center gap-section md:grid-cols-2">
                  <div className="md:order-1">
                    <StepBadge step="Step 03" />
                    <h3 className="mt-5 font-garamond text-section-heading font-medium leading-tight text-white">
                      Post, Attract, Engage, And <span className="text-accent">Stand Out.</span>
                    </h3>
                    <p className="mt-4 font-almarai text-body-18 text-color-134">
                      Download your finished content and share it anywhere. Looks like you have a
                      full-scale marketing team (and with Agentwise, you do.)
                    </p>
                  </div>
                  <img
                    src="/assets/figma/frame-2147227818-2270-14699.png"
                    alt="Finished Agentwise content ready to post"
                    className="h-auto w-full object-contain md:order-2"
                  />
                </article>
              </div>

              <div className="mt-12 grid gap-5 md:mt-20 md:grid-cols-2 md:gap-6">
                <MarketingContent
                  title="Agentwise Ultimate Mind"
                  description="A bold, strategic AI advisor trained on your market, your business, and the realities of residential real estate. Brainstorm campaigns, pressure-test pricing, develop your growth plan, and get a second opinion 24/7 from a partner who actually knows your business."
                  image="/assets/figma/group-33654450-3654-11562.png"
                  imageAlt="Agentwise Ultimate Mind advisor"
                  ctaHref="/learn-more"
                  ctaLabel="Learn More"
                />
                <article className="flex flex-col justify-center rounded-16 bg-mind-gradient bg-grid-green bg-grid p-section-pad shadow-hero md:p-12">
                  <h3 className="font-garamond text-section-heading font-medium leading-tight text-white">
                    Here&apos;s The Deal...
                    <span className="block text-accent">Great Marketing Is</span>
                    Just The Start.
                  </h3>
                  <p className="mt-6 font-almarai text-body-18 text-white">
                    A custom business dashboard and a personalized AI advisor built into every plan.
                  </p>
                  <Link to="/learn-more" className="btn-primary mt-8 w-fit">
                    Learn More
                  </Link>
                </article>
              </div>
            </div>
          </section>

          <section
            className="bg-white py-12 text-color-105 md:py-24"
            aria-labelledby="testimonials-heading"
          >
            <div className="mx-auto grid max-w-wide gap-8 px-5 md:grid-cols-[0.9fr_1.1fr] md:gap-section md:px-12">
              <div>
                <h2
                  id="testimonials-heading"
                  className="font-garamond text-section-heading font-medium leading-tight"
                >
                  Built For
                  <span className="block text-accent">Agents Like</span>
                  You.
                </h2>
                <p className="mt-6 font-almarai text-body-18 text-background">
                  New agents, team leaders, and large brokerages are using Agentwise to spend less
                  time marketing and more time closing without sacrificing quality.
                </p>
              </div>
              <div
                className="grid grid-cols-1 gap-5 md:grid-cols-2"
                role="list"
                aria-label="Customer testimonials"
              >
                {TESTIMONIALS.map((item) => (
                  <article
                    key={`${item.name}-${item.quote.slice(0, 24)}`}
                    role="listitem"
                    className="rounded-16 border border-color-128/40 bg-white p-6 shadow-soft"
                  >
                    <Stars />
                    <blockquote className="mt-4 font-almarai text-body-18 italic leading-7 text-color-132">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <footer className="mt-5 flex items-center gap-3">
                      <img
                        src={item.avatar}
                        alt=""
                        className="h-11 w-11 rounded-1000 object-cover"
                      />
                      <div>
                        <p className="font-almarai text-almarai-16-bold text-color-105">{item.name}</p>
                        <p className="font-almarai text-almarai-14 text-color-134">{item.role}</p>
                      </div>
                    </footer>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="bg-page-bg px-5 py-16 md:px-12 md:py-24">
            <div className="mx-auto grid max-w-wide overflow-hidden rounded-16 md:grid-cols-2">
              <figure className="relative min-h-[420px]">
                <img
                  src="/assets/figma/frame-1618873431-2729-13112.png"
                  alt="Agent on a phone call in a professional setting"
                  className="absolute inset-0 h-full w-full object-cover object-left"
                />
                <figcaption className="relative z-10 flex h-full min-h-[420px] flex-col items-center justify-center bg-color-105/20 px-6 text-center">
                  <p className="font-garamond text-section-heading font-medium uppercase tracking-wide text-white">
                    Everyone&apos;s Waiting
                  </p>
                  <p className="mt-3 font-garamond text-body-18 italic text-white">
                    to buy until &ldquo;the market is right&rdquo;
                  </p>
                </figcaption>
              </figure>
              <ContactForm />
            </div>
          </section>
        </>
      ) : null}

      <Footer links={showContent ? links : FALLBACK_HOME_CONTENT.links} />
    </div>
  );
}
