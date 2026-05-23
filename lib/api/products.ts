import { cache } from "react";

import { apiFetchJson } from "@/lib/api/client";
import { MEDIA_BASE_URL } from "@/lib/config";

/**
 * GET {API_BASE_URL}/public/products?page=1
 * Optional: &category={slug} when filtering from the shop sidebar (align with your backend).
 */

export type ProductsPagination = {
  total_count: number;
  current_page: number;
  next_page: number | null;
  previous_page: number | null;
  total_pages: number;
  per_page: number;
};

/** Raw product shape from API `data.products[]` (fields we use are typed; rest allowed). */
export type ProductDto = {
  id: number;
  name: string;
  slug: string;
  shortDescription: string | null;
  longDescription: string | null;
  mrp: number;
  price: number;
  discountPercent: number;
  productImages?: Array<{
    imageUrl: string;
    isPrimary: boolean;
  }>;
};

export type ProductsApiEnvelope = {
  status: boolean;
  message: string;
  data: {
    products: ProductDto[];
    pagination: ProductsPagination;
  } | null;
  errors: unknown;
};

/** Normalized row for the shop grid */
export type ShopProductCard = {
  id: number;
  name: string;
  slug: string;
  price: number;
  mrp: number;
  discountPercent: number;
  imageSrc: string;
  excerpt: string;
};

/** Row for search / listing tables (API may return extra fields). */
export type SearchProductTableRow = ShopProductCard & {
  sku: string;
  categoryName: string;
  vendorName: string;
  vendorVerified: boolean;
  stockStatus: string;
};

type ProductSearchRaw = ProductDto & {
  sku?: string;
  category?: { name?: string };
  vendor?: { storeName?: string; isVerified?: boolean };
  stockStatus?: string;
};

function toSearchTableRow(raw: ProductSearchRaw): SearchProductTableRow {
  const card = toCard(raw);
  return {
    ...card,
    sku: typeof raw.sku === "string" && raw.sku.trim() ? raw.sku.trim() : "—",
    categoryName:
      typeof raw.category?.name === "string" && raw.category.name.trim()
        ? raw.category.name.trim()
        : "—",
    vendorName:
      typeof raw.vendor?.storeName === "string" && raw.vendor.storeName.trim()
        ? raw.vendor.storeName.trim()
        : "—",
    vendorVerified: Boolean(raw.vendor?.isVerified),
    stockStatus:
      typeof raw.stockStatus === "string" && raw.stockStatus.trim()
        ? raw.stockStatus.trim()
        : "—",
  };
}

export const PLACEHOLDER_PRODUCT_IMAGE = "/img/coming-soon.png";

const PLACEHOLDER_IMG = PLACEHOLDER_PRODUCT_IMAGE;

function pickPrimaryImage(product: ProductDto): string | null {
  const list = product.productImages;
  if (!list?.length) return null;
  const primary = list.find((i) => i.isPrimary);
  const first = primary ?? list[0];
  return first?.imageUrl?.trim() ? first.imageUrl : null;
}

export function resolveProductImageUrl(filename: string | null): string {
  if (!filename?.trim()) return PLACEHOLDER_IMG;
  const name = filename.trim();
  if (name.startsWith("http://") || name.startsWith("https://")) return name;
  if (MEDIA_BASE_URL) {
    return `${MEDIA_BASE_URL}/${name.replace(/^\//, "")}`;
  }
  return PLACEHOLDER_IMG;
}

function toCard(product: ProductDto): ShopProductCard {
  const imgFile = pickPrimaryImage(product);
  const excerpt =
    product.shortDescription?.trim() ||
    product.longDescription?.trim() ||
    "";

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    mrp: product.mrp,
    discountPercent: product.discountPercent,
    imageSrc: resolveProductImageUrl(imgFile),
    excerpt,
  };
}

export type FetchProductsResult = {
  products: ShopProductCard[];
  pagination: ProductsPagination | null;
  message: string;
};

