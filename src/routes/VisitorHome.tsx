import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useVisitorHomeData } from '@/hooks/useVisitorHomeData';
import { VisitorItemCard } from '@/components/features/VisitorItemCard';
import { EmptyState } from '@/components/EmptyState';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { getApiErrorMessage } from '@/lib/api/errors';

const PAGE_SIZE_OPTIONS = [10, 20, 50];

function VisitorHomeSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3 rounded-lg border border-border bg-card p-4">
          <Skeleton className="aspect-video w-full" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  );
}

const VisitorHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('q') ?? '');

  const page = Number(searchParams.get('page') ?? '1');
  const limit = Number(searchParams.get('limit') ?? '10');
  const q = searchParams.get('q') ?? undefined;
  const category = searchParams.get('category') ?? undefined;

  const { data, isLoading, isError, error, refetch, isSuccess } = useVisitorHomeData({
    page,
    limit,
    q,
    category: category === 'all' ? undefined : category,
  });

  const items = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;
  const total = pagination?.total ?? items.length;
  const totalPages = pagination?.total_pages ?? Math.max(1, Math.ceil(total / limit));

  const categories = useMemo(() => {
    const cats = new Set(items.map((item) => item.category).filter(Boolean));
    return Array.from(cats);
  }, [items]);

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        Object.entries(updates).forEach(([key, value]) => {
          if (value === null || value === '') {
            next.delete(key);
          } else {
            next.set(key, value);
          }
        });
        return next;
      });
    },
    [setSearchParams],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentQ = searchParams.get('q') ?? '';
      if (searchInput !== currentQ) {
        updateParams({ q: searchInput || null, page: '1' });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput, searchParams, updateParams]);

  const rangeStart = total === 0 ? 0 : (page - 1) * limit + 1;
  const rangeEnd = Math.min(page * limit, total);

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [page, totalPages]);

  return (
    <div className="flex w-full flex-col px-8 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-garamond text-3xl font-semibold text-secondary">Visitor Home</h1>
          <p className="mt-1 font-almarai text-sm text-muted-foreground">
            Browse featured content and resources.
          </p>
        </div>
        <Button asChild className="shrink-0">
          <Link to="/signup">Sign up</Link>
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            placeholder="Search content…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-9"
            aria-label="Search content"
          />
        </div>
        <Select
          value={category ?? 'all'}
          onValueChange={(value) => updateParams({ category: value === 'all' ? null : value, page: '1' })}
        >
          <SelectTrigger className="w-full sm:w-[180px]" aria-label="Filter by category">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={String(limit)}
          onValueChange={(value) => updateParams({ limit: value, page: '1' })}
        >
          <SelectTrigger className="w-full sm:w-[120px]" aria-label="Items per page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAGE_SIZE_OPTIONS.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size} / page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading && <VisitorHomeSkeleton />}

      {isError && (
        <ErrorMessage
          message={getApiErrorMessage(error, 'Unable to load content. Please try again.')}
          onRetry={() => refetch()}
        />
      )}

      {isSuccess && items.length === 0 && (
        <EmptyState
          title="No content found"
          description={
            q || category
              ? 'Try adjusting your search or filters.'
              : 'There is no content available at the moment.'
          }
          action={
            (q || category) ? (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchInput('');
                  updateParams({ q: null, category: null, page: '1' });
                }}
              >
                Clear filters
              </Button>
            ) : undefined
          }
        />
      )}

      {isSuccess && items.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <VisitorItemCard key={item.id} item={item} />
            ))}
          </div>

          <Pagination className="mt-6">
            <p className="font-almarai text-sm text-muted-foreground">
              {rangeStart}–{rangeEnd} of {total}
            </p>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  disabled={page <= 1}
                  onClick={() => updateParams({ page: String(page - 1) })}
                />
              </PaginationItem>
              {pageNumbers.map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    isActive={pageNum === page}
                    onClick={() => updateParams({ page: String(pageNum) })}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  disabled={page >= totalPages}
                  onClick={() => updateParams({ page: String(page + 1) })}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
};

export default VisitorHome;
