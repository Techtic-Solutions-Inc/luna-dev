import { useQuery } from "@tanstack/react-query";
import { fetchVisitorHome, VISITOR_HOME_PATH } from "../services/visitor-home.service";
import type { VisitorHomeResponse } from "../types/api";

export const visitorHomeQueryKey = ["visitor", "home"] as const;

export function useVisitorHome() {
  return useQuery<VisitorHomeResponse>({
    queryKey: visitorHomeQueryKey,
    queryFn: fetchVisitorHome,
    meta: { path: VISITOR_HOME_PATH },
    retry: false,
  });
}