export async function fetchProductsPage(options: {
  page: number;
  categorySlug?: string;
  searchTerm?: string;
}): Promise<FetchProductsResult> {
  const page = Number.isFinite(options.page) && options.page > 0 ? options.page : 1;
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (options.categorySlug) {
    params.set("category", options.categorySlug);
  }
  if (options.searchTerm?.trim()) {
    params.set("search", options.searchTerm.trim());
  }

  const path = `/public/products?${params.toString()}`;
  return fetchProductsByPath(path);
}

export async function fetchRandomProductsPage(options: {
  page: number;
  categorySlug?: string;
  searchTerm?: string;
}): Promise<FetchProductsResult> {
  const page = Number.isFinite(options.page) && options.page > 0 ? options.page : 1;
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (options.categorySlug) {
    params.set("category", options.categorySlug);
  }
  if (options.searchTerm?.trim()) {
    params.set("search", options.searchTerm.trim());
  }
  const path = `/public/products/random?${params.toString()}`;
  return fetchProductsByPath(path);
}

/** GET {API_BASE_URL}/public/products/featured?page=1 */
export async function fetchFeaturedProductsPage(
  page = 1,
): Promise<FetchProductsResult> {
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const path = `/public/products/featured?page=${safePage}`;
  return fetchProductsByPath(path);
}

async function fetchProductsByPath(path: string): Promise<FetchProductsResult> {
  const payload = await apiFetchJson<ProductsApiEnvelope>(path, {
    cache: "no-store",
  });

  if (!payload) {
    return {
      products: [],
      pagination: null,
      message: "Empty response from server.",
    };
  }

  if (!payload.status || !payload.data) {
    return {
      products: [],
      pagination: null,
      message: payload.message || "Could not load products.",
    };
  }

  const { products, pagination } = payload.data;
  return {
    products: (products ?? []).map(toCard),
    pagination,
    message: payload.message,
  };
}

export type FetchProductSearchResult = {
  rows: SearchProductTableRow[];
  pagination: ProductsPagination | null;
  message: string;
};

/** GET {API_BASE_URL}/public/products/search?page=1&search=... */
export async function fetchProductSearchPage(options: {
  page: number;
  searchTerm: string;
}): Promise<FetchProductSearchResult> {
  const page = Number.isFinite(options.page) && options.page > 0 ? options.page : 1;
  const term = options.searchTerm.trim();

  const params = new URLSearchParams();
  params.set("page", String(page));
  if (term) {
    params.set("search", term);
  }
  const path = `/public/products/search?${params.toString()}`;

  const payload = await apiFetchJson<ProductsApiEnvelope>(path, {
    cache: "no-store",
    throwOnError: false,
  });

  if (!payload) {
    return {
      rows: [],
      pagination: null,
      message: "Empty response from server.",
    };
  }

  if (!payload.status || !payload.data) {
    return {
      rows: [],
      pagination: null,
      message: payload.message || "Could not load search results.",
    };
  }

  const { products, pagination } = payload.data;
  return {
    rows: (products ?? []).map((p) =>
      toSearchTableRow(p as ProductSearchRaw),
    ),
    pagination,
    message: payload.message,
  };
}

/** GET {API_BASE_URL}/public/products/detail/{slug} */
export type ProductDetailImageDto = {
  id: number;
  imageUrl: string;
  isPrimary: boolean;
};

export type ProductDetailAttributeOptionDto = {
  id: number;
  name: string;
};

/** Attribute group from API: label is `name` (e.g. "Color"); options in `attribute[]`. */
export type ProductDetailAttributeDto = {
  id: number;
  productId?: number;
  attributeId: number;
  /** Group label, e.g. "Color" */
  name?: string;
  /** Legacy / alternate label */
  value?: string;
  attribute: ProductDetailAttributeOptionDto[];
};

export type ProductDetailCategoryDto = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
};

