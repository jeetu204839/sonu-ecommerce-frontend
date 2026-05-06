"use server";

import { redirect } from "next/navigation";

import {
  createAdminProduct,
  type CreateAdminProductPayload,
  type CreateProductFormState,
  type ProductAttributeFormEntry,
} from "@/lib/admin/product";

function optText(raw: FormDataEntryValue | null): string | null {
  const s = typeof raw === "string" ? raw.trim() : "";
  return s === "" ? null : s;
}

function slugifyName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replaceAll(/\s+/g, "-")
    .replaceAll(/[^a-z0-9-]/g, "");
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

export async function createProductAction(
  _prev: CreateProductFormState,
  formData: FormData,
): Promise<CreateProductFormState> {
  const nameRaw = formData.get("name");
  const name = typeof nameRaw === "string" ? nameRaw.trim() : "";
  if (!name) {
    return { ok: false, message: "Please enter a product name." };
  }

  const slug = slugifyName(name);
  if (!slug) {
    return { ok: false, message: "Product name must yield a valid slug." };
  }

  const skuRaw = formData.get("sku");
  const sku = typeof skuRaw === "string" ? skuRaw.trim() : "";
  if (!sku) {
    return { ok: false, message: "Please enter an SKU." };
  }

  const vendorRaw = formData.get("vendorId");
  const vendorParsed =
    typeof vendorRaw === "string" ? Number.parseInt(vendorRaw.trim(), 10) : Number.NaN;
  const vendorId =
    Number.isFinite(vendorParsed) && vendorParsed >= 1 ? vendorParsed : 1;

  const categoryRaw = formData.get("categoryId");
  const categoryId =
    typeof categoryRaw === "string" ? Number.parseInt(categoryRaw.trim(), 10) : Number.NaN;
  if (!Number.isFinite(categoryId) || categoryId < 1) {
    return { ok: false, message: "Please choose a category." };
  }

  const parsedAttrs = parseAttributesJson(formData.get("attributesJson"));
  if (parsedAttrs === "invalid") {
    return { ok: false, message: "Invalid attributes payload." };
  }

  const mrp = Number.parseFloat(String(formData.get("mrp")));
  const price = Number.parseFloat(String(formData.get("price")));
  const discountPercent = Number.parseFloat(String(formData.get("discountPercent")));
  const stock = Number.parseInt(String(formData.get("stock")), 10);
  const weight = Number.parseFloat(String(formData.get("weight")));
  const length = Number.parseFloat(String(formData.get("length")));
  const width = Number.parseFloat(String(formData.get("width")));
  const height = Number.parseFloat(String(formData.get("height")));

  if (!Number.isFinite(mrp) || mrp < 0) {
    return { ok: false, message: "MRP must be a valid non‑negative number." };
  }
  if (!Number.isFinite(price) || price < 0) {
    return { ok: false, message: "Price must be a valid non‑negative number." };
  }
  if (!Number.isFinite(discountPercent) || discountPercent < 0 || discountPercent > 100) {
    return { ok: false, message: "Discount must be between 0 and 100." };
  }
  if (!Number.isFinite(stock) || stock < 0 || !Number.isInteger(stock)) {
    return { ok: false, message: "Stock must be a whole number ≥ 0." };
  }
  if (!Number.isFinite(weight) || weight < 0) {
    return { ok: false, message: "Weight must be a valid non‑negative number." };
  }
  if (!Number.isFinite(length) || length < 0) {
    return { ok: false, message: "Length must be a valid non‑negative number." };
  }
  if (!Number.isFinite(width) || width < 0) {
    return { ok: false, message: "Width must be a valid non‑negative number." };
  }
  if (!Number.isFinite(height) || height < 0) {
    return { ok: false, message: "Height must be a valid non‑negative number." };
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

  const payload: CreateAdminProductPayload = {
    vendorId,
    categoryId,
    name,
    slug,
    shortDescription: optText(formData.get("shortDescription")),
    longDescription: optText(formData.get("longDescription")),
    metaTitle: optText(formData.get("metaTitle")),
    metaDescription: optText(formData.get("metaDescription")),
    sku,
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
    payload.attributes = parsedAttrs;
  }

  const result = await createAdminProduct(payload);
  if (!result.ok) {
    return { ok: false, message: result.message };
  }

  redirect("/admin/products");
}
