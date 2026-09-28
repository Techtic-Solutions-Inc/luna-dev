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

function isEmailLike(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.includes("@") && !trimmed.includes(" ");
}

function applyMailtoContact(el: Element, nodeId: string, email: string): void {
  const trimmed = email.trim();
  if (el instanceof HTMLAnchorElement) {
    el.href = `mailto:${trimmed}`;
    el.textContent = trimmed;
    return;
  }
  const anchor = document.createElement("a");
  anchor.setAttribute("data-figma-node", nodeId);
  anchor.href = `mailto:${trimmed}`;
  anchor.textContent = trimmed;
  anchor.className = el.className;
  const inlineStyle = el.getAttribute("style");
  if (inlineStyle) {
    anchor.setAttribute("style", inlineStyle);
  }
  el.replaceWith(anchor);
}

export function setFigmaNodeText(nodeId: string, text: string): void {
  const el = document.querySelector(`[data-figma-node="${nodeId}"]`);
  if (!el || text.trim().length === 0) {
    return;
  }
  if (isEmailLike(text)) {
    applyMailtoContact(el, nodeId, text);
    return;
  }
  el.textContent = text;
}
