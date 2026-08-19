import { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import ContentCard from '@/components/domain/ContentCard';
import HomeSubscribeForm from '@/components/domain/HomeSubscribeForm';
import Button from '@/components/ui/button';
import ErrorAlert from '@/components/ui/ErrorAlert';
import Heading from '@/components/ui/heading';
import Image from '@/components/ui/image';
import { searchHomeContent } from '@/lib/api/client';
import { parseApiError } from '@/lib/api/errors';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FiStar, SiGmail } from '@/lib/icons';
import type { HomeSearchItem } from '@/types/api';

const designGallery: HomeSearchItem[] = [
  {
    id: 'scroll-1',
    title: 'Listing story template',
    image: '/assets/figma/home-scroll-1.png',
    caption: '',
  },
  {
    id: 'scroll-2',
    title: 'Address and showing times template',
    image: '/assets/figma/home-scroll-2.png',
    caption: '[address + times]',
  },
  {
    id: 'scroll-3',
    title: 'Lifestyle story template',
    image: '/assets/figma/home-scroll-3.png',
    caption: 'Phone’s busy, I’m doing the best I ever have',
  },
  {
    id: 'scroll-4',
    title: 'Neighborhood showing template',
    image: '/assets/figma/home-scroll-4.png',
    caption: 'Doing showings in [insert neighborhood and city]!',
  },
  {
    id: 'scroll-5',
    title: 'Local city guide template',
    image: '/assets/figma/home-scroll-5.png',
    caption: 'If I was moving to [City Name], here’s where I’d visit first (as a local)',
  },
  {
    id: 'scroll-6',
    title: 'Workday story template',
    image: '/assets/figma/home-scroll-6.png',
    caption: 'here’s what I’m working on today',
  },
  {
    id: 'scroll-7',
    title: 'Market insight template',
    image: '/assets/figma/home-scroll-7.png',
    caption: 'What You Need To Know',
  },
];

const testimonials = [
  {
    name: 'Marcus Donovan',
    detail: 'Keller Williams · Denver, CO',
    quote:
      'The Ultimate Mind has become my second brain for pricing strategy. It pulls comps and pushes back on my assumptions like a seasoned mentor would.',
  },
  {
    name: 'Jordan Hayes',
    detail: 'eXp Realty · Nashville, TN',
    quote:
      'My listings actually look like they belong to a top-1% agent now. Three of my last four clients said the marketing is what sold them on hiring me.',
  },
  {
    name: 'Jordan Hayes',
    detail: 'eXp Realty · Nashville, TN',
    quote:
      'Agentwise replaced my entire marketing workflow. What used to take a full Sunday now takes a coffee break — and the content is better than anything I was making in Canva.',
  },
];

function isSearchItem(value: unknown): value is HomeSearchItem {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  if (!('id' in value) || !('title' in value) || !('image' in value) || !('caption' in value)) {
    return false;
  }
  return (
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.image === 'string' &&
    typeof value.caption === 'string'
  );
}

