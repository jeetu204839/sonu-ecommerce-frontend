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
}): Promise<FetchProductsResult> {
  const page = Number.isFinite(options.page) && options.page > 0 ? options.page : 1;
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (options.categorySlug) {
    params.set("category", options.categorySlug);
  }

  const path = `/public/products?${params.toString()}`;
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

export type ProductDetailAttributeDto = {
  id: number;
  value: string;
  attributeId: number;
  attribute: ProductDetailAttributeOptionDto[];
};

export type ProductDetailCategoryDto = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
};

export type ProductDetailVendorDto = {
  storeName: string;
  storeSlug: string;
  isVerified: boolean;
};

export type ProductDetailDto = {
  id: number;
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
  data: { product: ProductDetailDto } | null;
  errors: unknown;
};

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

  if (!payload.status || !payload.data?.product) {
    return {
      product: null,
      message: payload.message || "Product not found.",
    };
  }

  return { product: payload.data.product, message: payload.message };
}

/** Cached per request so `generateMetadata` and the page share one fetch. */
export const fetchProductDetail = cache(fetchProductDetailImpl);
