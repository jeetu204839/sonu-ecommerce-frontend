export function homeAllProductsHref(): string {
  return "/";
}

export function homeCategoryHref(slug: string): string {
  const q = new URLSearchParams();
  q.set("category", slug);
  return `/?${q.toString()}`;
}
