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

export type AdminProductRow = {
  id: number;
  name: string;
  slug: string;
  sku: string;
  mrp: number;
  price: number;
  discountPercent: number;
  stock: number;
  stockStatus: string;
  status: string;
  isFeatured: boolean;
  createdAt?: string;
  category?: AdminProductCategorySummary | null;
  vendor?: AdminProductVendorSummary | null;
  productImages?: AdminProductImageRow[];
};

export type AdminProductsListData = {
  products: AdminProductRow[];
  pagination: AdminProductsPagination;
};
