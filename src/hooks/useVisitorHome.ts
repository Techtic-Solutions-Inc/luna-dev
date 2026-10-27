import type { VisitorHomeContent } from "@/types/api";

export const STATIC_VISITOR_HOME: VisitorHomeContent = {
  marketing_message: "Built for Agents like you.",
  sub_heading:
    "Hand-designed by our creative team. Personalized by AI to your market. Ready to post in minutes.",
  contact_email: "hello@agentwisemarketing.com",
  privacy_policy_link: "/privacy-policy",
  terms_of_service_link: "/terms-of-service",
  phone: "",
  terms_accepted: false,
};

/** GET /api/visitor/home is not on live OpenAPI — static until backend ships. */
export function useVisitorHome() {
  return {
    status: "success" as const,
    data: STATIC_VISITOR_HOME,
    error: null as string | null,
    isLoading: false,
  };
}
