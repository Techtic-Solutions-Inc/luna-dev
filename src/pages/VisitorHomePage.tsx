import { useEffect } from "react";
import { HomePage } from "../components/luna-figma/HomePage";
import { publishReadPayload } from "../components/luna-figma/figmaDisplay";
import { HomeErrorState } from "../components/home/HomeErrorState";
import { HomePageSkeleton } from "../components/home/HomePageSkeleton";
import { useVisitorHome } from "../hooks/useVisitorHome";
import { VISITOR_HOME_PATH } from "../services/visitor-home.service";

export function VisitorHomePage() {
  const { data, isLoading, isError, error } = useVisitorHome();

  useEffect(() => {
    if (data) {
      publishReadPayload("GET", VISITOR_HOME_PATH, data);
    }
  }, [data]);

  if (isLoading && !data) {
    return <HomePageSkeleton />;
  }

  if (isError) {
    const message = error instanceof Error ? error.message : "Unable to load visitor home.";
    return <HomeErrorState message={message} />;
  }

  return <HomePage />;
}
