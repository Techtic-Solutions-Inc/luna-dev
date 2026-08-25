export function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export function asNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim().length > 0 && Number.isFinite(Number(value))) {
    return Number(value);
  }
  return undefined;
}

export function asArray(value: unknown): unknown[] | undefined {
  return Array.isArray(value) ? value : undefined;
}

export function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return undefined;
}

export function displayName(source: Record<string, unknown> | null | undefined): string | undefined {
  if (!source) {
    return undefined;
  }
  return asString(source.full_name) ?? asString(source.name) ?? asString(source.first_name);
}

export function personName(fullName?: string, name?: string, firstName?: string): string | undefined {
  if (fullName && fullName.length > 0) {
    return fullName;
  }
  if (name && name.length > 0) {
    return name;
  }
  if (firstName && firstName.length > 0) {
    return firstName;
  }
  return undefined;
}
