import { useCallback, useEffect, useMemo, useState } from 'react'
import { getApiErrorMessage } from '@/lib/api/client'
import { fetchVisitorHome } from '@/services/visitor'
import type {
  SortDirection,
  VisitorHomeItem,
  VisitorHomePagination,
  VisitorHomeSortColumn,
} from '@/types/visitor'

export const VISITOR_HOME_QUERY_KEY = ['visitor', 'home'] as const

const DEFAULT_LIMIT = 10

function compareValues(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0
  if (a == null) return 1
  if (b == null) return -1

  if (typeof a === 'number' && typeof b === 'number') {
    return a - b
  }

  if (typeof a === 'boolean' && typeof b === 'boolean') {
    return Number(a) - Number(b)
  }

  const aTime = Date.parse(String(a))
  const bTime = Date.parse(String(b))
  if (!Number.isNaN(aTime) && !Number.isNaN(bTime)) {
    return aTime - bTime
  }

  return String(a).localeCompare(String(b), undefined, { sensitivity: 'base' })
}

function sortItems(
  items: VisitorHomeItem[],
  column: VisitorHomeSortColumn | null,
  direction: SortDirection,
): VisitorHomeItem[] {
  if (!column || !direction) return items

  const sorted = [...items]
  sorted.sort((a, b) => {
    const cmp =
      column === 'items'
        ? compareValues(a.title || a.name, b.title || b.name)
        : compareValues(a.created_at, b.created_at)
    return direction === 'asc' ? cmp : -cmp
  })
  return sorted
}

export function useVisitorHome(initialPage = 1, initialLimit = DEFAULT_LIMIT) {
  const [items, setItems] = useState<VisitorHomeItem[]>([])
  const [pagination, setPagination] = useState<VisitorHomePagination>({
    page: initialPage,
    limit: initialLimit,
  })
  const [page, setPage] = useState(initialPage)
  const [limit] = useState(initialLimit)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortColumn, setSortColumn] = useState<VisitorHomeSortColumn | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetchVisitorHome({ page, limit })
      setItems(response.data.items ?? [])
      setPagination(response.data.pagination ?? { page, limit })
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to load home content. Please try again.'))
      setItems([])
    } finally {
      setIsLoading(false)
    }
  }, [page, limit])

  useEffect(() => {
    void load()
  }, [load])

  const sortedItems = useMemo(
    () => sortItems(items, sortColumn, sortDirection),
    [items, sortColumn, sortDirection],
  )

  const toggleSort = useCallback(
    (column: VisitorHomeSortColumn) => {
      if (sortColumn !== column) {
        setSortColumn(column)
        setSortDirection('asc')
        return
      }
      if (sortDirection === 'asc') {
        setSortDirection('desc')
        return
      }
      if (sortDirection === 'desc') {
        setSortColumn(null)
        setSortDirection(null)
        return
      }
      setSortDirection('asc')
    },
    [sortColumn, sortDirection],
  )

  const goToPage = useCallback((nextPage: number) => {
    setPage(Math.max(1, nextPage))
  }, [])

  const isEmpty = !isLoading && !error && sortedItems.length === 0

  return {
    queryKey: VISITOR_HOME_QUERY_KEY,
    items: sortedItems,
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
    refetch: load,
  }
}
