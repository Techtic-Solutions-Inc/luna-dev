export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function unwrapEnvelopeData<T extends object>(
  payload: unknown,
): T | undefined {
  if (!isPlainObject(payload)) {
    return undefined;
  }
  if (payload.success !== true) {
    return undefined;
  }
  if (!("data" in payload) || !isPlainObject(payload.data)) {
    return undefined;
  }
  return payload.data as T;
}

export function setFigmaNodeText(nodeId: string, text: string): void {
  const el = document.querySelector(`[data-figma-node="${nodeId}"]`);
  if (el && text.trim().length > 0) {
    el.textContent = text;
  }
}
