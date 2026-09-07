import { apiClient } from '@/lib/api/client'
import type { VisitorHomeQueryParams, VisitorHomeResponse } from '@/types/visitor'

export async function fetchVisitorHome(
  params: VisitorHomeQueryParams = {},
): Promise<VisitorHomeResponse> {
  const response = await apiClient.get<VisitorHomeResponse>('/api/visitor/home', { params })
  return response.data
}
