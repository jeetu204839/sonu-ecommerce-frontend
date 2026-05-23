/** Default India dial code for shop phone OTP (+91). */
export const DEFAULT_SHOP_COUNTRY_CODE = "91";

/**
 * Turns API `message` / `errors` fields into a single user-facing string.
 * Never uses String(object) (avoids "[object Object]").
 */
export function apiEnvelopeUserMessage(
  payload: { message?: unknown; errors?: unknown } | null | undefined,
  fallback: string,
): string {
  const msg = payload?.message;
  if (typeof msg === "string" && msg.trim()) return msg.trim();

  const fromErrors = messageFromApiErrors(payload?.errors);
  if (fromErrors) return fromErrors;

  return fallback;
}

export function messageFromApiErrors(errors: unknown): string | null {
  if (errors == null) return null;
  if (typeof errors === "string" && errors.trim()) return errors.trim();
  if (typeof errors === "number" || typeof errors === "boolean") {
    return String(errors);
  }

  if (Array.isArray(errors)) {
    const parts = errors
      .map((item) => apiErrorItemToString(item))
      .filter((s): s is string => Boolean(s));
    return parts.length ? parts.join(" ") : null;
  }

  if (typeof errors === "object") {
    const parts: string[] = [];
    for (const v of Object.values(errors as Record<string, unknown>)) {
      const s = apiErrorItemToString(v);
      if (s) parts.push(s);
    }
    return parts.length ? parts.join(" ") : null;
  }

  return null;
}

function apiErrorItemToString(item: unknown): string | null {
  if (item == null) return null;
  if (typeof item === "string" && item.trim()) return item.trim();
  if (typeof item === "number" || typeof item === "boolean") return String(item);

  if (Array.isArray(item)) {
    const parts = item
      .map((x) => apiErrorItemToString(x))
      .filter((s): s is string => Boolean(s));
    return parts.length ? parts.join(" ") : null;
  }

  if (typeof item === "object") {
    const o = item as Record<string, unknown>;
    if (typeof o.message === "string" && o.message.trim()) return o.message.trim();
    for (const v of Object.values(o)) {
      const s = apiErrorItemToString(v);
      if (s) return s;
    }
  }

  return null;
}
