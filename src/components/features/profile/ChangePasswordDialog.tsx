import { useState } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePassword } from "../../../lib/api/profile";
import { getApiErrorMessageFromResponse } from "../../../lib/api/errors";
import { notifyError, notifySuccess } from "../../../lib/notify";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { PasswordInput } from "../../shared/PasswordInput";

const schema = z
  .object({
    current_password: z.string().min(1, "Current password is required."),
    new_password: z.string().min(8, "New password must be at least 8 characters."),
    confirm_password: z.string().min(1, "Please confirm your new password."),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

type FormValues = z.infer<typeof schema>;
type PasswordFieldKey = keyof FormValues;

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function applyApiFieldErrors(body: unknown, form: Pick<UseFormReturn<FormValues>, "setError">): boolean {
  const outer = asRecord(body);
  const nestedError = outer ? asRecord(outer.error) : null;
  const details =
    nestedError?.details && typeof nestedError.details === "object"
      ? (nestedError.details as Record<string, unknown>)
      : outer?.details && typeof outer.details === "object"
        ? (outer.details as Record<string, unknown>)
        : outer?.errors && typeof outer.errors === "object"
          ? (outer.errors as Record<string, unknown>)
          : null;
  if (!details) {
    return false;
  }
  let mapped = false;
  for (const key of ["current_password", "new_password", "confirm_password"] as const) {
    const raw = details[key];
    const message =
      typeof raw === "string"
        ? raw
        : Array.isArray(raw) && typeof raw[0] === "string"
          ? raw[0]
          : asRecord(raw)?.message;
    if (typeof message === "string" && message.trim() !== "") {
      form.setError(key as PasswordFieldKey, { type: "server", message });
      mapped = true;
    }
  }
  return mapped;
}

export function ChangePasswordDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [saving, setSaving] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setSaving(true);
    form.clearErrors();
    try {
      const response = await changePassword(values);
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        const mapped = applyApiFieldErrors(body, form);
        if (!mapped) {
          const msg = getApiErrorMessageFromResponse(response.status, body, "profile");
          notifyError(msg);
        }
        return;
      }
      notifySuccess("Password changed successfully.");
      form.reset();
      onOpenChange(false);
    } catch {
      notifyError("Unable to connect. Please check your connection.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change password</DialogTitle>
          <DialogDescription>Enter your current password and choose a new one.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormField
              control={form.control}
              name="current_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current password</FormLabel>
                  <FormControl>
                    <PasswordInput autoComplete="current-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <PasswordInput autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <PasswordInput autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => onOpenChange(false)} disabled={saving}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving} aria-busy={saving}>
                {saving ? "Saving…" : "Save password"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
