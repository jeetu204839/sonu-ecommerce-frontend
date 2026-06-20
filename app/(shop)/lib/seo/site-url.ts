import { headers } from "next/headers";

/**
 * Canonical public storefront origin (no trailing slash).
 * Used for absolute URLs in sitemap.xml and robots.txt.
 */
function normalizeSiteUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

function siteUrlFromEnv(): string | null {
  const fromEnv =
    process.env.SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (fromEnv) {
    return normalizeSiteUrl(fromEnv);
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    return normalizeSiteUrl(`https://${vercel}`);
  }

  return null;
}

/** Sync fallback — prefers env; use resolveSiteUrl() in sitemap/robots when possible. */
export function getSiteUrl(): string {
  return siteUrlFromEnv() ?? "http://localhost:3000";
}

/** Resolves production host from request when SITE_URL is not set on the server. */
export async function resolveSiteUrl(): Promise<string> {
  const fromEnv = siteUrlFromEnv();
  if (fromEnv) return fromEnv;

  try {
    const h = await headers();
    const host = h.get("x-forwarded-host") ?? h.get("host");
    if (host) {
      const proto =
        h.get("x-forwarded-proto")?.split(",")[0]?.trim() ?? "https";
      return normalizeSiteUrl(`${proto}://${host}`);
    }
  } catch {
    // Outside a request context (e.g. static analysis).
  }

  return "http://localhost:3000";
}

export function absoluteUrl(path: string, base = getSiteUrl()): string {
  if (!path || path === "/") return base;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
