import { type FormEvent } from 'react';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';
import type { GalleryCard } from '../../../lib/home';

interface ContentGalleryProps {
  cards: GalleryCard[];
  loading: boolean;
  error: string | null;
  query: string;
  searched: boolean;
  onQueryChange: (value: string) => void;
  onSearch: (value: string) => void;
  onRetry: () => void;
}

export default function ContentGallery({
  cards,
  loading,
  error,
  query,
  searched,
  onQueryChange,
  onSearch,
  onRetry,
}: ContentGalleryProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <section id="content" aria-labelledby="content-heading" className="bg-[var(--color-74)] px-6 py-20 lg:px-10 lg:py-24">
      <div id="shop" className="mx-auto max-w-7xl text-center">
        <h2
          id="content-heading"
          className="font-garamond text-3xl font-medium text-[var(--color-16)] md:text-4xl lg:text-[42px] lg:leading-[55px]"
        >
          Marketing That Stops The Scroll
        </h2>
        <p className="mt-3 font-almarai text-sm text-[var(--color-60)] md:text-base">
          Hand-designed by our creative team. Personalized by AI to your market. Ready to post in
          minutes.
        </p>

        <form
          className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
          onSubmit={handleSubmit}
          role="search"
        >
          <label htmlFor="home-search" className="sr-only">
            Search for content
          </label>
          <input
            id="home-search"
            type="search"
            name="q"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search for content"
            className="h-12 flex-1 rounded-full border border-[var(--color-42)] bg-white px-5 font-almarai text-sm text-[var(--color-16)] placeholder:text-[var(--color-60)] focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <Button type="submit" className="h-12 px-8 py-0" aria-label="Search content">
            Search
          </Button>
        </form>

        {error ? (
          <div className="mt-8 flex flex-col items-center gap-3" role="alert">
            <p className="font-almarai text-sm text-[var(--color-60)]">{error}</p>
            <Button variant="outline" onClick={onRetry} aria-label="Retry content search">
              Try again
            </Button>
          </div>
        ) : null}

        {loading ? (
          <div className="mt-12" aria-busy="true">
            <Spinner label="Loading content" />
            <ul className="mt-8 flex gap-4 overflow-hidden">
              {Array.from({ length: 6 }).map((_, index) => (
                <li
                  key={`skeleton-${index}`}
                  className="h-[320px] w-40 shrink-0 animate-pulse rounded-3xl bg-[var(--color-42)] md:h-[380px] md:w-auto md:flex-1"
                />
              ))}
            </ul>
          </div>
        ) : null}

        {!loading && !error && cards.length === 0 ? (
          <p className="mt-12 font-almarai text-sm text-[var(--color-60)]" role="status">
            {searched
              ? 'No matching content yet. Try a different search.'
              : 'No marketing templates are available yet.'}
          </p>
        ) : null}

        {!loading && cards.length > 0 ? (
          <ul
            className="mt-12 flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-6"
            aria-label="Marketing content gallery"
          >
            {cards.map((card) => (
              <li
                key={card.id}
                className="relative w-44 shrink-0 overflow-hidden rounded-3xl md:w-auto"
                style={{ boxShadow: 'var(--drop-shadow-39)' }}
              >
                <img src={card.src} alt={card.alt} className="aspect-[9/16] w-full object-cover" />
                <p
                  className={`absolute inset-x-3 bottom-6 text-center font-garamond text-sm font-medium leading-snug text-secondary ${
                    card.italic ? 'italic' : ''
                  }`}
                >
                  {card.caption}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
