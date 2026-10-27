import axios from "axios";
import type { ApiErrorResponse } from "@/types/api";

export function getApiErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (!err.response) {
      return "Unable to connect. Please check your connection.";
    }
    const status = err.response.status;
    const data = err.response.data as Partial<ApiErrorResponse> | undefined;
    if (status === 401) {
      return "Your session may have expired. Please sign in again.";
    }
    if (data?.message && typeof data.message === "string") {
      return data.message;
    }
    if (status >= 500) {
      return "Something went wrong. Please try again.";
    }
    return "Something went wrong. Please try again.";
  }
  if (err instanceof Error && err.message) {
    return err.message;
  }
  return "Something went wrong. Please try again.";
}
