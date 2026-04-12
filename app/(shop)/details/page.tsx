import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import ProductGallery from "./ProductGallery";

const PRODUCT = {
  name: "India Mark 2 Cast Iron Hand Pump — Complete Unit",
  sku: "RE-HP-IM2-001",
  price: 12499,
  currency: "INR",
  badge: "BIS-aligned hardware",
  shortLead: "Usually ships in 3–5 business days",
  images: [
    {
      src: "/img/india-mark-2-hand-pump.webp",
      alt: "India Mark 2 hand pump — front three-quarter view",
    },
    {
      src: "/img/cast-iron-hand-pump.webp",
      alt: "Cast iron hand pump body and handle assembly",
    },
    {
      src: "/img/hand-pump-cylinder.webp",
      alt: "Cylinder and plunger components detail",
    },
    {
      src: "/img/hand-pump-gi-pipes.webp",
      alt: "GI pipe connections included in kit context",
    },
  ],
};

export const metadata: Metadata = {
  title: `${PRODUCT.name} | Ray Enterprises`,
  description:
    "Full specifications for India Mark 2 compatible cast iron hand pump — rural water supply, deep-well ready hardware, factory-checked components.",
};

export default function DetailsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: PRODUCT.name,
    image: PRODUCT.images.map((i) => i.src),
    sku: PRODUCT.sku,
    brand: { "@type": "Brand", name: "Ray Enterprises" },
    offers: {
      "@type": "Offer",
      priceCurrency: PRODUCT.currency,
      price: PRODUCT.price,
      availability: "https://schema.org/InStock",
      url: "/details",
    },
  };

  const related = [
    {
      href: "/details",
      img: "/img/check-valve.webp",
      title: "CI check valve — handi",
      price: "₹2,499",
    },
    {
      href: "/details",
      img: "/img/hose-nipple.webp",
      title: "CI hose nipple",
      price: "₹349",
    },
    {
      href: "/details",
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
                <span className="text-white-50">Shop</span>
              </li>
              <li
                className="breadcrumb-item active text-white-50"
                aria-current="page"
              >
                {PRODUCT.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4 g-xl-5 align-items-start">
          <div className="col-lg-6">
            <ProductGallery
              images={PRODUCT.images}
              productName={PRODUCT.name}
            />
          </div>

          <div className="col-lg-6">
            <span className="badge bg-secondary text-dark mb-2">
              {PRODUCT.badge}
            </span>
            <h2 className="h2 text-primary mb-2">{PRODUCT.name}</h2>
            <p className="text-muted small mb-1">
              SKU: <span className="text-dark">{PRODUCT.sku}</span>
            </p>
            <p className="fs-3 fw-bold text-dark mb-3">
              ₹{PRODUCT.price.toLocaleString("en-IN")}{" "}
              <span className="fs-6 fw-normal text-muted">
                incl. GST where applicable
              </span>
            </p>

            <ul className="text-secondary small mb-4 ps-3">
              <li>
                Deep-well compatible when paired with correct riser pipes (sold
                separately).
              </li>
              <li>
                Cast iron body and proven lever geometry for daily community use.
              </li>
              <li>
                QC checklist: pressure seating, thread fit, and finish
                inspection.
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
                  defaultValue={1}
                  className="form-control border-secondary"
                  style={{ width: "5.5rem" }}
                />
              </div>
              <div className="d-flex flex-column gap-2 flex-grow-1" style={{ minWidth: "min(100%, 18rem)" }}>
                <Link
                  href={`/contact?sku=${encodeURIComponent(PRODUCT.sku)}`}
                  className="btn btn-primary btn-lg d-inline-flex align-items-center justify-content-center gap-2 px-4 px-xl-5 py-3 rounded-pill fw-semibold text-decoration-none shadow"
                  style={{ letterSpacing: "0.03em" }}
                >
                  <i className="fas fa-envelope-open-text" aria-hidden="true" />
                  Request enquiry
                </Link>
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
              {PRODUCT.shortLead}
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
              <p className="text-secondary mb-3">
                This listing is structured for buyers who need a dependable hand
                pump platform for bore-wells and open wells in rural and
                semi-urban installations. The assembly prioritizes
                serviceability: wearable parts are accessible without specialist
                tools, and threads are cut for compatibility with standard GI
                riser inventory carried by most dealers.
              </p>
              <p className="text-secondary mb-0">
                Use this page as your canonical product story: pair it with
                datasheets from your supplier, torque notes for flange joints,
                and any statutory certifications you hold—those PDFs can be
                linked from your CMS or admin later.
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
                    <tr>
                      <th className="w-25 bg-light">Material</th>
                      <td>Cast iron body; steel / GI hardware as per BOM</td>
                    </tr>
                    <tr>
                      <th className="bg-light">Typical discharge</th>
                      <td>
                        Subject to static head and cylinder pairing (refer pump
                        curve)
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-light">Handle / lever</th>
                      <td>Ergonomic lever; service bolt access on site</td>
                    </tr>
                    <tr>
                      <th className="bg-light">Threads / fit</th>
                      <td>
                        Standard pipe threads for dealer inventory; verify before
                        install
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-light">Finish</th>
                      <td>Anti-rust primer recommended for coastal storage</td>
                    </tr>
                    <tr>
                      <th className="bg-light">Packaging</th>
                      <td>
                        Wooden crate / strapped pallet — varies by dispatch lane
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="small text-muted mt-3 mb-0">
                Values are representative for ecommerce display. Replace with
                certified numbers from your test reports and supplier drawings.
              </p>
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
