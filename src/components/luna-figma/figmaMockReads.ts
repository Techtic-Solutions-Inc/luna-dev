/** luna-spec-codegen: owned-layout */
// Explicit mock bodies for consumed application-data reads.
// DEVELOPMENT ONLY: production builds drop the fixtures and ignore the flag.
// A consumed read has bound scalar fields that valuesFromResponse copies
// into form controls. Pass `body` through the same unwrap +
// valuesFromResponse path as a real response. Do not render a second UI.
// VITE_MOCK_DATA is not an offline switch: auth, mutations, and GETs
// with no bound fields stay on the real API.

const MOCK_FLAG_ENABLED = new Set(["true", "1", "yes"]);
const MOCK_FLAG_DISABLED = new Set(["false", "0", "no"]);
let mockFlagWarned = false;

let mockBoundReadsCache: Readonly<Record<string, unknown>> | null = null;

async function loadMockBoundReads(): Promise<Readonly<Record<string, unknown>>> {
  if (import.meta.env.PROD) {
    return {};
  }
  if (mockBoundReadsCache) {
    return mockBoundReadsCache;
  }
  const mod = await import("./figmaMockReads.fixtures");
  mockBoundReadsCache = mod.MOCK_BOUND_READS;
  return mockBoundReadsCache;
}

/** Enabled for true/1/yes after trim and lowercase. Unset and empty stay off. */
export function mockBoundReadsEnabled(): boolean {
  if (import.meta.env.PROD) {
    return false;
  }
  const raw = import.meta.env.VITE_MOCK_DATA;
  if (typeof raw !== "string") {
    return false;
  }
  const normalized = raw.trim().toLowerCase();
  if (normalized === "" || MOCK_FLAG_DISABLED.has(normalized)) {
    return false;
  }
  if (MOCK_FLAG_ENABLED.has(normalized)) {
    return true;
  }
  if (!mockFlagWarned) {
    mockFlagWarned = true;
    globalThis.console.warn(
      `[Luna mock-data] Invalid VITE_MOCK_DATA value ${JSON.stringify(raw)}. Expected true/false, 1/0, yes/no.`,
    );
  }
  return false;
}

export type BoundReadResolution =
  | { readonly mode: "network" }
  | { readonly mode: "mock"; readonly body: unknown }
  | { readonly mode: "missing"; readonly diagnostic: string };

/**
 * Source for one contract read.
 *
 * Only a read with bound fields can return "mock" or "missing". Empty-field
 * GETs, writes, login, and logout stay on "network".
 * "missing" means do not fetch and do not invent values.
 */
export async function resolveBoundRead(op: {
  readonly method: string;
  readonly path: string;
  readonly role: string;
  readonly fields: readonly unknown[];
}): Promise<BoundReadResolution> {
  if (op.role !== "read" || op.fields.length === 0 || !mockBoundReadsEnabled()) {
    return { mode: "network" };
  }
  const mocks = await loadMockBoundReads();
  const body = mocks[`${op.method} ${op.path}`];
  if (body !== undefined) {
    return { mode: "mock", body };
  }
  return {
    mode: "missing",
    diagnostic: `No mock application data for ${op.method} ${op.path}. Bound fields stay empty.`,
  };
}
