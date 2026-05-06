/** Types for admin product list API (`GET /admin/product`). */

export type AdminProductsPagination = {
  total_count: number;
  current_page: number;
  next_page: number | null;
  previous_page: number | null;
  total_pages: number;
  per_page: number;
};

export type AdminProductCategorySummary = {
  id: number;
  name: string;
  slug: string;
};

export type AdminProductVendorSummary = {
  id: number;
  storeName: string;
  storeSlug: string;
  isVerified: boolean;
};

export type AdminProductImageRow = {
  id: number;
  imageUrl: string;
  isPrimary: boolean;
};

export type AdminProductAttributeOptionDto = {
  id: number;
  name: string;
};

export type AdminProductAttributeDto = {
  id?: number;
  productId?: number;
  attributeId: number;
  name: string;
  attribute?: AdminProductAttributeOptionDto[];
};

export type AdminProductRow = {
  id: number;
  vendorId?: number;
  categoryId?: number;
  name: string;
  slug: string;
  sku: string;
  shortDescription?: string | null;
  longDescription?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  mrp: number;
  price: number;
  discountPercent: number;
  stock: number;
  weight?: number;
  weightUnit?: string;
  length?: number;
  lengthUnit?: string;
  width?: number;
  widthUnit?: string;
  height?: number;
  heightUnit?: string;
  visibility?: string;
  stockStatus: string;
  status: string;
  isFeatured: boolean;
  createdAt?: string;
  category?: AdminProductCategorySummary | null;
  vendor?: AdminProductVendorSummary | null;
  productImages?: AdminProductImageRow[];
  attributes?: AdminProductAttributeDto[];
};

export type AdminProductsListData = {
  products: AdminProductRow[];
  pagination: AdminProductsPagination;
};

/** One selected attribute value for create/update forms. */
export type ProductAttributeFormEntry = {
  attributeId: number;
  /** Display value / option label (e.g. "2KG") — backend may map to option id separately. */
  value: string;
};

/** JSON body for `POST /admin/product` — fields requested for admin create + optional relations. */
export type CreateAdminProductPayload = {
  vendorId: number;
  categoryId: number;
  name: string;
  slug: string;
  shortDescription: string | null;
  longDescription: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  sku: string;
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
  status: string;
  visibility: string;
  stockStatus: string;
  isFeatured: boolean;
  /** Optional — only sent if non-empty; shape must match backend contract. */
  attributes?: ProductAttributeFormEntry[];
};
