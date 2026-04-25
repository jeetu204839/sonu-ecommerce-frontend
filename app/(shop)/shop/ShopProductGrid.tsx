import Link from "next/link";
import type {
  ProductsPagination,
  ShopProductCard,
} from "@/lib/api/products";

function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function shopHref(categorySlug: string | undefined, page: number): string {
  const q = new URLSearchParams();
  q.set("page", String(page));
  if (categorySlug) q.set("category", categorySlug);
  return `/shop?${q.toString()}`;
}

type Props = Readonly<{
  products: ShopProductCard[];
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
      <div className="col-lg-9">
        <p className="text-muted px-2">{message}</p>
      </div>
    );
  }

  return (
    <div className="col-lg-9">
      <div className="row g-4 justify-content-center">
        {products.map((p) => (
          <div key={p.id} className="col-6 col-md-6 col-lg-6 col-xl-4">
            <div className="rounded position-relative fruite-item h-100 d-flex flex-column">
              <div className="fruite-img">
                <Link
                  href={`/details/${encodeURIComponent(p.slug)}`}
                  className="d-block"
                >
                  <img
                    src={p.imageSrc}
                    className="img-fluid w-100 rounded-top"
                    alt={p.name}
                  />
                </Link>
              </div>
              <div className="p-4 border border-secondary border-top-0 rounded-bottom flex-grow-1 d-flex flex-column">
                <h4 className="h5">
                  <Link
                    href={`/details/${encodeURIComponent(p.slug)}`}
                    className="text-dark text-decoration-none"
                  >
                    {p.name}
                  </Link>
                </h4>
                {p.excerpt.trim() ? (
                  <p className="small text-muted flex-grow-1">{p.excerpt}</p>
                ) : null}
                <div className="d-flex justify-content-between flex-lg-wrap align-items-center gap-2 mt-auto">
                  <div>
                    <p className="text-dark fs-5 fw-bold mb-0">
                      {formatInr(p.price)}
                      {p.mrp > p.price ? (
                        <span className="text-muted text-decoration-line-through small ms-2">
                          {formatInr(p.mrp)}
                        </span>
                      ) : null}
                    </p>
                    {p.discountPercent > 0 ? (
                      <span className="badge bg-success small">
                        {p.discountPercent}% off
                      </span>
                    ) : null}
                  </div>
                  <Link
                    href={`/details/${encodeURIComponent(p.slug)}`}
                    className="btn border border-secondary rounded-pill px-3 text-primary d-inline-flex align-items-center gap-2"
                  >
                    <span>View Details</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {pg && pg.total_pages > 1 ? (
        <nav
          className="d-flex justify-content-center align-items-center gap-3 mt-4 pt-2"
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
