import { apiFetchJson } from "@/lib/api/client";

/**
 * Categories API: GET {API_BASE_URL}/public/categories
 *
 * Step-by-step (how this fits together):
 * 1. `.env.local` sets `API_BASE_URL` (no trailing slash), e.g. http://127.0.0.1:8000/api
 * 2. `apiFetchJson("/public/categories")` builds the full URL and safely parses JSON
 * 3. Backend may return a raw array, or `{ data: [...] }`, or `{ categories: [...] }` —
 *    `normalizeCategoryRows` handles common shapes
 * 4. Each row is mapped to `CategoryListItem` for the UI (name, count, link)
 */

export type CategoryListItem = {
  id: string;
  name: string;
  count: number | null;
  href: string;
};

type RawCategory = Record<string, unknown>;

function toStringId(value: unknown, fallback: number): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  return String(fallback);
}

function pickName(raw: RawCategory): string {
  const n = raw.name ?? raw.title ?? raw.category_name;
  return typeof n === "string" && n.trim() ? n : "Category";
}

function pickCount(raw: RawCategory): number | null {
  const c =
    raw.count ?? raw.product_count ?? raw.products_count ?? raw.total ?? raw.items_count;
  if (typeof c === "number" && !Number.isNaN(c)) return c;
  if (typeof c === "string") {
    const parsed = Number.parseInt(c, 10);
    return Number.isNaN(parsed) ? null : parsed;
  }
  return null;
}

function normalizeCategoryRows(payload: unknown): RawCategory[] {
  if (Array.isArray(payload)) return payload as RawCategory[];
  if (payload && typeof payload === "object") {
    const o = payload as Record<string, unknown>;
    const nested = o.data ?? o.categories ?? o.items ?? o.results;
    if (Array.isArray(nested)) return nested as RawCategory[];
  }
  return [];
}

function mapRow(raw: RawCategory, index: number): CategoryListItem {
  const id = toStringId(raw.id ?? raw.slug, index);
  const name = pickName(raw);
  const count = pickCount(raw);
  const slug =
    typeof raw.slug === "string" && raw.slug.trim() ? raw.slug : id;
  const href = `/shop?category=${encodeURIComponent(slug)}`;
  return { id, name, count, href };
}

export async function fetchCategories(): Promise<CategoryListItem[]> {
  const payload = await apiFetchJson<unknown>("/public/categories");
  const rows = normalizeCategoryRows(payload);
  return rows.map((row, index) => mapRow(row, index));
}
