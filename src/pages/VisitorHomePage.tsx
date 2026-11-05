import { useEffect, useMemo } from "react";
import styled from "styled-components";
import { HomePage } from "../components/luna-figma/HomePage";
import { publishReadPayload } from "../components/luna-figma/figmaDisplay";
import { useVisitorHome } from "../hooks/useVisitorHome";
import { ApiRequestError } from "../lib/apiRequest";
import { parseApiErrorBody } from "../lib/api/client";
import { VISITOR_HOME_PATH } from "../services/visitor-home.service";

const VISITOR_HOME_FALLBACK_MESSAGE =
  "Live marketing content is temporarily unavailable. Showing the design preview.";

const ApiStatusBanner = styled.div`
  position: sticky;
  top: 0;
  z-index: 50;
  padding: 12px 24px;
  text-align: center;
  background: ${({ theme }) => theme.colors.color20};
  color: ${({ theme }) => theme.colors.success};
  font-family: ${({ theme }) => theme.fonts.almarai};
  border-bottom: 1px solid ${({ theme }) => theme.colors.color23};
`;

function visitorHomeErrorMessage(error: unknown): string {
  if (error instanceof ApiRequestError) {
    const parsed = parseApiErrorBody(error.body);
    if (parsed && parsed !== "Request failed") {
      return parsed;
    }
    if (error.message) {
      return error.message;
    }
  }
  return VISITOR_HOME_FALLBACK_MESSAGE;
}

export function VisitorHomePage() {
  const { data, isError, error } = useVisitorHome();

  useEffect(() => {
    if (data) {
      publishReadPayload("GET", VISITOR_HOME_PATH, data);
    }
  }, [data]);

  const statusMessage = useMemo(
    () => (isError ? visitorHomeErrorMessage(error) : null),
    [isError, error],
  );

  return (
    <>
      {statusMessage ? (
        <ApiStatusBanner role="status" aria-live="polite">
          {statusMessage}
        </ApiStatusBanner>
      ) : null}
      <HomePage />
    </>
  );
}
