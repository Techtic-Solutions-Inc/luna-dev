/** luna-spec-codegen: data-hook — wire API data here; do not restyle. */
"use client";

import {
  createElement,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { apiRequest } from "../../lib/apiRequest";
import { clearReadPayloads, publishReadPayload } from "./figmaDisplay";
import {
  fieldErrorsFromResponse,
  figmaOperations,
  figmaReadOperations,
  type FigmaFieldValues,
  type FigmaOperation,
  requestBodyFor,
  UNRESOLVED_FIGMA_FIELDS,
  validateValues,
  valuesFromResponse,
} from "./figmaFieldContract";
import { resolveBoundRead } from "./figmaMockReads";

const HOME_FRAME_ID = "2241:1459";

export type FigmaFieldBinding = {
  value?: string;
  onChange?: (event: { target: { value: string } }) => void;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

export type FigmaActionBinding = {
  onClick?: (event: { preventDefault: () => void }) => void;
};

type ScreenRuntime = {
  frameId: string;
  values: FigmaFieldValues;
  fieldErrors: Record<string, string>;
  statusMessage: string;
  bound: string;
  submitting: boolean;
  setField: (field: string, value: string) => void;
  setStatusMessage: (message: string) => void;
  loadReads: () => Promise<void>;
  submit: () => Promise<void>;
};

let activeRuntime: ScreenRuntime | null = null;
const runtimeListeners = new Set<() => void>();

function notifyRuntime(): void {
  runtimeListeners.forEach((listener) => listener());
}

function useRuntimeSnapshot(): ScreenRuntime | null {
  const [, tick] = useState(0);
  useEffect(() => {
    const listener = () => tick((value) => value + 1);
    runtimeListeners.add(listener);
    return () => {
      runtimeListeners.delete(listener);
    };
  }, []);
  return activeRuntime;
}

// ── Dialog state ────────────────────────────────────────────────────────────
const _dialogListeners = new Set<(actionId: string | null) => void>();

export function openFigmaDialog(actionId: string): void {
  _dialogListeners.forEach((fn) => fn(actionId));
}

export function closeFigmaDialog(): void {
  _dialogListeners.forEach((fn) => fn(null));
}

export function useDialogState(actionId: string): { isOpen: boolean; close: () => void } {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const listener = (id: string | null) => setIsOpen(id === actionId);
    _dialogListeners.add(listener);
    return () => {
      _dialogListeners.delete(listener);
    };
  }, [actionId]);
  return { isOpen, close: closeFigmaDialog };
}

export function useCurrentUser(): { name: string; avatarUrl: string } {
  return { name: "", avatarUrl: "" };
}

function initialFieldValues(frameId: string): FigmaFieldValues {
  const fields = UNRESOLVED_FIGMA_FIELDS[frameId] ?? [];
  return Object.fromEntries(fields.map((field) => [field, ""]));
}

function applyReadToForm(
  op: FigmaOperation,
  payload: unknown,
  setValues: Dispatch<SetStateAction<FigmaFieldValues>>,
): void {
  if (op.fields.length === 0) {
    return;
  }
  const next = valuesFromResponse(op, payload);
  if (Object.keys(next).length > 0) {
    setValues((previous) => ({ ...previous, ...next }));
  }
}

async function fetchReadOperation(
  op: FigmaOperation,
  setStatusMessage: (message: string) => void,
  setValues: Dispatch<SetStateAction<FigmaFieldValues>>,
): Promise<void> {
  const resolution = resolveBoundRead(op);
  if (resolution.mode === "missing") {
    setStatusMessage(resolution.diagnostic);
    return;
  }
  if (resolution.mode === "mock") {
    publishReadPayload(op.method, op.path, resolution.body);
    applyReadToForm(op, resolution.body, setValues);
    return;
  }
  try {
    const body = await apiRequest({ method: op.method, path: op.path });
    publishReadPayload(op.method, op.path, body);
    applyReadToForm(op, body, setValues);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load data.";
    setStatusMessage(message);
  }
}

/** Presentational star-rating variant toggles (Figma change_variant reactions). */
const CHANGE_VARIANT_ACTIONS = new Set([
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
]);

