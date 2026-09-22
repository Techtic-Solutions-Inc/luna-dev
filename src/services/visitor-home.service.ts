import { apiRequest } from "@/lib/api-client";
import { LOCKED_API_ROUTES } from "@/lib/api-routes";
import type { ApiSuccessEnvelope } from "@/types/api";

const route = LOCKED_API_ROUTES.visitorHome;

export type VisitorHomeData = Record<string, unknown>;

export type VisitorHomeSuccess = ApiSuccessEnvelope<VisitorHomeData>;

/**
 * GET /api/visitor/home — public marketing home payload (Alex envelope).
 */
export function getVisitorHome(): Promise<VisitorHomeSuccess> {
  return apiRequest<VisitorHomeSuccess>(route.method, route.path);
}
