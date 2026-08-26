import client from '@/lib/api/client';

export async function getVisitorHome(): Promise<unknown> {
  const response = await client.get<unknown>('/api/visitor/home');
  return response.data;
}