export type ProductDetailVendorDto = {
  id?: number;
  storeName: string;
  storeSlug: string;
  isVerified: boolean;
  gstNumber?: string | null;
  commissionRate?: number;
};

export type ProductDetailDto = {
  id: number;
  vendorId?: number;
  categoryId?: number;
  name: string;
  slug: string;
  sku: string;
  shortDescription: string | null;
  longDescription: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  mrp: number;
  price: number;
  discountPercent: number;
  stock: number;
  weight: number;
  weightUnit: string;
  length: number;
  lengthUnit: string;
  width: number;
  widthUnit: string;
  height: number;
  heightUnit: string;
  /** e.g. ACTIVE */
  status?: string;
  /** e.g. CATALOG, HIDDEN */
  visibility?: string;
  stockStatus: string;
  isFeatured: boolean;
  category: ProductDetailCategoryDto;
  vendor: ProductDetailVendorDto;
  productImages?: ProductDetailImageDto[];
  attributes?: ProductDetailAttributeDto[];
};

export type ProductDetailApiEnvelope = {
  status: boolean;
  message: string;
  /** Some backends wrap as `{ product }`; others return the product object at `data` root. */
  data: { product: ProductDetailDto } | ProductDetailDto | null;
  errors: unknown;
};

type RawRecord = Record<string, unknown>;

function pickDetailString(
  raw: RawRecord,
  keys: string[],
  fallback = "",
): string {
  for (const key of keys) {
    const v = raw[key];
    if (typeof v === "string" && v.trim()) return v.trim();
    if (typeof v === "number" && !Number.isNaN(v)) return String(v);
  }
  return fallback;
}

function pickDetailOptionalString(
  raw: RawRecord,
  keys: string[],
): string | null {
  const value = pickDetailString(raw, keys, "");
  return value || null;
}

function pickDetailNumber(
  raw: RawRecord,
  keys: string[],
  fallback = 0,
): number {
  for (const key of keys) {
    const v = raw[key];
    if (typeof v === "number" && !Number.isNaN(v)) return v;
    if (typeof v === "string" && v.trim()) {
      const parsed = Number.parseFloat(v);
      if (!Number.isNaN(parsed)) return parsed;
    }
  }
  return fallback;
}

function pickDetailBool(
  raw: RawRecord,
  keys: string[],
  fallback = false,
): boolean {
  for (const key of keys) {
    const v = raw[key];
    if (typeof v === "boolean") return v;
    if (v === 1 || v === "1" || v === "true") return true;
    if (v === 0 || v === "0" || v === "false") return false;
  }
  return fallback;
}

function normalizeDetailImages(raw: unknown): ProductDetailImageDto[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const row = item as RawRecord;
      const imageUrl = pickDetailString(row, [
        "imageUrl",
        "image_url",
        "url",
        "path",
        "src",
      ]);
      if (!imageUrl) return null;
      return {
        id: pickDetailNumber(row, ["id"], index + 1),
        imageUrl,
        isPrimary: pickDetailBool(row, ["isPrimary", "is_primary"], false),
      };
    })
    .filter((row): row is ProductDetailImageDto => row !== null);
}

function normalizeDetailAttributes(raw: unknown): ProductDetailAttributeDto[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const row = item as RawRecord;
      const optionsRaw = row.attribute ?? row.options ?? row.values;
      const options: ProductDetailAttributeOptionDto[] = Array.isArray(
        optionsRaw,
      )
        ? optionsRaw
            .map((opt, optIndex) => {
              if (!opt || typeof opt !== "object") return null;
              const o = opt as RawRecord;
              const name = pickDetailString(o, ["name", "value", "label"]);
              if (!name) return null;
              return {
                id: pickDetailNumber(o, ["id"], optIndex + 1),
                name,
              };
            })
            .filter(
              (opt): opt is ProductDetailAttributeOptionDto => opt !== null,
            )
        : [];

      const name =
        pickDetailOptionalString(row, ["name", "label", "attribute_name"]) ??
        undefined;
      const value = pickDetailOptionalString(row, ["value"]) ?? undefined;
      const label = name ?? value ?? "";

      if (!label && options.length === 0) return null;

      const mapped: ProductDetailAttributeDto = {
        id: pickDetailNumber(row, ["id"], index + 1),
        attributeId: pickDetailNumber(
          row,
          ["attributeId", "attribute_id"],
          index + 1,
        ),
        name: name ?? value ?? undefined,
        value,
        attribute: options,
      };
      const productId = pickDetailNumber(row, ["productId", "product_id"], 0);
      if (productId > 0) mapped.productId = productId;
      return mapped;
    })
    .filter((row): row is ProductDetailAttributeDto => row !== null);
}

