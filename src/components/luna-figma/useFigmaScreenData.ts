/** luna-spec-codegen: data-hook — wire API data here; do not restyle. */
"use client";

import {
  createContext,
  createElement,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { getApiErrorMessageFromResponse } from "../../lib/api/errors";
import { notifyError, notifySuccess } from "../../lib/notify";
import { apiRequest, clearAuthToken, getAuthToken, setAuthToken } from "../../lib/apiRequest";
import { clearSessionRejected, isSessionRejected } from "../../lib/session";
import { clearReadPayloads, publishReadPayload } from "./figmaDisplay";
import {
  fieldErrorsFromResponse,
  figmaReadOperations,
  figmaWriteOperation,
  type FigmaFieldValues,
  type FigmaOperation,
  requestBodyFor,
  UNRESOLVED_FIGMA_FIELDS,
  validateValues,
  valuesFromResponse,
} from "./figmaFieldContract";
import { setFigmaFieldErrors } from "./figmaFieldErrors";
import { resolveBoundRead } from "./figmaMockReads";

export type FigmaFieldBinding = {
  value?: string;
  checked?: boolean;
  onChange?: (event: { target: { value: string; checked?: boolean } }) => void;
  disabled?: boolean;
};

export type FigmaActionBinding = {
  onClick?: (event: { preventDefault: () => void }) => void;
  disabled?: boolean;
};

const REMEMBER_EMAIL_KEY = "luna_remember_email";
const REMEMBER_CHECKBOX_KEY = "luna_remember_me";

const ROUTE_TO_FRAME: Readonly<Record<string, string>> = {
  "": "2241:1459",
  home: "2241:1459",
  login: "998:1024",
  "sign-in": "998:1024",
  profile: "3158:22053",
  "user-profile": "3158:22053",
};

const LOGIN_FRAME_ID = "998:1024";

const SUBMIT_ACTIONS = new Set(["act_90fcde8a6c8d", "act_e036a19a67f8"]);
const PROFILE_FRAME_ID = "3158:22053";

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function normalizedPath(): string {
  return window.location.pathname.replace(/^\/+|\/+$/g, "");
}

function redirectToLogin(): void {
  const path = normalizedPath();
  if (path === "login" || path === "sign-in") {
    return;
  }
  window.history.pushState(null, "", "/login");
  window.dispatchEvent(new PopStateEvent("popstate"));
}

/** Flatten profile GET/PUT envelopes for form fields (address_details, phone). */
function normalizeProfilePayload(payload: unknown): unknown {
  const outer = asRecord(payload);
  if (!outer) {
    return payload;
  }
  const data = asRecord(outer.data) ?? (outer.first_name !== undefined ? outer : null);
  if (!data) {
    return payload;
  }
  const next: Record<string, unknown> = { ...data };
  const addr = asRecord(data.address_details);
  if (addr) {
    for (const key of ["street", "city", "state", "zip", "country"] as const) {
      if ((next[key] === undefined || next[key] === null) && addr[key] != null) {
        next[key] = addr[key];
      }
    }
  }
  if ((next.mobile_number === undefined || next.mobile_number === null) && typeof data.phone === "string") {
    next.mobile_number = data.phone;
  }
  for (const [key, value] of Object.entries(next)) {
    if (value !== null && typeof value === "object" && !Array.isArray(value) && key !== "profile" && key !== "address_details") {
      const inner = asRecord(value);
      if (inner && typeof inner.value === "string") {
        next[key] = inner.value;
      }
    }
  }
  return outer.data !== undefined ? { ...outer, data: next } : next;
}

function profileFormValues(op: FigmaOperation, payload: unknown): FigmaFieldValues {
  return valuesFromResponse(op, normalizeProfilePayload(payload));
}

const RATING_CARD_IDS = [
  "2270:16933",
  "2270:16942",
  "2270:16951",
  "2270:16960",
  "2270:16969",
  "2270:16978",
  "2270:16989",
  "2270:16998",
  "2270:17007",
  "2270:17016",
  "2270:17025",
  "2270:17034",
] as const;

const RATING_STAR_SUFFIXES = [
  "2615:382325",
  "2615:382326",
  "2615:382327",
  "2615:382328",
  "2615:382329",
] as const;

const RATING_ACTION_IDS = [
  "act_3401d440f163",
  "act_b6435ad58686",
  "act_3e6f2411448f",
  "act_7e1c7d19d435",
  "act_2bca08b847dc",
  "act_f46f95d434d3",
  "act_3edef6072eb1",
  "act_a66ab4cc842c",
  "act_b21958011ca8",
  "act_ba74f99e92a7",
  "act_690612315935",
  "act_607165b49f67",
  "act_f8b812aa87d2",
  "act_fc341062da9a",
  "act_d7506dee8c9a",
  "act_0a506036aef3",
  "act_8ebc30084de3",
  "act_e85c8fa589f2",
  "act_cb9a2f586c73",
  "act_8ced21e64874",
  "act_13e5a7ab4b49",
  "act_390d4fd51c3b",
  "act_cd07562d5438",
  "act_50021c824a5c",
  "act_aa8e26210b7d",
  "act_804ff299b133",
  "act_b936136b2525",
  "act_4b407cddb65a",
  "act_50906515a04a",
  "act_1339e7a3b17e",
  "act_6af822cb4cd4",
  "act_3e8a50af54da",
  "act_bf9fda5ae798",
  "act_a63b45d3cc72",
  "act_f0a0c1a71121",
  "act_b25e0eb4a2f2",
  "act_c89ac0c9d1f7",
  "act_6e34ae1b34e6",
  "act_b4a21a231ccb",
  "act_106feb38d8f1",
  "act_f85c9e2a2ad5",
  "act_84a6d241930f",
  "act_50a15cf09965",
  "act_39011caff3da",
  "act_07b2efefa87d",
  "act_5d6957df9646",
  "act_c51a4c277bc4",
  "act_70f097ff3db6",
  "act_2eee961afdb1",
  "act_f512a1cef824",
  "act_a89557f449ad",
  "act_775272588f90",
  "act_b7391ea7ca95",
  "act_891821294293",
  "act_8fc565be798d",
  "act_b9fea8568b2d",
  "act_0a52bd6d9df2",
  "act_5d55fce7d5cb",
  "act_005a6d876a55",
  "act_966158645b94",
] as const;

const RATING_NODE_TO_ACTION: Readonly<Record<string, string>> = (() => {
  const map: Record<string, string> = {};
  let index = 0;
  for (const card of RATING_CARD_IDS) {
    for (const suffix of RATING_STAR_SUFFIXES) {
      const nodeId = `I${card};${suffix}`;
      const actionId = RATING_ACTION_IDS[index];
      if (actionId) {
        map[nodeId] = actionId;
        map[`${card};${suffix}`] = actionId;
      }
      index += 1;
    }
  }
  return map;
})();

const RATING_ACTION_TO_CARD: Readonly<Record<string, string>> = (() => {
  const map: Record<string, string> = {};
  let index = 0;
  for (const card of RATING_CARD_IDS) {
    for (let star = 0; star < RATING_STAR_SUFFIXES.length; star += 1) {
      const actionId = RATING_ACTION_IDS[index];
      if (actionId) {
        map[actionId] = card;
      }
      index += 1;
    }
  }
  return map;
})();

export function ratingActionForNode(nodeId: string | undefined): string | undefined {
  if (!nodeId) {
    return undefined;
  }
  return RATING_NODE_TO_ACTION[nodeId];
}

type ScreenContextValue = {
  frameId: string;
  bound: string;
  values: FigmaFieldValues;
  setValues: Dispatch<SetStateAction<FigmaFieldValues>>;
  readLoading: boolean;
  submitting: boolean;
  statusMessage: string;
  submit: () => Promise<void>;
  ratingByCard: Readonly<Record<string, number>>;
  setRatingForAction: (actionId: string) => void;
};

const ScreenContext = createContext<ScreenContextValue | null>(null);

function frameIdForRoute(routePath: string | undefined): string {
  const key = routePath ?? "";
  return ROUTE_TO_FRAME[key] ?? "";
}

function readRememberedValues(frameId: string): FigmaFieldValues {
  if (frameId !== "998:1024") {
    return {};
  }
  try {
    const email = localStorage.getItem(REMEMBER_EMAIL_KEY) ?? "";
    const remember = localStorage.getItem(REMEMBER_CHECKBOX_KEY) === "1";
    return {
      email: remember ? email : "",
      checkbox: remember,
    };
  } catch {
    return {};
  }
}

function persistRememberMe(values: FigmaFieldValues): void {
  try {
    const remember = values.checkbox === true;
    if (remember) {
      localStorage.setItem(REMEMBER_CHECKBOX_KEY, "1");
      localStorage.setItem(REMEMBER_EMAIL_KEY, String(values.email ?? ""));
    } else {
      localStorage.removeItem(REMEMBER_CHECKBOX_KEY);
      localStorage.removeItem(REMEMBER_EMAIL_KEY);
    }
  } catch {
    /* ignore */
  }
}

function tokenFromBody(body: unknown): string | null {
  const record = body !== null && typeof body === "object" ? (body as Record<string, unknown>) : null;
  if (!record) {
    return null;
  }
  const data =
    record.data !== null && typeof record.data === "object"
      ? (record.data as Record<string, unknown>)
      : record;
  if (typeof data.accessToken === "string" && data.accessToken.length > 0) {
    return data.accessToken;
  }
  if (typeof data.token === "string" && data.token.length > 0) {
    return data.token;
  }
  return null;
}

function formLevelError(body: unknown, status: number, context: "login" | "profile" = "login"): string | null {
  if (status === 409) {
    const record = asRecord(body);
    return typeof record?.message === "string" ? record.message : "This email is already in use.";
  }
  return getApiErrorMessageFromResponse(status, body, context);
}

async function fetchProfileRead(
  setValues: Dispatch<SetStateAction<FigmaFieldValues>>,
  setStatusMessage: (message: string) => void,
): Promise<boolean> {
  const readOp = figmaReadOperations(PROFILE_FRAME_ID).find((op) => op.path === "/api/profile");
  if (!readOp) {
    return false;
  }
  const response = await apiRequest({ method: "GET", path: "/api/profile" });
  const body = await response.json().catch(() => ({}));
  publishReadPayload("GET", "/api/profile", body);
  if (response.status === 401) {
    redirectToLogin();
    const msg = "Your session may have expired. Please sign in again.";
    setStatusMessage(msg);
    notifyError(msg);
    return false;
  }
  if (!response.ok) {
    const msg = formLevelError(body, response.status, "profile") ?? "Could not load profile.";
    setStatusMessage(msg);
    notifyError(msg);
    return false;
  }
  setValues((prev) => ({ ...prev, ...profileFormValues(readOp, body) }));
  return true;
}

async function loadReads(
  frameId: string,
  setValues: Dispatch<SetStateAction<FigmaFieldValues>>,
  setReadLoading: (loading: boolean) => void,
  setStatusMessage: (message: string) => void,
): Promise<void> {
  const reads = figmaReadOperations(frameId);
  if (reads.length === 0) {
    setReadLoading(false);
    return;
  }
  setReadLoading(true);
  setStatusMessage("");
  let loadedAny = false;
  for (const op of reads) {
    const resolution = resolveBoundRead(op);
    if (resolution.mode === "missing") {
      setStatusMessage(resolution.diagnostic);
      continue;
    }
    try {
      let body: unknown;
      if (resolution.mode === "mock") {
        body = resolution.body;
      } else {
        const response = await apiRequest({ method: op.method, path: op.path });
        body = await response.json().catch(() => ({}));
        if (!response.ok) {
          if (response.status === 401 && frameId === PROFILE_FRAME_ID) {
            redirectToLogin();
          }
          const msg =
            formLevelError(body, response.status, frameId === PROFILE_FRAME_ID ? "profile" : "login") ??
            `Could not load profile (${response.status}).`;
          setStatusMessage(msg);
          notifyError(msg);
          publishReadPayload(op.method, op.path, body);
          continue;
        }
      }
      publishReadPayload(op.method, op.path, body);
      const formValues =
        frameId === PROFILE_FRAME_ID ? profileFormValues(op, body) : valuesFromResponse(op, body);
      setValues((prev) => ({ ...prev, ...formValues }));
      loadedAny = true;
    } catch {
      const msg = "Unable to connect. Please check your connection.";
      setStatusMessage(msg);
      notifyError(msg);
    }
  }
  if (!loadedAny && reads.some((op) => resolveBoundRead(op).mode !== "missing")) {
    /* empty profile is valid */
  }
  setReadLoading(false);
}

async function runSubmit(
  frameId: string,
  values: FigmaFieldValues,
  setSubmitting: (v: boolean) => void,
  setStatusMessage: (v: string) => void,
  setValues: Dispatch<SetStateAction<FigmaFieldValues>>,
): Promise<void> {
  const op = figmaWriteOperation(frameId);
  if (!op) {
    return;
  }
  const clientErrors = validateValues(op, values);
  if (Object.keys(clientErrors).length > 0) {
    setFigmaFieldErrors(clientErrors);
    setStatusMessage("Fix the highlighted fields and try again.");
    return;
  }
  setFigmaFieldErrors({});
  setSubmitting(true);
  setStatusMessage(op.path === "/api/auth/login" ? "Signing in…" : "Saving…");
  try {
    const body = requestBodyFor(op, values);
    const response = await apiRequest({
      method: op.method,
      path: op.path,
      body,
    });
    const responseBody = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (response.status === 401 && frameId === PROFILE_FRAME_ID) {
        redirectToLogin();
      }
      const fieldErrors = fieldErrorsFromResponse(op, responseBody);
      if (Object.keys(fieldErrors).length > 0) {
        setFigmaFieldErrors(fieldErrors);
      }
      if (response.status === 409 && !fieldErrors.email && frameId === PROFILE_FRAME_ID) {
        setFigmaFieldErrors({ ...fieldErrors, email: formLevelError(responseBody, 409, "profile") ?? "This email is already in use." });
      }
      const formError =
        formLevelError(responseBody, response.status, frameId === PROFILE_FRAME_ID ? "profile" : "login") ??
        (Object.keys(fieldErrors).length === 0 ? "Request failed. Check your input and try again." : "");
      if (formError) {
        setStatusMessage(formError);
        notifyError(formError);
      } else if (Object.keys(fieldErrors).length > 0) {
        const msg = "Fix the highlighted fields and try again.";
        setStatusMessage(msg);
        notifyError(msg);
      }
      return;
    }
    if (op.path === "/api/auth/login") {
      const token = tokenFromBody(responseBody);
      if (token) {
        setAuthToken(token);
      }
      persistRememberMe(values);
      const msg = "Signed in successfully.";
      setStatusMessage(msg);
      notifySuccess(msg);
      window.history.pushState(null, "", "/profile");
      window.dispatchEvent(new PopStateEvent("popstate"));
      return;
    }
    if (op.path === "/api/profile") {
      const savedMessage = asRecord(responseBody)?.message;
      await fetchProfileRead(setValues, setStatusMessage);
      const msg =
        typeof savedMessage === "string" && savedMessage.trim() !== ""
          ? savedMessage
          : "Profile updated successfully.";
      setStatusMessage(msg);
      notifySuccess(msg);
      return;
    }
    const saved = "Saved successfully.";
    setStatusMessage(saved);
    notifySuccess(saved);
  } catch {
    const msg = "Unable to connect. Please check your connection.";
    setStatusMessage(msg);
    notifyError(msg);
  } finally {
    setSubmitting(false);
  }
}

