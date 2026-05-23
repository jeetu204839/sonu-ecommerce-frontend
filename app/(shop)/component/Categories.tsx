import Link from "next/link";
import {
  fetchCategories,
  type CategoryListItem,
} from "@/lib/api/categories";

import CategoryFilterChip from "@/app/(shop)/component/CategoryFilterChip";
import {
  categoryIconClass,
  getCategoryImageSrc,
} from "@/app/(shop)/component/category-display";
import {
  shopAllProductsHref,
  shopCategoryHref,
} from "@/app/(shop)/component/shop-category-links";

type CategoriesProps = Readonly<{
  activeSlug?: string;
}>;

function CategoryListItemRow({
  cat,
  activeSlug,
  depth = 0,
}: Readonly<{
  cat: CategoryListItem;
  activeSlug?: string;
  depth?: number;
}>) {
  const isActive = activeSlug === cat.slug;
  const activeChildren = cat.children.filter((c) => c.isActive);
  const imageSrc = getCategoryImageSrc(cat);

  return (
    <li
      className={
        depth > 0 ? "shop-category-list-item shop-category-list-item--sub" : "shop-category-list-item"
      }
    >
      <Link
        href={shopCategoryHref(cat.slug)}
        className={`shop-category-row${isActive ? " is-active" : ""}`}
        aria-current={isActive ? "page" : undefined}
      >
        <span className="shop-category-row-main">
          <span
            className={`shop-category-row-icon${
              imageSrc ? " shop-category-row-icon--img" : ""
            }`}
            aria-hidden="true"
          >
            {imageSrc ? (
              <img
                src={imageSrc}
                alt=""
                className="shop-category-row-icon-img"
                loading="lazy"
              />
            ) : (
              <i className={categoryIconClass(cat)} />
            )}
          </span>
          <span className="shop-category-row-text">
            <span className="shop-category-row-name">{cat.name}</span>
            {cat.description?.trim() && depth === 0 ? (
              <span className="shop-category-row-desc">{cat.description}</span>
            ) : null}
          </span>
        </span>
        <span className="shop-category-count">{cat.productCount}</span>
      </Link>

      {activeChildren.length > 0 ? (
        <ul className="shop-category-sublist list-unstyled mb-0">
          {activeChildren.map((child) => (
            <CategoryListItemRow
              key={child.id}
              cat={child}
              activeSlug={activeSlug}
              depth={depth + 1}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default async function Categories({ activeSlug }: CategoriesProps) {
  let items: CategoryListItem[] = [];
  let errorMessage: string | null = null;

  try {
    items = await fetchCategories();
  } catch (err) {
    errorMessage =
      err instanceof Error ? err.message : "Could not load categories.";
  }

  const visible = items.filter((c) => c.isActive);
  const isAllActive = !activeSlug?.trim();
  const totalProducts = visible.reduce((sum, c) => sum + c.productCount, 0);

  const listContent =
    errorMessage ? (
      <p className="shop-category-empty text-danger mb-0" role="alert">
        {errorMessage}
      </p>
    ) : visible.length === 0 ? (
      <p className="shop-category-empty text-muted mb-0">No categories found.</p>
    ) : (
      <ul className="shop-category-list list-unstyled mb-0">
        {visible.map((cat) => (
          <CategoryListItemRow key={cat.id} cat={cat} activeSlug={activeSlug} />
        ))}
      </ul>
    );

  return (
    <>
      <div className="col-12 d-lg-none shop-category-chips-wrap px-0">
        <nav className="shop-category-chips" aria-label="Browse by category">
          <div className="shop-category-chips-scroll">
            <CategoryFilterChip
              href={shopAllProductsHref()}
              label="All"
              count={totalProducts > 0 ? totalProducts : undefined}
              active={isAllActive}
            />
            {visible.map((cat) => (
              <CategoryFilterChip
                key={cat.id}
                href={shopCategoryHref(cat.slug)}
                label={cat.name}
                count={cat.productCount}
                active={activeSlug === cat.slug}
                imageSrc={getCategoryImageSrc(cat)}
              />
            ))}
          </div>
        </nav>
      </div>

      <aside className="col-lg-3 d-none d-lg-block shop-category-sidebar-col">
        <div className="shop-category-panel">
          <header className="shop-category-panel-head">
            <h2 className="shop-category-panel-title">Categories</h2>
            <p className="shop-category-panel-sub mb-0">
              Filter products by category
            </p>
          </header>

          <Link
            href={shopAllProductsHref()}
            className={`shop-category-all-link${isAllActive ? " is-active" : ""}`}
            aria-current={isAllActive ? "page" : undefined}
          >
            <i className="fas fa-th-large me-2" aria-hidden="true" />
            All products
            {totalProducts > 0 ? (
              <span className="shop-category-count ms-auto">{totalProducts}</span>
            ) : null}
          </Link>

          <div className="shop-category-panel-body">{listContent}</div>
        </div>
      </aside>
    </>
  );
}
