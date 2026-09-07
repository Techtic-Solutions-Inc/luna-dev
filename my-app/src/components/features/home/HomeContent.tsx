import { EmptyState } from '@/components/EmptyState'
import { ErrorMessage } from '@/components/ErrorMessage'
import { useVisitorHome } from '@/hooks/useVisitorHome'
import type { NavLink } from './constants'
import { NAV_LINKS } from './constants'
import { ContactSection } from './ContactSection'
import { HomeFooter, HomeHeader } from './HomeHeader'
import { HomeLoadingSkeleton } from './HomeLoadingSkeleton'
import {
  HeroSection,
  MarketingGallerySection,
  StepsSection,
  TestimonialsSection,
  UltimateMindFeatureSection,
  WaitlistCta,
} from './HomeSections'
import { ImageGallery } from './ImageGallery'
import { LinkList } from './LinkList'

function mapApiLinks(items: ReturnType<typeof useVisitorHome>['items']): NavLink[] {
  const linkItems = items.filter((item) => item.category === 'link' && item.link)
  if (linkItems.length === 0) return NAV_LINKS

  return linkItems.map((item) => ({
    label: item.title || item.name,
    href: item.link,
  }))
}

function getHeadline(items: ReturnType<typeof useVisitorHome>['items']): string | undefined {
  const hero = items.find((item) => item.category === 'hero' || item.name === 'headline')
  return hero?.title || hero?.description || undefined
}

function getSubheadline(items: ReturnType<typeof useVisitorHome>['items']): string | undefined {
  const hero = items.find((item) => item.category === 'hero' || item.name === 'subheadline')
  return hero?.description || undefined
}

function MarketingPage({
  items,
  pagination,
  page,
  limit,
  sortColumn,
  sortDirection,
  toggleSort,
  goToPage,
  error,
  isEmpty,
  refetch,
}: {
  items: ReturnType<typeof useVisitorHome>['items']
  pagination: ReturnType<typeof useVisitorHome>['pagination']
  page: number
  limit: number
  sortColumn: ReturnType<typeof useVisitorHome>['sortColumn']
  sortDirection: ReturnType<typeof useVisitorHome>['sortDirection']
  toggleSort: ReturnType<typeof useVisitorHome>['toggleSort']
  goToPage: ReturnType<typeof useVisitorHome>['goToPage']
  error: string | null
  isEmpty: boolean
  refetch: () => void
}) {
  const navLinks = mapApiLinks(items)
  const headline = getHeadline(items)
  const subheadline = getSubheadline(items)
  const galleryItems = items.filter(
    (item) => item.category === 'image' || item.category === 'gallery' || item.image_url || item.image,
  )
  const displayGalleryItems = galleryItems.length > 0 ? galleryItems : items.length > 0 ? items : undefined
  const hasMore = (displayGalleryItems?.length ?? 0) >= limit

  return (
    <>
      <div className="vh-hero-shell">
        <HomeHeader />
        <div className="hidden lg:block">
          <LinkList links={navLinks} className="justify-center pb-[10px]" />
        </div>

        {(error || isEmpty) && (
          <div className="mx-auto max-w-[720px] px-[40px] pb-[20px]">
            {error ? (
              <ErrorMessage message={error} onRetry={() => void refetch()} />
            ) : (
              <EmptyState
                title="No Content Available"
                description="Home content is not available at the moment. Showing default marketing content."
                actionLabel="Retry"
                onAction={() => void refetch()}
              />
            )}
          </div>
        )}

        <HeroSection headline={headline} subheadline={subheadline} />
        <WaitlistCta />
      </div>

      <MarketingGallerySection />
      <div className="bg-[#ffffff] px-[40px] pb-[80px]">
        <div className="mx-auto max-w-[1920px]">
          <ImageGallery
            items={displayGalleryItems}
            page={pagination.page || page}
            limit={pagination.limit || limit}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onToggleSort={toggleSort}
            onPageChange={goToPage}
            hasMore={hasMore}
          />
        </div>
      </div>

      <StepsSection />
      <UltimateMindFeatureSection />
      <TestimonialsSection />
      <ContactSection />
      <HomeFooter />
    </>
  )
}

export function HomeContent() {
  const {
    items,
    pagination,
    page,
    limit,
    isLoading,
    error,
    isEmpty,
    sortColumn,
    sortDirection,
    toggleSort,
    goToPage,
    refetch,
  } = useVisitorHome()

  if (isLoading) {
    return <HomeLoadingSkeleton />
  }

  return (
    <MarketingPage
      items={items}
      pagination={pagination}
      page={page}
      limit={limit}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      toggleSort={toggleSort}
      goToPage={goToPage}
      error={error}
      isEmpty={isEmpty}
      refetch={refetch}
    />
  )
}