// ── Dialog state ────────────────────────────────────────────────────────────
const _dialogListeners = new Set<(actionId: string | null) => void>();
const _dialogHosts = new Map<string, number>();

export function openFigmaDialog(actionId: string): void {
  _dialogListeners.forEach((fn) => fn(actionId));
}

export function hasFigmaDialog(actionId: string): boolean {
  return (_dialogHosts.get(actionId) ?? 0) > 0;
}

export function closeFigmaDialog(): void {
  _dialogListeners.forEach((fn) => fn(null));
}

export function useDialogState(actionId: string): { isOpen: boolean; close: () => void } {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const listener = (id: string | null) => setIsOpen(id === actionId);
    _dialogListeners.add(listener);
    _dialogHosts.set(actionId, (_dialogHosts.get(actionId) ?? 0) + 1);
    return () => {
      _dialogListeners.delete(listener);
      _dialogHosts.set(actionId, (_dialogHosts.get(actionId) ?? 1) - 1);
    };
  }, [actionId]);
  return { isOpen, close: closeFigmaDialog };
}

export function useCurrentUser(): { name: string; avatarUrl: string } {
  return { name: "", avatarUrl: "" };
}

export function FigmaScreenDataProvider({
  routePath,
  children,
}: {
  routePath?: string;
  children?: ReactNode;
}) {
  const frameId = frameIdForRoute(routePath);
  const [values, setValues] = useState<FigmaFieldValues>(() => ({
    ...readRememberedValues(frameId),
  }));
  const [readLoading, setReadLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [ratingByCard, setRatingByCard] = useState<Record<string, number>>({});

  useEffect(() => {
    clearReadPayloads();
    setFigmaFieldErrors({});
    setValues({ ...readRememberedValues(frameId) });
    setStatusMessage("");
    if (!frameId) {
      return;
    }
    if (frameId === LOGIN_FRAME_ID && isSessionRejected()) {
      clearAuthToken();
      clearSessionRejected();
    }
    if (frameId === PROFILE_FRAME_ID && !getAuthToken()) {
      redirectToLogin();
      const msg = isSessionRejected()
        ? "Your session may have expired. Please sign in again."
        : "Sign in to view your profile.";
      setStatusMessage(msg);
      return;
    }
    void loadReads(frameId, setValues, setReadLoading, setStatusMessage);
    return () => {
      clearReadPayloads();
    };
  }, [frameId, routePath]);

  const submit = useCallback(async () => {
    await runSubmit(frameId, values, setSubmitting, setStatusMessage, setValues);
  }, [frameId, values]);

  const setRatingForAction = useCallback((actionId: string) => {
    const card = RATING_ACTION_TO_CARD[actionId];
    if (!card) {
      return;
    }
    const index = RATING_ACTION_IDS.indexOf(actionId as (typeof RATING_ACTION_IDS)[number]);
    if (index < 0) {
      return;
    }
    const star = (index % RATING_STAR_SUFFIXES.length) + 1;
    setRatingByCard((prev) => ({ ...prev, [card]: star }));
  }, []);

  const bound = useMemo(() => {
    const writes = figmaWriteOperation(frameId);
    return writes ? `${writes.method} ${writes.path}` : "";
  }, [frameId]);

  const ctx: ScreenContextValue = {
    frameId,
    bound,
    values,
    setValues,
    readLoading,
    submitting,
    statusMessage,
    submit,
    ratingByCard,
    setRatingForAction,
  };

  return createElement(
    ScreenContext.Provider,
    { value: ctx },
    createElement(
      Fragment,
      null,
      statusMessage
        ? createElement("p", {
            className: "sr-only",
            role: "status",
            "aria-live": "polite",
          }, statusMessage)
        : null,
      readLoading
        ? createElement("p", { className: "sr-only", role: "status", "aria-live": "polite" }, "Loading…")
        : null,
      children,
    ),
  );
}

function useScreenContext(): ScreenContextValue {
  const ctx = useContext(ScreenContext);
  if (!ctx) {
    return {
      frameId: "",
      bound: "",
      values: {},
      setValues: () => {},
      readLoading: false,
      submitting: false,
      statusMessage: "",
      submit: async () => {},
      ratingByCard: {},
      setRatingForAction: () => {},
    };
  }
  return ctx;
}

export function figmaFieldProps(field: string): FigmaFieldBinding {
  const { values, setValues, readLoading, submitting, frameId } = useScreenContext();
  const unresolved = UNRESOLVED_FIGMA_FIELDS[frameId]?.includes(field);
  const value = values[field];
  const disabled = readLoading || submitting;

  if (field === "checkbox") {
    return {
      checked: value === true,
      disabled,
      onChange: (event) => {
        setValues((prev) => ({ ...prev, checkbox: event.target.checked }));
      },
    };
  }

  return {
    value: typeof value === "string" ? value : value === undefined ? "" : String(value),
    disabled: disabled && !unresolved,
    onChange: (event) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    },
  };
}

