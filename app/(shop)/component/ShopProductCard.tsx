import Link from "next/link";
import Image from "next/image";

import type { ShopProductCard as ShopProductCardData } from "@/lib/api/products";

type ShopProductCardProps = Readonly<{
  product: ShopProductCardData;
  categoryLabel?: string;
  showCategoryBadge?: boolean;
}>;

function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    amount,
  );
}

export default function ShopProductCard({
  product,
  categoryLabel,
  showCategoryBadge = false,
}: ShopProductCardProps) {
  const detailHref = `/details/${encodeURIComponent(product.slug)}`;

  return (
    <article className="fruite-item shop-product-tile h-100 position-relative">
      <Link
        href={detailHref}
        className="shop-product-tile-link text-decoration-none text-reset d-flex flex-column h-100"
        aria-label={`View ${product.name}`}
      >
        <div className="shop-product-tile-media fruite-img">
          {/* <img
            src={product.imageSrc}
            className="shop-product-tile-img"
            alt=""
          /> */}
          <Image
            src={product.imageSrc}
            alt={product.name || "product image"}
            width={400}
            height={400}
            className="shop-product-tile-img"
          />
          {showCategoryBadge && categoryLabel ? (
            <span className="shop-product-category-badge">{categoryLabel}</span>
          ) : null}
        </div>

        <div className="shop-product-tile-body">
          <h3 className="shop-product-tile-title">{product.name}</h3>

          {product.excerpt.trim() ? (
            <p className="shop-product-tile-excerpt">{product.excerpt}</p>
          ) : null}

          <div className="shop-product-tile-pricing">
            <div className="shop-product-price-row">
              <span className="shop-product-price">
                ₹{formatInr(product.price)}
              </span>
              {product.mrp > product.price ? (
                <span className="shop-product-mrp">₹{formatInr(product.mrp)}</span>
              ) : null}
            </div>
            {product.discountPercent > 0 ? (
              <span className="shop-product-discount">
                {product.discountPercent}% off
              </span>
            ) : null}
          </div>

          <span className="shop-product-tile-cta d-none d-md-inline-flex">
            View details
          </span>
        </div>
      </Link>
    </article>
  );
}
