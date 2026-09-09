import { useMemo } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Badge } from '@/components/ui/badge';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useHome } from '@/hooks/useHome';
import type { HomeSortColumn } from '@/types/home';

const PAGE_SIZE_OPTIONS = [10, 25, 50] as const;

function SortHeader({
  label,
  column,
  sortColumn,
  sortDirection,
  onSort,
}: {
  label: string;
  column: HomeSortColumn;
  sortColumn: HomeSortColumn | null;
  sortDirection: 'asc' | 'desc' | null;
  onSort: (column: HomeSortColumn) => void;
}) {
  const isActive = sortColumn === column;
  const ariaSort =
    !isActive || !sortDirection ? 'none' : sortDirection === 'asc' ? 'ascending' : 'descending';

  return (
    <TableHead aria-sort={ariaSort} scope="col">
      <button
        type="button"
        className="inline-flex items-center gap-1 font-medium text-foreground hover:text-primary"
        onClick={() => onSort(column)}
        aria-label={`Sort by ${label} on the current page`}
      >
        {label}
        {isActive && sortDirection === 'asc' ? (
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        ) : isActive && sortDirection === 'desc' ? (
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        ) : (
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        )}
      </button>
    </TableHead>
  );
}

export function HomeItemsTable() {
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
    setPageSize,
    refetch,
  } = useHome();

  const canGoPrevious = page > 1;
  const canGoNext = items.length >= pagination.limit;

  const visiblePages = useMemo(() => {
    const pages: number[] = [];
    for (let current = 1; current <= page; current += 1) {
      pages.push(current);
    }
    if (canGoNext && !pages.includes(page + 1)) {
      pages.push(page + 1);
    }
    return pages;
  }, [page, canGoNext]);

  return (
    <section className="mt-8 w-full" aria-labelledby="home-items-table-heading">
      <h2
        id="home-items-table-heading"
        className="mb-4 font-['EB_Garamond'] text-[24px] font-medium text-foreground"
      >
        Visitor Home Content
      </h2>

      {error ? <ErrorMessage message={error} onRetry={() => void refetch()} /> : null}

      <div className="w-full overflow-hidden rounded-[10px] border border-border">
        <Table>
          <TableCaption className="sr-only">
            Visitor home records. Column sorting applies to the current page only because the API
            does not support server-side sort parameters.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <SortHeader
                label="Title"
                column="title"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={toggleSort}
              />
              <TableHead scope="col">Category</TableHead>
              <SortHeader
                label="Created"
                column="created_at"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={toggleSort}
              />
              <TableHead scope="col">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    <TableCell colSpan={4}>
                      <Skeleton className="h-8 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              : null}

            {!isLoading && isEmpty ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <EmptyState
                    title="No items found"
                    description="No visitor home content was returned for this page."
                    actionLabel="Retry"
                    onAction={() => void refetch()}
                  />
                </TableCell>
              </TableRow>
            ) : null}

            {!isLoading && !isEmpty
              ? items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title || item.name}</TableCell>
                    <TableCell>{item.category || '—'}</TableCell>
                    <TableCell>
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : '—'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.is_active ? 'default' : 'secondary'}>
                        {item.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>

      {!isLoading && !error && !isEmpty ? (
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Sorting applies to the current page only (server sort is not available).
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="home-items-page-size" className="text-sm text-muted-foreground">
                Rows per page
              </label>
              <Select
                value={String(limit)}
                onValueChange={(value) => setPageSize(Number(value))}
              >
                <SelectTrigger id="home-items-page-size" className="h-9 w-[88px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAGE_SIZE_OPTIONS.map((option) => (
                    <SelectItem key={option} value={String(option)}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Pagination className="mx-0 w-auto justify-start">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    disabled={!canGoPrevious}
                    onClick={() => goToPage(page - 1)}
                  />
                </PaginationItem>
                {visiblePages.map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      isActive={pageNumber === page}
                      onClick={() => goToPage(pageNumber)}
                      aria-label={`Go to page ${pageNumber}`}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext disabled={!canGoNext} onClick={() => goToPage(page + 1)} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          <p className="text-sm text-muted-foreground sm:basis-full">
            Page {pagination.page} · {items.length} item{items.length === 1 ? '' : 's'} on this page
            {canGoNext
              ? ' · more pages may exist (API does not return total count)'
              : ' · end of available pages'}
          </p>
        </div>
      ) : null}
    </section>
  );
}
