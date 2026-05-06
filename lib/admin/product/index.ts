/** Admin products — API + types grouped like `lib/admin/category`. */

export type {
  AdminProductCategorySummary,
  AdminProductImageRow,
  AdminProductRow,
  AdminProductsListData,
  AdminProductsPagination,
  AdminProductVendorSummary,
} from "./types";

export { fetchAdminProductsPage } from "./api";
