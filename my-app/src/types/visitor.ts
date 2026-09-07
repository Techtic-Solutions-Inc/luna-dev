export interface VisitorHomeItem {
  id: string
  name: string
  title: string
  description: string
  link: string
  image: string
  image_url: string
  category: string
  tags: string[]
  full_name: string | null
  first_name: string | null
  last_name: string | null
  email: string | null
  phone: string | null
  phone_number: string | null
  error: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface VisitorHomePagination {
  page: number
  limit: number
}

export interface VisitorHomeData {
  items: VisitorHomeItem[]
  pagination: VisitorHomePagination
}

export interface VisitorHomeResponse {
  success: boolean
  message: string
  data: VisitorHomeData
}

export interface VisitorHomeQueryParams {
  q?: string
  category?: string
  page?: number
  limit?: number
}

export type VisitorHomeSortColumn = 'items' | 'pagination'
export type SortDirection = 'asc' | 'desc' | null
