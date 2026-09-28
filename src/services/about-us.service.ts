import { apiRequest } from "@/lib/api-client";
import { LOCKED_API_ROUTES } from "@/lib/api-routes";
import type { AboutUsResponse } from "@/types/about-us";

const route = LOCKED_API_ROUTES.aboutUs;

export function getAboutUs(): Promise<AboutUsResponse> {
  return apiRequest<AboutUsResponse>(route.method, route.path);
}
