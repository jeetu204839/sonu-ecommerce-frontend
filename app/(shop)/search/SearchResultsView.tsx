import Link from "next/link";

import type {
  FetchProductSearchResult,
  ProductsPagination,
  SearchProductTableRow,
} from "@/lib/api/products";

import SearchHeroForm from "../SearchHeroForm";

export function stockLabel(stockStatus: string): string {
  const s = stockStatus.toUpperCase();
  if (s === "IN_STOCK") return "In stock";
  if (s === "OUT_OF_STOCK") return "Out of stock";
  if (stockStatus === "—") return "—";
  return stockStatus.replaceAll("_", " ");
}

function pageHref(resultBasePath: string, p: number): string {
  return p <= 1 ? resultBasePath : `${resultBasePath}?page=${p}`;
}

/** Page numbers with ellipses for large page counts. */
function buildPageItems(
  current: number,
  total: number,
): Array<
  { kind: "page"; n: number } | { kind: "ellipsis"; id: string }
> {
  if (total <= 1) return [];
  if (total <= 9) {
    return Array.from({ length: total }, (_, i) => ({
      kind: "page" as const,
      n: i + 1,
    }));
  }

  let ellipsisSeq = 0;
  const out: Array<
    { kind: "page"; n: number } | { kind: "ellipsis"; id: string }
  > = [];
  const pushPage = (n: number) => out.push({ kind: "page", n });
  const pushEllipsis = () => {
    const last = out.at(-1);
    if (last?.kind === "ellipsis") return;
    ellipsisSeq += 1;
    out.push({ kind: "ellipsis", id: `gap-${ellipsisSeq}` });
  };

  pushPage(1);
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  if (left > 2) pushEllipsis();
  for (let p = left; p <= right; p += 1) {
    pushPage(p);
  }
  if (right < total - 1) pushEllipsis();
  pushPage(total);
  return out;
}