function normalizeDetailCategory(raw: unknown): ProductDetailCategoryDto {
  if (!raw || typeof raw !== "object") {
    return {
      id: 0,
      name: "Uncategorized",
      slug: "",
      description: null,
    };
  }
  const row = raw as RawRecord;
  return {
    id: pickDetailNumber(row, ["id"], 0),
    name: pickDetailString(row, ["name", "title", "category_name"], "Uncategorized"),
    slug: pickDetailString(row, ["slug"], ""),
    description: pickDetailOptionalString(row, ["description", "category_description"]),
  };
}

function normalizeDetailVendor(raw: unknown): ProductDetailVendorDto {
  if (!raw || typeof raw !== "object") {
    return {
      storeName: "Ray Enterprises",
      storeSlug: "",
      isVerified: false,
      gstNumber: null,
    };
  }
  const row = raw as RawRecord;
  const commission = pickDetailNumber(row, ["commissionRate", "commission_rate"], 0);
  return {
    id: pickDetailNumber(row, ["id"], 0) || undefined,
    storeName: pickDetailString(
      row,
      ["storeName", "store_name", "name"],
      "Ray Enterprises",
    ),
    storeSlug: pickDetailString(row, ["storeSlug", "store_slug", "slug"], ""),
    isVerified: pickDetailBool(row, ["isVerified", "is_verified"], false),
    gstNumber: pickDetailOptionalString(row, ["gstNumber", "gst_number"]),
    commissionRate: commission > 0 ? commission : undefined,
  };
}

function extractProductRawFromDetailData(data: unknown): RawRecord | null {
  if (!data || typeof data !== "object") return null;
  const obj = data as RawRecord;
  if (obj.product && typeof obj.product === "object") {
    return obj.product as RawRecord;
  }
  if (typeof obj.slug === "string" && obj.slug.trim()) {
    return obj;
  }
  return null;
}

