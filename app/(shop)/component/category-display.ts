import type { CategoryListItem } from "@/lib/api/categories";

export function categoryIconClass(cat: CategoryListItem): string {
  const icon = cat.icon?.trim();
  return icon || "fas fa-tag";
}
