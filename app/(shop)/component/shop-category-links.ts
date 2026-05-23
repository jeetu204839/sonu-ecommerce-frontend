export function shopAllProductsHref(): string {
  return "/shop?page=1";
}

export function shopCategoryHref(slug: string): string {
  const q = new URLSearchParams();
  q.set("page", "1");
  q.set("category", slug);
  return `/shop?${q.toString()}`;
}
