export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function isStringArrayRecord(value: unknown): value is Record<string, string[]> {
  if (!isRecord(value)) {
    return false;
  }
  return Object.values(value).every(
    (item) => Array.isArray(item) && item.every((entry) => typeof entry === 'string'),
  );
}
