"use server";

import { redirect } from "next/navigation";

import {
  groupFormEntriesIntoAttributePayload,
  type EditProductFormDraft,
  type EditProductFormState,
  type ProductAttributeFormEntry,
  type UpdateAdminProductPayload,
  updateAdminProduct,
} from "@/lib/admin/product";

function draftFromFormData(formData: FormData): EditProductFormDraft {
  const text = (key: string): string => {
    const v = formData.get(key);
    return typeof v === "string" ? v : "";
  };
  const baseDraft: EditProductFormDraft = {
    name: text("name"),
    slug: text("slug"),
    sku: text("sku"),
    categoryId: text("categoryId"),
    vendorId: (() => {
      const v = text("vendorId").trim();
      return v !== "" ? v : "1";
    })(),
    mrp: text("mrp"),
    price: text("price"),
    discountPercent: text("discountPercent"),
    stock: text("stock"),
    stockStatus: text("stockStatus"),
    status: text("status"),
    visibility: text("visibility"),
    isFeatured: formData.get("isFeatured") === "true",
    weight: text("weight"),
    weightUnit: text("weightUnit"),
    length: text("length"),
    lengthUnit: text("lengthUnit"),
    width: text("width"),
    widthUnit: text("widthUnit"),
    height: text("height"),
    heightUnit: text("heightUnit"),
    shortDescription: text("shortDescription"),
    longDescription: text("longDescription"),
    metaTitle: text("metaTitle"),
    metaDescription: text("metaDescription"),
    attributesJson: text("attributesJson"),
  };
  return baseDraft;
}

function fail(
  formData: FormData,
  message: string,
  fieldErrors?: Record<string, string>,
): Extract<EditProductFormState, { ok: false }> {
  return {
    ok: false,
    message,
    draft: draftFromFormData(formData),
    ...(fieldErrors && Object.keys(fieldErrors).length > 0
      ? { fieldErrors }
      : {}),
  };
}

function failField(
  formData: FormData,
  path: string,
  message: string,
): Extract<EditProductFormState, { ok: false }> {
  return fail(formData, message, { [path]: message });
}

function optText(raw: FormDataEntryValue | null): string | null {
  const s = typeof raw === "string" ? raw.trim() : "";
  return s === "" ? null : s;
}

function parseAttributesJson(
  raw: FormDataEntryValue | null,
): ProductAttributeFormEntry[] | "invalid" {
  if (typeof raw !== "string" || raw.trim() === "") {
    return [];
  }
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return "invalid";
    const out: ProductAttributeFormEntry[] = [];
    for (const item of parsed) {
      if (!item || typeof item !== "object") continue;
      const aid = Number((item as { attributeId?: unknown }).attributeId);
      const value = String((item as { value?: unknown }).value ?? "").trim();
      if (!Number.isFinite(aid) || aid < 1 || value === "") continue;
      out.push({ attributeId: aid, value });
    }
    return out;
  } catch {
    return "invalid";
  }
}

