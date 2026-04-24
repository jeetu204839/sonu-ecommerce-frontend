import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  fetchProductDetail,
  galleryImagesFromProduct,
  type ProductDetailDto,
} from "@/lib/api/products";

import ProductEnquiryModal from "./ProductEnquiryModal";
import ProductGallery from "./ProductGallery";

type PageProps = Readonly<{
  searchParams: Promise<{
    slug?: string;
    enquiryThanks?: string;
    enquiryError?: string;
  }>;
}>;

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const sp = await searchParams;
  const slug = sp.slug?.trim();
  if (!slug) {
    return {
      title: "Product detail | Ray Enterprises",
      description: "Browse product specifications and request a quote.",
    };
  }

  const { product } = await fetchProductDetail(slug);
  if (!product) {
    return { title: "Product not found | Ray Enterprises" };
  }

  const description =
    product.metaDescription?.trim() ||
    product.shortDescription?.trim() ||
    product.longDescription?.trim() ||
    `Buy ${product.name} online.`;

  return {
    title: `${product.metaTitle?.trim() || product.name} | Ray Enterprises`,
    description,
  };
}

function stockLabel(stockStatus: string): string {
  const s = stockStatus.toUpperCase();
  if (s === "IN_STOCK") return "In stock";
  if (s === "OUT_OF_STOCK") return "Out of stock";
  return stockStatus.replaceAll("_", " ").toLowerCase();
}

function specRows(product: ProductDetailDto) {
  const rows: { label: string; value: string }[] = [
    { label: "SKU", value: product.sku },
    {
      label: "Weight",
      value: `${product.weight} ${product.weightUnit}`,
    },
    {
      label: "Dimensions (L × W × H)",
      value: `${product.length} ${product.lengthUnit} × ${product.width} ${product.widthUnit} × ${product.height} ${product.heightUnit}`,
    },
    { label: "Category", value: product.category.name },
    {
      label: "Seller",
      value: product.vendor.isVerified
        ? `${product.vendor.storeName} (verified)`
        : product.vendor.storeName,
    },
    { label: "Stock on hand", value: String(product.stock) },
    { label: "Availability", value: stockLabel(product.stockStatus) },
  ];

  for (const row of product.attributes ?? []) {
    const options = row.attribute?.map((a) => a.name).filter(Boolean) ?? [];
    if (row.value && options.length) {
      rows.push({ label: row.value, value: options.join(", ") });
    }
  }

  return rows;
}

