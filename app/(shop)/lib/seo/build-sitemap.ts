import type { MetadataRoute } from "next";

import {
  fetchCategories,
  type CategoryListItem,
} from "@/lib/api/categories";
import { fetchProductsPage } from "@/lib/api/products";

import { absoluteUrl } from "./site-url";

/** Public storefront pages only — admin/auth routes are never listed here. */
const SHOP_STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
}> = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/shop", changeFrequency: "daily", priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/search", changeFrequency: "weekly", priority: 0.5 },
];

/**
 * Single query param only — avoids `&` in URLs which breaks XML sitemap parsing.
 * Shop page defaults to page 1 when `page` is omitted.
 */
function sitemapCategoryPath(slug: string): string {
  const q = new URLSearchParams();
  q.set("category", slug);
  return `/shop?${q.toString()}`;
}

function collectCategorySlugs(categories: CategoryListItem[]): string[] {
  const slugs: string[] = [];

  for (const category of categories) {
    if (category.isActive && category.slug.trim()) {
      slugs.push(category.slug.trim());
    }
    if (category.children.length > 0) {
      slugs.push(...collectCategorySlugs(category.children));
    }
  }

  return slugs;
}

async function fetchAllProductSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const result = await fetchProductsPage({ page });
    for (const product of result.products) {
      const slug = product.slug.trim();
      if (slug) slugs.push(slug);
    }

    const reportedTotal = result.pagination?.total_pages;
    totalPages =
      typeof reportedTotal === "number" && reportedTotal > 0
        ? reportedTotal
        : page;

    if (!result.products.length) break;
    page += 1;
  }

  return slugs;
}

function entry(
  siteUrl: string,
  path: string,
  options: {
    changeFrequency: NonNullable<
      MetadataRoute.Sitemap[number]["changeFrequency"]
    >;
    priority: number;
  },
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path, siteUrl),
    lastModified: new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
  };
}

export async function buildShopSitemap(
  siteUrl: string,
): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = SHOP_STATIC_ROUTES.map((route) =>
    entry(siteUrl, route.path, {
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }),
  );

  try {
    const [productSlugs, categories] = await Promise.all([
      fetchAllProductSlugs(),
      fetchCategories(),
    ]);

    const uniqueProductSlugs = [...new Set(productSlugs)];
    for (const slug of uniqueProductSlugs) {
      entries.push(
        entry(siteUrl, `/details/${encodeURIComponent(slug)}`, {
          changeFrequency: "weekly",
          priority: 0.8,
        }),
      );
    }

    const uniqueCategorySlugs = [...new Set(collectCategorySlugs(categories))];
    for (const slug of uniqueCategorySlugs) {
      entries.push(
        entry(siteUrl, sitemapCategoryPath(slug), {
          changeFrequency: "weekly",
          priority: 0.7,
        }),
      );
    }
  } catch {
    // API down during build/runtime — still publish static shop pages.
  }

  return entries;
}
