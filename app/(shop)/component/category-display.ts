import {
  getCategoryImageSrc as resolveCategoryImageSrc,
  type CategoryListItem,
} from "@/lib/api/categories";

export function categoryIconClass(cat: CategoryListItem): string {
  const icon = cat.icon?.trim();
  return icon || "fas fa-tag";
}

export function getCategoryImageSrc(cat: CategoryListItem): string | null {
  return resolveCategoryImageSrc(cat);
}
