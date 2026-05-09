import type {
  CreateAdminProductAttribute,
  CreateAdminProductPayload,
  ProductAttributeFormEntry,
} from "./types";

/**
 * Collapses repeated rows for the same `attributeId` into the wire shape
 * `{ attributeId, values: [...] }` expected by `POST /admin/product`.
 * Order of attribute blocks follows first occurrence of each id; values keep form order with simple de-duplication.
 */
export function groupFormEntriesIntoAttributePayload(
  entries: ReadonlyArray<ProductAttributeFormEntry>,
): CreateAdminProductAttribute[] {
  const order: number[] = [];
  const byId = new Map<number, string[]>();

  for (const row of entries) {
    const id = row.attributeId;
    const v = row.value.trim();
    if (!Number.isFinite(id) || id < 1 || v === "") continue;

    if (!byId.has(id)) {
      order.push(id);
      byId.set(id, []);
    }
    const bucket = byId.get(id);
    if (!bucket) continue;
    if (!bucket.includes(v)) bucket.push(v);
  }

  return order.map((attributeId) => ({
    attributeId,
    values: byId.get(attributeId) ?? [],
  }));
}

/**
 * Builds the exact JSON object sent to `POST /admin/product`.
 * Omits optional keys when unset so the payload matches documented contracts.
 */
export function serializeCreateAdminProductBody(
  payload: CreateAdminProductPayload,
): Record<string, unknown> {
  const body: Record<string, unknown> = {
    name: payload.name,
    categoryId: payload.categoryId,
    sku: payload.sku,
    mrp: payload.mrp,
    price: payload.price,
    discountPercent: payload.discountPercent,
    stock: payload.stock,
    weight: payload.weight,
    weightUnit: payload.weightUnit,
    length: payload.length,
    lengthUnit: payload.lengthUnit,
    width: payload.width,
    widthUnit: payload.widthUnit,
    height: payload.height,
    heightUnit: payload.heightUnit,
    status: payload.status,
    visibility: payload.visibility,
    stockStatus: payload.stockStatus,
    isFeatured: payload.isFeatured,
  };

  if (payload.shortDescription != null) {
    body.shortDescription = payload.shortDescription;
  }
  if (payload.longDescription != null) {
    body.longDescription = payload.longDescription;
  }
  if (payload.metaTitle != null) {
    body.metaTitle = payload.metaTitle;
  }
  if (payload.metaDescription != null) {
    body.metaDescription = payload.metaDescription;
  }

  const attrs = payload.attributes;
  if (attrs != null && attrs.length > 0) {
    body.attributes = attrs.map((a) => ({
      attributeId: a.attributeId,
      values: [...a.values],
    }));
  }

  if (payload.vendorId != null) {
    body.vendorId = payload.vendorId;
  }
  if (payload.slug != null && payload.slug !== "") {
    body.slug = payload.slug;
  }

  return body;
}

/** Alias for PUT — identical serialization to POST. */
export const serializeUpdateAdminProductBody = serializeCreateAdminProductBody;
