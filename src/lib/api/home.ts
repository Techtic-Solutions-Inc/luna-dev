import { client, toApiError } from "@/lib/api/client";
import { asRecord } from "@/lib/bind";

export async function getVisitorHome(): Promise<Record<string, unknown>> {
  try {
    const { data } = await client.get<unknown>("/api/visitor/home");
    const record = asRecord(data);
    if (!record) {
      return {};
    }
    return asRecord(record.data) ?? record;
  } catch (error) {
    throw toApiError(error);
  }
}
