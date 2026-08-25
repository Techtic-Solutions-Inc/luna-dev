import { client, toApiError } from "@/lib/api/client";
import { asRecord } from "@/lib/bind";
import type { DashboardOverviewData, DashboardOverviewResponse } from "@/lib/api/types";

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
