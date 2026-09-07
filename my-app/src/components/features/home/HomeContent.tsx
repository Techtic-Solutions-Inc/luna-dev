import { EmptyState } from '@/components/EmptyState'
import { ErrorMessage } from '@/components/ErrorMessage'
import { cn } from '@/lib/utils'
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

function FallbackNotice({
  error,
  isEmpty,
  onRetry,
}: {
  error: string | null
  isEmpty: boolean
  onRetry: () => void
}) {
  if (error) {
    return (
      <div className="mx-auto max-w-[720px] pb-[20px]">
        <ErrorMessage
          message="Live content could not be loaded. You are viewing our default marketing page."
          onRetry={onRetry}
        />
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className="mx-auto max-w-[720px] pb-[20px] [&_h3]:text-[#ffffff] [&_p]:text-[#ffffff]/70">
        <EmptyState
          title="No Content Available"
          description="Home content is not available at the moment. You are viewing our default marketing page."
          actionLabel="Retry"
          onAction={onRetry}
        />
      </div>
    )
  }

  return null
}

function MarketingPage({
  items,
  pagination,
  page,
  limit,
  goToPage,
  error,
  isEmpty,
  refetch,
}: {
  items: ReturnType<typeof useVisitorHome>['items']
  pagination: ReturnType<typeof useVisitorHome>['pagination']
  page: number
  limit: number
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
  const hasApiGalleryItems = galleryItems.length > 0
  const hasMore = hasApiGalleryItems && galleryItems.length >= limit
  const isFallbackMode = Boolean(error) || isEmpty

  return (
    <>
      <div className="vh-hero-shell px-[40px] py-[60px]">
        <HomeHeader navLinks={navLinks} />

        <FallbackNotice error={error} isEmpty={isEmpty} onRetry={() => void refetch()} />

        <div className={cn(isFallbackMode && 'opacity-40 saturate-[0.85]')}>
          <HeroSection headline={headline} subheadline={subheadline} />
          <WaitlistCta />
        </div>
      </div>

      <div className={cn(isFallbackMode && 'opacity-40 saturate-[0.85]')}>
        <MarketingGallerySection />
        <div className="bg-[#ffffff] px-[40px] pb-[80px]">
          <div className="mx-auto max-w-[1920px]">
            <ImageGallery
              items={hasApiGalleryItems ? galleryItems : undefined}
              page={pagination.page || page}
              limit={pagination.limit || limit}
              onPageChange={hasApiGalleryItems ? goToPage : undefined}
              hasMore={hasMore}
              showPagination={hasApiGalleryItems}
            />
          </div>
        </div>

        <StepsSection />
        <UltimateMindFeatureSection />
        <TestimonialsSection />
        <ContactSection />
        <HomeFooter />
      </div>
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
      goToPage={goToPage}
      error={error}
      isEmpty={isEmpty}
      refetch={refetch}
    />
  )
}
