/** luna-spec-codegen: owned-layout */
import { useEffect } from "react";
import { getApiErrorMessage } from "@/lib/api-client";
import { setFigmaNodeText, unwrapEnvelopeData } from "@/lib/envelope";
import { useAboutUs } from "@/hooks/useAboutUs";
import { useVisitorHome } from "@/hooks/useVisitorHome";
import type { AboutUsData } from "@/types/about-us";
import type { VisitorHomeMarketingData } from "@/types/visitor-home";

type LunaFigmaApiBridgeProps = {
  screen: "home" | "about";
};

function applyHomeData(data: VisitorHomeMarketingData): void {
  setFigmaNodeText("2241:1740", data.marketing_message);
  setFigmaNodeText("2241:1737", data.sub_heading);
  setFigmaNodeText("2270:16895", data.contact_email);
}

function applyAboutData(data: AboutUsData): void {
  setFigmaNodeText("572:3937", data.mission_statement);
  setFigmaNodeText("631:826", data.problem_statement);
  setFigmaNodeText("863:4305", data.story);
  setFigmaNodeText("643:2729", data.team_intro);
  setFigmaNodeText("643:3290", data.contact_email);
  setFigmaNodeText("643:3313", data.footer);
}

export function LunaFigmaApiBridge({ screen }: LunaFigmaApiBridgeProps) {
  const homeQuery = useVisitorHome();
  const aboutQuery = useAboutUs();

  const query = screen === "home" ? homeQuery : aboutQuery;

  const apiData =
    screen === "home"
      ? unwrapEnvelopeData<VisitorHomeMarketingData>(homeQuery.data)
      : unwrapEnvelopeData<AboutUsData>(aboutQuery.data);

  useEffect(() => {
    if (!apiData) {
      return;
    }
    if (screen === "home") {
      applyHomeData(apiData as VisitorHomeMarketingData);
      return;
    }
    applyAboutData(apiData as AboutUsData);
  }, [homeQuery.data, aboutQuery.data, apiData, screen]);

  let statusMessage = "";
  if (query.isLoading) {
    statusMessage = `Loading ${screen} content.`;
  } else if (query.isError) {
    statusMessage = getApiErrorMessage(query.error);
  } else if (!apiData) {
    statusMessage = `${screen} content is empty.`;
  } else {
    statusMessage = `${screen} content loaded.`;
  }

  return (
    <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
      {statusMessage}
    </div>
  );
}
