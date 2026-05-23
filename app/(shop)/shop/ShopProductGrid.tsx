import Link from "next/link";
import type {
  ProductsPagination,
  ShopProductCard as ShopProductCardData,
} from "@/lib/api/products";

import ShopProductCard from "@/app/(shop)/component/ShopProductCard";

function shopHref(categorySlug: string | undefined, page: number): string {
  const q = new URLSearchParams();
  q.set("page", String(page));
  if (categorySlug) q.set("category", categorySlug);
  return `/shop?${q.toString()}`;
}

type Props = Readonly<{
  products: ShopProductCardData[];
  pagination: ProductsPagination | null;
  message: string;
  categorySlug?: string;
}>;

export default function ShopProductGrid({
  products,
  pagination: pg,
  message,
  categorySlug,
}: Props) {
  const hasPrev = pg
    ? pg.previous_page !== null && pg.previous_page >= 1
    : false;
  const hasNext = pg ? pg.next_page !== null : false;

  if (products.length === 0) {
    return (
      <div className="col-lg-9 px-3 px-lg-0">
        <p className="text-muted mb-0">{message}</p>
      </div>
    );
  }

  return (
    <div className="col-lg-9 px-0 px-lg-3">
      <div className="row shop-product-grid g-0 g-md-3 g-lg-4 mx-0">
        {products.map((product) => (
          <div key={product.id} className="col-6 col-lg-6 col-xl-4">
            <ShopProductCard product={product} />
          </div>
        ))}
      </div>

      {pg && pg.total_pages > 1 ? (
        <nav
          className="d-flex justify-content-center align-items-center gap-3 mt-4 pt-2 px-3"
          aria-label="Product pagination"
        >
          {hasPrev && pg.previous_page !== null ? (
            <Link
              className="btn btn-outline-secondary rounded-pill px-4"
              href={shopHref(categorySlug, pg.previous_page)}
            >
              Previous
            </Link>
          ) : (
            <span className="btn btn-outline-secondary rounded-pill px-4 disabled opacity-50">
              Previous
            </span>
          )}
          <span className="text-muted small">
            Page {pg.current_page} of {pg.total_pages}
          </span>
          {hasNext && pg.next_page !== null ? (
            <Link
              className="btn btn-outline-secondary rounded-pill px-4"
              href={shopHref(categorySlug, pg.next_page)}
            >
              Next
            </Link>
          ) : (
            <span className="btn btn-outline-secondary rounded-pill px-4 disabled opacity-50">
              Next
            </span>
          )}
        </nav>
      ) : null}
    </div>
  );
}
