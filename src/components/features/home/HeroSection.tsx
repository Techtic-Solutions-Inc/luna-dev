import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaXTwitter } from 'react-icons/fa6';
import { LuSearch } from 'react-icons/lu';
import type { VisitorSearchResult } from '../../../types/visitor';
import HomeButton from './HomeButton';
import Spinner from '../../ui/Spinner';

const socialLinks = [
  { icon: FaFacebookF, label: 'Facebook', href: 'https://facebook.com' },
  { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: FaTiktok, label: 'TikTok', href: 'https://tiktok.com' },
  { icon: FaLinkedinIn, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: FaXTwitter, label: 'X', href: 'https://x.com' },
];

interface HeroSectionProps {
  onGetStarted: () => void;
  searchResults: VisitorSearchResult[];
  searchLoading: boolean;
  searchError: string | null;
  onSearch: (query: string) => void;
}

const HeroSection = ({
  onGetStarted,
  searchResults,
  searchLoading,
  searchError,
  onSearch,
}: HeroSectionProps) => {
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = (formData.get('search') as string) ?? '';
    void onSearch(query);
  };

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-12 lg:px-10 lg:pb-28 lg:pt-20">
      <div
        className="pointer-events-none absolute -left-20 top-0 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-89) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #872bff 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="font-garamond text-4xl font-medium leading-tight text-secondary md:text-5xl lg:text-[55px] lg:leading-[72px]">
              Stunning Real Estate Marketing,{' '}
              <span className="text-accent">Personalized To Your Market In Minutes.</span>
            </h1>
            <p className="mt-6 max-w-xl font-almarai text-base leading-relaxed text-[var(--color-57)] md:text-lg">
              Agentwise is the all-in-one marketing platform for residential real estate agents — AI
              personalized content, a custom business dashboard, and a strategic AI advisor that
              knows your market.
            </p>

            <div className="mt-8 flex items-center gap-3" aria-label="Social media links">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-41)] text-[var(--color-57)] transition-colors hover:border-accent hover:text-accent"
                  aria-label={label}
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              ))}
            </div>

            <div className="mt-10">
              <HomeButton onClick={onGetStarted}>Get Started</HomeButton>
              <p className="mt-4 font-almarai text-sm text-[var(--color-57)]">
                Join 34,000+ other agents on the newsletter at Agentwise
              </p>
            </div>
          </div>

          <div
            className="overflow-hidden rounded-2xl border border-[var(--color-41)]"
            style={{ boxShadow: 'var(--drop-shadow-20)' }}
          >
            <div className="bg-[var(--color-20)] p-4">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[var(--color-45)]" />
                <div className="h-3 w-3 rounded-full bg-[var(--color-35)]" />
                <div className="h-3 w-3 rounded-full bg-[var(--color-17)]" />
              </div>

              <div className="rounded-xl bg-[var(--color-36)] p-5">
                <p className="font-garamond text-2xl font-medium text-secondary">Good morning,</p>
                <p className="font-garamond text-2xl font-medium text-accent">Ava.</p>
                <p className="mt-2 font-almarai text-sm text-[var(--color-57)]">
                  Your content is ready for the week ahead.
                </p>

                <form onSubmit={handleSearchSubmit} className="mt-5">
                  <div className="relative">
                    <LuSearch
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-57)]"
                      size={18}
                      aria-hidden="true"
                    />
                    <input
                      name="search"
                      type="search"
                      placeholder="Generate captions, listing descriptions, email blasts..."
                      aria-label="Search content"
                      className="w-full rounded-full border border-[var(--color-41)] bg-[var(--color-16)] py-3 pl-11 pr-4 font-almarai text-sm text-secondary placeholder:text-[var(--color-57)] focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </form>

                {searchLoading && (
                  <div className="mt-4 flex justify-center py-4">
                    <Spinner label="Searching content" size="sm" />
                  </div>
                )}

                {searchError && (
                  <p
                    className="mt-4 text-center font-almarai text-sm text-[var(--border)]"
                    role="alert"
                  >
                    {searchError}
                  </p>
                )}

                {!searchLoading && !searchError && searchResults.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2" aria-label="New content for you">
                    {searchResults.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="overflow-hidden rounded-lg border border-[var(--color-41)]"
                      >
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="aspect-[3/4] w-full object-cover"
                          />
                        ) : (
                          <div
                            className="aspect-[3/4] w-full bg-gradient-to-br from-[var(--color-50)] to-[var(--color-36)]"
                            aria-hidden="true"
                          />
                        )}
                        <p className="truncate p-2 font-almarai text-[10px] text-[var(--color-57)]">
                          {item.title}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {!searchLoading && !searchError && searchResults.length === 0 && (
                  <p className="mt-4 text-center font-almarai text-sm text-[var(--color-57)]">
                    Browse the continuously updated collection of ready-made templates.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
