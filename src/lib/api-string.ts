export type HomeApiData = Record<string, unknown>;

export function apiString(
  data: HomeApiData | undefined,
  key: string,
): string | undefined {
  if (!data) {
    return undefined;
  }
  const value = data[key];
  return typeof value === "string" && value.trim().length > 0
    ? value
    : undefined;
}
