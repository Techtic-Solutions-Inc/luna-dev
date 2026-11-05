/** luna-spec-codegen: owned-layout */
// Figma display nodes bound to GET response fields (Luna display contract).
// The data hook calls publishReadPayload(method, path, body) after every read;
// bound copy then renders the response value and cards past the response
// array length are hidden. Before a response arrives the Figma copy shows.
// figmaTextContent, figmaItemProps and figmaSelectOptions are plain reads of the
// published payloads, so they are safe in any branch, loop or callback. A component
// that calls them subscribes once with useFigmaPayloadVersion() at the top of its
// body to re-render when a payload is published.
import { useSyncExternalStore } from "react";

export type FigmaDisplayPathPart = string | number;

export interface FigmaDisplayBinding {
  readonly nodeId: string;
  readonly frameId: string;
  readonly operation: string;
  readonly responseUnwrap: string | null;
  readonly path: readonly FigmaDisplayPathPart[];
  readonly kind: "text" | "item";
  readonly valueType: "string" | "number" | "date" | null;
  readonly format: string | null;
  readonly evidence: string;
}

/** data-figma-node → the response field it renders. */
export const FIGMA_DISPLAY_BINDINGS: Readonly<Record<string, FigmaDisplayBinding>> = {
  "2241:1740": {
    nodeId: "2241:1740",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["marketing_message"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home hero marketing_message",
  },
  "2241:1737": {
    nodeId: "2241:1737",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["sub_heading"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home hero sub_heading",
  },
  "I4708:6257;4559:5864": {
    nodeId: "I4708:6257;4559:5864",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["marketing_message"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home marketing_message",
  },
  "I4708:6257;4559:5865": {
    nodeId: "I4708:6257;4559:5865",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["sub_heading"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home sub_heading",
  },
  "3917:8119": {
    nodeId: "3917:8119",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["sub_heading"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home sub_heading dashboard hint",
  },
  "4708:6322": {
    nodeId: "4708:6322",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["sub_heading"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home sub_heading dashboard hint line",
  },
  "4708:6340": {
    nodeId: "4708:6340",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["sub_heading"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home sub_heading ultimate mind card",
  },
  "2554:14118": {
    nodeId: "2554:14118",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["sub_heading"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home sub_heading ultimate mind overlay",
  },
  "2270:16895": {
    nodeId: "2270:16895",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["contact_email"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home contact_email",
  },
  "href:privacy_policy_link": {
    nodeId: "href:privacy_policy_link",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["privacy_policy_link"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home privacy_policy_link href",
  },
  "href:terms_of_service_link": {
    nodeId: "href:terms_of_service_link",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["terms_of_service_link"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home terms_of_service_link href",
  },
  "I4708:6257;4559:5905": {
    nodeId: "I4708:6257;4559:5905",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["marketing_message"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home marketing_message nav",
  },
  "4708:6479": {
    nodeId: "4708:6479",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["marketing_message"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home marketing_message announcements title",
  },
  "I2241:9306;1237:2153": {
    nodeId: "I2241:9306;1237:2153",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["marketing_message"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home marketing_message sidebar",
  },
  "I3917:8120;1237:2153": {
    nodeId: "I3917:8120;1237:2153",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["marketing_message"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home marketing_message step card",
  },
  "I3735:5494;1237:2153": {
    nodeId: "I3735:5494;1237:2153",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["marketing_message"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home marketing_message ultimate mind",
  },
  "3795:11101": {
    nodeId: "3795:11101",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["sub_heading"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home sub_heading reel label",
  },
  "3795:11252": {
    nodeId: "3795:11252",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["sub_heading"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home sub_heading reel label 2",
  },
  "3795:12113": {
    nodeId: "3795:12113",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["sub_heading"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home sub_heading collection reel",
  },
  "I4708:6268;741:2398": {
    nodeId: "I4708:6268;741:2398",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["sub_heading"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home sub_heading shared reel",
  },
  "I4708:6275;741:2398": {
    nodeId: "I4708:6275;741:2398",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["sub_heading"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home sub_heading shared reel",
  },
  "I4708:6282;741:2398": {
    nodeId: "I4708:6282;741:2398",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["sub_heading"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home sub_heading shared reel",
  },
  "I4708:6289;741:2398": {
    nodeId: "I4708:6289;741:2398",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["sub_heading"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home sub_heading shared reel",
  },
  "I4708:6296;741:2398": {
    nodeId: "I4708:6296;741:2398",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["sub_heading"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home sub_heading shared reel",
  },
  "I3795:12072;741:2398": {
    nodeId: "I3795:12072;741:2398",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["sub_heading"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home sub_heading shared reel",
  },
  "I3795:12076;741:2398": {
    nodeId: "I3795:12076;741:2398",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["sub_heading"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home sub_heading shared reel",
  },
  "I3795:12080;741:2398": {
    nodeId: "I3795:12080;741:2398",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["sub_heading"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home sub_heading shared reel",
  },
  "I3795:12084;741:2398": {
    nodeId: "I3795:12084;741:2398",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["sub_heading"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home sub_heading shared reel",
  },
  "I3795:12088;741:2398": {
    nodeId: "I3795:12088;741:2398",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["sub_heading"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home sub_heading shared reel",
  },
  "I3795:12091;741:2398": {
    nodeId: "I3795:12091;741:2398",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["sub_heading"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home sub_heading shared reel",
  },
  "I3795:11283;1237:2153": {
    nodeId: "I3795:11283;1237:2153",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["marketing_message"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home marketing_message stand out",
  },
  "I3795:12211;1237:2153": {
    nodeId: "I3795:12211;1237:2153",
    frameId: "2241:1459",
    operation: "GET /api/visitor/home",
    responseUnwrap: "data",
    path: ["marketing_message"],
    kind: "text",
    valueType: "string",
    format: null,
    evidence: "visitor home marketing_message collection",
  },
};

/** Screen frame id → read operations its display bindings consume. */
export const FIGMA_DISPLAY_OPERATIONS: Readonly<Record<string, readonly string[]>> = {
  "2241:1459": ["GET /api/visitor/home"],
};

const payloads = new Map<string, unknown>();
const listeners = new Set<() => void>();
let version = 0;

/** Store one read response (raw body, envelope included) for the bindings that consume it. */
export function publishReadPayload(method: string, path: string, payload: unknown): void {
  const operation = `${method.toUpperCase()} ${path}`;
  payloads.set(operation, payload);
  trackPagination(operation, payload);
  version += 1;
  listeners.forEach((listener) => listener());
}

/** Forget every stored response (sign-out); bound nodes show their Figma copy again. */
export function clearReadPayloads(): void {
  payloads.clear();
  resetPagination();
  version += 1;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function snapshot(): number {
  return version;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function lookup(binding: FigmaDisplayBinding): { loaded: boolean; value: unknown } {
  if (!payloads.has(binding.operation)) {
    return { loaded: false, value: undefined };
  }
  let current: unknown = payloads.get(binding.operation);
  if (binding.responseUnwrap) {
    current = asRecord(current)?.[binding.responseUnwrap];
  }
  let offsetApplied = false;
  for (const part of binding.path) {
    if (current === undefined || current === null) {
      break;
    }
    // The first array index is the card's row on the current page, so client-side
    // paging shifts it by the list offset (0 for server-paged and unpaged reads).
    const index = typeof part === "number" && !offsetApplied
      ? part + getListOffset(binding.operation)
      : part;
    if (typeof part === "number") {
      offsetApplied = true;
    }
    current = typeof index === "number"
      ? (Array.isArray(current) ? current[index] : undefined)
      : asRecord(current)?.[index];
  }
  return { loaded: true, value: current };
}

const DAY_MS = 24 * 60 * 60 * 1000;

function relativeTime(date: Date): string {
  const seconds = Math.round((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) {
    return "just now";
  }
  if (seconds < 3600) {
    return `${Math.floor(seconds / 60)}m ago`;
  }
  if (seconds < 86400) {
    return `${Math.floor(seconds / 3600)}h ago`;
  }
  const days = Math.floor((Date.now() - date.getTime()) / DAY_MS);
  if (days === 1) {
    return "Yesterday";
  }
  if (days < 7) {
    return `${days}d ago`;
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatDate(value: unknown, format: string | null): string {
  const date = typeof value === "string" || typeof value === "number" ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) {
    return typeof value === "string" ? value : "";
  }
  switch (format) {
    case "weekday_short":
      return date.toLocaleDateString("en-US", { weekday: "short" });
    case "weekday_long":
      return date.toLocaleDateString("en-US", { weekday: "long" });
    case "month_day":
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    case "day_month":
      return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    case "date_numeric":
      return date.toLocaleDateString("en-US");
    case "relative":
      return relativeTime(date);
    default:
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }
}

/** A response value as display copy, in the format the Figma sample copy used. */
export function formatDisplayValue(value: unknown, binding: FigmaDisplayBinding): string {
  if (value === undefined || value === null) {
    return "";
  }
  if (binding.valueType === "date") {
    return formatDate(value, binding.format);
  }
  if (typeof value === "number") {
    return binding.format === "number_grouped" ? value.toLocaleString("en-US") : String(value);
  }
  if (typeof value === "string" || typeof value === "boolean") {
    return String(value);
  }
  return "";
}

/** Bound copy: the response value once its read is published, the Figma copy before. */
export function figmaTextContent(nodeId: string, fallback: string): string {
  const binding = FIGMA_DISPLAY_BINDINGS[nodeId];
  if (!binding || binding.kind !== "text") {
    return fallback;
  }
  const { loaded, value } = lookup(binding);
  return loaded ? formatDisplayValue(value, binding) : fallback;
}

export type FigmaItemBinding = {
  hidden?: boolean;
  "aria-hidden"?: boolean;
  "data-figma-item-missing"?: "true";
};

/** A repeated card hides once its read is published without an item at its index. */
export function figmaItemProps(nodeId: string): FigmaItemBinding {
  const binding = FIGMA_DISPLAY_BINDINGS[nodeId];
  if (!binding || binding.kind !== "item") {
    return {};
  }
  const { loaded, value } = lookup(binding);
  if (!loaded || (value !== undefined && value !== null)) {
    return {};
  }
  return { hidden: true, "aria-hidden": true, "data-figma-item-missing": "true" };
}

/** Read operations ("METHOD /path") whose responses feed this frame's display bindings. */
export function figmaDisplayOperations(frameId: string): readonly string[] {
  return FIGMA_DISPLAY_OPERATIONS[frameId] ?? [];
}

// ── Select options ───────────────────────────────────────────────────────────
export type FigmaSelectOption = { value: string; label: string };

const selectOptions = new Map<string, FigmaSelectOption[]>();

/** Publish the option list for a select Luna matched to a GET list endpoint. */
export function publishSelectOptions(nodeId: string, options: FigmaSelectOption[]): void {
  selectOptions.set(nodeId, options);
  version += 1;
  listeners.forEach((listener) => listener());
}

/** Dynamic <option> list for a select bound to a list endpoint; [] before load / unresolved. */
export function figmaSelectOptions(nodeId: string): FigmaSelectOption[] {
  return selectOptions.get(nodeId) ?? [];
}

/** Subscribe to payload publishes (wired hooks re-render on list/detail updates). */
export function useFigmaPayloadVersion(): number {
  return useSyncExternalStore(subscribe, snapshot, snapshot);
}

const listOffsets = new Map<string, number>();

/** Pagination offset for a list operation key ("METHOD /path"). */
export function setListOffset(operation: string, offset: number): void {
  listOffsets.set(operation, offset);
  version += 1;
  listeners.forEach((listener) => listener());
}

export function getListOffset(operation: string): number {
  return listOffsets.get(operation) ?? 0;
}

// ── Pagination ───────────────────────────────────────────────────────────────
// One store for the screen's paged list. A response with a numeric `total` is
// paged by the API ("server": the data hook re-requests when the page changes,
// reading figmaPageParams()). A plain `items` array is sliced here ("client":
// bound cards re-index through the list offset). Nothing is invented: until a
// list is published `known` stays false and the bar keeps the design's sample,
// inert.
export type FigmaPaginationMode = "server" | "client" | "unknown";

type PaginationState = {
  mode: FigmaPaginationMode;
  operation: string;
  page: number;
  pageSize: number | null;
  total: number | null;
};

let pagination: PaginationState = { mode: "unknown", operation: "", page: 1, pageSize: null, total: null };
let designPageSize: number | null = null;
let requestedPage = 1;

function notify(): void {
  version += 1;
  listeners.forEach((listener) => listener());
}

function numberAt(record: Record<string, unknown> | null, ...keys: string[]): number | null {
  for (const key of keys) {
    const value = record?.[key];
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
  }
  return null;
}

function resetPagination(): void {
  pagination = { mode: "unknown", operation: "", page: 1, pageSize: null, total: null };
  requestedPage = 1;
  listOffsets.clear();
}

function trackPagination(operation: string, payload: unknown): void {
  const body = asRecord(payload);
  const data = asRecord(body?.data) ?? body;
  const items = Array.isArray(data?.items) ? (data?.items as unknown[]) : Array.isArray(body?.data) ? (body?.data as unknown[]) : null;
  if (!items) {
    return;
  }
  const total = numberAt(data, "total", "total_count", "count");
  if (total !== null) {
    const pageSize = numberAt(data, "limit", "page_size", "per_page", "pageSize") ?? items.length;
    pagination = {
      mode: "server",
      operation,
      page: numberAt(data, "page") ?? requestedPage,
      pageSize: pageSize > 0 ? pageSize : designPageSize,
      total,
    };
    listOffsets.delete(operation);
    return;
  }
  const keep = pagination.operation === operation ? pagination.page : 1;
  const pageSize = designPageSize ?? (items.length > 0 ? items.length : null);
  pagination = { mode: "client", operation, page: keep, pageSize, total: items.length };
  listOffsets.set(operation, pageSize ? (keep - 1) * pageSize : 0);
}

/** The design's own rows-per-page, read from its "Showing 1-6 of 34" sample copy. */
export function configureFigmaPagination(config: { pageSize?: number }): void {
  if (config.pageSize && config.pageSize > 0 && config.pageSize !== designPageSize) {
    designPageSize = config.pageSize;
    if (pagination.mode === "client") {
      pagination = { ...pagination, pageSize: designPageSize };
      listOffsets.set(pagination.operation, (pagination.page - 1) * designPageSize);
    }
    notify();
  }
}

/** Go to a page (clamped). Server mode asks the data hook to re-request; client mode re-indexes cards. */
export function setFigmaPage(page: number): void {
  const pages = pagination.total !== null && pagination.pageSize
    ? Math.max(1, Math.ceil(pagination.total / pagination.pageSize))
    : null;
  const next = Math.max(1, pages ? Math.min(page, pages) : page);
  requestedPage = next;
  pagination = { ...pagination, page: next };
  if (pagination.mode === "client" && pagination.pageSize) {
    listOffsets.set(pagination.operation, (next - 1) * pagination.pageSize);
  }
  notify();
}

/** Query params for a paged list read: `page` for the data hook, `limit` once known. */
export function figmaPageParams(): { page: number; limit?: number } {
  const limit = pagination.pageSize ?? designPageSize;
  return limit ? { page: requestedPage, limit } : { page: requestedPage };
}

/** The page the data hook should request; re-renders the hook when it changes. */
export function useFigmaRequestedPage(): number {
  useSyncExternalStore(subscribe, snapshot, snapshot);
  return requestedPage;
}

export type FigmaPagination = {
  known: boolean;
  mode: FigmaPaginationMode;
  page: number;
  pageSize: number | null;
  total: number | null;
  totalPages: number | null;
  /** 1-based row range on this page; 0 when the list is empty. */
  from: number;
  to: number;
  canPrev: boolean;
  canNext: boolean;
};

export function useFigmaPagination(): FigmaPagination {
  useSyncExternalStore(subscribe, snapshot, snapshot);
  const { mode, page, pageSize, total } = pagination;
  const known = mode !== "unknown" && total !== null && !!pageSize;
  const totalPages = known ? Math.max(1, Math.ceil((total as number) / (pageSize as number))) : null;
  const from = known && (total as number) > 0 ? (page - 1) * (pageSize as number) + 1 : 0;
  const to = known ? Math.min(page * (pageSize as number), total as number) : 0;
  return {
    known,
    mode,
    page,
    pageSize,
    total,
    totalPages,
    from,
    to,
    canPrev: known && page > 1,
    canNext: known && totalPages !== null && page < totalPages,
  };
}
