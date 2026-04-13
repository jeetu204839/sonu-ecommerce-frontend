/**
 * Central place for environment-driven app config.
 * Server-only vars stay out of the client bundle unless prefixed with NEXT_PUBLIC_.
 */

function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

/** Base URL for server-side API calls (no trailing slash). */
export const API_BASE_URL = normalizeBaseUrl(
  process.env.API_BASE_URL ?? "",
);

/** Optional public base URL when client components must call the API directly. */
export const PUBLIC_API_BASE_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
);

export function assertApiBaseUrl(): void {
  if (!API_BASE_URL && process.env.NODE_ENV === "production") {
    throw new Error(
      "API_BASE_URL is not set. Add it to .env.local or your host's environment.",
    );
  }
}
