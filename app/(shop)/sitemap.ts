import type { MetadataRoute } from "next";

import { buildShopSitemap } from "@/app/(shop)/lib/seo/build-sitemap";

/** Regenerate hourly so new products/categories appear in search engines. */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return buildShopSitemap();
}
