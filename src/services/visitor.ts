import { fetchData } from '@/lib/api/client';
import { isRecord } from '@/lib/guards';
import {
  endpoints,
  type VisitorHomeData,
  type VisitorHomeItem,
  type VisitorHomePagination,
} from '@/types/api';

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function asBoolean(value: unknown, fallback = false): boolean {
  return typeof value === 'boolean' ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((entry): entry is string => typeof entry === 'string');
}

function asNullableString(value: unknown): string | null {
  if (value === null) {
    return null;
  }
  return typeof value === 'string' ? value : null;
}

function toItem(record: Record<string, unknown>, index: number): VisitorHomeItem {
  return {
    id: asString(record.id, `visitor-home-${index}`),
    name: asString(record.name),
    title: asString(record.title, asString(record.name)),
    description: asString(record.description),
    link: asString(record.link),
    image: asString(record.image, asString(record.image_url)),
    image_url: asString(record.image_url, asString(record.image)),
    category: asString(record.category),
    tags: asStringArray(record.tags),
    full_name: asNullableString(record.full_name),
    first_name: asNullableString(record.first_name),
    last_name: asNullableString(record.last_name),
    email: asNullableString(record.email),
    phone: asNullableString(record.phone),
    phone_number: asNullableString(record.phone_number),
    error: null,
    is_active: asBoolean(record.is_active, true),
    created_at: asString(record.created_at),
    updated_at: asString(record.updated_at),
  };
}

function toPagination(value: unknown): VisitorHomePagination {
  if (!isRecord(value)) {
    return { page: 1, limit: 0 };
  }
  return {
    page: typeof value.page === 'number' ? value.page : 1,
    limit: typeof value.limit === 'number' ? value.limit : 0,
  };
}

function toItems(value: unknown): VisitorHomeItem[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter(isRecord).map((record, index) => toItem(record, index));
}

export function parseVisitorHome(payload: unknown): VisitorHomeData {
  if (Array.isArray(payload)) {
    const items = toItems(payload);
    return { items, pagination: { page: 1, limit: items.length } };
  }
  if (!isRecord(payload)) {
    return { items: [], pagination: { page: 1, limit: 0 } };
  }
  if (Array.isArray(payload.items)) {
    const items = toItems(payload.items);
    return { items, pagination: toPagination(payload.pagination) };
  }
  if (isRecord(payload.data)) {
    const nested = payload.data;
    if (Array.isArray(nested.items)) {
      const items = toItems(nested.items);
      return { items, pagination: toPagination(nested.pagination) };
    }
    if (Array.isArray(nested)) {
      const items = toItems(nested);
      return { items, pagination: { page: 1, limit: items.length } };
    }
  }
  if (typeof payload.title === 'string' || typeof payload.id === 'string') {
    return {
      items: [toItem(payload, 0)],
      pagination: { page: 1, limit: 1 },
    };
  }
  return { items: [], pagination: { page: 1, limit: 0 } };
}

export async function getVisitorHome(): Promise<VisitorHomeData> {
  const payload: unknown = await fetchData<unknown>(endpoints.visitorHome);
  return parseVisitorHome(payload);
}
