import { emptyProductFormDraft } from "@/lib/admin/product/create-form-state";

import type { EditProductFormDraft } from "./edit-form-state";
import type { AdminProductRow } from "./types";

/** One logical attribute value row — UI adds stable `rowId` client-side. */
export type AdminProductAttrRowSeed = {
  attributeId: string;
  value: string;
};

function nzStr(n: unknown, fallback = ""): string {
  if (n == null) return fallback;
  if (typeof n === "number" && Number.isFinite(n)) return String(n);
  return typeof n === "string" ? n : fallback;
}

/**
 * Hydrates edit form defaults from `GET /admin/product/:id`.
 */
export function mapAdminProductDetailToEditDraft(
  product: AdminProductRow,
): EditProductFormDraft {
  const categoryIdRaw = product.categoryId ?? product.category?.id;
  const vendorIdRaw = product.vendorId ?? product.vendor?.id ?? 1;

  return {
    ...emptyProductFormDraft,
    name: product.name ?? "",
    slug: product.slug ?? "",
    sku: product.sku ?? "",
    categoryId:
      categoryIdRaw != null && Number.isFinite(Number(categoryIdRaw))
        ? String(categoryIdRaw)
        : "",
    vendorId:
      vendorIdRaw != null && Number.isFinite(Number(vendorIdRaw))
        ? String(Math.floor(Number(vendorIdRaw)))
        : "1",
    mrp: nzStr(product.mrp, "0"),
    price: nzStr(product.price, "0"),
    discountPercent: nzStr(product.discountPercent, "0"),
    stock: nzStr(product.stock, "0"),
    stockStatus: product.stockStatus ?? "IN_STOCK",
    status: product.status ?? "ACTIVE",
    visibility: product.visibility ?? "CATALOG_SEARCH",
    isFeatured: Boolean(product.isFeatured),
    weight: nzStr(product.weight, "0"),
    weightUnit: product.weightUnit?.trim() || "kg",
    length: nzStr(product.length, "0"),
    lengthUnit: product.lengthUnit?.trim() || "cm",
    width: nzStr(product.width, "0"),
    widthUnit: product.widthUnit?.trim() || "cm",
    height: nzStr(product.height, "0"),
    heightUnit: product.heightUnit?.trim() || "cm",
    shortDescription: product.shortDescription ?? "",
    longDescription: product.longDescription ?? "",
    metaTitle: product.metaTitle ?? "",
    metaDescription: product.metaDescription ?? "",
    attributesJson: "[]",
  };
}

/**
 * Expands API `attributes[].attribute[]` option labels into form rows (one row per value).
 */
export function productDetailToAttrRowSeeds(
  product: AdminProductRow,
): AdminProductAttrRowSeed[] {
  const blocks = product.attributes;
  if (!blocks?.length) return [];

  const seeds: AdminProductAttrRowSeed[] = [];
  for (const b of blocks) {
    const aid = String(b.attributeId ?? "");
    const opts = b.attribute ?? [];
    if (opts.length === 0) {
      seeds.push({ attributeId: aid, value: "" });
      continue;
    }
    for (const o of opts) {
      seeds.push({
        attributeId: aid,
        value: typeof o?.name === "string" ? o.name : "",
      });
    }
  }
  return seeds;
}
