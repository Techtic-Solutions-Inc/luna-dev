import type { HomeSearchItem } from '@/types/visitor';

interface MarketingCard {
  id: string;
  gradient: string;
  alt: string;
}

/** Fallback visuals when the search API returns no items. */
const fallbackCards: MarketingCard[] = [
  {
    id: 'fallback-1',
    gradient: 'bg-[linear-gradient(180deg,#4a6741_0%,#2d3b28_100%)]',
    alt: 'Modern home exterior with landscaped yard',
  },
  {
    id: 'fallback-2',
    gradient: 'bg-[linear-gradient(180deg,#8b7355_0%,#5c4a38_100%)]',
    alt: 'Coffee and sunglasses on a wooden table',
  },
  {
    id: 'fallback-3',
    gradient: 'bg-[linear-gradient(180deg,#6b8f71_0%,#3d5a42_100%)]',
    alt: 'Luxury patio with outdoor seating',
  },
  {
    id: 'fallback-4',
    gradient: 'bg-[linear-gradient(180deg,#7a8b99_0%,#4a5560_100%)]',
    alt: 'Tree-lined residential street',
  },
  {
    id: 'fallback-5',
    gradient: 'bg-[linear-gradient(180deg,#5c5c6e_0%,#353545_100%)]',
    alt: 'Real estate office workspace',
  },
];

function mapSearchItemToCard(item: HomeSearchItem, index: number): MarketingCard {
  const fallback = fallbackCards[index % fallbackCards.length];
  return {
    id: item.id,
    gradient: item.image_url !== null ? '' : fallback.gradient,
    alt: item.title.length > 0 ? item.title : fallback.alt,
  };
}

interface MarketingScrollSectionProps {
  items: HomeSearchItem[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

export function MarketingScrollSection({
  items,
  isLoading,
  error,
  onRetry,
}: MarketingScrollSectionProps) {
  const cards: MarketingCard[] =
    items.length > 0
      ? items.slice(0, 5).map((item, index) => mapSearchItemToCard(item, index))
      : fallbackCards;

  return (
    <section
      aria-labelledby="marketing-scroll-heading"
      className="bg-white px-20 py-60 tablet:py-80 desktop:py-102"
    >
      <div className="mx-auto w-full max-w-[1164px]">
        <div className="text-center">
          <h2
            id="marketing-scroll-heading"
            className="type-heading-xl-63 text-color-16 desktop:type-heading-xl-89"
          >
            Marketing That Stops The Scroll
          </h2>
          <p className="type-body-68 mx-auto mt-16 max-w-[560px] text-color-46">
            Professionally designed templates that help real estate agents stand out on every
            platform.
          </p>
        </div>

        {isLoading ? (
          <div
            className="mt-40 flex gap-16 overflow-x-auto pb-8 desktop:mt-52 desktop:justify-center"
            aria-busy="true"
            aria-label="Loading content cards"
          >
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={`skeleton-${String(index)}`}
                className="h-[320px] w-[180px] shrink-0 animate-pulse rounded-16 bg-color-40 tablet:h-[380px] tablet:w-[200px] desktop:h-[420px] desktop:w-[210px]"
                aria-hidden="true"
              />
            ))}
          </div>
        ) : null}

        {error !== null && !isLoading ? (
          <div className="mt-40 flex flex-col items-center gap-16 text-center" role="alert">
            <p className="type-body-sm-2 text-color-46">{error}</p>
            <button
              type="button"
              onClick={onRetry}
              className="type-body-sm-2 inline-flex h-36 items-center justify-center rounded-full border border-color-19 px-20 text-color-16 transition-colors duration-200 hover:bg-color-40"
            >
              Try again
            </button>
          </div>
        ) : null}

        {!isLoading && error === null ? (
          <div
            className="mt-40 flex gap-16 overflow-x-auto pb-8 desktop:mt-52 desktop:justify-center"
            role="list"
            aria-label="Marketing content examples"
          >
            {cards.map((card, index) => {
              const searchItem = items[index];
              const hasImage =
                searchItem?.image_url !== null && searchItem?.image_url !== undefined;

              return (
                <div
                  key={card.id}
                  role="listitem"
                  className={`relative h-[320px] w-[180px] shrink-0 overflow-hidden rounded-16 tablet:h-[380px] tablet:w-[200px] desktop:h-[420px] desktop:w-[210px] ${hasImage ? '' : card.gradient}`}
                  style={
                    hasImage
                      ? {
                          backgroundImage: `url(${searchItem.image_url ?? ''})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }
                      : undefined
                  }
                >
                  <span className="sr-only">{card.alt}</span>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default MarketingScrollSection;
