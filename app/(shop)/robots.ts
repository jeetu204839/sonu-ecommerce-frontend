import type { MetadataRoute } from "next";

import { absoluteUrl, resolveSiteUrl } from "@/app/(shop)/lib/seo/site-url";

/** Crawl rules for the public storefront only; blocks admin and auth areas. */
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
