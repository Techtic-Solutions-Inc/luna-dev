import { useQuery } from "@tanstack/react-query";
import { getAboutUs } from "@/services/about-us.service";

export function useAboutUs() {
  return useQuery({
    queryKey: ["about-us"],
    queryFn: getAboutUs,
    retry: false,
  });
}