export function figmaActionProps(action: string): FigmaActionBinding {
  const { submit, submitting, setRatingForAction } = useScreenContext();

  if (SUBMIT_ACTIONS.has(action)) {
    return {
      disabled: submitting,
      onClick: (event) => {
        event.preventDefault();
        void submit();
      },
    };
  }

  if (RATING_ACTION_TO_CARD[action]) {
    return {
      onClick: (event) => {
        event.preventDefault();
        setRatingForAction(action);
      },
    };
  }

  return {
    onClick: (event) => {
      event.preventDefault();
      if (hasFigmaDialog(action)) {
        openFigmaDialog(action);
        return;
      }
      if (process.env.NODE_ENV !== "production") {
        globalThis.console.warn("[luna] action has no behavior yet:", action);
      }
    },
  };
}

export function figmaUnresolvedActionProps(actionId: string): FigmaActionBinding {
  return {
    onClick: () => {
      if (process.env.NODE_ENV !== "production") {
        globalThis.console.warn(
          "[luna] unresolved action clicked:",
          actionId,
          "— no prototype reaction or submit binding found; wire manually.",
        );
      }
    },
  };
}

export function useFigmaScreenData() {
  const { bound, values, submit, readLoading, submitting, statusMessage } = useScreenContext();
  return {
    bound,
    values,
    submit,
    readLoading,
    submitting,
    statusMessage,
  };
}

/** Form onSubmit: client validation + contract submit (values from screen state). */
export function useFigmaFormSubmit(): (event: { preventDefault: () => void }) => void {
  const { submit } = useScreenContext();
  return (event) => {
    event.preventDefault();
    void submit();
  };
}
