import type { MetadataRoute } from "next";

import { buildShopSitemap } from "@/app/(shop)/lib/seo/build-sitemap";
import { resolveSiteUrl } from "@/app/(shop)/lib/seo/site-url";

/** Regenerate hourly so new products/categories appear in search engines. */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = await resolveSiteUrl();
  return buildShopSitemap(siteUrl);
}
