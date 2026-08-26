import { client } from './client';

export async function getVisitorHome(): Promise<unknown> {
  const response = await client.get<unknown>('/api/visitor/home');
  return response.data;
}

export function unwrapHomePayload(payload: unknown): unknown {
  if (typeof payload !== 'object' || payload === null) {
    return payload;
  }
  const record = payload as Record<string, unknown>;
  if (record.success === true && 'data' in record) {
    return record.data;
  }
  return payload;
}

export function readString(data: unknown, key: string): string | undefined {
  if (typeof data !== 'object' || data === null) {
    return undefined;
  }
  const value = (data as Record<string, unknown>)[key];
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim();
  }
  return undefined;
}

export function hasUsableHomeStrings(data: unknown): boolean {
  const keys = [
    'marketing_message',
    'sub_heading',
    'contact_email',
    'privacy_policy_link',
    'terms_of_service_link',
    'phone',
  ];
  return keys.some((key) => readString(data, key) !== undefined);
}
