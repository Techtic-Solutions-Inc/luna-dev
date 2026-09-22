/** Locked OpenAPI paths — use exact method + path strings in the service layer. */
export const LOCKED_API_ROUTES = {
  visitorHome: {
    method: "GET",
    path: "/api/visitor/home",
  },
} as const;
