/**
 * Canonical public storefront origin (no trailing slash).
 * Used for absolute URLs in sitemap.xml and robots.txt.
 */
function normalizeSiteUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

export function getSiteUrl(): string {
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

  return "http://localhost:3000";
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
