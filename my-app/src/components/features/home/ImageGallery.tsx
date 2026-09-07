import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { VisitorHomeItem } from '@/types/visitor'
import { DEFAULT_GALLERY_IMAGES, type GalleryImage } from './constants'

interface ImageGalleryProps {
  items?: VisitorHomeItem[]
  isLoading?: boolean
  page?: number
  limit?: number
  onPageChange?: (page: number) => void
  hasMore?: boolean
  showPagination?: boolean
}

function itemToGalleryImage(item: VisitorHomeItem): GalleryImage {
  return {
    src: item.image_url || item.image || DEFAULT_GALLERY_IMAGES[0].src,
    alt: item.title || item.name || 'Marketing content',
    overlay: item.description || undefined,
  }
}

export function ImageGallery({
  items,
  isLoading = false,
  page = 1,
  limit = 10,
  onPageChange,
  hasMore = false,
  showPagination = false,
}: ImageGalleryProps) {
  const galleryImages: GalleryImage[] =
    items && items.length > 0
      ? items.map(itemToGalleryImage)
      : DEFAULT_GALLERY_IMAGES

  const displayImages = galleryImages.length > 0 ? galleryImages : DEFAULT_GALLERY_IMAGES

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex gap-[20px] overflow-x-auto pb-[10px]">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-[552px] w-[316px] shrink-0 rounded-[24px] bg-[var(--vh-background-muted)]/20"
            />
          ))}
        </div>
      ) : (
        <div
          className="flex gap-[20px] overflow-x-auto pb-[10px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="list"
          aria-label="Marketing content gallery"
        >
          {displayImages.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              role="listitem"
              className="relative h-[552px] w-[316px] shrink-0 overflow-hidden rounded-[24px]"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              {image.overlay && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#000000]/80 to-transparent px-[20px] py-[24px]">
                  <p className="vh-font-eb-garamond text-[18px] font-[400] italic leading-[24px] text-[#ffffff]">
                    {image.overlay}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showPagination && onPageChange && (page > 1 || hasMore) && (
        <Pagination className="mt-[24px]">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1 || isLoading}
                aria-disabled={page <= 1 || isLoading}
                className={cn(
                  'border-[var(--vh-background-muted)]/30 bg-transparent text-[var(--vh-color-103)] hover:bg-[var(--vh-background-muted)]/10',
                  (page <= 1 || isLoading) && 'pointer-events-none opacity-50',
                )}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                isActive
                className="border-[var(--vh-cta-primary)] bg-[var(--vh-cta-primary)] text-[var(--vh-cta-primary-foreground)]"
                aria-label={`Page ${page}`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(page + 1)}
                disabled={!hasMore || isLoading}
                aria-disabled={!hasMore || isLoading}
                className={cn(
                  'border-[var(--vh-background-muted)]/30 bg-transparent text-[var(--vh-color-103)] hover:bg-[var(--vh-background-muted)]/10',
                  (!hasMore || isLoading) && 'pointer-events-none opacity-50',
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {!isLoading && displayImages.length === 0 && (
        <p className="py-[40px] text-center vh-font-almarai text-[16px] text-[var(--vh-background-muted)]">
          No images available.
        </p>
      )}

      {showPagination && (
        <span className="sr-only">
          Showing page {page} with up to {limit} items per page.
        </span>
      )}
    </div>
  )
}
