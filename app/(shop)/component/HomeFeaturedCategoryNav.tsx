import Link from "next/link";

import type { CategoryListItem } from "@/lib/api/categories";

import CategoryFilterChip from "@/app/(shop)/component/CategoryFilterChip";
import {
  categoryIconClass,
  getCategoryImageSrc,
} from "@/app/(shop)/component/category-display";
import {
  homeAllProductsHref,
  homeCategoryHref,
} from "@/app/(shop)/component/home-category-links";

type HomeFeaturedCategoryNavProps = Readonly<{
  categories: CategoryListItem[];
  activeSlug?: string;
}>;

function CategoryCardMedia({ cat }: Readonly<{ cat: CategoryListItem }>) {
  const imgSrc = getCategoryImageSrc(cat);

  if (imgSrc) {
    return (
      <img
        src={imgSrc}
        alt=""
        className="home-category-card-img"
        loading="lazy"
      />
    );
  }

  return (
    <span className="home-category-card-icon" aria-hidden="true">
      <i className={categoryIconClass(cat)} />
    </span>
  );
}

function HomeCategoryCard({
  cat,
  active,
}: Readonly<{
  cat: CategoryListItem;
  active: boolean;
}>) {
  return (
    <Link
      href={homeCategoryHref(cat.slug)}
      scroll={false}
      className={`home-category-card${active ? " is-active" : ""}`}
      aria-current={active ? "page" : undefined}
    >
      <span className="home-category-card-media">
        <CategoryCardMedia cat={cat} />
      </span>
      <span className="home-category-card-body">
        <span className="home-category-card-name">{cat.name}</span>
        {cat.productCount > 0 ? (
          <span className="home-category-card-meta">
            {cat.productCount} products
          </span>
        ) : null}
      </span>
    </Link>
  );
}

export default function HomeFeaturedCategoryNav({
  categories,
  activeSlug,
}: HomeFeaturedCategoryNavProps) {
  const visible = categories.filter((c) => c.isActive);
  if (visible.length === 0) return null;

  const isAllActive = !activeSlug?.trim();
  const totalProducts = visible.reduce((sum, c) => sum + c.productCount, 0);

  return (
    <div className="home-category-nav">
      <nav
        className="home-category-chips"
        aria-label="Filter products by category"
      >
        <div className="shop-category-chips-scroll home-category-chips-scroll">
          <CategoryFilterChip
            href={homeAllProductsHref()}
            label="All Products"
            count={totalProducts > 0 ? totalProducts : undefined}
            active={isAllActive}
            scroll={false}
          />
          {visible.map((cat) => (
            <CategoryFilterChip
              key={cat.id}
              href={homeCategoryHref(cat.slug)}
              label={cat.name}
              count={cat.productCount}
              active={activeSlug === cat.slug}
              scroll={false}
              imageSrc={getCategoryImageSrc(cat)}
            />
          ))}
        </div>
      </nav>

      <nav className="home-category-grid" aria-label="Shop by category">
        <Link
          href={homeAllProductsHref()}
          scroll={false}
          className={`home-category-card home-category-card--all${
            isAllActive ? " is-active" : ""
          }`}
          aria-current={isAllActive ? "page" : undefined}
        >
          <span className="home-category-card-media">
            <span className="home-category-card-icon" aria-hidden="true">
              <i className="fas fa-th-large" />
            </span>
          </span>
          <span className="home-category-card-body">
            <span className="home-category-card-name">All Products</span>
            {totalProducts > 0 ? (
              <span className="home-category-card-meta">
                {totalProducts} products
              </span>
            ) : null}
          </span>
        </Link>

        {visible.map((cat) => (
          <HomeCategoryCard
            key={cat.id}
            cat={cat}
            active={activeSlug === cat.slug}
          />
        ))}
      </nav>
    </div>
  );
}
