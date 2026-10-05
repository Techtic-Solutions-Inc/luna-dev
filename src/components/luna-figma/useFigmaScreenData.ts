/** luna-spec-codegen: data-hook — wire API data here; do not restyle.
 * Consumed reads (role read, non-empty fields) use resolveBoundRead from
 * figmaMockReads.ts inside loadReads.
 */
import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ApiRequestError, apiRequest, getApiErrorMessage } from "@/lib/api-client";
import { LOCKED_API_ROUTES } from "@/lib/api-routes";
import type { ApiSuccessEnvelope } from "@/types/api";
import {
  postAuthForgotPassword,
  type ForgotPasswordRequestBody,
} from "@/services/auth.service";
import {
  fieldErrorsFromResponse,
  figmaOperations,
  figmaReadOperation,
  figmaWriteOperation,
  requestBodyFor,
  type FigmaFieldValues,
  type FigmaOperation,
  validateValues,
  valuesFromResponse,
} from "./figmaFieldContract";
import { resolveBoundRead } from "./figmaMockReads";

export type FigmaFieldBinding = {
  value?: string;
  onChange?: (event: { target: { value: string } }) => void;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

export type FigmaActionBinding = {
  onClick?: (event: { preventDefault: () => void }) => void;
  disabled?: boolean;
  "aria-busy"?: boolean;
};

const ROUTE_TO_FRAME: Readonly<Record<string, string>> = {
  "": "3047:21237",
  content: "3047:21237",
  "content-library": "3047:21237",
  "forgot-your-password": "1018:1100",
};

type ScreenDataContextValue = {
  bound: string;
  values: FigmaFieldValues;
  fieldErrors: Record<string, string>;
  submitting: boolean;
  statusMessage: string;
  setFieldValue: (field: string, value: string) => void;
  submit: () => Promise<void>;
};

const ScreenDataContext = createContext<ScreenDataContextValue | null>(null);

function unwrapPayload(parsed: unknown): unknown {
  if (!parsed || typeof parsed !== "object") {
    return parsed;
  }
  const record = parsed as Record<string, unknown>;
  if (record.success === true && "data" in record) {
    return record.data;
  }
  return parsed;
}

async function fetchReadOperation(op: FigmaOperation): Promise<unknown> {
  const result = await apiRequest<ApiSuccessEnvelope<Record<string, unknown>>>(
    op.method,
    op.path,
  );
  return result;
}

async function executeWriteOperation(
  op: FigmaOperation,
  body: Record<string, string | boolean>,
): Promise<ApiSuccessEnvelope<Record<string, unknown>>> {
  const forgot = LOCKED_API_ROUTES.authForgotPassword;
  if (op.method === forgot.method && op.path === forgot.path) {
    const email = body.email;
    const payload: ForgotPasswordRequestBody = {
      email: typeof email === "string" ? email : String(email ?? ""),
    };
    return postAuthForgotPassword(payload);
  }
  return apiRequest<ApiSuccessEnvelope<Record<string, unknown>>>(
    op.method,
    op.path,
    {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
}

export function FigmaScreenDataProvider({
  routePath = "",
  children,
}: {
  routePath?: string;
  children?: ReactNode;
}) {
  const frameId = ROUTE_TO_FRAME[routePath] ?? "";
  const [values, setValues] = useState<FigmaFieldValues>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const loadReads = useCallback(async () => {
    if (!frameId) {
      return;
    }
    for (const op of figmaOperations(frameId)) {
      if (op.role !== "read") {
        continue;
      }
      const resolution = resolveBoundRead(op);
      if (resolution.mode === "missing") {
        setStatusMessage(resolution.diagnostic);
        continue;
      }
      if (resolution.mode === "mock") {
        const payload = unwrapPayload(resolution.body);
        setValues((prev) => ({
          ...prev,
          ...valuesFromResponse(op, payload),
        }));
        continue;
      }
      try {
        const response = await fetchReadOperation(op);
        const payload = unwrapPayload(response);
        setValues((prev) => ({
          ...prev,
          ...valuesFromResponse(op, payload),
        }));
      } catch (err) {
        setStatusMessage(
          err instanceof Error ? err.message : "Unable to load screen data.",
        );
      }
    }
  }, [frameId]);

  useEffect(() => {
    void loadReads();
  }, [loadReads]);

  const setFieldValue = useCallback((field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const submit = useCallback(async () => {
    const writeOp = figmaWriteOperation(frameId);
    if (!writeOp) {
      return;
    }
    const clientErrors = validateValues(writeOp, values);
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      return;
    }
    setSubmitting(true);
    setFieldErrors({});
    setStatusMessage("");
    try {
      const body = requestBodyFor(writeOp, values);
      const response = await executeWriteOperation(writeOp, body);
      const successMessage =
        typeof response.message === "string" && response.message.trim().length > 0
          ? response.message
          : "If that email is registered, we sent a reset link.";
      setStatusMessage(successMessage);
      const readOp = figmaReadOperation(frameId);
      if (readOp) {
        await loadReads();
      }
    } catch (err) {
      const invalidSession =
        err instanceof ApiRequestError &&
        (err.status === 401 ||
          err.body?.error?.code === "INVALID_TOKEN");
      if (invalidSession) {
        try {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("token");
        } catch {
          // ignore storage failures
        }
        setStatusMessage(getApiErrorMessage(err));
        return;
      }
      const apiBody = err instanceof ApiRequestError ? err.body : null;
      const serverErrors = fieldErrorsFromResponse(writeOp, apiBody);
      if (Object.keys(serverErrors).length > 0) {
        setFieldErrors(serverErrors);
      }
      setStatusMessage(getApiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }, [frameId, loadReads, values]);

  const contextValue = useMemo<ScreenDataContextValue>(
    () => ({
      bound: frameId,
      values,
      fieldErrors,
      submitting,
      statusMessage,
      setFieldValue,
      submit,
    }),
    [
      fieldErrors,
      frameId,
      statusMessage,
      submit,
      setFieldValue,
      submitting,
      values,
    ],
  );

  return createElement(
    ScreenDataContext.Provider,
    { value: contextValue },
    createElement(
      "span",
      {
        className: "sr-only",
        "aria-live": "polite",
        "aria-atomic": "true",
      },
      statusMessage,
    ),
    children,
  );
}

function useScreenContext(): ScreenDataContextValue {
  const ctx = useContext(ScreenDataContext);
  if (!ctx) {
    return {
      bound: "",
      values: {},
      fieldErrors: {},
      submitting: false,
      statusMessage: "",
      setFieldValue: () => {},
      submit: async () => {},
    };
  }
  return ctx;
}

export function useFigmaFieldProps(field: string): FigmaFieldBinding {
  const { values, fieldErrors, setFieldValue } = useScreenContext();
  const errorId = `${field}-field-error`;
  const error = fieldErrors[field];
  return {
    value: typeof values[field] === "string" ? values[field] : "",
    onChange: (event) => {
      setFieldValue(field, event.target.value);
    },
    ...(error
      ? {
          "aria-invalid": true as const,
          "aria-describedby": errorId,
        }
      : {}),
  };
}

export function useFigmaActionProps(action: string): FigmaActionBinding {
  const { submit, submitting } = useScreenContext();
  return {
    onClick: (event) => {
      event.preventDefault();
      document.documentElement.setAttribute("data-figma-action-fired", action);
      void submit();
    },
    disabled: submitting,
    "aria-busy": submitting,
  };
}

export function useFigmaScreenData() {
  const ctx = useScreenContext();
  return {
    bound: ctx.bound,
    values: ctx.values,
    fieldErrors: ctx.fieldErrors,
    submitting: ctx.submitting,
    statusMessage: ctx.statusMessage,
    submit: ctx.submit,
  };
}

export function FigmaFieldError({ field }: { field: string }) {
  const { fieldErrors } = useScreenContext();
  const message = fieldErrors[field];
  if (!message) {
    return null;
  }
  return createElement(
    "p",
    {
      id: `${field}-field-error`,
      role: "alert",
      className:
        "absolute left-[0px] top-[56px] w-full font-almarai text-[12px] leading-[14px] text-[#ff6b6b]",
    },
    message,
  );
}
