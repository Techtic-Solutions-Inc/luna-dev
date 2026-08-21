import { Link } from 'react-router-dom';
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
  const { data, isLoading, isError, refetch, isFetching } = useContentLibrary();

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
            <Skeleton className="h-6 w-2/3 max-w-md mx-auto" />
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
          <h2
            id="content-library-heading"
            className="font-garamond text-heading-xl-67 text-color-16 mb-gap-16"
          >
            Marketing That Stops The Scroll
          </h2>
          <p className="font-almarai text-body-34 text-color-14 mb-gap-24" role="alert">
            Unable to load content library. Please try again.
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

  const items = data ?? [];

  if (items.length === 0) {
    return (
      <section
        id="content"
        className="bg-color-50 py-padding-60 px-padding-16 tablet:px-padding-40"
        aria-labelledby="content-library-heading"
      >
        <div className="mx-auto max-w-[1440px] text-center">
          <h2
            id="content-library-heading"
            className="font-garamond text-heading-xl-67 text-color-16 mb-gap-16"
          >
            Marketing That Stops The Scroll
          </h2>
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
        <div className="text-center mb-gap-40">
          <h2
            id="content-library-heading"
            className="font-garamond text-heading-xl-67 text-color-16 mb-gap-16 text-balance"
          >
            Marketing That Stops The Scroll
          </h2>
          <p className="font-almarai text-body-34 text-color-14 max-w-2xl mx-auto">
            Fine-tuned designs by our masters work. Personalized to drive your market. Ready to
            post in minutes.
          </p>
        </div>

        <div
          className="flex gap-gap-16 overflow-x-auto pb-padding-8 snap-x snap-mandatory scrollbar-hide"
          role="list"
          aria-label="Content library items"
        >
          {items.map((item) => (
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

        <div className="mt-gap-32 text-center">
          <Link
            to="/signup"
            className="inline-flex items-center gap-gap-8 font-almarai text-body-34 text-color-16 hover:text-accent active:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-radius-4 px-padding-8 py-padding-4 transition-colors"
            aria-label="Browse all content templates"
          >
            Browse all
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContentLibrary;
