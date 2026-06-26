import {
  adminApiDeleteEnvelope,
  adminApiGetEnvelope,
  adminApiPostFormDataEnvelope,
  adminApiPostEnvelope,
  adminApiPutEnvelope,
} from "@/lib/admin/http";

import {
  serializeCreateAdminProductBody,
  serializeUpdateAdminProductBody,
} from "./create-product-request";
import type {
  AdminProductRow,
  AdminProductsListData,
  CreateAdminProductPayload,
  UpdateAdminProductPayload,
} from "./types";

const ADMIN_PRODUCT_PATH = "/admin/product";

function adminProductDetailSegment(productId: number): string {
  return String(Math.floor(Number(productId)));
}

/**
 * Some backends use `search`, others the typo `serch`. Send both so filtering works.
 */
function appendSearchParams(query: URLSearchParams, term: string): void {
  query.set("search", term);
  query.set("serch", term);
}

/**
 * Paginated admin product list: `GET /admin/product?page=N&search=...&serch=...`
 */
export async function fetchAdminProductsPage(
  page: number,
  options?: Readonly<{ search?: string }>,
) {
  const safePage = Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
  const query = new URLSearchParams({ page: String(safePage) });
  const term = options?.search?.trim();
  if (term) {
    appendSearchParams(query, term);
  }
  return adminApiGetEnvelope<AdminProductsListData>(
    `${ADMIN_PRODUCT_PATH}?${query.toString()}`,
  );
}

/** Creates a product: `POST /admin/product` with JSON body per backend contract. */
export async function createAdminProduct(payload: CreateAdminProductPayload) {
  return adminApiPostEnvelope<AdminProductRow>(
    ADMIN_PRODUCT_PATH,
    serializeCreateAdminProductBody(payload),
  );
}

/** Single product for admin edit: `GET /admin/product/:id` */
export async function fetchAdminProductById(productId: number) {
  const path = `${ADMIN_PRODUCT_PATH}/${adminProductDetailSegment(productId)}`;
  return adminApiGetEnvelope<AdminProductRow>(path);
}

/** Updates a product: `PUT /admin/product/:id`. */
export async function updateAdminProduct(
  productId: number,
  payload: UpdateAdminProductPayload,
) {
  const path = `${ADMIN_PRODUCT_PATH}/${adminProductDetailSegment(productId)}`;
  return adminApiPutEnvelope<AdminProductRow>(
    path,
    serializeUpdateAdminProductBody(payload),
  );
}

const ADMIN_PRODUCT_UPLOAD_IMAGES_PATH = "/admin/product/upload-images";

/**
 * Build multipart body for `POST /admin/product/upload-images`.
 * Expected keys: `productId`, `image`, `isPrimary`.
 */
export function buildAdminProductImageUploadFormData(input: Readonly<{
  productId: number;
  image: File;
  isPrimary: boolean;
}>): FormData {
  const fd = new FormData();
  fd.append("productId", String(Math.floor(Number(input.productId))));
  fd.append("image", input.image);
  fd.append("isPrimary", input.isPrimary ? "1" : "0");
  return fd;
}

/** Upload one image to a product by id (multipart/form-data). */
export async function uploadAdminProductImageMultipart(formBody: FormData) {
  return adminApiPostFormDataEnvelope<unknown>(
    ADMIN_PRODUCT_UPLOAD_IMAGES_PATH,
    formBody,
  );
}

const ADMIN_PRODUCT_IMAGE_PATH = "/admin/product/image";

function adminProductImageSegment(imageId: number): string {
  return String(Math.floor(Number(imageId)));
}

/** Deletes a product image: `DELETE /admin/product/image/:id`. */
export async function deleteAdminProductImage(imageId: number) {
  const path = `${ADMIN_PRODUCT_IMAGE_PATH}/${adminProductImageSegment(imageId)}`;
  return adminApiDeleteEnvelope<null>(path);
}