export function SearchPagination({
  resultBasePath,
  pagination,
  totalPages,
}: Readonly<{
  resultBasePath: string;
  pagination: ProductsPagination;
  totalPages: number;
}>) {
  if (totalPages <= 1) return null;

  const prev = pagination.previous_page;
  const next = pagination.next_page;
  const currentPage = pagination.current_page;
  const totalCount = pagination.total_count;
  const perPage = pagination.per_page;
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalCount);
  const pageItems = buildPageItems(currentPage, totalPages);

  const segmentClass =
    "d-inline-flex align-items-center justify-content-center px-2 px-sm-3 py-2 text-nowrap small border-start border-secondary-subtle text-decoration-none text-dark";
  const segmentFirst = segmentClass.replace(" border-start border-secondary-subtle", "");

  function pageNumberSegment(item: (typeof pageItems)[number]) {
    if (item.kind === "ellipsis") {
      return (
        <span
          key={item.id}
          className={`${segmentClass} bg-light text-muted user-select-none`}
        >
          …
        </span>
      );
    }
    if (item.n === currentPage) {
      return (
        <span
          key={item.n}
          className={`${segmentClass} bg-primary text-white fw-semibold border-secondary`}
          aria-current="page"
        >
          {item.n}
        </span>
      );
    }
    return (
      <Link
        key={item.n}
        className={`${segmentClass} bg-white link-primary fw-medium`}
        href={pageHref(resultBasePath, item.n)}
        scroll={false}
      >
        {item.n}
      </Link>
    );
  }

  return (
    <div className="mt-4 pt-4 border-top border-secondary-subtle">
      <div className="d-flex flex-column gap-3">
        <p className="small text-secondary mb-0 text-center text-lg-start">
          <span className="text-dark fw-semibold">
            Showing {startItem}–{endItem}
          </span>{" "}
          of{" "}
          <span className="text-dark fw-semibold">
            {totalCount.toLocaleString("en-IN")}
          </span>{" "}
          products
          <span className="text-muted d-none d-sm-inline">
            {" "}
            · Page {currentPage} of {totalPages}
          </span>
        </p>

        <div className="d-flex justify-content-center justify-content-lg-end w-100 overflow-hidden">
          <nav className="flex-shrink-0" aria-label="Search results pagination">
            <div
              className="d-flex flex-row flex-nowrap align-items-stretch shadow-sm rounded-3 overflow-hidden border border-secondary-subtle bg-white"
              style={{ maxWidth: "100%" }}
            >
              {currentPage > 1 ? (
                <Link
                  className={`${segmentFirst} bg-white link-primary fw-medium`}
                  href={pageHref(resultBasePath, 1)}
                  scroll={false}
                >
                  <span className="d-none d-sm-inline">First</span>
                  <span className="d-sm-none" aria-hidden="true">
                    «
                  </span>
                </Link>
              ) : (
                <span
                  className={`${segmentFirst} bg-light text-muted user-select-none pointer-events-none`}
                  aria-disabled="true"
                >
                  <span className="d-none d-sm-inline">First</span>
                  <span className="d-sm-none" aria-hidden="true">
                    «
                  </span>
                </span>
              )}

              {typeof prev === "number" ? (
                <Link
                  className={`${segmentClass} bg-white link-primary fw-medium`}
                  href={pageHref(resultBasePath, prev)}
                  scroll={false}
                >
                  <span className="d-none d-sm-inline">Prev</span>
                  <span className="d-sm-none" aria-hidden="true">
                    ‹
                  </span>
                </Link>
              ) : (
                <span
                  className={`${segmentClass} bg-light text-muted user-select-none pointer-events-none`}
                  aria-disabled="true"
                >
                  <span className="d-none d-sm-inline">Prev</span>
                  <span className="d-sm-none" aria-hidden="true">
                    ‹
                  </span>
                </span>
              )}

              <div className="d-none d-sm-flex flex-row flex-nowrap align-items-stretch overflow-x-auto">
                {pageItems.map((item) => pageNumberSegment(item))}
              </div>

              <span
                className={`${segmentClass} d-sm-none bg-primary text-white fw-semibold px-3`}
                aria-current="page"
              >
                {currentPage}/{totalPages}
              </span>

              {typeof next === "number" ? (
                <Link
                  className={`${segmentClass} bg-white link-primary fw-medium`}
                  href={pageHref(resultBasePath, next)}
                  scroll={false}
                >
                  <span className="d-none d-sm-inline">Next</span>
                  <span className="d-sm-none" aria-hidden="true">
                    ›
                  </span>
                </Link>
              ) : (
                <span
                  className={`${segmentClass} bg-light text-muted user-select-none pointer-events-none`}
                  aria-disabled="true"
                >
                  <span className="d-none d-sm-inline">Next</span>
                  <span className="d-sm-none" aria-hidden="true">
                    ›
                  </span>
                </span>
              )}

              {currentPage < totalPages ? (
                <Link
                  className={`${segmentClass} bg-white link-primary fw-medium`}
                  href={pageHref(resultBasePath, totalPages)}
                  scroll={false}
                >
                  <span className="d-none d-sm-inline">Last</span>
                  <span className="d-sm-none" aria-hidden="true">
                    »
                  </span>
                </Link>
              ) : (
                <span
                  className={`${segmentClass} bg-light text-muted user-select-none pointer-events-none`}
                  aria-disabled="true"
                >
                  <span className="d-none d-sm-inline">Last</span>
                  <span className="d-sm-none" aria-hidden="true">
                    »
                  </span>
                </span>
              )}
            </div>
          </nav>
        </div>
      </div>

      <p className="small text-muted text-center d-sm-none mb-0 mt-2">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
}

type SearchResultsViewProps = Readonly<{
  term: string;
  resultBasePath: string;
  data: FetchProductSearchResult;
}>;

