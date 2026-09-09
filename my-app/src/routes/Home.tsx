import { Frame1618873431Section } from '@/components/features/home/Frame1618873431Section';
import { Frame2147227843Section } from '@/components/features/home/Frame2147227843Section';
import { Frame2147227849Section } from '@/components/features/home/Frame2147227849Section';
import { Group33654370Section } from '@/components/features/home/Group33654370Section';
import { Group33654437Section } from '@/components/features/home/Group33654437Section';
import { Group33654438Section } from '@/components/features/home/Group33654438Section';
import { ContentLibrary } from '@/components/features/home/ContentLibrary';
import { HomeSection } from '@/components/features/home/HomeSection';
import { MarketingSteps } from '@/components/features/home/MarketingSteps';
import '@/components/features/home/home.css';

function Home() {
  return (
    <HomeSection>
      {({ items, pagesFetched, content }) => (
        <>
          {items.length === 0 ? (
            <div
              role="status"
              className="relative z-30 mx-auto max-w-[720px] px-[var(--spacing-padding-60)] py-[var(--spacing-padding-16)] text-center font-['Almarai'] text-[14px] leading-[22px] text-foreground/80"
            >
              No dynamic content is available; showing default page content.
            </div>
          ) : null}

          <p className="sr-only">
            Loaded {items.length} visitor home content {items.length === 1 ? 'item' : 'items'}{' '}
            across {pagesFetched} paginated API {pagesFetched === 1 ? 'batch' : 'batches'}.
          </p>

          <MarketingSteps />
          <ContentLibrary />
          <Group33654438Section
            galleryImages={content.galleryImages}
            showEmptyState={content.galleryImages.length === 0}
          />
          <Frame2147227843Section />
          <Frame2147227849Section />
          <Group33654437Section
            testimonials={content.testimonials}
            showEmptyState={content.testimonials.length === 0}
          />
          <Frame1618873431Section />
          <Group33654370Section
            navLinks={content.navLinks}
            showEmptyState={content.navLinks.length === 0}
          />
        </>
      )}
    </HomeSection>
  );
}

export default Home;
