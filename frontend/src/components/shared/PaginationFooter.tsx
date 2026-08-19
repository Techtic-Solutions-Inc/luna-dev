import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';

export const PAGE_SIZE = 5;

interface PaginationFooterProps {
  page: number;
  total: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
}

export function PaginationFooter({
  page,
  total,
  pageSize = PAGE_SIZE,
  onPageChange,
}: PaginationFooterProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageCount = Math.min(pageSize, Math.max(0, total - (page - 1) * pageSize));

  return (
    <div className="flex items-center justify-end gap-4 pt-4">
      <p className="text-[13px] text-primary">
        Showing {pageCount} of {total}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="focus-ring flex h-8 w-8 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next page"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="focus-ring flex h-8 w-8 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