export function normalizeProductDetail(raw: RawRecord): ProductDetailDto {
  const category = normalizeDetailCategory(raw.category ?? raw.Category);
  const vendor = normalizeDetailVendor(raw.vendor ?? raw.Vendor);
  const productImages = normalizeDetailImages(
    raw.productImages ?? raw.product_images ?? raw.images,
  );
  const attributes = normalizeDetailAttributes(raw.attributes);

  return {
    id: pickDetailNumber(raw, ["id"], 0),
    vendorId:
      pickDetailNumber(raw, ["vendorId", "vendor_id"], 0) ||
      vendor.id ||
      undefined,
    categoryId:
      pickDetailNumber(raw, ["categoryId", "category_id"], 0) ||
      category.id ||
      undefined,
    name: pickDetailString(raw, ["name", "title"], "Product"),
    slug: pickDetailString(raw, ["slug"], ""),
    sku: pickDetailString(raw, ["sku", "SKU"], "—"),
    shortDescription: pickDetailOptionalString(raw, [
      "shortDescription",
      "short_description",
    ]),
    longDescription: pickDetailOptionalString(raw, [
      "longDescription",
      "long_description",
    ]),
    metaTitle: pickDetailOptionalString(raw, ["metaTitle", "meta_title"]),
    metaDescription: pickDetailOptionalString(raw, [
      "metaDescription",
      "meta_description",
    ]),
    mrp: pickDetailNumber(raw, ["mrp", "MRP"], 0),
    price: pickDetailNumber(raw, ["price"], 0),
    discountPercent: pickDetailNumber(
      raw,
      ["discountPercent", "discount_percent"],
      0,
    ),
    stock: pickDetailNumber(raw, ["stock", "quantity"], 0),
    weight: pickDetailNumber(raw, ["weight"], 0),
    weightUnit: pickDetailString(raw, ["weightUnit", "weight_unit"], "kg"),
    length: pickDetailNumber(raw, ["length"], 0),
    lengthUnit: pickDetailString(raw, ["lengthUnit", "length_unit"], "cm"),
    width: pickDetailNumber(raw, ["width"], 0),
    widthUnit: pickDetailString(raw, ["widthUnit", "width_unit"], "cm"),
    height: pickDetailNumber(raw, ["height"], 0),
    heightUnit: pickDetailString(raw, ["heightUnit", "height_unit"], "cm"),
    status: pickDetailOptionalString(raw, ["status"]) ?? undefined,
    visibility: pickDetailOptionalString(raw, ["visibility"]) ?? undefined,
    stockStatus: pickDetailString(
      raw,
      ["stockStatus", "stock_status"],
      "IN_STOCK",
    ),
    isFeatured: pickDetailBool(raw, ["isFeatured", "is_featured"], false),
    category,
    vendor,
    productImages,
    attributes,
  };
}

export function galleryImagesFromProduct(
  product: Pick<ProductDetailDto, "name" | "productImages">,
): { src: string; alt: string }[] {
  const raw = product.productImages?.filter((i) => i.imageUrl?.trim()) ?? [];
  const sorted = [...raw].sort((a, b) => {
    if (a.isPrimary === b.isPrimary) return a.id - b.id;
    return a.isPrimary ? -1 : 1;
  });
  if (sorted.length === 0) {
    return [{ src: PLACEHOLDER_IMG, alt: product.name }];
  }
  return sorted.map((i) => ({
    src: resolveProductImageUrl(i.imageUrl),
    alt: product.name,
  }));
}

export type FetchProductDetailResult = {
  product: ProductDetailDto | null;
  message: string;
};

async function fetchProductDetailImpl(
  slug: string,
): Promise<FetchProductDetailResult> {
  const trimmed = slug.trim();
  if (!trimmed) {
    return { product: null, message: "Missing product slug." };
  }

  const path = `/public/products/detail/${encodeURIComponent(trimmed)}`;
  let payload: ProductDetailApiEnvelope | null;
  try {
    payload = await apiFetchJson<ProductDetailApiEnvelope>(path, {
      cache: "no-store",
      throwOnError: false,
    });
  } catch (e) {
    return {
      product: null,
      message:
        e instanceof Error
          ? e.message
          : "Unable to reach the product API. Check API_BASE_URL and that the backend is running.",
    };
  }

  if (!payload) {
    return { product: null, message: "Empty response from server." };
  }

  const raw = extractProductRawFromDetailData(payload.data);
  if (!raw) {
    return {
      product: null,
      message: payload.message || "Product not found.",
    };
  }

  if (!payload.status) {
    return {
      product: null,
      message: payload.message || "Product not found.",
    };
  }

  return {
    product: normalizeProductDetail(raw),
    message: payload.message,
  };
}

export function formatProductInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(amount);
}

export function isProductInStock(product: Pick<ProductDetailDto, "stock" | "stockStatus">): boolean {
  const status = product.stockStatus.toUpperCase();
  if (status === "OUT_OF_STOCK") return false;
  if (status === "IN_STOCK") return product.stock > 0;
  return product.stock > 0;
}

/** Cached per request so `generateMetadata` and the page share one fetch. */
export const fetchProductDetail = cache(fetchProductDetailImpl);
