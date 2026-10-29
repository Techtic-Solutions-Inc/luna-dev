function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function messageFromBody(body: unknown): string | null {
  const record = asRecord(body);
  if (!record) {
    return null;
  }
  if (typeof record.message === "string" && record.message.trim() !== "") {
    return record.message;
  }
  return null;
}

/** User-safe message from fetch failures or API error envelopes. */
export function getApiErrorMessage(err: unknown, fallback = "Something went wrong. Please try again."): string {
  if (err instanceof TypeError && /fetch|network/i.test(err.message)) {
    return "Unable to connect. Please check your connection.";
  }
  if (typeof err === "object" && err !== null && "status" in err) {
    const status = (err as { status: number }).status;
    const body = "body" in err ? (err as { body: unknown }).body : undefined;
    if (status === 401) {
      return "Your session may have expired. Please sign in again.";
    }
    if (status >= 500) {
      return fallback;
    }
    const fromBody = messageFromBody(body);
    if (fromBody) {
      return fromBody;
    }
  }
  const record = asRecord(err);
  if (record && typeof record.message === "string") {
    return record.message;
  }
  return fallback;
}

export function getApiErrorMessageFromResponse(
  status: number,
  body: unknown,
  context: "login" | "profile" | "generic" = "generic",
): string {
  if (status === 401) {
    return context === "profile"
      ? "Your session may have expired. Please sign in again."
      : "Invalid email or password.";
  }
  if (status === 403) {
    return context === "profile"
      ? "You do not have permission to update this profile."
      : "Invalid email or password.";
  }
  if (status === 404) {
    return context === "profile" ? "Profile not found." : "Account not found.";
  }
  if (status >= 500) {
    return context === "profile"
      ? "Unable to save changes. Please try again."
      : "Something went wrong. Please try again.";
  }
  return messageFromBody(body) ?? fallbackForContext(context);
}

function fallbackForContext(context: "login" | "profile" | "generic"): string {
  if (context === "login") {
    return "Unable to sign in. Please try again.";
  }
  if (context === "profile") {
    return "Unable to load profile. Please try again.";
  }
  return "Something went wrong. Please try again.";
}
