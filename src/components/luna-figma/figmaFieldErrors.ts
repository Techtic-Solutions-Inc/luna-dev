/** luna-spec-codegen: owned-layout */
"use client";

import { createElement, useSyncExternalStore, type FormEvent, type ReactElement } from "react";

import {
  figmaWriteOperation,
  validateValues,
  type FigmaFieldValues,
} from "./figmaFieldContract";

// ── Field error state (aria-invalid / aria-describedby) ─────────────────────
// Rules come from the contract operations above; nothing here is invented.
let fieldErrors: Readonly<Record<string, string>> = {};
const noFieldErrors: Readonly<Record<string, string>> = {};
const fieldErrorListeners = new Set<() => void>();

function subscribeFieldErrors(listener: () => void): () => void {
  fieldErrorListeners.add(listener);
  return () => {
    fieldErrorListeners.delete(listener);
  };
}

/** Publish validation errors keyed by Figma field (validateValues / fieldErrorsFromResponse). */
export function setFigmaFieldErrors(errors: Readonly<Record<string, string>>): void {
  fieldErrors = { ...errors };
  fieldErrorListeners.forEach((listener) => listener());
}

export function useFigmaFieldErrors(): Readonly<Record<string, string>> {
  return useSyncExternalStore(subscribeFieldErrors, () => fieldErrors, () => noFieldErrors);
}

export function figmaFieldErrorId(field: string): string {
  return `figma-err-${field}`;
}

/** aria-invalid while the field has an error; aria-describedby always names its message node. */
export function figmaFieldA11y(
  errors: Readonly<Record<string, string>>,
  field: string,
): { "aria-invalid"?: true; "aria-describedby": string } {
  const describedBy = figmaFieldErrorId(field);
  return errors[field]
    ? { "aria-invalid": true, "aria-describedby": describedBy }
    : { "aria-describedby": describedBy };
}

/** Screen-reader message for a field (empty until the field has an error). */
export function FigmaFieldError({
  errors,
  field,
}: {
  errors: Readonly<Record<string, string>>;
  field: string;
}): ReactElement {
  return createElement(
    "span",
    { id: figmaFieldErrorId(field), role: "alert", className: "sr-only" },
    errors[field] ?? "",
  );
}

/** Form onSubmit: validates against the screen's write operation and publishes the errors. */
export function figmaValidateOnSubmit(event: FormEvent<HTMLFormElement>): void {
  event.preventDefault();
  const form = event.currentTarget;
  const frameId = form.closest("[data-figma-frame]")?.getAttribute("data-figma-frame") ?? "";
  const op = figmaWriteOperation(frameId);
  if (!op) {
    return;
  }
  const values: FigmaFieldValues = {};
  for (const field of op.fields) {
    const control = form.elements.namedItem(field.figmaField);
    if (control instanceof HTMLInputElement && (control.type === "checkbox" || control.type === "radio")) {
      values[field.figmaField] = control.checked;
    } else if (
      control instanceof HTMLInputElement ||
      control instanceof HTMLSelectElement ||
      control instanceof HTMLTextAreaElement
    ) {
      values[field.figmaField] = control.value;
    }
  }
  setFigmaFieldErrors(validateValues(op, values));
}
