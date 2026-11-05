/** luna-spec-codegen: data-hook — wire API data here; do not restyle.
 * Consumed reads (role read, non-empty fields) use resolveBoundRead from
 * figmaMockReads.ts inside loadReads.
 */
"use client";

import {
  createContext,
  createElement,
  Fragment,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { ApiRequestError, apiRequest } from "../../lib/apiRequest";
import { clearReadPayloads, publishReadPayload } from "./figmaDisplay";
import { postLogin } from "../../lib/auth.service";
import { setSession } from "../../hooks/useAuth";
import { postSignup } from "../../lib/signup.service";
import type { LoginRequestBody, SignupRequestBody } from "../../types/api";
import {
  type FigmaFieldValue,
  type FigmaFieldValues,
  fieldErrorsFromResponse,
  figmaReadOperations,
  figmaWriteOperation,
  requestBodyFor,
  validateValues,
  valuesFromResponse,
} from "./figmaFieldContract";
import {
  figmaFieldA11y,
  getFigmaFieldErrors,
  setFigmaFieldErrors,
  useFigmaFieldErrors,
} from "./figmaFieldErrors";
import { resolveBoundRead } from "./figmaMockReads";

export type FigmaFieldBinding = {
  value?: string;
  checked?: boolean;
  onChange?: (event: { target: { value: string; checked?: boolean } }) => void;
  disabled?: boolean;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
  "aria-busy"?: boolean;
};

export type FigmaActionBinding = {
  onClick?: (event: { preventDefault: () => void }) => void;
  disabled?: boolean;
  "aria-busy"?: boolean;
};

const REMEMBER_EMAIL_KEY = "agentwise_remember_email";

const ROUTE_TO_FRAME: Readonly<Record<string, string>> = {
  "": "2241:1459",
  home: "2241:1459",
  "sign-up": "1006:1333",
  "sign-in": "998:1024",
  login: "998:1024",
};

const SIGNUP_FRAME = "1006:1333";
const SIGNUP_SUBMIT_NODE = "1007:1923";
let activeRoutePath = "";

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

// ── Form + screen store (plain functions for figmaFieldProps) ───────────────
let formValues: FigmaFieldValues = {};
let formVersion = 0;
const formListeners = new Set<() => void>();

function notifyForm(): void {
  formVersion += 1;
  formListeners.forEach((l) => l());
}

function setFieldValue(field: string, value: FigmaFieldValue): void {
  formValues = { ...formValues, [field]: value };
  notifyForm();
}

function resetFormValues(initial?: FigmaFieldValues): void {
  formValues = initial ? { ...initial } : {};
  notifyForm();
}

function subscribeForm(listener: () => void): () => void {
  formListeners.add(listener);
  return () => formListeners.delete(listener);
}

function formSnapshot(): number {
  return formVersion;
}

type ScreenStore = {
  bound: string;
  loaded: boolean;
  submitting: boolean;
  statusMessage: string;
};

let screenStore: ScreenStore = {
  bound: "",
  loaded: false,
  submitting: false,
  statusMessage: "",
};
let screenVersion = 0;
const screenListeners = new Set<() => void>();

function patchScreen(patch: Partial<ScreenStore>): void {
  screenStore = { ...screenStore, ...patch };
  screenVersion += 1;
  screenListeners.forEach((l) => l());
}

function subscribeScreen(listener: () => void): () => void {
  screenListeners.add(listener);
  return () => screenListeners.delete(listener);
}

function screenSnapshot(): number {
  return screenVersion;
}

function frameIdFromRoute(routePath?: string): string | null {
  if (routePath === undefined) {
    return null;
  }
  return ROUTE_TO_FRAME[routePath] ?? null;
}

function navigateClient(path: string): void {
  const normalized = path.replace(/^\/+|\/+$/g, "");
  window.history.pushState({}, "", normalized ? `/${normalized}` : "/");
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function unwrapEnvelope(body: unknown): unknown {
  if (body && typeof body === "object" && "data" in body) {
    return (body as { data: unknown }).data;
  }
  return body;
}

async function loadReads(frameId: string): Promise<void> {
  const ops = figmaReadOperations(frameId);
  if (ops.length === 0) {
    patchScreen({ loaded: true, bound: "" });
    return;
  }
  patchScreen({ loaded: false, bound: ops.map((o) => `${o.method} ${o.path}`).join(", ") });
  const tasks = ops.map(async (op) => {
    const resolved = resolveBoundRead(op);
    if (resolved.mode === "missing") {
      patchScreen({ statusMessage: resolved.diagnostic });
      return;
    }
    if (resolved.mode === "mock") {
      publishReadPayload(op.method, op.path, resolved.body);
      if (op.fields.length > 0) {
        const initial = valuesFromResponse(op, resolved.body);
        resetFormValues({ ...formValues, ...initial });
      }
      return;
    }
    try {
      const body = await apiRequest(op.method, op.path);
      publishReadPayload(op.method, op.path, body);
      if (op.fields.length > 0) {
        const initial = valuesFromResponse(op, body);
        resetFormValues({ ...formValues, ...initial });
      }
    } catch (err: unknown) {
      if (
        op.path === "/api/auth/logout" &&
        err instanceof ApiRequestError &&
        err.status === 401
      ) {
        return;
      }
      const message = err instanceof Error ? err.message : String(err);
      patchScreen({ statusMessage: message });
      globalThis.console.error(`[Luna] ${op.method} ${op.path} failed:`, err);
    }
  });
  await Promise.all(tasks);
  patchScreen({ loaded: true });
}

function readFormValuesFromDom(frameId: string): FigmaFieldValues {
  const root = document.querySelector(`[data-figma-frame="${frameId}"]`);
  if (!root) {
    return { ...formValues };
  }
  const values: FigmaFieldValues = { ...formValues };
  root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
    "[data-figma-field]",
  ).forEach((el) => {
    const key = el.getAttribute("data-figma-field");
    if (!key) {
      return;
    }
    if (el instanceof HTMLInputElement && el.type === "checkbox") {
      values[key] = el.checked;
    } else {
      values[key] = el.value;
    }
  });
  return values;
}

async function submit(): Promise<void> {
  const frameId = frameIdFromRoute(activeRoutePath);
  if (!frameId) {
    return;
  }
  const op = figmaWriteOperation(frameId);
  if (!op) {
    return;
  }
  const values = readFormValuesFromDom(frameId);
  resetFormValues(values);
  const errors = validateValues(op, values);
  setFigmaFieldErrors(errors);
  if (Object.keys(errors).length > 0) {
    patchScreen({ statusMessage: "Please fix the highlighted fields." });
    return;
  }
  const signingIn = op.path === "/auth/login";
  patchScreen({
    submitting: true,
    statusMessage: signingIn ? "Signing in…" : "Creating your account…",
  });
  try {
    const payload = requestBodyFor(op, values);
    if (op.path === "/api/signup" && op.method === "POST") {
      await postSignup(payload as unknown as SignupRequestBody);
      patchScreen({ statusMessage: "Account created. Redirecting to sign in…" });
      navigateClient("login?signupSuccess=1");
      return;
    }
    if (op.path === "/auth/login" && op.method === "POST") {
      const body = await postLogin(payload as unknown as LoginRequestBody);
      const data = unwrapEnvelope(body) as Record<string, unknown> | null;
      const token =
        (typeof data?.accessToken === "string" && data.accessToken) ||
        (typeof data?.token === "string" && data.token) ||
        "";
      if (token) {
        setSession(token);
      }
      if (values["remember-me"] === true) {
        localStorage.setItem(REMEMBER_EMAIL_KEY, String(values.email ?? "").trim());
      } else {
        localStorage.removeItem(REMEMBER_EMAIL_KEY);
      }
      patchScreen({ statusMessage: "Signed in successfully." });
      navigateClient("home");
    }
  } catch (err: unknown) {
    if (err instanceof ApiRequestError) {
      if (err.status === 401) {
        localStorage.removeItem("accessToken");
        clearReadPayloads();
      }
      let serverErrors = fieldErrorsFromResponse(op, err.body);
      if (
        op.path === "/auth/login" &&
        err.status === 401 &&
        Object.keys(serverErrors).length === 0
      ) {
        serverErrors = {
          email: "Invalid email or password.",
          password: "Invalid email or password.",
        };
      }
      setFigmaFieldErrors(serverErrors);
      patchScreen({ statusMessage: err.message });
    } else {
      patchScreen({ statusMessage: String(err) });
    }
  } finally {
    patchScreen({ submitting: false });
  }
}

function signupSubmitDisabled(): boolean {
  const op = figmaWriteOperation(SIGNUP_FRAME);
  if (!op) {
    return true;
  }
  const values = formValues;
  const termsField = op.fields.find(
    (f) => f.apiField === "terms_accepted",
  )?.figmaField;
  const termsOk =
    termsField !== undefined ? values[termsField] === true : false;
  return screenStore.submitting || !termsOk;
}

function signinSubmitDisabled(): boolean {
  return screenStore.submitting;
}

// ── Context ─────────────────────────────────────────────────────────────────
type FigmaScreenContextValue = ReturnType<typeof useFigmaScreenDataInternal>;

const FigmaScreenContext = createContext<FigmaScreenContextValue | null>(null);

function useFigmaScreenDataInternal(routePath?: string) {
  useSyncExternalStore(subscribeScreen, screenSnapshot, screenSnapshot);
  useSyncExternalStore(subscribeForm, formSnapshot, formSnapshot);
  const fieldErrors = useFigmaFieldErrors();

  useEffect(() => {
    const frameId = frameIdFromRoute(routePath);
    setFigmaFieldErrors({});
    patchScreen({ statusMessage: "", submitting: false, loaded: false, bound: "" });
    if (!frameId) {
      patchScreen({ loaded: true });
      return;
    }
    if (frameId === "998:1024") {
      const remembered = localStorage.getItem(REMEMBER_EMAIL_KEY);
      if (remembered) {
        resetFormValues({
          ...formValues,
          email: remembered,
          "remember-me": true,
        });
      }
    } else {
      resetFormValues({});
    }
    void loadReads(frameId);
  }, [routePath]);

  return {
    bound: screenStore.bound,
    values: formValues,
    submit,
    loaded: screenStore.loaded,
    error: screenStore.statusMessage || null,
    submitting: screenStore.submitting,
    fieldErrors,
  };
}

export function FigmaScreenDataProvider({
  routePath,
  children,
}: {
  routePath?: string;
  children?: ReactNode;
}) {
  activeRoutePath = routePath ?? "";
  useSyncExternalStore(subscribeScreen, screenSnapshot, screenSnapshot);
  const value = useFigmaScreenDataInternal(routePath);
  useEffect(() => {
    return () => {
      clearReadPayloads();
    };
  }, [routePath]);
  return createElement(
    FigmaScreenContext.Provider,
    { value },
    createElement(
      Fragment,
      null,
      createElement("div", {
        role: "status",
        "aria-live": "polite",
        className: "sr-only",
        children: [
          !screenStore.loaded && screenStore.bound ? "Loading. " : "",
          screenStore.statusMessage,
        ]
          .join("")
          .trim(),
      }),
      children,
    ),
  );
}

export function useFigmaScreenData() {
  const ctx = useContext(FigmaScreenContext);
  if (!ctx) {
    return {
      bound: "",
      values: {} as FigmaFieldValues,
      submit: async () => {},
      loaded: false,
      error: null as string | null,
      submitting: false,
      fieldErrors: {} as Record<string, string>,
    };
  }
  return ctx;
}

export function figmaFieldProps(field: string): FigmaFieldBinding {
  const errors = getFigmaFieldErrors();
  const a11y = figmaFieldA11y(errors, field);
  const raw = formValues[field];
  if (field === "remember-me" || field === "i-have-read-and-agree-to-the-terms-of-use-and-privacy-policy") {
    return {
      checked: raw === true,
      onChange: (event) => {
        setFieldValue(field, event.target.checked === true);
        setFigmaFieldErrors({ ...errors, [field]: "" });
      },
      disabled: screenStore.submitting,
      ...a11y,
    };
  }
  return {
    value: typeof raw === "string" ? raw : raw === undefined ? "" : String(raw),
    onChange: (event) => {
      setFieldValue(field, event.target.value);
      setFigmaFieldErrors({ ...errors, [field]: "" });
    },
    disabled: screenStore.submitting,
    ...a11y,
  };
}

function submitActionBinding(submitNodeId: string): FigmaActionBinding | null {
  const frameId = frameIdFromRoute(activeRoutePath);
  const write = frameId ? figmaWriteOperation(frameId) : undefined;
  if (!write || write.submitNodeId !== submitNodeId) {
    return null;
  }
  const disabled =
    write.path === "/api/signup" ? signupSubmitDisabled() : signinSubmitDisabled();
  return {
    disabled,
    "aria-busy": screenStore.submitting,
    onClick: (event) => {
      event.preventDefault();
      void submit();
    },
  };
}

export function figmaActionProps(action: string): FigmaActionBinding {
  const submitBinding = submitActionBinding(action);
  if (submitBinding) {
    return submitBinding;
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

const ROUTE_ACTIONS: Readonly<Record<string, string>> = {
  "2241:1738": "sign-up",
  "2241:1732": "sign-up",
  "3654:11567": "announcements",
  "2270:15213": "content",
  "2270:15219": "pricing",
  "2270:15222": "about-us",
  "2738:13270": "sign-up",
};

export function figmaUnresolvedActionProps(actionId: string): FigmaActionBinding {
  const submitBinding = submitActionBinding(actionId);
  if (submitBinding) {
    return submitBinding;
  }
  if (actionId === SIGNUP_SUBMIT_NODE) {
    return figmaActionProps(SIGNUP_SUBMIT_NODE);
  }
  const route = ROUTE_ACTIONS[actionId];
  if (route) {
    return {
      onClick: (event) => {
        event.preventDefault();
        navigateClient(route);
      },
    };
  }
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