export default async function DetailsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const slug = sp.slug?.trim();
  const enquiryThanks = sp.enquiryThanks === "1";
  const enquiryError = sp.enquiryError === "1";

  if (!slug) {
    return (
      <div className="container-fluid page-header py-4 py-lg-5">
        <div className="container text-center text-white">
          <h1 className="display-6 fw-bold mb-3 text-white">Product detail</h1>
          <p className="text-white-50 mb-4">
            Open a product from the shop to see its full listing.
          </p>
          <Link
            href="/shop"
            className="btn btn-light btn-lg rounded-pill px-4 fw-semibold"
          >
            Go to shop
          </Link>
        </div>
      </div>
    );
  }

  const { product, message } = await fetchProductDetail(slug);
  if (!product) {
    notFound();
  }

  const images = galleryImagesFromProduct(product);
  const detailUrl = `/details?slug=${encodeURIComponent(product.slug)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: images.map((i) => i.src),
    sku: product.sku,
    brand: { "@type": "Brand", name: product.vendor.storeName },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability:
        product.stockStatus === "IN_STOCK"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: detailUrl,
    },
  };

  const overviewText =
    product.longDescription?.trim() ||
    product.shortDescription?.trim() ||
    "Full description will appear here when provided by the seller.";

  const badge = product.isFeatured
    ? "Featured"
    : product.category.name;

  const related = [
    {
      href: "/shop",
      img: "/img/check-valve.webp",
      title: "CI check valve — handi",
      price: "₹2,499",
    },
    {
      href: "/shop",
      img: "/img/hose-nipple.webp",
      title: "CI hose nipple",
      price: "₹349",
    },
    {
      href: "/shop",
      img: "/img/pipe-hooks.webp",
      title: 'GI J-shape pipe hook — 4"',
      price: "₹189",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-fluid page-header py-4 py-lg-5">
        <div className="container text-center text-white">
          <h1 className="display-6 fw-bold mb-3 text-white">Product detail</h1>
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link href="/" className="text-white text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/shop" className="text-white text-decoration-none">
                  Shop
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link
                  href={`/shop?category=${encodeURIComponent(product.category.slug)}`}
                  className="text-white text-decoration-none"
                >
                  {product.category.name}
                </Link>
              </li>
              <li
                className="breadcrumb-item active text-white-50"
                aria-current="page"
              >
                {product.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container py-5">
        {enquiryThanks ? (
          <div
            className="alert alert-success border-0 shadow-sm mb-4"
            role="status"
          >
            <i className="fas fa-check-circle me-2" aria-hidden="true" />
            Thank you—your enquiry has been received. We will get back to you
            shortly.
          </div>
        ) : null}
        {enquiryError ? (
          <div className="alert alert-warning border-0 shadow-sm mb-4" role="alert">
            <i className="fas fa-exclamation-triangle me-2" aria-hidden="true" />
            Please fill in your name, email, contact number, and description so we
            can assist you.
          </div>
        ) : null}

        <div className="row g-4 g-xl-5 align-items-start">
          <div className="col-lg-6">
            <ProductGallery images={images} productName={product.name} />
          </div>

          <div className="col-lg-6">
            <span className="badge bg-secondary text-dark mb-2">{badge}</span>
            <h2 className="h2 text-primary mb-2">{product.name}</h2>
            <p className="text-muted small mb-1">
              SKU: <span className="text-dark">{product.sku}</span>
            </p>
            <div className="fs-3 fw-bold text-dark mb-3 d-flex flex-wrap align-items-baseline gap-2">
              <span>₹{product.price.toLocaleString("en-IN")}</span>
              {product.mrp > product.price ? (
                <>
                  <span className="fs-6 fw-normal text-muted text-decoration-line-through">
                    ₹{product.mrp.toLocaleString("en-IN")}
                  </span>
                  <span className="fs-6 fw-semibold text-success">
                    {product.discountPercent}% off
                  </span>
                </>
              ) : null}
              <span className="fs-6 fw-normal text-muted w-100">
                incl. GST where applicable
              </span>
            </div>

            {product.shortDescription?.trim() ? (
              <p className="text-secondary mb-4">{product.shortDescription}</p>
            ) : null}

            <ul className="text-secondary small mb-4 ps-3">
              <li>
                Sold by{" "}
                <span className="fw-semibold text-dark">
                  {product.vendor.storeName}
                </span>
                {product.vendor.isVerified ? " (verified store)" : ""}.
              </li>
              <li>Category: {product.category.name}.</li>
              <li>
                Availability:{" "}
                <span className="text-dark">{stockLabel(product.stockStatus)}</span>
                {product.stock > 0
                  ? ` — ${product.stock} unit(s) available.`
                  : "."}
              </li>
            </ul>

            <div className="d-flex flex-column flex-sm-row flex-wrap gap-3 align-items-stretch align-items-sm-end mb-3">
              <div>
                <label
                  htmlFor="qty"
                  className="form-label small fw-semibold mb-1 text-secondary"
                >
                  Quantity
                </label>
                <input
                  id="qty"
                  type="number"
                  min={1}
                  max={product.stock > 0 ? product.stock : undefined}
                  defaultValue={1}
                  className="form-control border-secondary"
                  style={{ width: "5.5rem" }}
                />
              </div>
              <div
                className="d-flex flex-column gap-2 flex-grow-1"
                style={{ minWidth: "min(100%, 18rem)" }}
              >
                <div className="d-inline-flex flex-column align-items-stretch align-items-sm-start gap-2">
                  <ProductEnquiryModal
                    productSlug={product.slug}
                    productName={product.name}
                    productSku={product.sku}
                  />
                  <Link
                    href={`/contact?sku=${encodeURIComponent(product.sku)}`}
                    className="small text-muted text-center text-sm-start align-self-center align-self-sm-start"
                  >
                    Prefer the full contact page?
                  </Link>
                </div>
                <span className="small text-muted text-center text-sm-start">
                  Share your requirement—we will quote availability &amp; freight.
                </span>
              </div>
              <button
                type="button"
                className="btn btn-outline-secondary px-4 py-3 rounded-pill align-self-sm-center"
                aria-label="Save to list"
              >
                <i className="far fa-heart me-2" aria-hidden="true" />
                Save
              </button>
            </div>

            <p className="small text-success mb-0">
              <i className="fas fa-truck me-1" aria-hidden="true" />
              {message}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <ul className="nav nav-pills mb-4 gap-2 flex-wrap" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active rounded-pill px-4"
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
                className="nav-link rounded-pill px-4"
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
                className="nav-link rounded-pill px-4"
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

          <div className="tab-content border border-secondary rounded p-4 p-lg-5 bg-white">
            <div
              className="tab-pane fade show active"
              id="pane-desc"
              role="tabpanel"
              aria-labelledby="tab-desc"
            >
              <h3 className="h5 text-primary mb-3">Product overview</h3>
              <p className="text-secondary mb-0" style={{ whiteSpace: "pre-wrap" }}>
                {overviewText}
              </p>
            </div>

            <div
              className="tab-pane fade"
              id="pane-spec"
              role="tabpanel"
              aria-labelledby="tab-spec"
            >
              <h3 className="h5 text-primary mb-3">Technical specifications</h3>
              <div className="table-responsive">
                <table className="table table-bordered table-striped mb-0">
                  <tbody>
                    {specRows(product).map((row, idx) => (
                      <tr key={`${idx}-${row.label}`}>
                        <th className="w-25 bg-light">{row.label}</th>
                        <td>{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {product.category.description?.trim() ? (
                <p className="small text-muted mt-3 mb-0">
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
              <h3 className="h5 text-primary mb-3">Shipping &amp; returns</h3>
              <ul className="text-secondary mb-0 ps-3">
                <li className="mb-2">
                  Freight is quoted by weight/volume and destination pin code;
                  heavy consignments may ship LTL.
                </li>
                <li className="mb-2">
                  Inspect the crate on delivery; note visible damage on the POD
                  before signing.
                </li>
                <li>
                  Returns for industrial goods are limited to wrong SKU shipped
                  or manufacturing defect reported within your published
                  window—publish your exact policy in the footer or legal pages.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-top border-secondary">
          <h3 className="h4 text-primary mb-4">You may also need</h3>
          <div className="row g-4">
            {related.map((p) => (
              <div key={p.title} className="col-6 col-md-4">
                <Link
                  href={p.href}
                  className="text-decoration-none text-dark d-block h-100"
                >
                  <div className="border border-secondary rounded overflow-hidden h-100 fruite-item">
                    <div className="fruite-img bg-light position-relative ratio ratio-4x3">
                      <Image
                        src={p.img}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="p-3">
                      <div className="fw-semibold small mb-1">{p.title}</div>
                      <div className="text-primary fw-bold">{p.price}</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
