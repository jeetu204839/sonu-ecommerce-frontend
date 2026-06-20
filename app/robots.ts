import type { MetadataRoute } from "next";

import { absoluteUrl, resolveSiteUrl } from "@/app/(shop)/lib/seo/site-url";

/**
 * Served at /robots.txt (must live in app/ root for reliable production routing).
 * Rules target the public shop only; admin/auth paths stay blocked.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteUrl = await resolveSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/auth/", "/user/", "/service-unavailable"],
    },
    sitemap: absoluteUrl("/sitemap.xml", siteUrl),
  };
}
