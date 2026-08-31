import { fetchData } from '@/lib/api/client';
import { isRecord } from '@/lib/guards';
import { endpoints, type VisitorHomeData, type VisitorHomeItem } from '@/types/api';

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function asNullableString(value: unknown): string | null {
  return typeof value === 'string' ? value : null;
}

function asBoolean(value: unknown): boolean {
  return value === true;
}

function asNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function toItem(record: Record<string, unknown>, index: number): VisitorHomeItem {
  const tags = Array.isArray(record.tags)
    ? record.tags.filter((tag): tag is string => typeof tag === 'string')
    : [];

  return {
    id: asString(record.id) || `visitor-home-${index}`,
    name: asString(record.name),
    title: asString(record.title),
    description: asString(record.description),
    link: asString(record.link),
    image: asString(record.image),
    image_url: asString(record.image_url),
    category: asString(record.category),
    tags,
    full_name: asNullableString(record.full_name),
    first_name: asNullableString(record.first_name),
    last_name: asNullableString(record.last_name),
    email: asNullableString(record.email),
    phone: asNullableString(record.phone),
    phone_number: asNullableString(record.phone_number),
    error: asNullableString(record.error),
    is_active: asBoolean(record.is_active),
    created_at: asString(record.created_at),
    updated_at: asString(record.updated_at),
  };
}

function toItems(value: unknown): VisitorHomeItem[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter(isRecord).map((record, index) => toItem(record, index));
}

function toData(record: Record<string, unknown>): VisitorHomeData {
  const pagination = isRecord(record.pagination) ? record.pagination : {};
  return {
    items: toItems(record.items),
    pagination: {
      page: asNumber(pagination.page, 1),
      limit: asNumber(pagination.limit, record.items ? toItems(record.items).length : 0),
    },
  };
}

export function unwrapVisitorHome(payload: unknown): VisitorHomeData {
  if (!isRecord(payload)) {
    throw new Error('The home response was not a valid object.');
  }
  if (isRecord(payload.data)) {
    return toData(payload.data);
  }
  if (Array.isArray(payload.items) || isRecord(payload.pagination)) {
    return toData(payload);
  }
  if (Array.isArray(payload)) {
    return {
      items: toItems(payload),
      pagination: { page: 1, limit: toItems(payload).length },
    };
  }
  return { items: [], pagination: { page: 1, limit: 0 } };
}

export async function getVisitorHome(): Promise<VisitorHomeData> {
  const payload: unknown = await fetchData<unknown>(endpoints.visitorHome);
  return unwrapVisitorHome(payload);
}
