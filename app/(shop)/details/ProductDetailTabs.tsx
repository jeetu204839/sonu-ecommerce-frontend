import type { ProductDetailDto } from "@/lib/api/products";

import { specRows } from "./product-detail-utils";

type ProductDetailTabsProps = Readonly<{
  product: ProductDetailDto;
  sellerName: string;
  sellerVerified: boolean;
}>;

function ProductOverviewContent({
  shortDescription,
  longDescription,
}: Readonly<{
  shortDescription: string | null;
  longDescription: string | null;
}>) {
  const long = longDescription?.trim() ?? "";
  const short = shortDescription?.trim() ?? "";
  const looksLikeHtml = /<[a-z][\s\S]*>/i.test(long);

  if (!long && !short) {
    return (
      <p className="text-secondary mb-0">
        Full description will appear here when provided by the seller.
      </p>
    );
  }

  return (
    <>
      {short ? (
        <p className="text-secondary fw-medium mb-3">{short}</p>
      ) : null}
      {long ? (
        looksLikeHtml ? (
          <div
            className="product-detail-html text-secondary mb-0"
            dangerouslySetInnerHTML={{ __html: long }}
          />
        ) : (
          <p className="text-secondary mb-0" style={{ whiteSpace: "pre-wrap" }}>
            {long}
          </p>
        )
      ) : null}
    </>
  );
}

export default function ProductDetailTabs({
  product,
  sellerName,
  sellerVerified,
}: ProductDetailTabsProps) {
  const rows = specRows(product, sellerName, sellerVerified);

  return (
    <div className="product-detail-tabs">
      <ul className="nav nav-pills product-detail-tab-nav" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="tab-desc"
            data-bs-toggle="pill"
            data-bs-target="#pane-desc"
            type="button"
            role="tab"
          >
            Overview
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="tab-spec"
            data-bs-toggle="pill"
            data-bs-target="#pane-spec"
            type="button"
            role="tab"
          >
            Specifications
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="tab-ship"
            data-bs-toggle="pill"
            data-bs-target="#pane-ship"
            type="button"
            role="tab"
          >
            Shipping &amp; returns
          </button>
        </li>
      </ul>

      <div className="tab-content product-detail-tab-panels">
        <div
          className="tab-pane fade show active"
          id="pane-desc"
          role="tabpanel"
          aria-labelledby="tab-desc"
        >
          <h3 className="product-detail-panel-title">Product overview</h3>
          <ProductOverviewContent
            shortDescription={product.shortDescription}
            longDescription={product.longDescription}
          />
        </div>

        <div
          className="tab-pane fade"
          id="pane-spec"
          role="tabpanel"
          aria-labelledby="tab-spec"
        >
          <h3 className="product-detail-panel-title">Technical specifications</h3>
          <div className="table-responsive">
            <table className="table product-detail-spec-table mb-0">
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {product.category.description?.trim() ? (
            <p className="product-detail-category-note mb-0">
              {product.category.description}
            </p>
          ) : null}
        </div>

        <div
          className="tab-pane fade"
          id="pane-ship"
          role="tabpanel"
          aria-labelledby="tab-ship"
        >
          <h3 className="product-detail-panel-title">Shipping &amp; returns</h3>
          <ul className="product-detail-shipping-list mb-0">
            <li>
              Freight is quoted by weight/volume and destination pin code; heavy
              consignments may ship LTL.
            </li>
            <li>
              Inspect the crate on delivery; note visible damage on the proof of
              delivery before signing.
            </li>
            <li>
              Returns for industrial goods are limited to wrong SKU shipped or
              manufacturing defect reported within your published window.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
