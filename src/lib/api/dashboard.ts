import { client, toApiError } from "@/lib/api/client";
import { asRecord } from "@/lib/bind";
import type { DashboardOverviewData, DashboardOverviewResponse, SuggestionItem } from "@/lib/api/types";

function unwrapData(payload: unknown): DashboardOverviewData {
  const record = asRecord(payload);
  if (!record) {
    return {};
  }
  const inner = asRecord(record.data);
  return inner ?? record;
}

export async function getDashboard(): Promise<DashboardOverviewData> {
  try {
    const { data } = await client.get<DashboardOverviewResponse>("/api/dashboard");
    return unwrapData(data);
  } catch (error) {
    throw toApiError(error);
  }
}

export async function createDashboardNotification(): Promise<void> {
  try {
    await client.post("/api/dashboard/notifications", {});
  } catch (error) {
    throw toApiError(error);
  }
}

export async function updateDashboardSubscription(): Promise<void> {
  try {
    await client.put("/api/dashboard/subscription", {});
  } catch (error) {
    throw toApiError(error);
  }
}

export async function deleteDashboardNotification(id: string): Promise<void> {
  try {
    await client.delete(`/api/dashboard/notifications/${encodeURIComponent(id)}`);
  } catch (error) {
    throw toApiError(error);
  }
}

function asSuggestionList(payload: unknown): SuggestionItem[] {
  if (Array.isArray(payload)) {
    return payload as SuggestionItem[];
  }
  if (typeof payload !== "object" || payload === null) {
    return [];
  }
  const record = payload as Record<string, unknown>;
  const inner = record.data;
  if (Array.isArray(inner)) {
    return inner as SuggestionItem[];
  }
  if (typeof inner === "object" && inner !== null) {
    const items = (inner as Record<string, unknown>).items;
    if (Array.isArray(items)) {
      return items as SuggestionItem[];
    }
  }
  if (Array.isArray(record.items)) {
    return record.items as SuggestionItem[];
  }
  if (Array.isArray(record.suggestions)) {
    return record.suggestions as SuggestionItem[];
  }
  return [];
}

export async function getUltimateMindSuggestions(): Promise<SuggestionItem[]> {
  try {
    const { data } = await client.get<unknown>("/api/ultimate-mind/suggestions");
    return asSuggestionList(data);
  } catch (error) {
    throw toApiError(error);
  }
}
