import { adminApiGetEnvelope } from "@/lib/admin/http";

import type { AdminProductsListData } from "./types";

const ADMIN_PRODUCT_PATH = "/admin/product";

/**
 * Some backends use `search`, others the typo `serch`. Send both so filtering works.
 */
function appendSearchParams(query: URLSearchParams, term: string): void {
  query.set("search", term);
  query.set("serch", term);
}

/**
 * Paginated admin product list: `GET /admin/product?page=N&search=...&serch=...`
 */
export async function fetchAdminProductsPage(
  page: number,
  options?: Readonly<{ search?: string }>,
) {
  const safePage = Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
  const query = new URLSearchParams({ page: String(safePage) });
  const term = options?.search?.trim();
  if (term) {
    appendSearchParams(query, term);
  }
  return adminApiGetEnvelope<AdminProductsListData>(
    `${ADMIN_PRODUCT_PATH}?${query.toString()}`,
  );
}
