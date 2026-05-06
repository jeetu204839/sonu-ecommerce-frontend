import Link from "next/link";

import type { AdminProductRow } from "@/lib/admin/product";
import { resolveProductImageUrl } from "@/lib/api/products";

function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function primaryImageSrc(images: AdminProductRow["productImages"]): string {
  const list = images;
  if (!list?.length) return resolveProductImageUrl(null);
  const primary = list.find((i) => i.isPrimary);
  const first = primary ?? list[0];
  return resolveProductImageUrl(first?.imageUrl?.trim() ? first.imageUrl : null);
}

function stockLabelClass(status: string): string {
  const s = status.toUpperCase();
  if (s.includes("IN_STOCK") || s === "IN STOCK") return "label-success";
  if (s.includes("OUT") || s.includes("UNAVAILABLE")) return "label-danger";
  return "label-warning";
}

function productStatusLabelClass(status: string): string {
  const s = status.toUpperCase();
  if (s === "ACTIVE") return "label-success";
  if (s === "INACTIVE" || s === "DISABLED") return "label-default";
  return "label-info";
}

type Props = Readonly<{
  products: AdminProductRow[];
  rowOffset: number;
}>;

export default function ProductListTable({ products, rowOffset }: Props) {
  if (products.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={14} className="text-center text-muted">
            No products found for this search or page.
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {products.map((p, idx) => (
        <tr key={`${p.id}-${p.slug}-${idx}`}>
          <td>{rowOffset + idx + 1}</td>
          <td style={{ width: 56 }}>
            <img
              src={primaryImageSrc(p.productImages)}
              alt=""
              width={44}
              height={44}
              style={{
                objectFit: "cover",
                borderRadius: 4,
              }}
            />
          </td>
          <td>
            <strong>{p.name}</strong>
            <div className="text-muted small">{p.slug}</div>
          </td>
          <td>{p.sku}</td>
          <td>{p.category?.name ?? "—"}</td>
          <td>
            {p.vendor?.storeName ?? "—"}
            {p.vendor?.isVerified ? (
              <span className="label label-info" style={{ marginLeft: 6 }}>
                Verified
              </span>
            ) : null}
          </td>
          <td>{formatInr(p.price)}</td>
          <td className="text-muted">{formatInr(p.mrp)}</td>
          <td>{p.discountPercent}%</td>
          <td>{p.stock}</td>
          <td>
            <span className={`label ${stockLabelClass(p.stockStatus)}`}>
              {p.stockStatus}
            </span>
          </td>
          <td>
            <span className={`label ${productStatusLabelClass(p.status)}`}>
              {p.status}
            </span>
          </td>
          <td>
            {p.isFeatured ? (
              <span className="label label-warning">Featured</span>
            ) : (
              <span className="text-muted">—</span>
            )}
          </td>
          <td>
            <Link
              href={`/admin/products/edit/${encodeURIComponent(String(p.id))}`}
              className="btn btn-xs btn-default"
            >
              Edit
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