function useHomeScreenRuntime(frameId: string): ScreenRuntime {
  const [values, setValues] = useState<FigmaFieldValues>(() => initialFieldValues(frameId));
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const writeOp = useMemo(
    () => figmaOperations(frameId).find((op) => op.role === "write" && op.submitNodeId !== null),
    [frameId],
  );

  const bound = useMemo(() => {
    const reads = figmaReadOperations(frameId);
    if (reads.length === 0 && !writeOp) {
      return "";
    }
    return reads.map((op) => `${op.method} ${op.path}`).join(", ");
  }, [frameId, writeOp]);

  const setField = useCallback((field: string, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setFieldErrors((previous) => {
      if (!previous[field]) {
        return previous;
      }
      const next = { ...previous };
      delete next[field];
      return next;
    });
  }, []);

  const loadReads = useCallback(async () => {
    setStatusMessage("");
    const reads = figmaReadOperations(frameId);
    for (const op of reads) {
      await fetchReadOperation(op, setStatusMessage, setValues);
    }
  }, [frameId]);

  const submit = useCallback(async () => {
    if (!writeOp) {
      return;
    }
    setFieldErrors({});
    setStatusMessage("");
    const clientErrors = validateValues(writeOp, values);
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setStatusMessage("Please fix the highlighted fields.");
      return;
    }
    setSubmitting(true);
    try {
      const body = requestBodyFor(writeOp, values);
      const response = await apiRequest({
        method: writeOp.method,
        path: writeOp.path,
        body,
      });
      publishReadPayload(writeOp.method, writeOp.path, response);
      applyReadToForm(writeOp, response, setValues);
      setStatusMessage("Saved.");
    } catch (error) {
      const errBody =
        typeof error === "object" && error !== null && "body" in error
          ? (error as { body: unknown }).body
          : undefined;
      const serverErrors = writeOp ? fieldErrorsFromResponse(writeOp, errBody) : {};
      if (Object.keys(serverErrors).length > 0) {
        setFieldErrors(serverErrors);
      }
      setStatusMessage(error instanceof Error ? error.message : "Request failed.");
    } finally {
      setSubmitting(false);
    }
  }, [values, writeOp]);

  return {
    frameId,
    values,
    fieldErrors,
    statusMessage,
    bound,
    submitting,
    setField,
    setStatusMessage,
    loadReads,
    submit,
  };
}

export function FigmaScreenDataProvider({
  routePath,
  children,
}: {
  routePath?: string;
  children?: ReactNode;
}) {
  const frameId = HOME_FRAME_ID;
  const runtime = useHomeScreenRuntime(frameId);

  useEffect(() => {
    activeRuntime = runtime;
    notifyRuntime();
    return () => {
      if (activeRuntime === runtime) {
        activeRuntime = null;
        notifyRuntime();
      }
    };
  }, [runtime]);

  useEffect(() => {
    void runtime.loadReads();
  }, [runtime.loadReads, routePath]);

  useEffect(() => {
    return () => {
      clearReadPayloads();
    };
  }, [routePath]);

  return createElement(Fragment, null, children);
}

export function figmaFieldProps(field: string): FigmaFieldBinding {
  const runtime = useRuntimeSnapshot();
  if (!runtime) {
    return {};
  }
  const error = runtime.fieldErrors[field];
  const errorId = error ? `figma-field-error-${field}` : undefined;
  return {
    value: String(runtime.values[field] ?? ""),
    onChange: (event) => runtime.setField(field, event.target.value),
    "aria-invalid": error ? true : undefined,
    "aria-describedby": errorId,
  };
}

export function figmaFieldError(field: string): string | undefined {
  const runtime = useRuntimeSnapshot();
  return runtime?.fieldErrors[field];
}

export function figmaFieldErrorId(field: string): string {
  return `figma-field-error-${field}`;
}

export function figmaActionProps(action: string): FigmaActionBinding {
  if (CHANGE_VARIANT_ACTIONS.has(action)) {
    return {
      onClick: (event) => {
        event.preventDefault();
        if (import.meta.env.DEV) {
          globalThis.console.debug("[luna] rating variant:", action);
        }
      },
    };
  }
  return {
    onClick: (event) => {
      event.preventDefault();
      openFigmaDialog(action);
      if (import.meta.env.DEV) {
        globalThis.console.debug("[luna] action fired:", action);
      }
    },
  };
}

export function figmaUnresolvedActionProps(actionId: string): FigmaActionBinding {
  return {
    onClick: () => {
      if (import.meta.env.DEV) {
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
  const runtime = useRuntimeSnapshot();
  if (!runtime) {
    return {
      bound: "",
      values: {} as FigmaFieldValues,
      submit: async () => {},
      statusMessage: "",
      submitting: false,
    };
  }
  return {
    bound: runtime.bound,
    values: runtime.values,
    submit: runtime.submit,
    statusMessage: runtime.statusMessage,
    submitting: runtime.submitting,
  };
}
