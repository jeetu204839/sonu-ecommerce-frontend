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

const PLACEHOLDER_IMG = "/img/belcha-garden-round-hand.webp";

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
