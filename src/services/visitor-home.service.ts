import { apiRequest } from "@/lib/api-client";
import { LOCKED_API_ROUTES } from "@/lib/api-routes";
import type { VisitorHomeMarketingResponse } from "@/types/visitor-home";

const route = LOCKED_API_ROUTES.visitorHome;

/**
 * GET /api/visitor/home — public marketing home payload (Alex envelope).
 */
export function getVisitorHome(): Promise<VisitorHomeMarketingResponse> {
  return apiRequest<VisitorHomeMarketingResponse>(route.method, route.path);
}
