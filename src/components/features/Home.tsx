import { useCallback, useEffect, useState } from 'react';
import type { IconType } from 'react-icons';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa6';
import { SiGmail } from 'react-icons/si';
import { Link } from 'react-router-dom';

import { MarketingScrollSection } from '@/components/home/MarketingScrollSection';
import { ContactFormSection } from '@/components/home/ContactFormSection';
import { SiteFooter } from '@/components/home/SiteFooter';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { ThreeStepsSection } from '@/components/home/ThreeStepsSection';
import { UltimateMindSection } from '@/components/home/UltimateMindSection';
import { HeroPreview } from '@/components/features/HeroPreview';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ApiError } from '@/lib/api/client';
import { searchHomeContent } from '@/lib/api/visitor';
import type { HomeSearchItem } from '@/types/visitor';

interface Channel {
  name: string;
  icon: IconType;
  className: string;
}

const channels: Channel[] = [
  { name: 'Facebook', icon: FaFacebookF, className: 'bg-color-15 text-white' },
  {
    name: 'Instagram',
    icon: FaInstagram,
    className: 'bg-[linear-gradient(45deg,#ffb032,#f332f6,#7200ff)] text-white',
  },
  { name: 'TikTok', icon: FaTiktok, className: 'bg-black text-white' },
  { name: 'Gmail', icon: SiGmail, className: 'bg-white text-color-81' },
  { name: 'LinkedIn', icon: FaLinkedinIn, className: 'bg-color-85 text-white' },
];

export function Home() {
  const [searchItems, setSearchItems] = useState<HomeSearchItem[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(true);
  const [searchError, setSearchError] = useState<string | null>(null);

  const loadSearchContent = useCallback(async () => {
    setIsSearchLoading(true);
    setSearchError(null);

    try {
      const response = await searchHomeContent();
      setSearchItems(response.data.items);
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : 'Unable to load marketing content. Please try again.';
      setSearchError(message);
      setSearchItems([]);
    } finally {
      setIsSearchLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSearchContent();
  }, [loadSearchContent]);

  return (
    <div className="flex min-h-screen flex-col bg-color-16">
      <div className="surface-aurora">
        <SiteHeader />

        <main id="main-content">
          <section
            aria-labelledby="hero-heading"
            className="mx-auto w-full max-w-[1164px] px-20 pb-40 pt-40 tablet:pt-60 desktop:pb-52 desktop:pt-102"
          >
            <div className="desktop:flex desktop:items-start desktop:gap-[108px]">
              <div className="desktop:w-[400px] desktop:shrink-0">
                <h1
                  id="hero-heading"
                  className="type-heading-xl-44 max-w-[380px] text-white tablet:text-heading-xl-46 desktop:leading-[59px]"
                >
                  Stunning Real Estate Marketing, Personalized To Your Market In Minutes
                </h1>

                <p className="type-body-68 mt-20 max-w-[400px] text-white/70">
                  The all-in-one marketing platform for residential real estate agents
                  AI-personalized content, a custom business dashboard, and a strategic AI advisor
                  that knows your market.
                </p>

                <ul
                  aria-label="Supported publishing channels"
                  className="mt-28 flex flex-wrap gap-12"
                >
                  {channels.map((channel) => (
                    <li key={channel.name}>
                      <span
                        className={`flex h-30 w-30 items-center justify-center rounded-full ${channel.className}`}
                      >
                        <channel.icon aria-hidden="true" size={16} />
                        <span className="sr-only">{channel.name}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-40 desktop:mt-24 desktop:-mr-[82px] desktop:w-[698px] desktop:shrink-0">
                <HeroPreview />
              </div>
            </div>

            <div className="mt-40 flex flex-col items-center text-center">
              <p className="type-body-sm-2 text-white">
                Join <strong className="type-body-61 text-accent">Hundreds</strong> of other agents
                on the waitlist for Agentwise
              </p>

              <Link
                to="/sign-up"
                className="type-body-sm-2 mt-20 inline-flex h-36 items-center justify-center rounded-full bg-accent px-20 text-white transition-colors duration-200 hover:bg-color-30"
              >
                Get Started
              </Link>
            </div>
          </section>
        </main>
      </div>

      <MarketingScrollSection
        items={searchItems}
        isLoading={isSearchLoading}
        error={searchError}
        onRetry={loadSearchContent}
      />

      <ThreeStepsSection />
      <UltimateMindSection />
      <TestimonialsSection />
      <ContactFormSection />
      <SiteFooter />
    </div>
  );
}

export default Home;