export default function HomeContent() {
  const [items, setItems] = useState<HomeSearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadContent = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await searchHomeContent();
      if (response.success === false) {
        setErrorMessage(response.message);
        setItems([]);
        return;
      }
      const nextItems = Array.isArray(response.data) ? response.data.filter(isSearchItem) : [];
      setItems(nextItems);
    } catch (error: unknown) {
      setErrorMessage(parseApiError(error).message);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  const gallery = items.length > 0 ? items : designGallery;

  return (
    <div className="bg-color-16">
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_75%_35%,rgba(114,0,255,0.22)_0%,transparent_52%),radial-gradient(ellipse_at_12%_80%,rgba(200,164,126,0.16)_0%,transparent_46%)] px-5 pb-16 pt-6 tablet:px-10 desktop:px-16">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div className="relative grid items-center gap-10 desktop:grid-cols-2">
          <div>
            <Heading size="large" className="max-w-xl text-4xl leading-tight desktop:text-5xl">
              Stunning Real Estate Marketing, Personalized To Your Market In Minutes
            </Heading>
            <p className="mt-6 max-w-lg font-almarai text-base leading-7 text-secondary">
              The all-in-one marketing platform for residential real estate agents AI-personalized
              content, a custom business dashboard, and a strategic AI advisor that knows your
              market.
            </p>
            <div className="mt-8 flex items-center gap-3" aria-label="Social platforms">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-color-15 text-secondary">
                <FaFacebookF size={16} aria-hidden="true" focusable="false" />
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-color-27 text-secondary">
                <FaInstagram size={16} aria-hidden="true" focusable="false" />
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-color-41 text-secondary">
                <FaTiktok size={16} aria-hidden="true" focusable="false" />
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <SiGmail size={16} aria-hidden="true" focusable="false" />
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-color-37 text-secondary">
                <FaLinkedinIn size={16} aria-hidden="true" focusable="false" />
              </span>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/assets/figma/home-hero-dashboard.png"
              alt="Agentwise dashboard preview with Good Morning, Ava."
              width={1200}
              height={857}
              className="w-full rounded-token-24"
            />
          </div>
        </div>
        <div className="relative mt-14 flex flex-col items-center text-center">
          <p className="mb-5 font-almarai text-sm text-color-18">
            Join <span className="font-bold text-accent">Hundreds</span> of other agents on the
            waitlist for Agentwise
          </p>
          <NavLink
            to="/sign-up"
            className="inline-flex items-center justify-center rounded-full bg-accent px-10 py-3 font-almarai text-base font-bold text-color-16"
          >
            Get Started
          </NavLink>
        </div>
      </section>

      <section className="bg-secondary px-5 py-20 tablet:px-10 desktop:px-16">
        <h2 className="text-center font-garamond text-4xl font-semibold text-color-16">
          Marketing That Stops The Scroll
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center font-almarai text-base text-color-46">
          Hand-designed by our creative team. Personalized by AI to your market. Ready to post in
          minutes.
        </p>
        {errorMessage ? (
          <div className="mx-auto mt-8 flex justify-center">
            <ErrorAlert message={errorMessage} onRetry={() => void loadContent()} />
          </div>
        ) : null}
        {isLoading ? (
          <div
            className="mt-12 flex gap-5 overflow-hidden"
            role="status"
            aria-label="Loading content"
          >
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                className="h-[420px] w-[220px] shrink-0 animate-pulse rounded-[28px] bg-color-40 tablet:h-[520px] tablet:w-[260px]"
              />
            ))}
          </div>
        ) : gallery.length === 0 ? (
          <p className="mt-12 text-center font-almarai text-color-46">No Content Available</p>
        ) : (
          <div className="mt-12 flex gap-5 overflow-x-auto pb-4">
            {gallery.map((item) => (
              <ContentCard
                key={item.id}
                title={item.title}
                image={item.image}
                caption={item.caption}
              />
            ))}
          </div>
        )}
      </section>

      <section className="relative overflow-hidden bg-color-16 px-5 py-20 tablet:px-10 desktop:px-16">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px]" />
        <h2 className="relative mb-16 text-center font-garamond text-4xl font-semibold text-secondary">
          Stunning Marketing, In Three Simple Steps
        </h2>
        <div className="relative mb-20 grid items-center gap-10 desktop:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-accent px-4 py-1 font-almarai text-sm text-accent">
              Step 01
            </p>
            <h3 className="font-garamond text-3xl text-secondary">
              Browse The Continuously <span className="text-accent">Updated Collection</span>.
            </h3>
            <p className="mt-4 font-almarai text-base leading-7 text-color-18">
              Explore hundreds of hand-designed templates for social, email, and more. Save the ones
              that fit your style. Help real estate professionals create content faster with
              ready-made templates.
            </p>
          </div>
          <Image
            src="/assets/figma/home-step-01.png"
            alt="The Complete Agentwise Content Library"
            width={1100}
            height={821}
            className="w-full rounded-token-24"
          />
        </div>
        <div className="relative mb-20 grid items-center gap-10 desktop:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-accent px-4 py-1 font-almarai text-sm text-accent">
              Step 02
            </p>
            <h3 className="font-garamond text-3xl text-secondary">
              We Personalize It To Your <span className="text-accent">Business And Market</span>.
            </h3>
            <p className="mt-4 font-almarai text-base leading-7 text-color-18">
              Our AI customizes every template with your brand, your market, and your neighborhood —
              automatically. Click Customize to edit the location, market data, images, or branding.
              What used to take hours now takes seconds.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <NavLink
                to="/content-library"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-2 font-almarai text-sm font-bold text-color-16"
              >
                Customize
              </NavLink>
            </div>
          </div>
          <Image
            src="/assets/figma/home-step-02.png"
            alt="Agentwise Ultimate Mind personalization"
            width={1100}
            height={821}
            className="w-full rounded-token-24"
          />
        </div>
        <div className="relative grid items-center gap-10 desktop:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-accent px-4 py-1 font-almarai text-sm text-accent">
              Step 03
            </p>
            <h3 className="font-garamond text-3xl text-secondary">
              Post, Attract, Engage, And Stand Out.
            </h3>
            <p className="mt-4 font-almarai text-base leading-7 text-color-18">
              Download your finished content and share it anywhere. Increase audience engagement
              through visually appealing social media posts. Looks like you have a full-scale
              marketing team (and with Agentwise, you do.)
            </p>
            <div className="mt-6">
              <Button
                variant="outline"
                className="w-auto max-w-none px-6 py-2 text-sm"
                aria-label="Download"
              >
                Download
              </Button>
            </div>
          </div>
          <Image
            src="/assets/figma/home-step-03.png"
            alt="Customize, copy caption, and download content"
            width={1100}
            height={758}
            className="w-full rounded-token-24"
          />
        </div>
      </section>

      <section className="bg-color-16 px-5 py-16 tablet:px-10 desktop:px-16">
        <div className="grid overflow-hidden rounded-[32px] desktop:grid-cols-2">
          <div className="bg-color-96 px-8 py-12 desktop:px-12">
            <h2 className="font-garamond text-3xl text-secondary">Agentwise Ultimate Mind</h2>
            <p className="mt-4 font-almarai text-base leading-7 text-color-18">
              Your strategic advisor — trained on your business, your market, and your voice. Ask
              anything. Explore Ultimate Mind, available 24/7.
            </p>
            <Image
              src="/assets/figma/home-ultimate-preview.png"
              alt="Explore Ultimate Mind"
              width={900}
              height={692}
              className="mt-8 w-full rounded-token-16"
            />
          </div>
          <div className="flex flex-col justify-center bg-color-97 px-8 py-12 desktop:px-12">
            <h2 className="font-garamond text-4xl leading-tight text-secondary desktop:text-5xl">
              Here’s The Deal...
              <span className="block text-accent">Great Marketing Is</span>
              Just The Start.
            </h2>
            <p className="mt-6 font-almarai text-base leading-7 text-color-18">
              A custom business dashboard and a personalized AI advisor built into every plan.
            </p>
            <NavLink
              to="/ultimate-mind"
              className="mt-8 inline-flex w-fit items-center justify-center rounded-full bg-accent px-8 py-3 font-almarai text-base font-bold text-color-16"
            >
              Learn More
            </NavLink>
          </div>
        </div>
      </section>

      <section className="bg-secondary px-5 py-20 tablet:px-10 desktop:px-16">
        <div className="grid gap-12 desktop:grid-cols-[2fr_3fr]">
          <div>
            <h2 className="font-garamond text-5xl leading-tight text-color-16">
              Built For
              <span className="block text-accent">Agents Like You.</span>
            </h2>
            <p className="mt-6 max-w-md font-almarai text-base leading-7 text-color-16">
              New agents, team leaders, and large brokerages are using Agentwise to spend less time
              marketing and more time closing without sacrificing quality.
            </p>
          </div>
          <div className="grid gap-6 tablet:grid-cols-2">
            {testimonials.map((item) => (
              <article
                key={item.quote}
                className="rounded-token-24 border border-color-40 bg-secondary p-6 shadow-drop-11"
              >
                <div className="mb-4 flex gap-1 text-color-16" aria-label="5 star rating">
                  {Array.from({ length: 5 }, (_, index) => (
                    <FiStar key={index} size={16} aria-hidden="true" focusable="false" />
                  ))}
                </div>
                <p className="font-almarai text-base leading-7 text-color-16">“{item.quote}”</p>
                <div className="mt-6 flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-almarai text-sm font-bold text-color-16"
                    aria-hidden="true"
                  >
                    {item.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-almarai text-sm font-bold text-color-16">{item.name}</p>
                    <p className="font-almarai text-xs text-color-46">{item.detail}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="grid gap-8 bg-color-59 px-5 py-16 tablet:px-10 desktop:grid-cols-2 desktop:px-16"
      >
        <div className="relative overflow-hidden rounded-token-24">
          <Image
            src="/assets/figma/home-contact-photo.png"
            alt="Everyone’s waiting to buy until the market is right"
            width={900}
            height={931}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="rounded-token-24 border border-color-41 bg-[radial-gradient(ellipse_at_50%_0%,var(--color-50)_0%,var(--color-16)_55%)] px-6 py-10 tablet:px-10">
          <div className="mb-4 flex justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-color-53 font-kalam text-2xl text-secondary">
              A
            </span>
          </div>
          <h2 className="mb-8 text-center font-garamond text-4xl text-secondary">
            Let’s Work Together
          </h2>
          <HomeSubscribeForm />
        </div>
      </section>
    </div>
  );
}
