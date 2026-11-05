export class ApiRequestError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, message: string, body: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

function apiBase(): string {
  const raw = import.meta.env.VITE_API_BASE_URL;
  if (typeof raw !== "string") {
    return "";
  }
  return raw.replace(/\/+$/, "");
}

/** Join server origin + contract path (paths already include /api/... when required). */
export function apiUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const base = apiBase();
  return base ? `${base}${normalized}` : normalized;
}

export async function apiRequest(
  method: string,
  path: string,
  body?: unknown,
): Promise<unknown> {
  const init: RequestInit = { method: method.toUpperCase() };
  if (body !== undefined) {
    init.headers = { "Content-Type": "application/json" };
    init.body = JSON.stringify(body);
  }
  const token =
    typeof localStorage !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (token) {
    init.headers = {
      ...(init.headers as Record<string, string> | undefined),
      Authorization: `Bearer ${token}`,
    };
  }
  const res = await fetch(apiUrl(path), init);
  const text = await res.text();
  let parsed: unknown = null;
  if (text) {
    try {
      parsed = JSON.parse(text) as unknown;
    } catch {
      parsed = text;
    }
  }
  if (!res.ok) {
    const message =
      typeof parsed === "object" &&
      parsed !== null &&
      "message" in parsed &&
      typeof (parsed as { message: unknown }).message === "string"
        ? (parsed as { message: string }).message
        : `Request failed (${res.status})`;
    throw new ApiRequestError(res.status, message, parsed);
  }
  return parsed;
}
