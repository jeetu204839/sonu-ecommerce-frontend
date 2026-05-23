import { API_BASE_URL } from "@/lib/config";

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

/**
 * POST /auth/logout — invalidate shop session on the server (Bearer from phone OTP).
 * Local cookie is cleared by the caller regardless of API outcome.
 */
export async function shopAuthLogout(authToken: string): Promise<void> {
  const token = authToken.trim();
  if (!token) return;

  try {
    await fetch(resolveApiUrl("/auth/logout"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
  } catch {
    // Still clear the local session if the server is unreachable.
  }
}
