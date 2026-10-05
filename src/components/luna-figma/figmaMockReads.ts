/** luna-spec-codegen: owned-layout */
// Explicit mock bodies for consumed application-data reads.
// A consumed read has bound scalar fields that valuesFromResponse copies
// into form controls. Pass `body` through the same unwrap +
// valuesFromResponse path as a real response. Do not render a second UI.
// VITE_MOCK_DATA is not an offline switch: auth, mutations, and GETs
// with no bound fields stay on the real API.

/** METHOD + path → HTTP body (same envelope as the live response). */
export const MOCK_BOUND_READS: Readonly<Record<string, unknown>> = {};

/** True only for the exact string "true". Unset, "", and "false" keep real reads. */
export function mockBoundReadsEnabled(): boolean {
  const raw = import.meta.env.VITE_MOCK_DATA;
  if (raw === "true") {
    return true;
  }
  if (typeof raw === "string" && raw !== "" && raw !== "false") {
    console.warn(
      `VITE_MOCK_DATA must be "true" or "false" (got ${JSON.stringify(raw)}). Consumed reads use the real API.`,
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
export function resolveBoundRead(op: {
  readonly method: string;
  readonly path: string;
  readonly role: string;
  readonly fields: readonly unknown[];
}): BoundReadResolution {
  if (op.role !== "read" || op.fields.length === 0 || !mockBoundReadsEnabled()) {
    return { mode: "network" };
  }
  const body = MOCK_BOUND_READS[`${op.method} ${op.path}`];
  if (body !== undefined) {
    return { mode: "mock", body };
  }
  return {
    mode: "missing",
    diagnostic: `No mock application data for ${op.method} ${op.path}. Bound fields stay empty.`,
  };
}
