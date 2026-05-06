/** Admin products — API + types grouped like `lib/admin/category`. */

export type {
  AdminProductCategorySummary,
  AdminProductAttributeDto,
  AdminProductAttributeOptionDto,
  AdminProductImageRow,
  AdminProductRow,
  AdminProductsListData,
  AdminProductsPagination,
  AdminProductVendorSummary,
  CreateAdminProductPayload,
  ProductAttributeFormEntry,
} from "./types";

export { createAdminProduct, fetchAdminProductsPage } from "./api";

export {
  createProductInitialState,
  type CreateProductFormState,
} from "./create-form-state";
