import { request } from "../lib/api/client";
import type { VisitorHomeResponse } from "../types/api";

export const VISITOR_HOME_PATH = "/api/visitor/home";

export async function fetchVisitorHome(): Promise<VisitorHomeResponse> {
  return request<VisitorHomeResponse>("GET", VISITOR_HOME_PATH);
}
