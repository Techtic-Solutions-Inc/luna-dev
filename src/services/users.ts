import { fetchData } from '@/lib/api/client';
import { isRecord } from '@/lib/guards';
import { endpoints, type AuthUser } from '@/types/api';

function toUser(record: Record<string, unknown>): AuthUser {
  const email = record.email;
  if (typeof email !== 'string') {
    throw new Error('The current user response did not include an email.');
  }
  return {
    id: typeof record.id === 'string' ? record.id : '',
    name: typeof record.name === 'string' ? record.name : '',
    first_name: typeof record.first_name === 'string' ? record.first_name : '',
    last_name: typeof record.last_name === 'string' ? record.last_name : '',
    email,
  };
}

export async function getCurrentUser(): Promise<AuthUser> {
  const payload: unknown = await fetchData<unknown>(endpoints.currentUser);
  if (!isRecord(payload)) {
    throw new Error('The current user response did not include an account profile.');
  }
  if (typeof payload.email === 'string') {
    return toUser(payload);
  }
  if (isRecord(payload.data)) {
    return toUser(payload.data);
  }
  throw new Error('The current user response did not include an account profile.');
}