export async function updateProductAction(
  productId: number,
  _prev: EditProductFormState,
  formData: FormData,
): Promise<EditProductFormState> {
  const nameRaw = formData.get("name");
  const name = typeof nameRaw === "string" ? nameRaw.trim() : "";
  if (!name) {
    return failField(formData, "name", "Please enter a product name.");
  }

  const slugRaw = formData.get("slug");
  const slug = typeof slugRaw === "string" ? slugRaw.trim() : "";
  if (!slug) {
    return failField(formData, "slug", "Please enter a slug.");
  }

  const skuRaw = formData.get("sku");
  const sku = typeof skuRaw === "string" ? skuRaw.trim() : "";
  if (!sku) {
    return failField(formData, "sku", "Please enter an SKU.");
  }

  const categoryRaw = formData.get("categoryId");
  const categoryId =
    typeof categoryRaw === "string"
      ? Number.parseInt(categoryRaw.trim(), 10)
      : Number.NaN;
  if (!Number.isFinite(categoryId) || categoryId < 1) {
    return failField(formData, "categoryId", "Please choose a category.");
  }

  const parsedAttrs = parseAttributesJson(formData.get("attributesJson"));
  if (parsedAttrs === "invalid") {
    return failField(formData, "attributes", "Invalid attributes payload.");
  }

  const mrp = Number.parseFloat(String(formData.get("mrp")));
  const price = Number.parseFloat(String(formData.get("price")));
  const discountPercent = Number.parseFloat(
    String(formData.get("discountPercent")),
  );
  const stock = Number.parseInt(String(formData.get("stock")), 10);
  const weight = Number.parseFloat(String(formData.get("weight")));
  const length = Number.parseFloat(String(formData.get("length")));
  const width = Number.parseFloat(String(formData.get("width")));
  const height = Number.parseFloat(String(formData.get("height")));

  if (!Number.isFinite(mrp) || mrp < 0) {
    return failField(formData, "mrp", "MRP must be a valid non‑negative number.");
  }
  if (!Number.isFinite(price) || price < 0) {
    return failField(
      formData,
      "price",
      "Price must be a valid non‑negative number.",
    );
  }
  if (
    !Number.isFinite(discountPercent) ||
    discountPercent < 0 ||
    discountPercent > 100
  ) {
    return failField(
      formData,
      "discountPercent",
      "Discount must be between 0 and 100.",
    );
  }
  if (!Number.isFinite(stock) || stock < 0 || !Number.isInteger(stock)) {
    return failField(formData, "stock", "Stock must be a whole number ≥ 0.");
  }
  if (!Number.isFinite(weight) || weight < 0) {
    return failField(formData, "weight", "Weight must be a valid non‑negative number.");
  }
  if (!Number.isFinite(length) || length < 0) {
    return failField(formData, "length", "Length must be a valid non‑negative number.");
  }
  if (!Number.isFinite(width) || width < 0) {
    return failField(formData, "width", "Width must be a valid non‑negative number.");
  }
  if (!Number.isFinite(height) || height < 0) {
    return failField(formData, "height", "Height must be a valid non‑negative number.");
  }

  const weightUnit =
    typeof formData.get("weightUnit") === "string"
      ? String(formData.get("weightUnit")).trim() || "kg"
      : "kg";
  const lengthUnit =
    typeof formData.get("lengthUnit") === "string"
      ? String(formData.get("lengthUnit")).trim() || "cm"
      : "cm";
  const widthUnit =
    typeof formData.get("widthUnit") === "string"
      ? String(formData.get("widthUnit")).trim() || "cm"
      : "cm";
  const heightUnit =
    typeof formData.get("heightUnit") === "string"
      ? String(formData.get("heightUnit")).trim() || "cm"
      : "cm";

  const status =
    typeof formData.get("status") === "string"
      ? String(formData.get("status")).trim()
      : "ACTIVE";
  const visibility =
    typeof formData.get("visibility") === "string"
      ? String(formData.get("visibility")).trim()
      : "CATALOG_SEARCH";
  const stockStatus =
    typeof formData.get("stockStatus") === "string"
      ? String(formData.get("stockStatus")).trim()
      : "IN_STOCK";

  const isFeatured = formData.get("isFeatured") === "true";

  const payload: UpdateAdminProductPayload = {
    categoryId,
    name,
    sku,
    slug,
    shortDescription: optText(formData.get("shortDescription")),
    longDescription: optText(formData.get("longDescription")),
    metaTitle: optText(formData.get("metaTitle")),
    metaDescription: optText(formData.get("metaDescription")),
    mrp,
    price,
    discountPercent,
    stock,
    weight,
    weightUnit,
    length,
    lengthUnit,
    width,
    widthUnit,
    height,
    heightUnit,
    status,
    visibility,
    stockStatus,
    isFeatured,
  };

  if (parsedAttrs.length > 0) {
    payload.attributes = groupFormEntriesIntoAttributePayload(parsedAttrs);
  }

  const id =
    Number.isFinite(productId) && productId >= 1
      ? Math.floor(productId)
      : NaN;
  if (!Number.isFinite(id)) {
    return fail(formData, "Invalid product.");
  }

  const result = await updateAdminProduct(id, payload);
  if (!result.ok) {
    return fail(formData, result.message, result.fieldErrors);
  }

  redirect("/admin/products");
}
