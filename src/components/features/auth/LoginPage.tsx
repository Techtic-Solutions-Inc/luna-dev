import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { login } from "@/lib/api/auth";
import { getApiErrorMessage } from "@/lib/api/client";
import { useAuth } from "@/hooks/useAuth";
import type { LoginRequest } from "@/types/api";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken, clearSessionRejectedFlag } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<LoginRequest>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginRequest) => {
    form.clearErrors();
    if (!values.email.trim()) {
      form.setError("email", { message: "Email is required." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      form.setError("email", { message: "Please enter a valid email address." });
      return;
    }
    if (!values.password) {
      form.setError("password", { message: "Password is required." });
      return;
    }
    setSubmitting(true);
    try {
      clearSessionRejectedFlag();
      const response = await login(values);
      const token = response.data.accessToken || response.data.token;
      setToken(token);
      toast.success("Signed in successfully.");
      const redirect =
        typeof location.state === "object" &&
        location.state !== null &&
        "from" in location.state &&
        typeof (location.state as { from: unknown }).from === "string"
          ? (location.state as { from: string }).from
          : "/demo-protected";
      navigate(redirect, { replace: true });
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-lg">
        <h1 className="font-eb-garamond text-3xl text-card-foreground">Log In</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in with your Agentwise account.
        </p>
        <Form {...form}>
          <form
            className="mt-8 space-y-5"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="you@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} autoComplete="current-password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={submitting} aria-busy={submitting}>
              {submitting ? "Signing in…" : "Sign In"}
            </Button>
          </form>
        </Form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link to="/" className="text-primary underline-offset-4 hover:underline">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
