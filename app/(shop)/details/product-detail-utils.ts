import type { ProductDetailDto } from "@/lib/api/products";

export function stockLabel(stockStatus: string): string {
  const s = stockStatus.toUpperCase();
  if (s === "IN_STOCK") return "In stock";
  if (s === "OUT_OF_STOCK") return "Out of stock";
  if (s === "LOW_STOCK") return "Low stock";
  return stockStatus.replaceAll("_", " ").toLowerCase();
}

export function stockBadgeClass(stockStatus: string): string {
  const s = stockStatus.toUpperCase();
  if (s === "IN_STOCK") return "product-detail-stock--in";
  if (s === "OUT_OF_STOCK") return "product-detail-stock--out";
  if (s === "LOW_STOCK") return "product-detail-stock--low";
  return "product-detail-stock--neutral";
}

export function humanizeToken(raw: string): string {
  const s = raw.trim();
  if (!s) return "";
  return s
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function dimensionValue(value: number, unit: string): string | null {
  if (!Number.isFinite(value) || value <= 0) return null;
  const u = unit.trim() || "";
  return u ? `${value} ${u}` : String(value);
}

export function specRows(
  product: ProductDetailDto,
  sellerName: string,
  sellerVerified: boolean,
): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [
    { label: "SKU", value: product.sku },
  ];

  const weight = dimensionValue(product.weight, product.weightUnit);
  if (weight) rows.push({ label: "Weight", value: weight });

  const l = dimensionValue(product.length, product.lengthUnit);
  const w = dimensionValue(product.width, product.widthUnit);
  const h = dimensionValue(product.height, product.heightUnit);
  if (l && w && h) {
    rows.push({
      label: "Dimensions (L × W × H)",
      value: `${l} × ${w} × ${h}`,
    });
  }

  if (product.category.name) {
    rows.push({ label: "Category", value: product.category.name });
  }

  rows.push({
    label: "Seller",
    value: sellerVerified ? `${sellerName} (verified)` : sellerName,
  });

  const gst = product.vendor?.gstNumber?.trim();
  if (gst) rows.push({ label: "Seller GSTIN", value: gst });

  if (product.status?.trim()) {
    rows.push({
      label: "Product status",
      value: humanizeToken(product.status),
    });
  }
  if (product.visibility?.trim()) {
    rows.push({
      label: "Visibility",
      value: humanizeToken(product.visibility),
    });
  }

  if (product.isFeatured) {
    rows.push({ label: "Featured", value: "Yes" });
  }

  rows.push(
    { label: "Stock on hand", value: String(product.stock) },
    { label: "Availability", value: stockLabel(product.stockStatus) },
  );

  for (const row of product.attributes ?? []) {
    const options = row.attribute?.map((a) => a.name).filter(Boolean) ?? [];
    const label = row.name?.trim() || row.value?.trim() || "";
    if (options.length > 0 && label) {
      rows.push({ label, value: options.join(", ") });
    }
  }

  return rows;
}
