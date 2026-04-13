import { apiFetchJson } from "@/lib/api/client";

/**
 * Categories API: GET {API_BASE_URL}/public/categories
 */

export type CategoryListItem = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  isActive: boolean;
  productCount: number;
  children: CategoryListItem[];
};

type RawCategory = Record<string, unknown>;

function toStringId(value: unknown, fallback: number): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  return String(fallback);
}

function optionalString(raw: RawCategory, keys: string[]): string | undefined {
  for (const key of keys) {
    const v = raw[key];
    if (typeof v === "string" && v.trim()) return v;
  }
  return undefined;
}

function pickString(raw: RawCategory, keys: string[], fallback: string): string {
  return optionalString(raw, keys) ?? fallback;
}

function pickBool(raw: RawCategory, keys: string[], fallback: boolean): boolean {
  for (const key of keys) {
    const v = raw[key];
    if (typeof v === "boolean") return v;
    if (v === 1 || v === "1") return true;
    if (v === 0 || v === "0") return false;
  }
  return fallback;
}

function pickNumber(raw: RawCategory, keys: string[], fallback: number): number {
  for (const key of keys) {
    const v = raw[key];
    if (typeof v === "number" && !Number.isNaN(v)) return v;
    if (typeof v === "string") {
      const parsed = Number.parseInt(v, 10);
      if (!Number.isNaN(parsed)) return parsed;
    }
  }
  return fallback;
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
  const name = pickString(raw, ["name", "title", "category_name"], "Category");
  const slug = pickString(raw, ["slug"], id);

  const description = optionalString(raw, [
    "description",
    "category_description",
  ]);
  const image = optionalString(raw, ["image", "image_url", "thumbnail"]);
  const icon = optionalString(raw, ["icon"]);

  const isActive = pickBool(raw, ["is_active", "isActive", "active"], true);
  const productCount = pickNumber(
    raw,
    ["productCount"],
    0,
  );

  let children: CategoryListItem[] = [];
  const nested = raw.children ?? raw.subcategories;
  if (Array.isArray(nested)) {
    children = nested.map((row, i) => mapRow(row as RawCategory, i));
  }

  return {
    id,
    name,
    slug,
    description,
    image,
    icon,
    isActive,
    productCount,
    children,
  };
}

export async function fetchCategories(): Promise<CategoryListItem[]> {
  const payload = await apiFetchJson<unknown>("/public/categories");
  const rows = normalizeCategoryRows(payload);
  console.log('rows', rows);
  return rows.map((row, index) => mapRow(row, index));
}
