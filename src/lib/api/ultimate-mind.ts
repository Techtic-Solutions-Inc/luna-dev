import apiClient from './client';
import type { UltimateMindSuggestion } from '@/types/ultimate-mind';

function unwrapSuggestions(payload: unknown): UltimateMindSuggestion[] {
  if (Array.isArray(payload)) {
    return payload.filter(isUltimateMindSuggestion);
  }
  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>;
    for (const key of ['items', 'results', 'data'] as const) {
      const nested = record[key];
      if (Array.isArray(nested)) {
        return nested.filter(isUltimateMindSuggestion);
      }
    }
  }
  return [];
}

function isUltimateMindSuggestion(value: unknown): value is UltimateMindSuggestion {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof (value as UltimateMindSuggestion).id === 'string'
  );
}

export async function getUltimateMindSuggestions(): Promise<UltimateMindSuggestion[]> {
  const response = await apiClient.get<unknown>('/api/ultimate-mind/suggestions');
  return unwrapSuggestions(response.data);
}
