import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useContentCalendar } from '../../hooks/useContentCalendar';
import { CONTENT_LIBRARY_DESCRIPTION } from '../../lib/homeContent';
import type { GalleryImage } from '../../types/contentCalendar';
import { Button } from '../ui/Button';
import { ImageGallery } from '../ui/ImageGallery';
import { Spinner } from '../ui/Spinner';

export interface HomeStep {
  stepNumber: number;
  title: ReactNode;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

interface HomeContentProps {
  title: string;
  steps: HomeStep[];
  contentLibrary: GalleryImage[];
}

function StepFrame({ step }: { step: HomeStep }) {
  const padded = String(step.stepNumber).padStart(2, '0');
  return (
    <article className="flex flex-col desktop:flex-row desktop:items-center gap-24 tablet:gap-32 desktop:gap-40">
      <div className="flex-1 flex flex-col gap-16">
        <p className="font-almarai text-heading-lg-71 uppercase text-accent">Step {padded}</p>
        <h3 className="font-garamond text-heading-xl-37 text-secondary text-balance">{step.title}</h3>
        <p className="font-almarai text-body-3 text-color-14 max-w-xl">{step.description}</p>
      </div>
      <div className="flex-1 rounded-radius-20 overflow-hidden shadow-drop-shadow-18">
        <img src={step.imageSrc} alt={step.imageAlt} className="w-full h-auto object-cover" loading="lazy" />
      </div>
    </article>
  );
}

function ContentLibrarySection({
  isLoading,
  isError,
  isEmpty,
  gallery,
  refetch,
}: {
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  gallery: GalleryImage[];
  refetch: () => void;
}) {
  return (
    <section
      id="content"
      className="bg-secondary py-padding-32 tablet:py-padding-60 px-padding-16 tablet:px-padding-32"
      aria-labelledby="content-library-heading"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="text-center mb-32 tablet:mb-40">
          <h2
            id="content-library-heading"
            className="font-garamond text-heading-xl-37 text-color-16 mb-16 text-balance"
          >
            Marketing That Stops The Scroll
          </h2>
          <p className="font-almarai text-body-3 text-color-14 max-w-2xl mx-auto">
            {CONTENT_LIBRARY_DESCRIPTION}{' '}
            <span className="text-accent font-bold">Hundreds</span> of templates updated continuously.
          </p>
        </div>

        {isLoading ? (
          <div className="flex min-h-[400px] items-center justify-center" aria-busy="true">
            <Spinner size="lg" label="Loading content library" />
          </div>
        ) : null}

        {isError ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center gap-16 text-center" role="alert">
            <p className="font-almarai text-body-34 text-color-16">
              Unable to load content library. Please try again.
            </p>
            <Button type="button" onClick={() => void refetch()} aria-label="Retry loading content">
              Retry
            </Button>
          </div>
        ) : null}

        {!isLoading && !isError && isEmpty ? (
          <p className="font-almarai text-body-34 text-color-14 text-center py-padding-40">
            No content is available.
          </p>
        ) : null}

        {!isLoading && !isError && !isEmpty ? (
          <div className="flex flex-col gap-24">
            <ImageGallery images={gallery} />
            <div className="flex justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center gap-8 font-almarai text-body-34 text-color-16 hover:text-accent active:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-radius-4 px-padding-8 py-padding-4 transition-colors"
                aria-label="Browse all content templates"
              >
                Browse all
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function HomeContent({ title, steps, contentLibrary }: HomeContentProps) {
  const { isLoading, isError, isEmpty, refetch, items } = useContentCalendar();
  const gallery = items.length > 0 ? items : contentLibrary;

  return (
    <>
      <ContentLibrarySection
        isLoading={isLoading}
        isError={isError}
        isEmpty={isEmpty}
        gallery={gallery}
        refetch={refetch}
      />

      <section
        className="relative bg-color-24 py-padding-32 tablet:py-padding-60 px-padding-16 tablet:px-padding-32"
        aria-labelledby="steps-heading"
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(theme(colors.color-20)_1px,transparent_1px),linear-gradient(90deg,theme(colors.color-20)_1px,transparent_1px)] bg-[length:60px_60px]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1440px]">
          <h2
            id="steps-heading"
            className="font-garamond text-heading-xl-37 desktop:text-heading-xl-45 text-secondary text-center mb-32 tablet:mb-50 text-balance"
          >
            {title}
          </h2>
          <div className="flex flex-col gap-50">
            {steps.map((step) => (
              <StepFrame key={step.stepNumber} step={step} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeContent;