export default function SearchResultsView({
  term,
  resultBasePath,
  data,
}: SearchResultsViewProps) {
  const { rows, pagination, message } = data;
  const totalCount = pagination?.total_count ?? rows.length;
  const totalPages = pagination?.total_pages ?? 1;

  return (
    <>
      <div className="container-fluid page-header py-4 py-lg-5">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-5 text-center text-lg-start text-white">
              <h1 className="display-6 fw-bold mb-2 text-white">
                Product search
              </h1>
              <p className="text-white-50 mb-0 small">
                Find cast iron parts, pumps, and industrial supplies.
              </p>
            </div>
            <div className="col-lg-7">
              <div className="mx-auto" style={{ maxWidth: "36rem" }}>
                <SearchHeroForm initialQuery={term} className="ms-lg-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4 py-lg-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
          <div>
            <h2 className="h5 text-primary mb-1">Search results</h2>
            <p className="text-secondary small mb-0">
              {term ? (
                <>
                  <span className="fw-semibold text-dark">{totalCount}</span>{" "}
                  match{totalCount === 1 ? "" : "es"} for{" "}
                  <span className="fw-semibold text-dark">&ldquo;{term}&rdquo;</span>
                </>
              ) : (
                <>
                  <span className="fw-semibold text-dark">{totalCount}</span>{" "}
                  product{totalCount === 1 ? "" : "s"} on this page. Use the search
                  box to filter by keyword.
                </>
              )}
            </p>
          </div>
          <Link
            href="/"
            className="btn btn-outline-secondary btn-sm rounded-pill px-3"
          >
            Back to home
          </Link>
        </div>

        <div className="card border border-secondary shadow-sm overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 small">
              <thead className="table-light text-secondary text-uppercase">
                <tr style={{ fontSize: "0.7rem", letterSpacing: "0.04em" }}>
                  <th scope="col" className="ps-3 py-3 border-secondary">
                    Product
                  </th>
                  <th
                    scope="col"
                    className="py-3 border-secondary d-none d-md-table-cell"
                  >
                    SKU
                  </th>
                  <th
                    scope="col"
                    className="py-3 border-secondary d-none d-lg-table-cell"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="py-3 border-secondary d-none d-xl-table-cell"
                  >
                    Seller
                  </th>
                  <th
                    scope="col"
                    className="py-3 border-secondary text-end d-none d-md-table-cell"
                  >
                    MRP
                  </th>
                  <th scope="col" className="py-3 border-secondary text-end">
                    Price
                  </th>
                  <th
                    scope="col"
                    className="py-3 border-secondary text-center d-none d-lg-table-cell"
                  >
                    Stock
                  </th>
                  <th scope="col" className="pe-3 py-3 border-secondary text-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.length ? (
                  rows.map((row: SearchProductTableRow) => (
                    <tr key={row.id} className="border-secondary">
                      <td className="ps-3 py-3">
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="flex-shrink-0 rounded border bg-light overflow-hidden"
                            style={{ width: "56px", height: "56px" }}
                          >
                            <img
                              src={row.imageSrc}
                              alt=""
                              className="w-100 h-100"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          <div className="min-w-0">
                            <Link
                              href={`/details/${encodeURIComponent(row.slug.trim())}`}
                              className="fw-semibold text-dark text-decoration-none d-block text-truncate"
                              style={{ maxWidth: "16rem" }}
                            >
                              {row.name}
                            </Link>
                            <div className="text-muted text-truncate d-md-none mt-1">
                              {row.sku}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-secondary d-none d-md-table-cell">
                        {row.sku}
                      </td>
                      <td className="py-3 d-none d-lg-table-cell">
                        {row.categoryName}
                      </td>
                      <td className="py-3 d-none d-xl-table-cell">
                        <span className="text-dark">{row.vendorName}</span>
                        {row.vendorVerified ? (
                          <span className="badge bg-success ms-1 align-middle">
                            Verified
                          </span>
                        ) : null}
                      </td>
                      <td className="py-3 text-end text-muted text-decoration-line-through d-none d-md-table-cell">
                        ₹{row.mrp.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 text-end">
                        <span className="fw-bold text-dark">
                          ₹{row.price.toLocaleString("en-IN")}
                        </span>
                        {row.discountPercent > 0 ? (
                          <div className="text-success small">
                            {row.discountPercent}% off
                          </div>
                        ) : null}
                      </td>
                      <td className="py-3 text-center small d-none d-lg-table-cell">
                        {stockLabel(row.stockStatus)}
                      </td>
                      <td className="pe-3 py-3 text-end">
                        <Link
                          href={`/details/${encodeURIComponent(row.slug.trim())}`}
                          className="btn btn-sm btn-outline-primary rounded-pill px-3"
                        >
                          Get quote
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-5 text-center text-secondary">
                      {term
                        ? message ||
                          "No listings match your search. Try another keyword."
                        : message ||
                          "No products returned. Try a keyword or check the API."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {pagination ? (
          <SearchPagination
            resultBasePath={resultBasePath}
            pagination={pagination}
            totalPages={totalPages}
          />
        ) : null}
      </div>
    </>
  );
}
