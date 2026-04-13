import { API_BASE_URL } from "@/lib/config";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly bodySnippet?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Safe JSON parsing for fetch responses. Avoids `res.json()` on empty bodies
 * (204, misconfigured proxies, PHP notices before JSON) which throws
 * "Unexpected end of JSON input".
 */
export function parseJsonText<T>(text: string): T | null {
  const trimmed = text.trim();
  if (trimmed === "") return null;
  try {
    return JSON.parse(trimmed) as T;
  } catch {
    throw new Error(
      `Response is not valid JSON (first 200 chars): ${trimmed.slice(0, 200)}`,
    );
  }
}

export type FetchJsonOptions = RequestInit & {
  /** When false, non-2xx responses return parsed body if any instead of throwing. Default true. */
  throwOnError?: boolean;
};

/**
 * GET/POST/etc. with JSON body handling. Use this instead of raw `fetch` + `res.json()`.
 */
function resolveApiUrl(path: string): string {
  if (path.startsWith("http")) return path;
  if (!API_BASE_URL) {
    throw new Error(
      "API_BASE_URL is not set. Add it to .env.local (see .env.example).",
    );
  }
  const prefix = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${prefix}`;
}

export async function apiFetchJson<T>(
  path: string,
  init?: FetchJsonOptions,
): Promise<T | null> {
  const { throwOnError = true, headers, ...rest } = init ?? {};
  const url = resolveApiUrl(path);

  const res = await fetch(url, {
    ...rest,
    headers: {
      Accept: "application/json",
      ...headers,
    },
  });

  const text = await res.text();

  if (!res.ok) {
    const snippet = text.trim().slice(0, 300);
    if (throwOnError) {
      throw new ApiError(
        `Request failed: ${res.status} ${res.statusText}`,
        res.status,
        snippet || undefined,
      );
    }
    return parseJsonText<T>(text);
  }

  return parseJsonText<T>(text);
}
