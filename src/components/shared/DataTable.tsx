import type { KeyboardEvent, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { LoadingState } from '@/components/shared/LoadingState';
import { cn } from '@/lib/utils';

export interface DataTableColumn<T> {
  id: string;
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowId: (row: T) => string;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
  onRowClick?: (row: T) => void;
  page?: number;
  pageCount?: number;
  onPageChange?: (page: number) => void;
  caption?: string;
}

export function DataTable<T>({
  columns,
  data,
  getRowId,
  isLoading = false,
  isError = false,
  errorMessage = 'The list could not be loaded.',
  onRetry,
  emptyTitle = 'No records yet',
  emptyDescription = 'There is nothing to show right now.',
  emptyAction,
  onRowClick,
  page,
  pageCount,
  onPageChange,
  caption,
}: DataTableProps<T>) {
  if (isLoading) {
    return <LoadingState rows={5} label="Loading table" />;
  }

  if (isError) {
    return <ErrorState message={errorMessage} onRetry={onRetry} />;
  }

  if (data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />;
  }

  const handleRowKeyDown = (event: KeyboardEvent<HTMLTableRowElement>, row: T) => {
    if (!onRowClick) {
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onRowClick(row);
    }
  };

  return (
    <div className="flex flex-col gap-gap-16">
      <div className="rounded-lg border border-border bg-card">
        <Table>
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={getRowId(row)}
                tabIndex={onRowClick ? 0 : undefined}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                onKeyDown={onRowClick ? (event) => handleRowKeyDown(event, row) : undefined}
                className={cn(onRowClick && 'cursor-pointer')}
              >
                {columns.map((column) => (
                  <TableCell key={column.id} className={column.className}>
                    {column.cell(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {pageCount && pageCount > 1 && onPageChange && page !== undefined ? (
        <div className="flex items-center justify-end gap-gap-8">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {pageCount}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page >= pageCount}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
}
