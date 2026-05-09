import Link from "next/link";

import type { AdminProductRow } from "@/lib/admin/product";
import { resolveProductImageUrl } from "@/lib/api/products";

type Props = Readonly<{
  product: AdminProductRow;
}>;

function formatDate(dateIso?: string | null): string {
  if (!dateIso) return "—";
  const d = new Date(dateIso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function primaryImageSrc(images: AdminProductRow["productImages"]): string {
  const list = images;
  if (!list?.length) return resolveProductImageUrl(null);
  const primary = list.find((i) => i.isPrimary);
  const first = primary ?? list[0];
  return resolveProductImageUrl(first?.imageUrl?.trim() ? first.imageUrl : null);
}

export default function ProductDetailsView({ product }: Props) {
  return (
    <div className="box-body">
      <div className="row" style={{ marginBottom: 16 }}>
        <div className="col-md-9">
          <h3 style={{ marginTop: 0, marginBottom: 6 }}>{product.name}</h3>
          <p className="text-muted" style={{ marginBottom: 2 }}>
            <strong>ID:</strong> {product.id}
          </p>
          <p className="text-muted" style={{ marginBottom: 2 }}>
            <strong>Slug:</strong> {product.slug}
          </p>
          <p className="text-muted" style={{ marginBottom: 0 }}>
            <strong>SKU:</strong> {product.sku}
          </p>
        </div>
        <div className="col-md-3 text-right">
          <img
            src={primaryImageSrc(product.productImages)}
            alt={product.name}
            width={160}
            height={160}
            style={{ objectFit: "cover", borderRadius: 8, maxWidth: "100%" }}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="box box-default">
            <div className="box-header with-border">
              <h3 className="box-title">Pricing & Stock</h3>
            </div>
            <div className="box-body">
              <p><strong>MRP:</strong> {formatInr(product.mrp)}</p>
              <p><strong>Price:</strong> {formatInr(product.price)}</p>
              <p><strong>Discount:</strong> {product.discountPercent}%</p>
              <p><strong>Stock:</strong> {product.stock}</p>
              <p><strong>Stock status:</strong> {product.stockStatus}</p>
              <p style={{ marginBottom: 0 }}><strong>Featured:</strong> {product.isFeatured ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="box box-default">
            <div className="box-header with-border">
              <h3 className="box-title">Category, Vendor & Status</h3>
            </div>
            <div className="box-body">
              <p><strong>Category:</strong> {product.category?.name ?? "—"} ({product.categoryId ?? "—"})</p>
              <p><strong>Vendor:</strong> {product.vendor?.storeName ?? "—"} ({product.vendorId ?? "—"})</p>
              <p><strong>Visibility:</strong> {product.visibility ?? "—"}</p>
              <p><strong>Status:</strong> {product.status}</p>
              <p><strong>Created:</strong> {formatDate(product.createdAt)}</p>
              <p style={{ marginBottom: 0 }}><strong>Updated:</strong> {formatDate(product.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="box box-default">
        <div className="box-header with-border">
          <h3 className="box-title">Dimensions & Weight</h3>
        </div>
        <div className="box-body">
          <div className="row">
            <div className="col-md-3"><strong>Weight:</strong> {product.weight ?? 0} {product.weightUnit ?? "kg"}</div>
            <div className="col-md-3"><strong>Length:</strong> {product.length ?? 0} {product.lengthUnit ?? "cm"}</div>
            <div className="col-md-3"><strong>Width:</strong> {product.width ?? 0} {product.widthUnit ?? "cm"}</div>
            <div className="col-md-3"><strong>Height:</strong> {product.height ?? 0} {product.heightUnit ?? "cm"}</div>
          </div>
        </div>
      </div>

      <div className="box box-default">
        <div className="box-header with-border">
          <h3 className="box-title">Descriptions & SEO</h3>
        </div>
        <div className="box-body">
          <p><strong>Short description:</strong></p>
          <p>{product.shortDescription?.trim() || "—"}</p>
          <p><strong>Long description:</strong></p>
          <div
            className="well well-sm"
            style={{ background: "#fff" }}
            dangerouslySetInnerHTML={{ __html: product.longDescription?.trim() || "—" }}
          />
          <hr />
          <p><strong>Meta title:</strong> {product.metaTitle?.trim() || "—"}</p>
          <p style={{ marginBottom: 0 }}><strong>Meta description:</strong> {product.metaDescription?.trim() || "—"}</p>
        </div>
      </div>

      <div className="box box-default">
        <div className="box-header with-border">
          <h3 className="box-title">Attributes</h3>
        </div>
        <div className="box-body table-responsive no-padding">
          <table className="table table-condensed">
            <thead>
              <tr>
                <th style={{ width: "35%" }}>Attribute</th>
                <th>Values</th>
              </tr>
            </thead>
            <tbody>
              {(product.attributes ?? []).length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-muted">No attributes mapped.</td>
                </tr>
              ) : (
                (product.attributes ?? []).map((a) => (
                  <tr key={`${a.id ?? "x"}-${a.attributeId}`}>
                    <td>{a.name}</td>
                    <td>
                      {(a.attribute ?? []).map((v) => v.name).filter(Boolean).join(", ") || "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {(product.productImages ?? []).length > 0 ? (
        <div className="box box-default">
          <div className="box-header with-border">
            <h3 className="box-title">Gallery</h3>
          </div>
          <div className="box-body">
            <div className="row">
              {(product.productImages ?? []).map((img) => (
                <div className="col-sm-2 col-xs-4" key={img.id} style={{ marginBottom: 10 }}>
                  <img
                    src={resolveProductImageUrl(img.imageUrl)}
                    alt={product.name}
                    className="img-responsive img-thumbnail"
                    style={{ width: "100%", height: 90, objectFit: "cover" }}
                  />
                  {img.isPrimary ? (
                    <span className="label label-primary" style={{ marginTop: 4, display: "inline-block" }}>
                      Primary
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="text-right">
        <Link
          href={`/admin/products/edit/${encodeURIComponent(String(product.id))}`}
          className="btn btn-primary btn-sm"
        >
          Edit product
        </Link>
      </div>
    </div>
  );
}
