import { useQuery } from "@tanstack/react-query";
import { getVisitorHome } from "@/services/visitor-home.service";

export function useVisitorHome() {
  return useQuery({
    queryKey: ["visitor", "home"],
    queryFn: getVisitorHome,
    retry: false,
  });
}
