import { fetchData } from '@/lib/api/client';
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
  const payload = await fetchData<unknown>(endpoints.currentUser);
  if (typeof payload !== 'object' || payload === null) {
    throw new Error('The current user response did not include an account profile.');
  }
  const record = payload as Record<string, unknown>;
  if (typeof record.email === 'string') {
    return toUser(record);
  }
  if (typeof record.data === 'object' && record.data !== null) {
    return toUser(record.data as Record<string, unknown>);
  }
  throw new Error('The current user response did not include an account profile.');
}
