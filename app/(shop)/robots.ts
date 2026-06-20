import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/app/(shop)/lib/seo/site-url";

/** Crawl rules for the public storefront only; blocks admin and auth areas. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/auth/", "/user/", "/service-unavailable"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
