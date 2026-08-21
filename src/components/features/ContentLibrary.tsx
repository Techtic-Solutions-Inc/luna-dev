import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import useContentLibrary from '../../hooks/useContentLibrary';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Skeleton from '../ui/Skeleton';
import Spinner from '../ui/Spinner';

const ContentLibrarySkeleton = () => (
  <div
    className="flex gap-gap-16 overflow-hidden"
    aria-busy="true"
    aria-label="Loading content library"
  >
    {Array.from({ length: 5 }).map((_, i) => (
      <Skeleton
        key={i}
        className="h-[280px] w-[200px] flex-shrink-0 tablet:h-[360px] tablet:w-[240px] rounded-radius-16"
      />
    ))}
  </div>
);

const ContentLibrary = () => {
  const { items, isLoading, isError, errorMessage, refetch, isFetching } = useContentLibrary();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter((item) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  });

  const sectionHeader = (
    <>
      <div className="text-center mb-gap-24 tablet:mb-gap-32">
        <h2
          id="content-library-heading"
          className="font-garamond text-heading-xl-37 tablet:text-heading-xl-45 text-color-16 mb-gap-16 text-balance"
        >
          Marketing That Stops The Scroll
        </h2>
        <p className="font-almarai text-body-34 text-color-14 max-w-2xl mx-auto">
          Hand-designed by our creative team. Personalized by AI to your market. Ready to post in
          minutes.
        </p>
      </div>

      <form
        className="flex flex-col tablet:flex-row items-stretch tablet:items-center gap-gap-12 mb-gap-32 tablet:mb-gap-40 max-w-3xl mx-auto"
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="relative flex-1">
          <FaMagnifyingGlass
            className="absolute left-padding-16 top-1/2 -translate-y-1/2 text-color-14"
            size={16}
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for content"
            aria-label="Search for content"
            className="w-full rounded-radius-10000 bg-secondary text-color-16 pl-padding-40 pr-padding-16 py-padding-12 font-almarai text-body-77 placeholder:text-color-14 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          />
        </div>
        <Button type="submit" size="md" aria-label="Search content">
          Search
        </Button>
        <Link
          to="/signup"
          className="inline-flex items-center justify-center gap-gap-8 font-almarai text-body-34 text-color-16 hover:text-accent active:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-radius-4 px-padding-8 py-padding-4 transition-colors whitespace-nowrap"
          aria-label="Browse all content templates"
        >
          Browse all
          <span aria-hidden="true">→</span>
        </Link>
      </form>
    </>
  );

  if (isLoading) {
    return (
      <section
        id="content"
        className="bg-color-50 py-padding-60 px-padding-16 tablet:px-padding-40"
        aria-labelledby="content-library-heading"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center mb-gap-40">
            <Skeleton className="h-10 w-3/4 max-w-lg mx-auto mb-gap-16" />
            <Skeleton className="h-6 w-2/3 max-w-md mx-auto mb-gap-24" />
            <Skeleton className="h-12 w-full max-w-3xl mx-auto rounded-radius-10000" />
          </div>
          <ContentLibrarySkeleton />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section
        id="content"
        className="bg-color-50 py-padding-60 px-padding-16 tablet:px-padding-40"
        aria-labelledby="content-library-heading"
      >
        <div className="mx-auto max-w-[1440px] text-center">
          {sectionHeader}
          <p className="font-almarai text-body-34 text-color-14 mb-gap-24" role="alert">
            {errorMessage}
          </p>
          <Button
            onClick={() => void refetch()}
            disabled={isFetching}
            aria-label="Retry loading content library"
          >
            {isFetching ? <Spinner size="sm" label="Retrying" /> : 'Retry'}
          </Button>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section
        id="content"
        className="bg-color-50 py-padding-60 px-padding-16 tablet:px-padding-40"
        aria-labelledby="content-library-heading"
      >
        <div className="mx-auto max-w-[1440px] text-center">
          {sectionHeader}
          <p className="font-almarai text-body-34 text-color-14">
            No content is available at this time. Check back soon for new templates.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="content"
      className="bg-color-50 py-padding-60 px-padding-16 tablet:px-padding-40"
      aria-labelledby="content-library-heading"
    >
      <div className="mx-auto max-w-[1440px]">
        {sectionHeader}

        {filteredItems.length > 0 && (
          <p className="font-almarai text-body-sm-106 text-color-14 mb-gap-16">
            {filteredItems.length} Result{filteredItems.length !== 1 ? 's' : ''}
          </p>
        )}

        {filteredItems.length === 0 ? (
          <p className="font-almarai text-body-34 text-color-14 text-center">
            No content matches your search. Try a different keyword or browse all templates.
          </p>
        ) : (
          <div
            className="flex gap-gap-16 overflow-x-auto pb-padding-8 snap-x snap-mandatory scrollbar-hide"
            role="list"
            aria-label="Content library items"
          >
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                role="listitem"
                className="flex-shrink-0 w-[200px] tablet:w-[240px] snap-start overflow-hidden bg-color-21 shadow-drop-shadow-40 hover:shadow-drop-shadow-18 transition-shadow duration-300"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-[280px] tablet:h-[360px] w-full object-cover"
                  loading="lazy"
                />
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentLibrary;
